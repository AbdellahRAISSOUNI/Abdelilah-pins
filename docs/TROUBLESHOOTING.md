# Troubleshooting Guide

Common issues and solutions for the PinSlayer application.

## 📋 Table of Contents

- [Development Issues](#development-issues)
- [Build & Deployment Issues](#build--deployment-issues)
- [Authentication Issues](#authentication-issues)
- [UI/UX Issues](#uiux-issues)
- [Performance Issues](#performance-issues)
- [API Integration Issues](#api-integration-issues)

## 🛠 Development Issues

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Option 1: Kill the process
npx kill-port 3000

# Option 2: Use different port
npm run dev -- -p 3001

# Option 3: Find and kill process manually
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows (then kill PID)
```

### Module Not Found Errors

**Error**: `Module not found: Can't resolve '@/components/...'`

**Solution**:
```bash
# Check tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

# Restart development server
npm run dev
```

### TypeScript Errors

**Error**: `Property 'X' does not exist on type 'Y'`

**Solutions**:
```typescript
// Option 1: Add proper typing
interface User {
  id: string;
  name: string;
  email: string;
}

// Option 2: Use optional chaining
user?.name

// Option 3: Type assertion (use sparingly)
(user as any).property
```

### Hot Reload Not Working

**Symptoms**: Changes not reflecting in browser

**Solutions**:
```bash
# Restart development server
npm run dev

# Clear Next.js cache
rm -rf .next

# Check for syntax errors in console
# Ensure file is saved
```

## 🔨 Build & Deployment Issues

### Build Failures

**Error**: `Failed to compile`

**Solutions**:
```bash
# Clear all caches
rm -rf .next
rm -rf node_modules
rm package-lock.json

# Reinstall dependencies
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Try building again
npm run build
```

### Environment Variables Not Loading

**Error**: `process.env.VARIABLE is undefined`

**Solutions**:
```bash
# Check .env.local file exists
ls -la .env.local

# Verify variable names (no spaces around =)
DATABASE_URL=postgresql://...

# Restart development server
npm run dev

# For production, set in deployment platform
```

### Vercel Deployment Issues

**Error**: `Build failed on Vercel`

**Solutions**:
```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Import/export issues

# Local build test
npm run build
npm start

# Check Vercel configuration
# vercel.json or next.config.js
```

## 🔐 Authentication Issues

### Login Not Working

**Symptoms**: Cannot log in with credentials

**Solutions**:
```typescript
// Check if useAuth hook is properly set up
import { useAuth } from '@/hooks/use-auth';

// Verify AuthProvider wraps the app
// In app/layout.tsx
<AuthProvider>
  <ConditionalLayout>{children}</ConditionalLayout>
</AuthProvider>

// Check localStorage for user data
console.log(localStorage.getItem('user'));
```

### Session Not Persisting

**Symptoms**: Logged out on page refresh

**Solutions**:
```typescript
// Check localStorage implementation
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  setIsLoading(false);
}, []);

// Clear browser storage if corrupted
localStorage.clear();
```

### Redirect Issues

**Symptoms**: Wrong redirect after login/logout

**Solutions**:
```typescript
// Check protected route implementation
useEffect(() => {
  if (!isLoading && !user) {
    router.push("/signin"); // Ensure correct path
  }
}, [user, isLoading, router]);

// Verify route paths match
// /signin not /auth/signin
```

## 🎨 UI/UX Issues

### Styles Not Loading

**Symptoms**: Page appears unstyled

**Solutions**:
```bash
# Check Tailwind CSS configuration
# tailwind.config.js should exist

# Verify globals.css import
# app/layout.tsx should import './globals.css'

# Check PostCSS configuration
# postcss.config.js should exist

# Restart development server
npm run dev
```

### Layout Issues

**Symptoms**: Navigation/footer showing on wrong pages

**Solutions**:
```typescript
// Check ConditionalLayout logic
const isDashboardRoute = pathname.startsWith("/dashboard");
const isAuthRoute = pathname === "/signin" || pathname === "/signup";
const showNavAndFooter = !isDashboardRoute && !isAuthRoute;

// Verify pathname detection
console.log('Current pathname:', pathname);
```

### Mobile Responsiveness Issues

**Symptoms**: Layout broken on mobile devices

**Solutions**:
```css
/* Check Tailwind responsive classes */
<div className="flex flex-col md:flex-row">

/* Verify viewport meta tag */
<meta name="viewport" content="width=device-width, initial-scale=1" />

/* Test with browser dev tools */
/* Use device simulation */
```

### Component Not Rendering

**Symptoms**: Component appears blank

**Solutions**:
```typescript
// Check for JavaScript errors in console
// Verify component export/import
export default function MyComponent() { /* ... */ }

// Check for conditional rendering
{user && <UserProfile user={user} />}

// Add debug logging
console.log('Component props:', props);
console.log('Component state:', state);
```

## ⚡ Performance Issues

### Slow Loading

**Symptoms**: Pages take long to load

**Solutions**:
```typescript
// Implement code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'));

// Optimize images
import Image from 'next/image';
<Image src="/image.jpg" width={500} height={300} />

// Check bundle size
npm run build
# Look for large chunks in build output
```

### Memory Leaks

**Symptoms**: Browser becomes slow over time

**Solutions**:
```typescript
// Clean up event listeners
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// Clear intervals/timeouts
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);
```

### Hydration Mismatch

**Error**: `Hydration failed because the server rendered HTML didn't match the client`

**Solutions**:
```typescript
// Use useEffect for client-only code
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div>Loading...</div>;
}

// Check for conditional rendering based on window
if (typeof window !== 'undefined') {
  // Client-only code
}
```

## 🔌 API Integration Issues

### CORS Errors

**Error**: `Access to fetch at 'X' from origin 'Y' has been blocked by CORS policy`

**Solutions**:
```typescript
// Configure CORS in API routes
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  // ... rest of handler
}
```

### Network Request Failures

**Error**: `Failed to fetch`

**Solutions**:
```typescript
// Add error handling
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error('Fetch error:', error);
  // Handle error appropriately
}

// Check network tab in dev tools
// Verify API endpoint is correct
// Check authentication headers
```

### Environment Variables in API Routes

**Error**: `process.env.VARIABLE is undefined in API route`

**Solutions**:
```bash
# Check .env.local file
# Restart development server after changes
# For production, set in deployment platform

# Verify variable access
console.log('Environment variable:', process.env.VARIABLE);
```

## 🔍 Debugging Techniques

### Browser DevTools

1. **Console Tab**: Check for JavaScript errors
2. **Network Tab**: Monitor API requests
3. **Elements Tab**: Inspect DOM and styles
4. **Performance Tab**: Profile performance issues
5. **Application Tab**: Check localStorage, cookies

### React DevTools

1. **Components Tab**: Inspect component tree and props
2. **Profiler Tab**: Identify performance bottlenecks
3. **Hooks Tab**: Debug custom hooks

### Next.js Debugging

```bash
# Enable debug mode
DEBUG=* npm run dev

# Specific debugging
DEBUG=next:* npm run dev
DEBUG=next:router* npm run dev
```

### Logging Strategies

```typescript
// Structured logging
console.group('🚀 Component Render');
console.log('Props:', props);
console.log('State:', state);
console.groupEnd();

// Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
}
```

## 🆘 Getting Help

### Self-Help Checklist

- [ ] Check browser console for errors
- [ ] Verify all dependencies are installed
- [ ] Clear browser cache and localStorage
- [ ] Restart development server
- [ ] Check file paths and imports
- [ ] Verify environment variables
- [ ] Test in incognito/private mode

### Common Error Patterns

1. **Import/Export Issues**: Check file paths and export syntax
2. **TypeScript Errors**: Verify type definitions
3. **CSS Issues**: Check Tailwind configuration
4. **Authentication Issues**: Verify context provider setup
5. **Routing Issues**: Check file structure and paths

### When to Ask for Help

- Error persists after trying solutions
- Unclear error messages
- Performance issues not resolved
- Complex integration problems
- Security concerns

### Providing Help Information

When asking for help, include:
- Error message (exact text)
- Steps to reproduce
- Browser and version
- Node.js version
- Relevant code snippets
- Console output
- Screenshots if applicable

## 📚 Additional Resources

- [Next.js Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [TypeScript Error Messages](https://www.typescriptlang.org/docs/handbook/2/error-messages.html)
- [Tailwind CSS Troubleshooting](https://tailwindcss.com/docs/content-configuration)

---

Remember: Most issues have simple solutions. Start with the basics (restart server, clear cache) before diving into complex debugging!
