import Link from 'next/link';
import { DashboardLayout } from '@/components/navigation/DashboardLayout';
import { weeklyModules, getTotalWeeks } from '@/lib/learning/weekly-modules';
import { 
  Rocket, 
  CheckCircle2, 
  Lock,
  Clock,
  Trophy,
  Users,
  Video,
  MessageSquare,
  ChevronRight,
  Play,
  BookOpen
} from 'lucide-react';

export default function FullstackPathPage() {
  const totalWeeks = getTotalWeeks();
  const completedWeeks = 0;
  const currentWeek = 1;

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 md:p-12 mb-8">
        <div className="relative z-10">
          <Link 
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← Voltar para Trilhas
          </Link>
          
          <div className="flex items-start gap-6 mb-6">
            <div className="p-4 bg-primary/20 rounded-xl text-primary">
              <Rocket className="w-10 h-10" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Desenvolvedor Fullstack
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Do zero ao seu primeiro portfólio profissional em 12 semanas
              </p>
              
              {/* Progress */}
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Seu Progresso</span>
                  <span className="text-sm font-semibold text-foreground">
                    {completedWeeks}/{totalWeeks} semanas
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(completedWeeks / totalWeeks) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Clock className="w-4 h-4" />, label: 'Duração', value: '12 semanas' },
              { icon: <Users className="w-4 h-4" />, label: 'Turma', value: 'Máx. 5 alunos' },
              { icon: <Video className="w-4 h-4" />, label: 'Aulas ao Vivo', value: '12 sessões' },
              { icon: <Trophy className="w-4 h-4" />, label: 'Projetos', value: '12 portfolio' }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="text-primary">{stat.icon}</div>
                <div>
                  <div className="font-semibold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Model */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Modelo de Aprendizagem Híbrido</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-primary mb-2">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold text-foreground">Conteúdo Self-Paced</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Teoria, 5 desafios práticos e 1 projeto de portfolio por semana. Estude no seu ritmo.
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Video className="w-5 h-5" />
              <h3 className="font-semibold text-foreground">Aula Semanal (60min)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Code review, Q&A e debug colaborativo em turma de até 5 alunos. Toda semana.
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-primary mb-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold text-foreground">Mentoria 1:1 (Opcional)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Sessões individuais para dúvidas específicas, code review personalizado ou orientação de carreira.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Modules */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Cronograma Semanal</h2>
          <div className="text-sm text-muted-foreground">
            {completedWeeks > 0 ? `${completedWeeks} concluídas` : 'Nenhuma semana concluída'}
          </div>
        </div>

        <div className="space-y-4">
          {weeklyModules.map((module) => {
            const isLocked = module.weekNumber > currentWeek;
            const isCompleted = module.weekNumber < currentWeek;
            const isCurrent = module.weekNumber === currentWeek;

            return (
              <div
                key={module.id}
                className={`glass-card rounded-lg p-6 transition-all ${
                  isLocked 
                    ? 'opacity-50' 
                    : isCurrent 
                      ? 'border-2 border-primary/50' 
                      : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className={`p-3 rounded-lg flex-shrink-0 ${
                    isCompleted 
                      ? 'bg-green-500/20 text-green-400' 
                      : isCurrent
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted/30 text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-mono text-muted-foreground">
                            Semana {module.weekNumber}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                              Atual
                            </span>
                          )}
                          {isCompleted && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                              Concluída
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.subtitle}
                        </p>
                      </div>

                      {!isLocked && (
                        <Link
                          href={`/learn/week/${module.weekNumber}`}
                          className="btn-primary text-sm px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap group"
                        >
                          {isCompleted ? 'Revisar' : isCurrent ? 'Continuar' : 'Começar'}
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{module.estimatedStudyHours}h de estudo</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>5 desafios</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Rocket className="w-4 h-4" />
                        <span>1 projeto portfolio</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-semibold">
                        <Trophy className="w-4 h-4" />
                        <span>+{
                          module.challenges.reduce((sum, c) => sum + c.totalXP, 0) + 
                          module.weeklyProject.xpReward
                        } XP</span>
                      </div>
                    </div>

                    {/* Learning Objectives Preview */}
                    {!isLocked && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                          O que você vai aprender:
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {module.learningObjectives.slice(0, 4).map((objective, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Coming Soon Weeks */}
          {Array.from({ length: 12 - weeklyModules.length }).map((_, index) => {
            const weekNumber = weeklyModules.length + index + 1;
            return (
              <div
                key={`coming-${weekNumber}`}
                className="glass-card rounded-lg p-6 opacity-50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted/30 text-muted-foreground flex-shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">
                        Semana {weekNumber}
                      </span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                        Em Breve
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Conteúdo em Desenvolvimento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Esta semana será liberada em breve. Continue progredindo nas semanas anteriores!
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card rounded-xl p-8 text-center border-2 border-primary/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Pronto para Começar Sua Jornada?
          </h3>
          <p className="text-muted-foreground mb-6">
            {currentWeek === 1 
              ? 'Comece agora pela Semana 1 e dê o primeiro passo para se tornar um desenvolvedor fullstack!'
              : `Continue sua jornada! Você está na Semana ${currentWeek}.`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/learn/week/${currentWeek}`}
              className="btn-primary px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {currentWeek === 1 ? 'Começar Semana 1' : `Continuar Semana ${currentWeek}`}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="glass-card px-8 py-3 rounded-lg font-semibold text-foreground hover:bg-muted/50 transition-colors"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
