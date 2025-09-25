'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { X } from 'lucide-react'

// Perguntas da avaliação inicial - HTML, CSS, JavaScript
const assessmentQuestions = [
  // HTML Básico
  {
    id: 1,
    type: 'multiple_choice' as const,
    category: 'HTML',
    difficulty: 'basic',
    points: 10,
    question: 'Qual tag HTML é usada para criar um link?',
    options: [
      { id: 'a', text: '<link>' },
      { id: 'b', text: '<a>' },
      { id: 'c', text: '<url>' },
      { id: 'd', text: '<href>' }
    ],
    correct: 'b',
    explanation: 'A tag <a> (anchor) é usada para criar links em HTML.'
  },
  {
    id: 2,
    type: 'true_false' as const,
    category: 'HTML',
    difficulty: 'basic',
    points: 10,
    question: 'A tag <div> é usada apenas para criar divisões visuais na página.',
    correct: 'false',
    explanation: '<div> é um container genérico que pode ser usado para agrupar elementos logicamente, não apenas visualmente.'
  },

  // CSS Básico
  {
    id: 3,
    type: 'multiple_choice' as const,
    category: 'CSS',
    difficulty: 'basic',
    points: 10,
    question: 'Como você define a cor de fundo de um elemento em CSS?',
    options: [
      { id: 'a', text: 'color: blue;' },
      { id: 'b', text: 'bg-color: blue;' },
      { id: 'c', text: 'background-color: blue;' },
      { id: 'd', text: 'background: color(blue);' }
    ],
    correct: 'c',
    explanation: 'background-color é a propriedade CSS correta para definir a cor de fundo.'
  },
  {
    id: 4,
    type: 'true_false' as const,
    category: 'CSS',
    difficulty: 'basic',
    points: 10,
    question: 'CSS significa "Computer Style Sheets".',
    correct: 'false',
    explanation: 'CSS significa "Cascading Style Sheets" (Folhas de Estilo em Cascata).'
  },

  // CSS Intermediário
  {
    id: 5,
    type: 'multiple_choice' as const,
    category: 'CSS',
    difficulty: 'intermediate',
    points: 15,
    question: 'Qual propriedade CSS é melhor para criar layouts flexíveis?',
    options: [
      { id: 'a', text: 'display: block;' },
      { id: 'b', text: 'display: flex;' },
      { id: 'c', text: 'display: inline;' },
      { id: 'd', text: 'display: table;' }
    ],
    correct: 'b',
    explanation: 'display: flex; ativa o Flexbox, ideal para layouts flexíveis e responsivos.'
  },
  {
    id: 6,
    type: 'true_false' as const,
    category: 'CSS',
    difficulty: 'intermediate',
    points: 15,
    question: 'Media queries são usadas apenas para detectar o tamanho da tela.',
    correct: 'false',
    explanation: 'Media queries podem detectar diversos aspectos como orientação, resolução, tipo de dispositivo, etc.'
  },

  // JavaScript Básico
  {
    id: 7,
    type: 'multiple_choice' as const,
    category: 'JavaScript',
    difficulty: 'basic',
    points: 10,
    question: 'Como você seleciona um elemento por ID em JavaScript?',
    options: [
      { id: 'a', text: 'document.getElementById("id")' },
      { id: 'b', text: 'document.selectId("id")' },
      { id: 'c', text: 'getElementById("id")' },
      { id: 'd', text: 'document.getById("id")' }
    ],
    correct: 'a',
    explanation: 'document.getElementById() é o método padrão para selecionar elementos por ID.'
  },
  {
    id: 8,
    type: 'true_false' as const,
    category: 'JavaScript',
    difficulty: 'basic',
    points: 10,
    question: 'JavaScript e Java são a mesma linguagem de programação.',
    correct: 'false',
    explanation: 'JavaScript e Java são linguagens completamente diferentes, apesar do nome similar.'
  },

  // JavaScript Intermediário
  {
    id: 9,
    type: 'multiple_choice' as const,
    category: 'JavaScript',
    difficulty: 'intermediate',
    points: 15,
    question: 'Qual método de array retorna um novo array com elementos transformados?',
    options: [
      { id: 'a', text: 'forEach()' },
      { id: 'b', text: 'map()' },
      { id: 'c', text: 'filter()' },
      { id: 'd', text: 'reduce()' }
    ],
    correct: 'b',
    explanation: 'map() aplica uma função a cada elemento e retorna um novo array com os resultados.'
  },
  {
    id: 10,
    type: 'true_false' as const,
    category: 'JavaScript',
    difficulty: 'intermediate',
    points: 15,
    question: 'Event listeners podem ser removidos da mesma forma que são adicionados.',
    correct: 'true',
    explanation: 'Você pode usar removeEventListener() para remover event listeners adicionados com addEventListener().'
  }
]

interface LevelAssessmentModalProps {
  isOpen: boolean
  onComplete: (level: 'beginner' | 'intermediate' | 'advanced', score: number) => void
  onClose?: () => void
  canClose?: boolean
}

