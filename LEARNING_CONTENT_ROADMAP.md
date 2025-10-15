# 📚 LEARNING CONTENT ROADMAP - FULL PACKAGE

## 🎯 OBJETIVO DO PROJETO

Transformar a página `/learn` em um **centro de conhecimento gamificado de classe mundial** com:
- Conteúdo teórico denso e estruturado
- Sistema de quizzes interativos
- Exercícios práticos inline
- Diagramas educativos interativos
- Glossário com tooltips contextuais
- Sistema de progresso integrado ao Supabase
- Gamificação completa com badges e XP

---

## 📊 ESTATÍSTICAS PLANEJADAS

### Conteúdo
- **10 tópicos completos** (HTML Fundamentals/Advanced, CSS Basics/Advanced, JS Fundamentals/Advanced, React Intro/Components)
- **40+ lições estruturadas** (10-30 min cada)
- **120+ seções de conteúdo** (teoria + exemplos práticos)
- **500+ palavras por seção** de conteúdo denso

### Features Interativas
- **30+ quizzes interativos** (3-5 questões cada, 100+ questões totais)
- **25+ exercícios inline** (mini-desafios práticos com validação)
- **15+ diagramas interativos** (Box Model, Flexbox, Grid, Event Loop, etc.)
- **100+ termos no glossário** (tooltips contextuais automáticos)

### Gamificação
- **6 novos badges** de aprendizado teórico
- **Sistema de XP** para leitura (10-200 XP por atividade)
- **3 novas tabelas** no banco (reading_progress, quiz_attempts, exercise_submissions)

### Tempo Total
- **7-8 dias úteis** (56-64 horas de desenvolvimento)

---

## 🗂️ ESTRUTURA DE ARQUIVOS COMPLETA

```
src/lib/learning/                           # 🆕 NOVA PASTA PRINCIPAL
│
├── index.ts                                # Exports centralizados
├── types.ts                                # TypeScript interfaces principais
│
├── topics/                                 # 📚 CONTEÚDO ORGANIZADO
│   ├── index.ts                            # Export todos os tópicos
│   │
│   ├── html/
│   │   ├── index.ts                        # Export HTML topics
│   │   ├── fundamentals.ts                 # Mover de page.tsx (8 lições)
│   │   └── advanced.ts                     # NOVO: Acessibilidade, SEO, Forms (10 lições)
│   │
│   ├── css/
│   │   ├── index.ts                        # Export CSS topics
│   │   ├── basics.ts                       # Mover de page.tsx (12 lições)
│   │   └── advanced.ts                     # NOVO: Flexbox, Grid, Animations (15 lições)
│   │
│   ├── javascript/
│   │   ├── index.ts                        # Export JS topics
│   │   ├── fundamentals.ts                 # Mover de page.tsx (18 lições)
│   │   └── advanced.ts                     # NOVO: Async, APIs, ES6+ (20 lições)
│   │
│   └── react/
│       ├── index.ts                        # Export React topics
│       ├── introduction.ts                 # NOVO: O que é React, JSX (8 lições)
│       └── components.ts                   # NOVO: Components, Props, State (12 lições)
│
├── exercises/                              # 💻 EXERCÍCIOS PRÁTICOS
│   ├── types.ts                            # Interfaces (Exercise, ExerciseAttempt, ValidationResult)
│   ├── index.ts                            # Export todos exercícios
│   ├── html-exercises.ts                   # 8+ exercícios HTML
│   ├── css-exercises.ts                    # 8+ exercícios CSS
│   ├── js-exercises.ts                     # 8+ exercícios JavaScript
│   └── validators.ts                       # Funções de validação de código
│
├── quizzes/                                # 🎯 QUIZZES INTERATIVOS
│   ├── types.ts                            # Interfaces (Quiz, QuizQuestion, QuizAttempt)
│   ├── index.ts                            # Export todos quizzes
│   ├── html-quizzes.ts                     # 10+ questões HTML (multiple-choice, true-false)
│   ├── css-quizzes.ts                      # 10+ questões CSS
│   ├── js-quizzes.ts                       # 10+ questões JavaScript
│   └── react-quizzes.ts                    # 10+ questões React
│
├── diagrams/                               # 🎨 DIAGRAMAS INTERATIVOS
│   ├── types.ts                            # Interfaces (Diagram, DiagramComponent)
│   ├── index.ts                            # Export todos diagramas
│   ├── html-diagrams.ts                    # DOM Tree, Semantic HTML Map
│   ├── css-diagrams.ts                     # Box Model, Flexbox Playground, Grid Visualizer
│   └── js-diagrams.ts                      # Event Loop Animation, Scope Chain
│
├── glossary/                               # 📚 GLOSSÁRIO
│   ├── types.ts                            # Interface (GlossaryTerm)
│   ├── index.ts                            # Export e função de busca automática
│   ├── html-terms.ts                       # 30+ termos HTML
│   ├── css-terms.ts                        # 30+ termos CSS
│   ├── js-terms.ts                         # 30+ termos JavaScript
│   └── react-terms.ts                      # 20+ termos React
│
└── progress/                               # 📈 SISTEMA DE PROGRESSO
    ├── types.ts                            # Interfaces de progresso
    ├── tracking.ts                         # Funções de tracking (markSectionRead, saveQuizAttempt)
    ├── achievements.ts                     # Badges de aprendizado (6 novos)
    └── xp-calculation.ts                   # Cálculo de XP por atividade
```

