'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Code, Trophy, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navigation = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Trilha', href: '/learn/fullstack', icon: BookOpen },
  { name: 'Prática', href: '/challenges', icon: Code },
  { name: 'Progresso', href: '/progresso', icon: Trophy },
]

interface BottomNavProps {
  onMenuClick: () => void
}

export function BottomNav({ onMenuClick }: BottomNavProps) {
  const pathname = usePathname()
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setTimeout(() => setRipple(null), 600)
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/40 border-t border-white/10 shadow-premium-xl safe-area-inset">
      <div className="flex items-center justify-around h-16 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleItemClick}
              className={cn(
                'relative flex flex-col items-center justify-center flex-1 h-14 rounded-xl transition-all duration-200 touch-manipulation active:scale-95',
                isActive
                  ? 'text-violet-400'
                  : 'text-muted-foreground active:text-foreground'
              )}
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              {ripple && (
                <span
                  className="absolute inset-0 rounded-xl bg-white/20 animate-ping"
                  style={{
                    transformOrigin: `${ripple.x}px ${ripple.y}px`,
                  }}
                />
              )}
              
              {isActive && (
                <div className="absolute inset-0 bg-gradient-premium from-violet-500/20 to-purple-600/20 rounded-xl border border-violet-500/30 shadow-glow-sm" />
              )}
              
              <item.icon 
                className={cn(
                  'h-5 w-5 mb-0.5 relative z-10 transition-transform duration-200',
                  isActive && 'scale-110'
                )} 
              />
              <span className="text-xs font-medium relative z-10">{item.name}</span>
            </Link>
          )
        })}
        
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="relative flex flex-col items-center justify-center flex-1 h-14 rounded-xl text-muted-foreground hover:text-foreground transition-all duration-200 touch-manipulation active:scale-95"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          <Menu className="h-5 w-5 mb-0.5" />
          <span className="text-xs font-medium">Menu</span>
        </button>
      </div>
    </nav>
  )
}
