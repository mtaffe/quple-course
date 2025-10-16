'use client'

import { useState } from 'react'
import { Code, Clock, Trophy, ChevronDown, ChevronUp } from 'lucide-react'
import type { WeeklyChallenge } from '@/types/weekly-modules'
import { ChallengeEditor } from '@/components/challenge/ChallengeEditor'
import { cn } from '@/lib/utils'

interface InteractiveChallengesProps {
  challenges: WeeklyChallenge[]
}

export function InteractiveChallenges({ challenges }: InteractiveChallengesProps) {
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())

  const toggleChallenge = (challengeId: string) => {
    setExpandedChallengeId(prev => prev === challengeId ? null : challengeId)
  }

  const handleChallengeSuccess = (challengeId: string) => {
    setCompletedChallenges(prev => new Set(prev).add(challengeId))
  }

  return (
    <section className="glass-card p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <Code className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">5 Desafios Práticos</h2>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge, index) => {
          const isExpanded = expandedChallengeId === challenge.id
          const isCompleted = completedChallenges.has(challenge.id)
          // Use first step for display
          const firstStep = challenge.steps[0]

          return (
            <div
              key={challenge.id}
              className={cn(
                "border rounded-lg transition-all",
                isExpanded ? "border-primary" : "border-border",
                isCompleted && "bg-green-50/50 dark:bg-green-950/20"
              )}
            >
              {/* Challenge Header */}
              <button
                onClick={() => toggleChallenge(challenge.id)}
                className="w-full p-4 text-left hover:bg-muted/30 transition-colors rounded-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono text-muted-foreground">
                        #{index + 1}
                      </span>
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          challenge.difficulty === 'beginner' && "bg-green-500/20 text-green-600 dark:text-green-400",
                          challenge.difficulty === 'intermediate' && "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
                          challenge.difficulty === 'advanced' && "bg-red-500/20 text-red-600 dark:text-red-400"
                        )}
                      >
                        {challenge.difficulty === 'beginner'
                          ? 'Iniciante'
                          : challenge.difficulty === 'intermediate'
                            ? 'Intermediário'
                            : 'Avançado'}
                      </span>
                      {isCompleted && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600">
                          ✓ Completo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {challenge.estimatedMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        +{challenge.totalXP} XP
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>

              {/* Challenge Editor (Expandable) */}
              {isExpanded && firstStep && (
                <div className="border-t border-border p-4 bg-muted/10">
                  <ChallengeEditor
                    challenge={firstStep}
                    onSuccess={() => handleChallengeSuccess(challenge.id)}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
