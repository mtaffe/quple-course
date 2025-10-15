/**
 * React Components - Complete Topic
 *
 * Function Components and Props
 * Target audience: Students who completed React Introduction
 */

import { Topic } from '../../types'

export const reactComponents: Topic = {
  id: 'react-components',
  title: 'Componentes React',
  description: 'Domine Function Components e Props para construir UIs reutilizáveis',
  category: 'react',
  difficulty: 'beginner',
  totalTime: 120, // 2 hours
  icon: '🧩',
  lessons: [
    // =========================================================================
    // LESSON 1: FUNCTION COMPONENTS
    // =========================================================================
    {
      id: 'lesson-1',
      title: 'Function Components',
      description: 'Aprenda a criar e organizar componentes funcionais em React',
      estimatedTime: 60,
      sections: [
        // ---------------------------------------------------------------------
        // SECTION 1.1: Anatomia de um Function Component
        // ---------------------------------------------------------------------
        {
          id: 'component-anatomy',
          title: 'Anatomia de um Function Component',
          type: 'theory',
          content: `
# Anatomia de um Function Component

Um Function Component é uma função JavaScript que retorna JSX. Vamos explorar cada parte em detalhes.

## Estrutura Básica

\`\`\`jsx
// 1. Imports
import { useState } from 'react'
import './GoalCard.css'

// 2. Definição do componente (PascalCase!)
function GoalCard(props) {
  // 3. Lógica JavaScript
  const { title, progress } = props
  const isComplete = progress >= 100

  // 4. Event handlers
  const handleClick = () => {
    console.log('Goal clicked:', title)
  }

  // 5. Return JSX (apenas um elemento raiz)
  return (
    <div className="goal-card" onClick={handleClick}>
      <h3>{title}</h3>
      <p>Progresso: {progress}%</p>
      {isComplete && <span>✅ Completo!</span>}
    </div>
  )
}

// 6. Export
export default GoalCard
\`\`\`

## Formas de Declarar Componentes

### Function Declaration (Tradicional)

\`\`\`jsx
function GoalCard() {
  return <div>Goal Card</div>
}

export default GoalCard
\`\`\`

**Prós:**
- ✅ Hoisting (pode usar antes de declarar)
- ✅ Familiar para iniciantes

### Arrow Function (Moderna)

\`\`\`jsx
const GoalCard = () => {
  return <div>Goal Card</div>
}

export default GoalCard
\`\`\`

**Prós:**
- ✅ Mais concisa
- ✅ Padrão em codebases modernas

### Arrow Function com Return Implícito

\`\`\`jsx
// Para componentes simples
const GoalCard = () => (
  <div>Goal Card</div>
)

// Sem parênteses (uma linha)
const SimpleButton = () => <button>Click</button>
\`\`\`

**Use quando:** Componente é muito simples (sem lógica)

## Regras dos Componentes

### 1. Nome em PascalCase (OBRIGATÓRIO)

\`\`\`jsx
// ✅ CORRETO
function GoalCard() {}
function UserProfile() {}
function NavigationMenu() {}

// ❌ ERRADO - React não reconhece
function goalCard() {}  // camelCase
function goal_card() {} // snake_case
\`\`\`

**Por quê?** React diferencia tags HTML (\`<div>\`) de componentes (\`<GoalCard>\`) pelo case.

### 2. Retorna JSX ou null

\`\`\`jsx
// ✅ CORRETO
function GoalCard() {
  return <div>Content</div>
}

// ✅ CORRETO - Retorna null (não renderiza nada)
function Hidden() {
  return null
}

// ❌ ERRADO - Não retorna nada
function Broken() {
  <div>Content</div>  // Falta return!
}
\`\`\`

### 3. Apenas um Elemento Raiz

\`\`\`jsx
// ❌ ERRADO - Múltiplos elementos raiz
function GoalCard() {
  return (
    <h3>Título</h3>
    <p>Descrição</p>
  )
}

// ✅ CORRETO - Wrapped em div
function GoalCard() {
  return (
    <div>
      <h3>Título</h3>
      <p>Descrição</p>
    </div>
  )
}

// ✅ CORRETO - Fragment (<>...</>)
function GoalCard() {
  return (
    <>
      <h3>Título</h3>
      <p>Descrição</p>
    </>
  )
}
\`\`\`

**Fragment:** Não cria elemento DOM extra!

## Organização de Arquivos

### Opção 1: Um Componente por Arquivo

\`\`\`
components/
├── GoalCard.jsx
├── GoalList.jsx
├── Header.jsx
└── ProgressBar.jsx
\`\`\`

**Vantagens:**
- ✅ Fácil de encontrar
- ✅ Melhor para code splitting
- ✅ Padrão da comunidade

### Opção 2: Componentes Relacionados Juntos

\`\`\`
components/
└── GoalCard/
    ├── GoalCard.jsx
    ├── GoalCard.css
    ├── GoalCardHeader.jsx
    └── GoalCardActions.jsx
\`\`\`

**Vantagens:**
- ✅ Componentes relacionados próximos
- ✅ Fácil refatorar/mover

## Exemplo Completo: GoalCard

\`\`\`jsx
// components/GoalCard.jsx
import { useState } from 'react'
import './GoalCard.css'

function GoalCard({ title, progress, onComplete }) {
  // State
  const [isExpanded, setIsExpanded] = useState(false)

  // Computed values
  const isComplete = progress >= 100
  const progressColor = progress >= 100 ? 'green' :
                        progress >= 50 ? 'yellow' : 'red'

  // Event handlers
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleComplete = () => {
    if (!isComplete) {
      onComplete()
    }
  }

  // Render
  return (
    <div
      className={\`goal-card \${isComplete ? 'complete' : ''}\`}
      onClick={toggleExpand}
    >
      <div className="goal-header">
        <h3>{title}</h3>
        {isComplete && <span className="badge">✅</span>}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: \`\${progress}%\`,
            backgroundColor: progressColor
          }}
        />
      </div>

      <p className="progress-text">{progress}% completo</p>

      {isExpanded && (
        <div className="goal-details">
          <p>Detalhes do objetivo...</p>
          <button onClick={handleComplete} disabled={isComplete}>
            {isComplete ? 'Concluído' : 'Marcar como completo'}
          </button>
        </div>
      )}
    </div>
  )
}

export default GoalCard
\`\`\`

## Export Default vs Named Export

### Default Export (um por arquivo)

\`\`\`jsx
// GoalCard.jsx
function GoalCard() {
  return <div>Goal Card</div>
}

export default GoalCard

// Importing
import GoalCard from './GoalCard'
import MyCard from './GoalCard'  // Pode renomear
\`\`\`

### Named Export (múltiplos por arquivo)

\`\`\`jsx
// components.jsx
export function GoalCard() {
  return <div>Goal Card</div>
}

export function GoalList() {
  return <div>Goal List</div>
}

// Importing
import { GoalCard, GoalList } from './components'
import { GoalCard as Card } from './components'  // Renomear
\`\`\`

**Convenção:** Use default export para componente principal.

## Resumo

- ✅ Function Component = Função que retorna JSX
- ✅ Nome em PascalCase obrigatório
- ✅ Retorna um elemento raiz (ou Fragment)
- ✅ Organiza imports, lógica, handlers, return
- ✅ Um componente por arquivo (recomendado)
- ✅ Default export para componente principal
- ✅ Arrow functions são o padrão moderno

Agora você sabe criar componentes profissionais! 💪
          `,
          codeExample: `// Exemplo completo: GoalCard componentizado

// components/ProgressBar.jsx
export function ProgressBar({ value }) {
  const getColor = (val) => {
    if (val >= 100) return '#22c55e'  // green
    if (val >= 50) return '#eab308'   // yellow
    return '#ef4444'                  // red
  }

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: \`\${Math.min(value, 100)}%\`,
          backgroundColor: getColor(value)
        }}
      />
    </div>
  )
}

// components/GoalCard.jsx
import { useState } from 'react'
import { ProgressBar } from './ProgressBar'

function GoalCard({ title, progress, onComplete, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isComplete = progress >= 100

  return (
    <div className={\`goal-card \${isComplete ? 'complete' : ''}\`}>
      <div className="goal-header">
        <h3>{title}</h3>
        {isComplete && <span className="badge">✅ Completo</span>}
      </div>

      <ProgressBar value={progress} />

      <div className="goal-footer">
        <p>{progress}% concluído</p>

        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Ver menos' : 'Ver mais'}
        </button>
      </div>

      {isExpanded && (
        <div className="goal-actions">
          <button onClick={onEdit}>✏️ Editar</button>
          <button onClick={onComplete} disabled={isComplete}>
            ✅ Marcar completo
          </button>
        </div>
      )}
    </div>
  )
}

export default GoalCard

// App.jsx - Usando
import GoalCard from './components/GoalCard'

function App() {
  const goals = [
    { id: 1, title: 'Viajar para Paris', progress: 60 },
    { id: 2, title: 'Comprar casa', progress: 30 }
  ]

  const handleComplete = (id) => {
    console.log('Completar:', id)
  }

  const handleEdit = (id) => {
    console.log('Editar:', id)
  }

  return (
    <div className="app">
      <h1>Meus Objetivos</h1>
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          title={goal.title}
          progress={goal.progress}
          onComplete={() => handleComplete(goal.id)}
          onEdit={() => handleEdit(goal.id)}
        />
      ))}
    </div>
  )
}`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.2: Props
        // ---------------------------------------------------------------------
        {
          id: 'props-basics',
          title: 'Props - Passando Dados',
          type: 'theory',
          content: `
# Props - Passando Dados para Componentes

Props (properties) são como **argumentos de função** para componentes. Permitem passar dados do pai para o filho.

## O que são Props?

\`\`\`jsx
// Passar props
<GoalCard title="Viajar para Paris" progress={60} />

// Receber props
function GoalCard(props) {
  console.log(props)
  // { title: "Viajar para Paris", progress: 60 }

  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.progress}%</p>
    </div>
  )
}
\`\`\`

Props é um **objeto JavaScript** com todas as propriedades passadas.

## Destructuring Props

Ao invés de \`props.title\`, destructure:

\`\`\`jsx
// Sem destructuring
function GoalCard(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.progress}%</p>
    </div>
  )
}

// Com destructuring (mais comum!)
function GoalCard({ title, progress }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{progress}%</p>
    </div>
  )
}
\`\`\`

**Vantagem:** Código mais limpo e claro.

## Tipos de Props

### 1. Strings

\`\`\`jsx
// Sem chaves
<GoalCard title="Viajar para Paris" />

// Com chaves (mesma coisa)
<GoalCard title={"Viajar para Paris"} />
\`\`\`

**Convenção:** Strings sem chaves.

### 2. Numbers

\`\`\`jsx
// Precisa de chaves
<GoalCard progress={60} />

// ❌ ERRADO - Vira string "60"
<GoalCard progress="60" />
\`\`\`

### 3. Booleans

\`\`\`jsx
// Com valor
<GoalCard isComplete={true} />
<GoalCard isComplete={false} />

// Shorthand (sem ={true})
<GoalCard isComplete />  // Mesmo que isComplete={true}
\`\`\`

### 4. Arrays

\`\`\`jsx
<GoalCard tags={['viagem', 'lazer', 'família']} />

function GoalCard({ tags }) {
  return (
    <div>
      {tags.map(tag => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  )
}
\`\`\`

### 5. Objects

\`\`\`jsx
<GoalCard
  goal={{
    id: 1,
    title: 'Paris',
    progress: 60,
    priority: 'high'
  }}
/>

function GoalCard({ goal }) {
  return (
    <div>
      <h3>{goal.title}</h3>
      <p>Prioridade: {goal.priority}</p>
    </div>
  )
}
\`\`\`

### 6. Functions

\`\`\`jsx
<GoalCard
  title="Paris"
  onComplete={() => console.log('Completo!')}
  onDelete={(id) => console.log('Deletar:', id)}
/>

function GoalCard({ title, onComplete, onDelete }) {
  return (
    <div>
      <h3>{title}</h3>
      <button onClick={onComplete}>Completar</button>
      <button onClick={() => onDelete(123)}>Deletar</button>
    </div>
  )
}
\`\`\`

### 7. JSX Elements

\`\`\`jsx
<GoalCard
  icon={<span>🎯</span>}
  badge={<span className="badge">Novo</span>}
/>

function GoalCard({ icon, badge }) {
  return (
    <div>
      {icon}
      <h3>Título</h3>
      {badge}
    </div>
  )
}
\`\`\`

## Props Padrão (Default Values)

Use destructuring com valores padrão:

\`\`\`jsx
function GoalCard({
  title = 'Sem título',
  progress = 0,
  priority = 'medium',
  isComplete = false
}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{progress}%</p>
    </div>
  )
}

// Usando
<GoalCard title="Paris" />
// progress = 0, priority = 'medium', isComplete = false
\`\`\`

## Spread Props

Passe múltiplas props de uma vez:

\`\`\`jsx
const goalData = {
  title: 'Viajar para Paris',
  progress: 60,
  priority: 'high'
}

// Sem spread (verboso)
<GoalCard
  title={goalData.title}
  progress={goalData.progress}
  priority={goalData.priority}
/>

// Com spread (conciso!)
<GoalCard {...goalData} />
\`\`\`

**Use quando:** Objeto tem exatamente as props necessárias.

## Props São Read-Only (Imutáveis)

\`\`\`jsx
function GoalCard({ progress }) {
  // ❌ NUNCA modifique props!
  progress = progress + 10  // ERRADO!

  // ✅ Use state se precisar mudar
  const [currentProgress, setCurrentProgress] = useState(progress)

  return <div>{currentProgress}%</div>
}
\`\`\`

**Regra de ouro:** Props fluem para baixo (read-only).

## Validação de Props (PropTypes)

Use PropTypes para validar props:

\`\`\`jsx
import PropTypes from 'prop-types'

function GoalCard({ title, progress, onComplete }) {
  return <div>{title}: {progress}%</div>
}

GoalCard.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  onComplete: PropTypes.func
}

GoalCard.defaultProps = {
  onComplete: () => {}
}
\`\`\`

**Melhor:** Use TypeScript para type safety!

## TypeScript com Props

\`\`\`tsx
// Define interface
interface GoalCardProps {
  title: string
  progress: number
  priority?: 'low' | 'medium' | 'high'  // Optional
  onComplete: () => void
}

// Use na função
function GoalCard({ title, progress, priority = 'medium', onComplete }: GoalCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{progress}%</p>
    </div>
  )
}
\`\`\`

## Conditional Props

Props podem ser condicionais:

\`\`\`jsx
const isComplete = progress >= 100

<GoalCard
  title="Paris"
  progress={progress}
  {/* Renderiza badge apenas se completo */}
  {...(isComplete && { badge: '✅ Completo' })}
/>

// Ou de forma mais clara
<GoalCard
  title="Paris"
  progress={progress}
  badge={isComplete ? '✅ Completo' : undefined}
/>
\`\`\`

## Resumo

- ✅ Props passam dados de pai para filho
- ✅ Destructure props no parâmetro
- ✅ Strings sem chaves, resto com chaves
- ✅ Props são read-only (imutáveis)
- ✅ Use valores padrão com destructuring
- ✅ Spread props com {...obj}
- ✅ Valide com PropTypes ou TypeScript
- ✅ Functions como props para eventos

Props são o coração da comunicação entre componentes! 📡
          `,
          codeExample: `// Exemplo completo: Props em ação

// GoalCard.jsx com TypeScript
interface GoalCardProps {
  id: number
  title: string
  progress: number
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
  isComplete?: boolean
  onComplete: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

function GoalCard({
  id,
  title,
  progress,
  priority = 'medium',
  tags = [],
  isComplete = false,
  onComplete,
  onEdit,
  onDelete
}: GoalCardProps) {
  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  }

  return (
    <div
      className="goal-card"
      style={{ borderLeft: \`4px solid \${priorityColors[priority]}\` }}
    >
      <div className="goal-header">
        <h3>{title}</h3>
        {isComplete && <span className="badge">✅</span>}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: \`\${progress}%\` }}
        />
      </div>

      <p>{progress}% completo</p>

      {tags.length > 0 && (
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="actions">
        <button onClick={() => onComplete(id)}>
          ✅ Completar
        </button>
        <button onClick={() => onEdit(id)}>
          ✏️ Editar
        </button>
        <button onClick={() => onDelete(id)}>
          🗑️ Deletar
        </button>
      </div>
    </div>
  )
}

// App.jsx - Usando com spread
function App() {
  const goals = [
    {
      id: 1,
      title: 'Viajar para Paris',
      progress: 60,
      priority: 'high' as const,
      tags: ['viagem', 'lazer']
    },
    {
      id: 2,
      title: 'Comprar casa',
      progress: 30,
      priority: 'medium' as const,
      tags: ['moradia', 'investimento']
    }
  ]

  const handleComplete = (id: number) => {
    console.log('Completar objetivo:', id)
  }

  const handleEdit = (id: number) => {
    console.log('Editar objetivo:', id)
  }

  const handleDelete = (id: number) => {
    console.log('Deletar objetivo:', id)
  }

  return (
    <div className="app">
      <h1>Meus Objetivos</h1>
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          {...goal}  // Spread todas as props
          onComplete={handleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}`
        },

        // Continue with remaining sections...
        {
          id: 'children-prop',
          title: 'Children Prop e Composição',
          type: 'theory',
          content: `
# Children Prop e Composição

O \`children\` prop é especial: permite passar JSX entre as tags de abertura/fechamento do componente.

## O que é Children?

\`\`\`jsx
// Passando children
<Card>
  <h2>Título</h2>
  <p>Conteúdo aqui</p>
</Card>

// Recebendo children
function Card({ children }) {
  return (
    <div className="card">
      {children}  {/* Tudo entre <Card>...</Card> */}
    </div>
  )
}
\`\`\`

## Por que Children?

Children permitem **composição**: componentes dentro de componentes de forma flexível.

\`\`\`jsx
// Sem children (inflexível)
<GoalCard title="Paris" description="Objetivo de viagem" />

// Com children (flexível!)
<GoalCard>
  <h3>Paris</h3>
  <p>Objetivo de viagem</p>
  <img src="/paris.jpg" />
  <button>Ver detalhes</button>
</GoalCard>
\`\`\`

## Tipos de Children

### String/Number

\`\`\`jsx
<Button>Clique aqui</Button>

function Button({ children }) {
  return <button>{children}</button>
}
\`\`\`

### JSX Elements

\`\`\`jsx
<Card>
  <h2>Título</h2>
  <p>Parágrafo</p>
</Card>

function Card({ children }) {
  return <div className="card">{children}</div>
}
\`\`\`

### Components

\`\`\`jsx
<Modal>
  <ModalHeader>
    <h2>Confirmar exclusão</h2>
  </ModalHeader>
  <ModalBody>
    <p>Tem certeza?</p>
  </ModalBody>
  <ModalFooter>
    <Button>Cancelar</Button>
    <Button>Confirmar</Button>
  </ModalFooter>
</Modal>
\`\`\`

## Padrão Container

\`\`\`jsx
// Container genérico
function Container({ children, maxWidth = '1200px' }) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding: '20px' }}>
      {children}
    </div>
  )
}

// Usando
<Container>
  <Header />
  <GoalsList />
  <Footer />
</Container>
\`\`\`

## Padrão Layout

\`\`\`jsx
function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Usando
<DashboardLayout>
  <GoalsList />
</DashboardLayout>
\`\`\`

## Múltiplos Children (Named Slots)

\`\`\`jsx
// Passar múltiplas áreas
<Modal
  header={<h2>Título</h2>}
  footer={<Button>Fechar</Button>}
>
  <p>Conteúdo principal</p>
</Modal>

function Modal({ header, children, footer }) {
  return (
    <div className="modal">
      <div className="modal-header">{header}</div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">{footer}</div>
    </div>
  )
}
\`\`\`

## Resumo

- ✅ Children é um prop especial
- ✅ Passa JSX entre tags
- ✅ Permite composição flexível
- ✅ Use para layouts e containers
- ✅ Named slots para múltiplas áreas

Children são essenciais para componentes reutilizáveis! 🧩
          `,
          codeExample: `// Exemplo: Sistema de Cards compostos

// Card.jsx - Container
function Card({ children, className = '' }) {
  return (
    <div className={\`card \${className}\`}>
      {children}
    </div>
  )
}

// CardHeader.jsx
function CardHeader({ children }) {
  return (
    <div className="card-header">
      {children}
    </div>
  )
}

// CardBody.jsx
function CardBody({ children }) {
  return (
    <div className="card-body">
      {children}
    </div>
  )
}

// CardFooter.jsx
function CardFooter({ children }) {
  return (
    <div className="card-footer">
      {children}
    </div>
  )
}

// App.jsx - Compondo livremente
function App() {
  return (
    <div>
      {/* Card simples */}
      <Card>
        <h3>Viajar para Paris</h3>
        <p>60% completo</p>
      </Card>

      {/* Card completo */}
      <Card className="goal-card">
        <CardHeader>
          <h3>Comprar casa</h3>
          <span className="badge">Alta prioridade</span>
        </CardHeader>

        <CardBody>
          <ProgressBar value={30} />
          <p>30% completo</p>
          <p>Faltam: R$ 700.000</p>
        </CardBody>

        <CardFooter>
          <button>Editar</button>
          <button>Completar</button>
        </CardFooter>
      </Card>

      {/* Card customizado */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Carro novo</h3>
            <button>✕</button>
          </div>
        </CardHeader>

        <CardBody>
          <img src="/car.jpg" alt="Carro" />
          <p>Objetivo quase completo!</p>
          <ProgressBar value={95} />
        </CardBody>

        <CardFooter>
          <p>Criado em: 15/01/2024</p>
          <button className="primary">Finalizar</button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Flexibilidade total com composição! 🎨`
        }
      ]
    }
  ]
}
