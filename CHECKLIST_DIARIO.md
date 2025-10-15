# ✅ CHECKLIST DIÁRIO - SPRINT DE LANÇAMENTO

Use este documento para marcar o progresso diário. Atualize os checkboxes conforme completar as tarefas.

---

## 📅 DIA 1 - SEGUNDA-FEIRA (6-8h)
**Foco:** Modal Pocket + Quizzes Integrados

### 🌅 Manhã (3-4h): Modal Pocket

#### Setup
- [ ] `git checkout -b feature/launch-week`
- [ ] `npm run dev` funcionando
- [ ] Abrir `src/components/challenge/ModalPocket.tsx`

#### Desafio 6: Layout Flexbox (45min)
- [ ] Adicionar objeto pocketData[6] com 3 conteúdos
- [ ] Conteúdo 1: Conceito "O que é Flexbox"
- [ ] Conteúdo 2: Tip "Justify-content vs Align-items"
- [ ] Conteúdo 3: Example "Layout Flexbox do Quple"
- [ ] Testar em `/challenge/6` - abrir modal pocket
- [ ] Commit: `git commit -m "feat: add modal pocket content for challenge 6"`

#### Desafio 7: Responsive Design (45min)
- [ ] Adicionar objeto pocketData[7] com 3 conteúdos
- [ ] Conteúdo 1: Conceito "Media Queries"
- [ ] Conteúdo 2: Tip "Mobile-first approach"
- [ ] Conteúdo 3: Example "Breakpoints comuns"
- [ ] Testar em `/challenge/7`
- [ ] Commit: `git commit -m "feat: add modal pocket content for challenge 7"`

#### Desafio 8: JavaScript Interativo (45min)
- [ ] Adicionar objeto pocketData[8] com 3 conteúdos
- [ ] Conteúdo 1: Conceito "DOM Manipulation"
- [ ] Conteúdo 2: Tip "querySelector e addEventListener"
- [ ] Conteúdo 3: Example "Toggle password visibility"
- [ ] Testar em `/challenge/8`
- [ ] Commit: `git commit -m "feat: add modal pocket content for challenge 8"`

#### Desafio 9: Form Validation (45min)
- [ ] Adicionar objeto pocketData[9] com 3 conteúdos
- [ ] Conteúdo 1: Conceito "Validação de formulários"
- [ ] Conteúdo 2: Tip "preventDefault e feedback visual"
- [ ] Conteúdo 3: Example "Validação do Quple"
- [ ] Testar em `/challenge/9`
- [ ] Commit: `git commit -m "feat: add modal pocket content for challenge 9"`

#### Desafio 10: React (45min)
- [ ] Adicionar objeto pocketData[10] com 3 conteúdos
- [ ] Conteúdo 1: Conceito "Componentes React"
- [ ] Conteúdo 2: Tip "JSX syntax basics"
- [ ] Conteúdo 3: Example "Componente Quple simples"
- [ ] Testar em `/challenge/10`
- [ ] Commit: `git commit -m "feat: add modal pocket content for challenge 10"`

**✅ Checkpoint Manhã:**
- [ ] Modal Pocket funcionando para todos os 10 desafios
- [ ] Todos os commits feitos
- [ ] Build passando: `npm run build`

---

### 🌇 Tarde (3-4h): Sistema de Quizzes

#### Criar Componente QuizSection (1h)
- [ ] Criar `src/components/learning/QuizSection.tsx`
- [ ] Imports necessários (useState, Quiz types, etc)
- [ ] Estado: answers, submitted, score
- [ ] Renderizar título do quiz
- [ ] Map de questions → QuizQuestion
- [ ] Botão "Verificar Respostas"
- [ ] Lógica de cálculo de score
- [ ] Feedback visual (score, xp ganho)
- [ ] Testar isoladamente
- [ ] Commit: `git commit -m "feat: create QuizSection component"`

#### Criar Componente QuizQuestion (1h)
- [ ] Criar `src/components/learning/QuizQuestion.tsx`
- [ ] Props: question, onAnswer, submitted, isCorrect
- [ ] Renderizar pergunta
- [ ] Renderizar opções (multiple-choice)
- [ ] Handler de seleção de resposta
- [ ] Feedback visual (verde/vermelho)
- [ ] Mostrar explicação após submeter
- [ ] Estilização com Tailwind
- [ ] Commit: `git commit -m "feat: create QuizQuestion component"`