### Componentes React Novos

```
src/components/learning/                    # 🆕 COMPONENTES DE APRENDIZADO
│
├── QuizSection.tsx                         # Container do quiz com pontuação
├── QuizQuestion.tsx                        # Questão individual (multiple-choice, true-false)
├── InlineExercise.tsx                      # Container do exercício prático
├── ExerciseEditor.tsx                      # Mini Monaco Editor para código
├── DiagramViewer.tsx                       # Visualizador base de diagramas
├── BoxModelDiagram.tsx                     # Diagrama Box Model interativo
├── FlexboxDiagram.tsx                      # Diagrama Flexbox interativo
├── GridDiagram.tsx                         # Diagrama Grid interativo
├── GlossaryTooltip.tsx                     # Tooltip de glossário (hover)
├── ProgressIndicator.tsx                   # Barra de progresso da lição
├── ReadingTimer.tsx                        # Timer de leitura estimado
├── TopicBadge.tsx                          # Badge de conclusão de tópico
└── ResourceLinks.tsx                       # Links externos curados
```

### Database Schema (Supabase)

```sql
-- 🆕 NOVA TABELA: reading_progress
CREATE TABLE reading_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  topic_slug text NOT NULL,
  lesson_id text NOT NULL,
  section_id text NOT NULL,
  completed boolean DEFAULT false,
  time_spent integer DEFAULT 0,  -- segundos
  last_read_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now(),
  UNIQUE(student_id, topic_slug, lesson_id, section_id)
);

-- 🆕 NOVA TABELA: quiz_attempts
CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  quiz_id text NOT NULL,
  lesson_id text NOT NULL,
  score integer NOT NULL,           -- Pontos obtidos
  max_score integer NOT NULL,       -- Pontos máximos
  answers jsonb NOT NULL,           -- Array de respostas
  xp_earned integer DEFAULT 0,
  completed_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- 🆕 NOVA TABELA: exercise_submissions
CREATE TABLE exercise_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  exercise_id text NOT NULL,
  code text NOT NULL,               -- Código submetido
  passed boolean DEFAULT false,
  attempts integer DEFAULT 1,
  hints_used integer DEFAULT 0,
  xp_earned integer DEFAULT 0,
  completed_at timestamp,
  created_at timestamp DEFAULT now()
);

-- ✏️ ATUALIZAR TABELA: students (adicionar colunas)
ALTER TABLE students
  ADD COLUMN reading_xp integer DEFAULT 0,
  ADD COLUMN theory_badges text[] DEFAULT '{}',
  ADD COLUMN total_sections_read integer DEFAULT 0,
  ADD COLUMN total_quizzes_passed integer DEFAULT 0,
  ADD COLUMN total_exercises_completed integer DEFAULT 0;

-- 🔒 Row Level Security (RLS)
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_submissions ENABLE ROW LEVEL SECURITY;

-- Policies (estudantes só veem seus próprios dados)
CREATE POLICY "Students can view own reading progress"
  ON reading_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own reading progress"
  ON reading_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own reading progress"
  ON reading_progress FOR UPDATE
  USING (auth.uid() = student_id);
```

