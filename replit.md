# React Learning Playground

## Overview
A Next.js learning platform designed for teenagers (15-18) and career changers to learn fullstack development. It offers a hybrid model combining high-quality self-paced content with personalized small-group mentoring (max 5 students per cohort). The platform uses a structured 12-week curriculum with weekly live classes and optional 1:1 sessions, aiming for students to build a complete professional portfolio by week 12.

## User Preferences
- **Language**: Portuguese (Brazil) for content and UI
- **Target Age**: 15-18 years old (digestible, encouraging tone)
- **Focus**: Practical skills over academic theory
- **Outcome**: Complete portfolio ready for first opportunities

## System Architecture
The project utilizes a **Learn-Practice-Apply Model** within a 12-week structure, where each week includes theory content, practical challenges, and a weekly portfolio project. All projects progressively build towards a professional portfolio.

### UI/UX Decisions
- **Monaco Editor Integration**: For interactive coding challenges, featuring syntax highlighting, execution, reset, and solution viewing.
- **Progressive Portfolio Building**: Each project contributes to a complete professional portfolio.
- **Gamified Rewards**: XP and badges for completing challenges and projects.
- **Interactive Learning Paths Navigation**: Landing pages showcase learning paths, with detailed weekly overviews, visual progress tracking, and interactive pre-class checklists.

### Technical Implementations
- **Challenge System**: Features a `ChallengeEditor` (Monaco Editor) for JavaScript coding, a robust `CodeValidator` service for client-side validation, and a `ChallengeSubmissionService` for Supabase persistence, tracking attempts and updating XP.
- **Weekly Project System**: Includes a `ProjectSubmissionForm` for project submissions (GitHub/Live URLs, description), with validation, status tracking, mentor feedback display, and an `ProjectSubmissionService` for CRUD operations with Supabase.
- **Scaffolding System**: Utilizes reusable utilities and a CLI generator (`npm run generate:week`) for creating new modules efficiently.
- **Resources Mapping**: A centralized system (`resources-map.ts`) links supporting materials contextually to weekly modules.

### Feature Specifications
#### For Students
- **12-Week Structured Curriculum**: Progressive modules from HTML to React deployment.
- **Interactive Monaco Editor**: For hands-on coding.
- **Real Portfolio Building**: Projects contribute to a professional portfolio.
- **Progress Tracking**: Monitors theory completion, challenge attempts, and project submissions.
- **Pre-Class Checklists**: Ensures readiness for live sessions.
- **XP & Badges**: Gamified rewards.
- **Mentor Feedback System**: Direct feedback on projects.

#### For Mentors
- **Cohort Management**: Track up to 5 students per group.
- **Live Class Scheduling**: Manage weekly sessions.
- **1:1 Session Booking**: Optional individual mentorship.
- **Progress Dashboard**: Monitor student progress.
- **Project Review System**: Grade and provide feedback.
- **Challenge Analytics**: Identify struggling students.

### System Design Choices
- **Tech Stack**: Next.js 15.5.4, React 19, TypeScript, Tailwind CSS, Monaco Editor, Supabase.
- **Directory Structure**: Organized with `app/`, `components/`, `hooks/`, `lib/` (including `learning/`, `supabase/`, `themes/`, `validation/`), `types/`, and `supabase/migrations/`.
- **Development Environment**: Configured for Replit with port binding to `0.0.0.0:5000`.
- **Database Schema**: Designed for comprehensive tracking of student progress, challenge submissions, project submissions, cohort management, live classes, and 1:1 sessions.

## External Dependencies
- **Next.js**: Frontend framework.
- **React**: UI library.
- **TypeScript**: Statically typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Monaco Editor**: VS Code's code editor component, used for interactive coding challenges.
- **Supabase**: Backend-as-a-Service providing PostgreSQL database, authentication, and APIs.