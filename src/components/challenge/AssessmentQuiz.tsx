'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'

// Perguntas da avaliação organizadas por nível de dificuldade
const assessmentQuestions = [
  // NÍVEL BÁSICO - HTML/CSS Fundamental
  {
    id: 1,
    category: "HTML",
    difficulty: "basic",
    points: 5,
    question: "Qual tag HTML é usada para criar o título principal de uma página?",
    options: [
      { id: "a", text: "<title>", explanation: "Esta tag define o título que aparece na aba do navegador" },
      { id: "b", text: "<h1>", explanation: "Correto! <h1> é usada para o título principal visível na página" },
      { id: "c", text: "<header>", explanation: "Esta tag define uma seção de cabeçalho, não um título específico" },
      { id: "d", text: "<main>", explanation: "Esta tag define o conteúdo principal da página" }
    ],
    correct: "b",
    explanation: "A tag <h1> é usada para criar o título principal de uma página web. É importante para SEO e acessibilidade."
  },
  {
    id: 2,
    category: "CSS",
    difficulty: "basic",
    points: 5,
    question: "Como você aplicaria cor vermelha ao texto de um elemento em CSS?",
    options: [
      { id: "a", text: "color: red;", explanation: "Correto! A propriedade color define a cor do texto" },
      { id: "b", text: "background: red;", explanation: "Isso definiria a cor de fundo, não do texto" },
      { id: "c", text: "text-color: red;", explanation: "Esta propriedade não existe em CSS" },
      { id: "d", text: "font-color: red;", explanation: "Esta propriedade não existe em CSS" }
    ],
    correct: "a",
    explanation: "A propriedade CSS 'color' é usada para definir a cor do texto de um elemento."
  },
  {
    id: 3,
    category: "HTML",
    difficulty: "basic",
    points: 5,
    question: "Qual é a estrutura básica MÍNIMA de um documento HTML5?",
    options: [
      { id: "a", text: "Apenas <html></html>", explanation: "Muito básico - faltam elementos essenciais" },
      { id: "b", text: "<!DOCTYPE html> + <html> + <head> + <body>", explanation: "Correto! Esta é a estrutura mínima recomendada" },
      { id: "c", text: "Apenas <body></body>", explanation: "Falta a declaração do tipo de documento e estrutura" },
      { id: "d", text: "<div></div>", explanation: "Div é apenas um elemento de estrutura, não um documento" }
    ],
    correct: "b",
    explanation: "Todo documento HTML5 precisa de: DOCTYPE, html, head e body para funcionar corretamente."
  },

  // NÍVEL INTERMEDIÁRIO - CSS Layout/JavaScript Básico
  {
    id: 4,
    category: "CSS",
    difficulty: "intermediate",
    points: 10,
    question: "Qual propriedade CSS é melhor para criar layouts flexíveis e responsivos?",
    options: [
      { id: "a", text: "float", explanation: "Método antigo, difícil de controlar e não responsivo" },
      { id: "b", text: "position", explanation: "Útil para posicionamento específico, mas não para layouts gerais" },
      { id: "c", text: "flexbox", explanation: "Correto! Flexbox é ideal para layouts flexíveis e responsivos" },
      { id: "d", text: "table", explanation: "Tables são para dados tabulares, não para layout de página" }
    ],
    correct: "c",
    explanation: "Flexbox (display: flex) é a melhor opção moderna para criar layouts flexíveis e responsivos."
  },
  {
    id: 5,
    category: "JavaScript",
    difficulty: "intermediate",
    points: 10,
    question: "Como você seleciona um elemento HTML por ID em JavaScript?",
    options: [
      { id: "a", text: "document.getElementById('id')", explanation: "Correto! Método padrão para selecionar por ID" },
      { id: "b", text: "document.getElement('id')", explanation: "Este método não existe" },
      { id: "c", text: "document.selectById('id')", explanation: "Este método não existe" },
      { id: "d", text: "getElementById('id')", explanation: "Falta o 'document.' no início" }
    ],
    correct: "a",
    explanation: "document.getElementById() é o método padrão para selecionar elementos por ID no JavaScript."
  },
  {
    id: 6,
    category: "CSS",
    difficulty: "intermediate",
    points: 10,
    question: "Para tornar um site responsivo, qual regra CSS você usaria?",
    options: [
      { id: "a", text: "@media screen", explanation: "Quase correto, mas falta a condição de largura" },
      { id: "b", text: "@media (max-width: 768px)", explanation: "Correto! Media queries são essenciais para responsividade" },
      { id: "c", text: "@responsive (mobile)", explanation: "Esta regra não existe em CSS" },
      { id: "d", text: "@device (phone)", explanation: "Esta regra não existe em CSS" }
    ],
    correct: "b",
    explanation: "Media queries com @media (max-width: ...) são fundamentais para criar designs responsivos."
  },

  // NÍVEL AVANÇADO - JavaScript/React
  {
    id: 7,
    category: "JavaScript",
    difficulty: "advanced",
    points: 15,
    question: "Qual método de array você usaria para transformar todos os elementos de um array?",
    options: [
      { id: "a", text: "forEach()", explanation: "forEach executa uma função para cada elemento, mas não retorna novo array" },
      { id: "b", text: "map()", explanation: "Correto! map() transforma elementos e retorna um novo array" },
      { id: "c", text: "filter()", explanation: "filter() filtra elementos, não os transforma" },
      { id: "d", text: "reduce()", explanation: "reduce() reduz o array a um único valor" }
    ],
    correct: "b",
    explanation: "O método map() é usado para transformar todos os elementos de um array, retornando um novo array."
  },
  {
    id: 8,
    category: "React",
    difficulty: "advanced",
    points: 15,
    question: "Em React, qual Hook você usaria para gerenciar estado local de um componente?",
    options: [
      { id: "a", text: "useEffect", explanation: "useEffect é para efeitos colaterais, não para estado" },
      { id: "b", text: "useState", explanation: "Correto! useState é o Hook básico para gerenciar estado local" },
      { id: "c", text: "useContext", explanation: "useContext é para consumir contexto global" },
      { id: "d", text: "useReducer", explanation: "useReducer é para estado complexo, useState é mais básico" }
    ],
    correct: "b",
    explanation: "useState é o Hook fundamental do React para gerenciar estado local em componentes funcionais."
  },
  {
    id: 9,
    category: "JavaScript",
    difficulty: "advanced",
    points: 15,
    question: "O que são Promises em JavaScript?",
    options: [
      { id: "a", text: "Funções que executam imediatamente", explanation: "Promises são sobre operações assíncronas, não execução imediata" },
      { id: "b", text: "Objetos para lidar com operações assíncronas", explanation: "Correto! Promises representam operações que podem completar no futuro" },
      { id: "c", text: "Variáveis que armazenam valores", explanation: "Promises são mais complexas que simples variáveis" },
      { id: "d", text: "Métodos de arrays", explanation: "Promises não são métodos de arrays" }
    ],
    correct: "b",
    explanation: "Promises são objetos que representam a eventual conclusão ou falha de uma operação assíncrona."
  },
  {
    id: 10,
    category: "React",
    difficulty: "advanced",
    points: 15,
    question: "Qual é a diferença principal entre props e state em React?",
    options: [
      { id: "a", text: "Não há diferença", explanation: "Há diferenças importantes entre props e state" },
      { id: "b", text: "Props são mutáveis, state é imutável", explanation: "É o contrário - props são imutáveis" },
      { id: "c", text: "Props vêm do pai, state é interno do componente", explanation: "Correto! Props são passadas externamente, state é gerenciado internamente" },
      { id: "d", text: "Props são para CSS, state para JavaScript", explanation: "Ambos são conceitos de JavaScript/React" }
    ],
    correct: "c",
    explanation: "Props são dados passados de um componente pai, enquanto state é gerenciado internamente pelo componente."
  }
]

