# CLAUDE.md - Context File

## Projeto: React Learning Playground

### Status: ✅ PLATAFORMA EDUCACIONAL COMPLETA E OTIMIZADA COM NOVA UX

### Visão Geral
Sistema de ensino gamificado completo para introduzir jovens ao desenvolvimento web através de desafios práticos super básicos, começando do ZERO absoluto. A plataforma inclui três camadas de aprendizado: desafios práticos, apoio contextual (modal pocket) e conteúdo teórico denso separado. O sistema é totalmente funcional, auto-suficiente, responsivo e pronto para uso educacional.

### Contexto do Estudante
- **Idade**: 15 anos
- **Nível**: **ZERO ABSOLUTO** - nunca programou na vida
- **Dedicação**: 2-3 horas por dia, segunda a sexta
- **Ambiente**: Windows 11 + VS Code
- **Acompanhamento**: Mentor presente mas sistema deve ser auto-suficiente
- **Tempo estimado**: 6-8 horas totais para completar todos os desafios
- **Cronograma**: 2-3 semanas de aprendizado progressivo

### Stack Técnica
- **Frontend**: Next.js 15.5.4 + TypeScript + Tailwind CSS
- **Backend**: Supabase (auth, database)
- **Editor**: Monaco Editor (web) + VS Code (local)
- **Styling**: Tailwind CSS + componentes customizados
- **Deployment**: Vercel
- **Components**: class-variance-authority, clsx, lucide-react

### 🎓 Arquitetura de Aprendizado Tripla

#### **Camada 1: Desafios Práticos** (Fluxo Principal)
- ✅ **Sempre desbloqueados** - sem barreiras artificiais
- ✅ **Aprendizado por descoberta** - tentativa, erro, curiosidade
- ✅ **Progressão natural** - cada desafio constrói sobre o anterior
- ✅ **Just-in-time learning** - suporte contextual quando necessário

#### **Camada 2: Modal Pocket** (Apoio Contextual)
- ✅ **Explicações rápidas** - 200-300 palavras máximo
- ✅ **Acesso durante desafios** - botão "📖 Explicação Rápida"
- ✅ **Exemplos visuais básicos** - sem quebrar o fluxo
- ✅ **Link para aprofundamento** - conecta com Camada 3

#### **Camada 3: Página /learn** (Conteúdo Denso)
- ✅ **Teoria aprofundada** - explicações completas com 500+ palavras
- ✅ **Diagramas detalhados** - visualizações complexas
- ✅ **Exercícios extras** - para quem quer ir além
- ✅ **Acesso independente** - navegação separada dos desafios

### 📋 Estrutura de Desafios (11 Desafios Reformulados)

#### Desafio 0: Avaliação de Nível (Obrigatório)
0. **"🔍 Avaliação de Nível"** - Questionário inicial para personalizar a jornada
   - 10 questões sobre HTML/CSS/JavaScript (formato misto)
   - Direcionamento automático baseado no resultado
   - Modal obrigatório no primeiro acesso

#### Bloco 1: HTML Super Básico (Semana 1) ⭐ **REFORMULADO**
1. **"👋 Sua Primeira Tag HTML"** - Escrever apenas `<h1>Quple</h1>` (15 min, 25 XP)
2. **"📝 Adicionando uma Descrição"** - h1 + p (duas tags) (20 min, 30 XP)
3. **"🔤 Títulos de Diferentes Tamanhos"** - h1, p, h2, p (hierarquia) (25 min, 35 XP)
4. **"📋 Sua Primeira Lista"** - ul com 3 li (tags aninhadas) (30 min, 40 XP)

#### Bloco 2: CSS Introdução (Semana 2) ⭐ **REFORMULADO**
5. **"🎨 Sua Primeira Cor!"** - `h1 { color: blue; }` (primeiro CSS) (35 min, 50 XP)
6. **"💥 Layout Quebrado"** - Espaçamento básico com margin/padding
7. **"📱 Mobile Horrível"** - Media query simples

