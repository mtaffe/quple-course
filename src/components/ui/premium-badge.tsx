import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PremiumBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  glow?: boolean;
  className?: string;
}

export function PremiumBadge({
  children,
  variant = 'default',
  size = 'md',
  glow = false,
  className,
}: PremiumBadgeProps) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium backdrop-blur-sm transition-all duration-200',
        variants[variant],
        sizes[size],
        glow && 'shadow-glow-sm',
        className
      )}
    >
      {children}
    </span>
  );
}
