'use client'

import Link from 'next/link'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { 
  Rocket, 
  Code, 
  Users, 
  Calendar,
  Trophy,
  Clock,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  Video,
  MessageSquare
} from 'lucide-react'

interface LearningPath {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  weeks: number;
  students: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  highlights: string[];
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  status: 'available' | 'coming_soon';
}

const learningPaths: LearningPath[] = [
  {
    id: 'fullstack-dev',
    slug: 'fullstack',
    name: 'Desenvolvedor Fullstack',
    tagline: 'Do zero ao seu primeiro portfólio profissional',
    description: 'Aprenda desenvolvimento web completo (front-end + back-end) através de um modelo híbrido: conteúdo self-paced de qualidade + mentoria personalizada em turmas de até 5 alunos.',
    icon: <Rocket className="w-8 h-8" />,
    duration: '12 semanas',
    weeks: 12,
    students: 127,
    level: 'beginner',
    status: 'available',
    highlights: [
      'HTML, CSS e JavaScript do zero',
      'React e desenvolvimento moderno',
      'Portfolio profissional completo',
      'Certificado de conclusão'
    ],
    features: [
      {
        icon: <BookOpen className="w-5 h-5" />,
        title: 'Conteúdo Self-Paced',
        description: 'Teoria, desafios e projetos estruturados semanalmente'
      },
      {
        icon: <Video className="w-5 h-5" />,
        title: 'Aulas ao Vivo Semanais',
        description: 'Code review e mentoria em turmas de no máximo 5 alunos'
      },
      {
        icon: <MessageSquare className="w-5 h-5" />,
        title: 'Mentorias 1:1 Opcionais',
        description: 'Suporte individualizado com dev experiente'
      }
    ]
  },
  {
    id: 'frontend-specialist',
    slug: 'frontend',
    name: 'Especialista Front-end',
    tagline: 'Domine React, TypeScript e UI/UX',
    description: 'Aprenda front-end moderno com foco em React, TypeScript, animações e design systems. Ideal para quem já sabe o básico e quer se especializar.',
    icon: <Code className="w-8 h-8" />,
    duration: '8 semanas',
    weeks: 8,
    students: 0,
    level: 'intermediate',
    status: 'coming_soon',
    highlights: [
      'React avançado + Hooks',
      'TypeScript do zero',
      'Animações com Framer Motion',
      'Design Systems profissionais'
    ],
    features: []
  }
];

export default function LearnPage() {
  return (
    <DashboardLayout>
      {/* Hero Section */}
      <div className="mb-12">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Aprenda com Mentoria Personalizada
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trilhas de Aprendizagem Quple
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Modelo híbrido único: <span className="text-foreground font-semibold">conteúdo self-paced de qualidade</span> + 
            <span className="text-foreground font-semibold"> mentoria ao vivo em turmas pequenas</span> (máx. 5 alunos)
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: <Users className="w-5 h-5" />, label: 'Alunos Ativos', value: '127+' },
            { icon: <Trophy className="w-5 h-5" />, label: 'Projetos Criados', value: '450+' },
            { icon: <Calendar className="w-5 h-5" />, label: 'Aulas ao Vivo', value: '64' },
            { icon: <Clock className="w-5 h-5" />, label: 'Horas de Conteúdo', value: '120+' }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-4 rounded-lg text-center">
              <div className="flex items-center justify-center text-primary mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="space-y-6">
        {learningPaths.map((path) => (
          <div 
            key={path.id} 
            className={`glass-card rounded-xl p-6 md:p-8 ${
              path.status === 'available' 
                ? 'border-2 border-primary/30 hover:border-primary/50 transition-all' 
                : 'opacity-75'
            }`}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: Main Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                    {path.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{path.name}</h2>
                      {path.status === 'available' ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          Disponível
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                          Em Breve
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-lg mb-4">{path.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed">{path.description}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">O que você vai aprender:</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {path.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features (only if available) */}
                {path.features.length > 0 && (
                  <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                    {path.features.map((feature, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          {feature.icon}
                          <span className="text-sm font-semibold text-foreground">{feature.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Meta Info & CTA */}
              <div className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="font-semibold text-foreground">{path.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Nível</span>
                    <span className="font-semibold text-foreground capitalize">
                      {path.level === 'beginner' ? 'Iniciante' : path.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </span>
                  </div>
                  {path.students > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Alunos</span>
                      <span className="font-semibold text-foreground">{path.students}+</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Semanas</span>
                    <span className="font-semibold text-foreground">{path.weeks} semanas</span>
                  </div>
                </div>

                {path.status === 'available' ? (
                  <Link 
                    href={`/learn/${path.slug}`}
                    className="btn-primary w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 group"
                  >
                    Ver Trilha Completa
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <button 
                    disabled
                    className="w-full px-6 py-3 rounded-lg font-semibold bg-muted text-muted-foreground cursor-not-allowed"
                  >
                    Em Breve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Differential Section */}
      <div className="glass-card rounded-xl p-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
          Por que a Quple é Diferente?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-foreground">Turmas Pequenas</h3>
            <p className="text-sm text-muted-foreground">
              Máximo 5 alunos por turma. Atenção personalizada garantida, diferente de bootcamps tradicionais com 30+ alunos.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-foreground">Modelo Híbrido</h3>
            <p className="text-sm text-muted-foreground">
              Combine o melhor dos dois mundos: flexibilidade de conteúdo self-paced + suporte ao vivo de um mentor experiente.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-foreground">Portfolio Real</h3>
            <p className="text-sm text-muted-foreground">
              Cada semana você adiciona uma peça ao seu portfolio. Em 12 semanas, portfolio completo pronto para oportunidades.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="glass-card rounded-xl p-8 mt-8 text-center border-2 border-primary/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Pronto para Começar?
          </h3>
          <p className="text-muted-foreground mb-6">
            Junte-se a uma turma e comece sua jornada para se tornar um desenvolvedor fullstack profissional.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/learn/fullstack"
              className="btn-primary px-8 py-3 rounded-lg font-semibold"
            >
              Ver Trilha Fullstack
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
  )
}
