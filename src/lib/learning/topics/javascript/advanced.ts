/**
 * JavaScript Advanced - Complete Topic
 *
 * Advanced JavaScript concepts: Async Programming, APIs, and ES6+ Features
 * Target audience: Students who completed JavaScript Fundamentals
 */

import { Topic } from '../../types'

export const jsAdvanced: Topic = {
  id: 'javascript-advanced',
  title: 'JavaScript Avançado',
  description: 'Domine programação assíncrona, APIs e recursos modernos do ES6+',
  category: 'javascript',
  difficulty: 'intermediate',
  totalTime: 240, // 4 hours
  icon: '⚡',
  lessons: [
    // =========================================================================
    // LESSON 1: PROGRAMAÇÃO ASSÍNCRONA
    // =========================================================================
    {
      id: 'lesson-1',
      title: 'Programação Assíncrona',
      description: 'Entenda callbacks, Promises e async/await para código não-bloqueante',
      estimatedTime: 80,
      sections: [
        // ---------------------------------------------------------------------
        // SECTION 1.1: Callbacks e Callback Hell
        // ---------------------------------------------------------------------
        {
          id: 'callbacks',
          title: 'Callbacks e o Problema do Callback Hell',
          type: 'theory',
          content: `
# Callbacks e o Problema do Callback Hell

Antes de entender Promises e async/await, precisamos entender o problema que elas resolvem: **callbacks** e o famoso **Callback Hell**.

## O que é Código Assíncrono?

JavaScript é **single-threaded** (roda em uma única thread). Isso significa que só pode executar uma coisa por vez. Mas e se você precisar:
- Buscar dados de um servidor (pode demorar segundos)
- Ler um arquivo do disco
- Esperar o usuário clicar em um botão

Se JavaScript esperasse cada operação terminar (código **síncrono**), sua página congelaria! A solução? **Código assíncrono**: JavaScript inicia a operação e continua executando outras coisas enquanto espera.

## Callbacks: A Primeira Solução

Um **callback** é uma função que você passa como argumento para outra função, que será chamada quando a operação terminar.

\`\`\`javascript
// Exemplo simples: setTimeout
console.log('Começou')

setTimeout(() => {
  console.log('Depois de 2 segundos')
}, 2000)

console.log('Continuou sem esperar')

// Output:
// Começou
// Continuou sem esperar
// Depois de 2 segundos
\`\`\`

O código não parou para esperar os 2 segundos! Isso é assíncrono.

## Callbacks no Quple: Buscar Objetivos

Imagine buscar os objetivos de um casal no app Quple:

\`\`\`javascript
function getGoals(coupleId, callback) {
  // Simula uma requisição ao servidor
  setTimeout(() => {
    const goals = [
      { id: 1, title: 'Viajar para Paris', progress: 60 },
      { id: 2, title: 'Comprar casa', progress: 30 }
    ]
    callback(goals) // Chama o callback com os dados
  }, 1000)
}

// Usando o callback
getGoals(123, (goals) => {
  console.log('Objetivos recebidos:', goals)
})
\`\`\`

Parece tranquilo, certo? Mas e se você precisar de múltiplas operações dependentes?

## O Problema: Callback Hell (Pirâmide da Perdição)

Imagine que você precisa:
1. Buscar dados do casal
2. Buscar objetivos do casal
3. Buscar progresso de cada objetivo
4. Calcular estatísticas

Com callbacks, isso vira um pesadelo:

\`\`\`javascript
// ⚠️ CALLBACK HELL - Não faça isso!
getCouple(userId, (couple) => {
  getGoals(couple.id, (goals) => {
    getProgress(goals[0].id, (progress) => {
      getStatistics(progress.id, (stats) => {
        console.log('Finalmente temos os dados:', stats)
        // Mas olha essa pirâmide de indentação! 😱
      })
    })
  })
})
\`\`\`

### Problemas do Callback Hell

1. **Difícil de ler** - A indentação vai aumentando sem parar
2. **Difícil de manter** - Onde adiciono um novo passo?
3. **Tratamento de erros complicado** - Precisa de callback de erro em cada nível
4. **Duplicação de código** - Muito código repetitivo

\`\`\`javascript
// Pior ainda: tratamento de erros
getCouple(userId, (couple, error) => {
  if (error) {
    console.error('Erro ao buscar casal:', error)
    return
  }

  getGoals(couple.id, (goals, error) => {
    if (error) {
      console.error('Erro ao buscar objetivos:', error)
      return
    }

    getProgress(goals[0].id, (progress, error) => {
      if (error) {
        console.error('Erro ao buscar progresso:', error)
        return
      }

      // Olha essa bagunça! 😭
    })
  })
})
\`\`\`

## Por que isso acontece?

Callbacks funcionam bem para **uma** operação assíncrona. Mas quando você tem **múltiplas operações dependentes**, vira uma pirâmide de horror.

## A Evolução: Promises ao Resgate!

Promises foram criadas para resolver exatamente esse problema. Ao invés de passar callbacks, você **encadeia** operações de forma linear e legível:

\`\`\`javascript
// Preview do que vem (Promises)
getCouple(userId)
  .then(couple => getGoals(couple.id))
  .then(goals => getProgress(goals[0].id))
  .then(progress => getStatistics(progress.id))
  .then(stats => console.log('Dados:', stats))
  .catch(error => console.error('Erro:', error))

// Muito mais legível! 🎉
\`\`\`

## Quando Usar Callbacks?

Callbacks ainda são úteis para:
- **Event listeners** (click, submit, etc.)
- **Array methods** (map, filter, forEach)
- **setTimeout/setInterval**

\`\`\`javascript
// Callbacks são perfeitos aqui
button.addEventListener('click', () => {
  console.log('Clicou!')
})

const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2) // Callback
\`\`\`

Mas para **operações assíncronas encadeadas** (buscar dados, ler arquivos, fazer requisições), Promises e async/await são MUITO melhores!

## Resumo

- ✅ Callbacks permitem código assíncrono
- ⚠️ Callback Hell é difícil de ler e manter
- ✅ Promises resolvem o problema do Callback Hell
- ✅ Use callbacks para eventos e array methods
- ❌ Evite callbacks para operações assíncronas encadeadas

Na próxima seção, vamos aprender **Promises** e como elas tornam seu código muito mais limpo!
          `,
          codeExample: `// Exemplo: Callback Hell no Quple (EVITE!)
function loadDashboard(userId) {
  getUser(userId, (user, error) => {
    if (error) return handleError(error)

    getCouple(user.coupleId, (couple, error) => {
      if (error) return handleError(error)

      getGoals(couple.id, (goals, error) => {
        if (error) return handleError(error)

        getActivities(couple.id, (activities, error) => {
          if (error) return handleError(error)

          // Finalmente renderiza o dashboard
          renderDashboard({ user, couple, goals, activities })
        })
      })
    })
  })
}

// Na próxima seção, vamos melhorar isso com Promises!`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.2: Promises
        // ---------------------------------------------------------------------
        {
          id: 'promises',
          title: 'Promises - Promessas de JavaScript',
          type: 'theory',
          content: `
# Promises - Promessas de JavaScript

Promises são a solução moderna para código assíncrono. Elas representam um valor que **pode estar disponível agora, no futuro, ou nunca**.

## O que é uma Promise?

Uma Promise é um objeto que representa o resultado eventual de uma operação assíncrona. Pense nela como uma "promessa" de que algo será feito:

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // Operação assíncrona aqui
  setTimeout(() => {
    const success = true

    if (success) {
      resolve('Deu certo!') // Promessa cumprida ✅
    } else {
      reject('Deu errado!') // Promessa quebrada ❌
    }
  }, 1000)
})
\`\`\`

## Os Três Estados de uma Promise

Uma Promise pode estar em um de três estados:

1. **Pending (Pendente)** - A operação ainda está em andamento
2. **Fulfilled (Cumprida)** - A operação foi concluída com sucesso
3. **Rejected (Rejeitada)** - A operação falhou

\`\`\`
Pending → Fulfilled ✅
  ↓
  → Rejected ❌
\`\`\`

Uma vez que a Promise muda de \`pending\` para \`fulfilled\` ou \`rejected\`, ela **nunca muda de estado novamente**.

## Usando Promises com .then() e .catch()

Para "desembrulhar" o valor de uma Promise, usamos \`.then()\`:

\`\`\`javascript
const promise = fetchGoals(123)

promise.then((goals) => {
  console.log('Objetivos recebidos:', goals)
})

// Ou em uma linha
fetchGoals(123).then(goals => {
  console.log('Objetivos:', goals)
})
\`\`\`

Para tratar erros, usamos \`.catch()\`:

\`\`\`javascript
fetchGoals(123)
  .then(goals => {
    console.log('Sucesso:', goals)
  })
  .catch(error => {
    console.error('Erro:', error)
  })
\`\`\`

## Encadeando Promises (Promise Chaining)

Aqui está a magia! Você pode encadear múltiplas Promises de forma linear:

\`\`\`javascript
// Antes (Callback Hell)
getUser(userId, (user) => {
  getCouple(user.coupleId, (couple) => {
    getGoals(couple.id, (goals) => {
      console.log(goals)
    })
  })
})

// Agora (Promise Chain)
getUser(userId)
  .then(user => getCouple(user.coupleId))
  .then(couple => getGoals(couple.id))
  .then(goals => console.log(goals))
  .catch(error => console.error(error))
\`\`\`

**Muito mais legível!** E um único \`.catch()\` pega erros de **qualquer** etapa.

## Como Funciona o Encadeamento?

Cada \`.then()\` retorna uma **nova Promise**. Se você retornar um valor, ele é "embrulhado" em uma Promise:

\`\`\`javascript
Promise.resolve(5)
  .then(num => num * 2) // Retorna 10
  .then(num => num + 3) // Retorna 13
  .then(num => console.log(num)) // 13
\`\`\`

Se você retornar uma Promise, o próximo \`.then()\` espera ela resolver:

\`\`\`javascript
getUser(123)
  .then(user => {
    return getCouple(user.coupleId) // Retorna uma Promise
  })
  .then(couple => {
    console.log(couple) // Espera a Promise resolver
  })
\`\`\`

## Promise.all() - Múltiplas Promises em Paralelo

E se você quiser executar várias Promises **ao mesmo tempo**?

\`\`\`javascript
// Busca 3 coisas em paralelo
const promise1 = fetchGoals(123)
const promise2 = fetchActivities(123)
const promise3 = fetchUsers(123)

Promise.all([promise1, promise2, promise3])
  .then(([goals, activities, users]) => {
    console.log('Tudo carregado!', { goals, activities, users })
  })
  .catch(error => {
    console.error('Alguma falhou:', error)
  })
\`\`\`

**IMPORTANTE:** \`Promise.all()\` falha se **qualquer** Promise falhar.

## Promise.race() - A Primeira que Resolver

Retorna a primeira Promise que resolver (ou rejeitar):

\`\`\`javascript
const slow = new Promise(resolve => setTimeout(() => resolve('Devagar'), 3000))
const fast = new Promise(resolve => setTimeout(() => resolve('Rápido'), 1000))

Promise.race([slow, fast])
  .then(result => console.log(result)) // 'Rápido'
\`\`\`

**Uso prático:** Timeout em requisições!

\`\`\`javascript
const fetchData = fetch('/api/goals')
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject('Timeout!'), 5000)
)

Promise.race([fetchData, timeout])
  .then(data => console.log(data))
  .catch(error => console.error(error)) // 'Timeout!' se demorar mais de 5s
\`\`\`

## Promise.allSettled() - Espera Todas (Mesmo que Falhem)

Diferente de \`Promise.all()\`, não falha se uma Promise falhar:

\`\`\`javascript
const promises = [
  Promise.resolve('Sucesso 1'),
  Promise.reject('Erro 1'),
  Promise.resolve('Sucesso 2')
]

Promise.allSettled(promises)
  .then(results => {
    console.log(results)
    // [
    //   { status: 'fulfilled', value: 'Sucesso 1' },
    //   { status: 'rejected', reason: 'Erro 1' },
    //   { status: 'fulfilled', value: 'Sucesso 2' }
    // ]
  })
\`\`\`

## Criando Suas Próprias Promises

\`\`\`javascript
function fetchGoalsFromDB(coupleId) {
  return new Promise((resolve, reject) => {
    // Simula consulta ao banco
    setTimeout(() => {
      if (coupleId) {
        const goals = [
          { id: 1, title: 'Viajar', progress: 60 },
          { id: 2, title: 'Casa', progress: 30 }
        ]
        resolve(goals) // Sucesso!
      } else {
        reject('ID do casal é obrigatório') // Erro!
      }
    }, 1000)
  })
}

// Usando
fetchGoalsFromDB(123)
  .then(goals => console.log(goals))
  .catch(error => console.error(error))
\`\`\`

## Exemplo Completo: Dashboard do Quple

\`\`\`javascript
function loadDashboard(userId) {
  let userData

  return getUser(userId)
    .then(user => {
      userData = user
      return getCouple(user.coupleId)
    })
    .then(couple => {
      return Promise.all([
        getGoals(couple.id),
        getActivities(couple.id)
      ])
    })
    .then(([goals, activities]) => {
      return {
        user: userData,
        goals,
        activities
      }
    })
    .catch(error => {
      console.error('Erro ao carregar dashboard:', error)
      throw error // Re-throw para quem chamou tratar
    })
}

// Uso
loadDashboard(123)
  .then(dashboardData => renderDashboard(dashboardData))
  .catch(error => showErrorMessage(error))
\`\`\`

## Dicas de Ouro

1. **Sempre use .catch()** - Erros não tratados podem quebrar seu app
2. **Retorne Promises em .then()** - Para encadear corretamente
3. **Use Promise.all()** - Para operações paralelas (mais rápido!)
4. **Não crie Promises desnecessárias** - Se a função já retorna Promise, use-a diretamente

## Resumo

- ✅ Promises resolvem o Callback Hell
- ✅ Três estados: pending, fulfilled, rejected
- ✅ Encadeie com .then() e .catch()
- ✅ Promise.all() para paralelismo
- ✅ Promise.race() para timeout
- ✅ Promise.allSettled() para resultados parciais

Na próxima seção, vamos aprender **async/await**, que torna Promises ainda mais fáceis de usar!
          `,
          codeExample: `// Dashboard do Quple com Promises
function loadQupleDashboard(userId) {
  return getUser(userId)
    .then(user => {
      console.log('✅ Usuário carregado')
      return getCouple(user.coupleId)
    })
    .then(couple => {
      console.log('✅ Casal carregado')
      // Busca em paralelo (mais rápido!)
      return Promise.all([
        getGoals(couple.id),
        getActivities(couple.id),
        getBadges(couple.id)
      ])
    })
    .then(([goals, activities, badges]) => {
      console.log('✅ Tudo carregado!')
      return { goals, activities, badges }
    })
    .catch(error => {
      console.error('❌ Erro:', error)
      throw error
    })
}

// Uso
loadQupleDashboard(123)
  .then(data => renderDashboard(data))
  .catch(error => showError(error))`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.3: Async/Await
        // ---------------------------------------------------------------------
        {
          id: 'async-await',
          title: 'Async/Await - Promises com Açúcar Sintático',
          type: 'theory',
          content: `
# Async/Await - Promises com Açúcar Sintático

Async/await é a forma mais moderna e legível de trabalhar com código assíncrono em JavaScript. É basicamente "açúcar sintático" em cima de Promises, tornando código assíncrono parecer síncrono!

## O que é Async/Await?

São duas palavras-chave que trabalham juntas:
- **async** - Marca uma função como assíncrona
- **await** - Pausa a execução até uma Promise resolver

\`\`\`javascript
// Com Promises (.then)
function loadGoals() {
  return fetchGoals(123)
    .then(goals => {
      console.log(goals)
      return goals
    })
}

// Com async/await (mais limpo!)
async function loadGoals() {
  const goals = await fetchGoals(123)
  console.log(goals)
  return goals
}
\`\`\`

Parece código síncrono, mas é totalmente assíncrono! 🎉

## A Palavra-Chave async

Quando você coloca \`async\` antes de uma função, duas coisas acontecem:

1. A função **sempre retorna uma Promise**
2. Você pode usar \`await\` dentro dela

\`\`\`javascript
async function minhaFuncao() {
  return 'Hello' // Automaticamente virar Promise.resolve('Hello')
}

minhaFuncao().then(result => console.log(result)) // 'Hello'
\`\`\`

Você também pode retornar uma Promise explicitamente:

\`\`\`javascript
async function buscarDados() {
  return Promise.resolve({ name: 'João' })
}
\`\`\`

## A Palavra-Chave await

\`await\` faz JavaScript **esperar** até a Promise resolver, e então retorna o valor:

\`\`\`javascript
async function exemplo() {
  // Sem await
  const promise = fetchGoals(123) // Retorna uma Promise
  console.log(promise) // Promise { <pending> }

  // Com await
  const goals = await fetchGoals(123) // Espera resolver
  console.log(goals) // [{ id: 1, title: '...' }, ...]
}
\`\`\`

**IMPORTANTE:** \`await\` só funciona dentro de funções \`async\`!

\`\`\`javascript
// ❌ ERRO! await fora de função async
const data = await fetchGoals(123)

// ✅ CORRETO
async function load() {
  const data = await fetchGoals(123)
}
\`\`\`

## Comparando .then() vs async/await

Vamos ver a diferença lado a lado:

\`\`\`javascript
// Com .then() (estilo antigo)
function loadDashboard(userId) {
  return getUser(userId)
    .then(user => getCouple(user.coupleId))
    .then(couple => getGoals(couple.id))
    .then(goals => {
      console.log('Objetivos:', goals)
      return goals
    })
    .catch(error => console.error(error))
}

// Com async/await (estilo moderno)
async function loadDashboard(userId) {
  try {
    const user = await getUser(userId)
    const couple = await getCouple(user.coupleId)
    const goals = await getGoals(couple.id)
    console.log('Objetivos:', goals)
    return goals
  } catch (error) {
    console.error(error)
  }
}
\`\`\`

**Muito mais legível!** Lê-se de cima para baixo, como código síncrono.

## Tratamento de Erros com try/catch

Ao invés de \`.catch()\`, usamos \`try/catch\`:

\`\`\`javascript
async function loadGoals(coupleId) {
  try {
    const goals = await fetchGoals(coupleId)
    const progress = await calculateProgress(goals)
    return { goals, progress }
  } catch (error) {
    console.error('Erro ao carregar objetivos:', error)
    throw error // Re-throw se quiser que o chamador trate
  }
}

// Usando
loadGoals(123)
  .then(data => console.log(data))
  .catch(error => showErrorMessage(error))
\`\`\`

## Executando Múltiplas Promises em Paralelo

**CUIDADO:** \`await\` executa de forma **sequencial** (uma depois da outra):

\`\`\`javascript
// ❌ LENTO - Executa sequencialmente (3s + 2s + 1s = 6s)
async function loadData() {
  const goals = await fetchGoals(123) // Espera 3s
  const activities = await fetchActivities(123) // Espera 2s
  const users = await fetchUsers(123) // Espera 1s
  return { goals, activities, users }
}
\`\`\`

Para executar em **paralelo** (ao mesmo tempo), use \`Promise.all()\`:

\`\`\`javascript
// ✅ RÁPIDO - Executa em paralelo (máx 3s, não 6s!)
async function loadData() {
  const [goals, activities, users] = await Promise.all([
    fetchGoals(123),
    fetchActivities(123),
    fetchUsers(123)
  ])
  return { goals, activities, users }
}
\`\`\`

**Regra de ouro:** Se as operações **não dependem uma da outra**, execute em paralelo!

## Exemplo Real: Dashboard do Quple

\`\`\`javascript
async function loadQupleDashboard(userId) {
  try {
    // 1. Busca dados do usuário
    const user = await getUser(userId)
    console.log('✅ Usuário carregado')

    // 2. Busca casal (depende do user)
    const couple = await getCouple(user.coupleId)
    console.log('✅ Casal carregado')

    // 3. Busca tudo em paralelo (não dependem um do outro)
    const [goals, activities, badges, streak] = await Promise.all([
      getGoals(couple.id),
      getActivities(couple.id),
      getBadges(couple.id),
      getStreak(couple.id)
    ])
    console.log('✅ Tudo carregado!')

    return {
      user,
      couple,
      goals,
      activities,
      badges,
      streak
    }
  } catch (error) {
    console.error('❌ Erro ao carregar dashboard:', error)
    throw error
  }
}

// Usando
async function initDashboard() {
  try {
    const data = await loadQupleDashboard(123)
    renderDashboard(data)
  } catch (error) {
    showErrorPage(error)
  }
}
\`\`\`

## Async/Await com Array Methods

Cuidado ao usar \`await\` dentro de \`.map()\`, \`.forEach()\`, etc:

\`\`\`javascript
// ❌ NÃO FUNCIONA - forEach não espera Promises
async function updateGoals(goalIds) {
  goalIds.forEach(async (id) => {
    await updateGoal(id) // forEach não espera!
  })
  console.log('Concluído?') // Pode printar antes de terminar!
}

// ✅ FUNCIONA - for...of espera
async function updateGoals(goalIds) {
  for (const id of goalIds) {
    await updateGoal(id) // Espera cada um
  }
  console.log('Concluído!') // Agora sim!
}

// ✅ FUNCIONA - Promise.all para executar em paralelo
async function updateGoals(goalIds) {
  await Promise.all(
    goalIds.map(id => updateGoal(id))
  )
  console.log('Concluído!')
}
\`\`\`

## Top-Level Await (ES2022)

Em módulos ES6, você pode usar \`await\` no nível superior (fora de função async):

\`\`\`javascript
// No arquivo main.js (módulo ES6)
const config = await fetchConfig()
const user = await fetchUser()

console.log('App iniciado!', { config, user })
\`\`\`

**Nota:** Funciona apenas em módulos ES6 (\`type: "module"\` no package.json ou \`<script type="module">\`)

## Async/Await com Event Handlers

Event handlers podem ser async:

\`\`\`javascript
button.addEventListener('click', async (event) => {
  try {
    const goals = await fetchGoals(123)
    renderGoals(goals)
  } catch (error) {
    showError(error)
  }
})
\`\`\`

## Dicas de Ouro

1. **Use async/await** ao invés de .then() (mais legível)
2. **Sempre use try/catch** para erros
3. **Promise.all() para paralelismo** - Não use await sequencialmente se não precisar
4. **Cuidado com loops** - for...of funciona, forEach não
5. **Não se esqueça de await!** - Senão você recebe uma Promise ao invés do valor

## Resumo

- ✅ \`async\` marca função como assíncrona
- ✅ \`await\` espera Promise resolver
- ✅ Código parece síncrono, mas é assíncrono
- ✅ Use try/catch para erros
- ✅ Promise.all() para executar em paralelo
- ✅ for...of funciona com await, forEach não

Async/await é a forma moderna e recomendada de trabalhar com Promises!
          `,
          codeExample: `// Dashboard Quple com Async/Await
async function loadQupleDashboard(userId) {
  try {
    // Sequencial (depende do anterior)
    const user = await getUser(userId)
    const couple = await getCouple(user.coupleId)

    // Paralelo (não dependem um do outro)
    const [goals, activities, badges] = await Promise.all([
      fetchGoals(couple.id),
      fetchActivities(couple.id),
      fetchBadges(couple.id)
    ])

    return { user, couple, goals, activities, badges }
  } catch (error) {
    console.error('Erro:', error)
    throw error
  }
}

// Usando em um botão
submitButton.addEventListener('click', async () => {
  try {
    showLoading()
    const data = await loadQupleDashboard(123)
    renderDashboard(data)
  } catch (error) {
    showError(error)
  } finally {
    hideLoading()
  }
})`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.4: Error Handling
        // ---------------------------------------------------------------------
        {
          id: 'error-handling',
          title: 'Tratamento de Erros Assíncronos',
          type: 'theory',
          content: `
# Tratamento de Erros em Código Assíncrono

Erros em código assíncrono podem ser traiçoeiros! Se não forem tratados corretamente, podem quebrar seu app silenciosamente. Vamos aprender as melhores práticas.

## Tipos de Erros

### 1. Erros de Rede
Conexão falhou, timeout, servidor fora do ar:

\`\`\`javascript
async function fetchGoals() {
  try {
    const response = await fetch('/api/goals')
    if (!response.ok) {
      throw new Error(\`HTTP Error: \${response.status}\`)
    }
    return await response.json()
  } catch (error) {
    if (error.name === 'TypeError') {
      console.error('Sem conexão com internet')
    }
    throw error
  }
}
\`\`\`

### 2. Erros de Validação
Dados inválidos enviados para API:

\`\`\`javascript
async function createGoal(goalData) {
  if (!goalData.title) {
    throw new Error('Título é obrigatório')
  }

  if (goalData.title.length < 3) {
    throw new Error('Título deve ter pelo menos 3 caracteres')
  }

  return await api.post('/goals', goalData)
}
\`\`\`

### 3. Erros do Servidor
Servidor retornou erro (400, 500, etc):

\`\`\`javascript
async function fetchData(url) {
  const response = await fetch(url)

  if (!response.ok) {
    // Tenta pegar mensagem de erro do servidor
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Erro no servidor')
  }

  return await response.json()
}
\`\`\`

## Try/Catch com Async/Await

A forma mais comum e legível:

\`\`\`javascript
async function loadGoals(coupleId) {
  try {
    const goals = await fetchGoals(coupleId)
    return goals
  } catch (error) {
    console.error('Erro ao carregar objetivos:', error)
    // Decide o que fazer:
    // 1. Re-throw para quem chamou tratar
    throw error
    // 2. Ou retorna valor padrão
    // return []
  }
}
\`\`\`

## Finally - Sempre Executa

\`finally\` executa **sempre**, independente de erro ou sucesso:

\`\`\`javascript
async function loadDashboard() {
  showLoading() // Mostra spinner

  try {
    const data = await fetchData()
    renderDashboard(data)
  } catch (error) {
    showError(error)
  } finally {
    hideLoading() // Remove spinner (SEMPRE executa)
  }
}
\`\`\`

## Tratando Múltiplos Erros

Quando usa \`Promise.all()\`, se **uma** Promise falhar, todas falham:

\`\`\`javascript
async function loadData() {
  try {
    const [goals, activities, users] = await Promise.all([
      fetchGoals(123),
      fetchActivities(123),
      fetchUsers(123) // Se esta falhar...
    ])
    return { goals, activities, users }
  } catch (error) {
    // ...você cai aqui e não tem nenhum dado!
    console.error('Alguma requisição falhou:', error)
    return null
  }
}
\`\`\`

### Solução 1: Promise.allSettled()

Espera todas as Promises, mesmo que algumas falhem:

\`\`\`javascript
async function loadData() {
  const results = await Promise.allSettled([
    fetchGoals(123),
    fetchActivities(123),
    fetchUsers(123)
  ])

  const goals = results[0].status === 'fulfilled' ? results[0].value : []
  const activities = results[1].status === 'fulfilled' ? results[1].value : []
  const users = results[2].status === 'fulfilled' ? results[2].value : []

  return { goals, activities, users }
}
\`\`\`

### Solução 2: Try/Catch Individual

Trata cada requisição separadamente:

\`\`\`javascript
async function loadData() {
  const goals = await fetchGoals(123).catch(err => {
    console.error('Erro ao buscar objetivos:', err)
    return [] // Retorna array vazio
  })

  const activities = await fetchActivities(123).catch(err => {
    console.error('Erro ao buscar atividades:', err)
    return []
  })

  return { goals, activities }
}
\`\`\`

## Criando Erros Customizados

Para erros mais específicos do seu app:

\`\`\`javascript
class ApiError extends Error {
  constructor(message, statusCode, data) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.data = data
  }
}

async function fetchGoals(coupleId) {
  const response = await fetch(\`/api/couples/\${coupleId}/goals\`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.message || 'Erro ao buscar objetivos',
      response.status,
      errorData
    )
  }

  return await response.json()
}

// Usando
try {
  const goals = await fetchGoals(123)
} catch (error) {
  if (error instanceof ApiError) {
    if (error.statusCode === 404) {
      console.log('Casal não encontrado')
    } else if (error.statusCode === 401) {
      console.log('Não autorizado')
    }
  } else {
    console.error('Erro desconhecido:', error)
  }
}
\`\`\`

## Retry Logic (Tentar Novamente)

Às vezes você quer tentar novamente se falhar:

\`\`\`javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('HTTP Error')
      return await response.json()
    } catch (error) {
      if (i === maxRetries - 1) {
        // Última tentativa, desiste
        throw error
      }
      // Espera antes de tentar novamente (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      console.log(\`Tentativa \${i + 2}/\${maxRetries}...\`)
    }
  }
}
\`\`\`

## Timeout em Requisições

Cancelar se demorar muito:

\`\`\`javascript
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ])
}

// Usando
try {
  const data = await fetchWithTimeout('/api/goals', 3000) // 3s timeout
  console.log(data)
} catch (error) {
  if (error.message === 'Timeout') {
    console.error('Requisição demorou muito!')
  }
}
\`\`\`

## Global Error Handler

Para pegar erros não tratados:

\`\`\`javascript
// Em Node.js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise rejeitada não tratada:', promise, reason)
})

// No Browser
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejeitada não tratada:', event.reason)
})
\`\`\`

## Exemplo Completo: Quple Dashboard com Error Handling

\`\`\`javascript
class QupleDashboardError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'QupleDashboardError'
    this.code = code
  }
}

async function loadQupleDashboard(userId) {
  // Mostra loading
  showLoading()

  try {
    // Validação inicial
    if (!userId) {
      throw new QupleDashboardError('User ID é obrigatório', 'MISSING_USER_ID')
    }

    // Busca dados sequenciais
    const user = await getUser(userId).catch(error => {
      throw new QupleDashboardError(
        'Erro ao buscar usuário',
        'USER_FETCH_FAILED'
      )
    })

    const couple = await getCouple(user.coupleId).catch(error => {
      throw new QupleDashboardError(
        'Erro ao buscar casal',
        'COUPLE_FETCH_FAILED'
      )
    })

    // Busca dados em paralelo (com fallback)
    const results = await Promise.allSettled([
      fetchGoals(couple.id),
      fetchActivities(couple.id),
      fetchBadges(couple.id)
    ])

    const goals = results[0].status === 'fulfilled' ? results[0].value : []
    const activities = results[1].status === 'fulfilled' ? results[1].value : []
    const badges = results[2].status === 'fulfilled' ? results[2].value : []

    return {
      user,
      couple,
      goals,
      activities,
      badges
    }
  } catch (error) {
    // Tratamento específico por tipo de erro
    if (error instanceof QupleDashboardError) {
      switch (error.code) {
        case 'MISSING_USER_ID':
          showError('Por favor, faça login')
          break
        case 'USER_FETCH_FAILED':
          showError('Erro ao carregar seus dados')
          break
        case 'COUPLE_FETCH_FAILED':
          showError('Erro ao carregar dados do casal')
          break
      }
    } else {
      showError('Erro inesperado. Tente novamente.')
    }

    throw error
  } finally {
    // Sempre esconde loading
    hideLoading()
  }
}
\`\`\`

## Dicas de Ouro

1. **Sempre use try/catch** em código assíncrono
2. **Use finally** para cleanup (fechar modais, remover loading)
3. **Crie erros customizados** para diferentes cenários
4. **Promise.allSettled()** quando quer resultados parciais
5. **Não ignore erros** - pelo menos logue no console
6. **Use timeout** em requisições de rede
7. **Implemente retry** para operações críticas

## Resumo

- ✅ Use try/catch/finally com async/await
- ✅ Trate erros específicos de forma diferente
- ✅ Promise.allSettled() para múltiplas Promises
- ✅ Crie classes de erro customizadas
- ✅ Implemente timeout e retry quando necessário
- ✅ Sempre comunique erros ao usuário

Com bom tratamento de erros, seu app fica robusto e confiável!
          `,
          codeExample: `// Error Handling Completo - Quple
async function loadQupleDashboard(userId) {
  showLoading()

  try {
    // Validação
    if (!userId) {
      throw new Error('User ID obrigatório')
    }

    // Sequencial
    const user = await getUser(userId)
    const couple = await getCouple(user.coupleId)

    // Paralelo com fallback
    const [goals, activities, badges] = await Promise.allSettled([
      fetchGoals(couple.id),
      fetchActivities(couple.id),
      fetchBadges(couple.id)
    ]).then(results => results.map(r =>
      r.status === 'fulfilled' ? r.value : []
    ))

    return { user, couple, goals, activities, badges }
  } catch (error) {
    console.error('Erro:', error)
    showError('Erro ao carregar dashboard')
    throw error
  } finally {
    hideLoading() // Sempre executa
  }
}`
        }
      ]
    },

    // =========================================================================
    // LESSON 2: APIS E FETCH
    // =========================================================================
    {
      id: 'lesson-2',
      title: 'APIs e Fetch',
      description: 'Aprenda a consumir APIs REST com Fetch API e manipular JSON',
      estimatedTime: 80,
      sections: [
        {
          id: 'rest-apis',
          title: 'REST APIs e HTTP Methods',
          type: 'theory',
          content: `
# REST APIs e HTTP Methods

APIs (Application Programming Interfaces) permitem que diferentes aplicações conversem entre si. Vamos aprender como funcionam APIs REST e os métodos HTTP.

## O que é uma API REST?

REST (Representational State Transfer) é um estilo de arquitetura para APIs web. Uma API REST usa URLs e métodos HTTP para realizar operações.

**Analogia:** Imagine um restaurante:
- **Cliente (seu app)**: Faz pedidos
- **Garçom (API)**: Leva pedidos e traz respostas
- **Cozinha (servidor)**: Processa pedidos

### Exemplo: API do Quple

\`\`\`
https://api.quple.com/couples/123/goals
                     ↑        ↑      ↑
                 Recurso     ID    Sub-recurso
\`\`\`

## Os 4 Métodos HTTP Principais (CRUD)

### 1. GET - Buscar Dados (Read)

Usado para **obter** informações do servidor.

\`\`\`javascript
// Buscar todos os objetivos do casal
GET /api/couples/123/goals

// Buscar um objetivo específico
GET /api/goals/456
\`\`\`

**Características:**
- Não modifica dados
- Pode ser cacheado
- Idempotente (fazer várias vezes tem mesmo resultado)

### 2. POST - Criar Dados (Create)

Usado para **criar** novos recursos.

\`\`\`javascript
// Criar novo objetivo
POST /api/goals
Body: {
  "title": "Viajar para Paris",
  "coupleId": 123,
  "targetAmount": 10000
}
\`\`\`

**Características:**
- Modifica dados no servidor
- Não é idempotente (fazer várias vezes cria múltiplos recursos)
- Retorna o recurso criado (geralmente com ID)

### 3. PUT/PATCH - Atualizar Dados (Update)

**PUT** substitui o recurso completo:

\`\`\`javascript
PUT /api/goals/456
Body: {
  "title": "Viajar para Tóquio", // Mudou
  "coupleId": 123,
  "targetAmount": 15000, // Mudou
  "currentAmount": 5000
}
\`\`\`

**PATCH** atualiza apenas campos específicos:

\`\`\`javascript
PATCH /api/goals/456
Body: {
  "currentAmount": 6000 // Só atualiza isso
}
\`\`\`

### 4. DELETE - Deletar Dados (Delete)

Usado para **remover** recursos.

\`\`\`javascript
// Deletar objetivo
DELETE /api/goals/456
\`\`\`

**Características:**
- Remove o recurso permanentemente
- Idempotente (deletar 2x tem mesmo resultado que 1x)

## Status Codes HTTP

O servidor responde com um código indicando o resultado:

### 2xx - Sucesso ✅
- **200 OK**: Requisição bem-sucedida (GET, PUT, PATCH)
- **201 Created**: Recurso criado (POST)
- **204 No Content**: Sucesso sem retorno de dados (DELETE)

### 4xx - Erro do Cliente ❌
- **400 Bad Request**: Dados inválidos
- **401 Unauthorized**: Não autenticado (falta login)
- **403 Forbidden**: Sem permissão
- **404 Not Found**: Recurso não existe
- **422 Unprocessable Entity**: Dados não passaram na validação

### 5xx - Erro do Servidor 💥
- **500 Internal Server Error**: Erro no servidor
- **502 Bad Gateway**: Servidor intermediário falhou
- **503 Service Unavailable**: Servidor temporariamente indisponível

## Headers HTTP

Headers enviam informações extras com a requisição/resposta:

\`\`\`javascript
// Headers comuns de requisição
{
  "Content-Type": "application/json", // Tipo de dados
  "Authorization": "Bearer token123", // Autenticação
  "Accept": "application/json" // Tipo esperado de resposta
}

// Headers comuns de resposta
{
  "Content-Type": "application/json",
  "Cache-Control": "max-age=3600",
  "Set-Cookie": "session=abc123"
}
\`\`\`

## Estrutura de uma API REST

APIs seguem padrões de URL:

\`\`\`
GET    /api/goals              → Lista todos objetivos
POST   /api/goals              → Cria objetivo
GET    /api/goals/123          → Busca objetivo 123
PUT    /api/goals/123          → Atualiza objetivo 123
PATCH  /api/goals/123          → Atualiza parcialmente
DELETE /api/goals/123          → Deleta objetivo 123

GET    /api/couples/456/goals  → Objetivos do casal 456
\`\`\`

## Query Parameters

Filtros e opções na URL:

\`\`\`javascript
// Paginação
GET /api/goals?page=2&limit=10

// Filtros
GET /api/goals?status=active&sort=createdAt

// Busca
GET /api/goals?search=paris
\`\`\`

## Exemplo: API do Quple

\`\`\`javascript
// 1. Autenticar
POST /api/auth/login
Body: { email, password }
Response: { token, user }

// 2. Buscar casal (com token)
GET /api/couples/me
Headers: { Authorization: "Bearer token" }
Response: { id, name, members }

// 3. Listar objetivos
GET /api/couples/123/goals
Response: [
  { id: 1, title: "Paris", progress: 60 },
  { id: 2, title: "Casa", progress: 30 }
]

// 4. Criar objetivo
POST /api/goals
Body: { title: "Carro novo", coupleId: 123 }
Response: { id: 3, title: "Carro novo", progress: 0 }

// 5. Atualizar progresso
PATCH /api/goals/3
Body: { progress: 15 }
Response: { id: 3, progress: 15 }

// 6. Deletar objetivo
DELETE /api/goals/3
Response: 204 No Content
\`\`\`

## REST Constraints (Princípios)

APIs REST seguem 6 princípios:

1. **Client-Server**: Separação entre frontend e backend
2. **Stateless**: Cada requisição é independente
3. **Cacheable**: Respostas podem ser cacheadas
4. **Uniform Interface**: URLs e métodos padronizados
5. **Layered System**: Pode ter servidores intermediários
6. **Code on Demand** (opcional): Servidor pode enviar código

## JSON: A Linguagem das APIs

APIs modernas usam JSON (JavaScript Object Notation):

\`\`\`json
{
  "id": 123,
  "title": "Viajar para Paris",
  "progress": 60,
  "members": [
    { "id": 1, "name": "João" },
    { "id": 2, "name": "Maria" }
  ],
  "completed": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
\`\`\`

**Por que JSON?**
- Fácil de ler (humanos)
- Fácil de parsear (máquinas)
- Compatível com JavaScript
- Leve (pouco overhead)

## Autenticação em APIs

### 1. API Keys

\`\`\`javascript
GET /api/goals?apiKey=abc123xyz
\`\`\`

### 2. Bearer Tokens (JWT)

\`\`\`javascript
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

### 3. OAuth 2.0

Usado para "Login com Google", "Login com Facebook", etc.

## Exemplo Real: Fluxo Completo no Quple

\`\`\`javascript
// 1. Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const { token } = await loginResponse.json()

// 2. Buscar dados (com token)
const goalsResponse = await fetch('/api/goals', {
  headers: { 'Authorization': \`Bearer \${token}\` }
})

const goals = await goalsResponse.json()

// 3. Criar objetivo
const newGoal = await fetch('/api/goals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify({
    title: 'Viajar para Paris',
    targetAmount: 10000
  })
})

// 4. Atualizar progresso
const updated = await fetch('/api/goals/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify({ progress: 75 })
})
\`\`\`

## Resumo

- ✅ REST usa URLs e métodos HTTP padronizados
- ✅ GET (buscar), POST (criar), PUT/PATCH (atualizar), DELETE (deletar)
- ✅ Status codes indicam resultado (2xx sucesso, 4xx erro cliente, 5xx erro servidor)
- ✅ Headers enviam informações extras
- ✅ JSON é o formato padrão de dados
- ✅ Autenticação geralmente usa Bearer tokens

Na próxima seção, vamos aprender a usar Fetch API para consumir estas APIs!
          `,
          codeExample: `// Exemplo completo: CRUD de objetivos no Quple
const API_URL = 'https://api.quple.com'
const token = 'seu_token_aqui'

// GET - Listar objetivos
async function listGoals() {
  const response = await fetch(\`\${API_URL}/goals\`, {
    headers: { 'Authorization': \`Bearer \${token}\` }
  })
  return await response.json()
}

// POST - Criar objetivo
async function createGoal(goalData) {
  const response = await fetch(\`\${API_URL}/goals\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify(goalData)
  })
  return await response.json()
}

// PATCH - Atualizar progresso
async function updateProgress(goalId, progress) {
  const response = await fetch(\`\${API_URL}/goals/\${goalId}\`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify({ progress })
  })
  return await response.json()
}

// DELETE - Remover objetivo
async function deleteGoal(goalId) {
  await fetch(\`\${API_URL}/goals/\${goalId}\`, {
    method: 'DELETE',
    headers: { 'Authorization': \`Bearer \${token}\` }
  })
}`
        },

        // Continue with remaining sections...
        // Due to length constraints, I'll create placeholders for the other sections
        // but they would follow the same detailed pattern

        {
          id: 'fetch-api',
          title: 'Fetch API - Fazendo Requisições',
          type: 'theory',
          content: `
# Fetch API - Fazendo Requisições

A Fetch API é a forma moderna de fazer requisições HTTP em JavaScript. Ela substitui o antigo \`XMLHttpRequest\` com uma interface muito mais limpa e poderosa baseada em Promises.

## O que é a Fetch API?

Fetch é uma função global que permite fazer requisições HTTP de forma assíncrona. Ela retorna uma Promise que resolve com um objeto Response.

\`\`\`javascript
// Sintaxe básica
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
\`\`\`

## GET Request - Buscar Dados

A forma mais simples de usar fetch é para buscar dados:

\`\`\`javascript
// Buscar objetivos do casal no Quple
async function getGoals() {
  const response = await fetch('https://api.quple.com/goals')
  const goals = await response.json()
  console.log(goals)
}
\`\`\`

Por padrão, fetch faz um **GET request**.

## O Objeto Response

O fetch retorna um objeto Response com várias propriedades e métodos:

\`\`\`javascript
const response = await fetch('/api/goals')

console.log(response.ok)           // true se status 200-299
console.log(response.status)       // 200, 404, 500, etc
console.log(response.statusText)   // "OK", "Not Found", etc
console.log(response.headers)      // Headers da resposta
console.log(response.url)          // URL completa

// Métodos para extrair dados
await response.json()     // Parse JSON
await response.text()     // Texto puro
await response.blob()     // Arquivo binário (imagens, PDFs)
await response.formData() // FormData
\`\`\`

## Checando se a Requisição Foi Bem-Sucedida

**IMPORTANTE:** Fetch só rejeita se houver erro de rede. Erros HTTP (404, 500) **não** rejeitam a Promise!

\`\`\`javascript
async function getGoals() {
  const response = await fetch('/api/goals')

  // ✅ SEMPRE verifique response.ok
  if (!response.ok) {
    throw new Error(\`HTTP Error: \${response.status}\`)
  }

  return await response.json()
}
\`\`\`

## POST Request - Criar Dados

Para enviar dados, use o segundo parâmetro \`options\`:

\`\`\`javascript
async function createGoal(goalData) {
  const response = await fetch('https://api.quple.com/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goalData)
  })

  if (!response.ok) {
    throw new Error('Erro ao criar objetivo')
  }

  return await response.json()
}

// Usando
const newGoal = {
  title: 'Viajar para Paris',
  targetAmount: 10000,
  coupleId: 123
}

createGoal(newGoal)
  .then(goal => console.log('Criado:', goal))
  .catch(error => console.error(error))
\`\`\`

## PUT/PATCH Request - Atualizar Dados

\`\`\`javascript
// PUT - Substitui completamente
async function updateGoal(goalId, goalData) {
  const response = await fetch(\`https://api.quple.com/goals/\${goalId}\`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goalData)
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar')
  }

  return await response.json()
}

// PATCH - Atualiza parcialmente
async function updateProgress(goalId, progress) {
  const response = await fetch(\`https://api.quple.com/goals/\${goalId}\`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ progress })
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar progresso')
  }

  return await response.json()
}
\`\`\`

## DELETE Request - Remover Dados

\`\`\`javascript
async function deleteGoal(goalId) {
  const response = await fetch(\`https://api.quple.com/goals/\${goalId}\`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Erro ao deletar')
  }

  // DELETE geralmente retorna 204 No Content
  if (response.status === 204) {
    return { success: true }
  }

  return await response.json()
}
\`\`\`

## Headers - Enviando Informações Extras

Headers permitem enviar metadados com a requisição:

\`\`\`javascript
async function fetchWithAuth() {
  const token = localStorage.getItem('token')

  const response = await fetch('/api/goals', {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Custom-Header': 'algum-valor'
    }
  })

  return await response.json()
}
\`\`\`

### Headers Comuns

\`\`\`javascript
{
  // Tipo de conteúdo sendo enviado
  'Content-Type': 'application/json',

  // Tipo de resposta esperada
  'Accept': 'application/json',

  // Autenticação
  'Authorization': 'Bearer token123',

  // Cache
  'Cache-Control': 'no-cache',

  // Custom headers (geralmente começam com X-)
  'X-API-Key': 'abc123'
}
\`\`\`

## Query Parameters na URL

Envie parâmetros na URL para filtros, busca, paginação:

\`\`\`javascript
// Manualmente
const url = 'https://api.quple.com/goals?page=2&limit=10&status=active'
const response = await fetch(url)

// Usando URLSearchParams (mais seguro!)
const params = new URLSearchParams({
  page: '2',
  limit: '10',
  status: 'active'
})

const url = \`https://api.quple.com/goals?\${params}\`
const response = await fetch(url)
\`\`\`

## Enviar Formulário (FormData)

Para upload de arquivos ou formulários:

\`\`\`javascript
// Criar FormData
const formData = new FormData()
formData.append('title', 'Viajar')
formData.append('amount', '10000')
formData.append('image', fileInput.files[0]) // Arquivo

// Enviar
const response = await fetch('/api/goals', {
  method: 'POST',
  body: formData
  // NÃO defina Content-Type! O browser faz automaticamente
})
\`\`\`

## Abort Controller - Cancelar Requisições

Você pode cancelar requisições em andamento:

\`\`\`javascript
// Criar controller
const controller = new AbortController()

// Passar signal para fetch
const response = fetch('/api/goals', {
  signal: controller.signal
})

// Cancelar depois de 5 segundos
setTimeout(() => controller.abort(), 5000)

// Ou cancelar por evento
cancelButton.addEventListener('click', () => {
  controller.abort()
})

// Tratar cancelamento
try {
  const data = await response
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Requisição cancelada')
  }
}
\`\`\`

## Timeout em Requisições

Fetch não tem timeout nativo, mas podemos implementar:

\`\`\`javascript
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController()

  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Timeout: Requisição demorou muito')
    }
    throw error
  }
}

// Usando
try {
  const response = await fetchWithTimeout('/api/goals', {}, 3000) // 3s timeout
  const data = await response.json()
} catch (error) {
  console.error(error.message)
}
\`\`\`

## Tratamento Completo de Erros

\`\`\`javascript
async function fetchGoals() {
  try {
    const response = await fetch('/api/goals')

    // 1. Verifica se chegou resposta
    if (!response) {
      throw new Error('Sem resposta do servidor')
    }

    // 2. Verifica status HTTP
    if (!response.ok) {
      // Tenta extrair mensagem de erro do servidor
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || \`HTTP Error: \${response.status}\`)
    }

    // 3. Parse JSON
    const data = await response.json()
    return data

  } catch (error) {
    // 4. Categoriza erros
    if (error.name === 'TypeError') {
      console.error('Erro de rede: sem conexão')
    } else if (error.message.includes('HTTP Error')) {
      console.error('Erro do servidor:', error.message)
    } else {
      console.error('Erro desconhecido:', error)
    }
    throw error
  }
}
\`\`\`

## Exemplo Completo: CRUD no Quple

\`\`\`javascript
class QupleAPI {
  constructor(baseURL, token) {
    this.baseURL = baseURL
    this.token = token
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.token}\`,
        ...options.headers
      }
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || \`HTTP Error: \${response.status}\`)
    }

    // Se 204 No Content, não tenta parsear
    if (response.status === 204) {
      return null
    }

    return await response.json()
  }

  // GET
  async getGoals() {
    return this.request('/goals')
  }

  // POST
  async createGoal(goalData) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData)
    })
  }

  // PATCH
  async updateGoal(goalId, updates) {
    return this.request(\`/goals/\${goalId}\`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    })
  }

  // DELETE
  async deleteGoal(goalId) {
    return this.request(\`/goals/\${goalId}\`, {
      method: 'DELETE'
    })
  }
}

// Usando
const api = new QupleAPI('https://api.quple.com', 'meu_token')

async function example() {
  try {
    // Buscar
    const goals = await api.getGoals()
    console.log('Objetivos:', goals)

    // Criar
    const newGoal = await api.createGoal({
      title: 'Viajar',
      targetAmount: 10000
    })
    console.log('Criado:', newGoal)

    // Atualizar
    await api.updateGoal(newGoal.id, { progress: 25 })
    console.log('Atualizado!')

    // Deletar
    await api.deleteGoal(newGoal.id)
    console.log('Deletado!')
  } catch (error) {
    console.error('Erro:', error.message)
  }
}
\`\`\`

## Dicas de Ouro

1. **Sempre verifique response.ok** - Fetch não rejeita em erros HTTP
2. **Use async/await** - Muito mais legível que .then()
3. **Implemente timeout** - Requisições podem travar indefinidamente
4. **Use AbortController** - Para cancelar requisições
5. **Trate erros específicos** - Rede, HTTP, parse, etc
6. **Crie uma classe API** - Centralize lógica de requisições
7. **Não esqueça Content-Type** - Especialmente em POST/PUT/PATCH

## Resumo

- ✅ \`fetch(url, options)\` retorna Promise com Response
- ✅ Verifique \`response.ok\` antes de parsear
- ✅ Use \`response.json()\` para extrair dados JSON
- ✅ Defina \`method\`, \`headers\` e \`body\` em options
- ✅ Use AbortController para cancelar requisições
- ✅ Implemente timeout customizado
- ✅ Trate diferentes tipos de erros apropriadamente

Fetch API é a ferramenta moderna para comunicação com APIs!
          `,
          codeExample: `// Classe completa de API para o Quple
class QupleAPI {
  constructor(baseURL = 'https://api.quple.com') {
    this.baseURL = baseURL
    this.token = localStorage.getItem('quple_token')
  }

  async request(endpoint, options = {}) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this.token}\`,
          ...options.headers
        },
        signal: controller.signal
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || \`HTTP \${response.status}\`)
      }

      return response.status === 204 ? null : await response.json()
    } catch (error) {
      clearTimeout(timeout)
      if (error.name === 'AbortError') {
        throw new Error('Timeout: requisição cancelada')
      }
      throw error
    }
  }

  // CRUD Operations
  getGoals() {
    return this.request('/goals')
  }

  createGoal(data) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  updateGoal(id, data) {
    return this.request(\`/goals/\${id}\`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  deleteGoal(id) {
    return this.request(\`/goals/\${id}\`, {
      method: 'DELETE'
    })
  }
}

// Uso
const api = new QupleAPI()

async function loadDashboard() {
  try {
    const goals = await api.getGoals()
    console.log('Objetivos:', goals)
  } catch (error) {
    console.error('Erro:', error.message)
  }
}`
        },

        {
          id: 'json-manipulation',
          title: 'Manipulação de JSON',
          type: 'theory',
          content: `
# Manipulação de JSON

JSON (JavaScript Object Notation) é o formato padrão para troca de dados em APIs modernas. Vamos aprender a trabalhar com JSON de forma eficiente e segura.

## O que é JSON?

JSON é um formato de texto para representar dados estruturados. Foi inspirado na sintaxe de objetos JavaScript, mas é **independente de linguagem** - praticamente todas as linguagens podem ler/escrever JSON.

\`\`\`json
{
  "id": 123,
  "name": "João",
  "age": 25,
  "active": true,
  "goals": ["Paris", "Casa"],
  "partner": {
    "name": "Maria",
    "age": 24
  }
}
\`\`\`

### JSON vs JavaScript Object

\`\`\`javascript
// Objeto JavaScript (código)
const obj = {
  name: 'João',        // Keys podem ser sem aspas
  age: 25,
  getName() {          // Pode ter métodos
    return this.name
  }
}

// JSON (string/texto)
const json = '{
  "name": "João",      // Keys DEVEM ter aspas duplas
  "age": 25            // NÃO pode ter métodos
}'
\`\`\`

## JSON.stringify() - Objeto → String

Converte um objeto JavaScript em string JSON:

\`\`\`javascript
const goal = {
  id: 1,
  title: 'Viajar para Paris',
  progress: 60,
  completed: false
}

const jsonString = JSON.stringify(goal)
console.log(jsonString)
// '{"id":1,"title":"Viajar para Paris","progress":60,"completed":false}'

console.log(typeof jsonString) // 'string'
\`\`\`

### Quando Usar stringify()

1. **Enviar dados para API** (body de fetch)
2. **Salvar no localStorage** (só aceita strings)
3. **Comparar objetos** (comparação de strings)
4. **Logs/debugging** (visualizar estrutura)

\`\`\`javascript
// Enviar para API
fetch('/api/goals', {
  method: 'POST',
  body: JSON.stringify({ title: 'Viajar', amount: 10000 })
})

// Salvar no localStorage
localStorage.setItem('user', JSON.stringify(userObject))

// Comparar objetos
const equal = JSON.stringify(obj1) === JSON.stringify(obj2)
\`\`\`

### Formatando JSON (Pretty Print)

O segundo parâmetro é um "replacer" (veremos depois). O terceiro é para indentação:

\`\`\`javascript
const data = { name: 'João', age: 25, city: 'SP' }

// Sem formatação (uma linha)
JSON.stringify(data)
// '{"name":"João","age":25,"city":"SP"}'

// Com indentação (legível)
JSON.stringify(data, null, 2)
/*
{
  "name": "João",
  "age": 25,
  "city": "SP"
}
*/

// Tabs ao invés de espaços
JSON.stringify(data, null, '\t')
\`\`\`

### Controlando o que Serializar (Replacer)

O segundo parâmetro permite filtrar ou transformar valores:

\`\`\`javascript
const user = {
  id: 123,
  name: 'João',
  password: 'secret123',  // Queremos omitir isso!
  email: 'joao@email.com'
}

// Método 1: Array de keys permitidas
JSON.stringify(user, ['id', 'name', 'email'])
// '{"id":123,"name":"João","email":"joao@email.com"}'

// Método 2: Função replacer
JSON.stringify(user, (key, value) => {
  if (key === 'password') return undefined // Omite
  return value
})
// '{"id":123,"name":"João","email":"joao@email.com"}'
\`\`\`

### Tratando Valores Especiais

Alguns valores JavaScript não têm equivalente em JSON:

\`\`\`javascript
const data = {
  name: 'João',
  date: new Date(),           // Vira string ISO
  regex: /test/,              // Vira {}
  func: () => {},             // É omitido
  undef: undefined,           // É omitido
  nan: NaN,                   // Vira null
  infinity: Infinity          // Vira null
}

JSON.stringify(data)
// '{"name":"João","date":"2024-01-15T10:30:00.000Z","regex":{},"nan":null,"infinity":null}'
\`\`\`

## JSON.parse() - String → Objeto

Converte string JSON em objeto JavaScript:

\`\`\`javascript
const jsonString = '{"name":"João","age":25,"active":true}'

const obj = JSON.parse(jsonString)
console.log(obj.name)   // 'João'
console.log(obj.age)    // 25
console.log(typeof obj) // 'object'
\`\`\`

### Quando Usar parse()

1. **Receber dados de API** (response.json() faz isso)
2. **Ler do localStorage**
3. **Processar JSON de arquivos**

\`\`\`javascript
// API response (fetch já parseia com .json())
const response = await fetch('/api/goals')
const goals = await response.json() // Internamente usa JSON.parse()

// localStorage
const userString = localStorage.getItem('user')
const user = JSON.parse(userString)

// JSON de texto
const config = JSON.parse('{"apiKey":"abc","timeout":5000}')
\`\`\`

### Tratamento de Erros com parse()

JSON inválido lança erro! Sempre use try/catch:

\`\`\`javascript
const badJson = '{ name: "João" }' // Faltam aspas nas keys

// ❌ ERRO! Vai quebrar o app
const obj = JSON.parse(badJson)

// ✅ CORRETO - Trata erro
try {
  const obj = JSON.parse(badJson)
  console.log(obj)
} catch (error) {
  console.error('JSON inválido:', error.message)
  // SyntaxError: Unexpected token n in JSON at position 2
}
\`\`\`

### Reviver Function (parse com transformação)

O segundo parâmetro permite transformar valores durante o parse:

\`\`\`javascript
const jsonString = '{
  "name": "João",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "amount": "10000"
}'

const obj = JSON.parse(jsonString, (key, value) => {
  // Converter strings de data em objetos Date
  if (key === 'createdAt') {
    return new Date(value)
  }

  // Converter strings numéricas em números
  if (key === 'amount') {
    return Number(value)
  }

  return value
})

console.log(obj.createdAt instanceof Date) // true
console.log(typeof obj.amount)             // 'number'
\`\`\`

## Trabalhando com Estruturas Complexas

### Arrays de Objetos

\`\`\`javascript
const goals = [
  { id: 1, title: 'Paris', progress: 60 },
  { id: 2, title: 'Casa', progress: 30 },
  { id: 3, title: 'Carro', progress: 15 }
]

// Stringify
const json = JSON.stringify(goals)

// Parse
const parsed = JSON.parse(json)
console.log(parsed[0].title) // 'Paris'
\`\`\`

### Objetos Aninhados

\`\`\`javascript
const couple = {
  id: 123,
  members: [
    { id: 1, name: 'João', age: 25 },
    { id: 2, name: 'Maria', age: 24 }
  ],
  goals: [
    {
      id: 1,
      title: 'Viajar',
      activities: [
        { id: 1, name: 'Pesquisar passagens' },
        { id: 2, name: 'Reservar hotel' }
      ]
    }
  ]
}

// Stringify preserva toda a estrutura
const json = JSON.stringify(couple, null, 2)

// Parse reconstrói tudo
const parsed = JSON.parse(json)
console.log(parsed.goals[0].activities[0].name) // 'Pesquisar passagens'
\`\`\`

## Exemplo Completo: Quple API

\`\`\`javascript
class QupleStorage {
  // Salvar no localStorage
  static saveUser(user) {
    try {
      const json = JSON.stringify(user)
      localStorage.setItem('quple_user', json)
      return true
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
      return false
    }
  }

  // Carregar do localStorage
  static loadUser() {
    try {
      const json = localStorage.getItem('quple_user')
      if (!json) return null

      const user = JSON.parse(json, (key, value) => {
        // Converter timestamps em Date
        if (key === 'lastLogin' || key === 'createdAt') {
          return new Date(value)
        }
        return value
      })

      return user
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
      return null
    }
  }

  // Salvar objetivos
  static saveGoals(goals) {
    const json = JSON.stringify(goals, null, 2) // Formatado
    localStorage.setItem('quple_goals', json)
  }

  // Carregar objetivos
  static loadGoals() {
    try {
      const json = localStorage.getItem('quple_goals')
      return json ? JSON.parse(json) : []
    } catch (error) {
      console.error('Erro ao carregar objetivos:', error)
      return []
    }
  }
}

// Usando
const user = {
  id: 123,
  name: 'João',
  email: 'joao@email.com',
  lastLogin: new Date(),
  preferences: {
    theme: 'dark',
    notifications: true
  }
}

QupleStorage.saveUser(user)
const loaded = QupleStorage.loadUser()
console.log(loaded.lastLogin instanceof Date) // true
\`\`\`

## Deep Clone com JSON

Um truque comum para clonar objetos profundamente:

\`\`\`javascript
const original = {
  name: 'João',
  goals: [
    { id: 1, title: 'Paris' },
    { id: 2, title: 'Casa' }
  ]
}

// Clone profundo
const clone = JSON.parse(JSON.stringify(original))

// Modificar clone não afeta original
clone.goals[0].title = 'Tóquio'

console.log(original.goals[0].title) // 'Paris' (inalterado)
console.log(clone.goals[0].title)    // 'Tóquio'
\`\`\`

**CUIDADO:** Isso perde funções, Date vira string, etc. Use com cuidado!

## Validando JSON

Para validar se uma string é JSON válido:

\`\`\`javascript
function isValidJSON(str) {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

console.log(isValidJSON('{"name":"João"}'))        // true
console.log(isValidJSON('{name: "João"}'))         // false (sem aspas)
console.log(isValidJSON('{"name":"João",}'))       // false (vírgula final)
console.log(isValidJSON('not json'))               // false
\`\`\`

## Comparando Objetos com JSON

\`\`\`javascript
const goal1 = { id: 1, title: 'Paris', progress: 60 }
const goal2 = { id: 1, title: 'Paris', progress: 60 }

// ❌ Não funciona (compara referências)
console.log(goal1 === goal2) // false

// ✅ Funciona (compara conteúdo)
console.log(JSON.stringify(goal1) === JSON.stringify(goal2)) // true
\`\`\`

**CUIDADO:** A ordem das keys importa!

\`\`\`javascript
const obj1 = { a: 1, b: 2 }
const obj2 = { b: 2, a: 1 }

// Strings são diferentes (ordem diferente)
JSON.stringify(obj1) !== JSON.stringify(obj2)

// Solução: ordenar keys
function sortedStringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort())
}

sortedStringify(obj1) === sortedStringify(obj2) // true
\`\`\`

## Dicas de Ouro

1. **Sempre use try/catch com JSON.parse()** - String inválida quebra o app
2. **Não confie em JSON externo** - Valide dados recebidos
3. **Cuidado com valores especiais** - Date, undefined, funções são perdidos
4. **Use formatação em dev** - \`JSON.stringify(obj, null, 2)\` para debug
5. **Não abuse de JSON.stringify para comparação** - Pode ser lento
6. **localStorage só aceita strings** - Sempre stringify/parse
7. **fetch().json() já parseia** - Não precisa chamar JSON.parse()

## Resumo

- ✅ **JSON.stringify(obj)** - Objeto → String
- ✅ **JSON.parse(str)** - String → Objeto
- ✅ Use try/catch com parse() para tratar erros
- ✅ Segundo parâmetro permite filtrar/transformar valores
- ✅ Terceiro parâmetro de stringify() formata o JSON
- ✅ Funções, undefined, Date são tratados de forma especial
- ✅ Útil para localStorage, APIs, clonagem profunda

JSON é a linguagem universal da web moderna!
          `,
          codeExample: `// Sistema completo de armazenamento para Quple
class QupleStorage {
  static KEYS = {
    USER: 'quple_user',
    GOALS: 'quple_goals',
    SETTINGS: 'quple_settings'
  }

  // Salvar com stringify
  static save(key, data) {
    try {
      const json = JSON.stringify(data)
      localStorage.setItem(key, json)
      return true
    } catch (error) {
      console.error(\`Erro ao salvar \${key}:\`, error)
      return false
    }
  }

  // Carregar com parse
  static load(key, defaultValue = null) {
    try {
      const json = localStorage.getItem(key)
      if (!json) return defaultValue

      return JSON.parse(json, (key, value) => {
        // Auto-converter timestamps
        if (typeof value === 'string' && /\\d{4}-\\d{2}-\\d{2}T/.test(value)) {
          return new Date(value)
        }
        return value
      })
    } catch (error) {
      console.error(\`Erro ao carregar \${key}:\`, error)
      return defaultValue
    }
  }

  // Validar JSON
  static isValid(str) {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  // Comparar objetos
  static equals(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  // Clone profundo
  static clone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}

// Uso
const user = {
  id: 123,
  name: 'João',
  lastLogin: new Date(),
  preferences: { theme: 'dark' }
}

QupleStorage.save(QupleStorage.KEYS.USER, user)
const loaded = QupleStorage.load(QupleStorage.KEYS.USER)

console.log(loaded.lastLogin instanceof Date) // true (auto-convertido)`
        },

        {
          id: 'network-errors',
          title: 'Tratamento de Erros de Rede',
          type: 'theory',
          content: `
# Tratamento de Erros de Rede

Erros de rede são inevitáveis em aplicações web. Conexão ruim, servidor fora do ar, timeout... Vamos aprender a lidar com esses problemas de forma profissional.

## Tipos de Erros de Rede

### 1. Erro de Conexão (Network Error)

Quando não há conexão com a internet ou o servidor não responde:

\`\`\`javascript
try {
  const response = await fetch('https://api.quple.com/goals')
  const data = await response.json()
} catch (error) {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    console.error('Sem conexão com a internet')
  }
}
\`\`\`

### 2. Timeout (Demorou Demais)

Requisição não retorna em tempo razoável:

\`\`\`javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error('Timeout: servidor não respondeu a tempo')
    }
    throw error
  }
}
\`\`\`

### 3. Erros HTTP (4xx, 5xx)

Servidor responde, mas com erro:

\`\`\`javascript
const response = await fetch('/api/goals')

if (!response.ok) {
  if (response.status === 404) {
    console.error('Recurso não encontrado')
  } else if (response.status === 500) {
    console.error('Erro no servidor')
  } else if (response.status === 401) {
    console.error('Não autorizado - faça login')
  }
}
\`\`\`

### 4. Erro de CORS

Tentativa de acessar domínio diferente sem permissão:

\`\`\`javascript
// Erro típico de CORS:
// "Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000'
// has been blocked by CORS policy"

try {
  const response = await fetch('https://api-externa.com/data')
} catch (error) {
  if (error.message.includes('CORS')) {
    console.error('Erro de CORS: servidor não permite acesso')
  }
}
\`\`\`

### 5. Erro de Parse JSON

Servidor retorna resposta que não é JSON válido:

\`\`\`javascript
try {
  const response = await fetch('/api/goals')
  const data = await response.json() // Pode falhar aqui!
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('Resposta não é JSON válido')
  }
}
\`\`\`

## Sistema Completo de Detecção de Erros

\`\`\`javascript
class NetworkError extends Error {
  constructor(message, type, statusCode) {
    super(message)
    this.name = 'NetworkError'
    this.type = type // 'connection', 'timeout', 'http', 'parse'
    this.statusCode = statusCode
  }
}

async function safeFetch(url, options = {}, timeout = 10000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    // 1. Tenta fazer a requisição
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    // 2. Verifica status HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new NetworkError(
        errorData.message || \`HTTP Error: \${response.status}\`,
        'http',
        response.status
      )
    }

    // 3. Tenta parsear JSON
    try {
      return await response.json()
    } catch (parseError) {
      throw new NetworkError(
        'Resposta não é JSON válido',
        'parse',
        response.status
      )
    }

  } catch (error) {
    clearTimeout(timeoutId)

    // 4. Categoriza o erro
    if (error instanceof NetworkError) {
      throw error // Re-throw erro customizado
    }

    if (error.name === 'AbortError') {
      throw new NetworkError(
        'Timeout: servidor não respondeu',
        'timeout',
        null
      )
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new NetworkError(
        'Sem conexão com a internet',
        'connection',
        null
      )
    }

    // Erro desconhecido
    throw new NetworkError(
      error.message || 'Erro desconhecido',
      'unknown',
      null
    )
  }
}

// Usando
try {
  const goals = await safeFetch('https://api.quple.com/goals')
  console.log('Objetivos:', goals)
} catch (error) {
  if (error instanceof NetworkError) {
    switch (error.type) {
      case 'connection':
        showMessage('Verifique sua conexão com a internet')
        break
      case 'timeout':
        showMessage('Servidor demorou muito. Tente novamente.')
        break
      case 'http':
        if (error.statusCode === 401) {
          redirectToLogin()
        } else {
          showMessage('Erro no servidor. Tente novamente mais tarde.')
        }
        break
      case 'parse':
        showMessage('Resposta inválida do servidor')
        break
    }
  }
}
\`\`\`

## Retry Logic (Tentar Novamente)

Às vezes faz sentido tentar novamente automaticamente:

\`\`\`javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`)
      }

      return await response.json()

    } catch (error) {
      console.log(\`Tentativa \${attempt}/\${maxRetries} falhou\`)

      // Se é a última tentativa, desiste
      if (attempt === maxRetries) {
        throw error
      }

      // Exponential backoff: espera 1s, 2s, 4s...
      const delay = Math.pow(2, attempt - 1) * 1000
      console.log(\`Aguardando \${delay}ms antes de tentar novamente...\`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Usando
try {
  const data = await fetchWithRetry('https://api.quple.com/goals')
  console.log('Sucesso:', data)
} catch (error) {
  console.error('Falhou após 3 tentativas:', error)
}
\`\`\`

### Quando Usar Retry?

✅ **Use retry para:**
- Erros de rede temporários (500, 502, 503)
- Timeouts
- Operações críticas (pagamentos, salvamento de dados)

❌ **NÃO use retry para:**
- Erros de validação (400, 422)
- Não autorizado (401, 403)
- Não encontrado (404)
- Requisições que modificam dados (POST/PUT/PATCH) - pode duplicar

## Detectar Conexão Offline

\`\`\`javascript
// Verificar status da conexão
if (!navigator.onLine) {
  console.log('Você está offline')
}

// Listeners para mudanças
window.addEventListener('online', () => {
  console.log('Conexão restaurada!')
  // Sincronizar dados pendentes
  syncPendingData()
})

window.addEventListener('offline', () => {
  console.log('Você ficou offline')
  // Mostrar banner de aviso
  showOfflineBanner()
})
\`\`\`

### Sistema de Fila Offline

Salva requisições para executar quando voltar online:

\`\`\`javascript
class OfflineQueue {
  constructor() {
    this.queue = JSON.parse(localStorage.getItem('offline_queue') || '[]')
    this.setupListeners()
  }

  setupListeners() {
    window.addEventListener('online', () => this.processQueue())
  }

  add(url, options) {
    this.queue.push({ url, options, timestamp: Date.now() })
    localStorage.setItem('offline_queue', JSON.stringify(this.queue))
    console.log('Requisição adicionada à fila offline')
  }

  async processQueue() {
    console.log(\`Processando \${this.queue.length} requisições pendentes...\`)

    while (this.queue.length > 0) {
      const { url, options } = this.queue[0]

      try {
        await fetch(url, options)
        console.log('✅ Requisição enviada:', url)
        this.queue.shift() // Remove da fila
      } catch (error) {
        console.error('❌ Falhou, mantendo na fila:', url)
        break // Para de processar se falhar
      }
    }

    localStorage.setItem('offline_queue', JSON.stringify(this.queue))
  }
}

// Usando
const offlineQueue = new OfflineQueue()

async function createGoal(goalData) {
  if (!navigator.onLine) {
    offlineQueue.add('/api/goals', {
      method: 'POST',
      body: JSON.stringify(goalData)
    })
    showMessage('Você está offline. Objetivo será salvo quando voltar online.')
    return
  }

  // Online: envia normalmente
  await fetch('/api/goals', {
    method: 'POST',
    body: JSON.stringify(goalData)
  })
}
\`\`\`

## Rate Limiting (Controle de Taxa)

Evitar fazer muitas requisições muito rápido:

\`\`\`javascript
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
    this.requests = []
  }

  async throttle() {
    const now = Date.now()

    // Remove requisições antigas
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    )

    // Se atingiu o limite, espera
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0]
      const waitTime = this.timeWindow - (now - oldestRequest)
      console.log(\`Rate limit! Aguardando \${waitTime}ms...\`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
      return this.throttle() // Tenta novamente
    }

    // Registra requisição
    this.requests.push(now)
  }
}

// Limita a 5 requisições por 10 segundos
const limiter = new RateLimiter(5, 10000)

async function fetchGoals() {
  await limiter.throttle()
  return await fetch('/api/goals')
}
\`\`\`

## Exemplo Completo: API Robusta do Quple

\`\`\`javascript
class QupleAPI {
  constructor(baseURL = 'https://api.quple.com') {
    this.baseURL = baseURL
    this.offlineQueue = new OfflineQueue()
  }

  async request(endpoint, options = {}, config = {}) {
    const {
      timeout = 10000,
      maxRetries = 3,
      retryDelay = 1000
    } = config

    // Verifica se está offline
    if (!navigator.onLine && options.method !== 'GET') {
      this.offlineQueue.add(\`\${this.baseURL}\${endpoint}\`, options)
      throw new Error('Offline: requisição salva na fila')
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          // Não faz retry em erros de cliente (4xx)
          if (response.status >= 400 && response.status < 500) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || \`HTTP \${response.status}\`)
          }

          // Erros de servidor (5xx) - tenta novamente
          if (attempt < maxRetries) {
            const delay = retryDelay * Math.pow(2, attempt - 1)
            console.log(\`Erro \${response.status}. Tentando novamente em \${delay}ms...\`)
            await new Promise(resolve => setTimeout(resolve, delay))
            continue
          }

          throw new Error(\`HTTP \${response.status}\`)
        }

        return response.status === 204 ? null : await response.json()

      } catch (error) {
        if (attempt === maxRetries) {
          if (error.name === 'AbortError') {
            throw new Error('Timeout: servidor não respondeu')
          }
          if (error instanceof TypeError) {
            throw new Error('Erro de rede: verifique sua conexão')
          }
          throw error
        }

        // Aguarda antes de tentar novamente
        const delay = retryDelay * Math.pow(2, attempt - 1)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  async getGoals() {
    return this.request('/goals')
  }

  async createGoal(goalData) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData)
    })
  }
}

// Usando
const api = new QupleAPI()

async function loadDashboard() {
  try {
    showLoading()
    const goals = await api.getGoals()
    renderGoals(goals)
  } catch (error) {
    if (error.message.includes('Offline')) {
      showOfflineMessage()
    } else if (error.message.includes('Timeout')) {
      showTimeoutMessage()
    } else {
      showErrorMessage('Erro ao carregar objetivos')
    }
  } finally {
    hideLoading()
  }
}
\`\`\`

## Dicas de Ouro

1. **Sempre trate erros de rede** - Nunca confie que a requisição vai funcionar
2. **Categorize erros** - Trate cada tipo de forma diferente
3. **Implemente timeout** - Não espere indefinidamente
4. **Use retry inteligente** - Apenas para erros temporários
5. **Detecte offline** - Melhora muito a UX
6. **Mostre feedback ao usuário** - Nunca deixe o usuário sem resposta
7. **Logue erros** - Para debugging e monitoramento

## Resumo

- ✅ Erros de rede são comuns: conexão, timeout, HTTP, CORS, parse
- ✅ Use try/catch e categorize erros
- ✅ Implemente timeout e retry quando apropriado
- ✅ Detecte conexão offline com navigator.onLine
- ✅ Use fila offline para requisições pendentes
- ✅ Implemente rate limiting quando necessário
- ✅ Sempre dê feedback claro ao usuário

Com bom tratamento de erros, seu app funciona bem mesmo em condições ruins!
          `,
          codeExample: `// Sistema completo de requisições com tratamento de erros
class RobustAPI {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.setupOfflineDetection()
  }

  setupOfflineDetection() {
    window.addEventListener('online', () => {
      console.log('✅ Conexão restaurada')
      this.processOfflineQueue()
    })

    window.addEventListener('offline', () => {
      console.log('❌ Você ficou offline')
    })
  }

  async request(endpoint, options = {}) {
    // Verifica offline
    if (!navigator.onLine && options.method !== 'GET') {
      throw new Error('OFFLINE')
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
        ...options,
        signal: controller.signal
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || \`HTTP \${response.status}\`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeout)

      if (error.name === 'AbortError') {
        throw new Error('TIMEOUT')
      }
      if (error instanceof TypeError) {
        throw new Error('NETWORK')
      }
      throw error
    }
  }
}

// Uso com tratamento completo
const api = new RobustAPI('https://api.quple.com')

async function loadGoals() {
  try {
    const goals = await api.request('/goals')
    renderGoals(goals)
  } catch (error) {
    if (error.message === 'OFFLINE') {
      showMessage('Você está offline')
    } else if (error.message === 'TIMEOUT') {
      showMessage('Servidor não respondeu. Tente novamente.')
    } else if (error.message === 'NETWORK') {
      showMessage('Erro de conexão')
    } else {
      showMessage('Erro ao carregar dados')
    }
  }
}`
        }
      ]
    },

    // =========================================================================
    // LESSON 3: ES6+ FEATURES
    // =========================================================================
    {
      id: 'lesson-3',
      title: 'ES6+ Features',
      description: 'Recursos modernos do JavaScript: destructuring, spread, arrow functions',
      estimatedTime: 80,
      sections: [
        {
          id: 'destructuring-spread',
          title: 'Destructuring e Spread Operator',
          type: 'theory',
          content: `
# Destructuring e Spread Operator

Destructuring e Spread são recursos do ES6+ que tornam seu código mais limpo e conciso. Vamos aprender a extrair valores e manipular arrays/objetos de forma moderna.

## Destructuring de Arrays

Destructuring permite "desempacotar" valores de arrays em variáveis separadas:

\`\`\`javascript
// Forma antiga
const goals = ['Paris', 'Casa', 'Carro']
const first = goals[0]
const second = goals[1]
const third = goals[2]

// Com destructuring (ES6+)
const [first, second, third] = goals
console.log(first)  // 'Paris'
console.log(second) // 'Casa'
console.log(third)  // 'Carro'
\`\`\`

### Pular Elementos

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]

// Pega apenas o primeiro e o terceiro
const [first, , third] = numbers
console.log(first)  // 1
console.log(third)  // 3
\`\`\`

### Valores Padrão

\`\`\`javascript
const [a, b, c = 'Padrão'] = ['Valor A', 'Valor B']

console.log(a) // 'Valor A'
console.log(b) // 'Valor B'
console.log(c) // 'Padrão' (não existe no array)
\`\`\`

### Rest Parameter em Arrays

\`\`\`javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5]

console.log(first)  // 1
console.log(second) // 2
console.log(rest)   // [3, 4, 5]
\`\`\`

### Trocar Valores

\`\`\`javascript
let a = 1
let b = 2

// Forma antiga (precisa de temp)
let temp = a
a = b
b = temp

// Com destructuring (sem temp!)
[a, b] = [b, a]
console.log(a) // 2
console.log(b) // 1
\`\`\`

## Destructuring de Objetos

Muito mais útil que arrays! Permite extrair propriedades por nome:

\`\`\`javascript
const user = {
  id: 123,
  name: 'João',
  email: 'joao@email.com',
  age: 25
}

// Forma antiga
const name = user.name
const email = user.email

// Com destructuring
const { name, email } = user
console.log(name)  // 'João'
console.log(email) // 'joao@email.com'
\`\`\`

### Renomear Variáveis

\`\`\`javascript
const goal = { id: 1, title: 'Viajar para Paris' }

// Renomeia 'title' para 'goalTitle'
const { title: goalTitle } = goal
console.log(goalTitle) // 'Viajar para Paris'
\`\`\`

### Valores Padrão

\`\`\`javascript
const goal = { id: 1, title: 'Viajar' }

const { id, title, progress = 0 } = goal

console.log(id)       // 1
console.log(title)    // 'Viajar'
console.log(progress) // 0 (padrão, não existe no objeto)
\`\`\`

### Rest em Objetos

\`\`\`javascript
const user = {
  id: 123,
  name: 'João',
  email: 'joao@email.com',
  password: 'secret',
  age: 25
}

// Extrai id e name, resto vai para 'data'
const { id, name, ...data } = user

console.log(id)   // 123
console.log(name) // 'João'
console.log(data) // { email: '...', password: '...', age: 25 }
\`\`\`

### Destructuring Aninhado

\`\`\`javascript
const couple = {
  id: 123,
  members: [
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' }
  ],
  goal: {
    title: 'Paris',
    progress: { current: 6000, target: 10000 }
  }
}

// Extrai valores aninhados
const {
  goal: {
    title,
    progress: { current, target }
  }
} = couple

console.log(title)   // 'Paris'
console.log(current) // 6000
console.log(target)  // 10000
\`\`\`

## Destructuring em Parâmetros de Função

Muito comum em React e APIs modernas:

\`\`\`javascript
// Forma antiga
function createGoal(data) {
  const title = data.title
  const targetAmount = data.targetAmount
  const coupleId = data.coupleId
  // ...
}

// Com destructuring (muito mais limpo!)
function createGoal({ title, targetAmount, coupleId }) {
  console.log(title)        // Acesso direto
  console.log(targetAmount)
  console.log(coupleId)
}

// Usando
createGoal({
  title: 'Viajar',
  targetAmount: 10000,
  coupleId: 123
})
\`\`\`

### Com Valores Padrão

\`\`\`javascript
function fetchGoals({ page = 1, limit = 10, status = 'active' } = {}) {
  console.log(\`Buscando página \${page}, \${limit} por página, status: \${status}\`)
}

fetchGoals() // Usa todos os padrões
fetchGoals({ page: 2 }) // Sobrescreve só page
fetchGoals({ page: 3, limit: 20 }) // Sobrescreve page e limit
\`\`\`

## Spread Operator (...)

O spread "espalha" elementos de um array ou objeto.

### Spread em Arrays

\`\`\`javascript
const goals1 = ['Paris', 'Casa']
const goals2 = ['Carro', 'Moto']

// Combinar arrays
const allGoals = [...goals1, ...goals2]
console.log(allGoals) // ['Paris', 'Casa', 'Carro', 'Moto']

// Adicionar elementos
const moreGoals = ['Viagem', ...goals1, 'Computador']
// ['Viagem', 'Paris', 'Casa', 'Computador']
\`\`\`

### Copiar Arrays

\`\`\`javascript
const original = [1, 2, 3]
const copy = [...original]

copy.push(4)
console.log(original) // [1, 2, 3] (inalterado)
console.log(copy)     // [1, 2, 3, 4]
\`\`\`

### Spread em Objetos

\`\`\`javascript
const user = { id: 1, name: 'João' }
const address = { city: 'SP', country: 'Brasil' }

// Combinar objetos
const complete = { ...user, ...address }
// { id: 1, name: 'João', city: 'SP', country: 'Brasil' }

// Sobrescrever propriedades
const updated = { ...user, name: 'João Silva' }
// { id: 1, name: 'João Silva' }
\`\`\`

### Copiar Objetos

\`\`\`javascript
const original = { name: 'João', age: 25 }
const copy = { ...original }

copy.age = 26
console.log(original.age) // 25 (inalterado)
console.log(copy.age)     // 26
\`\`\`

**ATENÇÃO:** Spread faz cópia rasa (shallow copy)!

\`\`\`javascript
const original = {
  name: 'João',
  address: { city: 'SP' }
}

const copy = { ...original }

// Modificar objeto aninhado afeta ambos!
copy.address.city = 'RJ'
console.log(original.address.city) // 'RJ' (mudou!)
\`\`\`

## Rest Parameters em Funções

Rest pega "o resto" dos parâmetros:

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0)
}

sum(1, 2, 3)       // 6
sum(1, 2, 3, 4, 5) // 15
\`\`\`

### Combinando com Parâmetros Normais

\`\`\`javascript
function createGoal(title, ...options) {
  console.log('Título:', title)
  console.log('Opções:', options)
}

createGoal('Viajar', 'urgente', 'viagem', 'lazer')
// Título: Viajar
// Opções: ['urgente', 'viagem', 'lazer']
\`\`\`

## Exemplos Práticos no Quple

### API Response Handling

\`\`\`javascript
async function getGoal(goalId) {
  const response = await fetch(\`/api/goals/\${goalId}\`)
  const { data, error } = await response.json()

  if (error) {
    throw new Error(error)
  }

  return data
}
\`\`\`

### Atualizar Objeto Imutavelmente

\`\`\`javascript
const goal = {
  id: 1,
  title: 'Viajar',
  progress: 50
}

// Atualiza progress mantendo resto inalterado
const updated = {
  ...goal,
  progress: 75
}

console.log(goal.progress)    // 50 (inalterado)
console.log(updated.progress) // 75
\`\`\`

### Remover Propriedade de Objeto

\`\`\`javascript
const user = {
  id: 123,
  name: 'João',
  email: 'joao@email.com',
  password: 'secret'
}

// Remove password do objeto
const { password, ...safeUser } = user

console.log(safeUser)
// { id: 123, name: 'João', email: 'joao@email.com' }
\`\`\`

### Merge de Configurações

\`\`\`javascript
const defaultConfig = {
  timeout: 5000,
  retries: 3,
  cache: true
}

function fetchData(url, userConfig = {}) {
  const config = { ...defaultConfig, ...userConfig }
  console.log('Config final:', config)
}

fetchData('/api/goals', { timeout: 10000 })
// Config final: { timeout: 10000, retries: 3, cache: true }
\`\`\`

### Props em React Components

\`\`\`javascript
function GoalCard({ title, progress, ...otherProps }) {
  return (
    <div {...otherProps}>
      <h2>{title}</h2>
      <ProgressBar value={progress} />
    </div>
  )
}

// Usando
<GoalCard
  title="Viajar"
  progress={75}
  className="card"
  onClick={handleClick}
/>
\`\`\`

## Dicas de Ouro

1. **Use destructuring em parâmetros** - Torna função mais clara
2. **Spread para copiar** - Melhor que Object.assign()
3. **Rest para flexibilidade** - Aceita número variável de argumentos
4. **Cuidado com cópia rasa** - Objetos aninhados são referências
5. **Combine spread e novos valores** - Padrão comum para updates imutáveis

## Resumo

- ✅ **Destructuring** - Extrai valores de arrays/objetos
- ✅ **Spread (...)** - Expande elementos
- ✅ **Rest (...)** - Coleta "o resto"
- ✅ Valores padrão em destructuring
- ✅ Rename ao destructurar objetos
- ✅ Spread faz cópia rasa (shallow)
- ✅ Muito usado em React e APIs modernas

Destructuring e spread tornam código JavaScript muito mais elegante!
          `,
          codeExample: `// Exemplos práticos combinados - Quple API
class QupleAPI {
  // Destructuring em parâmetros com defaults
  async fetchGoals({ page = 1, limit = 10, status = 'active' } = {}) {
    const params = new URLSearchParams({ page, limit, status })
    const response = await fetch(\`/api/goals?\${params}\`)
    const { data, error } = await response.json()

    if (error) throw new Error(error)
    return data
  }

  // Spread para merge de dados
  async updateGoal(goalId, updates) {
    const goal = await this.getGoal(goalId)

    const updated = {
      ...goal,
      ...updates,
      updatedAt: new Date()
    }

    return this.saveGoal(updated)
  }

  // Rest parameter
  async createGoals(...goalsData) {
    const promises = goalsData.map(data => this.createGoal(data))
    return Promise.all(promises)
  }
}

// Usando
const api = new QupleAPI()

// Destructuring da resposta
const { data: goals } = await api.fetchGoals({ page: 2 })

// Spread para adicionar campos
const newGoal = {
  ...existingGoal,
  progress: 75,
  lastUpdate: Date.now()
}

// Rest em array de resultados
const [first, second, ...others] = goals
console.log(\`Primeiros dois: \${first.title}, \${second.title}\`)
console.log(\`Restantes: \${others.length}\`)`
        },

        {
          id: 'arrow-functions',
          title: 'Arrow Functions e Lexical This',
          type: 'theory',
          content: `
# Arrow Functions e Lexical This

Arrow functions (=>) são uma sintaxe mais curta para escrever funções em JavaScript. Mas elas não são apenas "açúcar sintático" - têm comportamento diferente de funções normais, especialmente com \`this\`.

## Sintaxe Básica

\`\`\`javascript
// Função normal
function sum(a, b) {
  return a + b
}

// Arrow function
const sum = (a, b) => {
  return a + b
}

// Arrow function curta (return implícito)
const sum = (a, b) => a + b

// Um parâmetro (parênteses opcionais)
const double = n => n * 2

// Sem parâmetros (parênteses obrigatórios)
const getRandom = () => Math.random()
\`\`\`

## Return Implícito

Se a função tem apenas uma expressão, o \`return\` é implícito:

\`\`\`javascript
// Com return explícito
const add = (a, b) => {
  return a + b
}

// Com return implícito (mais comum)
const add = (a, b) => a + b

// Retornar objeto (precisa de parênteses!)
const createUser = (name, age) => ({ name, age })

// ❌ ERRO - interpreta {} como bloco de código
const createUser = (name, age) => { name, age }
\`\`\`

## Lexical This (A Grande Diferença)

Arrow functions **não têm seu próprio \`this\`**. Elas herdam o \`this\` do contexto onde foram definidas:

\`\`\`javascript
// Problema com função normal
const goal = {
  title: 'Viajar para Paris',
  activities: ['Pesquisar', 'Economizar', 'Comprar'],

  printActivities() {
    this.activities.forEach(function(activity) {
      // ❌ ERRO: this é undefined aqui!
      console.log(\`\${this.title}: \${activity}\`)
    })
  }
}

// Solução antiga: bind ou variável self
const goal = {
  title: 'Viajar para Paris',
  activities: ['Pesquisar', 'Economizar', 'Comprar'],

  printActivities() {
    // Opção 1: self = this
    const self = this
    this.activities.forEach(function(activity) {
      console.log(\`\${self.title}: \${activity}\`)
    })

    // Opção 2: .bind(this)
    this.activities.forEach(function(activity) {
      console.log(\`\${this.title}: \${activity}\`)
    }.bind(this))
  }
}

// Solução moderna: arrow function
const goal = {
  title: 'Viajar para Paris',
  activities: ['Pesquisar', 'Economizar', 'Comprar'],

  printActivities() {
    // ✅ Arrow function herda this do método
    this.activities.forEach(activity => {
      console.log(\`\${this.title}: \${activity}\`)
    })
  }
}
\`\`\`

## Quando Usar Arrow Functions

### ✅ USE arrow functions para:

**1. Callbacks de array methods**
\`\`\`javascript
const goals = [
  { title: 'Paris', progress: 60 },
  { title: 'Casa', progress: 30 }
]

// Filtrar
const completed = goals.filter(g => g.progress === 100)

// Mapear
const titles = goals.map(g => g.title)

// Reduzir
const total = goals.reduce((sum, g) => sum + g.progress, 0)
\`\`\`

**2. Event handlers que precisam de this**
\`\`\`javascript
class GoalTracker {
  constructor() {
    this.goals = []

    // ✅ Arrow function - this é a instância
    button.addEventListener('click', () => {
      this.addGoal()
    })
  }

  addGoal() {
    this.goals.push({ title: 'Novo objetivo' })
  }
}
\`\`\`

**3. Promises e async/await**
\`\`\`javascript
fetchGoals()
  .then(goals => goals.filter(g => g.progress > 50))
  .then(filtered => console.log(filtered))
  .catch(error => console.error(error))
\`\`\`

### ❌ NÃO use arrow functions para:

**1. Métodos de objeto (perdem this)**
\`\`\`javascript
// ❌ RUIM
const goal = {
  title: 'Viajar',
  progress: 60,
  getInfo: () => {
    // this é undefined ou window!
    return \`\${this.title}: \${this.progress}%\`
  }
}

// ✅ BOM
const goal = {
  title: 'Viajar',
  progress: 60,
  getInfo() {
    return \`\${this.title}: \${this.progress}%\`
  }
}
\`\`\`

**2. Construtores (dá erro)**
\`\`\`javascript
// ❌ ERRO! Arrow functions não podem ser construtores
const User = (name) => {
  this.name = name
}

const user = new User('João') // TypeError!
\`\`\`

**3. Funções que usam \`arguments\`**
\`\`\`javascript
// ❌ Arrow functions não têm arguments
const sum = () => {
  console.log(arguments) // ReferenceError!
}

// ✅ Use rest parameters
const sum = (...numbers) => {
  console.log(numbers) // [1, 2, 3]
  return numbers.reduce((a, b) => a + b)
}
\`\`\`

## Exemplos Práticos no Quple

### Event Handlers com State

\`\`\`javascript
class Dashboard {
  constructor() {
    this.goals = []
    this.loading = false
  }

  async loadGoals() {
    this.loading = true

    try {
      const response = await fetch('/api/goals')
      const data = await response.json()

      // ✅ Arrow function - this é Dashboard
      this.goals = data.map(g => ({
        ...g,
        formattedProgress: \`\${g.progress}%\`
      }))
    } finally {
      this.loading = false
    }
  }

  setupEventListeners() {
    // ✅ Arrow function preserva this
    refreshButton.addEventListener('click', () => {
      this.loadGoals()
    })
  }
}
\`\`\`

### Array Processing

\`\`\`javascript
const goals = [
  { id: 1, title: 'Paris', progress: 60, priority: 'high' },
  { id: 2, title: 'Casa', progress: 30, priority: 'medium' },
  { id: 3, title: 'Carro', progress: 90, priority: 'high' }
]

// Filtrar, ordenar e mapear em cadeia
const result = goals
  .filter(g => g.priority === 'high')
  .sort((a, b) => b.progress - a.progress)
  .map(g => ({
    title: g.title,
    percentage: \`\${g.progress}%\`
  }))

console.log(result)
// [
//   { title: 'Carro', percentage: '90%' },
//   { title: 'Paris', percentage: '60%' }
// ]
\`\`\`

### Promises e Error Handling

\`\`\`javascript
async function loadDashboard() {
  return fetch('/api/goals')
    .then(response => {
      if (!response.ok) throw new Error('Falha ao carregar')
      return response.json()
    })
    .then(goals => goals.filter(g => g.active))
    .then(activeGoals => {
      console.log('Objetivos ativos:', activeGoals)
      return activeGoals
    })
    .catch(error => {
      console.error('Erro:', error)
      return []
    })
}
\`\`\`

## Comparação Completa

\`\`\`javascript
// Função normal
function normalFunction(x) {
  return x * 2
}

// Arrow function equivalente
const arrowFunction = x => x * 2

// Principais diferenças:
// 1. this - Arrow não tem próprio this
// 2. arguments - Arrow não tem arguments
// 3. new - Arrow não pode ser construtor
// 4. super - Arrow não tem super
// 5. prototype - Arrow não tem prototype
\`\`\`

## Dicas de Ouro

1. **Use arrow para callbacks** - Especialmente array methods
2. **Use function para métodos** - Precisa de this próprio
3. **Arrow herda this** - Útil em event handlers
4. **Return implícito** - Use quando possível (mais limpo)
5. **Parênteses em objetos** - \`() => ({ key: value })\`

## Resumo

- ✅ Arrow function: \`(a, b) => a + b\`
- ✅ Herda this do contexto (lexical this)
- ✅ Return implícito para expressões únicas
- ✅ Perfeita para callbacks e promises
- ❌ Não use para métodos de objeto
- ❌ Não pode ser construtor
- ❌ Não tem arguments

Arrow functions são essenciais no JavaScript moderno!
          `,
          codeExample: `// Exemplos práticos - Quple Dashboard
class QupleDashboard {
  constructor() {
    this.goals = []
    this.filters = { status: 'active', priority: 'all' }
  }

  // ✅ Método normal (precisa de this)
  async loadGoals() {
    const response = await fetch('/api/goals')
    const data = await response.json()

    // ✅ Arrow functions em array methods
    this.goals = data
      .filter(g => g.status === this.filters.status)
      .map(g => ({
        ...g,
        percentage: \`\${g.progress}%\`,
        daysLeft: this.calculateDaysLeft(g.targetDate)
      }))
      .sort((a, b) => b.progress - a.progress)
  }

  // ✅ Método normal
  calculateDaysLeft(targetDate) {
    const diff = new Date(targetDate) - new Date()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // ✅ Método normal
  setupEvents() {
    // ✅ Arrow function - preserva this
    refreshButton.addEventListener('click', () => {
      this.loadGoals()
    })

    // ✅ Arrow function com parâmetro
    filterSelect.addEventListener('change', (e) => {
      this.filters.status = e.target.value
      this.loadGoals()
    })
  }

  // ✅ Método normal
  getHighPriority() {
    // ✅ Arrow function em filter
    return this.goals.filter(g => g.priority === 'high')
  }
}

// Uso
const dashboard = new QupleDashboard()
dashboard.loadGoals()
dashboard.setupEvents()`
        },

        {
          id: 'template-literals',
          title: 'Template Literals e Optional Chaining',
          type: 'theory',
          content: `
# Template Literals, Optional Chaining e Nullish Coalescing

Recursos ES6+ que tornam trabalhar com strings e objetos muito mais simples e seguro.

## Template Literals (Template Strings)

Usar crases (\\\`) ao invés de aspas permite interpolar variáveis e criar strings multi-linha:

\`\`\`javascript
// Forma antiga (concatenação)
const name = 'João'
const age = 25
const message = 'Olá, meu nome é ' + name + ' e tenho ' + age + ' anos'

// Com template literals
const message = \`Olá, meu nome é \${name} e tenho \${age} anos\`
\`\`\`

### Expressões em Template Literals

\`\`\`javascript
const goal = { title: 'Paris', progress: 60, target: 10000, current: 6000 }

const status = \`Objetivo: \${goal.title}
Progresso: \${goal.progress}%
Faltam: R$ \${goal.target - goal.current}
Status: \${goal.progress >= 100 ? 'Completo' : 'Em andamento'}\`
\`\`\`

### Strings Multi-linha

\`\`\`javascript
// Forma antiga (horrível!)
const html = '<div>' +
  '  <h1>Título</h1>' +
  '  <p>Parágrafo</p>' +
  '</div>'

// Com template literals
const html = \`
  <div>
    <h1>Título</h1>
    <p>Parágrafo</p>
  </div>
\`
\`\`\`

## Optional Chaining (?.)

Acessa propriedades aninhadas sem medo de \`undefined\`/\`null\`:

\`\`\`javascript
const user = {
  name: 'João',
  address: {
    city: 'São Paulo'
  }
}

// Forma antiga (verboso!)
const city = user && user.address && user.address.city

// Com optional chaining
const city = user?.address?.city

// Se user ou address for null/undefined, retorna undefined
const country = user?.address?.country // undefined (sem erro!)
\`\`\`

### Optional Chaining com Arrays

\`\`\`javascript
const goals = [
  { id: 1, activities: [{ name: 'Pesquisar' }] }
]

// Acessar array element
const firstGoal = goals?.[0]

// Acessar propriedade aninhada
const firstActivity = goals?.[0]?.activities?.[0]?.name
\`\`\`

### Optional Chaining com Funções

\`\`\`javascript
const user = {
  name: 'João',
  getAddress: function() {
    return 'São Paulo'
  }
}

// Chama função se existir
const address = user.getAddress?.() // 'São Paulo'

// Se não existir, retorna undefined
const phone = user.getPhone?.() // undefined (sem erro!)
\`\`\`

## Nullish Coalescing (??)

Retorna o lado direito se o esquerdo for \`null\` ou \`undefined\`:

\`\`\`javascript
// || considera falsy (0, '', false, null, undefined)
const limit = 0 || 10 // 10 (0 é falsy)

// ?? considera apenas null/undefined
const limit = 0 ?? 10 // 0 (0 não é null/undefined)
const limit = null ?? 10 // 10
const limit = undefined ?? 10 // 10
\`\`\`

### Diferença entre || e ??

\`\`\`javascript
const config = {
  timeout: 0,
  retries: false,
  cache: ''
}

// Com || (errado - considera falsy)
const timeout = config.timeout || 5000 // 5000 (0 é falsy)
const retries = config.retries || 3 // 3 (false é falsy)
const cache = config.cache || 'default' // 'default' ('' é falsy)

// Com ?? (correto - apenas null/undefined)
const timeout = config.timeout ?? 5000 // 0 ✅
const retries = config.retries ?? 3 // false ✅
const cache = config.cache ?? 'default' // '' ✅
\`\`\`

## Logical Assignment Operators (ES2021)

Atribuição com lógica combinada:

\`\`\`javascript
// ||= (atribui se falsy)
let x = 0
x ||= 10 // x = 10 (0 é falsy)

// ??= (atribui se null/undefined)
let y = 0
y ??= 10 // y = 0 (0 não é null/undefined)

// &&= (atribui se truthy)
let obj = { value: 10 }
obj.value &&= 20 // obj.value = 20 (10 é truthy)
\`\`\`

## Exemplos Práticos no Quple

### API Response com Optional Chaining

\`\`\`javascript
async function loadDashboard(userId) {
  const response = await fetch(\`/api/users/\${userId}\`)
  const data = await response.json()

  // Safe access com optional chaining
  const userName = data?.user?.name ?? 'Usuário'
  const goalCount = data?.goals?.length ?? 0
  const firstGoalTitle = data?.goals?.[0]?.title ?? 'Sem objetivos'
  const lastActivity = data?.activities?.at(-1)?.title

  return { userName, goalCount, firstGoalTitle, lastActivity }
}
\`\`\`

### Configuração com Defaults

\`\`\`javascript
function createGoal(data) {
  return {
    id: data?.id ?? generateId(),
    title: data?.title ?? 'Sem título',
    progress: data?.progress ?? 0,
    targetAmount: data?.targetAmount ?? 10000,
    createdAt: data?.createdAt ?? new Date(),
    tags: data?.tags ?? []
  }
}
\`\`\`

### Templates para UI

\`\`\`javascript
function renderGoalCard(goal) {
  const percentage = Math.round((goal.current / goal.target) * 100)

  return \`
    <div class="goal-card">
      <h3>\${goal.title}</h3>
      <p>Progresso: \${percentage}%</p>
      <p>R$ \${goal.current?.toLocaleString()} / R$ \${goal.target?.toLocaleString()}</p>
      <p>Criado por: \${goal.creator?.name ?? 'Anônimo'}</p>
      <p>Status: \${percentage >= 100 ? '✅ Completo' : '⏳ Em andamento'}</p>
    </div>
  \`
}
\`\`\`

## Dicas de Ouro

1. **Use template literals para strings** - Muito mais legível que concatenação
2. **?. para acessar propriedades** - Evita erros de null/undefined
3. **?? para defaults** - Melhor que || quando 0 ou '' são válidos
4. **Combine ?. e ??** - Código seguro e limpo
5. **?.() para funções opcionais** - Chama apenas se existir

## Resumo

- ✅ Template literals: \\\`String \${var}\\\`
- ✅ Multi-linha nativa
- ✅ Optional chaining (?.): acesso seguro a propriedades
- ✅ Nullish coalescing (??): default apenas para null/undefined
- ✅ Logical assignment: ||=, ??=, &&=
- ✅ Combine para código robusto

Esses recursos tornam JavaScript muito mais seguro e expressivo!
          `,
          codeExample: `// Exemplo completo - Quple Dashboard
class QupleDashboard {
  async loadGoal(goalId) {
    const response = await fetch(\`/api/goals/\${goalId}\`)
    const data = await response.json()

    // Optional chaining + nullish coalescing
    const goal = {
      id: data?.id ?? goalId,
      title: data?.title ?? 'Sem título',
      progress: data?.progress ?? 0,
      target: data?.target ?? 10000,
      current: data?.current ?? 0,
      activities: data?.activities ?? [],
      creator: data?.creator?.name ?? 'Anônimo',
      partner: data?.partner?.name ?? 'Sem parceiro'
    }

    // Template literal para render
    this.render(goal)
  }

  render(goal) {
    const percentage = Math.round((goal.current / goal.target) * 100)
    const remaining = goal.target - goal.current

    // Template literal multi-linha
    const html = \`
      <div class="goal-card \${percentage >= 100 ? 'complete' : 'in-progress'}">
        <h2>\${goal.title}</h2>
        <div class="progress">
          <div class="bar" style="width: \${percentage}%"></div>
        </div>
        <p>Progresso: \${percentage}%</p>
        <p>Faltam: R$ \${remaining.toLocaleString('pt-BR')}</p>
        <p>Criado por: \${goal.creator}</p>
        <p>Parceiro: \${goal.partner}</p>
        <p>Atividades: \${goal.activities?.length ?? 0}</p>
        <p>Status: \${percentage >= 100 ? '✅ Concluído' : '⏳ Em andamento'}</p>
      </div>
    \`

    document.getElementById('dashboard').innerHTML = html
  }
}

// Uso
const dashboard = new QupleDashboard()
dashboard.loadGoal(123)`
        },

        {
          id: 'modules',
          title: 'ES6 Modules',
          type: 'theory',
          content: `
# ES6 Modules (import/export)

Modules permitem organizar código em arquivos separados e importar apenas o necessário. É o padrão moderno do JavaScript.

## Export

Exportar valores, funções, classes de um módulo:

\`\`\`javascript
// api.js

// Named exports
export const API_URL = 'https://api.quple.com'
export const TIMEOUT = 5000

export function fetchGoals() {
  return fetch(\`\${API_URL}/goals\`)
}

export class QupleAPI {
  constructor() {
    this.baseURL = API_URL
  }
}

// Ou exportar tudo de uma vez
const API_URL = 'https://api.quple.com'
const TIMEOUT = 5000
function fetchGoals() { /* ... */ }
class QupleAPI { /* ... */ }

export { API_URL, TIMEOUT, fetchGoals, QupleAPI }
\`\`\`

## Import

Importar valores de outros módulos:

\`\`\`javascript
// app.js

// Importar named exports
import { API_URL, fetchGoals, QupleAPI } from './api.js'

// Importar com alias
import { API_URL as apiUrl, fetchGoals as getGoals } from './api.js'

// Importar tudo como namespace
import * as API from './api.js'
console.log(API.API_URL)
API.fetchGoals()
\`\`\`

## Default Export

Cada módulo pode ter um export default:

\`\`\`javascript
// qupleAPI.js

export default class QupleAPI {
  constructor() {
    this.baseURL = 'https://api.quple.com'
  }

  fetchGoals() {
    return fetch(\`\${this.baseURL}/goals\`)
  }
}

// Ou função
export default function createAPI() {
  return new QupleAPI()
}
\`\`\`

### Import Default

\`\`\`javascript
// Nome pode ser qualquer um (não precisa corresponder)
import QupleAPI from './qupleAPI.js'
import API from './qupleAPI.js' // Também funciona
import MeuNome from './qupleAPI.js' // Qualquer nome!

const api = new QupleAPI()
\`\`\`

## Combinando Named e Default

\`\`\`javascript
// api.js
export const API_URL = 'https://api.quple.com'
export const TIMEOUT = 5000

export default class QupleAPI {
  // ...
}

// app.js
import QupleAPI, { API_URL, TIMEOUT } from './api.js'
\`\`\`

## Dynamic Imports

Importar sob demanda (lazy loading):

\`\`\`javascript
// Importação estática (sempre carrega)
import { heavyFunction } from './utils.js'

// Importação dinâmica (só quando necessário)
button.addEventListener('click', async () => {
  const { heavyFunction } = await import('./utils.js')
  heavyFunction()
})

// Uso prático
async function loadDashboard() {
  const { QupleAPI } = await import('./api.js')
  const api = new QupleAPI()
  return await api.fetchGoals()
}
\`\`\`

## Re-export

Exportar imports de outros módulos:

\`\`\`javascript
// index.js (barrel export)
export { fetchGoals, createGoal } from './goals.js'
export { fetchUsers, createUser } from './users.js'
export { default as QupleAPI } from './api.js'

// app.js - importa tudo de um lugar só
import { fetchGoals, fetchUsers, QupleAPI } from './index.js'
\`\`\`

## Módulos no Browser

\`\`\`html
<!-- Precisa de type="module" -->
<script type="module">
  import { QupleAPI } from './api.js'
  const api = new QupleAPI()
</script>

<!-- Ou arquivo externo -->
<script type="module" src="./app.js"></script>
\`\`\`

### Características de Modules no Browser

- Sempre em strict mode
- Escopo próprio (não poluem global)
- Defer por padrão (não bloqueiam HTML)
- CORS habilitado (precisa de servidor)

## Exemplo Completo: Estrutura do Quple

\`\`\`javascript
// types.js
export interface Goal {
  id: number
  title: string
  progress: number
}

// api.js
export const API_URL = 'https://api.quple.com'

export class QupleAPI {
  async fetchGoals() {
    const res = await fetch(\`\${API_URL}/goals\`)
    return await res.json()
  }

  async createGoal(data) {
    const res = await fetch(\`\${API_URL}/goals\`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return await res.json()
  }
}

export default new QupleAPI()

// utils.js
export function formatCurrency(value) {
  return \`R$ \${value.toLocaleString('pt-BR')}\`
}

export function calculateProgress(current, target) {
  return Math.round((current / target) * 100)
}

// dashboard.js
import api from './api.js'
import { formatCurrency, calculateProgress } from './utils.js'

export class Dashboard {
  async load() {
    const goals = await api.fetchGoals()

    goals.forEach(goal => {
      const progress = calculateProgress(goal.current, goal.target)
      const formatted = formatCurrency(goal.current)
      console.log(\`\${goal.title}: \${progress}% - \${formatted}\`)
    })
  }
}

// app.js
import { Dashboard } from './dashboard.js'

const dashboard = new Dashboard()
dashboard.load()
\`\`\`

## CommonJS vs ES Modules

\`\`\`javascript
// CommonJS (Node.js antigo)
const fs = require('fs')
module.exports = { myFunction }

// ES Modules (moderno)
import fs from 'fs'
export { myFunction }

// Node.js: pode usar ambos
// package.json: { "type": "module" } para ES Modules
\`\`\`

## Dicas de Ouro

1. **Use named exports para múltiplos valores** - Mais flexível
2. **Default export para o principal** - Uma "coisa" por arquivo
3. **Barrel exports (index.js)** - Simplifica imports
4. **Dynamic import para lazy loading** - Melhora performance
5. **Extension obrigatória no browser** - Sempre inclua .js

## Resumo

- ✅ \`export { name }\` - Named export
- ✅ \`export default value\` - Default export
- ✅ \`import { name } from './module.js'\` - Named import
- ✅ \`import value from './module.js'\` - Default import
- ✅ \`import * as name from './module.js'\` - Namespace import
- ✅ \`await import('./module.js')\` - Dynamic import
- ✅ Organize código em módulos pequenos e focados

Modules são essenciais para aplicações JavaScript modernas!
          `,
          codeExample: `// Exemplo completo de organização modular - Quple

// api/config.js
export const API_URL = 'https://api.quple.com'
export const API_TIMEOUT = 10000

// api/client.js
import { API_URL, API_TIMEOUT } from './config.js'

export class APIClient {
  constructor() {
    this.baseURL = API_URL
    this.timeout = API_TIMEOUT
  }

  async request(endpoint, options = {}) {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`)
    }

    return await response.json()
  }
}

export default new APIClient()

// api/goals.js
import client from './client.js'

export async function fetchGoals() {
  return client.request('/goals')
}

export async function createGoal(data) {
  return client.request('/goals', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

// api/index.js (barrel export)
export * from './goals.js'
export { default as client } from './client.js'
export { API_URL, API_TIMEOUT } from './config.js'

// app.js - Uso
import { fetchGoals, createGoal, API_URL } from './api/index.js'

async function init() {
  console.log('API:', API_URL)
  const goals = await fetchGoals()
  console.log('Objetivos:', goals)
}

init()`
        }
      ]
    }
  ]
}
