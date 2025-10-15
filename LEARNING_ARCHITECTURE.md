# 🏗️ LEARNING SYSTEM - TECHNICAL ARCHITECTURE

**Sistema de Conteúdo Teórico Gamificado**
**Versão:** 1.0
**Última Atualização:** 2024-12-27

---

## 📐 VISÃO GERAL DA ARQUITETURA

O sistema de aprendizado teórico é composto por **5 módulos principais**:

1. **Content System** - Gestão de tópicos, lições e seções
2. **Interactive Features** - Quizzes, exercícios e diagramas
3. **Progress Tracking** - Rastreamento de leitura e conquistas
4. **Gamification** - XP, badges e motivação
5. **UI Components** - Interface visual e interações

```
┌─────────────────────────────────────────────────────────────┐
│                    Learning System                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Content    │  │ Interactive  │  │   Progress   │     │
│  │   System     │◄─┤   Features   │◄─┤   Tracking   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │            │
│         └──────────────────┴──────────────────┘            │
│                         │                                  │
│                  ┌──────▼──────┐                           │
│                  │ Gamification│                           │
│                  └──────┬──────┘                           │
│                         │                                  │
│                  ┌──────▼──────┐                           │
│                  │UI Components│                           │
│                  └─────────────┘                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📂 ESTRUTURA DE DIRETÓRIOS

```
src/lib/learning/                       # 🎓 Sistema de Aprendizado
│
├── index.ts                            # Exports centralizados
├── types.ts                            # Types principais
│
├── topics/                             # 📚 MÓDULO: Content System
│   ├── index.ts                        # getAllTopics(), getTopicBySlug()
│   ├── html/
│   │   ├── index.ts
│   │   ├── fundamentals.ts             # Topic: HTML Fundamentos
│   │   └── advanced.ts                 # Topic: HTML Avançado
│   ├── css/
│   │   ├── index.ts
│   │   ├── basics.ts                   # Topic: CSS Essencial
│   │   └── advanced.ts                 # Topic: CSS Moderno
│   ├── javascript/
│   │   ├── index.ts
│   │   ├── fundamentals.ts             # Topic: JavaScript Base
│   │   └── advanced.ts                 # Topic: JavaScript Avançado
│   └── react/
│       ├── index.ts
│       ├── introduction.ts             # Topic: React Introdução
│       └── components.ts               # Topic: React Componentes
│
├── quizzes/                            # 🎯 MÓDULO: Interactive - Quizzes
│   ├── types.ts                        # Quiz, QuizQuestion, QuizAttempt
│   ├── index.ts                        # getQuizByLessonId()
│   ├── html-quizzes.ts                 # 10+ questões HTML
│   ├── css-quizzes.ts                  # 10+ questões CSS
│   ├── js-quizzes.ts                   # 10+ questões JavaScript
│   └── react-quizzes.ts                # 10+ questões React
│
├── exercises/                          # 💻 MÓDULO: Interactive - Exercícios
│   ├── types.ts                        # Exercise, ValidationResult
│   ├── index.ts                        # getExerciseById()
│   ├── validators.ts                   # validateHTML(), validateCSS(), validateJS()
│   ├── html-exercises.ts               # 8+ exercícios HTML
│   ├── css-exercises.ts                # 8+ exercícios CSS
│   └── js-exercises.ts                 # 8+ exercícios JavaScript
│
├── diagrams/                           # 🎨 MÓDULO: Interactive - Diagramas
│   ├── types.ts                        # Diagram, DiagramComponent
│   ├── index.ts                        # getDiagramById()
│   ├── html-diagrams.ts                # DOM Tree, Semantic Map
│   ├── css-diagrams.ts                 # Box Model, Flexbox, Grid
│   └── js-diagrams.ts                  # Event Loop, Scope Chain
│
├── glossary/                           # 📚 MÓDULO: Support - Glossário
│   ├── types.ts                        # GlossaryTerm
│   ├── index.ts                        # searchTerm(), autoDetect()
│   ├── html-terms.ts                   # 30+ termos HTML
│   ├── css-terms.ts                    # 30+ termos CSS
│   ├── js-terms.ts                     # 30+ termos JavaScript
│   └── react-terms.ts                  # 20+ termos React
│
└── progress/                           # 📈 MÓDULO: Progress & Gamification
    ├── types.ts                        # ReadingProgress, Achievement
    ├── tracking.ts                     # markSectionRead(), saveQuizAttempt()
    ├── achievements.ts                 # Badges definition
    └── xp-calculation.ts               # calculateXP()
