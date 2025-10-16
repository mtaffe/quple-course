# React Learning Playground

## Overview
A Next.js 15 learning playground designed for **teenagers (15-18) and career changers** to learn fullstack development through a unique hybrid model: **high-quality self-paced content + personalized small-group mentoring** (max 5 students per cohort). The platform uses a structured 12-week curriculum with weekly live classes and optional 1:1 sessions.

## Business Model & Differentiation
- **Target Audience**: Teens 15-18 (primary) + career changers (secondary)
- **Hybrid Learning**: Self-paced weekly modules + live mentoring
- **Small Cohorts**: Maximum 5 students per group for personalized attention
- **Weekly Live Classes**: 1 video call per week for Q&A, code review, and collaborative learning
- **Optional 1:1 Sessions**: Individual mentorship for focused support
- **Mentor**: Fullstack developer with 7 years experience (working for UK company)
- **Outcome-Focused**: Build a complete professional portfolio by week 12

## Pedagogical Architecture (12-Week Structure)

### Learn-Practice-Apply Model
Each week follows a proven learning pattern:
1. **Theory Content** (digestible, video + text) - Study before live class
2. **5 Practical Challenges** (hands-on coding) - Apply concepts immediately  
3. **1 Weekly Project** (portfolio piece) - Build real artifacts
4. **Pre-Class Checklist** - Ensure readiness for live session
5. **Live Class** (60min) - Code review, Q&A, collaborative debugging

### Progressive Portfolio Building
All projects build towards a **complete professional portfolio**:
- **Weeks 1-2**: HTML structure + CSS styling foundations
- **Weeks 3-5**: Advanced CSS (Flexbox, Grid, Responsive)
- **Weeks 6-9**: JavaScript fundamentals + DOM manipulation + APIs
- **Weeks 10-12**: React components, state management, deployment

### Weekly Module Structure
```typescript
WeeklyModule {
  theory: Digestible sections with code examples
  challenges: 5 hands-on coding exercises (graded difficulty)
  weeklyProject: Portfolio piece with completion criteria
  preClassChecklist: Required tasks before live class
  liveClassTopics: Discussion points for mentoring session
  resources: Curated learning materials
}
```

## Current State
- Successfully migrated from Vercel to Replit (October 15, 2025)
- Running on Next.js 15.5.4 with React 19
- Integrated with Supabase for data persistence
- Configured for Replit environment with proper port binding (0.0.0.0:5000)
- **FASE 1 COMPLETA (October 16, 2025)**: Conteúdo educacional production-ready
  - ✅ Semanas 1-6 com conteúdo rico e completo
  - ✅ Semana 9 (React Basics) com conteúdo rico
  - ✅ Semanas 7-8, 10-12 com scaffolds de qualidade
  - ✅ Sistema de utilities reutilizáveis (DRY/KISS)
  - ✅ CLI generator para novos módulos
  - ✅ Resources library integrada
  - ✅ Validação: 12/12 módulos estruturalmente corretos

## Recent Changes (October 16, 2025)

### FASE 2 - Interactive Challenge System ✅ (Latest)
- **ChallengeEditor Component**: Monaco Editor integrado para edição de código JavaScript
  - Syntax highlighting com tema VS Code
  - Botões: Executar, Resetar, Ver Solução
  - Estados visuais claros (idle, running, success, error)
  - Seção de dicas expandible
  - Critérios de validação visíveis
- **CodeValidator Service**: Validação robusta client-side com 3 bugs críticos corrigidos:
  - ✅ Bug 1: Console restoration movido para `finally` block (previne wrapper stacking)
  - ✅ Bug 2: Execução com erro força `success=false` (elimina false positives)
  - ✅ Bug 3: Painel renderiza com `output || error` (erros sempre visíveis)
- **Funcionalidades**:
  - Execução segura de código JavaScript com timeout (5s)
  - Captura de console.log/error/warn com cleanup garantido
  - Validação por critérios (regex patterns extensíveis)
  - Feedback detalhado por critério individual
  - Output formatado (strings, objects com JSON.stringify)