---

## 📅 CRONOGRAMA DETALHADO

### **DIA 1: FUNDAÇÃO E ESTRUTURA** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Criar toda estrutura de pastas, tipos TypeScript e refatorar conteúdo existente

#### Manhã (4h)
- [ ] 1.1. Criar estrutura de pastas `/lib/learning/` completa
- [ ] 1.2. Criar `types.ts` principal com interfaces (Topic, Lesson, Section, etc.)
- [ ] 1.3. Criar `index.ts` com exports centralizados
- [ ] 1.4. Criar types específicos (`exercises/types.ts`, `quizzes/types.ts`, etc.)

#### Tarde (4h)
- [ ] 1.5. Mover `html-fundamentals` de `page.tsx` para `/lib/learning/topics/html/fundamentals.ts`
- [ ] 1.6. Mover `css-basics` para `/lib/learning/topics/css/basics.ts`
- [ ] 1.7. Mover `js-fundamentals` para `/lib/learning/topics/javascript/fundamentals.ts`
- [ ] 1.8. Refatorar `/app/learn/page.tsx` para importar de `/lib/learning`
- [ ] 1.9. Refatorar `/app/learn/[slug]/page.tsx` para usar novos imports
- [ ] 1.10. Testar que tudo ainda funciona (build sem erros)

**Entregáveis:**
- ✅ Estrutura de pastas completa
- ✅ Conteúdo existente refatorado
- ✅ Build funcionando sem erros

---

### **DIA 2: CONTEÚDO AVANÇADO - HTML & CSS** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Criar tópicos HTML Advanced e iniciar CSS Advanced

#### Manhã (4h): HTML Advanced
- [ ] 2.1. Criar `/topics/html/advanced.ts` com estrutura completa
- [ ] 2.2. **Lição 1: Acessibilidade Web**
  - [ ] Seção 1: Introdução à Acessibilidade (WCAG, princípios fundamentais) - 500+ palavras
  - [ ] Seção 2: ARIA Roles e Properties (exemplos práticos com código)
  - [ ] Seção 3: Navegação por Teclado (tab-index, focus management)
  - [ ] Seção 4: Screen Readers e Semantic HTML (importância dos elementos semânticos)
- [ ] 2.3. **Lição 2: SEO e Meta Tags**
  - [ ] Seção 1: Fundamentos de SEO (como motores de busca funcionam)
  - [ ] Seção 2: Meta Tags Essenciais (description, keywords, viewport)
  - [ ] Seção 3: Open Graph e Twitter Cards (social media optimization)
  - [ ] Seção 4: Structured Data (Schema.org, JSON-LD)

#### Tarde (4h): CSS Advanced Parte 1
- [ ] 2.4. Criar `/topics/css/advanced.ts` com estrutura completa
- [ ] 2.5. **Lição 1: Flexbox Completo**
  - [ ] Seção 1: Conceitos Fundamentais (main axis, cross axis, container vs items)
  - [ ] Seção 2: Propriedades do Container (display, flex-direction, justify-content, align-items)
  - [ ] Seção 3: Propriedades dos Items (flex-grow, flex-shrink, flex-basis, align-self)
  - [ ] Seção 4: Layouts Práticos com Flexbox (navbar, cards, footer do Quple)

**Entregáveis:**
- ✅ HTML Advanced completo (2 lições, 8 seções)
- ✅ CSS Advanced Flexbox completo (1 lição, 4 seções)

---

### **DIA 3: CONTEÚDO AVANÇADO - CSS & JAVASCRIPT** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Completar CSS Advanced e iniciar JavaScript Advanced