#### Integrar Quiz em TopicPageClient (1h)
- [ ] Abrir `src/app/learn/[slug]/TopicPageClient.tsx`
- [ ] Import QuizSection
- [ ] Adicionar estado `quizCompleted`
- [ ] Detectar fim de lição (última seção)
- [ ] Renderizar QuizSection se quiz existir
- [ ] Handler de onComplete (por enquanto só log)
- [ ] Testar em `/learn/html-fundamentals`
- [ ] Commit: `git commit -m "feat: integrate quizzes in topic pages"`

#### Criar Mais Quizzes (1h)
- [ ] Criar `src/lib/learning/quizzes/css-quizzes.ts`
  - [ ] 5 questões sobre CSS Basics
  - [ ] Export cssQuizzes
- [ ] Criar `src/lib/learning/quizzes/js-quizzes.ts`
  - [ ] 5 questões sobre JavaScript Fundamentals
  - [ ] Export jsQuizzes
- [ ] Atualizar `src/lib/learning/quizzes/index.ts`
  - [ ] Export cssQuizzes
  - [ ] Export jsQuizzes
- [ ] Adicionar quizzes nos tópicos correspondentes
- [ ] Testar quizzes em diferentes tópicos
- [ ] Commit: `git commit -m "feat: add CSS and JS quizzes"`

**✅ Checkpoint Tarde:**
- [ ] QuizSection e QuizQuestion funcionando
- [ ] Quizzes integrados nas páginas /learn
- [ ] 15+ questões criadas (HTML, CSS, JS)
- [ ] Build passando: `npm run build`

---

### 🌙 Fim do Dia 1
- [ ] Push para o repositório: `git push origin feature/launch-week`
- [ ] Testar fluxo completo:
  - [ ] Abrir desafio 6-10, verificar Modal Pocket
  - [ ] Abrir /learn, navegar tópico, fazer quiz
- [ ] Documentar bloqueios ou observações
- [ ] Preparar ambiente para amanhã

**Status Esperado:** Modal Pocket 100% + Quizzes 100%

---

## 📅 DIA 2 - TERÇA-FEIRA (7-8h)
**Foco:** Sistema de Progresso de Leitura

### 🌅 Manhã (4h): Backend e Banco de Dados

#### Setup Supabase (1h)
- [ ] Acessar dashboard Supabase
- [ ] Abrir SQL Editor
- [ ] Criar tabela `reading_progress`:
  ```sql
  CREATE TABLE reading_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES students(id) ON DELETE CASCADE,
    topic_slug text NOT NULL,
    lesson_id text NOT NULL,
    section_id text NOT NULL,
    completed boolean DEFAULT false,
    time_spent integer DEFAULT 0,
    last_read_at timestamp DEFAULT now(),
    created_at timestamp DEFAULT now(),
    UNIQUE(student_id, topic_slug, lesson_id, section_id)
  );
  ```
- [ ] Criar índices:
  ```sql
  CREATE INDEX idx_reading_progress_student ON reading_progress(student_id);
  CREATE INDEX idx_reading_progress_topic ON reading_progress(topic_slug);
  ```
- [ ] Testar: inserir registro manual
- [ ] Verificar dados aparecem na tabela

#### Continuar Supabase (30min)
- [ ] Criar tabela `quiz_attempts`:
  ```sql
  CREATE TABLE quiz_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES students(id) ON DELETE CASCADE,
    quiz_id text NOT NULL,
    lesson_id text NOT NULL,
    score integer NOT NULL,
    max_score integer NOT NULL,
    answers jsonb NOT NULL,
    xp_earned integer DEFAULT 0,
    completed_at timestamp DEFAULT now(),
    created_at timestamp DEFAULT now()
  );
  ```
- [ ] Criar índices:
  ```sql
  CREATE INDEX idx_quiz_attempts_student ON quiz_attempts(student_id);
  CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
  ```
