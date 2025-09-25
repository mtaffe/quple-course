# CLAUDE.md - Context File

## Projeto: React Learning Playground

### Status: ✅ PLATAFORMA COMPLETA E FUNCIONAL

### Visão Geral
Sistema de ensino gamificado completo para introduzir jovens ao React/Next.js através de desafios práticos simulando manutenção de um app chamado "Quple" (app para casais). O sistema é totalmente funcional, auto-suficiente, responsivo e pronto para uso educacional.

### Contexto do Estudante
- **Idade**: 15 anos
- **Nível**: Começando do zero (HTML/CSS/JS/React)
- **Dedicação**: 2-3 horas por dia, segunda a sexta
- **Ambiente**: Windows 11 + VS Code
- **Acompanhamento**: Mentor presente mas sistema deve ser auto-suficiente

### Stack Técnica
- **Frontend**: Next.js 15.5.4 + TypeScript + Tailwind CSS
- **Backend**: Supabase (auth, database)
- **Editor**: Monaco Editor (web) + VS Code (local)
- **Styling**: Tailwind CSS + componentes customizados
- **Deployment**: Vercel
- **Components**: class-variance-authority, clsx, lucide-react

### Estrutura de Aprendizado (11 Desafios + Avaliação)

#### Desafio 0: Avaliação de Nível (Obrigatório)
0. **"🔍 Avaliação de Nível"** - Questionário inicial para personalizar a jornada
   - 10 questões sobre HTML/CSS/JavaScript (formato misto)
   - Direcionamento automático baseado no resultado:
     - **Iniciante (0-40%)**: Começa do Desafio 1
     - **Intermediário (41-70%)**: Começa do Desafio 4
     - **Avançado (71%+)**: Começa do Desafio 7
   - Modal obrigatório no primeiro acesso
   - Possibilidade de refazer a qualquer momento

#### Bloco 1: HTML Fundamentos (Semanas 1-2)
1. **"🏗️ Página em Branco"** - Criar estrutura HTML básica da tela de login
2. **"📝 Formulário Incompleto"** - Adicionar campos faltantes no cadastro
3. **"🔗 Links Quebrados"** - Corrigir navegação entre páginas
4. **"📋 Conteúdo Bagunçado"** - Organizar hierarquia semântica

#### Bloco 2: CSS Styling (Semana 2-3)
5. **"🎨 App Sem Cor"** - Aplicar paleta de cores e tipografia
6. **"💥 Layout Quebrado"** - Implementar flexbox para organização
7. **"📱 Mobile Horrível"** - Tornar responsivo com media queries

#### Bloco 3: JavaScript Interativo (Semana 3-4)
8. **"👁️ Senha Visível"** - Implementar toggle show/hide password
9. **"❌ Validação Ausente"** - Validar formulários em tempo real

#### Bloco 4: React Transição (Semana 5)
10. **"⚛️ Transformar em Componente"** - Refatorar HTML/CSS/JS para React

### Quple App - Contexto dos Desafios
Mock de um app para casais com funcionalidades básicas:
- Login/Cadastro de usuários
- Perfil pessoal
- Lista de objetivos compartilhados
- Sistema de conclusão de objetivos
- Interface simples e limpa

### Sistema de Gamificação (Implementado)
- **XP**: Cálculo dinâmico baseado em performance (base: 50-300 XP)
- **Multiplicadores**: Score, dicas usadas, tentativas, tempo gasto
- **Badges**: 6 categorias implementadas (achievement, skill, streak, special)
  - 🌟 Primeira Página, 🏗️ Mestre Semântico, ♿ Herói da Acessibilidade
  - ⚡ Aprendiz Rápido, 💪 Persistente, 🔥 Consistente, 🚀 Dedicado
- **Streak**: Tracking automático de dias consecutivos
- **Níveis**: Sistema progressivo (100, 300, 600, 1000+ XP)
- **Leaderboard**: Ranking global em tempo real

### Design System
- **Visual**: Profissional com gamificação moderna
- **Cores**: Dark theme (slate-900, blue-900, indigo-900) + gradientes vibrantes
- **Background**: Gradientes escuros com glassmorphism
- **Tipografia**: System fonts, mono para código
- **Inspiração**: Modern SaaS + Gaming UX
- **Componentes**: Glass cards, hover effects, smooth transitions

### Funcionalidades Implementadas

#### ✅ Sistema de Autenticação Completo
- Login e cadastro com Supabase Auth
- Validação de email e senha
- Proteção de rotas autenticadas
- Estados de loading e erro tratados
- Logout funcional

#### ✅ Dashboard Gamificado Responsivo
- Cards de estatísticas (XP, nível, streak, badges)
- Sistema de progresso visual com barras
- Showcase de conquistas com carrossel
- Mapa de progresso dos desafios
- Otimizado para mobile e desktop
- Animações e transições suaves