#### Manhã (4h): CSS Advanced Parte 2
- [ ] 3.1. **Lição 2: CSS Grid Completo**
  - [ ] Seção 1: Conceitos e Terminologia (grid container, tracks, cells, areas, lines)
  - [ ] Seção 2: Propriedades do Grid (grid-template-columns/rows, grid-gap, grid-auto-flow)
  - [ ] Seção 3: Grid Areas e Named Lines (grid-template-areas, line names)
  - [ ] Seção 4: Layouts Complexos (dashboard do Quple, holy grail layout)
- [ ] 3.2. **Lição 3: Animações e Transitions**
  - [ ] Seção 1: CSS Transitions (propriedades, duration, timing-functions, delay)
  - [ ] Seção 2: CSS Animations e Keyframes (from/to, percentagens, animation properties)
  - [ ] Seção 3: Transform 2D/3D (translate, rotate, scale, skew, perspective)
  - [ ] Seção 4: Performance e Will-Change (otimização de animações)

#### Tarde (4h): JavaScript Advanced Parte 1
- [ ] 3.3. Criar `/topics/javascript/advanced.ts` com estrutura completa
- [ ] 3.4. **Lição 1: Programação Assíncrona**
  - [ ] Seção 1: Callbacks e Callback Hell (histórico, problemas)
  - [ ] Seção 2: Promises (estados, .then/.catch/.finally, chaining)
  - [ ] Seção 3: Async/Await (sintaxe moderna, try/catch)
  - [ ] Seção 4: Error Handling (diferentes tipos de erro, Promise.all/race)

**Entregáveis:**
- ✅ CSS Advanced completo (3 lições, 12 seções)
- ✅ JavaScript Advanced iniciado (1 lição, 4 seções)

---

### **DIA 4: JAVASCRIPT ADVANCED & REACT** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Completar JavaScript Advanced e criar conteúdo React

#### Manhã (4h): JavaScript Advanced Parte 2
- [ ] 4.1. **Lição 2: APIs e Fetch**
  - [ ] Seção 1: REST APIs e HTTP Methods (GET, POST, PUT, DELETE)
  - [ ] Seção 2: Fetch API (sintaxe, options, headers, body)
  - [ ] Seção 3: Manipulação de JSON (parsing, stringify, estruturas complexas)
  - [ ] Seção 4: Tratamento de Erros de Rede (status codes, timeout, retry logic)
- [ ] 4.2. **Lição 3: ES6+ Features**
  - [ ] Seção 1: Destructuring e Spread Operator (arrays, objects, rest parameters)
  - [ ] Seção 2: Arrow Functions e Lexical This (diferenças para function, quando usar)
  - [ ] Seção 3: Template Literals e Optional Chaining (strings, nullish coalescing)
  - [ ] Seção 4: Modules (import/export, dynamic imports, default exports)

#### Tarde (4h): React Introdução
- [ ] 4.3. Criar `/topics/react/introduction.ts` com estrutura completa
- [ ] 4.4. **Lição 1: O que é React?**
  - [ ] Seção 1: História e Filosofia do React (por que React foi criado, Facebook)
  - [ ] Seção 2: Virtual DOM e Reconciliation (como funciona por baixo dos panos)
  - [ ] Seção 3: JSX - JavaScript + XML (sintaxe, transpilação, regras)
  - [ ] Seção 4: Criando o Primeiro Componente (function component básico)
- [ ] 4.5. **Lição 2: Componentes e Props**
  - [ ] Seção 1: Function Components vs Class Components (diferenças, quando usar)
  - [ ] Seção 2: Props e Prop Types (passando dados, validação, defaultProps)
  - [ ] Seção 3: Children e Composition (component composition patterns)
  - [ ] Seção 4: Componentes do Quple (exemplos reais: QupleButton, QupleCard)

**Entregáveis:**
- ✅ JavaScript Advanced completo (3 lições, 12 seções)
- ✅ React Introduction completo (2 lições, 8 seções)

---