- [ ] Atualizar tabela `students`:
  ```sql
  ALTER TABLE students
    ADD COLUMN reading_xp integer DEFAULT 0,
    ADD COLUMN theory_badges text[] DEFAULT '{}';
  ```
- [ ] Verificar alteração aplicada

#### Configurar RLS (30min)
- [ ] Habilitar RLS em `reading_progress`
- [ ] Policy: Students can view own progress
  ```sql
  CREATE POLICY "Students can view own reading progress"
    ON reading_progress FOR SELECT
    USING (auth.uid() = student_id);
  ```
- [ ] Policy: Students can insert own progress
  ```sql
  CREATE POLICY "Students can insert own reading progress"
    ON reading_progress FOR INSERT
    WITH CHECK (auth.uid() = student_id);
  ```
- [ ] Policy: Students can update own progress
  ```sql
  CREATE POLICY "Students can update own reading progress"
    ON reading_progress FOR UPDATE
    USING (auth.uid() = student_id);
  ```
- [ ] Repetir políticas para `quiz_attempts`
- [ ] Testar RLS (criar usuário teste, tentar acessar dados)

#### Criar Tracking Functions (1.5h)
- [ ] Criar `src/lib/learning/progress/tracking.ts`
- [ ] Import supabase client
- [ ] Função `markSectionRead`:
  ```typescript
  async function markSectionRead(
    studentId: string,
    topicSlug: string,
    lessonId: string,
    sectionId: string,
    timeSpent: number
  ): Promise<void>
  ```
- [ ] Função `getSectionProgress`:
  ```typescript
  async function getSectionProgress(
    studentId: string,
    topicSlug: string,
    lessonId: string
  ): Promise<SectionProgress[]>
  ```
- [ ] Função `saveQuizAttempt`:
  ```typescript
  async function saveQuizAttempt(
    studentId: string,
    quizId: string,
    lessonId: string,
    answers: QuizAnswer[],
    score: number,
    maxScore: number
  ): Promise<number> // returns XP earned
  ```
- [ ] Função `getQuizAttempts`:
  ```typescript
  async function getQuizAttempts(
    studentId: string,
    quizId: string
  ): Promise<QuizAttempt[]>
  ```
- [ ] Testar funções isoladamente
- [ ] Commit: `git commit -m "feat: create progress tracking functions"`

#### Criar XP Calculation (1h)
- [ ] Criar `src/lib/learning/progress/xp-calculation.ts`
- [ ] Função `calculateReadingXP`:
  ```typescript
  function calculateReadingXP(
    timeSpent: number,
    sectionCompleted: boolean
  ): number {
    let xp = 10 // base
    if (timeSpent >= 120) xp += 5 // 2+ min bonus
    if (sectionCompleted) xp += 5
    return xp
  }
  ```
- [ ] Função `calculateQuizXP`:
  ```typescript
  function calculateQuizXP(
    score: number,
    maxScore: number,
    firstTry: boolean
  ): number {
    let xp = 20 // base
    const percent = (score / maxScore) * 100
    xp += Math.floor(percent / 10) * 2
    if (percent === 100) xp += 10
    if (firstTry && percent === 100) xp += 20
    return xp
  }
  ```
- [ ] Testes unitários (verificar cálculos)
- [ ] Commit: `git commit -m "feat: create XP calculation system"`

**✅ Checkpoint Manhã:**
- [ ] 2 tabelas criadas com RLS
- [ ] Tracking functions implementadas
- [ ] XP calculation funcionando
- [ ] Build passando

---

### 🌇 Tarde (3-4h): Frontend e Integração

#### Componente ProgressIndicator (1h)
- [ ] Criar `src/components/learning/ProgressIndicator.tsx`
- [ ] Props: totalSections, completedSections
- [ ] Barra de progresso visual
- [ ] Percentual de conclusão
- [ ] Contador "3 de 8 seções lidas"
- [ ] Animação de preenchimento
- [ ] Estilização premium
- [ ] Commit: `git commit -m "feat: create ProgressIndicator component"`

#### Componente ReadingTimer (45min)
- [ ] Criar `src/components/learning/ReadingTimer.tsx`
- [ ] Estado: timeSpent, isTracking
- [ ] useEffect para incrementar tempo
- [ ] Display: "Tempo estimado: 5min | Tempo gasto: 2min"
- [ ] Cleanup ao desmontar
- [ ] Callback onTimeUpdate
- [ ] Commit: `git commit -m "feat: create ReadingTimer component"`

