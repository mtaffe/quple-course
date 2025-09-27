'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const snackbarVariants = cva(
  "fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg glass-card backdrop-blur-xl border shadow-lg transform transition-all duration-300 ease-in-out max-w-md",
  {
    variants: {
      variant: {
        success: "border-accent/30 bg-accent/10 text-accent",
        error: "border-destructive/30 bg-destructive/10 text-destructive",
        warning: "border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
        info: "border-primary/30 bg-primary/10 text-primary"
      },
      visible: {
        true: "translate-x-0 opacity-100",
        false: "translate-x-full opacity-0"
      }
    },
    defaultVariants: {
      variant: "success",
      visible: false
    }
  }
)

export interface SnackbarProps extends VariantProps<typeof snackbarVariants> {
  message: string
  isVisible: boolean
  onClose: () => void
  autoHideDuration?: number
}

export function Snackbar({
  message,
  variant = "success",
  isVisible,
  onClose,
  autoHideDuration = 4000,
  className,
  ...props
}: SnackbarProps & React.HTMLAttributes<HTMLDivElement>) {

  useEffect(() => {
    if (isVisible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, autoHideDuration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHideDuration, onClose])

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />
      case 'error':
        return <XCircle className="h-5 w-5 flex-shrink-0" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 flex-shrink-0" />
      case 'info':
        return <Info className="h-5 w-5 flex-shrink-0" />
      default:
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />
    }
  }

  return (
    <div
      className={cn(snackbarVariants({ variant, visible: isVisible }), className)}
      {...props}
    >
      {getIcon()}

      <span className="flex-1 text-sm font-medium leading-relaxed">
        {message}
      </span>

      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Fechar notificação"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Hook para usar o snackbar facilmente
export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<{
    isVisible: boolean
    message: string
    variant: 'success' | 'error' | 'warning' | 'info'
  }>({
    isVisible: false,
    message: '',
    variant: 'success'
  })

  const showSnackbar = (
    message: string,
    variant: 'success' | 'error' | 'warning' | 'info' = 'success'
  ) => {
    setSnackbar({
      isVisible: true,
      message,
      variant
    })
  }

  const hideSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      isVisible: false
    }))
  }

  const SnackbarComponent = () => (
    <Snackbar
      message={snackbar.message}
      variant={snackbar.variant}
      isVisible={snackbar.isVisible}
      onClose={hideSnackbar}
    />
  )

  return {
    showSnackbar,
    hideSnackbar,
    SnackbarComponent
  }
}