### **DIA 5: QUIZZES E EXERCÍCIOS INLINE** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Criar sistema de quizzes e exercícios práticos

#### Manhã (4h): Sistema de Quizzes
- [ ] 5.1. Criar interfaces em `/quizzes/types.ts`
  - [ ] Quiz, QuizQuestion, QuizAttempt, QuizResult
  - [ ] Tipos de questão: 'multiple-choice' | 'true-false' | 'code-completion'
- [ ] 5.2. Criar componente `QuizSection.tsx` (container completo do quiz)
- [ ] 5.3. Criar componente `QuizQuestion.tsx` (questão individual com feedback)
- [ ] 5.4. Implementar lógica de pontuação (score, streak bonus, XP calculation)
- [ ] 5.5. Criar quizzes para HTML em `html-quizzes.ts` (10 questões)
- [ ] 5.6. Criar quizzes para CSS em `css-quizzes.ts` (10 questões)

#### Tarde (4h): Sistema de Exercícios
- [ ] 5.7. Criar interfaces em `/exercises/types.ts`
  - [ ] Exercise, ExerciseAttempt, ValidationResult, ValidationCriteria
- [ ] 5.8. Criar componente `InlineExercise.tsx` (container do exercício)
- [ ] 5.9. Criar componente `ExerciseEditor.tsx` (mini Monaco Editor com preview)
- [ ] 5.10. Implementar validadores em `validators.ts` (HTML, CSS, JS validators)
- [ ] 5.11. Criar 8 exercícios HTML em `html-exercises.ts`
  - [ ] Ex 1: Criar estrutura básica HTML5
  - [ ] Ex 2: Adicionar meta tags SEO
  - [ ] Ex 3: Criar formulário acessível
  - [ ] Ex 4: Usar elementos semânticos
  - [ ] Ex 5-8: Outros desafios progressivos
- [ ] 5.12. Criar 8 exercícios CSS em `css-exercises.ts`
  - [ ] Ex 1: Estilizar com seletores
  - [ ] Ex 2: Criar layout Flexbox
  - [ ] Ex 3: Criar grid responsivo
  - [ ] Ex 4-8: Outros desafios progressivos

**Entregáveis:**
- ✅ Sistema de quizzes completo e funcional
- ✅ Sistema de exercícios inline completo
- ✅ 20 quizzes (HTML + CSS)
- ✅ 16 exercícios (HTML + CSS)

---

### **DIA 6: DIAGRAMAS INTERATIVOS** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Criar visualizações educativas interativas

#### Manhã (4h): Infraestrutura de Diagramas
- [ ] 6.1. Criar interfaces em `/diagrams/types.ts`
  - [ ] Diagram, DiagramComponent, DiagramState, InteractionControls
- [ ] 6.2. Criar componente base `DiagramViewer.tsx` (container genérico)
- [ ] 6.3. Criar `BoxModelDiagram.tsx`
  - [ ] Visualização interativa de content, padding, border, margin
  - [ ] Sliders para ajustar valores
  - [ ] Código CSS gerado dinamicamente
- [ ] 6.4. Criar `FlexboxDiagram.tsx`
  - [ ] Visualização de flex-direction, justify-content, align-items
  - [ ] Toggles para diferentes propriedades
  - [ ] Items draggáveis para demonstrar flex-grow/shrink
- [ ] 6.5. Testar responsividade mobile dos diagramas

#### Tarde (4h): Mais Diagramas + Integração
- [ ] 6.6. Criar `GridDiagram.tsx`
  - [ ] Visualização de grid template areas
  - [ ] Editor de grid-template-columns/rows
  - [ ] Nomeação de grid lines
- [ ] 6.7. Criar diagramas JS em `js-diagrams.ts`
  - [ ] Event Loop Animation (call stack, task queue, microtask queue)
  - [ ] Scope Chain Visualizer (global, function, block scopes)
- [ ] 6.8. Criar diagramas HTML em `html-diagrams.ts`
  - [ ] DOM Tree Visualizer (estrutura hierárquica)
  - [ ] Semantic HTML Map (quando usar cada elemento)
