'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Lightbulb, Eye, EyeOff, Code2 } from 'lucide-react'

// Tipos para suporte a dicas expandidas
type Hint = string | {
  level: number
  title: string
  content: string
  example?: string
}

interface HintSystemProps {
  hints: Hint[]
  onHintUsed?: (hintIndex: number) => void
}

export function HintSystem({ hints, onHintUsed }: HintSystemProps) {
  const [visibleHints, setVisibleHints] = useState<number[]>([])

  const showNextHint = () => {
    const nextHintIndex = visibleHints.length
    if (nextHintIndex < hints.length) {
      setVisibleHints([...visibleHints, nextHintIndex])
      onHintUsed?.(nextHintIndex)
    }
  }

  const toggleHint = (index: number) => {
    if (visibleHints.includes(index)) {
      setVisibleHints(visibleHints.filter(i => i !== index))
    } else {
      setVisibleHints([...visibleHints, index])
    }
  }

  if (hints.length === 0) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Dicas
          <Badge variant="secondary">{visibleHints.length}/{hints.length}</Badge>
        </CardTitle>
        <CardDescription>
          Use as dicas se estiver com dificuldades!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hints.map((hint, index) => {
          // Suporte a ambos os formatos de dica
          const isExpandedHint = typeof hint === 'object'
          const hintTitle = isExpandedHint ? hint.title : `Dica ${index + 1}`
          const hintContent = isExpandedHint ? hint.content : hint
          const hintExample = isExpandedHint ? hint.example : undefined

          return (
            <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Nível {index + 1}
                  </Badge>
                  <span className="text-sm font-semibold text-gray-800">
                    {hintTitle}
                  </span>
                </div>
                {index < visibleHints.length && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleHint(index)}
                    className="h-6 px-2"
                  >
                    {visibleHints.includes(index) ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>

              {visibleHints.includes(index) ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {hintContent}
                  </div>

                  {hintExample && (
                    <div className="bg-gray-800 text-green-400 p-3 rounded-lg font-mono text-xs">
                      <div className="flex items-center space-x-2 mb-2">
                        <Code2 className="h-3 w-3" />
                        <span className="text-gray-300 text-xs">Exemplo:</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{hintExample}</pre>
                    </div>
                  )}
                </div>
              ) : index === visibleHints.length ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showNextHint}
                  className="w-full bg-white hover:bg-blue-50 border-blue-300"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Revelar Esta Dica
                </Button>
              ) : (
                <div className="h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">
                    🔒 Bloqueada - Complete a dica anterior primeiro
                  </span>
                </div>
              )}
            </div>
          )
        })}

        {visibleHints.length === hints.length && (
          <div className="text-center pt-2">
            <Badge variant="secondary">
              Todas as dicas foram reveladas!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}