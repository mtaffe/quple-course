'use client'

import { Video, Calendar, Clock, ChevronRight } from 'lucide-react'
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from '@/components/ui/premium-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { PremiumBadge } from '@/components/ui/premium-badge'

interface NextLiveClassProps {
  date?: string
  time?: string
  topic?: string
  meetingLink?: string
}

export function NextLiveClass({ 
  date = 'Terça, 22 de Outubro',
  time = '19:00',
  topic = 'Flexbox na Prática: Construindo Layouts Modernos',
  meetingLink
}: NextLiveClassProps) {
  const hasClass = !!meetingLink

  return (
    <PremiumCard glow className="border-violet-500/20">
      <PremiumCardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Video className="h-5 w-5 text-violet-400" />
              <PremiumCardTitle>Próxima Aula ao Vivo</PremiumCardTitle>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </div>
            </div>
          </div>
          <PremiumBadge variant="info" glow>Ao Vivo</PremiumBadge>
        </div>
      </PremiumCardHeader>
      
      <PremiumCardContent>
        <p className="text-foreground mb-4">{topic}</p>
        
        <div className="flex gap-3">
          {hasClass ? (
            <>
              <PremiumButton variant="primary" glow className="flex-1">
                <Video className="h-4 w-4 mr-2" />
                Entrar na Sala
              </PremiumButton>
              <PremiumButton variant="outline">
                Ver Tópicos
                <ChevronRight className="h-4 w-4 ml-1" />
              </PremiumButton>
            </>
          ) : (
            <PremiumButton variant="outline" className="w-full" disabled>
              Aguardando agendamento
            </PremiumButton>
          )}
        </div>
      </PremiumCardContent>
    </PremiumCard>
  )
}
