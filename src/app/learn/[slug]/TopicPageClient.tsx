'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, BookOpen, Code, Clock, Target } from 'lucide-react'
import { ContentNavigation } from '@/components/navigation/ContentNavigation'

interface LessonSection {
  id: string
  title: string
  content: string
  codeExample?: string
  type: 'theory' | 'example'
}

interface Lesson {
  id: string
  title: string
  description: string
  estimatedTime: number
  sections: LessonSection[]
}

interface Topic {
  title: string
  description: string
  category: string
  totalTime: number
  lessons: Lesson[]
}

interface TopicPageClientProps {
  topic: Topic
  slug: string
}

export function TopicPageClient({ topic, slug }: TopicPageClientProps) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  const lesson = topic.lessons[currentLesson]
  const section = lesson.sections[currentSection]

  const goToNextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else if (currentLesson < topic.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setCurrentSection(0)
    }
  }

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    } else if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
      setCurrentSection(topic.lessons[currentLesson - 1].sections.length - 1)
    }
  }

  const isFirstSection = currentLesson === 0 && currentSection === 0
  const isLastSection = currentLesson === topic.lessons.length - 1 &&
                       currentSection === lesson.sections.length - 1

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/learn"
                className="glass-card p-2 rounded-lg premium-hover"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">{topic.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Lição {currentLesson + 1}: {lesson.title}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Seção {currentSection + 1} de {lesson.sections.length}
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{lesson.estimatedTime}min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Progress */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Progresso
              </h3>

              <div className="space-y-3">
                {topic.lessons.map((lessonItem, lessonIndex) => (
                  <div key={lessonItem.id} className="space-y-2">
                    <div
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        lessonIndex === currentLesson
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => {
                        setCurrentLesson(lessonIndex)
                        setCurrentSection(0)
                      }}
                    >
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      <span className="text-sm font-medium">{lessonItem.title}</span>
                    </div>

                    {lessonIndex === currentLesson && (
                      <div className="ml-6 space-y-1">
                        {lessonItem.sections.map((sectionItem, sectionIndex) => (
                          <div
                            key={sectionItem.id}
                            className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                              sectionIndex === currentSection
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                            onClick={() => setCurrentSection(sectionIndex)}
                          >
                            {sectionItem.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Navigation */}
            <ContentNavigation
              currentContext="learn"
              topicSlug={slug}
              className="mt-6"
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-xl p-8">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  {section.type === 'theory' && <BookOpen className="h-5 w-5 text-primary" />}
                  {section.type === 'example' && <Code className="h-5 w-5 text-accent" />}

                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    section.type === 'theory' ? 'bg-primary/20 text-primary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {section.type === 'theory' ? 'Teoria' : 'Exemplo'}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {section.title}
                </h2>
              </div>

              {/* Section Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {/* Code Example */}
                {section.codeExample && (
                  <div className="mt-6">
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b border-border">
                        <span className="text-sm font-medium text-foreground">Exemplo:</span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-foreground">{section.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
                <button
                  onClick={goToPrevSection}
                  disabled={isFirstSection}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isFirstSection
                      ? 'opacity-50 cursor-not-allowed'
                      : 'glass-card premium-hover'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Anterior</span>
                </button>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    {currentSection + 1} de {lesson.sections.length} seções
                  </div>
                </div>

                <button
                  onClick={goToNextSection}
                  disabled={isLastSection}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isLastSection
                      ? 'opacity-50 cursor-not-allowed'
                      : 'btn-primary-gradient premium-hover'
                  }`}
                >
                  <span>Próximo</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Lesson Complete */}
            {isLastSection && (
              <div className="glass-card rounded-xl p-8 mt-6 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Lição Concluída!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Parabéns! Você completou &quot;{lesson.title}&quot;.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/learn"
                    className="glass-card text-foreground px-6 py-2 rounded-lg font-medium premium-hover"
                  >
                    Ver Todos os Tópicos
                  </Link>
                  <Link
                    href="/dashboard"
                    className="btn-primary-gradient px-6 py-2 rounded-lg font-medium premium-hover"
                  >
                    Praticar nos Desafios
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}