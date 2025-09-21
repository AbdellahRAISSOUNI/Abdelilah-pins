# PinGenerator - AI-Powered Pinterest Post Generator

A modern Next.js 14 SaaS application for generating Pinterest posts from blog content using AI-powered tools.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication System](#authentication-system)
- [Dashboard Features](#dashboard-features)
- [API Integration Guide](#api-integration-guide)
- [Deployment Guide](#deployment-guide)
- [Contributing](#contributing)

## 🎯 Project Overview

PinGenerator is a comprehensive SaaS platform that transforms blog content into viral Pinterest posts. The application features a modern landing page, complete authentication system, and a full-featured dashboard for content management.

### Key Features

- **AI-Powered Post Generation**: Transform blog content into Pinterest-optimized posts
- **Sitemap Processing**: Automatically discover and process blog posts from sitemaps
- **Post Management**: Create, edit, schedule, and track Pinterest posts
- **Analytics Dashboard**: Monitor performance and engagement metrics
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Works perfectly on all devices

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Styling & UI
- **Custom Red Theme** - Professional SaaS aesthetic
- **Responsive Design** - Mobile-first approach
- **Component Library** - Reusable UI components
- **Dark Mode Ready** - CSS variables for theming

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundling (dev mode)

## 📁 Project Structure

```
pins/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── signin/               # Sign in page
│   │   └── signup/               # Sign up page
│   ├── (dashboard)/              # Route group for dashboard
│   │   ├── layout.tsx            # Dashboard layout
│   │   ├── dashboard/            # Main dashboard
│   │   ├── generate/             # Post generation
│   │   ├── posts/                # Post management
│   │   ├── scheduled/            # Scheduled posts
│   │   ├── analytics/            # Analytics dashboard
│   │   └── settings/             # User settings
│   ├── features/                 # Features page
│   ├── pricing/                  # Pricing page
│   ├── about/                    # About page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard components
│   ├── landing/                  # Landing page components
│   └── ui/                       # Reusable UI components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── docs/                         # Documentation
├── public/                       # Static assets
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pins
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔐 Authentication System

The application includes a complete authentication system with the following features:

### Features
- **Any Credentials Login**: Accepts any email/password combination for demo purposes
- **Session Persistence**: User data stored in localStorage
- **Protected Routes**: Dashboard requires authentication
- **Automatic Redirects**: Unauthenticated users redirected to login

### Implementation

#### Auth Context (`hooks/use-auth.tsx`)
```typescript
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
```

#### Usage Example
```typescript
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  const handleLogin = async () => {
    const success = await login("user@example.com", "password");
    if (success) {
      // Redirect to dashboard
    }
  };
}
```

### API Integration for Real Authentication

To implement real authentication, replace the mock functions in `hooks/use-auth.tsx`:

```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};
```

## 🎛 Dashboard Features

### Layout System

The dashboard uses a sophisticated layout system:

#### Sidebar Navigation
- **Dashboard Home**: Overview and quick stats
- **Generate Posts**: AI-powered post creation
- **My Posts**: Post management and editing
- **Scheduled Posts**: Content scheduling
- **Analytics**: Performance metrics
- **Settings**: User preferences

#### Top Bar
- **Search**: Global search functionality
- **Notifications**: Alert system
- **User Menu**: Profile and logout options

### Key Pages

#### 1. Dashboard Home (`/dashboard`)
- Welcome message with user's name
- Quick stats cards (Posts Generated, Scheduled, etc.)
- Recent activity feed
- Performance overview
- Quick action buttons

#### 2. Generate Posts (`/dashboard/generate`)
- Sitemap URL input
- File upload option
- Advanced generation settings
- Progress indicator
- Generated posts preview

#### 3. My Posts (`/dashboard/posts`)
- Grid and list view modes
- Advanced filtering and search
- Bulk operations
- Post status management
- Performance metrics

#### 4. Scheduled Posts (`/dashboard/scheduled`)
- Calendar view
- Schedule management
- Bulk scheduling operations
- Status tracking

#### 5. Analytics (`/dashboard/analytics`)
- Performance metrics
- Engagement analysis
- Top performing posts
- Export functionality

#### 6. Settings (`/dashboard/settings`)
- Profile management
- Security settings
- Notification preferences
- Account settings

## 🔌 API Integration Guide

### Current State
The application currently uses mock data and simulated API calls. Here's how to integrate real APIs:

### 1. Post Generation API

#### Mock Implementation
```typescript
// In generate page
const handleGenerate = async () => {
  setIsGenerating(true);
  // Simulate API call
  setTimeout(() => {
    setGeneratedPosts(mockPosts);
    setIsGenerating(false);
  }, 3000);
};
```

#### Real API Integration
```typescript
const handleGenerate = async () => {
  setIsGenerating(true);
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        sitemapUrl,
        options: generationOptions 
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      setGeneratedPosts(data.posts);
    }
  } catch (error) {
    setError('Generation failed');
  } finally {
    setIsGenerating(false);
  }
};
```

### 2. Posts Management API

#### Create API Endpoints
```typescript
// pages/api/posts/index.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get user's posts
    const posts = await getPosts(req.user.id);
    res.json(posts);
  } else if (req.method === 'POST') {
    // Create new post
    const post = await createPost(req.body);
    res.json(post);
  }
}
```

### 3. Analytics API

#### Performance Metrics
```typescript
const fetchAnalytics = async () => {
  const response = await fetch('/api/analytics', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

### 4. Sitemap Processing

#### Backend Service
```typescript
// lib/sitemap-processor.ts
export async function processSitemap(sitemapUrl: string) {
  // Fetch sitemap
  const response = await fetch(sitemapUrl);
  const xml = await response.text();
  
  // Parse XML
  const urls = parseSitemap(xml);
  
  // Process each URL
  const posts = await Promise.all(
    urls.map(url => generatePostFromUrl(url))
  );
  
  return posts;
}
```

### 5. Pinterest API Integration

#### Pinterest SDK Setup
```typescript
// lib/pinterest.ts
import { PinterestSDK } from 'pinterest-sdk';

const pinterest = new PinterestSDK({
  accessToken: process.env.PINTEREST_ACCESS_TOKEN,
  apiVersion: 'v5'
});

export async function publishToPinterest(post: Post) {
  const pin = await pinterest.pins.create({
    board_id: post.boardId,
    media_source: {
      source_type: 'image_url',
      url: post.imageUrl
    },
    title: post.title,
    description: post.description,
    link: post.link
  });
  
  return pin;
}
```

## 🎨 Styling & Theme

### Color System
The application uses a custom red theme with HSL color variables:

```css
:root {
  --primary: 0 72% 51%; /* #DC2626 */
  --primary-foreground: 0 0% 98%;
  /* ... other colors */
}
```

### Component Styling
- **Consistent Spacing**: Uses Tailwind's spacing scale
- **Typography**: Inter font with proper hierarchy
- **Shadows**: Subtle depth with consistent shadow system
- **Responsive**: Mobile-first design approach

### Custom Components
All components follow the shadcn/ui pattern:

```typescript
// components/ui/button.tsx
import { cn } from "@/lib/utils";

export function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      {...props}
    />
  );
}
```

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   Set these in Vercel dashboard:
   ```
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://your-domain.com
   PINTEREST_CLIENT_ID=your-client-id
   PINTEREST_CLIENT_SECRET=your-client-secret
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t pingenerator .
   docker run -p 3000:3000 pingenerator
   ```

## 📊 Performance Optimization

### Current Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized JavaScript bundles
- **Lazy Loading**: Components loaded on demand

### Additional Optimizations
- **Caching**: Implement Redis for API caching
- **CDN**: Use Vercel Edge Network or CloudFlare
- **Database**: Optimize queries and add indexes
- **Monitoring**: Add performance monitoring (Vercel Analytics)

## 🧪 Testing Strategy

### Unit Tests
```bash
npm install --save-dev jest @testing-library/react
```

### Component Testing
```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### E2E Testing
```bash
npm install --save-dev playwright
```

## 🔒 Security Considerations

### Current Security Features
- **Input Validation**: Form validation on client side
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js CSRF tokens

### Additional Security
- **Rate Limiting**: Implement API rate limiting
- **Input Sanitization**: Sanitize all user inputs
- **Authentication**: JWT tokens with refresh mechanism
- **HTTPS**: Force HTTPS in production

## 📈 Analytics & Monitoring

### Current Analytics
- **User Engagement**: Track user interactions
- **Performance Metrics**: Monitor page load times
- **Error Tracking**: Console error monitoring

### Recommended Additions
- **Google Analytics**: User behavior tracking
- **Sentry**: Error monitoring and performance
- **Vercel Analytics**: Built-in analytics
- **Custom Metrics**: Business-specific KPIs

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript types
4. Add tests for new features
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Follow configured rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Use standard commit messages

## 📞 Support

For questions or issues:
- **Documentation**: Check this folder for detailed guides
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: PinGenerator Team
