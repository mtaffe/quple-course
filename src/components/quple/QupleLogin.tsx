'use client'

import { useState } from 'react'

interface QupleLoginProps {
  broken?: 'no-structure' | 'missing-fields' | 'no-links' | 'bad-hierarchy' | 'no-style' | 'no-flex' | 'no-responsive' | 'no-toggle' | 'no-validation'
  className?: string
}

export function QupleLogin({ broken, className = '' }: QupleLoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    age: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    if (broken === 'no-validation') return {}

    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = 'Email é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'

    if (!formData.password) newErrors.password = 'Senha é obrigatória'
    else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres'

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      alert('Login simulado com sucesso!')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validação em tempo real (exceto quando quebrada)
    if (broken !== 'no-validation') {
      const newErrors = validateForm()
      setErrors(newErrors)
    }
  }

  // Renderização para diferentes estados "quebrados"
  if (broken === 'no-structure') {
    return (
      <div className={className}>
        <div>Quple - Login</div>
        <div>Email:</div>
        <div>Senha:</div>
        <div>Entrar</div>
        <div>O app para casais</div>
      </div>
    )
  }

  if (broken === 'missing-fields') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center ${className}`}>
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">Quple</h1>
            <p className="text-gray-600">O app para casais</p>
          </header>

          <main>
            <h2 className="text-xl font-semibold mb-6">Crie sua conta</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Campos faltantes serão adicionados no desafio */}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Criar Conta
              </button>
            </form>
          </main>
        </div>
      </div>
    )
  }

  if (broken === 'no-links') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 ${className}`}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-purple-600">Quple</h1>
            <nav className="space-x-6">
              {/* Links quebrados - sem href */}
              <a className="text-gray-700 hover:text-purple-600">Dashboard</a>
              <a className="text-gray-700 hover:text-purple-600">Perfil</a>
              <a className="text-gray-700 hover:text-purple-600">Objetivos</a>
              <a className="text-gray-700 hover:text-purple-600">Configurações</a>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Bem-vindo ao Quple!</h2>
          <p className="text-lg text-gray-600 mb-8">Gerencie seus objetivos como casal</p>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
            {/* Botões sem links */}
            <div className="space-x-4">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
                Criar Novo Objetivo
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
                Convidar Parceiro
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Objetivos Recentes</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                {/* Objetivo não clicável */}
                <span>Jantar romântico</span>
                <span className="text-green-600">Em progresso</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                <span>Viagem de fim de semana</span>
                <span className="text-blue-600">Concluído</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    )
  }

  if (broken === 'bad-hierarchy') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 ${className}`}>
        <div className="bg-white shadow-sm p-4">
          {/* Hierarquia incorreta */}
          <h3 className="text-lg font-bold text-purple-600">Quple</h3>
          <div className="flex space-x-6 mt-2">
            <span>Dashboard</span>
            <span>Perfil</span>
            <span>Objetivos</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl mb-4">Seus Objetivos</h1>

          <div className="mb-8">
            <h4 className="text-xl mb-4">Objetivos Ativos</h4>

            <div className="bg-white p-6 rounded-lg shadow mb-4">
              <h2 className="text-lg font-semibold mb-2">Jantar Romântico</h2>
              <div className="text-gray-600">Planeje um jantar especial para vocês dois</div>
              <div className="text-sm text-gray-500 mt-2">Status: Em Progresso</div>
            </div>
          </div>

          <div>
            <h4 className="text-xl mb-4">Objetivos Concluídos</h4>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Primeira Viagem</h2>
              <div className="text-gray-600">Nossa primeira viagem como casal</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (broken === 'no-style') {
    return (
      <div className={className}>
        <header>
          <h1>Quple</h1>
          <p>O app para casais</p>
        </header>

        <main>
          <section>
            <h2>Bem-vindos ao Quple!</h2>
            <p>Construam objetivos juntos e fortaleçam sua relação</p>
            <button>Começar Agora</button>
          </section>

          <section>
            <h3>Por que usar o Quple?</h3>
            <div>
              <div>
                <h4>Objetivos Compartilhados</h4>
                <p>Criem e acompanhem objetivos juntos</p>
              </div>
              <div>
                <h4>Comunicação</h4>
                <p>Melhorem a comunicação no relacionamento</p>
              </div>
              <div>
                <h4>Progresso</h4>
                <p>Visualizem o crescimento como casal</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  if (broken === 'no-flex') {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        {/* Header sem flexbox */}
        <div className="bg-indigo-600 text-white p-4">
          <div className="text-2xl font-bold">Quple</div>
          <div className="space-x-4 mt-2">
            <a href="#dashboard" className="text-white">Dashboard</a>
            <a href="#objectives" className="text-white">Objetivos</a>
            <a href="#profile" className="text-white">Perfil</a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {/* Cards empilhados sem flex */}
          <div className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow mb-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">12</div>
              <div className="text-gray-600">Objetivos Ativos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow mb-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">28</div>
              <div className="text-gray-600">Concluídos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow mb-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">85%</div>
              <div className="text-gray-600">Taxa de Sucesso</div>
            </div>
          </div>

          {/* Seção desalinhada */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Objetivos Recentes</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">
                + Adicionar Objetivo
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (broken === 'no-responsive') {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="bg-indigo-600 text-white p-8 flex justify-between items-center">
          <div className="text-4xl font-bold">Quple</div>
          <nav className="flex space-x-8">
            <a href="#home" className="text-xl">Home</a>
            <a href="#features" className="text-xl">Features</a>
            <a href="#about" className="text-xl">Sobre</a>
            <a href="#contact" className="text-xl">Contato</a>
          </nav>
        </div>

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-16 px-8">
          <h1 className="text-6xl font-bold mb-4">Construam o Amor Juntos</h1>
          <p className="text-2xl mb-8 opacity-90">
            O Quple ajuda casais a definirem e alcançarem objetivos compartilhados
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full text-xl font-semibold">
            Começar Agora
          </button>
        </section>

        <main className="max-w-6xl mx-auto py-16 px-8">
          <div className="flex gap-8 mb-16">
            <div className="flex-1 bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-indigo-600">10K+</div>
              <div className="text-lg">Casais Ativos</div>
            </div>
            <div className="flex-1 bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-indigo-600">50K+</div>
              <div className="text-lg">Objetivos Concluídos</div>
            </div>
            <div className="flex-1 bg-white p-8 rounded-lg shadow text-center">
              <div className="text-4xl font-bold text-indigo-600">95%</div>
              <div className="text-lg">Satisfação</div>
            </div>
          </div>

          <section>
            <h2 className="text-4xl text-center mb-12 font-bold">Por que escolher o Quple?</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">💕</div>
                <h3 className="text-2xl font-semibold mb-4">Objetivos Compartilhados</h3>
                <p className="text-lg">Definam metas juntos e acompanhem o progresso</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-semibold mb-4">Sempre Conectados</h3>
                <p className="text-lg">Sincronização em tempo real entre dispositivos</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold mb-4">Gamificação</h3>
                <p className="text-lg">Ganhem pontos e conquistas por cada objetivo</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  if (broken === 'no-toggle') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ${className}`}>
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-600 mb-2">Quple</h1>
            <p className="text-gray-600">Entre na sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha:
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Digite sua senha"
                  required
                />
                {/* Botão de toggle será adicionado no desafio */}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-lg"
            >
              Entrar
            </button>

            <div className="text-center">
              <a href="#forgot" className="text-indigo-600 hover:underline text-sm">
                Esqueceu sua senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Versão completa e funcional (default)
  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ${className}`}>
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Quple</h1>
          <p className="text-gray-600">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                errors.email
                  ? 'border-red-300 bg-red-50'
                  : formData.email && !errors.email
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300'
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="seu@email.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${
                  errors.password
                    ? 'border-red-300 bg-red-50'
                    : formData.password && !errors.password
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={Object.keys(errors).length > 0 || !formData.email || !formData.password}
          >
            Entrar
          </button>

          <div className="text-center">
            <a href="#forgot" className="text-indigo-600 hover:underline text-sm">
              Esqueceu sua senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}