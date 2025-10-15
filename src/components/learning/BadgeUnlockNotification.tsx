/**
 * Badge Unlock Notification
 *
 * Animated notification that appears when a badge is unlocked
 */

'use client'

import { useEffect, useState } from 'react'
import { X, Zap, Trophy } from 'lucide-react'
import type { Badge } from '@/lib/learning/badges/learning-badges'

interface BadgeUnlockNotificationProps {
  badge: Badge
  onClose: () => void
  autoCloseDelay?: number // milliseconds, default 5000
}

export function BadgeUnlockNotification({
  badge,
  onClose,
  autoCloseDelay = 5000
}: BadgeUnlockNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10)

    // Auto close after delay
    const timer = setTimeout(() => {
      handleClose()
    }, autoCloseDelay)

    return () => clearTimeout(timer)
  }, [autoCloseDelay])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose()
    }, 300) // Match animation duration
  }

  const getRarityColor = () => {
    switch (badge.rarity) {
      case 'common':
        return 'from-gray-500 to-gray-600'
      case 'rare':
        return 'from-blue-500 to-blue-600'
      case 'epic':
        return 'from-purple-500 to-purple-600'
      case 'legendary':
        return 'from-yellow-500 to-yellow-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getRarityGlow = () => {
    switch (badge.rarity) {
      case 'common':
        return 'shadow-gray-500/50'
      case 'rare':
        return 'shadow-blue-500/50'
      case 'epic':
        return 'shadow-purple-500/50'
      case 'legendary':
        return 'shadow-yellow-500/50'
      default:
        return 'shadow-gray-500/50'
    }
  }

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999]
        transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      <div
        className={`
          glass-card rounded-xl p-6
          border-2 border-primary/30
          shadow-2xl ${getRarityGlow()}
          max-w-md
          backdrop-blur-xl
        `}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Fechar notificação"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            {/* Icon with glow animation */}
            <div className={`
              text-6xl
              animate-bounce
            `}>
              {badge.icon}
            </div>

            {/* Sparkle effect */}
            <div className="absolute -inset-2 animate-ping opacity-20">
              <Trophy className={`h-full w-full bg-gradient-to-br ${getRarityColor()}`} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`
                text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                bg-gradient-to-r ${getRarityColor()}
                text-white
              `}>
                {badge.rarity}
              </span>
              <Trophy className="h-4 w-4 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {badge.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          {badge.description}
        </p>

        {/* XP Reward */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Badge Desbloqueado! 🎉
          </span>
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4 text-accent" />
            <span className="font-bold text-accent">+{badge.xpReward} XP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Badge Unlock Manager
 *
 * Manages multiple badge unlock notifications
 */

interface BadgeQueueItem {
  id: string
  badge: Badge
}

export function BadgeUnlockManager() {
  const [queue, setQueue] = useState<BadgeQueueItem[]>([])
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null)

  // Listen for badge unlock events
  useEffect(() => {
    const handleBadgeUnlock = (event: CustomEvent<Badge>) => {
      const badge = event.detail
      setQueue(prev => [...prev, { id: Math.random().toString(), badge }])
    }

    window.addEventListener('badge-unlocked' as any, handleBadgeUnlock)

    return () => {
      window.removeEventListener('badge-unlocked' as any, handleBadgeUnlock)
    }
  }, [])

  // Show next badge from queue
  useEffect(() => {
    if (!currentBadge && queue.length > 0) {
      const [next, ...rest] = queue
      setCurrentBadge(next.badge)
      setQueue(rest)
    }
  }, [currentBadge, queue])

  const handleClose = () => {
    setCurrentBadge(null)
  }

  if (!currentBadge) return null

  return (
    <BadgeUnlockNotification
      badge={currentBadge}
      onClose={handleClose}
    />
  )
}

/**
 * Trigger badge unlock notification
 *
 * Usage:
 * import { triggerBadgeUnlock } from '@/components/learning/BadgeUnlockNotification'
 * triggerBadgeUnlock(badge)
 */
export function triggerBadgeUnlock(badge: Badge) {
  const event = new CustomEvent('badge-unlocked', { detail: badge })
  window.dispatchEvent(event)
}