#### Integrar em TopicPageClient (1.5h)
- [ ] Abrir `src/app/learn/[slug]/TopicPageClient.tsx`
- [ ] Import tracking functions
- [ ] Import ProgressIndicator e ReadingTimer
- [ ] Estado: progress, timeSpent
- [ ] useEffect: carregar progresso ao montar
- [ ] Renderizar ProgressIndicator no topo
- [ ] Renderizar ReadingTimer
- [ ] Salvar seção como lida ao navegar
- [ ] Salvar tempo gasto ao sair
- [ ] Testar: verificar dados salvando no Supabase
- [ ] Commit: `git commit -m "feat: integrate progress tracking in topic pages"`

#### Integrar XP em Quizzes (45min)
- [ ] Abrir `QuizSection.tsx`
- [ ] Import calculateQuizXP, saveQuizAttempt
- [ ] useAuth para pegar studentId
- [ ] Ao submeter quiz:
  - [ ] Calcular XP
  - [ ] Salvar em quiz_attempts
  - [ ] Atualizar students.reading_xp
  - [ ] Mostrar XP ganho no feedback
- [ ] Animação de "+50 XP"
- [ ] Testar fluxo completo
- [ ] Commit: `git commit -m "feat: integrate XP system in quizzes"`

**✅ Checkpoint Tarde:**
- [ ] Componentes visuais funcionando
- [ ] Tracking integrado em TopicPageClient
- [ ] XP sendo atribuído automaticamente
- [ ] Dados salvando corretamente no Supabase

---

### 🌙 Fim do Dia 2
- [ ] Push: `git push origin feature/launch-week`
- [ ] Testar fluxo completo:
  - [ ] Login
  - [ ] Abrir /learn/html-fundamentals
  - [ ] Ler seções (verificar progresso)
  - [ ] Fazer quiz (verificar XP)
  - [ ] Verificar dados no Supabase
- [ ] Documentar observações

**Status Esperado:** Sistema de progresso 100% funcional

---

## 📅 DIA 3 - QUARTA-FEIRA (6-7h)
**Foco:** Badges de Aprendizado + Gamificação

### 🌅 Manhã (3h): Sistema de Badges

#### Definir Badges (1.5h)
- [ ] Criar `src/lib/learning/progress/achievements.ts`
- [ ] Import types
- [ ] Definir LEARNING_BADGES:
  ```typescript
  export const LEARNING_BADGES: Achievement[] = [
    {
      id: 'estudioso',
      title: 'Estudioso',
      description: 'Leia 5 lições completas',
      icon: '📚',
      xpReward: 50,
      criteria: {
        type: 'lessons-read',
        threshold: 5
      }
    },
    // ... mais 4 badges
  ]
  ```
- [ ] Badge: Mestre HTML (completar tópicos HTML)
- [ ] Badge: Artista CSS (completar tópicos CSS)
- [ ] Badge: Quiz Master (10 quizzes perfeitos)
- [ ] Badge: Enciclopédia Viva (20 lições)
- [ ] Commit: `git commit -m "feat: define learning badges"`

#### Lógica de Desbloqueio (1h)
- [ ] Adicionar em `tracking.ts`
- [ ] Função `checkBadgeUnlock`:
  ```typescript
  async function checkBadgeUnlock(
    studentId: string
  ): Promise<Achievement | null>
  ```
- [ ] Verificar cada critério
- [ ] Retornar badge desbloqueado (se houver)
- [ ] Salvar em students.theory_badges
- [ ] Atualizar students.reading_xp (adicionar reward)
- [ ] Testar lógica
- [ ] Commit: `git commit -m "feat: add badge unlock logic"`

#### Componente BadgeUnlockModal (30min)
- [ ] Criar `src/components/learning/BadgeUnlockModal.tsx`
- [ ] Props: badge, isOpen, onClose
- [ ] Modal celebratório
- [ ] Animação de entrada
- [ ] Mostrar ícone grande do badge
- [ ] Título e descrição
- [ ] XP reward destacado
- [ ] Botão "Continuar"
- [ ] Commit: `git commit -m "feat: create BadgeUnlockModal component"`