- [ ] 6.9. Integrar todos os diagramas nas lições correspondentes
- [ ] 6.10. Adicionar controles interativos avançados (play/pause animations)

**Entregáveis:**
- ✅ 15 diagramas interativos funcionais
- ✅ Integrados nas lições apropriadas
- ✅ Responsivos e com controles intuitivos

---

### **DIA 7: GLOSSÁRIO E PROGRESSO DE LEITURA** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Implementar glossário com tooltips e sistema de progresso

#### Manhã (4h): Glossário
- [ ] 7.1. Criar interface em `/glossary/types.ts` (GlossaryTerm, GlossaryCategory)
- [ ] 7.2. Criar 30+ termos HTML em `html-terms.ts`
  - [ ] Tag, Element, Attribute, Semantic HTML, DOM, etc.
- [ ] 7.3. Criar 30+ termos CSS em `css-terms.ts`
  - [ ] Selector, Property, Value, Box Model, Specificity, etc.
- [ ] 7.4. Criar 30+ termos JS em `js-terms.ts`
  - [ ] Variable, Function, Closure, Hoisting, Promise, etc.
- [ ] 7.5. Criar 20+ termos React em `react-terms.ts`
  - [ ] Component, Props, State, Hook, JSX, etc.
- [ ] 7.6. Criar componente `GlossaryTooltip.tsx`
  - [ ] Hover tooltip com definição
  - [ ] Link para glossário completo
  - [ ] Animação suave
- [ ] 7.7. Implementar função de detecção automática de termos no conteúdo

#### Tarde (4h): Sistema de Progresso
- [ ] 7.8. Criar tabela `reading_progress` no Supabase (ver schema acima)
- [ ] 7.9. Criar tabela `quiz_attempts` no Supabase
- [ ] 7.10. Criar tabela `exercise_submissions` no Supabase
- [ ] 7.11. Atualizar tabela `students` (adicionar colunas reading_xp, theory_badges, etc.)
- [ ] 7.12. Criar funções em `/progress/tracking.ts`
  - [ ] markSectionRead(studentId, topicSlug, lessonId, sectionId)
  - [ ] saveQuizAttempt(studentId, quizId, score, answers)
  - [ ] saveExerciseSubmission(studentId, exerciseId, code, passed)
  - [ ] calculateReadingXP(timeSpent, sectionCompleted)
- [ ] 7.13. Criar componente `ProgressIndicator.tsx` (barra visual de progresso)
- [ ] 7.14. Criar componente `ReadingTimer.tsx` (tempo estimado + tempo real)

**Entregáveis:**
- ✅ Glossário completo (100+ termos)
- ✅ Tooltips funcionando automaticamente
- ✅ Sistema de progresso salvando no banco
- ✅ Componentes visuais de progresso

---

### **DIA 8: GAMIFICAÇÃO E FINALIZAÇÃO** (8 horas)
**Status:** 🟡 Não iniciado
**Objetivo:** Integrar gamificação completa, testar e polir

#### Manhã (4h): Gamificação
- [ ] 8.1. Criar badges de aprendizado em `/progress/achievements.ts`
  - [ ] 📚 "Estudioso" - Ler 10 lições (50 XP)
  - [ ] 🎓 "Mestre HTML" - Completar todos os tópicos HTML (200 XP)
  - [ ] 🎨 "Artista CSS" - Completar todos os tópicos CSS (200 XP)
  - [ ] ⚡ "Ninja JavaScript" - Completar todos os tópicos JS (200 XP)
  - [ ] ⚛️ "React Developer" - Completar todos os tópicos React (200 XP)
  - [ ] 🏆 "Enciclopédia Viva" - Ler 50+ lições (500 XP)
- [ ] 8.2. Criar sistema de XP em `/progress/xp-calculation.ts`
  - [ ] 10 XP por seção lida (base)
  - [ ] 20 XP por quiz completo (+ 2 XP por acerto)
  - [ ] 30 XP por exercício completado (+ 5 XP se primeira tentativa)
  - [ ] 50 XP por lição completa
  - [ ] 200 XP por tópico completo
  - [ ] Multiplicadores: streak bonus, perfect score, first try
