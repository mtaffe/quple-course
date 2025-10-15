'use client';

import { WeeklyModule } from '@/types/weekly-modules';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WeeklyModuleNavProps {
  modules: WeeklyModule[];
  currentWeekId: string;
  completedWeeks: string[];
  availableWeeks: string[];
}

export function WeeklyModuleNav({
  modules,
  currentWeekId,
  completedWeeks,
  availableWeeks
}: WeeklyModuleNavProps) {
  const getWeekStatus = (weekId: string) => {
    if (completedWeeks.includes(weekId)) return 'completed';
    if (availableWeeks.includes(weekId)) return 'available';
    return 'locked';
  };

  return (
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-thin">
          {modules.map((module) => {
            const status = getWeekStatus(module.id);
            const isActive = module.id === currentWeekId;
            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';

            return (
              <Link
                key={module.id}
                href={isLocked ? '#' : `/learn/week/${module.weekNumber}`}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-primary text-primary-foreground border-primary',
                  isLocked && 'opacity-50 cursor-not-allowed hover:bg-transparent',
                  isCompleted && !isActive && 'border-green-500 text-green-600 dark:text-green-400'
                )}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isLocked ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  Semana {module.weekNumber}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