**✅ Checkpoint Manhã:**
- [ ] 5 badges definidos
- [ ] Lógica de desbloqueio implementada
- [ ] Modal celebratório pronto

---

### 🌇 Tarde (3-4h): Integração com Dashboard

#### Atualizar Dashboard (1h)
- [ ] Abrir `src/app/dashboard/page.tsx`
- [ ] Buscar reading_xp do estudante
- [ ] Calcular XP total (total_xp + reading_xp)
- [ ] Atualizar nível baseado em XP total
- [ ] Mostrar separadamente:
  - [ ] "XP de Desafios: 450"
  - [ ] "XP de Leitura: 230"
  - [ ] "XP Total: 680"
- [ ] Testar cálculo
- [ ] Commit: `git commit -m "feat: integrate reading_xp in dashboard"`

#### Seção Badges de Aprendizado (1h)
- [ ] Criar componente `LearningBadges.tsx`
- [ ] Props: badges (student badges)
- [ ] Grid de badges
- [ ] Locked state (cinza, opacity baixa)
- [ ] Unlocked state (colorido, hover effects)
- [ ] Progress bar para badges próximos
  - Ex: "Estudioso: 3/5 lições lidas"
- [ ] Integrar no dashboard
- [ ] Commit: `git commit -m "feat: create learning badges section"`

#### Atualizar Leaderboard (1h)
- [ ] Abrir `src/app/leaderboard/page.tsx`
- [ ] Query: buscar total_xp + reading_xp
- [ ] Ordenar por XP total combinado
- [ ] Mostrar badges de aprendizado nos cards
- [ ] Tooltip ao passar o mouse nos badges
- [ ] Testar ranking
- [ ] Commit: `git commit -m "feat: update leaderboard with reading_xp"`

#### Integrar BadgeUnlockModal (30min)
- [ ] Abrir `TopicPageClient.tsx`
- [ ] Import BadgeUnlockModal
- [ ] Estado: unlockedBadge, showBadgeModal
- [ ] Após marcar seção como lida:
  - [ ] Chamar checkBadgeUnlock
  - [ ] Se badge desbloqueado, abrir modal
- [ ] Após fazer quiz:
  - [ ] Chamar checkBadgeUnlock
  - [ ] Se badge desbloqueado, abrir modal
- [ ] Testar fluxo completo
- [ ] Commit: `git commit -m "feat: integrate badge unlock modal"`

**✅ Checkpoint Tarde:**
- [ ] Dashboard mostrando reading_xp
- [ ] Seção de badges de aprendizado
- [ ] Leaderboard atualizado
- [ ] Modal aparecendo ao desbloquear badge

---

### 🌙 Fim do Dia 3
- [ ] Push: `git push origin feature/launch-week`
- [ ] Testar gamificação completa:
  - [ ] Ler 5 lições → desbloquear "Estudioso"
  - [ ] Fazer 10 quizzes perfeitos → "Quiz Master"
  - [ ] Verificar XP total no dashboard
- [ ] Verificar leaderboard mostrando dados corretos

**Status Esperado:** Gamificação 100% integrada

---

## 📅 DIA 4 - QUINTA-FEIRA (6-8h)
**Foco:** Completar Conteúdo Teórico

### 🌅 Manhã (4h): HTML e CSS

#### HTML Fundamentals (1h)
- [ ] Abrir `src/lib/learning/topics/html/fundamentals.ts`
- [ ] Revisar cada seção:
  - [ ] Verificar 500+ palavras
  - [ ] Adicionar exemplos do Quple
  - [ ] Links para MDN/W3Schools
- [ ] Expandir seções curtas
- [ ] Verificar code examples funcionam
- [ ] Commit: `git commit -m "content: expand HTML Fundamentals"`

#### HTML Advanced (1h)
- [ ] Abrir `src/lib/learning/topics/html/advanced.ts`
- [ ] Seção Acessibilidade:
  - [ ] ARIA roles explicados
  - [ ] Screen readers
  - [ ] Navegação por teclado
