'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'

interface QupleDashboardProps {
  brokenState?: 'no-structure' | 'missing-fields' | 'no-links' | 'bad-hierarchy' | 'no-style' | 'no-flex' | 'no-responsive' | 'no-toggle' | 'no-validation' | 'working'
}

export function QupleDashboard({ brokenState = 'working' }: QupleDashboardProps) {
  const [user] = useState({
    name: 'João',
    partnerName: 'Maria',
    relationshipDays: 365,
    completedGoals: 12,
    totalGoals: 20
  })

  const [goals] = useState([
    { id: 1, title: 'Jantar romântico', completed: true, dueDate: '2024-12-01', category: 'romance' },
    { id: 2, title: 'Viajar para a praia', completed: false, dueDate: '2024-12-25', category: 'viagem' },
    { id: 3, title: 'Assistir série juntos', completed: true, dueDate: '2024-11-30', category: 'casa' },
    { id: 4, title: 'Fazer exercícios juntos', completed: false, dueDate: '2024-12-10', category: 'saude' },
    { id: 5, title: 'Cozinhar juntos', completed: false, dueDate: '2024-12-05', category: 'casa' }
  ])

  const completionRate = Math.round((user.completedGoals / user.totalGoals) * 100)

  // Move all useState hooks to top level to comply with React hooks rules
  const [localGoalsNoValidation, setLocalGoalsNoValidation] = useState(goals)
  const [localGoalsFinal, setLocalGoalsFinal] = useState(goals)

  // Estado sem estrutura HTML - desafio 1
  if (brokenState === 'no-structure') {
    return (
      <div>
        Quple - Dashboard
        Bem-vindos, João & Maria!
        365 dias juntos
        12 objetivos concluídos
        20 objetivos totais
        60% completo
        Jantar romântico - Concluído
        Viajar para a praia - Pendente
        Assistir série juntos - Concluído
        Fazer exercícios juntos - Pendente
        Cozinhar juntos - Pendente
        Adicionar Objetivo
        Perfil
        Configurações
        Sair
      </div>
    )
  }

  // Estado com campos faltantes - desafio 2
  if (brokenState === 'missing-fields') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-purple-700">
                💕 Quple
              </CardTitle>
              <p className="text-center text-gray-600">
                Bem-vindos, {user.name} & {user.partnerName}!
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{user.relationshipDays}</div>
                  <p className="text-sm text-gray-600">Dias Juntos</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{user.completedGoals}</div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
                {/* Total de objetivos faltando */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objetivos do Casal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        readOnly
                        className="rounded"
                      />
                      <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                      {goal.completed ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado com links quebrados - desafio 3
  if (brokenState === 'no-links') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700">💕 Quple</h1>
            <div className="flex gap-4">
              {/* Links quebrados */}
              <span className="text-purple-600 cursor-pointer">Perfil</span>
              <span className="text-purple-600 cursor-pointer">Configurações</span>
              <span className="text-red-600 cursor-pointer">Sair</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700">
                Bem-vindos, {user.name} & {user.partnerName}! 💕
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{user.relationshipDays}</div>
                  <p className="text-sm text-gray-600">Dias Juntos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{user.completedGoals}</div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{user.totalGoals}</div>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Objetivos do Casal</CardTitle>
                {/* Botão sem link */}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  + Adicionar Objetivo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        readOnly
                        className="rounded"
                      />
                      <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </Badge>
                      <span className="text-xs text-gray-500">{goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado com hierarquia HTML bagunçada - desafio 4
  if (brokenState === 'bad-hierarchy') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-700">💕 Quple</h3>
            <div className="flex gap-4">
              <a href="/quple-profile" className="text-purple-600 hover:underline">Perfil</a>
              <a href="/quple-settings" className="text-purple-600 hover:underline">Configurações</a>
              <a href="/quple-login" className="text-red-600 hover:underline">Sair</a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <Card>
            <CardContent>
              <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">
                Bem-vindos, {user.name} & {user.partnerName}! 💕
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <h2 className="text-3xl font-bold text-purple-600">{user.relationshipDays}</h2>
                  <h4 className="text-sm text-gray-600">Dias Juntos</h4>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-green-600">{user.completedGoals}</h1>
                  <h2 className="text-sm text-gray-600">Concluídos</h2>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-600">{user.totalGoals}</h3>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>

              <div className="mt-6">
                <Progress value={completionRate} className="h-3" />
                <h6 className="text-center mt-2 font-semibold text-purple-700">
                  {completionRate}% completo! 🎉
                </h6>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Objetivos do Casal</h2>
                <a href="/quple-add-goal">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    + Adicionar Objetivo
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        readOnly
                        className="rounded"
                      />
                      <h4 className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </Badge>
                      <h6 className="text-xs text-gray-500">{goal.dueDate}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado sem estilos CSS - desafio 5
  if (brokenState === 'no-style') {
    return (
      <div>
        <nav>
          <div>
            <h1>💕 Quple</h1>
            <div>
              <a href="/quple-profile">Perfil</a>
              <a href="/quple-settings">Configurações</a>
              <a href="/quple-login">Sair</a>
            </div>
          </div>
        </nav>

        <main>
          <div>
            <header>
              <h1>Bem-vindos, {user.name} & {user.partnerName}! 💕</h1>
            </header>

            <section>
              <div>
                <div>
                  <div>{user.relationshipDays}</div>
                  <p>Dias Juntos</p>
                </div>
                <div>
                  <div>{user.completedGoals}</div>
                  <p>Concluídos</p>
                </div>
                <div>
                  <div>{user.totalGoals}</div>
                  <p>Total</p>
                </div>
              </div>

              <div>
                <progress value={completionRate} max="100"></progress>
                <p>{completionRate}% completo! 🎉</p>
              </div>
            </section>

            <section>
              <header>
                <h2>Objetivos do Casal</h2>
                <a href="/quple-add-goal">
                  <button>+ Adicionar Objetivo</button>
                </a>
              </header>

              <div>
                {goals.map((goal) => (
                  <div key={goal.id}>
                    <div>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        readOnly
                      />
                      <span className={goal.completed ? 'completed' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <div>
                      <span>
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </span>
                      <span>{goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    )
  }

  // Estado sem flexbox - desafio 6
  if (brokenState === 'no-flex') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-bold text-purple-700 mb-4">💕 Quple</h1>
            {/* Links sem flexbox - empilhados */}
            <div>
              <a href="/quple-profile" className="text-purple-600 hover:underline block mb-2">Perfil</a>
              <a href="/quple-settings" className="text-purple-600 hover:underline block mb-2">Configurações</a>
              <a href="/quple-login" className="text-red-600 hover:underline block">Sair</a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700">
                Bem-vindos, {user.name} & {user.partnerName}! 💕
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Stats sem flexbox - empilhados */}
              <div className="text-center space-y-4">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{user.relationshipDays}</div>
                  <p className="text-sm text-gray-600">Dias Juntos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{user.completedGoals}</div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{user.totalGoals}</div>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>

              <div className="mt-6">
                <Progress value={completionRate} className="h-3" />
                <p className="text-center mt-2 font-semibold text-purple-700">
                  {completionRate}% completo! 🎉
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              {/* Header sem flexbox - elementos empilhados */}
              <CardTitle className="text-xl font-semibold mb-4">Objetivos do Casal</CardTitle>
              <a href="/quple-add-goal">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  + Adicionar Objetivo
                </Button>
              </a>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
                    {/* Items sem flexbox - empilhados */}
                    <div className="mb-2">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        readOnly
                        className="rounded mr-3"
                      />
                      <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <div>
                      <Badge variant={goal.completed ? 'secondary' : 'outline'} className="mr-2">
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </Badge>
                      <span className="text-xs text-gray-500">{goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado não responsivo - desafio 7
  if (brokenState === 'no-responsive') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <nav className="bg-white shadow-sm p-4">
          {/* Navegação com largura fixa */}
          <div className="w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700">💕 Quple</h1>
            <div className="flex gap-4">
              <a href="/quple-profile" className="text-purple-600 hover:underline">Perfil</a>
              <a href="/quple-settings" className="text-purple-600 hover:underline">Configurações</a>
              <a href="/quple-login" className="text-red-600 hover:underline">Sair</a>
            </div>
          </div>
        </nav>

        {/* Container com largura fixa - não responsivo */}
        <div className="w-4xl mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700">
                Bem-vindos, {user.name} & {user.partnerName}! 💕
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Grid com 3 colunas fixas */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{user.relationshipDays}</div>
                  <p className="text-sm text-gray-600">Dias Juntos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{user.completedGoals}</div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{user.totalGoals}</div>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>

              <div className="mt-6">
                <Progress value={completionRate} className="h-3" />
                <p className="text-center mt-2 font-semibold text-purple-700">
                  {completionRate}% completo! 🎉
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Objetivos do Casal</CardTitle>
                <a href="/quple-add-goal">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    + Adicionar Objetivo
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        readOnly
                        className="rounded"
                      />
                      <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </Badge>
                      <span className="text-xs text-gray-500">{goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado sem toggle - desafio 8 (neste caso, sem funcionalidade interativa)
  if (brokenState === 'no-toggle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700">💕 Quple</h1>
            <div className="flex gap-4">
              <a href="/quple-profile" className="text-purple-600 hover:underline">Perfil</a>
              <a href="/quple-settings" className="text-purple-600 hover:underline">Configurações</a>
              <a href="/quple-login" className="text-red-600 hover:underline">Sair</a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700">
                Bem-vindos, {user.name} & {user.partnerName}! 💕
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{user.relationshipDays}</div>
                  <p className="text-sm text-gray-600">Dias Juntos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{user.completedGoals}</div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{user.totalGoals}</div>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>

              <div className="mt-6">
                <Progress value={completionRate} className="h-3" />
                <p className="text-center mt-2 font-semibold text-purple-700">
                  {completionRate}% completo! 🎉
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Objetivos do Casal</CardTitle>
                <a href="/quple-add-goal">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    + Adicionar Objetivo
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox sem funcionalidade de toggle */}
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        className="rounded"
                        disabled
                      />
                      <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </Badge>
                      <span className="text-xs text-gray-500">{goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado sem validação - desafio 9 (permitir ações sem verificação)
  if (brokenState === 'no-validation') {

    const toggleGoal = (id: number) => {
      // Sem validação - permite qualquer mudança
      setLocalGoalsNoValidation(prev => prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      ))
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700">💕 Quple</h1>
            <div className="flex gap-4">
              <a href="/quple-profile" className="text-purple-600 hover:underline">Perfil</a>
              <a href="/quple-settings" className="text-purple-600 hover:underline">Configurações</a>
              <a href="/quple-login" className="text-red-600 hover:underline">Sair</a>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700">
                Bem-vindos, {user.name} & {user.partnerName}! 💕
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{user.relationshipDays}</div>
                  <p className="text-sm text-gray-600">Dias Juntos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {localGoalsNoValidation.filter(g => g.completed).length}
                  </div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{localGoalsNoValidation.length}</div>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </div>

              <div className="mt-6">
                <Progress
                  value={Math.round((localGoalsNoValidation.filter(g => g.completed).length / localGoalsNoValidation.length) * 100)}
                  className="h-3"
                />
                <p className="text-center mt-2 font-semibold text-purple-700">
                  {Math.round((localGoalsNoValidation.filter(g => g.completed).length / localGoalsNoValidation.length) * 100)}% completo! 🎉
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">Objetivos do Casal</CardTitle>
                <a href="/quple-add-goal">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    + Adicionar Objetivo
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {localGoalsNoValidation.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {/* Sem validação - permite marcar/desmarcar sem verificação */}
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                        className="rounded"
                      />
                      <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                        {goal.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                        {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                      </Badge>
                      <span className="text-xs text-gray-500">{goal.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado funcionando completamente - versão final

  const toggleGoal = (id: number) => {
    // Com validação básica
    const goal = localGoalsFinal.find(g => g.id === id)
    if (!goal) return

    const confirm = window.confirm(
      goal.completed
        ? `Tem certeza que deseja desmarcar "${goal.title}"?`
        : `Parabéns! Você completou "${goal.title}"? 🎉`
    )

    if (confirm) {
      setLocalGoalsFinal(prev => prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      ))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-700">💕 Quple</h1>
          <div className="flex gap-4">
            <a href="/quple-profile" className="text-purple-600 hover:underline">Perfil</a>
            <a href="/quple-settings" className="text-purple-600 hover:underline">Configurações</a>
            <a href="/quple-login" className="text-red-600 hover:underline">Sair</a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              Bem-vindos, {user.name} & {user.partnerName}! 💕
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600">{user.relationshipDays}</div>
                <p className="text-sm text-gray-600">Dias Juntos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {localGoalsFinal.filter(g => g.completed).length}
                </div>
                <p className="text-sm text-gray-600">Concluídos</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{localGoalsFinal.length}</div>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>

            <div className="mt-6">
              <Progress
                value={Math.round((localGoalsFinal.filter(g => g.completed).length / localGoalsFinal.length) * 100)}
                className="h-3"
              />
              <p className="text-center mt-2 font-semibold text-purple-700">
                {Math.round((localGoalsFinal.filter(g => g.completed).length / localGoalsFinal.length) * 100)}% completo! 🎉
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold">Objetivos do Casal</CardTitle>
              <a href="/quple-add-goal">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  + Adicionar Objetivo
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {localGoalsFinal.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                      className="rounded"
                    />
                    <span className={goal.completed ? 'line-through text-gray-500' : ''}>
                      {goal.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={goal.completed ? 'secondary' : 'outline'}>
                      {goal.completed ? '✅ Concluído' : '⏳ Pendente'}
                    </Badge>
                    <span className="text-xs text-gray-500">{goal.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}