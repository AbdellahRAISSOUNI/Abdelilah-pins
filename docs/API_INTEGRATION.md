# API Integration Guide

This document provides detailed instructions for integrating real APIs into the PinGenerator application.

## 📋 Table of Contents

- [Authentication APIs](#authentication-apis)
- [Post Generation APIs](#post-generation-apis)
- [Pinterest Integration](#pinterest-integration)
- [Analytics APIs](#analytics-apis)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Testing APIs](#testing-apis)

## 🔐 Authentication APIs

### Current Mock Implementation

The app currently uses mock authentication that accepts any credentials. Here's how to replace it with real APIs:

#### 1. Update Auth Hook (`hooks/use-auth.tsx`)

```typescript
// Replace the mock login function
const login = async (email: string, password: string): Promise<boolean> => {
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Store user data and token
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      setIsLoading(false);
      return true;
    } else {
      const error = await response.json();
      setError(error.message || 'Login failed');
      setIsLoading(false);
      return false;
    }
  } catch (error) {
    setError('Network error. Please try again.');
    setIsLoading(false);
    return false;
  }
};
```

#### 2. Create Login API Endpoint (`app/api/auth/login/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 3. Registration API (`app/api/auth/register/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## 📝 Post Generation APIs

### 1. Sitemap Processing API (`app/api/generate/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { processSitemap } from '@/lib/sitemap-processor';
import { generatePostContent } from '@/lib/ai-content-generator';

export async function POST(request: NextRequest) {
  try {
    const { sitemapUrl, options } = await request.json();
    const userId = request.headers.get('user-id'); // From middleware

    // Process sitemap
    const urls = await processSitemap(sitemapUrl);
    
    // Generate posts for each URL
    const posts = await Promise.all(
      urls.slice(0, options.maxPosts || 10).map(async (url) => {
        const content = await generatePostContent(url, options);
        return {
          id: generateId(),
          title: content.title,
          description: content.description,
          imageUrl: content.imageUrl,
          originalUrl: url,
          userId,
          status: 'draft',
          createdAt: new Date(),
        };
      })
    );

    // Save to database
    const savedPosts = await prisma.post.createMany({
      data: posts,
    });

    return NextResponse.json({
      posts: savedPosts,
      totalGenerated: posts.length,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { message: 'Failed to generate posts' },
      { status: 500 }
    );
  }
}
```

### 2. Sitemap Processor (`lib/sitemap-processor.ts`)

```typescript
import { parseString } from 'xml2js';
import fetch from 'node-fetch';

export async function processSitemap(sitemapUrl: string): Promise<string[]> {
  try {
    // Fetch sitemap
    const response = await fetch(sitemapUrl);
    const xmlContent = await response.text();

    // Parse XML
    const result = await parseString(xmlContent);
    const urls: string[] = [];

    // Extract URLs from sitemap
    if (result.urlset && result.urlset.url) {
      for (const url of result.urlset.url) {
        if (url.loc && url.loc[0]) {
          urls.push(url.loc[0]);
        }
      }
    }

    return urls;
  } catch (error) {
    console.error('Sitemap processing error:', error);
    throw new Error('Failed to process sitemap');
  }
}
```

### 3. AI Content Generator (`lib/ai-content-generator.ts`)

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePostContent(
  url: string,
  options: GenerationOptions
): Promise<PostContent> {
  try {
    // Fetch article content
    const articleContent = await extractArticleContent(url);

    // Generate Pinterest-optimized content
    const prompt = `
    Create a Pinterest post for this article:
    
    Title: ${articleContent.title}
    Content: ${articleContent.content}
    
    Style: ${options.style || 'Modern'}
    
    Generate:
    1. A compelling Pinterest title (under 100 characters)
    2. A detailed description (under 500 characters)
    3. 5 relevant hashtags
    4. A call-to-action
    
    Make it engaging and Pinterest-optimized.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const generatedContent = response.choices[0]?.message?.content || '';
    
    return parseGeneratedContent(generatedContent);
  } catch (error) {
    console.error('Content generation error:', error);
    throw new Error('Failed to generate content');
  }
}
```

## 📌 Pinterest Integration

### 1. Pinterest API Setup

```typescript
// lib/pinterest.ts
import { PinterestSDK } from 'pinterest-sdk';

const pinterest = new PinterestSDK({
  accessToken: process.env.PINTEREST_ACCESS_TOKEN,
  apiVersion: 'v5',
});

export class PinterestService {
  async createPin(pinData: PinData): Promise<PinterestPin> {
    try {
      const pin = await pinterest.pins.create({
        board_id: pinData.boardId,
        media_source: {
          source_type: 'image_url',
          url: pinData.imageUrl,
        },
        title: pinData.title,
        description: pinData.description,
        link: pinData.link,
      });

      return pin;
    } catch (error) {
      console.error('Pinterest API error:', error);
      throw new Error('Failed to create Pinterest pin');
    }
  }

  async getUserBoards(accessToken: string): Promise<Board[]> {
    try {
      const boards = await pinterest.boards.list({
        access_token: accessToken,
      });

      return boards.data;
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      throw new Error('Failed to fetch Pinterest boards');
    }
  }

  async schedulePin(pinData: PinData, scheduledTime: Date): Promise<void> {
    // Implementation for scheduled posting
    // This would typically involve a job queue like Bull or Agenda
    await scheduleJob('publish-pin', {
      pinData,
      scheduledTime,
    });
  }
}
```

### 2. Pinterest Authentication

```typescript
// app/api/auth/pinterest/route.ts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    // Redirect to Pinterest OAuth
    const authUrl = `https://www.pinterest.com/oauth/authorize?client_id=${process.env.PINTEREST_CLIENT_ID}&response_type=code&redirect_uri=${process.env.PINTEREST_REDIRECT_URI}&scope=boards:read,pins:read,pins:write`;
    
    return NextResponse.redirect(authUrl);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.PINTEREST_CLIENT_ID!,
        client_secret: process.env.PINTEREST_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.PINTEREST_REDIRECT_URI!,
      }),
    });

    const tokenData = await tokenResponse.json();

    // Store access token for user
    await prisma.user.update({
      where: { id: userId },
      data: {
        pinterestAccessToken: tokenData.access_token,
        pinterestRefreshToken: tokenData.refresh_token,
      },
    });

    return NextResponse.redirect('/dashboard?connected=pinterest');
  } catch (error) {
    console.error('Pinterest auth error:', error);
    return NextResponse.redirect('/dashboard?error=pinterest_auth');
  }
}
```

## 📊 Analytics APIs

### 1. Analytics Data API (`app/api/analytics/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('user-id');
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    // Fetch analytics data
    const analytics = await getAnalyticsData(userId, period);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

