'use client'

import { useState } from 'react'
import { CodeEditor } from './CodeEditor'
import { Button } from '@/components/ui/Button'
import { Play, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WeeklyChallengeStep } from '@/types/weekly-modules'
import { CodeValidator, type ValidationResult } from '@/lib/validation/code-validator'

interface ChallengeEditorProps {
  challenge: WeeklyChallengeStep
  onSuccess?: () => void
  initialCode?: string
}

export function ChallengeEditor({ 
  challenge, 
  onSuccess,
  initialCode 
}: ChallengeEditorProps) {
  const [code, setCode] = useState(initialCode || challenge.starterCode || '')
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const runCode = async () => {
    setIsRunning(true)
    setValidationResult(null)

    try {
      const result = await CodeValidator.executeAndValidate(code, challenge)
      setValidationResult(result)

      if (result.success) {
        onSuccess?.()
      }
    } catch (error: any) {
      setValidationResult({
        success: false,
        output: '',
        error: error.message,
        criteriaResults: [],
      })
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(challenge.starterCode || '')
    setValidationResult(null)
  }

  const showSolution = () => {
    setCode(challenge.solution || '')
    setValidationResult(null)
  }

  return (
    <div className="space-y-4">
      {/* Instrução */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          {challenge.title}
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {challenge.instruction}
        </p>
      </div>

      {/* Editor */}
      <div className="border rounded-lg overflow-hidden">
        <CodeEditor
          value={code}
          onChange={setCode}
          language="javascript"
          height="300px"
        />
      </div>

      {/* Controles */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button 
          onClick={runCode} 
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Executando...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Executar Código
            </>
          )}
        </Button>

        <Button 
          onClick={resetCode} 
          variant="outline"
          disabled={isRunning}
        >
          Resetar
        </Button>

        <Button 
          onClick={showSolution} 
          variant="ghost"
          disabled={isRunning}
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
        >
          Ver Solução
        </Button>

        {status === 'success' && (
          <div className="flex items-center text-green-600 font-medium">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Correto! +{challenge.xpReward} XP
          </div>
        )}
      </div>

      {/* Output */}
      {output && (
        <div 
          className={cn(
            "border rounded-lg p-4 font-mono text-sm",
            status === 'error' && "bg-red-50 border-red-200 text-red-900",
            status === 'success' && "bg-green-50 border-green-200 text-green-900",
            status === 'idle' && "bg-gray-50 border-gray-200 text-gray-900"
          )}
        >
          <div className="flex items-start gap-2">
            {status === 'error' && <XCircle className="w-5 h-5 text-red-600 mt-0.5" />}
            {status === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />}
            <div className="flex-1">
              <div className="font-semibold mb-1">Output:</div>
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Hints */}
      {challenge.hints && challenge.hints.length > 0 && (
        <details className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950">
          <summary className="cursor-pointer font-semibold text-amber-900 dark:text-amber-100">
            💡 Dicas ({challenge.hints.length})
          </summary>
          <ul className="mt-3 space-y-2 text-sm text-amber-700 dark:text-amber-300">
            {challenge.hints.map((hint: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-bold">{i + 1}.</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Critérios de Validação */}
      {challenge.validationCriteria && challenge.validationCriteria.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4">
          <h5 className="font-semibold mb-2 text-sm">Critérios de Validação:</h5>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {challenge.validationCriteria.map((criteria: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