export function LevelAssessmentModal({
  isOpen,
  onComplete,
  onClose,
  canClose = false
}: LevelAssessmentModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const totalQuestions = assessmentQuestions.length
  const progress = isStarted ? ((currentQuestion + 1) / totalQuestions) * 100 : 0

  if (!isOpen) return null

  const handleStart = () => {
    setIsStarted(true)
  }

  const handleAnswer = (optionId: string) => {
    setSelectedAnswer(optionId)
  }

  const handleNext = () => {
    if (!selectedAnswer) return

    // Salvar resposta
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestion].id]: selectedAnswer
    }))

    // Mostrar explicação
    setShowExplanation(true)

    // Após 2.5 segundos, ir para próxima pergunta ou finalizar
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer('')
        setShowExplanation(false)
      } else {
        finishAssessment()
      }
    }, 2500)
  }

  const finishAssessment = () => {
    setIsCompleted(true)

    // Calcular pontuação
    let totalScore = 0
    let maxScore = 0

    assessmentQuestions.forEach(question => {
      maxScore += question.points
      const userAnswer = answers[question.id]
      if (userAnswer === question.correct) {
        totalScore += question.points
      }
    })

    const percentage = Math.round((totalScore / maxScore) * 100)

    // Determinar nível baseado na pontuação
    let level: 'beginner' | 'intermediate' | 'advanced'
    if (percentage <= 40) {
      level = 'beginner'
    } else if (percentage <= 70) {
      level = 'intermediate'
    } else {
      level = 'advanced'
    }

    // Chamar callback após 3 segundos
    setTimeout(() => {
      onComplete(level, percentage)
    }, 3000)
  }

  const currentQ = assessmentQuestions[currentQuestion]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-bold">Avaliação de Nível</h2>
          </div>
          {canClose && onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Tela de Boas-vindas */}
        {!isStarted && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">
                Bem-vindo ao React Learning Playground!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Antes de começarmos, vamos descobrir seu nível atual de conhecimento
                em <strong>HTML</strong>, <strong>CSS</strong> e <strong>JavaScript</strong>.
              </p>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-900">ℹ️ Como funciona:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>10 perguntas</strong> sobre HTML, CSS e JavaScript</li>
                    <li>• <strong>Múltipla escolha</strong> e <strong>verdadeiro/falso</strong></li>
                    <li>• <strong>Sem limite de tempo</strong> - vá no seu ritmo</li>
                    <li>• <strong>Feedback educativo</strong> em cada resposta</li>
                    <li>• <strong>Direcionamento personalizado</strong> baseado no resultado</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={handleStart}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
              >
                🎯 Começar Avaliação
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Responda honestamente - queremos te ajudar a começar no nível certo!
              </p>
            </div>
          </div>
        )}

        {/* Tela de Conclusão */}
        {isCompleted && (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Avaliação Concluída!
            </h3>
            <p className="text-gray-600 mb-6">
              Analisando suas respostas e preparando sua jornada personalizada...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          </div>
        )}

        {/* Perguntas */}
        {isStarted && !isCompleted && (
          <div className="p-6 space-y-6">
            {/* Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {currentQ.category}
                  </Badge>
                  <Badge
                    variant={currentQ.difficulty === 'basic' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {currentQ.difficulty === 'basic' ? '📚 Básico' : '💡 Intermediário'}
                  </Badge>
                  <span className="text-xs text-gray-500">{currentQ.points} pontos</span>
                </div>
                <Badge variant="outline">
                  {currentQuestion + 1} / {totalQuestions}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Pergunta */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg leading-relaxed">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showExplanation ? (
                  <div className="space-y-4">
                    {/* Múltipla Escolha */}
                    {currentQ.type === 'multiple_choice' && currentQ.options && (
                      <div className="space-y-3">
                        {currentQ.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              selectedAnswer === option.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium mr-3">{option.id.toUpperCase()}.</span>
                            {option.text}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Verdadeiro/Falso */}
                    {currentQ.type === 'true_false' && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleAnswer('true')}
                          className={`flex-1 p-4 text-center rounded-lg border-2 transition-all ${
                            selectedAnswer === 'true'
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-2xl mb-1">✅</div>
                          <div className="font-medium">Verdadeiro</div>
                        </button>
                        <button
                          onClick={() => handleAnswer('false')}
                          className={`flex-1 p-4 text-center rounded-lg border-2 transition-all ${
                            selectedAnswer === 'false'
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-2xl mb-1">❌</div>
                          <div className="font-medium">Falso</div>
                        </button>
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {currentQuestion < totalQuestions - 1 ? 'Próxima Pergunta' : 'Finalizar Avaliação'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Resultado da resposta */}
                    <div className={`p-4 rounded-lg border-2 ${
                      selectedAnswer === currentQ.correct
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">
                          {selectedAnswer === currentQ.correct ? '✅' : '❌'}
                        </span>
                        <span className="font-medium">
                          {selectedAnswer === currentQ.correct ? 'Correto!' : 'Incorreto'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {currentQ.explanation}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        <span className="text-sm text-gray-600">
                          {currentQuestion < totalQuestions - 1
                            ? 'Preparando próxima pergunta...'
                            : 'Finalizando avaliação...'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}