async function getAnalyticsData(userId: string, period: string) {
  const startDate = getStartDate(period);
  
  const posts = await prisma.post.findMany({
    where: {
      userId,
      createdAt: { gte: startDate },
    },
    include: {
      analytics: true,
    },
  });

  // Calculate metrics
  const totalViews = posts.reduce((sum, post) => sum + (post.analytics?.views || 0), 0);
  const totalSaves = posts.reduce((sum, post) => sum + (post.analytics?.saves || 0), 0);
  const totalShares = posts.reduce((sum, post) => sum + (post.analytics?.shares || 0), 0);
  
  const engagementRate = totalViews > 0 ? (totalSaves + totalShares) / totalViews : 0;

  return {
    totalViews,
    totalSaves,
    totalShares,
    engagementRate,
    topPosts: posts
      .sort((a, b) => (b.analytics?.views || 0) - (a.analytics?.views || 0))
      .slice(0, 5),
    performanceOverTime: await getPerformanceOverTime(userId, startDate),
  };
}
```

### 2. Pinterest Analytics Sync

```typescript
// lib/analytics-sync.ts
export async function syncPinterestAnalytics(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });

  if (!user?.pinterestAccessToken) {
    throw new Error('Pinterest not connected');
  }

  const pinterestService = new PinterestService();

  for (const post of user.posts) {
    if (post.pinterestPinId) {
      try {
        const pinAnalytics = await pinterestService.getPinAnalytics(
          post.pinterestPinId,
          user.pinterestAccessToken
        );

        await prisma.analytics.upsert({
          where: { postId: post.id },
          update: {
            views: pinAnalytics.impressions,
            saves: pinAnalytics.saves,
            shares: pinAnalytics.clicks,
            lastUpdated: new Date(),
          },
          create: {
            postId: post.id,
            views: pinAnalytics.impressions,
            saves: pinAnalytics.saves,
            shares: pinAnalytics.clicks,
            lastUpdated: new Date(),
          },
        });
      } catch (error) {
        console.error(`Failed to sync analytics for post ${post.id}:`, error);
      }
    }
  }
}
```

## 🗄️ Database Schema

### Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                    String    @id @default(cuid())
  email                 String    @unique
  name                  String
  password              String
  pinterestAccessToken  String?
  pinterestRefreshToken String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  posts                 Post[]
  analytics             Analytics[]
}

model Post {
  id              String    @id @default(cuid())
  title           String
  description     String
  imageUrl        String?
  originalUrl     String?
  pinterestPinId  String?
  status          PostStatus @default(DRAFT)
  scheduledAt     DateTime?
  userId          String
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  user            User      @relation(fields: [userId], references: [id])
  analytics       Analytics?
}

model Analytics {
  id          String   @id @default(cuid())
  postId      String   @unique
  views       Int      @default(0)
  saves       Int      @default(0)
  shares      Int      @default(0)
  clicks      Int      @default(0)
  lastUpdated DateTime @default(now())
  
  post        Post     @relation(fields: [postId], references: [id])
  user        User     @relation(fields: [userId], references: [id])
}

enum PostStatus {
  DRAFT
  SCHEDULED
  PUBLISHED
  FAILED
}
```