- **InteractiveChallenges Integration**: Substituiu cards estáticos por editores interativos
  - Sistema expand/collapse por desafio
  - Tracking visual de desafios completados
  - Integrado em `/learn/week/[number]`
  - onSuccess callback para persistência futura
- **Validação Aprovada**: Architect review confirmou production-readiness após 3 iterações de bugfix

### FASE 1 - Conteúdo Educacional Completo ✅
- **Semana 5 - JavaScript Fundamentals**: 5 seções de teoria (variáveis, funções, condicionais, loops), 5 desafios progressivos, projeto calculadora interativa (200 XP)
- **Semana 6 - DOM Manipulation**: 4 seções de teoria (DOM intro, querySelector, modificação, criação/remoção), 5 desafios, projeto dark mode toggle (250 XP)
- **Semana 9 - React Basics**: 4 seções de teoria (React intro, JSX, components, props), 5 desafios, projeto portfolio React (300 XP)
- **Scaffolding System**: Utilities reutilizáveis (utils.ts) + CLI generator (npm run generate:week) + validation script
- **Resources Mapping**: Sistema centralizado (resources-map.ts) linkando materiais de apoio contextualmente às semanas
- **Validação Aprovada**: Architect review confirmou production-readiness das 3 semanas críticas

## Previous Changes (October 15, 2025)

### Learning Paths Navigation System (Latest)
- **Landing Page /learn**: Transformed into trilhas showcase with:
  - Hero section com stats (127+ alunos, 450+ projetos, 64 aulas)
  - Cards de trilhas (Fullstack disponível, Frontend em breve)
  - Destaque do modelo híbrido único (self-paced + mentoria)
  - Seção de diferenciais (turmas pequenas, híbrido, portfolio real)
- **Trilha Fullstack /learn/fullstack**: Overview completo das 12 semanas com:
  - Hero com progresso visual do aluno
  - Explicação do modelo híbrido (3 pilares)
  - Cronograma semanal interativo com status (locked, current, completed)
  - Preview de objetivos de aprendizagem por semana
- **Módulo Semanal /learn/week/[number]**: Página completa com:
  - Navegação entre semanas (WeeklyModuleNav)
  - Header rico com info do módulo
  - Teoria da semana com code examples
  - 5 desafios práticos listados
  - Projeto semanal com critérios de conclusão
  - Tópicos da aula ao vivo
  - Recursos extras
  - Sidebar: Checklist pré-aula interativo + Info + Progresso

## Previous Changes

### Weekly Module System Implementation
- **Type System**: Created comprehensive weekly module types (WeeklyModule, StudentWeekProgress, CohortSchedule)
- **Week 1 Content**: Full HTML Essentials module with:
  - 4 theory sections (HTML intro, structure, semantic HTML, accessibility)
  - 5 progressive challenges (structure → header → section → list → footer)
  - Portfolio project: Header + Hero section build
  - Pre-class checklist with time estimates
  - Live class discussion topics for mentor-led sessions
- **Progress Tracking Service**: Supabase integration for tracking theory, challenges, and projects
- **UI Components**: WeeklyModuleNav, WeeklyModuleHeader, PreClassChecklist
- **Database Schema**: Comprehensive tracking (student_week_progress, cohorts, live_class_schedule, challenge_submissions, project_submissions, one_on_one_sessions)

### Previous Changes
- **Replit Migration Completed**: Successfully migrated from Vercel to Replit
- **Port Configuration**: Updated package.json scripts to bind to 0.0.0.0:5000 for Replit compatibility
- **Environment Setup**: Configured Supabase credentials as environment secrets
- **Workflow Configuration**: Set up development server workflow running Next.js dev server on port 5000
- **Deployment Configuration**: Configured autoscale deployment for production
- **TypeScript Fixes**: Fixed linting errors for production builds

## Project Architecture

### Tech Stack
- **Frontend**: Next.js 15.5.4, React 19, TypeScript
- **Styling**: Tailwind CSS with custom theme system
- **Code Editor**: Monaco Editor (VS Code editor component)
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: npm

### Key Features