```

```
src/components/learning/                # 🎨 UI Components
│
├── QuizSection.tsx                     # Container do quiz completo
├── QuizQuestion.tsx                    # Questão individual (multiple-choice, true-false)
│
├── InlineExercise.tsx                  # Container do exercício prático
├── ExerciseEditor.tsx                  # Mini Monaco Editor
│
├── DiagramViewer.tsx                   # Container genérico de diagramas
├── BoxModelDiagram.tsx                 # Diagrama Box Model interativo
├── FlexboxDiagram.tsx                  # Diagrama Flexbox interativo
├── GridDiagram.tsx                     # Diagrama Grid interativo
│
├── GlossaryTooltip.tsx                 # Tooltip de glossário (hover)
│
├── ProgressIndicator.tsx               # Barra de progresso da lição
├── ReadingTimer.tsx                    # Timer de leitura estimado
│
├── TopicBadge.tsx                      # Badge visual de conclusão
└── ResourceLinks.tsx                   # Links externos curados
```

---

## 🗄️ DATABASE SCHEMA (SUPABASE)

### Tabela: `reading_progress`
Rastreia o progresso de leitura de cada estudante.

```sql
CREATE TABLE reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  topic_slug text NOT NULL,                 -- 'html-fundamentals'
  lesson_id text NOT NULL,                  -- 'lesson-1'
  section_id text NOT NULL,                 -- 'intro'
  completed boolean DEFAULT false,
  time_spent integer DEFAULT 0,             -- Segundos gastos
  last_read_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now(),
  UNIQUE(student_id, topic_slug, lesson_id, section_id)
);

-- Índices para performance
CREATE INDEX idx_reading_progress_student ON reading_progress(student_id);
CREATE INDEX idx_reading_progress_topic ON reading_progress(topic_slug);
```

### Tabela: `quiz_attempts`
Armazena tentativas de quizzes.

```sql
CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  quiz_id text NOT NULL,                    -- 'html-quiz-1'
  lesson_id text NOT NULL,                  -- 'lesson-1'
  score integer NOT NULL,                   -- Pontos obtidos (ex: 8)
  max_score integer NOT NULL,               -- Pontos máximos (ex: 10)
  answers jsonb NOT NULL,                   -- [{questionId, answer, correct}]
  xp_earned integer DEFAULT 0,              -- XP ganho nesta tentativa
  completed_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- Índices
CREATE INDEX idx_quiz_attempts_student ON quiz_attempts(student_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
```

### Tabela: `exercise_submissions`
Armazena submissões de exercícios práticos.

```sql
CREATE TABLE exercise_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  exercise_id text NOT NULL,                -- 'html-ex-1'
  code text NOT NULL,                       -- Código submetido
  passed boolean DEFAULT false,             -- Passou na validação?
  attempts integer DEFAULT 1,               -- Número de tentativas
  hints_used integer DEFAULT 0,             -- Dicas usadas
  xp_earned integer DEFAULT 0,              -- XP ganho
  completed_at timestamp,                   -- NULL se não passou
  created_at timestamp DEFAULT now()
);

-- Índices
CREATE INDEX idx_exercise_submissions_student ON exercise_submissions(student_id);
CREATE INDEX idx_exercise_submissions_exercise ON exercise_submissions(exercise_id);
```

### Atualização: `students`
Adicionar colunas relacionadas ao aprendizado teórico.

```sql
ALTER TABLE students
  ADD COLUMN reading_xp integer DEFAULT 0,          -- XP de leitura
  ADD COLUMN theory_badges text[] DEFAULT '{}',     -- ['estudioso', 'mestre-html']
  ADD COLUMN total_sections_read integer DEFAULT 0,
  ADD COLUMN total_quizzes_passed integer DEFAULT 0,
  ADD COLUMN total_exercises_completed integer DEFAULT 0;
