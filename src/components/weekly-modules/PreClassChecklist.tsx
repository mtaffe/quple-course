'use client';

import { PreClassChecklist as ChecklistType } from '@/types/weekly-modules';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PreClassChecklistProps {
  checklist: ChecklistType;
  completedItems: string[];
  onItemToggle: (itemId: string) => void;
}

export function PreClassChecklist({
  checklist,
  completedItems,
  onItemToggle
}: PreClassChecklistProps) {
  const totalItems = checklist.items.length;
  const completedCount = completedItems.length;
  const progressPercentage = (completedCount / totalItems) * 100;
  const isFullyCompleted = completedCount === totalItems;

  const totalEstimatedTime = checklist.items.reduce((acc, item) => acc + item.estimatedMinutes, 0);

  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">📋 Checklist Pré-Aula</h3>
        <p className="text-sm text-muted-foreground">
          Complete estes itens antes da aula ao vivo para aproveitar ao máximo
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            {completedCount} de {totalItems} concluídos
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~{totalEstimatedTime}min
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={cn(
              'rounded-full h-2 transition-all',
              isFullyCompleted ? 'bg-green-500' : 'bg-primary'
            )}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {checklist.items.map((item) => {
          const isCompleted = completedItems.includes(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => onItemToggle(item.id)}
              className={cn(
                'w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left',
                'hover:bg-accent hover:border-accent-foreground/20',
                isCompleted && 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              
              <div className="flex-1">
                <div className={cn(
                  'font-medium mb-1',
                  isCompleted && 'line-through text-muted-foreground'
                )}>
                  {item.description}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className={cn(
                    'px-2 py-0.5 rounded',
                    item.type === 'content' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                    item.type === 'challenge' && 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
                    item.type === 'project' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                  )}>
                    {item.type === 'content' ? 'Conteúdo' : 
                     item.type === 'challenge' ? 'Desafio' : 'Projeto'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedMinutes}min
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isFullyCompleted && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            🎉 Parabéns! Você está pronto para a aula ao vivo!
          </p>
        </div>
      )}
    </div>
  );
}
