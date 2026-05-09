# TestCovAI - Frontend Implementation

## Overview
Complete frontend application for TestCovAI - an AI-powered code coverage analysis platform. Built with Next.js 16, Tailwind CSS, and shadcn/ui components.

## Architecture

### 🎨 Design System
- **Color Scheme**: Deep blue/purple primary with cyan secondary accent
- **Typography**: Geist Sans (primary) and Geist Mono (monospace)
- **Component Library**: shadcn/ui with custom styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### 🔐 Authentication System
- **useAuth Hook** (`lib/hooks/useAuth.ts`): Manages authentication state
  - Login/Register with email and password
  - Token storage in localStorage
  - Logout functionality
  - Error handling

- **useApi Hook** (`lib/hooks/useApi.ts`): Handles authenticated API requests
  - Bearer token injection
  - Error handling for 400/401/422 responses
  - Loading state management

### 📄 Pages
1. **Landing Page** (`/`) - Hero section, features grid, how-it-works, CTA
2. **Login** (`/login`) - Email/password + OAuth buttons
3. **Register** (`/register`) - Account creation
4. **Dashboard** (`/dashboard`) - File upload and GitHub URL analysis
5. **Results** (`/results`) - Coverage analysis results with recommendations
6. **OAuth Callback** (`/auth/oauth/[provider]`) - OAuth flow handling
7. **OAuth Failed** (`/auth/oauth/failed`) - Error fallback

### 🧩 Components

#### Authentication
- `AuthForm.tsx` - Reusable login/register form
- `OAuthButton.tsx` - GitHub/Google OAuth buttons

#### Layout
- `DashboardHeader.tsx` - Dashboard navigation with user profile
- `LandingHeader.tsx` - Landing page header with nav links

#### Upload Features
- `UploadCard.tsx` - Container for upload options
- `FileDropzone.tsx` - Drag-and-drop ZIP file uploader
- `GitHubUrlForm.tsx` - GitHub repository URL input
- `StatusBadge.tsx` - Upload/processing status indicator

### 🔌 API Routes
Frontend calls the backend API directly (no Next.js API stubs). All endpoints require Bearer token authentication (except login/register):

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /uploads/zip` - ZIP upload (requires auth, `projectId` field)
- `POST /uploads/github-url` - GitHub repo analysis (requires auth, `projectId` + `repoUrl`)

### 🎯 Key Features

#### User Experience
- ✅ Smooth fade-in animations on page load
- ✅ Gradient backgrounds for visual appeal
- ✅ Responsive design for all screen sizes
- ✅ Loading states and error messages
- ✅ Status indicators during upload/analysis

#### Upload Options
- ✅ Drag-and-drop ZIP file support
- ✅ File picker for ZIP selection
- ✅ GitHub URL integration
- ✅ Form validation with user-friendly errors

#### Results Display
- ✅ Coverage percentage with progress bar
- ✅ Test pass/fail metrics
- ✅ File coverage statistics
- ✅ Prioritized recommendations
- ✅ Analysis metadata

### 📦 Dependencies
- `next`: 16.2.4 (with Turbopack)
- `react`: 19
- `tailwindcss`: Latest with OKLch color support
- `@radix-ui`: UI primitives
- `shadcn/ui`: Pre-built components

### 🚀 Getting Started

1. **Install dependencies** (already done):
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Access the app**:
   - Open http://localhost:3000 in your browser
   - Start at the landing page or go directly to /login

### 🔄 Next Steps for Production

1. **Database Integration**:
   - Set up Supabase or similar for user storage
   - Implement password hashing (bcrypt)
   - Store analysis results

2. **OAuth Implementation**:
   - Configure GitHub OAuth app
   - Configure Google OAuth app
   - Implement callback handlers

3. **File Storage**:
   - Integrate Vercel Blob or S3
   - Implement file cleanup

4. **Analysis Engine**:
   - Implement actual code analysis
   - Set up async job processing
   - Calculate real coverage metrics

5. **Deployment**:
   - Deploy to Vercel
   - Set up environment variables
   - Configure production APIs

### 📝 Notes
- All API routes are currently stubs that return mock data
- Authentication tokens are not validated server-side
- File uploads don't persist
- Analysis results are hardcoded for the results page
- Ready for backend implementation
