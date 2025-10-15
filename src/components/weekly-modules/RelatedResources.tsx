'use client'

import Link from 'next/link'
import { Library, ExternalLink, ChevronRight } from 'lucide-react'
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription, PremiumCardContent } from '@/components/ui/premium-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { PremiumBadge } from '@/components/ui/premium-badge'

interface Resource {
  id: string
  title: string
  description: string
  category: string
}

interface RelatedResourcesProps {
  weekNumber: number
  resources: Resource[]
}

export function RelatedResources({ weekNumber, resources }: RelatedResourcesProps) {
  if (!resources || resources.length === 0) return null

  return (
    <PremiumCard className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
      <PremiumCardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Library className="h-5 w-5 text-blue-400" />
          <PremiumCardTitle>Materiais de Apoio</PremiumCardTitle>
        </div>
        <PremiumCardDescription>
          Recursos complementares para aprofundar seu conhecimento sobre os tópicos desta semana
        </PremiumCardDescription>
      </PremiumCardHeader>
      
      <PremiumCardContent className="space-y-3">
        {resources.map((resource) => (
          <Link
            key={resource.id}
            href={`/learn/${resource.id}`}
            className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h4>
                  <PremiumBadge variant="info" size="sm">{resource.category}</PremiumBadge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </div>
          </Link>
        ))}

        <Link href="/recursos" className="block mt-4">
          <PremiumButton variant="outline" className="w-full">
            Ver Todos os Recursos
            <ExternalLink className="h-4 w-4 ml-2" />
          </PremiumButton>
        </Link>
      </PremiumCardContent>
    </PremiumCard>
  )
}