- [ ] 8.3. Integrar XP com sistema de progresso global do dashboard
- [ ] 8.4. Criar componente `TopicBadge.tsx` (badge visual animado)

#### Tarde (4h): Testes e Polimento
- [ ] 8.5. Testar fluxo completo de usuário
  - [ ] /learn → selecionar tópico → navegar lições → fazer quiz → fazer exercício
  - [ ] Verificar salvamento de progresso no banco
  - [ ] Verificar atribuição correta de XP
  - [ ] Verificar desbloqueio de badges
- [ ] 8.6. Verificar responsividade mobile
  - [ ] Todos os componentes novos (quizzes, exercícios, diagramas)
  - [ ] Tooltips funcionando em touch devices
  - [ ] Navegação fluida
- [ ] 8.7. Testar sistema de progresso (salvar e carregar do Supabase)
- [ ] 8.8. Revisar conteúdo teórico (typos, formatação, links quebrados)
- [ ] 8.9. Otimizar performance
  - [ ] Lazy loading de diagramas pesados
  - [ ] Code splitting de Monaco Editor
  - [ ] Compressão de imagens
- [ ] 8.10. Criar documentação interna `/lib/learning/README.md`
- [ ] 8.11. Atualizar CLAUDE.md e DEVELOPMENT.md com novo sistema
- [ ] 8.12. Build final, corrigir warnings, deploy de teste

**Entregáveis:**
- ✅ Gamificação completa integrada
- ✅ Todos os testes passando
- ✅ Sistema otimizado e responsivo
- ✅ Documentação atualizada
- ✅ Pronto para deploy

---

## 🔗 MAPA DE DEPENDÊNCIAS

```
DIA 1 (Fundação)
  ↓ [BLOQUEIA TUDO]
  ↓
DIA 2-4 (Conteúdo Completo)
  ↓ [BLOQUEIA FEATURES INTERATIVAS]
  ↓
  ├─→ DIA 5 (Quizzes/Exercícios) ← Precisa do conteúdo pronto
  │
  └─→ DIA 6 (Diagramas) ← Pode ser paralelo ao DIA 5

  ↓ [DIA 5 + DIA 6 BLOQUEIAM DIA 7]
  ↓
DIA 7 (Glossário + Progresso) ← Precisa de conteúdo e componentes
  ↓ [BLOQUEIA GAMIFICAÇÃO]
  ↓
DIA 8 (Gamificação + Testes) ← Precisa de tudo implementado
```

### Tarefas que podem ser feitas em paralelo
- DIA 5 (Quizzes) e DIA 6 (Diagramas) podem ser desenvolvidos simultaneamente
- Glossário (DIA 7 manhã) pode começar antes do sistema de progresso
- Conteúdo de diferentes tecnologias (HTML, CSS, JS) pode ser escrito em paralelo

---

## 📊 MÉTRICAS DE SUCESSO

### Técnicas
- [ ] 100% do conteúdo movido para `/lib/learning/`
- [ ] 0 erros de TypeScript (strict mode)
- [ ] Build sem warnings
- [ ] 90+ Lighthouse Score mantido
- [ ] Todas as rotas funcionando
- [ ] RLS (Row Level Security) configurado corretamente

### Conteúdo
- [ ] 10 tópicos completos implementados
- [ ] 40+ lições com 120+ seções
- [ ] 30+ quizzes (100+ questões totais)
- [ ] 25+ exercícios inline funcionais
- [ ] 15+ diagramas interativos
- [ ] 100+ termos no glossário com tooltips

### Funcionalidades
- [ ] Sistema de progresso salvando no Supabase
- [ ] XP sendo atribuído corretamente após cada atividade
- [ ] Badges sendo desbloqueados automaticamente
- [ ] Glossário funcionando com tooltips hover
- [ ] Diagramas interativos e responsivos
- [ ] Quizzes com feedback imediato e pontuação
- [ ] Exercícios validando código corretamente
- [ ] Integração com dashboard (XP, badges, progresso)

