'use client'

import { BookOpen, Code, ArrowRight } from 'lucide-react'

interface ContentNavigationProps {
  currentContext: 'challenge' | 'learn'
  challengeId?: number
  topicSlug?: string
  className?: string
}

// Mapeamento entre desafios e conteúdos relacionados
const challengeToTopicMap: Record<number, string> = {
  1: 'html-fundamentals',
  2: 'html-fundamentals',
  3: 'html-fundamentals',
  4: 'html-fundamentals',
  5: 'css-basics',
  6: 'css-basics',
  7: 'css-basics',
  8: 'js-fundamentals',
  9: 'js-fundamentals',
  10: 'js-fundamentals'
}

const topicToChallengeMap: Record<string, number[]> = {
  'html-fundamentals': [1, 2, 3, 4],
  'css-basics': [5, 6, 7],
  'js-fundamentals': [8, 9, 10]
}

const topicNames: Record<string, string> = {
  'html-fundamentals': 'HTML Fundamentos',
  'css-basics': 'CSS Essencial',
  'js-fundamentals': 'JavaScript Base'
}

export function ContentNavigation({
  currentContext,
  challengeId,
  topicSlug,
  className = ''
}: ContentNavigationProps) {

  if (currentContext === 'challenge' && challengeId) {
    const relatedTopic = challengeToTopicMap[challengeId]

    if (!relatedTopic) return null

    return (
      <div className={`glass-card rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">
                Aprofunde seu conhecimento
              </div>
              <div className="text-xs text-muted-foreground">
                {topicNames[relatedTopic]}
              </div>
            </div>
          </div>

          <a
            href={`/learn/${relatedTopic}`}
            className="flex items-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg font-medium transition-colors premium-hover"
          >
            <span className="text-sm">Ver Teoria</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    )
  }

  if (currentContext === 'learn' && topicSlug) {
    const relatedChallenges = topicToChallengeMap[topicSlug]

    if (!relatedChallenges) return null

    return (
      <div className={`glass-card rounded-lg p-4 ${className}`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Code className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  Pratique o que aprendeu
                </div>
                <div className="text-xs text-muted-foreground">
                  {relatedChallenges.length} desafios relacionados
                </div>
              </div>
            </div>

            <a
              href="/dashboard"
              className="flex items-center space-x-2 bg-accent/10 hover:bg-accent/20 text-accent px-3 py-2 rounded-lg font-medium transition-colors premium-hover"
            >
              <span className="text-sm">Ver Desafios</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Challenge Quick Links */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            {relatedChallenges.map((challengeNum) => (
              <a
                key={challengeNum}
                href={`/challenge/${challengeNum}`}
                className="flex items-center space-x-1 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground px-2 py-1 rounded text-xs transition-colors"
              >
                <span>Desafio {challengeNum}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}