```

### Row Level Security (RLS)

```sql
-- Habilitar RLS nas novas tabelas
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_submissions ENABLE ROW LEVEL SECURITY;

-- Policies: Estudantes só veem seus próprios dados

-- reading_progress
CREATE POLICY "Students can view own reading progress"
  ON reading_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own reading progress"
  ON reading_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own reading progress"
  ON reading_progress FOR UPDATE
  USING (auth.uid() = student_id);

-- quiz_attempts
CREATE POLICY "Students can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- exercise_submissions
CREATE POLICY "Students can view own exercise submissions"
  ON exercise_submissions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own exercise submissions"
  ON exercise_submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own exercise submissions"
  ON exercise_submissions FOR UPDATE
  USING (auth.uid() = student_id);
```

---

## 📝 TYPE DEFINITIONS

### Core Types (`/lib/learning/types.ts`)

```typescript
// Topic é o nível mais alto (ex: HTML Fundamentos)
export interface Topic {
  id: string                              // 'html-fundamentals'
  title: string                           // 'HTML Fundamentos'
  description: string                     // 'Estrutura semântica...'
  category: 'html' | 'css' | 'javascript' | 'react'
  totalTime: number                       // Tempo estimado total em minutos
  lessons: Lesson[]                       // Array de lições
  prerequisites?: string[]                // IDs de tópicos anteriores
}

// Lesson é uma lição dentro de um tópico
export interface Lesson {
  id: string                              // 'lesson-1'
  title: string                           // 'Estrutura Básica do HTML'
  description: string                     // 'Entenda a anatomia...'
  estimatedTime: number                   // Tempo estimado em minutos
  sections: Section[]                     // Array de seções
  quiz?: Quiz                             // Quiz opcional ao final
}

// Section é uma seção dentro de uma lição
export interface Section {
  id: string                              // 'intro'
  title: string                           // 'O que é HTML?'
  type: 'theory' | 'example'              // Teoria ou Exemplo
  content: string                         // Conteúdo markdown
  codeExample?: string                    // Código de exemplo
  diagram?: Diagram                       // Diagrama interativo
  exercise?: Exercise                     // Exercício inline
}

// External resources curated
export interface ExternalResource {
  title: string
  url: string
  type: 'article' | 'video' | 'interactive' | 'documentation'
  estimatedTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}
```

### Quiz Types (`/lib/learning/quizzes/types.ts`)

```typescript
export interface Quiz {
  id: string                              // 'html-quiz-1'
  lessonId: string                        // 'lesson-1'
  title: string                           // 'Teste seu conhecimento'
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string                              // 'q1'
  question: string                        // 'O que significa HTML?'
  type: 'multiple-choice' | 'true-false' | 'code-completion'
  options?: string[]                      // ['HyperText...', 'High Tech...']
  correctAnswer: string | number          // 0 ou 'HyperText Markup Language'
  explanation: string                     // Explicação da resposta correta
  points: number                          // Pontos desta questão (padrão: 1)
}

export interface QuizAttempt {
  quizId: string
  studentId: string
  answers: QuizAnswer[]
  score: number                           // Pontos obtidos
  maxScore: number                        // Pontos máximos
  xpEarned: number                        // XP ganho
  completedAt: Date
}

export interface QuizAnswer {
  questionId: string
  answer: string | number
  correct: boolean
  timeSpent?: number                      // Segundos gastos nesta questão
}
```

### Exercise Types (`/lib/learning/exercises/types.ts`)

```typescript
export interface Exercise {
  id: string                              // 'html-ex-1'
  title: string                           // 'Crie uma estrutura HTML5'
  description: string                     // 'Use os elementos semânticos...'
  starterCode: string                     // Código inicial
  solution: string                        // Solução esperada
  validation: ValidationCriteria          // Critérios de validação
  hints: string[]                         // Array de dicas progressivas
  estimatedTime: number                   // Tempo estimado em minutos
}

