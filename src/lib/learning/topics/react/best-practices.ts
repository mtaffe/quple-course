/**
 * React Best Practices - Complete Topic
 *
 * React Best Practices: Code organization, Performance, Testing
 * Target audience: Students who completed all React topics
 */

import { Topic } from '../../types'

export const reactBestPractices: Topic = {
  id: 'react-best-practices',
  title: 'React Best Practices',
  description: 'Aprenda as melhores práticas para escrever código React profissional',
  category: 'react',
  difficulty: 'advanced',
  totalTime: 150, // 2.5 hours
  icon: '⭐',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Organização de Código',
      description: 'Estruture seu projeto React de forma profissional',
      estimatedTime: 60,
      sections: [
        {
          id: 'project-structure',
          title: 'Estrutura de Projeto',
          type: 'theory' as const,
          content: 'Organize código por features, não por tipo de arquivo. Use estrutura modular escalável. Separe componentes reutilizáveis de específicos. Mantenha componentes pequenos e focados. Um componente, uma responsabilidade. Co-localize arquivos relacionados. Use index.js para exports limpos. Nomeie arquivos claramente (PascalCase para componentes).',
          codeExample: `// Estrutura recomendada
src/
├── features/
│   ├── goals/
│   │   ├── components/
│   │   │   ├── GoalCard.tsx
│   │   │   ├── GoalList.tsx
│   │   │   └── GoalForm.tsx
│   │   ├── hooks/
│   │   │   ├── useGoals.ts
│   │   │   └── useGoalForm.ts
│   │   ├── services/
│   │   │   └── goalsApi.ts
│   │   ├── types/
│   │   │   └── goal.types.ts
│   │   └── index.ts
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── dashboard/
│       └── ...
├── components/        # Componentes compartilhados
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.styles.ts
│   │   └── index.ts
│   └── Modal/
├── hooks/            # Hooks compartilhados
│   ├── useAuth.ts
│   └── useLocalStorage.ts
├── utils/            # Funções utilitárias
│   ├── format.ts
│   └── validation.ts
├── types/            # Types globais
│   └── common.types.ts
├── constants/        # Constantes
│   └── config.ts
└── App.tsx

// features/goals/index.ts (barrel export)
export { GoalCard } from './components/GoalCard'
export { GoalList } from './components/GoalList'
export { useGoals } from './hooks/useGoals'
export * from './types/goal.types'

// Uso limpo
import { GoalCard, useGoals } from '@/features/goals'`
        },
        {
          id: 'component-patterns',
          title: 'Padrões de Componentes',
          type: 'example' as const,
          content: 'Separe lógica de apresentação: Container components (lógica) vs Presentational components (UI). Use composição sobre herança. Extraia lógica complexa em custom hooks. Props: seja explícito, use TypeScript. Evite prop drilling (use Context). Children prop para composição flexível. Compound components para APIs complexas.',
          codeExample: `// Container Component (lógica)
function GoalsContainer() {
  const { goals, loading, addGoal, deleteGoal } = useGoals()
  const [filter, setFilter] = useState('all')

  const filteredGoals = useMemo(() => {
    if (filter === 'all') return goals
    return goals.filter(g =>
      filter === 'completed' ? g.progress === 100 : g.progress < 100
    )
  }, [goals, filter])

  if (loading) return <LoadingSpinner />

  return (
    <GoalsList
      goals={filteredGoals}
      filter={filter}
      onFilterChange={setFilter}
      onAddGoal={addGoal}
      onDeleteGoal={deleteGoal}
    />
  )
}

// Presentational Component (UI pura)
interface GoalsListProps {
  goals: Goal[]
  filter: string
  onFilterChange: (filter: string) => void
  onAddGoal: (goal: Goal) => void
  onDeleteGoal: (id: number) => void
}

function GoalsList({
  goals,
  filter,
  onFilterChange,
  onAddGoal,
  onDeleteGoal
}: GoalsListProps) {
  return (
    <div className="goals-list">
      <FilterBar value={filter} onChange={onFilterChange} />
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={() => onDeleteGoal(goal.id)}
        />
      ))}
    </div>
  )
}

// Compound Components (API flexível)
function Card({ children }) {
  return <div className="card">{children}</div>
}

Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>
}

Card.Body = function CardBody({ children }) {
  return <div className="card-body">{children}</div>
}

Card.Footer = function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>
}

// Uso
function GoalCard({ goal }) {
  return (
    <Card>
      <Card.Header>
        <h3>{goal.title}</h3>
      </Card.Header>
      <Card.Body>
        <p>{goal.description}</p>
      </Card.Body>
      <Card.Footer>
        <button>Editar</button>
      </Card.Footer>
    </Card>
  )
}`
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Performance e Testing',
      description: 'Otimize performance e teste seu código',
      estimatedTime: 60,
      sections: [
        {
          id: 'performance-tips',
          title: 'Dicas de Performance',
          type: 'theory' as const,
          content: 'Evite otimizações prematuras (profile primeiro). Use React.memo para componentes puros. useMemo para cálculos caros. useCallback para callbacks em componentes otimizados. Code splitting com lazy() e Suspense. Virtualize listas longas (react-window). Debounce inputs. Otimize imagens. Evite inline functions e objects em props. Keys corretas em listas.',
          codeExample: `import { lazy, Suspense, memo, useMemo, useCallback } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

// Code splitting
const Dashboard = lazy(() => import('./Dashboard'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  )
}

// Otimizações
function GoalsList({ goals }) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  // Memoriza cálculo caro
  const filteredGoals = useMemo(() => {
    console.log('Filtrando goals...')
    return goals.filter(g =>
      g.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [goals, debouncedSearch])

  // Memoriza callback
  const handleDelete = useCallback((id) => {
    console.log('Delete:', id)
  }, [])

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
      />
      {filteredGoals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

// Componente memorizado
const GoalCard = memo(({ goal, onDelete }) => {
  console.log('Render GoalCard:', goal.id)
  return (
    <div>
      <h3>{goal.title}</h3>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  )
})

// Custom hook useDebounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}`
        },
        {
          id: 'testing-basics',
          title: 'Testing com Jest e React Testing Library',
          type: 'example' as const,
          content: 'Teste comportamento, não implementação. Use React Testing Library (não Enzyme). Teste interações do usuário. Queries por acessibilidade (getByRole, getByLabelText). userEvent para simular ações. Mock APIs com MSW. Teste estados de loading/error. Coverage não é tudo, qualidade importa mais.',
          codeExample: `// GoalCard.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GoalCard } from './GoalCard'

describe('GoalCard', () => {
  const mockGoal = {
    id: 1,
    title: 'Viajar para Paris',
    progress: 60
  }

  it('renderiza título e progresso', () => {
    render(<GoalCard goal={mockGoal} />)

    expect(screen.getByText('Viajar para Paris')).toBeInTheDocument()
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('chama onDelete ao clicar no botão', async () => {
    const handleDelete = jest.fn()
    render(<GoalCard goal={mockGoal} onDelete={handleDelete} />)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await userEvent.click(deleteButton)

    expect(handleDelete).toHaveBeenCalledWith(1)
  })

  it('mostra badge quando completo', () => {
    const completedGoal = { ...mockGoal, progress: 100 }
    render(<GoalCard goal={completedGoal} />)

    expect(screen.getByText('Completo')).toBeInTheDocument()
  })
})

// Hook test
import { renderHook, waitFor } from '@testing-library/react'
import { useGoals } from './useGoals'

describe('useGoals', () => {
  it('carrega goals da API', async () => {
    const { result } = renderHook(() => useGoals())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.goals).toHaveLength(3)
  })
})

// Integration test
describe('Goals Flow', () => {
  it('adiciona e deleta goal', async () => {
    render(<App />)

    // Adicionar
    const input = screen.getByPlaceholderText(/novo objetivo/i)
    await userEvent.type(input, 'Estudar React')

    const addButton = screen.getByRole('button', { name: /adicionar/i })
    await userEvent.click(addButton)

    expect(screen.getByText('Estudar React')).toBeInTheDocument()

    // Deletar
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await userEvent.click(deleteButton)

    expect(screen.queryByText('Estudar React')).not.toBeInTheDocument()
  })
})`
        },
        {
          id: 'production-checklist',
          title: 'Checklist de Produção',
          type: 'theory' as const,
          content: 'Antes de deploy: remova console.logs, verifique .env (não commite secrets), minifique assets, otimize imagens, configure error boundaries, adicione loading states, trate erros de API, teste em mobile, lighthouse > 90, adicione SEO meta tags, configure analytics, teste build de produção, configure CI/CD, monitore erros (Sentry), faça backup do banco.',
          codeExample: `// Error Boundary
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo)
    // Enviar para Sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Algo deu errado</h1>
          <button onClick={() => window.location.reload()}>
            Recarregar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Uso
function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  )
}

// Environment variables
const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY

// .env.local (não commitar!)
// REACT_APP_API_URL=https://api.quple.com
// REACT_APP_API_KEY=secret_key

// Loading/Error states
function Goals() {
  const { data, loading, error } = useGoals()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data?.length) return <EmptyState />

  return <GoalsList goals={data} />
}`
        }
      ]
    },
    {
      id: 'lesson-3',
      title: 'Recursos e Next Steps',
      description: 'Continue sua jornada React',
      estimatedTime: 30,
      sections: [
        {
          id: 'next-steps',
          title: 'Próximos Passos',
          type: 'theory' as const,
          content: 'Continue aprendendo: TypeScript com React (strongly recommended), Next.js (framework full-stack), State management (Redux Toolkit, Zustand), Styling (Tailwind, styled-components), Testing (Jest, Cypress), GraphQL (Apollo Client), React Native (mobile), Server Components (React 19). Pratique muito! Construa projetos reais. Contribua open source. Leia código de outros devs.',
          codeExample: `// TypeScript com React (recomendado!)
import { FC, useState } from 'react'

interface Goal {
  id: number
  title: string
  progress: number
}

interface GoalCardProps {
  goal: Goal
  onDelete: (id: number) => void
}

const GoalCard: FC<GoalCardProps> = ({ goal, onDelete }) => {
  return (
    <div>
      <h3>{goal.title}</h3>
      <p>{goal.progress}%</p>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  )
}

// Recursos de aprendizado
const resources = {
  docs: 'https://react.dev',
  typescript: 'https://react-typescript-cheatsheet.netlify.app',
  nextjs: 'https://nextjs.org/learn',
  testing: 'https://testing-library.com/react',
  patterns: 'https://patterns.dev',
  roadmap: 'https://roadmap.sh/react'
}

// Projetos para praticar
const projectIdeas = [
  'Todo App com filtros e persistência',
  'Blog com CMS headless',
  'E-commerce com carrinho',
  'Dashboard com gráficos',
  'Chat em tempo real',
  'Clone de app popular',
  'Contribuir para open source'
]

// Parabéns! Você completou React! 🎉
console.log('Agora você está pronto para construir apps incríveis!')
console.log('Continue praticando e nunca pare de aprender!')
console.log('O Quple está esperando por você! 💑')`
        }
      ]
    }
  ]
}
