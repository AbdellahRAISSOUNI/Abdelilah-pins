# Deployment Guide

This guide covers deploying the PinGenerator application to various platforms.

## 📋 Table of Contents

- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Docker Deployment](#docker-deployment)
- [AWS Deployment](#aws-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

## 🚀 Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications due to its seamless integration and excellent performance.

### 1. Prerequisites

- Vercel account (free tier available)
- GitHub repository
- Domain name (optional)

### 2. Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Deploy to production
vercel --prod
```

#### Option B: GitHub Integration

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the project directory

2. **Configure Build Settings**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### 3. Environment Variables

Set the following environment variables in Vercel dashboard:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# OpenAI API
OPENAI_API_KEY=your-openai-api-key

# Pinterest API
PINTEREST_CLIENT_ID=your-pinterest-client-id
PINTEREST_CLIENT_SECRET=your-pinterest-client-secret
PINTEREST_REDIRECT_URI=https://your-domain.com/api/auth/pinterest

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com

# Redis (if using)
REDIS_URL=redis://host:port
```

### 4. Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**
   ```env
   NEXTAUTH_URL=https://your-custom-domain.com
   PINTEREST_REDIRECT_URI=https://your-custom-domain.com/api/auth/pinterest
   ```

### 5. Automatic Deployments

Vercel automatically deploys when you push to your main branch:

```bash
# Make changes and push
git add .
git commit -m "Update features"
git push origin main

# Vercel automatically deploys
```

## 🐳 Docker Deployment

Deploy using Docker for containerized environments.

### 1. Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Create Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/pingenerator
      - JWT_SECRET=your-jwt-secret
      - OPENAI_API_KEY=your-openai-key
      - PINTEREST_CLIENT_ID=your-pinterest-client-id
      - PINTEREST_CLIENT_SECRET=your-pinterest-client-secret
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=pingenerator
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### 3. Build and Run

```bash
# Build Docker image
docker build -t pingenerator .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f app
```

### 4. Production Docker Commands

```bash
# Build for production
docker build -t pingenerator:latest .

# Run production container
docker run -d \
  --name pingenerator \
  -p 3000:3000 \
  -e DATABASE_URL=your-database-url \
  -e JWT_SECRET=your-jwt-secret \
  pingenerator:latest
```

## ☁️ AWS Deployment

Deploy to AWS using various services.

### 1. AWS Amplify (Recommended for Frontend)

#### Setup Amplify

```bash
# Install AWS CLI
npm install -g @aws-amplify/cli

# Configure AWS CLI
aws configure

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

#### Amplify Configuration

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 2. AWS EC2 Deployment

#### Launch EC2 Instance

1. **Create EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Instance type: t3.micro (free tier)
   - Configure security group (ports 22, 80, 443)

2. **Connect to Instance**

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### Deploy Application

```bash
# Clone repository
git clone https://github.com/your-username/pingenerator.git
cd pingenerator

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "pingenerator" -- start
pm2 startup
pm2 save
```

#### Configure Nginx

```nginx
# /etc/nginx/sites-available/pingenerator
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pingenerator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. AWS RDS Database

```bash
# Create RDS PostgreSQL instance
aws rds create-db-instance \
    --db-instance-identifier pingenerator-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password your-password \
    --allocated-storage 20
```

## 🗄️ Database Setup

### 1. PostgreSQL Setup

#### Local Development

```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql postgresql-contrib  # Ubuntu

# Start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Ubuntu

# Create database
createdb pingenerator

# Create user
psql -c "CREATE USER pingenerator WITH PASSWORD 'password';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE pingenerator TO pingenerator;"
```

#### Production Database

**Option A: Managed Database Services**
- **Vercel Postgres**: Integrated with Vercel
- **PlanetScale**: MySQL-compatible
- **Supabase**: PostgreSQL with additional features
- **AWS RDS**: Managed PostgreSQL

**Option B: Self-Hosted PostgreSQL**

```bash
# Install PostgreSQL on Ubuntu
sudo apt update
sudo apt install postgresql postgresql-contrib

# Configure PostgreSQL
sudo -u postgres psql
CREATE DATABASE pingenerator;
CREATE USER pingenerator WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE pingenerator TO pingenerator;
\q
```

### 2. Database Migrations

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed database (optional)
npx prisma db seed
```

### 3. Database Connection String

```env
# Local development
DATABASE_URL="postgresql://pingenerator:password@localhost:5432/pingenerator"

# Production (example)
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"
```

## 📊 Monitoring & Analytics

### 1. Application Monitoring

#### Vercel Analytics (Built-in)

```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

#### Sentry Error Monitoring

```bash
# Install Sentry
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 2. Performance Monitoring

#### Web Vitals

```typescript
// lib/analytics.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Send to analytics service
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: metric.label,
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
```

### 3. Uptime Monitoring

**Recommended Services:**
- **UptimeRobot**: Free tier available
- **Pingdom**: Comprehensive monitoring
- **StatusCake**: Simple uptime monitoring

## 🔧 Environment Variables

### Development (.env.local)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pingenerator"

# JWT
JWT_SECRET="development-secret-key"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Pinterest
PINTEREST_CLIENT_ID="your-pinterest-client-id"
PINTEREST_CLIENT_SECRET="your-pinterest-client-secret"
PINTEREST_REDIRECT_URI="http://localhost:3000/api/auth/pinterest"

# NextAuth
NEXTAUTH_SECRET="development-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```

### Production Environment Variables

Set these in your deployment platform:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# JWT (use a strong, random secret)
JWT_SECRET="your-super-secure-jwt-secret-key"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Pinterest
PINTEREST_CLIENT_ID="your-pinterest-client-id"
PINTEREST_CLIENT_SECRET="your-pinterest-client-secret"
PINTEREST_REDIRECT_URI="https://your-domain.com/api/auth/pinterest"

# NextAuth
NEXTAUTH_SECRET="your-super-secure-nextauth-secret"
NEXTAUTH_URL="https://your-domain.com"

# Monitoring
SENTRY_DSN="your-sentry-dsn"

# Redis (if using)
REDIS_URL="redis://username:password@host:port"
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### 2. Database Connection Issues

```bash
# Test database connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# Check connection string
echo $DATABASE_URL
```

#### 3. Environment Variables Not Loading

```bash
# Check if variables are set
vercel env ls

# Pull environment variables locally
vercel env pull .env.local
```

#### 4. CORS Issues

```typescript
// pages/api/cors.ts
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
}
```

### Performance Optimization

#### 1. Enable Compression

```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
};
```

#### 2. Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

#### 3. Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure JWT secrets
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable security headers
- [ ] Regular dependency updates
- [ ] Database connection encryption

## 📚 Additional Resources

- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

This deployment guide covers the most common deployment scenarios. Choose the option that best fits your needs and infrastructure requirements.
