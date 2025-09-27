'use client'

import { useState } from 'react'
import { BookOpen, Code, Palette, Zap, Layers, ChevronRight, Clock, Target, Star } from 'lucide-react'

interface Topic {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'html' | 'css' | 'javascript' | 'react'
  estimatedTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lessons: number
}

const topics: Topic[] = [
  {
    id: 'html-fundamentals',
    title: 'HTML Fundamentos',
    description: 'Estrutura semântica, elementos básicos e boas práticas',
    icon: <Code className="h-6 w-6" />,
    category: 'html',
    estimatedTime: 45,
    difficulty: 'beginner',
    lessons: 8
  },
  {
    id: 'html-advanced',
    title: 'HTML Avançado',
    description: 'Acessibilidade, SEO, formulários complexos e APIs web',
    icon: <Layers className="h-6 w-6" />,
    category: 'html',
    estimatedTime: 60,
    difficulty: 'intermediate',
    lessons: 10
  },
  {
    id: 'css-basics',
    title: 'CSS Essencial',
    description: 'Seletores, box model, positioning e responsividade',
    icon: <Palette className="h-6 w-6" />,
    category: 'css',
    estimatedTime: 75,
    difficulty: 'beginner',
    lessons: 12
  },
  {
    id: 'css-advanced',
    title: 'CSS Moderno',
    description: 'Flexbox, Grid, animações e design systems',
    icon: <Star className="h-6 w-6" />,
    category: 'css',
    estimatedTime: 90,
    difficulty: 'intermediate',
    lessons: 15
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript Base',
    description: 'Variáveis, funções, eventos e manipulação do DOM',
    icon: <Zap className="h-6 w-6" />,
    category: 'javascript',
    estimatedTime: 120,
    difficulty: 'beginner',
    lessons: 18
  },
  {
    id: 'js-advanced',
    title: 'JavaScript Avançado',
    description: 'Async/await, APIs, ES6+ e padrões modernos',
    icon: <Target className="h-6 w-6" />,
    category: 'javascript',
    estimatedTime: 150,
    difficulty: 'advanced',
    lessons: 20
  }
]

const categoryColors = {
  html: 'text-accent',
  css: 'text-primary',
  javascript: 'text-[hsl(var(--warning))]',
  react: 'text-[hsl(var(--purple))]'
}

const categoryBg = {
  html: 'bg-accent/10',
  css: 'bg-primary/10',
  javascript: 'bg-[hsl(var(--warning))]/10',
  react: 'bg-[hsl(var(--purple))]/10'
}

const difficultyLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado'
}

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTopics = selectedCategory === 'all'
    ? topics
    : topics.filter(topic => topic.category === selectedCategory)

  const categories = [
    { id: 'all', label: 'Todos', count: topics.length },
    { id: 'html', label: 'HTML', count: topics.filter(t => t.category === 'html').length },
    { id: 'css', label: 'CSS', count: topics.filter(t => t.category === 'css').length },
    { id: 'javascript', label: 'JavaScript', count: topics.filter(t => t.category === 'javascript').length },
    { id: 'react', label: 'React', count: topics.filter(t => t.category === 'react').length }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="btn-primary-gradient rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Conteúdos Teóricos</h1>
                <p className="text-sm text-muted-foreground">Conhecimento denso e estruturado</p>
              </div>
            </div>
            <a
              href="/dashboard"
              className="glass-card text-foreground px-4 py-2 rounded-lg font-medium premium-hover"
            >
              ← Voltar ao Dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="glass-card rounded-xl p-8 mb-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Centro de Conhecimento
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conteúdos teóricos organizados para complementar sua prática.
              Cada tópico oferece conhecimento denso e estruturado para aprofundar
              seu entendimento dos conceitos fundamentais.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all premium-hover ${
                selectedCategory === category.id
                  ? 'btn-primary-gradient text-white'
                  : 'glass-card text-foreground'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="glass-card rounded-xl p-6 premium-hover cursor-pointer group"
              onClick={() => window.location.href = `/learn/${topic.id}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${categoryBg[topic.category]}`}>
                  <div className={categoryColors[topic.category]}>
                    {topic.icon}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{topic.estimatedTime}min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{topic.lessons} lições</span>
                    </div>
                  </div>

                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    topic.difficulty === 'beginner' ? 'bg-accent/20 text-accent' :
                    topic.difficulty === 'intermediate' ? 'bg-primary/20 text-primary' :
                    'bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]'
                  }`}>
                    {difficultyLabels[topic.difficulty]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum conteúdo encontrado
            </h3>
            <p className="text-muted-foreground">
              Ajuste os filtros para encontrar o conteúdo desejado.
            </p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="glass-card rounded-xl p-8 mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para Praticar?
            </h3>
            <p className="text-muted-foreground mb-6">
              Combine teoria e prática para um aprendizado mais efetivo.
              Volte aos desafios para aplicar o conhecimento adquirido.
            </p>
            <a
              href="/dashboard"
              className="btn-primary-gradient px-6 py-3 rounded-lg font-semibold premium-hover inline-block"
            >
              Ir para os Desafios
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}