export interface ValidationCriteria {
  requiredElements?: string[]             // ['html', 'head', 'body']
  requiredAttributes?: Record<string, string[]>  // {html: ['lang']}
  forbiddenElements?: string[]            // Elementos proibidos
  customValidation?: (code: string) => boolean
}

export interface ValidationResult {
  passed: boolean
  score: number                           // 0-100
  feedback: ValidationFeedback[]
  xpEarned: number
}

export interface ValidationFeedback {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  line?: number                           // Linha do código (se aplicável)
}

export interface ExerciseSubmission {
  exerciseId: string
  studentId: string
  code: string
  passed: boolean
  attempts: number
  hintsUsed: number
  xpEarned: number
  completedAt?: Date
}
```

### Diagram Types (`/lib/learning/diagrams/types.ts`)

```typescript
export interface Diagram {
  id: string                              // 'box-model-diagram'
  title: string                           // 'CSS Box Model'
  type: 'box-model' | 'flexbox' | 'grid' | 'dom-tree' | 'event-loop'
  interactive: boolean                    // É interativo?
  components: DiagramComponent[]
  controls?: DiagramControl[]             // Controles de interação
}

export interface DiagramComponent {
  id: string
  type: 'box' | 'arrow' | 'text' | 'animation'
  props: Record<string, any>
  children?: DiagramComponent[]
}

export interface DiagramControl {
  id: string
  type: 'slider' | 'toggle' | 'dropdown' | 'button'
  label: string
  value: any
  onChange: (value: any) => void
}
```

### Glossary Types (`/lib/learning/glossary/types.ts`)

```typescript
export interface GlossaryTerm {
  term: string                            // 'DOM'
  definition: string                      // 'Document Object Model é...'
  category: 'html' | 'css' | 'javascript' | 'react'
  relatedTerms?: string[]                 // ['Element', 'Node', 'Tree']
  exampleUsage?: string                   // Exemplo de uso
  links?: ExternalResource[]              // Links para aprofundamento
}
```

### Progress Types (`/lib/learning/progress/types.ts`)

```typescript
export interface ReadingProgress {
  studentId: string
  topicSlug: string
  lessonId: string
  sectionId: string
  completed: boolean
  timeSpent: number                       // Segundos
  lastReadAt: Date
}

export interface Achievement {
  id: string                              // 'estudioso'
  title: string                           // 'Estudioso'
  description: string                     // 'Leia 10 lições'
  icon: string                            // '📚'
  xpReward: number                        // 50
  criteria: AchievementCriteria
}

export interface AchievementCriteria {
  type: 'sections-read' | 'quizzes-passed' | 'exercises-completed' | 'topic-completed'
  threshold: number                       // Quantidade necessária
  category?: string                       // 'html', 'css', etc.
}
```

---

## 🔄 FLUXO DE DADOS

### 1. Carregar Conteúdo
```
User acessa /learn
  ↓
getAllTopics() carrega de /lib/learning/topics/
  ↓
Renderiza lista de tópicos em /app/learn/page.tsx
```

### 2. Ler uma Lição
```
User clica em tópico
  ↓
/learn/html-fundamentals
  ↓
getTopicBySlug('html-fundamentals')
  ↓
TopicPageClient renderiza lição/seção atual
  ↓
markSectionRead() ao concluir seção
  ↓
Salva em reading_progress (Supabase)
  ↓
Calcula XP e atualiza students.reading_xp
```

### 3. Fazer Quiz
```
User completa lição e inicia quiz
  ↓
QuizSection.tsx renderiza questões
  ↓
User responde questões
  ↓
calculateQuizScore()
  ↓
saveQuizAttempt() salva em quiz_attempts
  ↓
Atribui XP baseado em score
  ↓
Verifica e desbloqueia badges
```

### 4. Fazer Exercício
```
User encontra exercício inline
  ↓
InlineExercise.tsx com ExerciseEditor.tsx
  ↓
User escreve código no Monaco Editor
  ↓
validateCode() verifica critérios
  ↓
saveExerciseSubmission() salva em exercise_submissions
  ↓
Atribui XP se passou
  ↓
Verifica e desbloqueia badges
```

### 5. Tooltip de Glossário
```
Conteúdo teórico é renderizado
  ↓