#### Bloco 3: JavaScript Básico (Semana 3)
8. **"👁️ Senha Visível"** - Primeiro JavaScript (manipulação DOM)
9. **"❌ Validação Ausente"** - Interação simples

#### Bloco 4: Avaliação Integradora + React (Semana 3)
**🎓 AVALIAÇÃO HTML+CSS** - Página completa com cabeçalho, parágrafo, formulário, tabela + CSS
10. **"⚛️ Transformar em Componente"** - Introdução ao conceito React

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

### 🚀 Funcionalidades Implementadas

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

#### ✅ Sistema de Avaliação de Nível
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

#### ✅ Desafios Reformulados para Iniciantes Absolutos ⭐ **NOVO**
- **Desafios 1-5 reescritos** do zero para quem nunca programou
- **Progressão ultra-gradual**: uma tag → duas tags → hierarquia → listas → CSS
- **Linguagem super amigável** com emojis e analogias
- **Dicas progressivas educativas** (4 níveis por desafio)
- **Conquistas motivacionais** específicas para cada marco
- **Tempo estimado reduzido** para manter engajamento

#### 🔄 Modal Pocket (Planejado)
- **Explicações contextuais rápidas** durante os desafios
- **Acesso via botão** sem sair do fluxo principal
- **Conteúdo conciso** (200-300 palavras)
- **Link para aprofundamento** na página /learn

#### ✅ Página /learn (Implementada)
- **Conteúdo teórico denso** com explicações completas
- **Navegação por categorias** (HTML, CSS, JavaScript, React)
- **Sistema de filtros** integrado
- **Navegação independente** com sidebar unificada
- **Estrutura**: /learn/[topic] com tópicos organizados

#### 🔄 Avaliação Integradora HTML+CSS (Planejada)
- **Projeto completo** combinando todos os conceitos aprendidos
- **Elementos obrigatórios**: cabeçalho, parágrafo, formulário, tabela + CSS
- **Posicionada entre CSS e JavaScript** como ponte natural
- **Sistema de pontuação** baseado em critérios pedagógicos