- [ ] Seção SEO:
  - [ ] Meta tags detalhadas
  - [ ] Open Graph
  - [ ] Schema.org
- [ ] Exemplos práticos do Quple
- [ ] Commit: `git commit -m "content: expand HTML Advanced"`

#### CSS Basics (1h)
- [ ] Abrir `src/lib/learning/topics/css/basics.ts`
- [ ] Box Model detalhado:
  - [ ] Diagrama textual
  - [ ] Margin vs Padding
  - [ ] Border e outline
- [ ] Seletores avançados:
  - [ ] Classes vs IDs
  - [ ] Pseudo-classes
  - [ ] Combinadores
- [ ] Commit: `git commit -m "content: expand CSS Basics"`

#### CSS Advanced (1h)
- [ ] Abrir `src/lib/learning/topics/css/advanced.ts`
- [ ] Flexbox completo:
  - [ ] Main axis vs cross axis
  - [ ] Justify-content explicado
  - [ ] Align-items explicado
  - [ ] Flex-grow, shrink, basis
- [ ] Grid Layout básico
- [ ] Responsive design patterns
- [ ] Commit: `git commit -m "content: expand CSS Advanced"`

**✅ Checkpoint Manhã:**
- [ ] HTML Fundamentals completo (500+ palavras/seção)
- [ ] HTML Advanced completo
- [ ] CSS Basics completo
- [ ] CSS Advanced completo

---

### 🌇 Tarde (4h): JavaScript e React

#### JavaScript Fundamentals (1.5h)
- [ ] Abrir `src/lib/learning/topics/javascript/fundamentals.ts`
- [ ] Variáveis e tipos:
  - [ ] var vs let vs const
  - [ ] Tipos primitivos
  - [ ] Type coercion
- [ ] Funções:
  - [ ] Function declaration
  - [ ] Arrow functions
  - [ ] Parameters e return
- [ ] DOM manipulation:
  - [ ] querySelector
  - [ ] addEventListener
  - [ ] classList
  - [ ] textContent vs innerHTML
- [ ] Exemplos práticos do Quple
- [ ] Commit: `git commit -m "content: expand JavaScript Fundamentals"`

#### JavaScript Advanced (1h)
- [ ] Abrir `src/lib/learning/topics/javascript/advanced.ts`
- [ ] Async/await:
  - [ ] Promises explained
  - [ ] Async syntax
  - [ ] Try/catch
  - [ ] Error handling
- [ ] Fetch API:
  - [ ] GET requests
  - [ ] POST requests
  - [ ] JSON parsing
- [ ] ES6+ features:
  - [ ] Destructuring
  - [ ] Spread operator
  - [ ] Template literals
- [ ] Commit: `git commit -m "content: expand JavaScript Advanced"`

#### React Introduction (1h)
- [ ] Abrir `src/lib/learning/topics/react/introduction.ts`
- [ ] O que é React:
  - [ ] História e filosofia
  - [ ] Virtual DOM
  - [ ] Componentes
- [ ] JSX:
  - [ ] Sintaxe básica
  - [ ] Diferenças do HTML
  - [ ] Expressões JavaScript
- [ ] Primeiro componente:
  - [ ] Function component
  - [ ] Props básico
  - [ ] Renderização
- [ ] Commit: `git commit -m "content: expand React Introduction"`

#### Verificar Links e Exemplos (30min)
- [ ] Testar todos os links externos
- [ ] Verificar code examples (syntax highlighting)
- [ ] Verificar exemplos do Quple fazem sentido
- [ ] Corrigir typos e erros gramaticais
- [ ] Commit: `git commit -m "content: verify links and examples"`

**✅ Checkpoint Tarde:**
- [ ] JavaScript Fundamentals completo
- [ ] JavaScript Advanced completo
- [ ] React Introduction completo
- [ ] Todos os links verificados

---

### 🌙 Fim do Dia 4
- [ ] Push: `git push origin feature/launch-week`
- [ ] Ler algumas seções como usuário final
- [ ] Verificar fluidez e clareza do conteúdo
- [ ] Anotar melhorias para depois

**Status Esperado:** Conteúdo teórico denso e completo

---

## 📅 DIA 5 - SEXTA-FEIRA (6-8h)
**Foco:** Testes + Deploy

