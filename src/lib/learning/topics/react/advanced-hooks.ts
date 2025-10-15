/**
 * React Advanced Hooks - Complete Topic
 *
 * Advanced React Hooks: useContext, useReducer, useRef, Custom Hooks
 * Target audience: Students who completed React Hooks basics
 */

import { Topic } from '../../types'

export const reactAdvancedHooks: Topic = {
  id: 'react-advanced-hooks',
  title: 'React Hooks Avançados',
  description: 'Domine hooks avançados como useContext, useReducer, useRef e crie seus próprios hooks',
  category: 'react',
  difficulty: 'intermediate',
  totalTime: 180, // 3 hours
  icon: '🎣',
  lessons: [
    {
      id: 'lesson-1',
      title: 'useContext - Context API',
      description: 'Aprenda a compartilhar estado global sem prop drilling',
      estimatedTime: 60,
      sections: [
        {
          id: 'what-is-context',
          title: 'O que é Context API?',
          type: 'theory' as const,
          content: 'Context API permite compartilhar dados entre componentes sem passar props manualmente em cada nível (prop drilling). É ideal para dados globais como tema, usuário autenticado, idioma. Crie contexto com createContext, forneça valores com Provider, e consuma com useContext. Context não substitui state management complexo (use Redux/Zustand para isso). Use Context para dados que não mudam frequentemente.',
          codeExample: `import { createContext, useContext, useState } from 'react'

// 1. Criar contexto
const UserContext = createContext(null)

// 2. Provider Component
function App() {
  const [user, setUser] = useState({
    name: 'João',
    coupleId: 123
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  )
}

// 3. Consumir com useContext
function Dashboard() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Bem-vindo, {user.name}!</h1>
      <GoalsList />
    </div>
  )
}

function GoalsList() {
  const { user } = useContext(UserContext)

  return <div>Goals para o casal {user.coupleId}</div>
}`
        },
        {
          id: 'context-patterns',
          title: 'Padrões de Context',
          type: 'example' as const,
          content: 'Crie custom Provider components para encapsular lógica. Separe contextos por responsabilidade (UserContext, ThemeContext). Use múltiplos contextos quando necessário. Evite re-renders desnecessários dividindo contextos ou usando useMemo. Crie hooks personalizados para cada contexto (useUser, useTheme) para melhor DX.',
          codeExample: `import { createContext, useContext, useState } from 'react'

// Custom Provider com lógica encapsulada
const QupleContext = createContext(null)

export function QupleProvider({ children }) {
  const [user, setUser] = useState(null)
  const [goals, setGoals] = useState([])
  const [theme, setTheme] = useState('light')

  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, id: Date.now() }])
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const value = {
    user,
    setUser,
    goals,
    addGoal,
    theme,
    toggleTheme
  }

  return (
    <QupleContext.Provider value={value}>
      {children}
    </QupleContext.Provider>
  )
}

// Custom hook para usar o contexto
export function useQuple() {
  const context = useContext(QupleContext)
  if (!context) {
    throw new Error('useQuple must be used within QupleProvider')
  }
  return context
}

// Uso nos componentes
function GoalCard() {
  const { goals, addGoal, theme } = useQuple()

  return (
    <div className={'card ' + theme}>
      {goals.map(goal => (
        <div key={goal.id}>{goal.title}</div>
      ))}
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'useReducer e useRef',
      description: 'Gerencie estado complexo e referências DOM',
      estimatedTime: 60,
      sections: [
        {
          id: 'usereducer-basics',
          title: 'useReducer para Estado Complexo',
          type: 'theory' as const,
          content: 'useReducer é uma alternativa ao useState para lógica de estado complexa. Funciona como Redux: dispatch actions, reducer processa e retorna novo estado. Use quando: múltiplos sub-valores relacionados, próximo estado depende do anterior, lógica de atualização complexa. Reducer é função pura: (state, action) => newState. Actions são objetos com type e payload.',
          codeExample: `import { useReducer } from 'react'

// Reducer function
function goalsReducer(state, action) {
  switch (action.type) {
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...state.goals, action.payload]
      }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        goals: state.goals.map(g =>
          g.id === action.payload.id
            ? { ...g, progress: action.payload.progress }
            : g
        )
      }
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(g => g.id !== action.payload)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state
  }
}

function GoalsList() {
  const initialState = {
    goals: [],
    filter: 'all'
  }

  const [state, dispatch] = useReducer(goalsReducer, initialState)

  const addGoal = (title) => {
    dispatch({
      type: 'ADD_GOAL',
      payload: {
        id: Date.now(),
        title,
        progress: 0
      }
    })
  }

  return (
    <div>
      <button onClick={() => addGoal('Novo objetivo')}>
        Adicionar
      </button>
      {state.goals.map(goal => (
        <div key={goal.id}>{goal.title}</div>
      ))}
    </div>
  )
}`
        },
        {
          id: 'useref-basics',
          title: 'useRef para Referências',
          type: 'example' as const,
          content: 'useRef cria referência mutável que persiste entre renders. Use para: acessar DOM diretamente, armazenar valores mutáveis sem causar re-render, guardar valores anteriores, timers/intervals. ref.current é mutável e não causa re-render quando muda. Para refs de DOM, passe ref={myRef} ao elemento.',
          codeExample: `import { useRef, useEffect, useState } from 'react'

function GoalInput() {
  const inputRef = useRef(null)
  const renderCount = useRef(0)

  // Foca input quando componente monta
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // Conta renders sem causar re-render
  renderCount.current++

  return (
    <div>
      <p>Renders: {renderCount.current}</p>
      <input
        ref={inputRef}
        type="text"
        placeholder="Novo objetivo..."
      />
    </div>
  )
}

// Timer com useRef
function Timer() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)

  const start = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    return () => stop()
  }, [])

  return (
    <div>
      <h1>{count}s</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'lesson-3',
      title: 'Custom Hooks e Performance',
      description: 'Crie hooks reutilizáveis e otimize performance',
      estimatedTime: 60,
      sections: [
        {
          id: 'custom-hooks',
          title: 'Criando Custom Hooks',
          type: 'theory' as const,
          content: 'Custom hooks permitem extrair lógica reutilizável. São funções JavaScript que usam hooks internos. Nome deve começar com "use". Retorne o que for necessário (valores, funções). Use para: lógica de fetch, form handling, subscriptions, window resize, localStorage. Custom hooks tornam código mais limpo e testável.',
          codeExample: `import { useState, useEffect } from 'react'

// Custom hook para fetch
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        const response = await fetch(url, {
          signal: controller.signal
        })
        const json = await response.json()
        setData(json)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// Custom hook para localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Usando os custom hooks
function GoalsList() {
  const { data: goals, loading } = useFetch('/api/goals')
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {goals.map(goal => (
        <div key={goal.id}>{goal.title}</div>
      ))}
    </div>
  )
}`
        },
        {
          id: 'performance-hooks',
          title: 'useMemo e useCallback',
          type: 'example' as const,
          content: 'useMemo memoriza valores calculados, recalcula apenas quando dependências mudam. useCallback memoriza funções, útil ao passar callbacks para componentes otimizados. React.memo previne re-renders desnecessários comparando props. Use apenas quando necessário (performance real, não prematura). Profile antes de otimizar.',
          codeExample: `import { useState, useMemo, useCallback, memo } from 'react'

function GoalsList() {
  const [goals, setGoals] = useState([])
  const [filter, setFilter] = useState('all')

  // useMemo: calcula apenas quando goals ou filter mudam
  const filteredGoals = useMemo(() => {
    console.log('Filtrando goals...')
    if (filter === 'all') return goals
    if (filter === 'completed') {
      return goals.filter(g => g.progress === 100)
    }
    return goals.filter(g => g.progress < 100)
  }, [goals, filter])

  // useCallback: memoriza função
  const handleDelete = useCallback((id) => {
    setGoals(goals => goals.filter(g => g.id !== id))
  }, [])

  return (
    <div>
      <FilterButtons filter={filter} setFilter={setFilter} />
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

// React.memo: só re-renderiza se props mudarem
const GoalCard = memo(({ goal, onDelete }) => {
  console.log('Rendering GoalCard:', goal.id)

  return (
    <div>
      <h3>{goal.title}</h3>
      <p>{goal.progress}%</p>
      <button onClick={() => onDelete(goal.id)}>
        Delete
      </button>
    </div>
  )
})

const FilterButtons = memo(({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('active')}>Active</button>
    </div>
  )
})`
        }
      ]
    }
  ]
}
