'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Star, Trophy, Zap, Target, Clock, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Achievement {
  id: string
  type: 'goal' | 'badge' | 'streak' | 'xp' | 'level' | 'challenge'
  title: string
  description: string
  value?: number
  icon?: JSX.Element
  color?: string
  celebration?: 'normal' | 'special' | 'epic'
}

interface CelebrationToastProps {
  achievement: Achievement | null
  onClose: () => void
  duration?: number
}

export function CelebrationToast({ achievement, onClose, duration = 5000 }: CelebrationToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      setIsLeaving(false)

      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [achievement, duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  if (!achievement || !isVisible) return null

  const getAchievementConfig = (achievement: Achievement) => {
    switch (achievement.type) {
      case 'goal':
        return {
          icon: <Target className="h-6 w-6" />,
          bgColor: 'from-green-500 to-emerald-500',
          borderColor: 'border-green-500/50',
          emoji: '🎯',
          title: 'Meta Concluída!',
          particleColor: 'bg-green-400'
        }
      case 'badge':
        return {
          icon: <Trophy className="h-6 w-6" />,
          bgColor: 'from-yellow-500 to-orange-500',
          borderColor: 'border-yellow-500/50',
          emoji: '🏆',
          title: 'Nova Conquista!',
          particleColor: 'bg-yellow-400'
        }
      case 'streak':
        return {
          icon: <Zap className="h-6 w-6" />,
          bgColor: 'from-purple-500 to-pink-500',
          borderColor: 'border-purple-500/50',
          emoji: '🔥',
          title: 'Sequência Mantida!',
          particleColor: 'bg-purple-400'
        }
      case 'level':
        return {
          icon: <Star className="h-6 w-6" />,
          bgColor: 'from-blue-500 to-indigo-500',
          borderColor: 'border-blue-500/50',
          emoji: '⭐',
          title: 'Nível Subiu!',
          particleColor: 'bg-blue-400'
        }
      case 'challenge':
        return {
          icon: <BookOpen className="h-6 w-6" />,
          bgColor: 'from-teal-500 to-cyan-500',
          borderColor: 'border-teal-500/50',
          emoji: '🚀',
          title: 'Desafio Concluído!',
          particleColor: 'bg-teal-400'
        }
      default:
        return {
          icon: <Star className="h-6 w-6" />,
          bgColor: 'from-gray-500 to-slate-500',
          borderColor: 'border-gray-500/50',
          emoji: '✨',
          title: 'Parabéns!',
          particleColor: 'bg-gray-400'
        }
    }
  }

  const config = getAchievementConfig(achievement)
  const isSpecial = achievement.celebration === 'special' || achievement.celebration === 'epic'
  const isEpic = achievement.celebration === 'epic'

  return (
    <>
      {/* Backdrop for epic celebrations */}
      {isEpic && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-none" />
      )}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <div
          className={cn(
            "relative max-w-sm w-full transform transition-all duration-500 pointer-events-auto",
            isVisible && !isLeaving ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95",
            isEpic && "scale-110"
          )}
        >
          {/* Particles for special celebrations */}
          {isSpecial && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: isEpic ? 12 : 6 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute w-2 h-2 rounded-full animate-ping",
                    config.particleColor
                  )}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* Main Toast */}
          <div
            className={cn(
              "relative glass-card rounded-xl border-2 overflow-hidden shadow-2xl",
              config.borderColor
            )}
          >
            {/* Animated background gradient */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r opacity-20 animate-pulse",
              config.bgColor
            )} />

            {/* Shine effect for epic celebrations */}
            {isEpic && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
            )}

            <div className="relative z-10 p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full bg-gradient-to-r text-white shadow-lg",
                    config.bgColor,
                    isEpic && "animate-bounce"
                  )}>
                    {achievement.icon || config.icon}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "text-2xl",
                        isEpic && "animate-bounce"
                      )}>
                        {config.emoji}
                      </span>
                      <h3 className="font-bold text-foreground text-sm">
                        {config.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.title}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <p className="text-sm text-foreground font-medium">
                  {achievement.description}
                </p>

                {achievement.value && (
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r",
                      config.bgColor
                    )}>
                      +{achievement.value} XP
                    </div>
                  </div>
                )}

                {/* Epic celebration message */}
                {isEpic && (
                  <div className="mt-3 p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                    <p className="text-xs text-center font-medium text-yellow-200">
                      🌟 Conquista Épica! Continue assim! 🌟
                    </p>
                  </div>
                )}
              </div>

              {/* Progress indicator */}
              <div className="mt-3">
                <div className="w-full bg-muted/50 rounded-full h-1">
                  <div
                    className={cn(
                      "h-1 rounded-full bg-gradient-to-r transition-all duration-300",
                      config.bgColor
                    )}
                    style={{ width: isVisible ? '100%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sound effect indicator (visual only) */}
      {isSpecial && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className={cn(
            "text-6xl animate-bounce",
            isEpic ? "animate-pulse" : ""
          )}>
            {config.emoji}
          </div>
        </div>
      )}
    </>
  )
}

// Hook para usar o sistema de celebração
export function useCelebration() {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)

  const celebrate = useCallback((achievement: Achievement) => {
    setCurrentAchievement(achievement)
  }, [])

  const clearCelebration = useCallback(() => {
    setCurrentAchievement(null)
  }, [])

  return {
    currentAchievement,
    celebrate,
    clearCelebration,
    CelebrationComponent: () => (
      <CelebrationToast
        achievement={currentAchievement}
        onClose={clearCelebration}
      />
    )
  }
}