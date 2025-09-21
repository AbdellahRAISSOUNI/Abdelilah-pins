# Development Guide

This guide provides comprehensive information for developers working on the PinGenerator project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Code Standards](#code-standards)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Testing](#testing)
- [Debugging](#debugging)
- [Performance Optimization](#performance-optimization)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- VS Code (recommended)
- PostgreSQL (for database features)

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd pins
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

### VS Code Extensions

Recommended extensions for optimal development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "prisma.prisma",
    "ms-vscode.vscode-json"
  ]
}
```

## 🏗️ Project Architecture

### Folder Structure

```
pins/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups for auth pages
│   ├── (dashboard)/              # Route groups for dashboard
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard-specific components
│   ├── landing/                  # Landing page components
│   ├── layout/                   # Layout components
│   └── ui/                       # Reusable UI components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and configurations
├── types/                        # TypeScript type definitions
├── docs/                         # Documentation
└── public/                       # Static assets
```

### Key Architectural Patterns

#### 1. Route Groups
Next.js route groups allow organizing routes without affecting the URL structure:

```
app/
├── (auth)/           # Auth pages - no nav/footer
│   ├── signin/
│   └── signup/
├── (dashboard)/      # Dashboard pages - sidebar layout
│   ├── dashboard/
│   ├── generate/
│   └── posts/
└── layout.tsx        # Root layout
```

#### 2. Conditional Layouts
The `ConditionalLayout` component determines which layout to show:

```typescript
// components/layout/conditional-layout.tsx
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname === "/signin" || pathname === "/signup";
  
  const showNavAndFooter = !isDashboardRoute && !isAuthRoute;
  
  return (
    <div className="relative flex min-h-screen flex-col">
      {showNavAndFooter && <Navigation />}
      <main className="flex-1">{children}</main>
      {showNavAndFooter && <Footer />}
    </div>
  );
}
```

#### 3. Component Composition
Components are built using composition patterns:

```typescript
// Example: Button component with variants
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export function Button({ variant = 'default', size = 'default', className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

## 📝 Code Standards

### TypeScript Guidelines

#### 1. Strict Type Checking
Always use explicit types and avoid `any`:

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name: string;
}

const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe'
};

// ❌ Bad
const user: any = { /* ... */ };
```

#### 2. Component Props
Define clear interfaces for component props:

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export function HeroSection({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink, 
  className 
}: HeroSectionProps) {
  // Component implementation
}
```

#### 3. API Response Types
Define types for API responses:

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'draft' | 'published' | 'scheduled';
}

type PostsResponse = ApiResponse<Post[]>;
```

### Naming Conventions

#### 1. Files and Directories
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase starting with 'use' (`useAuth.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Pages**: lowercase with hyphens (`user-settings.tsx`)

#### 2. Variables and Functions
```typescript
// ✅ Good
const userName = 'john';
const isLoggedIn = true;
const handleUserLogin = () => { /* ... */ };

// ❌ Bad
const user_name = 'john';
const loggedIn = true;
const login = () => { /* ... */ };
```

#### 3. CSS Classes
Follow BEM methodology for custom CSS:

```css
/* ✅ Good */
.user-profile__avatar {}
.user-profile__name {}
.user-profile__name--highlighted {}

/* ❌ Bad */
.userProfile {}
.userName {}
.highlightedName {}
```

### Code Organization

#### 1. Import Order
```typescript
// 1. React and Next.js imports
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

// 3. Internal imports (absolute paths)
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/lib/utils';

// 4. Relative imports
import './component.css';
```

#### 2. Component Structure
```typescript
// 1. Imports
import React from 'react';

// 2. Types and interfaces
interface ComponentProps {
  // ...
}

// 3. Component definition
export function Component({ prop }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// 7. Default export
export default Component;
```

## 🧩 Component Development

### Component Patterns

#### 1. Compound Components
Create related components that work together:

```typescript
// components/ui/card.tsx
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
  )
);

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);

export { Card, CardHeader, CardContent };
```

