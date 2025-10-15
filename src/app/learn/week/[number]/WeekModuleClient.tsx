'use client';

import { WeeklyModule } from '@/types/weekly-modules';
import { weeklyModules } from '@/lib/learning/weekly-modules';
import { WeeklyModuleNav } from '@/components/weekly-modules/WeeklyModuleNav';
import { WeeklyModuleHeader } from '@/components/weekly-modules/WeeklyModuleHeader';
import { PreClassChecklist } from '@/components/weekly-modules/PreClassChecklist';
import { RelatedResources } from '@/components/weekly-modules/RelatedResources';
import { BookOpen, Code, Rocket, CheckCircle2, Trophy, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';
import { getAllTopicsMetadata } from '@/lib/learning';
import { getResourcesForWeek } from '@/lib/learning/weekly-modules/resources-map';

interface WeekModuleClientProps {
  module: WeeklyModule;
}

export function WeekModuleClient({ module }: WeekModuleClientProps) {
  const [completedChecklistItems, setCompletedChecklistItems] = useState<string[]>([]);

  const handleChecklistToggle = (itemId: string) => {
    setCompletedChecklistItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const relatedResources = useMemo(() => {
    const resourceIds = getResourcesForWeek(module.weekNumber);
    const allTopics = getAllTopicsMetadata();
    return resourceIds
      .map(id => allTopics.find(t => t.id === id))
      .filter(Boolean)
      .map(topic => ({
        id: topic!.id,
        title: topic!.title,
        description: topic!.description,
        category: topic!.category.toUpperCase()
      }));
  }, [module.weekNumber]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <WeeklyModuleNav 
        modules={weeklyModules}
        currentWeekId={module.id}
        completedWeeks={[]}
        availableWeeks={weeklyModules.map(m => m.id)}
      />

      <WeeklyModuleHeader module={module} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Theory Sections */}
          <section className="glass-card p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Teoria da Semana</h2>
            </div>

            <div className="space-y-6">
              {module.theoryContent.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="whitespace-pre-line">{section.content}</p>
                  </div>

                  {section.codeExamples && section.codeExamples.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {section.codeExamples.map((example, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-4 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-muted-foreground">
                              {example.language}
                            </span>
                          </div>
                          <pre className="overflow-x-auto">
                            <code className="text-sm font-mono text-foreground">
                              {example.code}
                            </code>
                          </pre>
                          {example.explanation && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              💡 {example.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section className="glass-card p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-6">
              <Code className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">5 Desafios Práticos</h2>
            </div>

            <div className="space-y-4">
              {module.challenges.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">
                          #{index + 1}
                        </span>
                        <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            challenge.difficulty === 'beginner'
                              ? 'bg-green-500/20 text-green-400'
                              : challenge.difficulty === 'intermediate'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {challenge.difficulty === 'beginner'
                            ? 'Iniciante'
                            : challenge.difficulty === 'intermediate'
                              ? 'Intermediário'
                              : 'Avançado'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {challenge.estimatedMinutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          +{challenge.totalXP} XP
                        </span>
                      </div>
                    </div>
                    <button className="btn-primary text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                      Começar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Weekly Project */}
          <section className="glass-card p-6 rounded-lg border-2 border-primary/30">
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Projeto da Semana</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.weeklyProject.title}
                </h3>
                <p className="text-muted-foreground">{module.weeklyProject.description}</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Critérios de Conclusão:</h4>
                <ul className="space-y-2">
                  {module.weeklyProject.completionCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {module.weeklyProject.estimatedHours}h
                  </span>
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <Trophy className="w-4 h-4" />
                    +{module.weeklyProject.xpReward} XP
                  </span>
                </div>
                <button className="btn-primary px-6 py-2 rounded-lg">
                  Submeter Projeto
                </button>
              </div>
            </div>
          </section>

          {/* Live Class Topics */}
          <section className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Tópicos da Aula ao Vivo
            </h2>
            <ul className="space-y-2">
              {module.liveClassTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          {module.resources && module.resources.length > 0 && (
            <section className="glass-card p-6 rounded-lg">
              <h2 className="text-xl font-bold text-foreground mb-4">Recursos Extras</h2>
              <div className="space-y-3">
                {module.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </h4>
                        {resource.content && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {resource.content}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {resource.type === 'video'
                          ? '📹'
                          : resource.type === 'reading'
                            ? '📄'
                            : resource.type === 'interactive'
                              ? '🎮'
                              : '🔗'}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Related Resources from Library */}
          <RelatedResources weekNumber={module.weekNumber} resources={relatedResources} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <PreClassChecklist
            checklist={module.preClassChecklist}
            completedItems={completedChecklistItems}
            onItemToggle={handleChecklistToggle}
          />

          {/* Week Info Card */}
          <div className="glass-card p-6 rounded-lg">
            <h3 className="font-bold text-foreground mb-4">Info da Semana</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estudo</span>
                <span className="font-semibold text-foreground">{module.estimatedStudyHours}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Dificuldade</span>
                <span className="font-semibold text-foreground capitalize">{module.difficulty === 'beginner' ? 'Iniciante' : module.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Badge</span>
                <span className="font-semibold text-foreground">{module.weeklyProject.badgeId}</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="glass-card p-6 rounded-lg">
            <h3 className="font-bold text-foreground mb-4">Seu Progresso</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Teoria</span>
                  <span className="text-foreground font-semibold">0%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Desafios</span>
                  <span className="text-foreground font-semibold">0/5</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Projeto</span>
                  <span className="text-foreground font-semibold">Não iniciado</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
