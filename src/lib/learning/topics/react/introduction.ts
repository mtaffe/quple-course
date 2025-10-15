/**
 * React Introduction - Complete Topic
 *
 * Introduction to React: Fundamentals and JSX
 * Target audience: Students who completed JavaScript Advanced
 */

import { Topic } from '../../types'

export const reactIntroduction: Topic = {
  id: 'react-introduction',
  title: 'Introdução ao React',
  description: 'Aprenda os fundamentos do React e JSX para criar interfaces modernas',
  category: 'react',
  difficulty: 'beginner',
  totalTime: 120, // 2 hours
  icon: '⚛️',
  lessons: [
    // =========================================================================
    // LESSON 1: FUNDAMENTOS DO REACT
    // =========================================================================
    {
      id: 'lesson-1',
      title: 'Fundamentos do React',
      description: 'Entenda o que é React, por que usar e conceitos fundamentais',
      estimatedTime: 60,
      sections: [
        // ---------------------------------------------------------------------
        // SECTION 1.1: O que é React
        // ---------------------------------------------------------------------
        {
          id: 'what-is-react',
          title: 'O que é React?',
          type: 'theory',
          content: `
# O que é React?

React é uma **biblioteca JavaScript** criada pelo Facebook (Meta) para construir interfaces de usuário (UI) de forma declarativa e eficiente usando componentes reutilizáveis.

## Por que React foi criado?

Em 2011, o Facebook enfrentava um problema: o feed de notícias ficava lento e difícil de manter conforme crescia. Cada mudança na interface exigia manipular o DOM manualmente com jQuery, o que era:

- **Lento** - Manipular DOM é custoso
- **Complexo** - Difícil rastrear mudanças
- **Propenso a bugs** - Estado inconsistente

Jordan Walke, engenheiro do Facebook, criou o React para resolver isso.

## O que React faz de diferente?

### 1. Componentes Reutilizáveis

Ao invés de páginas HTML gigantes, você divide a UI em pedaços pequenos e reutilizáveis:

\`\`\`jsx
// Componente reutilizável
function GoalCard({ title, progress }) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <ProgressBar value={progress} />
    </div>
  )
}

// Usar múltiplas vezes
<GoalCard title="Paris" progress={60} />
<GoalCard title="Casa" progress={30} />
<GoalCard title="Carro" progress={90} />
\`\`\`

### 2. Virtual DOM

React não manipula o DOM real diretamente. Ele:

1. Cria uma cópia virtual do DOM (Virtual DOM)
2. Compara mudanças (diffing)
3. Atualiza apenas o que mudou (reconciliation)

\`\`\`
Mudança de Estado
      ↓
  Virtual DOM (rápido)
      ↓
  Compara com Virtual DOM anterior
      ↓
  Atualiza apenas o necessário no DOM real
\`\`\`

**Resultado:** Atualizações muito mais rápidas!

### 3. Declarativo vs Imperativo

**Imperativo (Vanilla JS):**
\`\`\`javascript
// Você diz COMO fazer cada passo
const button = document.getElementById('like-btn')
button.addEventListener('click', () => {
  const count = parseInt(button.textContent)
  button.textContent = count + 1
  if (count + 1 >= 10) {
    button.classList.add('popular')
  }
})
\`\`\`

**Declarativo (React):**
\`\`\`jsx
// Você diz O QUE quer (React cuida do COMO)
function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className={likes >= 10 ? 'popular' : ''}
    >
      {likes}
    </button>
  )
}
\`\`\`

React cuida de atualizar o DOM automaticamente quando o estado muda!

## React não é um Framework

- **Biblioteca:** Foca em UI (views)
- **Framework (ex: Angular):** Solução completa (routing, forms, HTTP, etc)

React é apenas para UI. Para outras funcionalidades, você adiciona bibliotecas:
- **Routing:** React Router
- **State Management:** Redux, Zustand
- **Forms:** React Hook Form
- **HTTP:** Fetch API, Axios

## Ecossistema React

React tem um ecossistema enorme:

\`\`\`
React (biblioteca core)
  ├── React DOM (renderização web)
  ├── React Native (mobile nativo)
  ├── Next.js (framework full-stack)
  ├── Gatsby (gerador de sites estáticos)
  └── React Router (navegação)
\`\`\`

## Quem usa React?

Empresas gigantes confiam no React:

- **Facebook/Instagram** - Criadores do React
- **Netflix** - Interface de streaming
- **Airbnb** - Plataforma de hospedagem
- **Uber** - App de transporte
- **WhatsApp Web** - Mensageiro
- **Discord** - Comunicação
- **Quple** - Nosso app de casais! 💑

## React vs Outras Bibliotecas

| Característica | React | Vue | Angular |
|---------------|-------|-----|---------|
| Tipo | Biblioteca | Framework progressivo | Framework completo |
| Curva aprendizado | Média | Fácil | Difícil |
| Performance | Excelente | Excelente | Boa |
| Comunidade | Enorme | Grande | Grande |
| Empregabilidade | Altíssima | Alta | Alta |

## Versões do React

- **React 16.8 (2019):** Introduziu Hooks
- **React 17 (2020):** Melhorias internas
- **React 18 (2022):** Concurrent rendering
- **React 19 (2024):** Compiler e Server Components

**Você vai aprender:** React 18+ com Hooks (padrão moderno)

## Pré-requisitos para React

Antes de aprender React, você precisa saber:

✅ **HTML** - Estrutura de páginas
✅ **CSS** - Estilização
✅ **JavaScript ES6+** - Arrow functions, destructuring, promises, etc.
✅ **Git/GitHub** - Versionamento (opcional mas recomendado)

**Parabéns!** Você já aprendeu tudo isso nas lições anteriores! 🎉

## O que vamos construir?

Ao longo deste curso, vamos transformar o **Quple** (app de casais) em uma aplicação React moderna com:

- 📝 Lista de objetivos do casal
- ✅ Marcar objetivos como concluídos
- 📊 Dashboard com progresso
- 🔐 Login e autenticação
- 📱 Interface responsiva

## Resumo

- ✅ React é uma biblioteca para construir UIs
- ✅ Usa componentes reutilizáveis
- ✅ Virtual DOM torna atualizações rápidas
- ✅ Declarativo ao invés de imperativo
- ✅ Ecossistema rico e comunidade enorme
- ✅ Usado por empresas gigantes
- ✅ Você já tem os pré-requisitos!

Vamos começar a codificar React! 🚀
          `,
          codeExample: `// Exemplo: Comparação Vanilla JS vs React

// ❌ VANILLA JS (Imperativo)
const goals = [
  { id: 1, title: 'Paris', progress: 60 },
  { id: 2, title: 'Casa', progress: 30 }
]

const container = document.getElementById('goals')

function renderGoals() {
  container.innerHTML = '' // Limpa tudo

  goals.forEach(goal => {
    const div = document.createElement('div')
    div.className = 'goal-card'

    const h3 = document.createElement('h3')
    h3.textContent = goal.title

    const progress = document.createElement('div')
    progress.className = 'progress'
    progress.textContent = goal.progress + '%'

    div.appendChild(h3)
    div.appendChild(progress)
    container.appendChild(div)
  })
}

renderGoals()

// ✅ REACT (Declarativo)
function Goals() {
  const goals = [
    { id: 1, title: 'Paris', progress: 60 },
    { id: 2, title: 'Casa', progress: 30 }
  ]

  return (
    <div id="goals">
      {goals.map(goal => (
        <div key={goal.id} className="goal-card">
          <h3>{goal.title}</h3>
          <div className="progress">{goal.progress}%</div>
        </div>
      ))}
    </div>
  )
}

// React cuida de todo o DOM manipulation automaticamente!`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.2: Configurando o Ambiente
        // ---------------------------------------------------------------------
        {
          id: 'setup',
          title: 'Configurando o Ambiente React',
          type: 'theory',
          content: `
# Configurando o Ambiente React

Para desenvolver em React, você precisa configurar o ambiente. Vamos ver as formas mais comuns.

## Opção 1: Create React App (CRA) - Tradicional

**Create React App** foi a forma oficial de criar apps React por anos:

\`\`\`bash
# Criar novo projeto
npx create-react-app quple-app

# Entrar na pasta
cd quple-app

# Iniciar servidor de desenvolvimento
npm start
\`\`\`

**Prós:**
- ✅ Zero configuração
- ✅ Funciona out-of-the-box
- ✅ Bom para aprender

**Contras:**
- ❌ Pesado (muitas dependências)
- ❌ Build lento
- ❌ Não recebe mais atualizações (deprecated)

## Opção 2: Vite - Moderno e Rápido ⚡

**Vite** é a ferramenta moderna recomendada:

\`\`\`bash
# Criar projeto React com Vite
npm create vite@latest quple-app -- --template react

# Entrar e instalar dependências
cd quple-app
npm install

# Iniciar dev server (super rápido!)
npm run dev
\`\`\`

**Prós:**
- ✅ Extremamente rápido
- ✅ Leve
- ✅ Hot Module Replacement (HMR) instantâneo
- ✅ Moderno e mantido ativamente

**Contras:**
- Nenhum relevante! 🎉

## Opção 3: Next.js - Full-Stack Framework

**Next.js** é um framework React com superpoderes:

\`\`\`bash
# Criar app Next.js
npx create-next-app@latest quple-app

# Configuração interativa:
# ✅ TypeScript? Yes
# ✅ ESLint? Yes
# ✅ Tailwind CSS? Yes
# ✅ App Router? Yes

cd quple-app
npm run dev
\`\`\`

**Prós:**
- ✅ Server-Side Rendering (SSR)
- ✅ Routing built-in
- ✅ API routes
- ✅ Otimizações automáticas
- ✅ Production-ready

**Uso:** Apps completos (como o Quple!)

## Estrutura de um Projeto React

Usando Vite como exemplo:

\`\`\`
quple-app/
├── node_modules/        # Dependências (não commitar!)
├── public/              # Arquivos estáticos
│   └── vite.svg
├── src/                 # Código-fonte
│   ├── assets/          # Imagens, fontes, etc
│   ├── components/      # Componentes React
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos do App
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── .gitignore           # Arquivos ignorados pelo Git
├── index.html           # HTML root
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
└── README.md            # Documentação
\`\`\`

## Entendendo os Arquivos Principais

### index.html
\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quple - App de Casais</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
\`\`\`

### src/main.jsx (Entry Point)
\`\`\`jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Renderiza o app React no <div id="root">
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
\`\`\`

### src/App.jsx (Componente Principal)
\`\`\`jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Viajar para Paris', progress: 60 },
    { id: 2, title: 'Comprar casa', progress: 30 }
  ])

  return (
    <div className="App">
      <h1>Quple - Objetivos do Casal</h1>
      <div className="goals-list">
        {goals.map(goal => (
          <div key={goal.id} className="goal-card">
            <h3>{goal.title}</h3>
            <p>Progresso: {goal.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
\`\`\`

## Scripts Disponíveis

### package.json
\`\`\`json
{
  "scripts": {
    "dev": "vite",                    // Inicia dev server
    "build": "vite build",            // Build para produção
    "preview": "vite preview",        // Preview do build
    "lint": "eslint . --ext js,jsx"   // Linter
  }
}
\`\`\`

**Uso:**
- \`npm run dev\` - Desenvolvimento (porta 5173)
- \`npm run build\` - Build otimizado para produção
- \`npm run preview\` - Testar build localmente

## DevTools Essenciais

### 1. React Developer Tools

Extensão de browser indispensável:

- **Chrome:** [React DevTools](https://chrome.google.com/webstore)
- **Firefox:** [React DevTools](https://addons.mozilla.org/firefox)

**Recursos:**
- 🔍 Inspecionar component tree
- 📊 Ver props e state
- ⚡ Profile de performance
- 🐛 Debugar componentes

### 2. VS Code Extensions

Instale estas extensões:

- **ES7+ React/Redux/React-Native snippets** - Snippets úteis
- **ESLint** - Linter
- **Prettier** - Formatação
- **Auto Rename Tag** - Renomeia tags JSX
- **Error Lens** - Mostra erros inline

## Criando Seu Primeiro App

Passo a passo completo:

\`\`\`bash
# 1. Criar projeto
npm create vite@latest quple-app -- --template react

# 2. Entrar na pasta
cd quple-app

# 3. Instalar dependências
npm install

# 4. Iniciar dev server
npm run dev

# 5. Abrir no browser
# Vite mostrará a URL (geralmente http://localhost:5173)
\`\`\`

## Estrutura Recomendada para o Quple

\`\`\`
src/
├── components/          # Componentes reutilizáveis
│   ├── GoalCard.jsx
│   ├── GoalList.jsx
│   ├── Header.jsx
│   └── ProgressBar.jsx
├── pages/               # Páginas/Views
│   ├── Dashboard.jsx
│   ├── GoalsPage.jsx
│   └── LoginPage.jsx
├── hooks/               # Custom hooks
│   ├── useAuth.js
│   └── useGoals.js
├── services/            # API calls
│   └── api.js
├── utils/               # Funções auxiliares
│   └── helpers.js
├── App.jsx              # Root component
└── main.jsx             # Entry point
\`\`\`

## Dicas de Ouro

1. **Use Vite** - Mais rápido que CRA
2. **Instale React DevTools** - Essencial para debug
3. **Organize em pastas** - components/, pages/, hooks/
4. **Use .jsx extension** - Deixa claro que é React
5. **Commite package-lock.json** - Garante versões consistentes

## Resumo

- ✅ **Vite** é a ferramenta moderna recomendada
- ✅ **Next.js** para apps full-stack
- ✅ Estrutura: src/, components/, pages/
- ✅ main.jsx é o entry point
- ✅ App.jsx é o root component
- ✅ React DevTools é essencial
- ✅ npm run dev para iniciar

Ambiente configurado! Hora de aprender JSX! 🎨
          `,
          codeExample: `// Criar um app React completo do zero

// 1. Terminal: Criar projeto
// npm create vite@latest quple-app -- --template react

// 2. src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// 3. src/App.jsx
import { useState } from 'react'

function App() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Viajar para Paris', progress: 60 },
    { id: 2, title: 'Comprar casa', progress: 30 }
  ])

  return (
    <div className="container">
      <h1>🎯 Quple - Objetivos do Casal</h1>

      <div className="goals-grid">
        {goals.map(goal => (
          <div key={goal.id} className="goal-card">
            <h3>{goal.title}</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: \`\${goal.progress}%\` }}
              />
            </div>
            <p>{goal.progress}% completo</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

// 4. Terminal: Iniciar
// npm run dev

// 5. Browser: http://localhost:5173
// Seu app React está rodando! 🚀`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.3: Pensando em React
        // ---------------------------------------------------------------------
        {
          id: 'thinking-in-react',
          title: 'Pensando em Componentes',
          type: 'theory',
          content: `
# Pensando em Componentes (Thinking in React)

React muda fundamentalmente como você pensa sobre UI. Ao invés de manipular DOM, você pensa em **componentes** e **fluxo de dados**.

## O que é um Componente?

Um componente é uma **função JavaScript** que retorna **JSX** (HTML-like syntax):

\`\`\`jsx
function GoalCard() {
  return (
    <div className="goal-card">
      <h3>Viajar para Paris</h3>
      <p>Progresso: 60%</p>
    </div>
  )
}
\`\`\`

**Componente = Função que retorna UI**

## Anatomia de um Componente

\`\`\`jsx
// 1. Import (se necessário)
import { useState } from 'react'

// 2. Definição da função (PascalCase!)
function GoalCard(props) {
  // 3. Lógica JavaScript
  const progress = props.progress
  const isComplete = progress >= 100

  // 4. Return JSX
  return (
    <div className="goal-card">
      <h3>{props.title}</h3>
      <p>Progresso: {progress}%</p>
      {isComplete && <span>✅ Completo!</span>}
    </div>
  )
}

// 5. Export
export default GoalCard
\`\`\`

## Regras dos Componentes

### 1. Nome em PascalCase

\`\`\`jsx
// ✅ CORRETO - PascalCase
function GoalCard() {}
function UserProfile() {}
function NavigationBar() {}

// ❌ ERRADO - camelCase ou kebab-case
function goalCard() {}        // React não reconhece
function user-profile() {}    // Sintaxe inválida
\`\`\`

### 2. Retorna Apenas um Elemento Raiz

\`\`\`jsx
// ❌ ERRADO - Múltiplos elementos raiz
function App() {
  return (
    <h1>Título</h1>
    <p>Parágrafo</p>
  )
}

// ✅ CORRETO - Wrapped em div
function App() {
  return (
    <div>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </div>
  )
}

// ✅ CORRETO - Fragment (<>...</>)
function App() {
  return (
    <>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </>
  )
}
\`\`\`

### 3. JSX Expressions em Chaves {}

\`\`\`jsx
function GoalCard({ title, progress }) {
  const percentage = progress + '%'

  return (
    <div>
      {/* JavaScript em chaves */}
      <h3>{title}</h3>
      <p>Progresso: {percentage}</p>
      <p>Status: {progress >= 100 ? 'Completo' : 'Em andamento'}</p>

      {/* Pode chamar funções */}
      <p>Faltam: {calculateRemaining(progress)}</p>
    </div>
  )
}
\`\`\`

## Composição de Componentes

Componentes podem usar outros componentes:

\`\`\`jsx
// Componente pequeno e focado
function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: \`\${value}%\` }}
      />
    </div>
  )
}

// Componente que usa ProgressBar
function GoalCard({ title, progress }) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <ProgressBar value={progress} />
      <p>{progress}% completo</p>
    </div>
  )
}

// App que usa GoalCard
function App() {
  return (
    <div>
      <GoalCard title="Paris" progress={60} />
      <GoalCard title="Casa" progress={30} />
    </div>
  )
}
\`\`\`

**Composição** é o coração do React! 🧩

## Quebrando UI em Componentes

Vamos quebrar o dashboard do Quple em componentes:

\`\`\`
Dashboard
├── Header
│   ├── Logo
│   └── UserMenu
├── GoalsList
│   ├── GoalCard (1)
│   ├── GoalCard (2)
│   └── GoalCard (3)
└── Footer
\`\`\`

### Passo a Passo

**1. Identifique pedaços visuais**
\`\`\`jsx
// Um pedaço grande
function Dashboard() {
  return (
    <div className="dashboard">
      <header>
        <h1>Quple</h1>
        <UserMenu />
      </header>

      <main>
        <GoalsList />
      </main>

      <footer>
        <p>© 2024 Quple</p>
      </footer>
    </div>
  )
}
\`\`\`

**2. Extraia componentes reutilizáveis**
\`\`\`jsx
// Header próprio
function Header() {
  return (
    <header className="header">
      <h1>🎯 Quple</h1>
      <UserMenu />
    </header>
  )
}

// Lista de objetivos
function GoalsList() {
  const goals = [
    { id: 1, title: 'Paris', progress: 60 },
    { id: 2, title: 'Casa', progress: 30 }
  ]

  return (
    <div className="goals-list">
      {goals.map(goal => (
        <GoalCard key={goal.id} {...goal} />
      ))}
    </div>
  )
}

// Card individual
function GoalCard({ title, progress }) {
  return (
    <div className="goal-card">
      <h3>{title}</h3>
      <ProgressBar value={progress} />
    </div>
  )
}
\`\`\`

**3. Componha tudo**
\`\`\`jsx
function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <main>
        <GoalsList />
      </main>
      <Footer />
    </div>
  )
}
\`\`\`

## Single Responsibility Principle

Cada componente deve ter **uma responsabilidade**:

\`\`\`jsx
// ❌ MAU - Faz muita coisa
function GoalCard({ goal }) {
  return (
    <div>
      <h3>{goal.title}</h3>
      <div className="progress-bar">...</div>
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDelete}>Deletar</button>
      <form onSubmit={handleUpdate}>...</form>
    </div>
  )
}

// ✅ BOM - Componentes focados
function GoalCard({ goal }) {
  return (
    <div>
      <GoalHeader title={goal.title} />
      <ProgressBar value={goal.progress} />
      <GoalActions
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
\`\`\`

## Quando Criar um Novo Componente?

Crie um componente quando:

✅ **Reutilizável** - Vai usar em múltiplos lugares
✅ **Complexo** - Muita lógica/markup
✅ **Independente** - Pode existir sozinho
✅ **Testável** - Quer testar isoladamente

Não precisa de componente se:
❌ Usado apenas uma vez e é simples
❌ Muito pequeno (ex: apenas um \`<span>\`)
❌ Aumenta complexidade sem benefício

## Fluxo de Dados: Props Down, Events Up

\`\`\`
         App
          |
   [State: goals]
          |
     (props down ↓)
          |
      GoalCard
          |
    (events up ↑)
          |
      [onClick]
          |
         App
\`\`\`

**Dados fluem para baixo (props), eventos sobem (callbacks)**

## Resumo

- ✅ Componente = Função que retorna JSX
- ✅ Nome em PascalCase obrigatório
- ✅ Retorna um único elemento raiz
- ✅ JavaScript em chaves {}
- ✅ Composição > Herança
- ✅ Quebre UI em componentes pequenos
- ✅ Uma responsabilidade por componente
- ✅ Props down, events up

Agora você pensa como um desenvolvedor React! 🧠
          `,
          codeExample: `// Exemplo completo: Quple Dashboard componentizado

// components/Header.jsx
function Header() {
  return (
    <header className="header">
      <h1>🎯 Quple</h1>
      <p>Objetivos do casal</p>
    </header>
  )
}

// components/ProgressBar.jsx
function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: \`\${value}%\`,
          backgroundColor: value >= 100 ? '#22c55e' : '#3b82f6'
        }}
      />
    </div>
  )
}

// components/GoalCard.jsx
function GoalCard({ title, progress }) {
  const isComplete = progress >= 100

  return (
    <div className={\`goal-card \${isComplete ? 'complete' : ''}\`}>
      <h3>{title}</h3>
      <ProgressBar value={progress} />
      <div className="goal-stats">
        <span>{progress}% completo</span>
        {isComplete && <span className="badge">✅ Concluído!</span>}
      </div>
    </div>
  )
}

// components/GoalsList.jsx
function GoalsList({ goals }) {
  return (
    <div className="goals-grid">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          title={goal.title}
          progress={goal.progress}
        />
      ))}
    </div>
  )
}

// App.jsx - Compondo tudo
function App() {
  const goals = [
    { id: 1, title: 'Viajar para Paris', progress: 60 },
    { id: 2, title: 'Comprar casa', progress: 30 },
    { id: 3, title: 'Carro novo', progress: 100 }
  ]

  return (
    <div className="app">
      <Header />
      <main>
        <GoalsList goals={goals} />
      </main>
    </div>
  )
}

export default App`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.4: Virtual DOM e Reconciliation
        // ---------------------------------------------------------------------
        {
          id: 'virtual-dom',
          title: 'Virtual DOM e Reconciliation',
          type: 'theory',
          content: `
# Virtual DOM e Reconciliation

Entender como React atualiza a UI de forma eficiente é fundamental para escrever apps performáticos.

## O Problema: DOM é Lento

Manipular o DOM real é **custoso**:

\`\`\`javascript
// Cada operação DOM é lenta
const element = document.getElementById('goal-1')
element.textContent = 'Novo título'           // Lento
element.style.color = 'blue'                  // Lento
element.classList.add('active')               // Lento
document.body.appendChild(document.createElement('div')) // Muito lento!
\`\`\`

**Por quê?**
- Recalcula layout (reflow)
- Repinta pixels (repaint)
- Atualiza estilos CSS
- Dispara eventos

## A Solução: Virtual DOM

React mantém uma **cópia virtual** do DOM em memória (JavaScript object):

\`\`\`javascript
// Virtual DOM é apenas um objeto JavaScript (rápido!)
const virtualDOM = {
  type: 'div',
  props: {
    className: 'goal-card',
    children: [
      {
        type: 'h3',
        props: { children: 'Viajar para Paris' }
      },
      {
        type: 'p',
        props: { children: 'Progresso: 60%' }
      }
    ]
  }
}
\`\`\`

## Como Funciona

### 1. Render Inicial

\`\`\`jsx
// 1. React cria Virtual DOM
function GoalCard({ title, progress }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{progress}%</p>
    </div>
  )
}

// 2. React converte para Virtual DOM
{
  type: 'div',
  props: {
    children: [
      { type: 'h3', props: { children: 'Paris' } },
      { type: 'p', props: { children: '60%' } }
    ]
  }
}

// 3. React cria DOM real
<div>
  <h3>Paris</h3>
  <p>60%</p>
</div>
\`\`\`

### 2. Atualização (Re-render)

\`\`\`
Estado muda (progress: 60 → 70)
        ↓
React cria NOVO Virtual DOM
        ↓
Compara com Virtual DOM anterior (Diffing)
        ↓
Identifica diferenças mínimas
        ↓
Atualiza APENAS o que mudou no DOM real
\`\`\`

## Diffing Algorithm

React compara Virtual DOMs de forma inteligente:

\`\`\`jsx
// Virtual DOM Anterior
<div>
  <h3>Paris</h3>
  <p>60%</p>  ← Vai mudar
</div>

// Novo Virtual DOM
<div>
  <h3>Paris</h3>
  <p>70%</p>  ← Mudou!
</div>

// React detecta: "Só o texto do <p> mudou"
// Atualiza APENAS isso no DOM:
document.querySelector('p').textContent = '70%'
\`\`\`

Sem Virtual DOM, React teria que recriar o \`<div>\` inteiro!

## Reconciliation (Reconciliação)

**Reconciliation** é o processo de decidir o que atualizar:

### Regra 1: Elementos de Tipos Diferentes

\`\`\`jsx
// Antes
<div>
  <GoalCard />
</div>

// Depois
<section>
  <GoalCard />
</section>

// React: "Tipo mudou (div → section), recria tudo!"
// Destrói <div> e seus filhos, cria <section> novo
\`\`\`

### Regra 2: Mesmo Tipo, Props Diferentes

\`\`\`jsx
// Antes
<GoalCard title="Paris" progress={60} />

// Depois
<GoalCard title="Paris" progress={70} />

// React: "Mesmo tipo (GoalCard), só atualiza prop progress"
\`\`\`

### Regra 3: Listas com Keys

\`\`\`jsx
// ❌ SEM KEY - React recria tudo
{goals.map(goal => (
  <GoalCard title={goal.title} progress={goal.progress} />
))}

// ✅ COM KEY - React reusa elementos
{goals.map(goal => (
  <GoalCard
    key={goal.id}  // Identifica elemento único
    title={goal.title}
    progress={goal.progress}
  />
))}
\`\`\`

## Por que Keys São Importantes

Sem key, React não sabe qual elemento é qual:

\`\`\`jsx
// Lista inicial
['Paris', 'Casa', 'Carro']

// Adicionamos 'Viagem' no início
['Viagem', 'Paris', 'Casa', 'Carro']

// ❌ SEM KEY
// React: "Todos mudaram de posição, recria tudo!"
// Destroi: Paris, Casa, Carro
// Cria: Viagem, Paris, Casa, Carro

// ✅ COM KEY
// React: "Ah, são os mesmos! Só adiciona 'Viagem' no início"
// Reutiliza: Paris, Casa, Carro
// Cria: Viagem
\`\`\`

## Keys Ruins vs Boas

\`\`\`jsx
// ❌ RUIM - Index como key
{goals.map((goal, index) => (
  <GoalCard key={index} {...goal} />
))}
// Problema: index muda quando adiciona/remove itens

// ❌ RUIM - Math.random()
{goals.map(goal => (
  <GoalCard key={Math.random()} {...goal} />
))}
// Problema: key diferente a cada render, recria tudo!

// ✅ BOM - ID estável e único
{goals.map(goal => (
  <GoalCard key={goal.id} {...goal} />
))}

// ✅ BOM - Combinação de campos únicos
{goals.map(goal => (
  <GoalCard key={\`\${goal.userId}-\${goal.title}\`} {...goal} />
))}
\`\`\`

## Batch Updates

React **agrupa** múltiplas atualizações em uma:

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    // React: "Vou processar tudo de uma vez!"
    // Resultado: count aumenta apenas 1 (não 3)
  }

  return <button onClick={handleClick}>{count}</button>
}
\`\`\`

React espera todas as atualizações terminarem, então faz **um único** re-render.

## React 18: Concurrent Rendering

React 18 introduziu **concurrent rendering**:

\`\`\`
Atualizações Urgentes (clicks, input)
       ↓
Processadas imediatamente
       ↓
Atualizações Não-Urgentes (fetch data)
       ↓
Podem ser interrompidas
       ↓
UI permanece responsiva
\`\`\`

Isso torna React ainda mais performático!

## Fiber Architecture

Internamente, React usa **Fiber**:

\`\`\`
Fiber Node {
  type: 'div',
  props: {},
  child: Fiber Node,    // Primeiro filho
  sibling: Fiber Node,  // Próximo irmão
  return: Fiber Node    // Pai
}
\`\`\`

Fiber permite React:
- ✅ Pausar trabalho
- ✅ Priorizar atualizações
- ✅ Reutilizar trabalho anterior
- ✅ Abortar se não necessário

## Performance Tips

### 1. Use Key Corretamente
\`\`\`jsx
// ✅ BOM
<GoalCard key={goal.id} />
\`\`\`

### 2. Evite Criar Objetos Inline
\`\`\`jsx
// ❌ RUIM - Cria novo objeto a cada render
<GoalCard style={{ color: 'blue' }} />

// ✅ BOM - Objeto constante
const cardStyle = { color: 'blue' }
<GoalCard style={cardStyle} />
\`\`\`

### 3. Memoize Componentes Pesados
\`\`\`jsx
import { memo } from 'react'

// Só re-renderiza se props mudarem
const GoalCard = memo(({ title, progress }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{progress}%</p>
    </div>
  )
})
\`\`\`

## Resumo

- ✅ Virtual DOM é uma cópia JavaScript do DOM
- ✅ Muito mais rápido que manipular DOM real
- ✅ Diffing compara Virtual DOMs
- ✅ Reconciliation decide o que atualizar
- ✅ Keys ajudam React identificar elementos
- ✅ Use IDs únicos como keys
- ✅ Nunca use index ou Math.random()
- ✅ React agrupa múltiplas atualizações (batching)
- ✅ Fiber permite concurrent rendering

Agora você entende a "magia" por trás do React! ⚡
          `,
          codeExample: `// Demonstração: Como React otimiza atualizações

import { useState } from 'react'

// Componente que mostra quantas vezes renderizou
function RenderCounter({ label }) {
  const renderCount = ++useRef(0).current
  return <span>({label}: {renderCount} renders)</span>
}

function GoalsDashboard() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Paris', progress: 60 },
    { id: 2, title: 'Casa', progress: 30 },
    { id: 3, title: 'Carro', progress: 90 }
  ])

  // Atualiza apenas o progresso do objetivo 1
  const updateGoal1 = () => {
    setGoals(goals.map(g =>
      g.id === 1 ? { ...g, progress: g.progress + 10 } : g
    ))
  }

  return (
    <div>
      <h1>Goals Dashboard <RenderCounter label="Dashboard" /></h1>

      <button onClick={updateGoal1}>
        Atualizar Goal 1
      </button>

      {/* ❌ SEM KEY - Todos re-renderizam */}
      <div className="bad-example">
        <h3>Sem Key (Ruim)</h3>
        {goals.map(goal => (
          <GoalCard {...goal}>
            <RenderCounter label={goal.title} />
          </GoalCard>
        ))}
      </div>

      {/* ✅ COM KEY - Apenas o que mudou re-renderiza */}
      <div className="good-example">
        <h3>Com Key (Bom)</h3>
        {goals.map(goal => (
          <GoalCard key={goal.id} {...goal}>
            <RenderCounter label={goal.title} />
          </GoalCard>
        ))}
      </div>
    </div>
  )
}

// Ao clicar no botão:
// Sem key: Paris, Casa e Carro re-renderizam (3 renders)
// Com key: Apenas Paris re-renderiza (1 render)
// Virtual DOM economizou 2 renders desnecessários! ⚡`
        }
      ]
    },

    // =========================================================================
    // LESSON 2: JSX
    // =========================================================================
    {
      id: 'lesson-2',
      title: 'JSX - JavaScript XML',
      description: 'Aprenda a sintaxe JSX para escrever UI de forma declarativa',
      estimatedTime: 60,
      sections: [
        // JSX sections will be added in the next part...
        {
          id: 'jsx-basics',
          title: 'Fundamentos do JSX',
          type: 'theory',
          content: `
# Fundamentos do JSX

JSX (JavaScript XML) é uma extensão de sintaxe que permite escrever HTML dentro de JavaScript.

## O que é JSX?

\`\`\`jsx
// Isso é JSX (parece HTML!)
const element = <h1>Hello, Quple!</h1>

// Mas é JavaScript!
const element = React.createElement('h1', null, 'Hello, Quple!')
\`\`\`

JSX é transformado em chamadas \`React.createElement()\` por ferramentas como Babel.

## Por que JSX?

**Vantagens:**
- ✅ Mais legível que \`createElement()\`
- ✅ Familiar (parece HTML)
- ✅ Type-safe (TypeScript)
- ✅ Prevenção de XSS automática

## JSX Básico

\`\`\`jsx
// Elemento simples
const title = <h1>Quple</h1>

// Com atributos
const link = <a href="/goals">Meus Objetivos</a>

// Self-closing
const image = <img src="/logo.png" alt="Logo" />

// Aninhado
const card = (
  <div className="card">
    <h2>Viajar para Paris</h2>
    <p>Progresso: 60%</p>
  </div>
)
\`\`\`

## JavaScript em JSX: Chaves {}

Use chaves para expressions JavaScript:

\`\`\`jsx
const name = 'João'
const progress = 60

const element = (
  <div>
    {/* Variáveis */}
    <p>Olá, {name}!</p>

    {/* Expressões */}
    <p>Progresso: {progress}%</p>
    <p>Faltam: {100 - progress}%</p>

    {/* Ternário */}
    <p>{progress >= 100 ? 'Completo!' : 'Em andamento'}</p>

    {/* Funções */}
    <p>{calculateRemaining(progress)}</p>

    {/* Template literals */}
    <p className={\`progress-\${progress}\`}>Status</p>
  </div>
)
\`\`\`

## Atributos JSX

Alguns atributos HTML têm nomes diferentes em JSX:

\`\`\`jsx
// HTML → JSX
class → className
for → htmlFor
tabindex → tabIndex

// Exemplo
<div className="container">
  <label htmlFor="name">Nome:</label>
  <input id="name" tabIndex={1} />
</div>
\`\`\`

**Por quê?** \`class\` e \`for\` são palavras reservadas em JavaScript.

## Styles Inline

Em JSX, styles são objetos JavaScript:

\`\`\`jsx
// HTML
<div style="color: blue; font-size: 16px;">

// JSX (objeto JavaScript!)
<div style={{
  color: 'blue',
  fontSize: '16px',  // camelCase!
  backgroundColor: '#f0f0f0'
}}>
\`\`\`

## Renderizando Listas

Use \`.map()\` para renderizar arrays:

\`\`\`jsx
const goals = ['Paris', 'Casa', 'Carro']

return (
  <ul>
    {goals.map((goal, index) => (
      <li key={index}>{goal}</li>
    ))}
  </ul>
)
\`\`\`

**IMPORTANTE:** Sempre use \`key\` em listas!

## Renderização Condicional

\`\`\`jsx
const isLoggedIn = true

// Ternário
{isLoggedIn ? <Dashboard /> : <Login />}

// && (short-circuit)
{isLoggedIn && <Dashboard />}

// If-else com variável
let content
if (isLoggedIn) {
  content = <Dashboard />
} else {
  content = <Login />
}
return content
\`\`\`

## JSX é Type-Safe

JSX previne XSS automaticamente:

\`\`\`jsx
const userInput = '<script>alert("XSS")</script>'

// Seguro! React escapa o HTML
<div>{userInput}</div>
// Renderiza: &lt;script&gt;alert("XSS")&lt;/script&gt;
\`\`\`

## Resumo

- ✅ JSX = JavaScript + HTML-like syntax
- ✅ Chaves {} para JavaScript
- ✅ className, htmlFor (não class, for)
- ✅ Styles são objetos JavaScript
- ✅ .map() para listas
- ✅ Sempre use key em listas
- ✅ Renderização condicional com &&, ?:
- ✅ XSS-safe por padrão

JSX torna React super produtivo! 🎨
          `,
          codeExample: `// JSX Completo: Goals Dashboard

function GoalsDashboard() {
  const user = { name: 'João', coupleId: 123 }
  const goals = [
    { id: 1, title: 'Paris', progress: 60, priority: 'high' },
    { id: 2, title: 'Casa', progress: 30, priority: 'medium' },
    { id: 3, title: 'Carro', progress: 100, priority: 'low' }
  ]

  const calculateColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    }
    return colors[priority]
  }

  return (
    <div className="dashboard">
      {/* JavaScript em chaves */}
      <h1>Olá, {user.name}! 👋</h1>
      <p>Você tem {goals.length} objetivos</p>

      {/* Renderização condicional */}
      {goals.length === 0 && (
        <p>Nenhum objetivo ainda. Crie o primeiro!</p>
      )}

      {/* Lista com map */}
      <div className="goals-grid">
        {goals.map(goal => (
          <div
            key={goal.id}
            className={\`goal-card \${goal.progress === 100 ? 'complete' : ''}\`}
            style={{
              borderLeft: \`4px solid \${calculateColor(goal.priority)}\`
            }}
          >
            <h3>{goal.title}</h3>
            <p>Progresso: {goal.progress}%</p>

            {/* Ternário */}
            <span className="status">
              {goal.progress === 100 ? '✅ Completo' : '⏳ Em andamento'}
            </span>

            {/* Condicional com && */}
            {goal.progress < 50 && (
              <p className="warning">⚠️ Precisando atenção!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}`
        }
      ]
    }
  ]
}
