'use client'

import { useState } from 'react'
import { signUpWithEmail } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'
import { useSnackbar } from '@/components/ui/Snackbar'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { refreshUser } = useAuth()
  const { showSnackbar, SnackbarComponent } = useSnackbar()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Nome validation - simples e claro
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres'
    }

    // Email validation - padrão
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Senha validation - requisitos claros
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres'
    }

    // Confirmar senha - deve ser igual
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem'
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
      // Registrar no Supabase - simples e claro
      const { user, error } = await signUpWithEmail(
        formData.email,
        formData.senha,
        formData.nome
      )

      if (error) {
        // Mostrar erro de forma amigável
        if (error.includes('already registered')) {
          setErrors({
            email: 'Este email já está cadastrado. Tente fazer login!'
          })
        } else {
          setErrors({
            senha: 'Erro ao criar conta. Verifique os dados e tente novamente.'
          })
        }
        return
      }

      if (user) {
        // Sucesso! Mostrar snackbar de sucesso
        showSnackbar('🎉 Conta criada com sucesso! Bem-vindo ao React Playground!', 'success')

        // Recarregar dados do usuário
        await refreshUser()

        // Aguardar um pouco para o usuário ver a mensagem antes de redirecionar
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      }

    } catch (error) {
      console.error('Erro no registro:', error)
      setErrors({
        senha: 'Erro inesperado. Tente novamente em alguns instantes.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4 inline-block btn-primary-gradient px-4 py-2 rounded-full text-sm">
              ✨ React Learning Playground
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Criar Conta
            </h1>
            <p className="text-muted-foreground">
              Preencha os dados para começar sua jornada
            </p>
          </div>

          {/* Registration Form - Simples e Educativo */}
          <div className="glass-card rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome Completo */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
                  Como você gostaria de ser chamado? *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    errors.nome ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Ex: João, Maria, Alex..."
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Seu melhor email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    errors.email ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Usaremos para enviar seu progresso e novidades
                </p>
              </div>

              {/* Senha */}
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-foreground mb-2">
                  Crie uma senha segura *
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    errors.senha ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.senha && (
                  <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
                )}
              </div>

              {/* Confirmar Senha */}
              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-foreground mb-2">
                  Confirme sua senha *
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-input border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    errors.confirmarSenha ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="Digite a senha novamente"
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-muted cursor-not-allowed text-muted-foreground'
                    : 'btn-primary-gradient text-white'
                }`}
              >
                {isSubmitting ? '⏳ Criando conta...' : '✨ Criar Conta'}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Já tem uma conta?{' '}
                <a href="/auth/login" className="text-primary premium-hover font-medium">
                  Fazer login
                </a>
              </p>
            </div>
          </div>

          {/* Back to Auth */}
          <div className="text-center mt-8">
            <a
              href="/auth"
              className="text-primary premium-hover text-sm transition-colors"
            >
              ← Voltar
            </a>
          </div>
        </div>
      </div>

      {/* Snackbar Component */}
      <SnackbarComponent />
    </div>
  )
}