### 🌅 Manhã (4h): Testes Completos

#### Teste de Fluxo Completo (1.5h)
- [ ] Criar usuário teste
- [ ] Fluxo: Cadastro
  - [ ] Preencher formulário
  - [ ] Verificar validação
  - [ ] Criar conta
- [ ] Fluxo: Login
  - [ ] Entrar com credenciais
  - [ ] Verificar redirecionamento
- [ ] Fluxo: Dashboard
  - [ ] Verificar XP total
  - [ ] Verificar badges
  - [ ] Verificar progresso
- [ ] Fluxo: Desafios
  - [ ] Abrir desafio 6
  - [ ] Testar Modal Pocket
  - [ ] Completar desafio
  - [ ] Verificar XP atribuído
- [ ] Fluxo: Conteúdo Teórico
  - [ ] Abrir /learn
  - [ ] Navegar tópico HTML
  - [ ] Ler lições
  - [ ] Fazer quiz
  - [ ] Verificar progresso salvo
  - [ ] Verificar XP atribuído
- [ ] Fluxo: Badges
  - [ ] Ler 5 lições
  - [ ] Verificar "Estudioso" desbloqueado
  - [ ] Ver modal celebratório
- [ ] Fluxo: Leaderboard
  - [ ] Verificar ranking
  - [ ] Ver badges outros usuários
- [ ] Anotar bugs encontrados

#### Teste Responsividade Mobile (1h)
- [ ] Chrome DevTools → Mobile (375px)
- [ ] Testar cada página:
  - [ ] / (landing page)
  - [ ] /dashboard
  - [ ] /challenges
  - [ ] /challenge/6
  - [ ] /learn
  - [ ] /learn/html-fundamentals
  - [ ] /leaderboard
  - [ ] /social
  - [ ] /settings
- [ ] Verificar:
  - [ ] Menu colapsível funcionando
  - [ ] Sidebar responsiva
  - [ ] Cards adaptando
  - [ ] Quizzes legíveis
  - [ ] Modal Pocket mobile-friendly
- [ ] Anotar problemas

#### Testes Supabase (1h)
- [ ] Verificar RLS:
  - [ ] Criar segundo usuário
  - [ ] Tentar acessar dados do primeiro
  - [ ] Deve bloquear
- [ ] Verificar queries:
  - [ ] reading_progress salvando
  - [ ] quiz_attempts salvando
  - [ ] students atualizando corretamente
- [ ] Performance:
  - [ ] Queries rápidas (< 1s)
  - [ ] Sem N+1 queries
- [ ] Verificar índices criados

#### Verificar Console (30min)
- [ ] Abrir DevTools Console
- [ ] Navegar todas as páginas
- [ ] Verificar:
  - [ ] Sem erros JavaScript
  - [ ] Sem warnings React (key props, etc)
  - [ ] Sem 404s (imagens, fonts)
- [ ] Lighthouse Score:
  - [ ] Performance: 85+
  - [ ] Accessibility: 90+
  - [ ] Best Practices: 90+
  - [ ] SEO: 90+
- [ ] Corrigir problemas críticos

**✅ Checkpoint Manhã:**
- [ ] Fluxo completo testado
- [ ] Mobile 100% responsivo
- [ ] Supabase funcionando perfeitamente
- [ ] Console limpo

---

### 🌇 Tarde (3-4h): Deploy e Finalização

#### Revisar Conteúdo Textual (1h)
- [ ] Usar VS Code search
- [ ] Buscar por "TODO", "FIXME", "XXX"
- [ ] Revisar textos principais:
  - [ ] Landing page
  - [ ] Dashboard
  - [ ] Mensagens de sucesso/erro
  - [ ] Conteúdo teórico (spot check)
- [ ] Corrigir typos
- [ ] Verificar consistência de tom
- [ ] Commit: `git commit -m "fix: content review and typos"`

#### Otimizar Performance (1h)
- [ ] Verificar imports:
  - [ ] Lazy load Monaco Editor
  - [ ] Dynamic imports onde necessário
- [ ] Verificar imagens:
  - [ ] Comprimidas
  - [ ] Formato WebP se possível
