'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface QupleObjectivesProps {
  brokenState?: 'no-structure' | 'missing-fields' | 'no-links' | 'bad-hierarchy' | 'no-style' | 'no-flex' | 'no-responsive' | 'no-toggle' | 'no-validation' | 'working'
}

export function QupleObjectives({ brokenState = 'working' }: QupleObjectivesProps) {
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'romance'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { id: 'romance', name: '💕 Romance', color: 'bg-red-100 text-red-800' },
    { id: 'viagem', name: '✈️ Viagem', color: 'bg-blue-100 text-blue-800' },
    { id: 'casa', name: '🏠 Casa', color: 'bg-green-100 text-green-800' },
    { id: 'saude', name: '💪 Saúde', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'diversao', name: '🎉 Diversão', color: 'bg-purple-100 text-purple-800' },
    { id: 'crescimento', name: '📚 Crescimento', color: 'bg-indigo-100 text-indigo-800' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setNewGoal(prev => ({ ...prev, [field]: value }))

    if (brokenState !== 'no-validation') {
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }
    }
  }

  const validateForm = () => {
    if (brokenState === 'no-validation') return true

    const newErrors: Record<string, string> = {}

    // Title validation
    if (!newGoal.title.trim()) {
      newErrors.title = 'Título é obrigatório'
    } else if (newGoal.title.length < 3) {
      newErrors.title = 'Título deve ter pelo menos 3 caracteres'
    } else if (newGoal.title.length > 50) {
      newErrors.title = 'Título deve ter no máximo 50 caracteres'
    }

    // Description validation
    if (!newGoal.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    } else if (newGoal.description.length < 10) {
      newErrors.description = 'Descrição deve ter pelo menos 10 caracteres'
    } else if (newGoal.description.length > 200) {
      newErrors.description = 'Descrição deve ter no máximo 200 caracteres'
    }

    // Due date validation
    if (!newGoal.dueDate) {
      newErrors.dueDate = 'Data limite é obrigatória'
    } else {
      const selectedDate = new Date(newGoal.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.dueDate = 'Data limite não pode ser no passado'
      }
    }

    // Category validation
    if (!newGoal.category) {
      newErrors.category = 'Categoria é obrigatória'
    } else if (!categories.find(cat => cat.id === newGoal.category)) {
      newErrors.category = 'Categoria inválida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert('🎉 Objetivo criado com sucesso!')
      // Reset form
      setNewGoal({ title: '', description: '', dueDate: '', category: 'romance' })
    }
  }

  // Estado sem estrutura HTML - desafio 1
  if (brokenState === 'no-structure') {
    return (
      <div>
        Quple - Adicionar Objetivo
        Criar novo objetivo do casal
        Título
        Descrição
        Data limite
        Categoria
        Romance
        Viagem
        Casa
        Saúde
        Diversão
        Crescimento
        Criar Objetivo
        Voltar ao Dashboard
      </div>
    )
  }

  // Estado com campos faltantes - desafio 2
  if (brokenState === 'missing-fields') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-purple-700">
                💕 Novo Objetivo do Casal
              </CardTitle>
              <p className="text-center text-gray-600">Vamos criar um novo objetivo juntos!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Objetivo
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Jantar romântico no restaurante favorito"
                  />
                </div>

                {/* Descrição faltando */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  🎯 Criar Objetivo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado com links quebrados - desafio 3
  if (brokenState === 'no-links') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header com link quebrado */}
          <div className="flex items-center gap-4">
            <span className="text-purple-600 cursor-pointer">← Voltar</span>
            <h1 className="text-2xl font-bold text-purple-700">Novo Objetivo</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center text-purple-700">
                💕 Criar Objetivo do Casal
              </CardTitle>
              <p className="text-center text-gray-600">Vamos planejar algo incrível juntos!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Objetivo
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Jantar romântico no restaurante favorito"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva os detalhes do seu objetivo..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Limite
                    </label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Botão cancelar sem link */}
                  <Button type="button" variant="outline" className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    🎯 Criar Objetivo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado com hierarquia HTML bagunçada - desafio 4
  if (brokenState === 'bad-hierarchy') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <a href="/quple-dashboard" className="text-purple-600 hover:underline">← Voltar</a>
            <h3 className="text-2xl font-bold text-purple-700">Novo Objetivo</h3>
          </div>

          <Card>
            <CardContent>
              <h1 className="text-xl font-bold text-center text-purple-700 mb-2">
                💕 Criar Objetivo do Casal
              </h1>
              <p className="text-center text-gray-600 mb-6">Vamos planejar algo incrível juntos!</p>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="block text-sm font-medium text-gray-700 mb-2">
                      Título do Objetivo
                    </h2>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Ex: Jantar romântico no restaurante favorito"
                    />
                    {errors.title && <h6 className="text-red-500 text-sm mt-1">{errors.title}</h6>}
                  </div>

                  <div>
                    <h4 className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </h4>
                    <textarea
                      value={newGoal.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Descreva os detalhes do seu objetivo..."
                      rows={4}
                    />
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h1 className="block text-sm font-medium text-gray-700 mb-2">
                        Data Limite
                      </h1>
                      <input
                        type="date"
                        value={newGoal.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      {errors.dueDate && <h5 className="text-red-500 text-sm mt-1">{errors.dueDate}</h5>}
                    </div>

                    <div>
                      <h3 className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </h3>
                      <select
                        value={newGoal.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a href="/quple-dashboard">
                      <Button type="button" variant="outline" className="flex-1">
                        Cancelar
                      </Button>
                    </a>
                    <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      🎯 Criar Objetivo
                    </Button>
                  </div>
                </div>
              </form>
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
          <a href="/quple-dashboard">← Voltar ao Dashboard</a>
          <h1>Novo Objetivo do Casal</h1>
        </nav>

        <main>
          <header>
            <h1>💕 Criar Objetivo do Casal</h1>
            <p>Vamos planejar algo incrível juntos!</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Título do Objetivo</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Jantar romântico no restaurante favorito"
              />
              {errors.title && <span>{errors.title}</span>}
            </div>

            <div>
              <label>Descrição</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva os detalhes do seu objetivo..."
                rows={4}
              />
              {errors.description && <span>{errors.description}</span>}
            </div>

            <div>
              <div>
                <label>Data Limite</label>
                <input
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
                {errors.dueDate && <span>{errors.dueDate}</span>}
              </div>

              <div>
                <label>Categoria</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <span>{errors.category}</span>}
              </div>
            </div>

            <div>
              <a href="/quple-dashboard">
                <button type="button">Cancelar</button>
              </a>
              <button type="submit">🎯 Criar Objetivo</button>
            </div>
          </form>

          <section>
            <h2>Dicas para Objetivos Incríveis</h2>
            <ul>
              <li>Seja específico e claro</li>
              <li>Defina uma data realista</li>
              <li>Escolha algo que ambos vão gostar</li>
              <li>Celebre quando completar!</li>
            </ul>
          </section>
        </main>
      </div>
    )
  }

  // Estado sem flexbox - desafio 6
  if (brokenState === 'no-flex') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header sem flexbox - elementos empilhados */}
          <div className="text-center">
            <a href="/quple-dashboard" className="text-purple-600 hover:underline block mb-4">
              ← Voltar ao Dashboard
            </a>
            <h1 className="text-2xl font-bold text-purple-700">Novo Objetivo do Casal</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center text-purple-700">
                💕 Criar Objetivo do Casal
              </CardTitle>
              <p className="text-center text-gray-600">Vamos planejar algo incrível juntos!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Objetivo
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Jantar romântico no restaurante favorito"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva os detalhes do seu objetivo..."
                    rows={4}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Campos sem flexbox - empilhados verticalmente */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Limite
                    </label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>
                </div>

                {/* Botões sem flexbox - empilhados */}
                <div className="space-y-3">
                  <a href="/quple-dashboard" className="block">
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </a>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    🎯 Criar Objetivo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado não responsivo - desafio 7
  if (brokenState === 'no-responsive') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        {/* Container com largura fixa - não responsivo */}
        <div className="w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <a href="/quple-dashboard" className="text-purple-600 hover:underline">
              ← Voltar ao Dashboard
            </a>
            <h1 className="text-2xl font-bold text-purple-700">Novo Objetivo do Casal</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center text-purple-700">
                💕 Criar Objetivo do Casal
              </CardTitle>
              <p className="text-center text-gray-600">Vamos planejar algo incrível juntos!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Objetivo
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Ex: Jantar romântico no restaurante favorito"
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Descreva os detalhes do seu objetivo..."
                    rows={4}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Grid fixo com 2 colunas - quebra em mobile */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Limite
                    </label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    />
                    {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="/quple-dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full text-sm">
                      Cancelar
                    </Button>
                  </a>
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-sm">
                    🎯 Criar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado sem toggle/interatividade - desafio 8
  if (brokenState === 'no-toggle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <a href="/quple-dashboard" className="text-purple-600 hover:underline">
              ← Voltar ao Dashboard
            </a>
            <h1 className="text-2xl font-bold text-purple-700">Novo Objetivo do Casal</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center text-purple-700">
                💕 Criar Objetivo do Casal
              </CardTitle>
              <p className="text-center text-gray-600">Vamos planejar algo incrível juntos!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Objetivo
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Jantar romântico no restaurante favorito"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva os detalhes do seu objetivo..."
                    rows={4}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Limite
                    </label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    {/* Select sem interatividade/preview visual */}
                    <select
                      value={newGoal.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="/quple-dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </a>
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    🎯 Criar Objetivo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado sem validação - desafio 9
  if (brokenState === 'no-validation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <a href="/quple-dashboard" className="text-purple-600 hover:underline">
              ← Voltar ao Dashboard
            </a>
            <h1 className="text-2xl font-bold text-purple-700">Novo Objetivo do Casal</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center text-purple-700">
                💕 Criar Objetivo do Casal
              </CardTitle>
              <p className="text-center text-gray-600">Vamos planejar algo incrível juntos!</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Objetivo
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Jantar romântico no restaurante favorito"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descreva os detalhes do seu objetivo..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Limite
                    </label>
                    <input
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={newGoal.category === category.id ? 'default' : 'outline'}
                          className={`cursor-pointer ${category.color}`}
                          onClick={() => handleInputChange('category', category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sem validação - pode submeter qualquer coisa */}
                <div className="flex gap-4">
                  <a href="/quple-dashboard" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </a>
                  <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    🎯 Criar Objetivo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Estado funcionando completamente - versão final
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <a href="/quple-dashboard" className="text-purple-600 hover:underline">
            ← Voltar ao Dashboard
          </a>
          <h1 className="text-2xl font-bold text-purple-700">Novo Objetivo do Casal</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center text-purple-700">
              💕 Criar Objetivo do Casal
            </CardTitle>
            <p className="text-center text-gray-600">Vamos planejar algo incrível juntos!</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Objetivo
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Jantar romântico no restaurante favorito"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Descreva os detalhes do seu objetivo..."
                  rows={4}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Limite
                  </label>
                  <input
                    type="date"
                    value={newGoal.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={newGoal.category === category.id ? 'default' : 'outline'}
                        className={`cursor-pointer transition-colors hover:opacity-80 ${
                          newGoal.category === category.id ? category.color : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleInputChange('category', category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">💡 Dicas para Objetivos Incríveis</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Seja específico e claro sobre o que querem fazer</li>
                  <li>• Defina uma data realista e alcançável</li>
                  <li>• Escolha algo que ambos vão gostar e se divertir</li>
                  <li>• Celebrem juntos quando completarem o objetivo! 🎉</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <a href="/quple-dashboard" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </a>
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  🎯 Criar Objetivo
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}