autoDetectTerms() procura termos do glossário
  ↓
Envolve termos com GlossaryTooltip.tsx
  ↓
Hover mostra definição
  ↓
Click leva para glossário completo
```

---

## 🎮 SISTEMA DE GAMIFICAÇÃO

### Cálculo de XP

#### Leitura de Seções
```typescript
// Base XP por seção lida
const BASE_SECTION_XP = 10

function calculateReadingXP(timeSpent: number, sectionCompleted: boolean): number {
  let xp = BASE_SECTION_XP

  // Bonus por tempo gasto (indica leitura atenta)
  if (timeSpent >= 120) xp += 5  // 2+ minutos

  // Bonus por completar seção
  if (sectionCompleted) xp += 5

  return xp
}
```

#### Quizzes
```typescript
// Base XP por quiz
const BASE_QUIZ_XP = 20

function calculateQuizXP(score: number, maxScore: number, firstTry: boolean): number {
  let xp = BASE_QUIZ_XP

  // XP proporcional ao score
  const percentCorrect = (score / maxScore) * 100
  xp += Math.floor(percentCorrect / 10) * 2  // 2 XP por cada 10%

  // Bonus por perfect score
  if (percentCorrect === 100) xp += 10

  // Bonus por primeira tentativa perfeita
  if (firstTry && percentCorrect === 100) xp += 20

  return xp
}
```

#### Exercícios
```typescript
// Base XP por exercício
const BASE_EXERCISE_XP = 30

function calculateExerciseXP(passed: boolean, attempts: number, hintsUsed: number): number {
  if (!passed) return 0

  let xp = BASE_EXERCISE_XP

  // Penalty por tentativas extras
  xp -= (attempts - 1) * 5  // -5 XP por tentativa extra

  // Penalty por dicas usadas
  xp -= hintsUsed * 3  // -3 XP por dica

  // Garantir mínimo de 10 XP
  return Math.max(10, xp)
}
```

### Badges de Aprendizado

```typescript
export const LEARNING_BADGES: Achievement[] = [
  {
    id: 'estudioso',
    title: 'Estudioso',
    description: 'Leia 10 lições completas',
    icon: '📚',
    xpReward: 50,
    criteria: {
      type: 'sections-read',
      threshold: 10
    }
  },
  {
    id: 'mestre-html',
    title: 'Mestre HTML',
    description: 'Complete todos os tópicos HTML',
    icon: '🎓',
    xpReward: 200,
    criteria: {
      type: 'topic-completed',
      threshold: 1,
      category: 'html'
    }
  },
  {
    id: 'artista-css',
    title: 'Artista CSS',
    description: 'Complete todos os tópicos CSS',
    icon: '🎨',
    xpReward: 200,
    criteria: {
      type: 'topic-completed',
      threshold: 1,
      category: 'css'
    }
  },
  {
    id: 'ninja-javascript',
    title: 'Ninja JavaScript',
    description: 'Complete todos os tópicos JavaScript',
    icon: '⚡',
    xpReward: 200,
    criteria: {
      type: 'topic-completed',
      threshold: 1,
      category: 'javascript'
    }
  },
  {
    id: 'react-developer',
    title: 'React Developer',
    description: 'Complete todos os tópicos React',
    icon: '⚛️',
    xpReward: 200,
    criteria: {
      type: 'topic-completed',
      threshold: 1,
      category: 'react'
    }
  },
  {
    id: 'enciclopedia-viva',
    title: 'Enciclopédia Viva',
    description: 'Leia 50+ lições',
    icon: '🏆',
    xpReward: 500,
    criteria: {
      type: 'sections-read',
      threshold: 50
    }
  }
]
```

---

## 🔌 API REFERENCE

### Content System

```typescript
// Obter todos os tópicos
getAllTopics(): Topic[]

// Obter tópico por slug
getTopicBySlug(slug: string): Topic | null

// Obter lição específica
getLessonById(topicSlug: string, lessonId: string): Lesson | null
```

### Progress Tracking

```typescript
// Marcar seção como lida
markSectionRead(
  studentId: string,
  topicSlug: string,
  lessonId: string,
  sectionId: string,
  timeSpent: number
): Promise<void>

