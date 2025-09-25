'use client'

import { useState } from 'react'
import { signInWithEmail } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { refreshUser } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Senha validation
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Fazer login real com Supabase
      const { user, error } = await signInWithEmail(formData.email, formData.senha)

      if (error) {
        // Mostrar erro de forma amigável
        setErrors({
          senha: 'Email ou senha incorretos. Tente novamente!'
        })
        return
      }

      if (user) {
        // Sucesso! Recarregar dados do usuário
        await refreshUser()

        // Mostrar mensagem de sucesso
        alert('🎉 Login realizado com sucesso!')

        // Redirecionar para dashboard
        window.location.href = '/dashboard'
      }

    } catch (error) {
      console.error('Erro no login:', error)
      setErrors({
        senha: 'Erro inesperado. Tente novamente em alguns instantes.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    const email = prompt('Digite seu email para recuperar a senha:')
    if (email) {
      // TODO: Implement password reset
      console.log('Password reset for:', email)
      alert('Email de recuperação enviado!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4 inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm">
              ✨ React Learning Playground
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Fazer Login
            </h1>
            <p className="text-gray-600">
              Entre na sua conta para continuar aprendendo
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.senha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Sua senha"
                />
                {errors.senha && (
                  <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Esqueci minha senha
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? '⏳ Entrando...' : '🔐 Entrar'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Não tem uma conta?{' '}
                <a href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Criar conta nova
                </a>
              </p>
            </div>
          </div>

          {/* Demo Access */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mt-6">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Acesso Demo
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Experimente o sistema sem criar uma conta
              </p>
              <a
                href="/dashboard"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                🚀 Modo Demo
              </a>
            </div>
          </div>

          {/* Back to Auth */}
          <div className="text-center mt-8">
            <a
              href="/auth"
              className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
            >
              ← Voltar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}