### Database Setup

```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init

# Generate client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## ⚠️ Error Handling

### Global Error Handler

```typescript
// lib/error-handler.ts
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  console.error('Unexpected error:', error);
  return {
    message: 'Internal server error',
    statusCode: 500,
  };
}
```

### API Route Error Handling

```typescript
// app/api/example/route.ts
import { handleApiError } from '@/lib/error-handler';

export async function POST(request: NextRequest) {
  try {
    // API logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    const { message, statusCode } = handleApiError(error);
    return NextResponse.json(
      { message },
      { status: statusCode }
    );
  }
}
```

## 🧪 Testing APIs

### API Testing with Jest

```typescript
// __tests__/api/auth.test.ts
import { POST } from '@/app/api/auth/login/route';
import { NextRequest } from 'next/server';

describe('/api/auth/login', () => {
  it('should login with valid credentials', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.token).toBeDefined();
  });

  it('should reject invalid credentials', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});
```

### Integration Testing

```typescript
// __tests__/integration/post-generation.test.ts
describe('Post Generation Flow', () => {
  it('should generate posts from sitemap', async () => {
    // 1. Login user
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    
    const token = loginResponse.body.token;

    // 2. Generate posts
    const generateResponse = await request(app)
      .post('/api/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        sitemapUrl: 'https://example.com/sitemap.xml',
        options: { maxPosts: 5 },
      });

    expect(generateResponse.status).toBe(200);
    expect(generateResponse.body.posts).toHaveLength(5);
  });
});
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pingenerator"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Pinterest
PINTEREST_CLIENT_ID="your-pinterest-client-id"
PINTEREST_CLIENT_SECRET="your-pinterest-client-secret"
PINTEREST_REDIRECT_URI="http://localhost:3000/api/auth/pinterest"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Redis (for caching and job queues)
REDIS_URL="redis://localhost:6379"
```

## 📚 Additional Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [Pinterest Developer API](https://developers.pinterest.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

---

This guide provides a comprehensive foundation for integrating real APIs into your PinGenerator application. Start with authentication, then move to post generation, and finally add Pinterest integration and analytics.