// Salvar tentativa de quiz
saveQuizAttempt(
  studentId: string,
  quizId: string,
  lessonId: string,
  answers: QuizAnswer[],
  score: number,
  maxScore: number
): Promise<number> // Retorna XP ganho

// Salvar submissão de exercício
saveExerciseSubmission(
  studentId: string,
  exerciseId: string,
  code: string,
  passed: boolean,
  attempts: number,
  hintsUsed: number
): Promise<number> // Retorna XP ganho

// Obter progresso do estudante
getStudentProgress(studentId: string): Promise<{
  sectionsRead: number
  quizzesPassed: number
  exercisesCompleted: number
  readingXP: number
  badges: string[]
}>
```

### Validation

```typescript
// Validar código HTML
validateHTML(code: string, criteria: ValidationCriteria): ValidationResult

// Validar código CSS
validateCSS(code: string, criteria: ValidationCriteria): ValidationResult

// Validar código JavaScript
validateJS(code: string, criteria: ValidationCriteria): ValidationResult
```

---

## 🎨 UI COMPONENTS USAGE

### QuizSection
```tsx
import { QuizSection } from '@/components/learning/QuizSection'

<QuizSection
  quiz={lesson.quiz}
  onComplete={(score, xpEarned) => {
    // Handle quiz completion
    console.log(`Score: ${score}, XP: ${xpEarned}`)
  }}
/>
```

### InlineExercise
```tsx
import { InlineExercise } from '@/components/learning/InlineExercise'

<InlineExercise
  exercise={section.exercise}
  onSuccess={(xpEarned) => {
    // Handle exercise success
    console.log(`XP earned: ${xpEarned}`)
  }}
/>
```

### GlossaryTooltip
```tsx
import { GlossaryTooltip } from '@/components/learning/GlossaryTooltip'

<GlossaryTooltip term="DOM">
  DOM (Document Object Model)
</GlossaryTooltip>
```

### DiagramViewer
```tsx
import { DiagramViewer } from '@/components/learning/DiagramViewer'
import { BoxModelDiagram } from '@/components/learning/BoxModelDiagram'

<DiagramViewer>
  <BoxModelDiagram
    initialValues={{
      content: 200,
      padding: 20,
      border: 5,
      margin: 10
    }}
  />
</DiagramViewer>
```

---

## 🚀 PERFORMANCE CONSIDERATIONS

### Lazy Loading
- Monaco Editor carregado apenas quando necessário
- Diagramas complexos lazy-loaded
- Code splitting por tópico

### Caching
- Conteúdo de tópicos cacheado em memória
- Glossário indexado para busca rápida
- Progresso do usuário em cache local (sync com Supabase)

### Database Optimization
- Índices em colunas de busca frequente
- Queries otimizadas com JOINs apenas quando necessário
- Agregações pré-calculadas (total_sections_read, etc.)

---

## 🔐 SECURITY CONSIDERATIONS

### Row Level Security (RLS)
- Todos os dados de progresso protegidos por RLS
- Estudantes só acessam seus próprios dados
- Queries automáticas filtradas por auth.uid()

### Input Validation
- Código submetido sanitizado antes de validação
- Limite de tamanho de código (10KB max)
- Rate limiting em submissões (10 por minuto)

### XSS Prevention
- Conteúdo markdown sanitizado antes de renderizar
- Code examples escapados
- User input nunca executado diretamente

---

## 📚 REFERENCES

### Internal Docs
- [LEARNING_CONTENT_ROADMAP.md](./LEARNING_CONTENT_ROADMAP.md) - Roadmap completo
- [LEARNING_IMPLEMENTATION_TRACKER.md](./LEARNING_IMPLEMENTATION_TRACKER.md) - Tracking de implementação
- [CLAUDE.md](./CLAUDE.md) - Contexto geral do projeto
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Status de desenvolvimento

### External Resources
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/api/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última atualização:** 2024-12-27
**Versão da arquitetura:** 1.0
**Mantenedor:** Claude Code Team
