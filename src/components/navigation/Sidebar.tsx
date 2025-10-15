'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  Code,
  Library,
  Trophy,
  Users,
  Calendar,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Minha Trilha', href: '/learn/fullstack', icon: BookOpen },
  { name: 'Prática Livre', href: '/challenges', icon: Code },
  { name: 'Recursos', href: '/recursos', icon: Library },
  { name: 'Progresso', href: '/progresso', icon: Trophy },
  { name: 'Minha Turma', href: '/turma', icon: Users },
  { name: 'Aulas', href: '/aulas', icon: Calendar },
  { name: 'Configurações', href: '/settings', icon: Settings },
]

export function Sidebar({ className = '', isOpen: controlledIsOpen, onClose }: SidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const pathname = usePathname()
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onClose ? onClose : setInternalIsOpen

  return (
    <>
      {/* Mobile Menu Button - Hidden since we have bottom nav */}
      {!controlledIsOpen && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2.5 backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => {
            if (onClose) onClose()
            else setInternalIsOpen(false)
          }}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 backdrop-blur-xl bg-gradient-to-b from-black/40 to-black/20 border-r border-white/10 z-50 transform transition-all duration-300 ease-smooth lg:translate-x-0 shadow-premium-xl",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-premium from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow-sm">
              <span className="text-white font-bold text-base">D</span>
            </div>
            <span className="text-foreground font-semibold text-base">Dev Playground</span>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => {
              if (onClose) onClose()
              else setInternalIsOpen(false)
            }}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (onClose) onClose()
                  else setInternalIsOpen(false)
                }}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-premium from-violet-500/20 to-purple-600/20 text-violet-400 shadow-glow-sm border border-violet-500/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent hover:border-white/10"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive && "scale-110"
                )} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-2.5 text-xs text-muted-foreground px-4 py-3 rounded-xl bg-white/5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-glow-sm"></div>
            <span>Conectado</span>
          </div>
        </div>
      </div>
    </>
  )
}