### 🏗️ Estrutura do Projeto (Nova Arquitetura UX)
```
/src
  /app
    /                   # ✅ Landing page com hero e CTA de login/cadastro
    /auth
      /login           # ✅ Sistema de login completo
      /register        # ✅ Sistema de cadastro
    /dashboard          # ✅ Dashboard REDESENHADO focado (Continue Aprendendo)
    /challenge/[id]     # ✅ Interface de desafio com Monaco Editor
    /challenges         # ✅ Página dedicada de mapa de desafios
    /leaderboard        # ✅ Ranking global com nova sidebar
    /learn              # ✅ Página de conteúdo teórico com filtros
      /[topic]          # ✅ Tópicos específicos (html, css, js)
    /social             # ✅ Dashboard social dedicado
    /settings           # ✅ Configurações organizadas em abas
  /components
    /ui                 # ✅ Card, Button, Badge, Progress, etc.
    /navigation         # ✅ NEW: Sidebar e DashboardLayout
      /Sidebar.tsx      # ✅ Navegação lateral responsiva
      /DashboardLayout  # ✅ Layout base com sidebar
    /challenge         # ✅ ChallengeInterface, HintSystem
      /PocketModal      # 🔄 Modal de explicação rápida (PLANEJADO)
    /dashboard         # ✅ REFORMULADO: Componentes focados
      /ContinueLearning # ✅ NEW: Seção principal do dashboard
      /SocialActivity   # ✅ NEW: Atividade social compacta
      /RecentAchievements # ✅ NEW: Conquistas e progresso
    /leaderboard       # ✅ RankingTable, UserCard
    /assessment        # ✅ LevelAssessmentModal
    /social            # ✅ SocialDashboard completo
    /settings          # ✅ PersonalizationSettings organizadas
    /quple             # ✅ QupleLogin, QupleRegister, QupleDashboard
  /lib
    /challenges        # ✅ Definições completas - DESAFIOS 1-5 REFORMULADOS ⭐
    /learning          # 🔄 Conteúdo teórico estruturado (PLANEJADO)
      /concepts.ts     # 🔄 Conceitos fundamentais
      /tutorials.ts    # 🔄 Tutoriais passo-a-passo
      /exercises.ts    # 🔄 Exercícios extras
    /progress          # ✅ ProgressService com XP e badges
    /supabase          # ✅ Cliente configurado com RLS
    /auth              # ✅ Funções de autenticação
    /validations       # ✅ Validadores HTML educativos
    /social            # ✅ Sistema social completo
    /analytics         # ✅ Tracking de atividades
    /themes            # ✅ Sistema de temas
  /hooks              # ✅ useAuth, useAnalytics, useTheme
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

### 📊 Estado Atual do Projeto

#### ✅ **CONCLUÍDO (Pronto para Usar)**
- **Auth**: Sistema completo com Supabase
- **Database**: Schema implementado com RLS
- **NEW UX**: Dashboard redesenhado com sidebar e navegação focada
- **Navigation**: Sidebar responsiva com menu mobile colapsível
- **Dashboard**: "Continue Aprendendo" como foco principal + seções laterais
- **Pages**: Todas as páginas padronizadas (Desafios, Social, Settings, Learn)
- **Core Challenges**: Desafios 1-5 reformulados para iniciantes absolutos
- **Progress**: XP, badges e leaderboard implementados
- **Mobile**: Otimizado para todos os dispositivos com nova UX
- **Performance**: Loading states, error handling e TypeScript strict
- **Assessment**: Sistema de avaliação de nível funcional
- **Validation**: Feedback educativo em tempo real
- **Landing Page**: Botões de login/cadastro adicionados

#### 🔄 **PRÓXIMOS PASSOS (Ordem de Prioridade)**

1. **Modal Pocket** (1-2 dias de desenvolvimento)
   - Implementar modal de explicação rápida nos desafios
   - Integrar com sistema de hints existente
   - Conteúdo contextual para desafios 1-5

2. **Conteúdo Teórico /learn/[topic]** (2-3 dias de desenvolvimento)
   - Implementar páginas específicas de cada tópico
   - Criar conteúdo teórico denso e estruturado
   - Diagramas e visualizações interativas

3. **Avaliação Integradora HTML+CSS** (2-3 dias de desenvolvimento)
   - Criar desafio especial entre CSS e JavaScript
   - Sistema de pontuação baseado em múltiplos critérios
   - Interface similar aos desafios atuais

4. **Completar Desafios 6-10** (1-2 dias de ajustes)
   - Revisar desafios existentes para consistência
   - Ajustar linguagem para iniciantes
   - Testar fluxo completo

### 🎯 **Cronograma de Implementação** (Estimativa: 1 semana)
- **Próximos dias**: Modal Pocket + Conteúdo /learn/[topic]
- **Semana seguinte**: Avaliação Integradora + Ajustes finais
- **Resultado**: Plataforma educacional 100% completa

### ✨ **Nova Arquitetura UX Implementada** (Dezembro 2024)
- **Dashboard Focado**: Seção principal "Continue Aprendendo" + sidebar social/conquistas
- **Navegação Unificada**: Sidebar responsiva em todas as páginas autenticadas
- **Experiência Consistente**: Layout padronizado com DashboardLayout
- **Mobile Otimizado**: Menu colapsível e interface adaptativa
- **Separação de Contextos**: Cada funcionalidade tem sua página dedicada

### 💡 **Considerações Futuras**
- **Deploy**: Configurar produção no Vercel (já documentado)
- **Analytics**: Tracking de progresso detalhado
- **Social**: Sistema de amigos/grupos
- **Monetização**: Freemium model (R$ 39-79/mês)
- **Certificação**: Sistema de certificados de conclusão