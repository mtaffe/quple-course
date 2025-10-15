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
          title: 'O que é Estado? - A Memória dos Componentes',
          type: 'theory' as const,
          content: `**Estado** é a memória do componente - qualquer dado que muda ao longo do tempo e afeta o que é renderizado na tela. Quando o estado muda, React automaticamente re-renderiza o componente para refletir as mudanças.

**📊 Estado vs Props - Entenda a Diferença:**

• **State (Estado)**:
  - Dados **internos** gerenciados pelo próprio componente
  - **Mutável** - pode ser alterado pelo componente
  - Privado e isolado - cada instância tem seu próprio estado
  - Desencadeia re-render quando muda
  - Exemplo: contador, formulário, checkbox, modal aberto/fechado

• **Props (Propriedades)**:
  - Dados **externos** recebidos do componente pai
  - **Imutável** - não pode ser alterado pelo componente filho
  - Público - passado de pai para filho
  - Re-render quando o pai passa novas props
  - Exemplo: título, cor, texto inicial, configurações

**🪝 useState Hook - A Revolução dos Componentes Funcionais**

Antes dos Hooks (React < 16.8), apenas componentes de classe podiam ter estado. useState revolucionou React ao permitir estado em componentes funcionais - mais simples e poderosos.

**📚 Sintaxe do useState:**

\`const [state, setState] = useState(initialValue)\`

- **state**: valor atual do estado
- **setState**: função para atualizar o estado
- **initialValue**: valor inicial (número, string, objeto, array, etc.)

**🎯 Regras Fundamentais dos Hooks:**

1. **Sempre no topo do componente**: Nunca dentro de condições, loops ou funções aninhadas
2. **Apenas em componentes funcionais**: Não use em funções regulares JavaScript
3. **Nomes descritivos**: \`[count, setCount]\` é melhor que \`[value, setValue]\`
4. **Ordem importa**: React rastreia hooks pela ordem de chamada

**💡 Quando Usar Estado:**

✅ **USE estado para**:
- Dados que mudam através de interação do usuário
- Dados que afetam a UI (inputs, checkboxes, modais)
- Dados temporários/locais do componente
- Gerenciar loading, erros, e estados de UI

❌ **NÃO use estado para**:
- Dados que nunca mudam (use constantes)
- Dados derivados (calcule na renderização)
- Dados que não afetam a UI (use useRef)
- Dados globais compartilhados (use Context/Redux)

**🔍 Exemplo Prático no Quple:**

No app Quple, usamos estado para:
- Contador de objetivos concluídos
- Progresso de cada objetivo (0-100%)
- Modal de adicionar novo objetivo (aberto/fechado)
- Input de título do objetivo
- Filtros de visualização (todos/ativos/concluídos)

**📚 Para se aprofundar:**
- [React Docs - useState](https://react.dev/reference/react/useState)
- [React Hooks FAQ](https://react.dev/learn/state-a-components-memory)`,
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
          title: 'Atualizando Estado Corretamente - Boas Práticas Essenciais',
          type: 'theory' as const,
          content: `Atualizar estado corretamente é FUNDAMENTAL em React. Erros aqui causam bugs difíceis de rastrear, estados inconsistentes e problemas de performance. Vamos dominar as melhores práticas!

**🚫 REGRA DE OURO: Nunca Modifique Estado Diretamente!**

❌ **ERRADO** - Mutação direta:
\`\`\`javascript
count = count + 1           // NÃO faça isso!
goals.push(newGoal)         // NÃO faça isso!
user.name = "João"          // NÃO faça isso!
\`\`\`

✅ **CORRETO** - Use sempre setState:
\`\`\`javascript
setCount(count + 1)         // Use setState
setGoals([...goals, newGoal])  // Crie novo array
setUser({...user, name: "João"}) // Crie novo objeto
\`\`\`

**⚡ Atualizações São Assíncronas - Entenda o Batch**

React **agrupa** (batches) múltiplas atualizações de estado para melhorar performance. Isso significa que setState não acontece imediatamente!

❌ **PROBLEMA** - Dependência incorreta:
\`\`\`javascript
setCount(count + 1)
setCount(count + 1)  // Ainda usa o valor antigo!
setCount(count + 1)  // Resultado: count + 1 (não +3!)
\`\`\`

✅ **SOLUÇÃO** - Use função updater:
\`\`\`javascript
setCount(prev => prev + 1)
setCount(prev => prev + 1)
setCount(prev => prev + 1)  // Resultado: count + 3 ✓
\`\`\`

**🎯 Quando Usar Função Updater:**

Use \`setState(prev => ...)\` quando:
- O próximo valor depende do valor anterior
- Múltiplas atualizações em sequência
- Em callbacks de eventos (onClick, onChange)
- Dentro de useEffect, setInterval, setTimeout

**📦 Atualizando Objetos e Arrays Imutavelmente**

React compara estado por **referência**, não por valor. Você precisa criar **novos** objetos/arrays para React detectar mudanças.

**🔧 Técnicas de Imutabilidade:**

• **Spread Operator (...)**:
\`\`\`javascript
// Objetos
const newUser = { ...user, name: "João" }

// Arrays
const newGoals = [...goals, newGoal]
\`\`\`

• **Array Methods que Retornam Novos Arrays**:
- \`map()\` - Transformar elementos
- \`filter()\` - Remover elementos
- \`concat()\` - Adicionar elementos
- \`slice()\` - Extrair parte do array

• **Desestruturação para Objetos Aninhados**:
\`\`\`javascript
setUser({
  ...user,
  address: {
    ...user.address,
    city: "São Paulo"
  }
})
\`\`\`

**💡 Estado Derivado - Não Armazene, Calcule!**

❌ **ERRADO** - Estado redundante:
\`\`\`javascript
const [goals, setGoals] = useState([])
const [goalCount, setGoalCount] = useState(0) // Redundante!
const [completedGoals, setCompletedGoals] = useState([]) // Redundante!
\`\`\`

✅ **CORRETO** - Derive durante render:
\`\`\`javascript
const [goals, setGoals] = useState([])
const goalCount = goals.length
const completedGoals = goals.filter(g => g.completed)
\`\`\`

**🎪 Padrões Comuns de Atualização:**

• **Toggle Boolean**:
\`setIsOpen(prev => !prev)\`

• **Incrementar/Decrementar**:
\`setCount(prev => prev + 1)\`

• **Adicionar ao Array**:
\`setItems(prev => [...prev, newItem])\`

• **Remover do Array**:
\`setItems(prev => prev.filter(item => item.id !== removeId))\`

• **Atualizar Item no Array**:
\`setItems(prev => prev.map(item => item.id === updateId ? {...item, ...updates} : item))\`

• **Atualizar Objeto**:
\`setUser(prev => ({...prev, age: prev.age + 1}))\`

**⚠️ Armadilhas Comuns:**

1. **Closures Stale**: Usar estado em callbacks pode capturar valor antigo
2. **Batching**: Múltiplos setStates podem não executar imediatamente
3. **Objetos Complexos**: Mudanças profundas requerem spread em cada nível
4. **Arrays de Objetos**: Lembre de copiar objetos dentro também

**📚 Para se aprofundar:**
- [React Docs - Updating Objects](https://react.dev/learn/updating-objects-in-state)
- [React Docs - Updating Arrays](https://react.dev/learn/updating-arrays-in-state)
- [Immutability in React](https://react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax)`,
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
          title: 'O que é useEffect? - Side Effects em React',
          type: 'theory' as const,
          content: `**useEffect** é o Hook mais poderoso e complexo do React. Ele permite executar **side effects** (efeitos colaterais) - código que interage com o mundo fora do componente.

**🌐 O que são Side Effects?**

Side effects são operações que afetam algo **fora** do escopo do componente:

✅ **Exemplos de Side Effects:**
- 📡 **Fetch de dados** de APIs
- 💾 **localStorage/sessionStorage** - persistir dados
- 🔔 **Subscriptions** - WebSockets, eventos globais
- 📄 **Manipulação do DOM** - document.title, focus, scroll
- ⏰ **Timers** - setInterval, setTimeout
- 📊 **Analytics** - tracking de eventos
- 🖨️ **Logs** - console.log em produção

**🎯 Por que useEffect é Necessário?**

React components devem ser **funções puras** durante o render:
- Input (props) → Output (JSX)
- Sem modificar variáveis externas
- Sem fazer fetch ou alterar DOM

useEffect permite "escapar" dessa pureza de forma controlada, executando side effects **depois** do render.

**📚 Sintaxe Completa do useEffect:**

\`\`\`javascript
useEffect(() => {
  // 1. Setup: código que executa

  return () => {
    // 2. Cleanup: código de limpeza (opcional)
  }
}, [/* 3. Dependencies: array de dependências */])
\`\`\`

**⚙️ Como useEffect Funciona:**

1. **Component renderiza** (JSX é criado)
2. **React atualiza o DOM** com as mudanças
3. **Navegador pinta a tela** (usuário vê mudanças)
4. **useEffect executa** (após paint)

**🎪 Três Modos de Execução:**

• **Sem dependências** - Executa em TODA renderização:
\`\`\`javascript
useEffect(() => {
  console.log('Executou!')
})
\`\`\`
⚠️ CUIDADO: Pode causar loops infinitos!

• **Array vazio []** - Executa UMA vez (mount):
\`\`\`javascript
useEffect(() => {
  fetchData()  // Apenas quando componente monta
}, [])
\`\`\`
✅ Perfeito para: fetch inicial, subscriptions, timers

• **Com dependências [dep]** - Executa quando dep muda:
\`\`\`javascript
useEffect(() => {
  saveToLocalStorage(count)
}, [count])  // Re-executa quando count muda
\`\`\`
✅ Perfeito para: sincronizar estado externo

**🧹 Cleanup Function - Limpando Bagunça**

Sempre que seu effect cria recursos (timers, subscriptions, event listeners), você DEVE limpá-los para evitar:
- Memory leaks
- Comportamento inesperado
- Chamadas redundantes

**Quando cleanup executa:**
1. Antes de re-executar o effect (quando dependências mudam)
2. Quando o componente desmonta (unmount)

**💡 Casos de Uso Comuns:**

✅ **Fetch de dados no mount:**
\`useEffect(() => { fetchData() }, [])\`

✅ **Sincronizar com localStorage:**
\`useEffect(() => { localStorage.setItem('key', value) }, [value])\`

✅ **Atualizar document.title:**
\`useEffect(() => { document.title = \\\`Contagem: \\\${count}\\\` }, [count])\`

✅ **Subscription com cleanup:**
\`\`\`javascript
useEffect(() => {
  const sub = api.subscribe()
  return () => sub.unsubscribe()
}, [])
\`\`\`

**⚠️ Armadilhas Comuns do useEffect:**

1. **Dependências faltando**: ESLint warning "exhaustive-deps"
2. **Loops infinitos**: Effect que atualiza estado que é dependência
3. **Stale closures**: Capturar valores antigos em callbacks
4. **Falta de cleanup**: Memory leaks com timers/subscriptions
5. **useEffect excessivo**: Às vezes você não precisa de useEffect!

**🎯 Quando NÃO usar useEffect:**

❌ **Cálculos derivados** - calcule durante render
❌ **Event handlers** - use onClick, onChange diretamente
❌ **Inicializar estado** - use useState(initialValue) ou lazy initialization
❌ **Transformar dados para render** - faça no corpo do componente

**📚 Para se aprofundar:**
- [React Docs - useEffect](https://react.dev/reference/react/useEffect)
- [React Docs - You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [useEffect Complete Guide](https://overreacted.io/a-complete-guide-to-useeffect/)`,
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
          title: 'Fetch de Dados com useEffect - Padrões Profissionais',
          type: 'example' as const,
          content: `Buscar dados de APIs é o uso mais comum do useEffect em produção. Fazer isso corretamente envolve gerenciar múltiplos estados, prevenir memory leaks e lidar com condições de corrida. Vamos dominar os padrões profissionais!

**🎯 Os Três Estados do Fetch:**

Todo fetch deve gerenciar três estados fundamentais:

1. **Loading** - Está buscando os dados?
2. **Error** - Houve algum erro?
3. **Data** - Os dados retornados da API

**📋 Padrão Básico de Fetch:**

\`\`\`javascript
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  fetch('api_url')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false))
}, [])
\`\`\`

**⚠️ Por que useEffect NÃO pode ser async?**

❌ **ERRADO** - useEffect async direto:
\`\`\`javascript
useEffect(async () => {
  const data = await fetch(url)  // NÃO funciona!
}, [])
\`\`\`

useEffect espera que você retorne uma **cleanup function** ou **nada**. Async functions sempre retornam Promises, causando erro.

✅ **CORRETO** - Async function interna:
\`\`\`javascript
useEffect(() => {
  async function fetchData() {
    const data = await fetch(url)
  }
  fetchData()
}, [])
\`\`\`

**🛡️ AbortController - Prevenindo Memory Leaks**

Problema: Se o componente desmonta enquanto fetch está em progresso, tentar atualizar estado causa erro e memory leak.

Solução: Use AbortController para cancelar fetch no cleanup:

\`\`\`javascript
useEffect(() => {
  const controller = new AbortController()

  fetch(url, { signal: controller.signal })
    .then(/* ... */)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err)  // Ignore AbortError
      }
    })

  return () => controller.abort()  // Cleanup
}, [])
\`\`\`

**🔄 Re-fetching Quando Dependências Mudam**

Use dependências para re-fetch automaticamente:

\`\`\`javascript
const [userId, setUserId] = useState(1)

useEffect(() => {
  fetchUserGoals(userId)
}, [userId])  // Re-fetch quando userId muda
\`\`\`

⚠️ **CUIDADO**: Isso pode causar múltiplos fetches! Use técnicas como:
- **Debouncing**: Atrasar fetch (para busca)
- **Throttling**: Limitar frequência
- **Conditional fetching**: Fetch apenas quando necessário

**🎪 Padrões Avançados:**

• **Retry Logic**: Tentar novamente em caso de erro
• **Caching**: Armazenar respostas para evitar fetches redundantes
- **Optimistic Updates**: Atualizar UI antes da resposta
• **Pagination**: Carregar dados em partes
• **Infinite Scroll**: Carregar mais ao rolar

**🔧 Libraries Recomendadas:**

Para projetos maiores, considere:
- **React Query (TanStack Query)**: Cache, refetch automático, states
- **SWR**: Stale-while-revalidate pattern
- **RTK Query**: Para Redux Toolkit
- **Axios**: Cliente HTTP com mais features

**💡 Exemplo Real no Quple:**

\`\`\`javascript
// Buscar objetivos do casal
useEffect(() => {
  const controller = new AbortController()

  async function fetchCoupleGoals() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        \\\`/api/couples/\\\${coupleId}/goals\\\`,
        { signal: controller.signal }
      )

      if (!response.ok) {
        throw new Error(\\\`HTTP \\\${response.status}\\\`)
      }

      const data = await response.json()
      setGoals(data.goals)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
        console.error('Fetch error:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  fetchCoupleGoals()

  return () => controller.abort()
}, [coupleId])  // Re-fetch se mudar de casal
\`\`\`

**⚠️ Condições de Corrida (Race Conditions):**

Problema: Fetch lento pode completar DEPOIS de um fetch mais rápido, sobrescrevendo dados mais recentes.

Solução: Use flag de controle ou ignore/compare timestamps.

**🎯 Quando Considerar Alternativas:**

Se você precisa de:
- **Cache** automático de fetches
- **Refetch** em background
- **Optimistic updates**
- **Pagination** / Infinite queries
- **Prefetching** de dados

Considere usar **React Query** ou **SWR** ao invés de useEffect manual.

**📚 Para se aprofundar:**
- [MDN - AbortController](https://developer.mozilla.org/pt-BR/docs/Web/API/AbortController)
- [React Query Docs](https://tanstack.com/query/latest)
- [SWR Documentation](https://swr.vercel.app/)
- [Fetch API Guide](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)`,
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
