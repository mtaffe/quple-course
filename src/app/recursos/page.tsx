'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/navigation/DashboardLayout'
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription, PremiumCardContent } from '@/components/ui/premium-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { PremiumBadge } from '@/components/ui/premium-badge'
import { Search, Library, BookOpen, Clock, ChevronRight, Filter } from 'lucide-react'
import { getAllTopics } from '@/lib/learning'
import type { Topic, CategoryType, DifficultyLevel } from '@/lib/learning'

const categories: (CategoryType | 'todos')[] = ['todos', 'html', 'css', 'javascript', 'react']
const difficulties: (DifficultyLevel | 'todos')[] = ['todos', 'beginner', 'intermediate', 'advanced']

const categoryLabels: Record<string, string> = {
  'todos': 'Todos',
  'html': 'HTML',
  'css': 'CSS',
  'javascript': 'JavaScript',
  'react': 'React'
}

const difficultyLabels: Record<string, string> = {
  'todos': 'Todos',
  'beginner': 'Iniciante',
  'intermediate': 'Intermediário',
  'advanced': 'Avançado'
}

export default function RecursosPage() {
  const allTopics = useMemo(() => getAllTopics(), [])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'todos'>('todos')
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'todos'>('todos')

  const filteredResources = useMemo(() => {
    return allTopics.filter((topic: Topic) => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'todos' || topic.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'todos' || topic.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [allTopics, searchQuery, selectedCategory, selectedDifficulty])

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  } as const

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <Library className="h-8 w-8 text-primary" />
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            Biblioteca de Recursos
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Materiais de apoio organizados para complementar seu aprendizado na trilha
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4 animate-fade-in-up animation-delay-100">
        {/* Search Bar */}
        <PremiumCard>
          <PremiumCardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-transparent border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              />
            </div>
          </PremiumCardContent>
        </PremiumCard>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <PremiumCard className="flex-1">
            <PremiumCardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Categoria</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-premium from-violet-500 to-purple-600 text-white shadow-glow-sm'
                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>
            </PremiumCardContent>
          </PremiumCard>

          {/* Difficulty Filter */}
          <PremiumCard className="flex-1">
            <PremiumCardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Dificuldade</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-gradient-premium from-violet-500 to-purple-600 text-white shadow-glow-sm'
                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {difficultyLabels[difficulty]}
                  </button>
                ))}
              </div>
            </PremiumCardContent>
          </PremiumCard>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource: Topic, index: number) => {
          return (
            <div
              key={resource.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <PremiumCard hover>
                <PremiumCardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <PremiumBadge variant="info">{categoryLabels[resource.category]}</PremiumBadge>
                    <PremiumBadge variant={difficultyColors[resource.difficulty]}>
                      {difficultyLabels[resource.difficulty]}
                    </PremiumBadge>
                  </div>
                  <PremiumCardTitle>{resource.title}</PremiumCardTitle>
                  <PremiumCardDescription>{resource.description}</PremiumCardDescription>
                </PremiumCardHeader>
                
                <PremiumCardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span>{resource.lessons.length} aulas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{resource.totalTime} min</span>
                    </div>
                  </div>
                  
                  <Link href={`/learn/${resource.id}`}>
                    <PremiumButton variant="outline" className="w-full">
                      Estudar
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </PremiumButton>
                  </Link>
                </PremiumCardContent>
              </PremiumCard>
            </div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <Library className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum recurso encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou buscar por outros termos
          </p>
        </div>
      )}
    </DashboardLayout>
  )
}
