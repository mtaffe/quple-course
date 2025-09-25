'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface QupleRegisterProps {
  brokenState?: 'no-structure' | 'missing-fields' | 'no-links' | 'bad-hierarchy' | 'no-style' | 'no-flex' | 'no-responsive' | 'no-toggle' | 'no-validation' | 'working'
}

export function QupleRegister({ brokenState = 'working' }: QupleRegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    partnerEmail: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres'
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Senha deve conter: maiúscula, minúscula, número'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
    }

    // Partner email validation
    if (formData.partnerEmail && !emailRegex.test(formData.partnerEmail)) {
      newErrors.partnerEmail = 'Email do parceiro inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert('🎉 Conta criada com sucesso!')
    }
  }

  // Estado sem estrutura HTML - desafio 1
  if (brokenState === 'no-structure') {
    return (
      <div>
        Quple - Cadastro
        Criar sua conta
        Nome
        Email
        Senha
        Confirmar Senha
        Email do Parceiro (opcional)
        Criar Conta
        Já tem conta? Entrar
      </div>
    )
  }

  // Estado com campos faltantes - desafio 2
  if (brokenState === 'missing-fields') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              💕 Quple - Cadastro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Senha faltando */}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Criar Conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estado com links quebrados - desafio 3
  if (brokenState === 'no-links') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              💕 Quple - Cadastro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Sua senha segura"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite a senha novamente"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Criar Conta
              </Button>

              <div className="text-center text-sm text-gray-600">
                Já tem conta?
                {/* Link quebrado */}
                <span className="text-purple-600 underline cursor-pointer ml-1">
                  Entrar
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estado com hierarquia HTML bagunçada - desafio 4
  if (brokenState === 'bad-hierarchy') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent>
            <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
              💕 Quple - Cadastro
            </h1>

            <form onSubmit={handleSubmit}>
              <h3 className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </h3>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                placeholder="Seu nome completo"
              />

              <h2 className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </h2>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                placeholder="seu@email.com"
              />

              <h4 className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </h4>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                placeholder="Sua senha segura"
              />

              <h1 className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </h1>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                placeholder="Digite a senha novamente"
              />

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 mb-4">
                Criar Conta
              </Button>

              <h2 className="text-center text-sm text-gray-600">
                Já tem conta?
                <a href="/quple-login" className="text-purple-600 hover:underline ml-1">
                  Entrar
                </a>
              </h2>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estado sem estilos CSS - desafio 5
  if (brokenState === 'no-style') {
    return (
      <div>
        <div>
          <div>
            <header>
              <h1>💕 Quple - Cadastro</h1>
              <p>Criar sua conta no Quple</p>
            </header>

            <main>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span>{errors.email}</span>}
                </div>

                <div>
                  <label>Senha</label>
                  <div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Sua senha segura"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️‍🗨️' : '👁️'}
                    </button>
                  </div>
                  {errors.password && <span>{errors.password}</span>}
                </div>

                <div>
                  <label>Confirmar Senha</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Digite a senha novamente"
                  />
                  {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                </div>

                <div>
                  <label>Email do Parceiro (opcional)</label>
                  <input
                    type="email"
                    value={formData.partnerEmail}
                    onChange={(e) => handleInputChange('partnerEmail', e.target.value)}
                    placeholder="parceiro@email.com"
                  />
                  {errors.partnerEmail && <span>{errors.partnerEmail}</span>}
                </div>

                <button type="submit">Criar Conta</button>

                <div>
                  Já tem conta?
                  <a href="/quple-login">Entrar</a>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    )
  }

  // Estado sem flexbox - desafio 6
  if (brokenState === 'no-flex') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-center text-purple-700">
              💕 Quple - Cadastro
            </h1>
            <p className="text-center text-gray-600 mt-2">Criar sua conta no Quple</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                {/* Sem flexbox - elementos desalinhados */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Sua senha segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Criar Conta
              </Button>

              <div className="text-center text-sm text-gray-600">
                Já tem conta?
                <a href="/quple-login" className="text-purple-600 hover:underline ml-1">
                  Entrar
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Estado não responsivo - desafio 7
  if (brokenState === 'no-responsive') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        {/* Tamanho fixo - não responsivo */}
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              💕 Quple - Cadastro
            </CardTitle>
            <p className="text-center text-gray-600">Criar sua conta no Quple</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    placeholder="Sua senha segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Criar Conta
              </Button>

              <div className="text-center text-sm text-gray-600">
                Já tem conta?
                <a href="/quple-login" className="text-purple-600 hover:underline ml-1">
                  Entrar
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estado sem toggle de senha - desafio 8
  if (brokenState === 'no-toggle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              💕 Quple - Cadastro
            </CardTitle>
            <p className="text-center text-gray-600">Criar sua conta no Quple</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                {/* Sem botão de toggle - apenas password */}
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Sua senha segura"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite a senha novamente"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Criar Conta
              </Button>

              <div className="text-center text-sm text-gray-600">
                Já tem conta?
                <a href="/quple-login" className="text-purple-600 hover:underline ml-1">
                  Entrar
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estado sem validação - desafio 9
  if (brokenState === 'no-validation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-700">
              💕 Quple - Cadastro
            </CardTitle>
            <p className="text-center text-gray-600">Criar sua conta no Quple</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                    placeholder="Sua senha segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️‍🗨️' : '👁️'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite a senha novamente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email do Parceiro (opcional)
                </label>
                <input
                  type="email"
                  value={formData.partnerEmail}
                  onChange={(e) => handleInputChange('partnerEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="parceiro@email.com"
                />
              </div>

              {/* Sem validação - qualquer coisa passa */}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Criar Conta
              </Button>

              <div className="text-center text-sm text-gray-600">
                Já tem conta?
                <a href="/quple-login" className="text-purple-600 hover:underline ml-1">
                  Entrar
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Estado funcionando completamente - versão final
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-700">
            💕 Quple - Cadastro
          </CardTitle>
          <p className="text-center text-gray-600">Criar sua conta no Quple</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                  placeholder="Sua senha segura"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Digite a senha novamente"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email do Parceiro (opcional)
              </label>
              <input
                type="email"
                value={formData.partnerEmail}
                onChange={(e) => handleInputChange('partnerEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="parceiro@email.com"
              />
              {errors.partnerEmail && (
                <p className="text-red-500 text-xs mt-1">{errors.partnerEmail}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Criar Conta
            </Button>

            <div className="text-center text-sm text-gray-600">
              Já tem conta?
              <a href="/quple-login" className="text-purple-600 hover:underline ml-1">
                Entrar
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}