#### For Students
- **12-Week Structured Curriculum**: Progressive modules from HTML to React deployment
- **Interactive Monaco Editor**: Industry-standard code editor with syntax highlighting
- **Real Portfolio Building**: Each week adds a piece to a professional portfolio
- **Progress Tracking**: Theory completion, challenge attempts, project submissions
- **Pre-Class Checklists**: Know exactly what to prepare before live sessions
- **XP & Badges**: Gamified rewards for completing challenges and projects
- **Mentor Feedback System**: Direct feedback on projects from experienced developer

#### For Mentors
- **Cohort Management**: Track up to 5 students per group
- **Live Class Scheduling**: Weekly sessions with meeting links and notes
- **1:1 Session Booking**: Optional individual mentorship slots
- **Progress Dashboard**: See which students completed pre-class work
- **Project Review System**: Grade and provide feedback on submissions
- **Challenge Analytics**: Identify struggling students by attempt patterns

### Directory Structure
```
src/
├── app/                      # Next.js app directory
├── components/               # React components
│   └── weekly-modules/      # Weekly curriculum UI components
├── hooks/                   # Custom React hooks
├── lib/                     # Core business logic
│   ├── learning/            
│   │   ├── topics/          # Original topic-based content
│   │   ├── quizzes/         # Quiz system
│   │   └── weekly-modules/  # NEW: 12-week structured modules
│   ├── supabase/            
│   │   ├── client.ts        # Database client
│   │   └── weekly-progress-service.ts  # Weekly progress tracking
│   ├── themes/              # Theme system
│   └── validation/          # Code validation
├── types/                   
│   └── weekly-modules.ts    # Weekly module type definitions
└── supabase/migrations/     
    └── 003_weekly_modules.sql  # Cohort & progress schema
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

### Student & Authentication
- `students` - User profiles with XP, badges, and streaks

### Weekly Curriculum System
- `student_week_progress` - Track theory, challenges, and project progress per week
- `challenge_submissions` - Student attempts at weekly coding challenges
- `project_submissions` - Weekly portfolio project submissions with mentor feedback

### Cohort & Mentoring
- `cohorts` - Small group classes (max 5 students, mentor, schedule)
- `cohort_students` - Student enrollment in cohorts
- `live_class_schedule` - Weekly live class sessions (date, meeting link, recording)
- `one_on_one_sessions` - Optional individual mentorship bookings

### Legacy (Original System)
- `submissions` - Original code challenge submissions
- `challenges_metadata` - Original challenge definitions
- `quiz_attempts` - Quiz tracking
- `reading_progress` - Content reading tracking

## Content Strategy

### Completed Modules
- ✅ **Week 1 - HTML Essentials**: Semantic HTML, accessibility, portfolio header project

### Planned Modules (Weeks 2-12)
- **Week 2**: CSS Basics - Colors, Typography, Box Model + About Section project
- **Week 3**: Flexbox - Modern layouts + Skills Grid project
- **Week 4**: CSS Grid - Complex layouts + Projects Gallery
- **Week 5**: Responsive Design - Mobile-first + Full responsive portfolio
- **Week 6**: JavaScript Intro - Variables, Functions, Logic + Calculator
- **Week 7**: DOM Manipulation - Interactive pages + Dark mode toggle
- **Week 8**: Events & Forms - Validation + Contact form
- **Week 9**: Advanced JS - Arrays, Objects, Fetch API + GitHub projects via API
- **Week 10**: React Basics - Components & Props + Refactor portfolio to React
- **Week 11**: React State - useState & Interactivity + Filters & animations
- **Week 12**: Final Project - Deploy to Vercel + Portfolio completion

### Content Principles
1. **Hands-On First**: Theory → Practice → Apply immediately
2. **Real-World Projects**: Every project adds to professional portfolio
3. **Accessibility from Day 1**: Teach best practices from the start
4. **Progressive Complexity**: Build confidence with achievable weekly goals
5. **Mentor-Ready**: Content designed to facilitate live discussions

## User Preferences
- **Language**: Portuguese (Brazil) for content and UI
- **Target Age**: 15-18 years old (digestible, encouraging tone)
- **Focus**: Practical skills over academic theory
- **Outcome**: Complete portfolio ready for first opportunities
