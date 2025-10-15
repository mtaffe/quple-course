'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { BookOpen, Code, Palette, Zap, Layers, ChevronRight, Clock } from 'lucide-react'
import {
  getAllTopicsMetadata,
  CATEGORY_COLORS,
  CATEGORY_BG,
  DIFFICULTY_LABELS,
  type CategoryType
} from '@/lib/learning'

// Map category to icon component
const categoryIcons: Record<CategoryType, React.ReactNode> = {
  html: <Code className="h-6 w-6" />,
  css: <Palette className="h-6 w-6" />,
  javascript: <Zap className="h-6 w-6" />,
  react: <Layers className="h-6 w-6" />
}

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get all topics metadata from /lib/learning
  const topics = getAllTopicsMetadata()

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
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Conteúdos 📚
        </h1>
        <p className="text-muted-foreground">
          Conteúdos teóricos organizados para complementar sua prática.
        </p>
      </div>

      {/* Introduction Card */}
      <div className="glass-card rounded-xl p-8 mb-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Centro de Conhecimento
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cada tópico oferece conhecimento denso e estruturado para aprofundar
            seu entendimento dos conceitos fundamentais. Combine teoria e prática
            para um aprendizado mais efetivo.
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
          <Link
            key={topic.id}
            href={`/learn/${topic.id}`}
            className="glass-card rounded-xl p-6 premium-hover cursor-pointer group block"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${CATEGORY_BG[topic.category]}`}>
                <div className={CATEGORY_COLORS[topic.category]}>
                  {categoryIcons[topic.category]}
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
                  {DIFFICULTY_LABELS[topic.difficulty]}
                </div>
              </div>
            </div>
          </Link>
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
          <Link
            href="/challenges"
            className="btn-primary-gradient px-6 py-3 rounded-lg font-semibold premium-hover inline-block"
          >
            Ir para os Desafios
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}