'use client'

import { useState, useEffect } from 'react'
import { X, Lightbulb, BookOpen, Code, ExternalLink, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PocketContent {
  id: string
  title: string
  content: string
  type: 'tip' | 'concept' | 'example'
  codeExample?: string
  relatedLesson?: {
    title: string
    url: string
  }
}

interface ModalPocketProps {
  isOpen: boolean
  onClose: () => void
  challengeId: number
  context?: string // contexto específico que acionou o modal
}

// Dados contextuais por desafio
const pocketData: Record<number, PocketContent[]> = {
  1: [
    {
      id: 'html-basic-structure',
      title: 'Estrutura Básica do HTML',
      type: 'concept',
      content: `Todo documento HTML precisa começar com uma estrutura básica.

**Elementos obrigatórios:**
• \`<!DOCTYPE html>\` - declara que é HTML5
• \`<html>\` - elemento raiz que contém toda a página
• \`<head>\` - metadados que não aparecem na página
• \`<body>\` - conteúdo visível da página

**Por que usar \`<h1>\`?**
O \`<h1>\` é o título principal da página. Cada página deve ter apenas um \`<h1>\` que descreve o conteúdo principal.`,
      codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
</head>
<body>
    <h1>Título Principal</h1>
</body>
</html>`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    },
    {
      id: 'semantic-html',
      title: 'HTML Semântico',
      type: 'tip',
      content: `Use sempre HTML semântico para melhor acessibilidade e SEO.

**Dica importante:**
O \`<h1>\` não é apenas para "títulos grandes". Ele indica a HIERARQUIA do conteúdo. Navegadores, leitores de tela e mecanismos de busca usam essa informação.

**Como pensar:**
• \`<h1>\` = "Sobre o que é esta página?"
• \`<h2>\` = "Quais são as seções principais?"
• \`<h3>\` = "Quais são as subseções?"`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ],
  2: [
    {
      id: 'multiple-elements',
      title: 'Combinando Elementos HTML',
      type: 'concept',
      content: `Quando você tem múltiplos elementos, cada um serve um propósito específico.

**\`<h1>\` + \`<p>\`:**
Esta é uma combinação muito comum e semântica:
• \`<h1>\` apresenta o tópico principal
• \`<p>\` desenvolve a ideia com mais detalhes

**Estrutura lógica:**
Pense como um artigo de jornal - primeiro o título, depois o conteúdo.`,
      codeExample: `<h1>Bem-vindo ao Quple</h1>
<p>O app que conecta casais através de objetivos compartilhados.</p>

<!-- Isso cria uma hierarquia clara e lógica -->`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ],
  3: [
    {
      id: 'heading-hierarchy',
      title: 'Hierarquia de Títulos',
      type: 'concept',
      content: `HTML oferece 6 níveis de títulos (\`<h1>\` até \`<h6>\`) para criar estrutura.

**Regra importante:**
Use os títulos em ordem hierárquica! Não pule níveis.

**✅ Correto:**
\`<h1>\` → \`<h2>\` → \`<h3>\`

**❌ Errado:**
\`<h1>\` → \`<h3>\` (pulou o h2)

**Por que isso importa?**
Tecnologias assistivas (leitores de tela) usam essa hierarquia para navegação.`,
      codeExample: `<h1>Sobre o Quple</h1>
<p>Nosso app revolucionário...</p>

<h2>Funcionalidades Principais</h2>
<p>Descrição das funcionalidades...</p>

<h2>Como Funciona</h2>
<p>Explicação do processo...</p>`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ]
}

export function ModalPocket({ isOpen, onClose, challengeId }: ModalPocketProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const pocketContents = pocketData[challengeId] || []

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || pocketContents.length === 0) return null

  const currentContent = pocketContents[currentIndex]

  const goToNext = () => {
    if (currentIndex < pocketContents.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5" />
      case 'concept':
        return <BookOpen className="h-5 w-5" />
      case 'example':
        return <Code className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/20'
      case 'concept':
        return 'text-primary bg-primary/20'
      case 'example':
        return 'text-accent bg-accent/20'
      default:
        return 'text-primary bg-primary/20'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tip':
        return 'Dica'
      case 'concept':
        return 'Conceito'
      case 'example':
        return 'Exemplo'
      default:
        return 'Ajuda'
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={cn(
            "relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl transform transition-all duration-300",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-lg", getTypeColor(currentContent.type))}>
                {getTypeIcon(currentContent.type)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    getTypeColor(currentContent.type)
                  )}>
                    {getTypeLabel(currentContent.type)}
                  </span>
                  {pocketContents.length > 1 && (
                    <span className="text-xs text-muted-foreground">
                      {currentIndex + 1} de {pocketContents.length}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1">
                  {currentContent.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Text Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {currentContent.content}
              </div>
            </div>

            {/* Code Example */}
            {currentContent.codeExample && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <span className="text-sm font-medium text-foreground">Exemplo:</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-foreground">{currentContent.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Related Lesson */}
            {currentContent.relatedLesson && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary">
                      Quer saber mais?
                    </div>
                    <div className="text-sm text-foreground">
                      {currentContent.relatedLesson.title}
                    </div>
                  </div>
                  <a
                    href={currentContent.relatedLesson.url}
                    className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                    onClick={() => onClose()}
                  >
                    <span className="text-sm font-medium">Ver lição</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          {pocketContents.length > 1 && (
            <div className="flex items-center justify-between p-6 border-t border-border">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all",
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "glass-card premium-hover"
                )}
              >
                <span>Anterior</span>
              </button>

              <div className="flex space-x-2">
                {pocketContents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                disabled={currentIndex === pocketContents.length - 1}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all",
                  currentIndex === pocketContents.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "btn-primary-gradient premium-hover"
                )}
              >
                <span>Próximo</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}