/**
 * React Hooks - Complete Topic
 *
 * React Hooks: useState and useEffect
 * Target audience: Students who completed React Components
 */

import { Topic } from '../../types'

export const reactHooks: Topic = {
  id: 'react-hooks',
  title: 'React Hooks',
  description: 'Aprenda a gerenciar estado e side effects com useState e useEffect',
  category: 'react',
  difficulty: 'intermediate',
  totalTime: 150, // 2.5 hours
  icon: '🪝',
  lessons: [
    {
      id: 'lesson-1',
      title: 'useState - Gerenciamento de Estado',
      description: 'Entenda como gerenciar estado em componentes funcionais com useState',
      estimatedTime: 75,
      sections: [
        {
          id: 'what-is-state',
          title: 'O que é Estado?',
          type: 'theory' as const,
          content: 'Estado é qualquer dado que muda ao longo do tempo e afeta o que é renderizado na tela. Quando o estado muda, React automaticamente re-renderiza o componente. Props são dados recebidos (imutáveis), enquanto State são dados internos (mutáveis). useState permite gerenciar estado em componentes funcionais. Sempre declare useState no topo do componente, nunca dentro de condições ou loops.',
          codeExample: `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  )
}`
        },
        {
          id: 'updating-state',
          title: 'Atualizando Estado Corretamente',
          type: 'theory' as const,
          content: 'Nunca modifique estado diretamente! Sempre use setState para atualizar. Atualizações são assíncronas, então React agrupa múltiplas atualizações para performance. Se próximo estado depende do anterior, use função: setCount(prev => prev + 1). Para objetos e arrays, crie novos com spread operator (...). Estado derivado deve ser calculado, não armazenado.',
          codeExample: `import { useState } from 'react'

function GoalsList() {
  const [goals, setGoals] = useState([])

  const addGoal = (title) => {
    const newGoal = {
      id: Date.now(),
      title,
      progress: 0
    }
    setGoals([...goals, newGoal])
  }

  const updateProgress = (id, newProgress) => {
    setGoals(
      goals.map(goal =>
        goal.id === id
          ? { ...goal, progress: newProgress }
          : goal
      )
    )
  }

  return (
    <div>
      {goals.map(goal => (
        <div key={goal.id}>
          <h3>{goal.title}</h3>
          <p>Progresso: {goal.progress}%</p>
        </div>
      ))}
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'useEffect - Side Effects',
      description: 'Aprenda a executar side effects e interagir com o mundo externo',
      estimatedTime: 75,
      sections: [
        {
          id: 'what-is-useeffect',
          title: 'O que é useEffect?',
          type: 'theory' as const,
          content: 'useEffect permite executar side effects (efeitos colaterais) em componentes funcionais. Side effects são operações que afetam algo fora do componente: fetch de dados, subscriptions, manipulação do DOM, timers, localStorage. useEffect executa depois de cada render. Use array de dependências para controlar quando executa: [] para apenas no mount, [dep] quando dep muda. Return cleanup function para limpar recursos.',
          codeExample: `import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = 'Contador: ' + count
  }, [count])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick')
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}`
        },
        {
          id: 'fetching-data',
          title: 'Fetch de Dados com useEffect',
          type: 'example' as const,
          content: 'O caso de uso mais comum é buscar dados de uma API. Sempre gerencie loading e error states. Use async function interna (useEffect não pode ser async diretamente). Cancele fetch no cleanup usando AbortController para evitar memory leaks. Use [] como dependências para fetch apenas no mount, ou inclua variáveis para re-fetch quando mudarem.',
          codeExample: `import { useState, useEffect } from 'react'

function GoalsList() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGoals() {
      try {
        setLoading(true)
        const response = await fetch('https://api.quple.com/goals', {
          signal: controller.signal
        })
        const data = await response.json()
        setGoals(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchGoals()
    return () => controller.abort()
  }, [])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div>
      {goals.map(goal => (
        <div key={goal.id}>
          <h3>{goal.title}</h3>
          <p>Progresso: {goal.progress}%</p>
        </div>
      ))}
    </div>
  )
}`
        }
      ]
    }
  ]
}
