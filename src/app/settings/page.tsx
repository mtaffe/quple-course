'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { PersonalizationSettings } from '@/components/settings/PersonalizationSettings'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/auth'
import { Button } from '@/components/ui/Button'
import { UserCircle, LogOut, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  const { student, loading, clearUser } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'personalization' | 'notifications' | 'privacy'>('profile')

  const handleLogout = async () => {
    const confirmLogout = confirm('Tem certeza que deseja sair?')
    if (!confirmLogout) return

    try {
      await signOut()
      clearUser()
      alert('👋 Logout realizado com sucesso!')
      window.location.href = '/'
    } catch (error) {
      console.error('Erro no logout:', error)
      alert('Erro ao fazer logout')
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: UserCircle },
    { id: 'personalization', label: 'Personalização', icon: Palette },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
  ]

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Configurações ⚙️
        </h1>
        <p className="text-muted-foreground">
          Personalize sua experiência e gerencie suas preferências.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Navegação */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'profile' | 'personalization' | 'notifications' | 'privacy')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Perfil do Usuário</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
                  <input
                    type="text"
                    value={student?.name || ''}
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={student?.email || ''}
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">XP Total</label>
                    <input
                      type="text"
                      value={student?.total_xp || 0}
                      readOnly
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Desafio Atual</label>
                    <input
                      type="text"
                      value={student?.current_challenge || 0}
                      readOnly
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Fazer Logout</span>
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'personalization' && (
            <PersonalizationSettings studentId={student?.id || ''} />
          )}

          {activeTab === 'notifications' && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Notificações</h2>
              <p className="text-muted-foreground">Configurações de notificação em desenvolvimento...</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Privacidade</h2>
              <p className="text-muted-foreground">Configurações de privacidade em desenvolvimento...</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}