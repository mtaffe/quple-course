# React Learning Playground

Sistema gamificado para ensinar desenvolvimento web através de desafios práticos. Construa o app **Quple** enquanto aprende HTML, CSS, JavaScript e React!

## 🚀 Demo

O projeto está rodando em: http://localhost:3000

## 📋 Funcionalidades

### ✅ Implementado

- **Sistema de Desafios**: 5 desafios práticos (HTML básico → CSS styling)
- **Editor de Código**: Monaco Editor integrado com syntax highlighting
- **Preview em Tempo Real**: Visualização imediata do código
- **Sistema de Dicas**: Hints progressivos para ajudar no aprendizado
- **Validação Automática**: Feedback inteligente sobre o código
- **Gamificação**: XP, badges, levels e sistema de progresso
- **Interface Responsiva**: Design moderno com Tailwind CSS
- **Dashboard**: Mapa de progresso visual e estatísticas

### 🔄 Próximas Features

- Integração completa com Supabase
- Sistema de autenticação
- Desafios JavaScript avançados
- Modo dual (Web + Local)
- Sistema de mentoria

## 🛠️ Tecnologias

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Monaco Editor** - Code editor
- **Lucide React** - Icons
- **Supabase** - Backend (configurado)

## 🎯 Desafios Disponíveis

1. **"Página em Branco"** - HTML básico (50 XP)
2. **"Formulário Incompleto"** - Campos de formulário (60 XP)
3. **"Links Quebrados"** - Navegação (70 XP)
4. **"Conteúdo Bagunçado"** - HTML semântico (80 XP)
5. **"App Sem Cor"** - CSS styling (90 XP)

## 🏃‍♂️ Como Usar

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Linting
npm run lint

# Formatação
npm run format
```

### Navegação

- **Home**: `/` - Landing page
- **Dashboard**: `/dashboard` - Mapa de progresso
- **Desafios**: `/challenge/[id]` - Interface de código

## 📚 Estrutura Pedagógica

### Semana 1-2: HTML Fundamentos
- Desafios 1-4: Estrutura, formulários, links, semântica

### Semana 3: CSS Styling
- Desafio 5: Cores, tipografia, layout, responsividade

### Semana 4-5: JavaScript (em desenvolvimento)
- Interatividade, validação, DOM manipulation

## 🎮 Sistema de Gamificação

- **XP**: 50-100 XP por desafio
- **Badges**: "First Code", "HTML Master", "CSS Wizard", etc.
- **Levels**: Baseado em XP total (1000 XP por level)
- **Progresso Visual**: Mapa de desafios tipo jogo

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js 14 App Router
│   ├── dashboard/         # Dashboard principal
│   ├── challenge/[id]/    # Desafios individuais
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Componentes base reutilizáveis
│   ├── challenge/        # Componentes dos desafios
│   └── gamification/     # XP, badges, progress
├── lib/
│   ├── challenges/       # Definições dos desafios
│   ├── validation/       # Validadores de código
│   ├── supabase/        # Cliente e schema
│   └── utils/           # Utilitários gerais
└── types/               # Definições TypeScript
```

## 🎨 Design System

- **Cores**: Azul/roxo gradientes, tons sóbrios
- **Tipografia**: Sans-serif para texto, mono para código
- **Componentes**: Sistema consistente com Tailwind
- **Animações**: Sutis, focadas na UX

## 📊 Métricas de Aprendizado

- **Taxa de Conclusão**: ~85% esperada
- **Tempo por Desafio**: 30-90 minutos
- **Progressão**: Linear com pré-requisitos
- **Feedback**: Validação em tempo real

## 🔧 Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o schema em `src/lib/supabase/schema.sql`
3. Configure as variáveis em `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=sua-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
```

## 🎓 Para Mentores

- Dashboard de acompanhamento (em desenvolvimento)
- Métricas de tempo gasto por desafio
- Identificação de pontos de dificuldade
- Sistema de relatórios

## 📱 Compatibilidade

- ✅ Desktop (Windows, Mac, Linux)
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- 🔄 VS Code local integration (próxima versão)

## 🤝 Contribuição

Este é um projeto educacional. Para sugestões:
1. Abra uma issue descrevendo a melhoria
2. Para bugs, inclua passos para reproduzir
3. Mantenha o foco na experiência de aprendizado

## 📄 Licença

Projeto educacional - Uso livre para fins acadêmicos.

---

**Feito com ❤️ para a próxima geração de desenvolvedores** 🚀
