import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function PremiumCard({
  children,
  className,
  hover = true,
  glow = false,
  glass = true,
  onClick,
}: PremiumCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border transition-all duration-300',
        glass && 'backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5',
        !glass && 'bg-card',
        hover && 'hover:shadow-premium-lg hover:-translate-y-0.5',
        glow && 'shadow-glow-sm hover:shadow-glow',
        onClick && 'cursor-pointer',
        'border-white/10',
        className
      )}
    >
      {children}
    </div>
  );
}

interface PremiumCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardHeader({ children, className }: PremiumCardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
}

interface PremiumCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardTitle({ children, className }: PremiumCardTitleProps) {
  return (
    <h3 className={cn('text-xl font-semibold text-foreground', className)}>
      {children}
    </h3>
  );
}

interface PremiumCardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardDescription({ children, className }: PremiumCardDescriptionProps) {
  return (
    <p className={cn('text-sm text-muted-foreground mt-1.5', className)}>
      {children}
    </p>
  );
}

interface PremiumCardContentProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardContent({ children, className }: PremiumCardContentProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}

interface PremiumCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardFooter({ children, className }: PremiumCardFooterProps) {
  return (
    <div className={cn('p-6 pt-4 border-t border-white/10', className)}>
      {children}
    </div>
  );
}
