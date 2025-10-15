'use client';

import { WeeklyModule } from '@/types/weekly-modules';
import { Clock, Target, Award } from 'lucide-react';

interface WeeklyModuleHeaderProps {
  module: WeeklyModule;
  progress?: {
    completedChallenges: number;
    totalChallenges: number;
    projectStatus: string;
    xpEarned: number;
  };
}

export function WeeklyModuleHeader({ module, progress }: WeeklyModuleHeaderProps) {
  const progressPercentage = progress
    ? (progress.completedChallenges / progress.totalChallenges) * 100
    : 0;

  return (
    <div className="w-full bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Semana {module.weekNumber}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                module.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {module.difficulty === 'beginner' ? 'Iniciante' : 
                 module.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{module.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{module.subtitle}</p>
            <p className="text-muted-foreground max-w-3xl">{module.description}</p>

            <div className="flex flex-wrap items-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{module.estimatedStudyHours}h de estudo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span>{module.challenges.length} desafios</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span>+{module.weeklyProject.xpReward} XP possíveis</span>
              </div>
            </div>
          </div>

          {progress && (
            <div className="hidden lg:block min-w-[200px]">
              <div className="bg-background/60 backdrop-blur border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Seu Progresso</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Desafios</span>
                      <span className="font-medium">
                        {progress.completedChallenges}/{progress.totalChallenges}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-2xl font-bold text-primary">{progress.xpEarned} XP</div>
                    <div className="text-xs text-muted-foreground">ganhos esta semana</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {module.learningObjectives.length > 0 && (
          <div className="mt-6 bg-background/60 backdrop-blur border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              O que você vai aprender:
            </h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {module.learningObjectives.map((objective, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
