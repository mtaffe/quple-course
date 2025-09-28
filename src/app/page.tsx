'use client'

import { useState } from 'react'
import { Menu, X, Play, Award, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentStep, setAssessmentStep] = useState(0)
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, string>>({})

  const assessmentQuestions = [
    {
      question: "Qual sua situação atual de tempo para estudos?",
      options: [
        { value: "very-busy", label: "Muito corrido, só finais de semana", qualified: true },
        { value: "some-time", label: "Algumas horas por semana", qualified: true },
        { value: "flexible", label: "Horários flexíveis durante a semana", qualified: true },
        { value: "no-time", label: "Praticamente sem tempo livre", qualified: false }
      ]
    },
    {
      question: "Qual seu objetivo principal?",
      options: [
        { value: "hobby", label: "Aprender por curiosidade/hobby", qualified: false },
        { value: "career-change", label: "Transição de carreira", qualified: true },
        { value: "skill-building", label: "Desenvolver habilidades profissionais", qualified: true },
        { value: "quick-money", label: "Ganhar dinheiro rápido sem esforço", qualified: false }
      ]
    },
    {
      question: "Como você prefere aprender?",
      options: [
        { value: "give-up", label: "Desisto quando fica muito difícil", qualified: false },
        { value: "guided", label: "Gosto de ter orientação e mentoria", qualified: true },
        { value: "self-directed", label: "Aprendo bem de forma independente", qualified: true },
        { value: "perfectionist", label: "Preciso entender tudo 100% antes de seguir", qualified: false }
      ]
    }
  ]

  const handleAssessmentAnswer = (value: string) => {
    const newAnswers = { ...assessmentAnswers, [assessmentStep]: value }
    setAssessmentAnswers(newAnswers)

    if (assessmentStep < assessmentQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1)
    }
  }

  const getAssessmentResult = () => {
    const qualifiedAnswers = Object.entries(assessmentAnswers).filter(([step, value]) => {
      const question = assessmentQuestions[parseInt(step)]
      const option = question.options.find(opt => opt.value === value)
      return option?.qualified
    })

    return qualifiedAnswers.length >= 2
  }

  return (
    <div className="min-h-screen bg-background"
         style={{
           background: `linear-gradient(135deg,
                       hsl(var(--background)) 0%,
                       hsl(0 0% 5%) 30%,
                       hsl(0 0% 3%) 70%,
                       hsl(var(--background)) 100%)`
         }}>
      {/* Header */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 btn-primary-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-foreground font-semibold text-lg">Dev Playground</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#prequalification" className="text-muted-foreground hover:text-foreground transition-colors">É Para Mim?</a>
            <a href="#social-proof" className="text-muted-foreground hover:text-foreground transition-colors">Alunos</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="/simple" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            <a href="/auth" className="btn-primary-gradient px-4 py-2 rounded-lg font-semibold premium-hover">Entrar</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg glass-card"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6 glass-card rounded-xl p-4 space-y-3">
            <a href="#prequalification" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">É Para Mim?</a>
            <a href="#social-proof" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">Alunos</a>
            <a href="#faq" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="/simple" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            <a href="/auth" className="block btn-primary-gradient px-4 py-2 rounded-lg font-semibold text-center mt-3">Entrar</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-12 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center space-x-2 glass-card text-foreground px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span>Método Comprovado • 100+ Alunos</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Forme-se como
            <span className="block text-gradient-primary">
              Desenvolvedor Fullstack
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Do zero ao seu primeiro projeto fullstack completo. Aprenda
            <span className="text-primary font-medium"> Frontend (React) + Backend (Python/PHP)</span> para se tornar um desenvolvedor completo e versátil.
          </p>

          {/* Reality Check */}
          <div className="mb-10 p-4 glass-card rounded-xl max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Importante:</strong> Conteúdo disponível 24/7 para você estudar no seu ritmo.
                  Trabalha? Estuda? Tem família? Adapte os horários à sua realidade. Consistência vale mais que velocidade.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Magnets */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/auth"
              className="btn-primary-gradient px-8 py-4 rounded-xl font-semibold premium-hover text-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Começar Agora</span>
              </span>
            </a>
            <button
              onClick={() => setShowAssessment(true)}
              className="glass-card text-foreground px-6 py-3 rounded-xl font-semibold premium-hover"
            >
              <span className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>É Para Mim?</span>
              </span>
            </button>
            <a href="/simple" className="glass-card text-foreground px-6 py-3 rounded-xl font-semibold premium-hover">
              <span className="flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Ver Demo</span>
              </span>
            </a>
          </div>

          {/* Social Proof Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">90%</div>
              <div className="text-xs text-muted-foreground">Completam o projeto final</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">100%</div>
              <div className="text-xs text-muted-foreground">Têm portfólio profissional</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{color: 'hsl(var(--purple))'}}>Flexível</div>
              <div className="text-xs text-muted-foreground">Horários de estudo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{color: 'hsl(var(--info))'}}>1:1</div>
              <div className="text-xs text-muted-foreground">Mentoria semanal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {showAssessment && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full">
            {assessmentStep < assessmentQuestions.length ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">
                      Pergunta {assessmentStep + 1} de {assessmentQuestions.length}
                    </span>
                    <button
                      onClick={() => setShowAssessment(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-4">
                    <div
                      className="btn-primary-gradient h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-6 text-foreground">
                  {assessmentQuestions[assessmentStep].question}
                </h3>

                <div className="space-y-3">
                  {assessmentQuestions[assessmentStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAssessmentAnswer(option.value)}
                      className="w-full text-left p-4 glass-card rounded-lg hover:bg-muted/20 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                {getAssessmentResult() ? (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      Perfeito! Este programa é ideal para você
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Seu perfil se alinha bem com nosso método. Você tem boas chances de
                      completar o programa e sair com um portfólio sólido!
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/auth/register"
                        className="flex-1 btn-primary-gradient px-4 py-3 rounded-lg font-semibold"
                      >
                        Começar Agora
                      </a>
                      <button
                        onClick={() => setShowAssessment(false)}
                        className="flex-1 glass-card px-4 py-3 rounded-lg font-semibold"
                      >
                        Ver Mais Primeiro
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      Talvez não seja o momento ideal
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Baseado nas suas respostas, talvez não seja o melhor momento para começar.
                      O programa exige consistência e dedicação para gerar bons resultados.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setAssessmentStep(0)
                          setAssessmentAnswers({})
                        }}
                        className="flex-1 glass-card px-4 py-3 rounded-lg font-semibold"
                      >
                        Refazer Teste
                      </button>
                      <button
                        onClick={() => setShowAssessment(false)}
                        className="flex-1 glass-card px-4 py-3 rounded-lg font-semibold"
                      >
                        Explorar Mesmo Assim
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pre-qualification Section */}
      <div id="prequalification" className="relative">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Para Quem Este Programa Foi Pensado:
            </h2>
            <p className="text-muted-foreground text-lg">
              Diferentes perfis, mesma oportunidade de se formar como desenvolvedor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Target Profiles */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-foreground">Perfis Ideais</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Jovens (16-25 anos)</strong> buscando carreira fullstack</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Adultos (25-40 anos)</strong> em transição de carreira</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Desenvolvedores frontend</strong> que querem aprender backend</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Profissionais de outras áreas</strong> que querem migrar para tech</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Qualquer pessoa</strong> que prefere aprender fazendo projetos reais</span>
                </li>
              </ul>
            </div>

            {/* Flexible Learning */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-green-500" />
                <h3 className="text-lg font-semibold text-foreground">Flexibilidade Total</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong>Conteúdo 24/7:</strong> Estude quando puder</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong>Seu ritmo:</strong> 2h no sábado ou 30min por dia</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong>Vida real:</strong> Trabalha? Estuda? Tem família? Sem problema</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong>Mentoria semanal:</strong> Agenda conforme sua disponibilidade</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span><strong>Sem pressão:</strong> Consistência vale mais que velocidade</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowAssessment(true)}
              className="btn-primary-gradient px-8 py-4 rounded-xl font-semibold premium-hover"
            >
              <span className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Fazer Assessment Gratuito</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div id="social-proof" className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Alunos Que Se Formaram e Estão no Mercado
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Histórias reais de quem completou o programa e construiu um portfólio profissional.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div>
                  <div className="font-semibold text-foreground">Maria Silva</div>
                  <div className="text-sm text-muted-foreground">19 anos, Ex-Balconista</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                &quot;Saí do programa com projeto fullstack completo. Frontend em React e backend
                em PHP. O conjunto impressionou na entrevista para vaga júnior.&quot;
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Award className="h-3 w-3" />
                  <span>Formada em Set/24</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Dev Júnior</span>
                </span>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  J
                </div>
                <div>
                  <div className="font-semibold text-foreground">João Santos</div>
                  <div className="text-sm text-muted-foreground">22 anos, Ex-Vendedor</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                &quot;Transição de carreira aos 22. O programa me ensinou fullstack (React + Python).
                Hoje trabalho remoto com o projeto completo que construí.&quot;
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Award className="h-3 w-3" />
                  <span>Formado em Jul/24</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Dev Remoto</span>
                </span>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  L
                </div>
                <div>
                  <div className="font-semibold text-foreground">Lucas Ferreira</div>
                  <div className="text-sm text-muted-foreground">17 anos, Estudante</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                &quot;Ainda no ensino médio mas o programa me preparou bem.
                Tenho um portfólio profissional e já faço alguns freelances.&quot;
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Award className="h-3 w-3" />
                  <span>Formado em Out/24</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Freelancer</span>
                </span>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center glass-card rounded-xl p-6">
              <div className="text-3xl font-bold text-green-500 mb-2">90%</div>
              <div className="text-sm font-medium text-foreground mb-1">Taxa de Conclusão</div>
              <div className="text-xs text-muted-foreground">Completam o projeto final</div>
            </div>
            <div className="text-center glass-card rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-500 mb-2">100%</div>
              <div className="text-sm font-medium text-foreground mb-1">Portfólio Profissional</div>
              <div className="text-xs text-muted-foreground">Saem com projeto completo</div>
            </div>
            <div className="text-center glass-card rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-500 mb-2">1:1</div>
              <div className="text-sm font-medium text-foreground mb-1">Mentoria Semanal</div>
              <div className="text-xs text-muted-foreground">Acompanhamento personalizado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Method Section */}
      <div id="features" className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Por Que Este Método Funciona
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Baseado em como pessoas realmente conseguem empregos tech no Brasil.
            </p>
          </div>

          {/* Method Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Projeto Real no Portfólio</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Não apenas exercícios. Você constrói um app completo que impressiona recrutadores.
                O Quple que você criar vai ser SEU projeto, com seu código.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Frontend responsivo e profissional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Funcionalidades que usuários reais usariam</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Código limpo e documentado</span>
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Aprendizado Progressivo</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Stack completa em etapas bem definidas. Primeiro o frontend, depois o backend
                de sua escolha, e por fim a integração. Sai preparado para vagas fullstack.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Frontend: HTML/CSS/JavaScript/React</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Backend: Python ou PHP (você escolhe)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Integração: Frontend + Backend funcionando</span>
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Mentoria Semanal Personalizada</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                <strong>Diferencial único:</strong> Sessão semanal de 30-45 minutos comigo para
                tirar dúvidas, revisar código, entender conceitos e planejar próximos passos.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Horário flexível conforme sua agenda</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Revisão individual do seu código</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Orientação para sua carreira específica</span>
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Preparação para Mercado</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Além de programar, você aprende a se posicionar profissionalmente.
                Portfolio, GitHub, LinkedIn e como apresentar seus projetos.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>GitHub profissional montado</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Como buscar oportunidades no mercado</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Preparação para processos seletivos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Sua Jornada em 5 Semanas</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Do zero ao seu primeiro app React. Cada semana um novo superpoder.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { week: 1, title: "Semana 1-2: Base Sólida", desc: "HTML semântico e estruturas que fazem sentido", icon: "🏗️" },
              { week: 2, title: "Semana 2-3: Visual Profissional", desc: "CSS responsivo e design system", icon: "🎨" },
              { week: 3, title: "Semana 3-4: Interatividade", desc: "JavaScript que os usuários vão usar", icon: "⚡" },
              { week: 4, title: "Semana 4-5: React Power", desc: "Componentes e estado. O futuro chegou", icon: "⚛️" },
              { week: 5, title: "Semana 5: Portfólio", desc: "App completo pronto para mostrar ao mundo", icon: "🚀" },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6 glass-card rounded-xl p-6 premium-hover">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                <div className="text-2xl font-bold text-primary">#{item.week}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="relative">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-muted-foreground text-lg">
              Respostas honestas para as perguntas que todo mundo faz.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;Nunca programei na vida. Consigo acompanhar?&quot;
              </h3>
              <p className="text-muted-foreground">
                Sim! 70% dos nossos alunos começaram do absoluto zero. O método é pensado para iniciantes.
                Começamos do mais básico e vamos subindo gradualmente. Se você sabe usar computador e
                tem disciplina para estudar, vai conseguir.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;Tenho pouco tempo livre. Consigo acompanhar?&quot;
              </h3>
              <p className="text-muted-foreground">
                O conteúdo está disponível 24/7 para você estudar no seu ritmo. Se conseguir algumas
                horas por semana (mesmo que só finais de semana), dá para acompanhar. A mentoria
                semanal te ajuda a otimizar o tempo de estudo.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;Vou conseguir emprego depois do curso?&quot;
              </h3>
              <p className="text-muted-foreground">
                O programa te prepara com as habilidades e portfólio necessários, mas não posso
                garantir emprego - o mercado é competitivo. O que garanto é que você vai sair
                com conhecimento sólido e um projeto profissional para mostrar aos recrutadores.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;É realmente grátis? Qual a pegadinha?&quot;
              </h3>
              <p className="text-muted-foreground">
                O programa tem um plano gratuito com todo o conteúdo e um plano premium que inclui
                a mentoria semanal personalizada comigo. Transparência total nos preços e benefícios.
                Sem pegadinhas ou custos ocultos.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;Preciso de computador específico?&quot;
              </h3>
              <p className="text-muted-foreground">
                Qualquer computador dos últimos 5 anos serve. Windows, Mac ou Linux. Não precisa de
                placa de vídeo especial ou muito RAM. Se consegue assistir YouTube sem travar,
                consegue programar.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;E se eu travar em algum desafio?&quot;
              </h3>
              <p className="text-muted-foreground">
                Todo desafio tem sistema de dicas progressivas. Se ainda assim ficar perdido,
                tem fórum da comunidade onde outros alunos e mentores ajudam. Ninguém fica sozinho.
                Faz parte do aprendizado travar às vezes - é normal!
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                &quot;Posso escolher entre Python e PHP para o backend?&quot;
              </h3>
              <p className="text-muted-foreground">
                Sim! Você escolhe o backend que mais te interessa. Python é ótimo para data science
                e automação, PHP é muito usado em sites e sistemas web. Ambos te preparam bem para
                o mercado de trabalho brasileiro.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative glass-card mx-6 rounded-2xl mb-12">
        <div className="absolute inset-0 btn-primary-gradient rounded-2xl opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-4xl mb-6">💼</div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Sua Carreira Tech Começa Aqui
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Método testado por 100+ alunos. Sem promessas impossíveis, só trabalho sério que gera resultado real.
            <strong className="text-foreground"> Você tem o perfil?</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowAssessment(true)}
              className="btn-primary-gradient px-8 py-4 rounded-xl font-semibold premium-hover"
            >
              <span className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Descobrir se é Para Mim</span>
              </span>
            </button>
            <a href="/simple" className="glass-card text-foreground px-8 py-4 rounded-xl font-semibold premium-hover">
              <span className="flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Ver Plataforma Funcionando</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 btn-primary-gradient rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-foreground font-semibold">Dev Playground</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Plataforma gamificada para aprender desenvolvimento fullstack. Frontend + Backend + Projetos reais.
          </p>
        </div>
      </footer>
    </div>
  )
}