interface AssessmentQuizProps {
  onComplete: (level: 'beginner' | 'intermediate' | 'advanced', score: number) => void
}

export function AssessmentQuiz({ onComplete }: AssessmentQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const totalQuestions = assessmentQuestions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

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

    // Após 2 segundos, ir para próxima pergunta ou finalizar
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

    const percentage = (totalScore / maxScore) * 100

    // Determinar nível baseado na pontuação
    let level: 'beginner' | 'intermediate' | 'advanced'
    if (percentage <= 30) {
      level = 'beginner'
    } else if (percentage <= 65) {
      level = 'intermediate'
    } else {
      level = 'advanced'
    }

    // Chamar callback após 3 segundos
    setTimeout(() => {
      onComplete(level, percentage)
    }, 3000)
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Avaliação Concluída!
            </h2>
            <p className="text-gray-600 mb-6">
              Processando seus resultados e direcionando você para o nível apropriado...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = assessmentQuestions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl">🔍 Avaliação de Nível</CardTitle>
            <Badge variant="outline">
              {currentQuestion + 1} / {totalQuestions}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </p>
        </CardHeader>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {currentQ.category}
            </Badge>
            <Badge
              variant={currentQ.difficulty === 'basic' ? 'secondary' :
                     currentQ.difficulty === 'intermediate' ? 'outline' : 'default'}
              className="text-xs"
            >
              {currentQ.difficulty === 'basic' ? '📚 Básico' :
               currentQ.difficulty === 'intermediate' ? '💡 Intermediário' : '🚀 Avançado'}
            </Badge>
            <span className="text-xs text-gray-500">{currentQ.points} pontos</span>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQ.question}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!showExplanation ? (
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <div key={option.id}>
                  <button
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
                </div>
              ))}

              <div className="pt-4">
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
              {/* Mostrar resultado da resposta */}
              <div className={`p-4 rounded-lg ${
                selectedAnswer === currentQ.correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              } border-2`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {selectedAnswer === currentQ.correct ? '✅' : '❌'}
                  </span>
                  <span className="font-medium">
                    {selectedAnswer === currentQ.correct ? 'Correto!' : 'Incorreto'}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-2">
                  <strong>Resposta correta:</strong> {currentQ.options.find(opt => opt.id === currentQ.correct)?.text}
                </p>

                <p className="text-sm text-gray-600">
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

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Dica</h3>
              <p className="text-sm text-blue-800">
                Responda honestamente - não há problema em não saber algo!
                Esta avaliação é para te ajudar a começar no nível certo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}