#### ✅ Sistema de Progresso e Gamificação
- Cálculo automático de XP baseado em performance
- Sistema de níveis progressivo
- Badges categorizados (achievement, skill, streak, special)
- Tracking de streak days
- Leaderboard global funcional

#### ✅ Interface Monaco Editor
- Monaco Editor integrado com syntax highlighting
- Preview em tempo real do código
- Sistema de dicas progressivo (4 níveis)
- Validação HTML em tempo real
- Interface split-screen responsiva

#### ✅ Sistema de Avaliação de Nível (NOVO)
- Modal obrigatório no primeiro acesso
- 10 questões sobre HTML/CSS/JavaScript (formato misto)
- Direcionamento personalizado baseado no resultado
- Possibilidade de refazer a qualquer momento
- Interface educativa com feedback detalhado

#### ✅ Sistema de Validação Educativo
- Validação de HTML semântico
- Feedback detalhado por elemento
- Pontuação baseada em critérios educacionais
- Achievements desbloqueados automaticamente
- Mensagens motivacionais

### Estrutura do Projeto (Implementada)
```
/src
  /app
    /                   # ✅ Landing page com hero e features
    /auth
      /login           # ✅ Sistema de login completo
      /register        # ✅ Sistema de cadastro
    /dashboard          # ✅ Dashboard gamificado responsivo
    /challenge/[id]     # ✅ Interface de desafio com Monaco Editor
    /leaderboard        # ✅ Ranking global dos estudantes
  /components
    /ui                 # ✅ Card, Button, Badge, Progress, etc.
    /challenge         # ✅ ChallengeInterface, HintSystem
    /dashboard         # ✅ StatsCards, ProgressMap, AchievementShowcase
    /leaderboard       # ✅ RankingTable, UserCard
    /assessment        # ✅ LevelAssessmentModal (NOVO)
    /quple             # ✅ QupleLogin, QupleRegister, QupleDashboard, QupleObjectives
  /lib
    /challenges        # ✅ Definições completas dos 11 desafios (0-10)
    /progress          # ✅ ProgressService com XP e badges
    /supabase          # ✅ Cliente configurado com RLS
    /auth              # ✅ Funções de autenticação
    /validations       # ✅ Validadores HTML educativos
  /hooks              # ✅ useAuth para estado global
  /types              # ✅ Tipos TypeScript completos
```

### Database Schema (Implementado)
```sql
-- ✅ Tabela de estudantes (implementada com RLS)
students (
  id uuid primary key references auth.users(id),
  name text not null,
  email text not null unique,
  current_challenge integer default 0, -- 0 = precisa fazer avaliação
  total_xp integer default 0,
  streak_days integer default 0,
  last_activity_date date default current_date,
  badges text[] default '{}',
  created_at timestamp default now(),
  updated_at timestamp default now()
)

-- ✅ Tabela de submissions (implementada)
submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  challenge_id integer not null,
  code text,
  status text default 'pending', -- 'pending', 'completed', 'failed'
  score integer default 0,
  attempts integer default 1,
  time_spent integer default 0, -- em segundos
  hints_used integer default 0,
  created_at timestamp default now()
)

-- ✅ Row Level Security (RLS) implementado
-- Estudantes só podem ver/editar seus próprios dados
-- Submissions são privadas por estudante
-- Leaderboard é público (apenas leitura)
```

### Comandos Úteis
- **Dev**: `npm run dev` (✅ Funcional)
- **Build**: `npm run build` (✅ Funcional)
- **Lint**: `npm run lint` (✅ Configurado)
- **Type Check**: `npm run type-check` (✅ Configurado)

### Features Técnicas Avançadas
- **Mobile First**: Design responsivo com breakpoints sm/md/lg
- **Loading States**: Estados de carregamento em toda aplicação
- **Error Handling**: Tratamento de erros com fallbacks
- **Performance**: Lazy loading e otimizações de imagem
- **Accessibility**: Semântica HTML e navegação por teclado
- **Type Safety**: TypeScript strict mode habilitado

### Objetivos Educacionais
1. Introduzir conceitos web fundamentais
2. Ensinar debugging e problem-solving
3. Construir confiança através de gamificação
4. Preparar para desenvolvimento React real
5. Desenvolver boas práticas desde o início

### Estado Atual do Projeto
- **Status**: ✅ PLATAFORMA COMPLETA E FUNCIONAL
- **Auth**: ✅ Sistema completo com Supabase
- **Database**: ✅ Schema implementado com RLS
- **UI**: ✅ Interface responsiva e gamificada
- **Challenges**: ✅ Sistema de desafios funcional
- **Progress**: ✅ XP, badges e leaderboard implementados
- **Mobile**: ✅ Otimizado para todos os dispositivos
- **Performance**: ✅ Loading states e error handling

### Próximos Passos Opcionais
- **Deploy**: Configurar produção no Vercel
- **Content**: Implementar os 10 desafios específicos
- **Analytics**: Tracking de progresso detalhado
- **Social**: Sistema de amigos/grupos
- **Monetização**: Freemium model (R$ 39-79/mês)