### UX
- [ ] Tempo de carregamento < 3s
- [ ] Navegação intuitiva entre lições/seções
- [ ] Feedback visual imediato em todas as ações
- [ ] Mobile-friendly (touch, scroll, responsividade)
- [ ] Acessibilidade (keyboard navigation, screen readers)

---

## 🎯 CRITÉRIOS DE ACEITAÇÃO

### Para considerar o projeto CONCLUÍDO:

1. **Conteúdo Completo**
   - Todos os 10 tópicos implementados e revisados
   - Todo conteúdo migrado de page.tsx para /lib/learning/
   - Exemplos de código testados e funcionais

2. **Features Interativas Funcionando**
   - Quizzes salvando no banco e atribuindo XP
   - Exercícios validando código corretamente
   - Diagramas interativos e responsivos

3. **Sistema de Progresso Integrado**
   - Leitura de seções sendo trackeada
   - Progresso sincronizado com dashboard
   - Badges sendo desbloqueados corretamente

4. **Qualidade Técnica**
   - 0 erros TypeScript
   - Build passando sem warnings críticos
   - Testes de integração básicos funcionando

5. **Documentação**
   - README.md em /lib/learning/ explicando a arquitetura
   - CLAUDE.md e DEVELOPMENT.md atualizados
   - Comentários em código complexo

---

## 📝 OBSERVAÇÕES IMPORTANTES

### Prioridades
1. **Fundação sólida** (DIA 1) - Não pule esta etapa
2. **Conteúdo denso** (DIA 2-4) - Qualidade > Quantidade
3. **Features que agregam valor** (DIA 5-7) - Foco na experiência do usuário
4. **Polimento** (DIA 8) - Não subestime o tempo de testes

### Riscos Identificados
- **Escopo grande**: Pode levar mais de 8 dias se surgir complexidade não prevista
- **Conteúdo denso**: Escrever 500+ palavras por seção leva tempo
- **Integração com Supabase**: Pode haver bugs de RLS ou permissões
- **Performance**: Monaco Editor pode deixar a página pesada

### Mitigações
- Priorizar MVP de cada feature antes de polir
- Reutilizar componentes existentes quando possível
- Testar integrações com Supabase desde o DIA 1
- Implementar lazy loading para componentes pesados

---

## 🔄 PROCESSO DE CONTROLE

### Daily Review (Fim de cada dia)
- [ ] Revisar checklist do dia
- [ ] Atualizar status no LEARNING_IMPLEMENTATION_TRACKER.md
- [ ] Identificar bloqueios para o próximo dia
- [ ] Commit com mensagem descritiva: `feat(learning): [DIA X] Descrição`

### Weekly Milestone (Fim do projeto)
- [ ] Demo completo do sistema funcionando
- [ ] Documentação final revisada
- [ ] Deploy de teste realizado
- [ ] Feedback do estudante de 15 anos coletado (usuário real!)

---

## 📞 CONTATOS & RECURSOS

### Documentações de Referência
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Auth & Database](https://supabase.com/docs)
- [Monaco Editor API](https://microsoft.github.io/monaco-editor/api/index.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React 18 Docs](https://react.dev)

### Inspirações de Conteúdo
- [MDN Web Docs](https://developer.mozilla.org/pt-BR/) - Referência técnica
- [JavaScript.info](https://javascript.info/) - Tutorial moderno
- [CSS Tricks](https://css-tricks.com/) - Artigos CSS avançados
- [React Dev](https://react.dev/learn) - Tutorial oficial React

---

## 📜 HISTÓRICO DE MUDANÇAS

### v1.0 - 2024-12-27
- ✅ Roadmap inicial criado
- ✅ Estrutura de 8 dias definida
- ✅ Métricas de sucesso estabelecidas
- ✅ Dependências mapeadas

---

**Última atualização:** 2024-12-27
**Status do projeto:** 🟡 Planejamento Completo - Aguardando Início da Implementação
**Progresso geral:** 0% (0/62 tarefas principais)
