# Quick Start Guide

Get up and running with PinGenerator in minutes!

## 🚀 Quick Setup

### 1. Prerequisites
- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### 2. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd pins

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000` and you're ready to go!

## 🎯 What You'll See

### Landing Page
- **Hero Section**: Compelling headlines and call-to-action buttons
- **Features**: 6 key features with icons and descriptions
- **How It Works**: 3-step process explanation
- **Navigation**: Clean header with logo and menu items

### Authentication
- **Sign In/Sign Up**: Any credentials work for demo purposes
- **Dashboard Access**: Full dashboard after login
- **Session Persistence**: Stays logged in between visits

### Dashboard
- **Sidebar Navigation**: All main features accessible
- **Stats Cards**: Quick overview of account activity
- **Post Generation**: Input area for sitemap URLs
- **Post Management**: Grid view of created posts

## 🎨 Key Features to Explore

### 1. Responsive Design
- Resize your browser window to see mobile responsiveness
- Navigation collapses to hamburger menu on mobile
- Sidebar becomes overlay on smaller screens

### 2. Authentication Flow
- Try signing in with any email/password combination
- Notice the loading states and form validation
- Experience the smooth transition to dashboard

### 3. Dashboard Navigation
- Click through different dashboard sections
- Notice the clean, professional interface
- Explore the sidebar and top bar functionality

### 4. Form Interactions
- Try the post generation form
- Notice validation and loading states
- Experience the user-friendly error handling

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📁 Project Structure Overview

```
pins/
├── app/                    # Next.js pages and layouts
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/              # Auth-related components
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── docs/                  # Documentation
```

## 🎯 Key Components to Understand

### Authentication System
- **`hooks/use-auth.tsx`**: Global auth state management
- **`components/auth/protected-route.tsx`**: Route protection
- **`app/(auth)/signin/page.tsx`**: Login page
- **`app/(auth)/signup/page.tsx`**: Registration page

### Layout System
- **`app/layout.tsx`**: Root layout with providers
- **`components/layout/conditional-layout.tsx`**: Smart layout rendering
- **`app/(dashboard)/layout.tsx`**: Dashboard-specific layout

### Landing Page
- **`components/landing/hero-section.tsx`**: Main hero section
- **`components/landing/features-section.tsx`**: Features showcase
- **`components/landing/how-it-works-section.tsx`**: Process explanation

### Dashboard
- **`components/dashboard/sidebar.tsx`**: Navigation sidebar
- **`components/dashboard/top-bar.tsx`**: Top navigation bar
- **`app/(dashboard)/dashboard/page.tsx`**: Main dashboard page

## 🔧 Customization Guide

### Changing Colors
Edit `app/globals.css` to modify the color scheme:

```css
:root {
  --primary: 0 72% 51%;        /* Change this for primary color */
  --primary-foreground: 0 0% 98%;
  /* ... other color variables */
}
```

### Adding New Pages
1. Create a new file in the appropriate folder
2. Export a default React component
3. Add navigation links if needed

### Modifying Components
- All components are in the `components/` directory
- Use TypeScript for type safety
- Follow the existing patterns for consistency

## 🚀 Ready for API Integration

The application is currently using mock data and simulated API calls. To integrate real APIs:

1. **Authentication**: Replace mock functions in `hooks/use-auth.tsx`
2. **Post Generation**: Connect to AI/content generation services
3. **Database**: Set up PostgreSQL and Prisma
4. **Pinterest**: Integrate Pinterest API for publishing

See `docs/API_INTEGRATION.md` for detailed integration instructions.

## 🆘 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"
```

### Getting Help
- Check the console for error messages
- Review the documentation in the `docs/` folder
- Ensure all dependencies are installed correctly
- Verify Node.js version is 18+

## 📚 Next Steps

1. **Explore the Code**: Browse through components and pages
2. **Read Documentation**: Check out the detailed guides in `docs/`
3. **Customize**: Modify colors, text, and components as needed
4. **Plan Integration**: Review API integration requirements
5. **Deploy**: Follow deployment guide when ready

## 🎉 You're All Set!

The PinGenerator application is now running locally with:
- ✅ Complete landing page
- ✅ Working authentication system
- ✅ Full dashboard interface
- ✅ Responsive design
- ✅ Professional UI/UX

Ready to build something amazing! 🚀
