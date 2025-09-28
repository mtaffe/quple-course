'use client'

import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { SocialDashboard } from '@/components/social/SocialDashboard'
import { useAuth } from '@/hooks/useAuth'

export default function SocialPage() {
  const { student, loading } = useAuth()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Social 👥
        </h1>
        <p className="text-muted-foreground">
          Conecte-se com outros estudantes, participe de grupos e desafios sociais.
        </p>
      </div>

      <SocialDashboard studentId={student?.id || ''} />
    </DashboardLayout>
  )
}