#### 2. Render Props Pattern
For flexible component composition:

```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: string | null) => React.ReactNode;
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}
```

#### 3. Custom Hooks
Extract reusable logic into custom hooks:

```typescript
// hooks/use-local-storage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### Component Testing

#### 1. Unit Testing with Jest
```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

#### 2. Integration Testing
```typescript
// __tests__/integration/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '@/hooks/use-auth';
import { SignInPage } from '@/app/(auth)/signin/page';

const renderWithAuth = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('Authentication Flow', () => {
  it('allows user to sign in', async () => {
    renderWithAuth(<SignInPage />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

## 🔄 State Management

### Context API Usage

#### 1. Authentication Context
```typescript
// hooks/use-auth.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Context implementation
  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

#### 2. Form State Management
```typescript
// hooks/use-form.ts
interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
```

### Server State Management

For complex server state, consider using libraries like SWR or React Query:

```typescript
// hooks/use-posts.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePosts() {
  const { data, error, mutate } = useSWR('/api/posts', fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

export function usePost(id: string) {
  const { data, error, mutate } = useSWR(`/api/posts/${id}`, fetcher);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}
```

## 🧪 Testing

### Testing Setup

#### 1. Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

#### 2. Test Setup File
```javascript
// jest.setup.js
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));
```

### Testing Strategies

#### 1. Component Testing
```typescript
// Test component behavior and user interactions
describe('PostCard', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    description: 'Test description',
    imageUrl: 'https://example.com/image.jpg',
    status: 'draft' as const
  };

  it('displays post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockPost.imageUrl);
  });

  it('handles edit action', () => {
    const onEdit = jest.fn();
    render(<PostCard post={mockPost} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByLabelText('Edit post'));
    expect(onEdit).toHaveBeenCalledWith(mockPost.id);
  });
});
```

#### 2. Hook Testing
```typescript
// Test custom hooks in isolation
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test')).toBe('"updated"');
  });
});
```

#### 3. API Testing
```typescript
// Test API routes
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/posts/route';

describe('/api/posts', () => {
  it('returns posts for authenticated user', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        authorization: 'Bearer valid-token'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('posts');
  });
});
```

## 🐛 Debugging

### Development Tools

#### 1. React Developer Tools
Install the React Developer Tools browser extension for component debugging.

#### 2. Next.js Debug Mode
```bash
# Enable debug mode
DEBUG=* npm run dev

# Or for specific modules
DEBUG=next:* npm run dev
```

#### 3. Console Logging
```typescript
// Use structured logging
console.group('🚀 Component Render');
console.log('Props:', props);
console.log('State:', state);
console.groupEnd();

// Use conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### Common Debugging Scenarios

#### 1. Hydration Errors
```typescript
// Fix hydration mismatches
useEffect(() => {
  // Client-only code
  setMounted(true);
}, []);

if (!mounted) {
  return <div>Loading...</div>;
}
```

#### 2. State Updates
```typescript
// Debug state updates
const [state, setState] = useState(initialState);

useEffect(() => {
  console.log('State changed:', state);
}, [state]);
```

#### 3. API Calls
```typescript
// Debug API responses
const fetchData = async () => {
  try {
    console.log('Fetching data from:', url);
    const response = await fetch(url);
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

## ⚡ Performance Optimization

### Code Splitting

#### 1. Dynamic Imports
```typescript
// Lazy load components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// Lazy load with suspense
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

#### 2. Route-based Splitting
Next.js automatically splits code by routes, but you can optimize further:

```typescript
// pages/dashboard.tsx - automatically code split
export default function Dashboard() {
  return <div>Dashboard content</div>;
}
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={300}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      priority={false}
    />
  );
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to package.json
"analyze": "ANALYZE=true npm run build"

# Run analysis
npm run analyze
```

### Performance Monitoring

```typescript
// lib/analytics.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: metric.label,
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

This development guide provides the foundation for building and maintaining the PinGenerator application. Follow these guidelines to ensure code quality, maintainability, and performance.