- [ ] Verificar bundle size:
  - [ ] `npm run build` e verificar output
  - [ ] Se > 500KB, investigar
- [ ] Debounce em tracking:
  - [ ] Não salvar progresso a cada segundo
  - [ ] Salvar ao sair ou a cada 30s
- [ ] Commit: `git commit -m "perf: optimize bundle and tracking"`

#### Atualizar Documentação (1h)
- [ ] CLAUDE.md:
  - [ ] Atualizar "Status Atual"
  - [ ] Adicionar features novas
  - [ ] Atualizar "Próximos Passos"
- [ ] DEVELOPMENT.md:
  - [ ] Marcar FASE 11 como concluída
  - [ ] Atualizar última data
  - [ ] Adicionar observações
- [ ] LEARNING_IMPLEMENTATION_TRACKER.md:
  - [ ] Marcar tarefas concluídas
  - [ ] Atualizar progresso geral
- [ ] Criar `src/lib/learning/README.md`:
  - [ ] Explicar arquitetura
  - [ ] Como adicionar novo conteúdo
  - [ ] Tipos principais
- [ ] Commit: `git commit -m "docs: update project documentation"`

#### Build Final e Deploy (1h)
- [ ] Verificar variáveis de ambiente:
  - [ ] `.env.local` correto
  - [ ] Supabase keys configuradas
- [ ] Build local:
  - [ ] `npm run build`
  - [ ] Verificar sem erros
  - [ ] Verificar sem warnings críticos
- [ ] Merge para main:
  - [ ] `git checkout main`
  - [ ] `git merge feature/launch-week`
  - [ ] Resolver conflitos (se houver)
  - [ ] Push: `git push origin main`
- [ ] Deploy Vercel:
  - [ ] Push deve triggar deploy automático
  - [ ] Ou usar `vercel --prod`
  - [ ] Aguardar deploy completar
- [ ] Verificar produção:
  - [ ] Acessar URL de produção
  - [ ] Testar auth (cadastro/login)
  - [ ] Testar navegação
  - [ ] Verificar Supabase conectando
- [ ] Smoke tests:
  - [ ] Criar conta
  - [ ] Fazer desafio
  - [ ] Ler lição
  - [ ] Verificar progresso

**✅ Checkpoint Tarde:**
- [ ] Conteúdo revisado
- [ ] Performance otimizada
- [ ] Documentação atualizada
- [ ] Deploy realizado com sucesso

---

### 🌙 Fim do Dia 5
- [ ] 🎉 PROJETO NO AR!
- [ ] Enviar link de produção
- [ ] Testar com estudante de 15 anos
- [ ] Anotar feedback inicial
- [ ] Comemorar! 🎊

**Status Esperado:** PLATAFORMA LANÇADA ✅

---

## 🎊 PÓS-LANÇAMENTO

### Monitoramento (Primeira Semana)
- [ ] Verificar erros no Sentry/Vercel logs
- [ ] Monitorar performance
- [ ] Coletar feedback do estudante
- [ ] Anotar bugs e melhorias

### Próximos Passos (Fase 2)
- [ ] Exercícios inline
- [ ] Diagramas interativos
- [ ] Glossário com tooltips
- [ ] Avaliação integradora
- [ ] Mais quizzes
- [ ] Vídeos explicativos

---

## 📊 RESUMO FINAL

```
┌────────────────────────────────────────────────┐
│           SPRINT DE LANÇAMENTO                 │
├────────────────────────────────────────────────┤
│                                                │
│  DIA 1:  Modal Pocket + Quizzes       [6-8h]  │
│  DIA 2:  Sistema de Progresso         [7-8h]  │
│  DIA 3:  Badges + Gamificação         [6-7h]  │
│  DIA 4:  Conteúdo Teórico             [6-8h]  │
│  DIA 5:  Testes + Deploy              [6-8h]  │
│                                                │
│  TOTAL:  31-39 horas (~6-8h por dia)          │
│                                                │
│  RESULTADO: PLATAFORMA EDUCACIONAL             │
│             100% FUNCIONAL! 🚀                 │
│                                                │
└────────────────────────────────────────────────┘
```

**Boa sorte! Você consegue! 💪🎓**
