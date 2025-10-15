# React Learning Playground

## Overview
A Next.js 15 learning playground application for teaching fullstack development with React, HTML, CSS, and JavaScript. The app features interactive coding challenges, progress tracking, quizzes, and a gamified learning experience with badges and XP.

## Current State
- Successfully migrated from Vercel to Replit (October 15, 2025)
- Running on Next.js 15.5.4 with React 19
- Integrated with Supabase for data persistence
- Configured for Replit environment with proper port binding (0.0.0.0:5000)

## Recent Changes (October 15, 2025)
- **Replit Migration Completed**: Successfully migrated from Vercel to Replit
- **Port Configuration**: Updated package.json scripts to bind to 0.0.0.0:5000 for Replit compatibility
- **Environment Setup**: Configured Supabase credentials as environment secrets (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- **Workflow Configuration**: Set up development server workflow running Next.js dev server on port 5000
- **Deployment Configuration**: Configured autoscale deployment for production
- **TypeScript Fixes**: Fixed linting errors to ensure production builds succeed
  - Added useCallback to BadgeUnlockNotification component
  - Fixed event listener type casting
  - Fixed JSONB type casting in quiz-attempts service

## Project Architecture

### Tech Stack
- **Frontend**: Next.js 15.5.4, React 19, TypeScript
- **Styling**: Tailwind CSS with custom theme system
- **Code Editor**: Monaco Editor (VS Code editor component)
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: npm

### Key Features
- Interactive coding playground with Monaco editor
- Progress tracking and quiz attempts
- Badge system and XP rewards
- Learning topics: HTML, CSS, JavaScript, React
- Intelligent hint system
- Social/gamification features
- Reading progress tracking

### Directory Structure
```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Core business logic
│   ├── learning/    # Learning system (topics, quizzes, progress)
│   ├── supabase/    # Database client and schema
│   ├── themes/      # Theme system
│   └── validation/  # Code validation
└── types/           # TypeScript type definitions
```

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

## Development

### Running the App
The app automatically starts when you open the Repl. The development server runs on port 5000.

### Scripts
- `npm run dev` - Start development server on 0.0.0.0:5000
- `npm run build` - Build for production
- `npm start` - Start production server on 0.0.0.0:5000
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

## Deployment
Configured for Replit's autoscale deployment:
- **Build**: `npm run build`
- **Start**: `npm run start`
- Serves on port 5000 with host binding to 0.0.0.0

## Database Schema
The app uses Supabase with the following tables:
- `students` - User profiles with XP, badges, and streaks
- `submissions` - Code challenge submissions
- `challenges_metadata` - Challenge definitions
- Additional tables for quiz attempts and reading progress

## User Preferences
(To be updated as preferences are discovered)
