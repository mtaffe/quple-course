import type { WeeklyChallengeStep } from '@/types/weekly-modules'

export interface ValidationResult {
  success: boolean
  output: string
  error?: string
  criteriaResults: {
    criterion: string
    passed: boolean
  }[]
}

export interface ExecutionOptions {
  timeout?: number // ms
  expectedOutput?: string
  testCases?: { input: any; expected: any }[]
}

export class CodeValidator {
  private static readonly DEFAULT_TIMEOUT = 5000 // 5s

  /**
   * Executa código JavaScript e captura output
   */
  static async execute(
    code: string,
    options: ExecutionOptions = {}
  ): Promise<{ output: string; error?: string }> {
    const logs: string[] = []
    const errors: string[] = []

    // Backup console methods (outside try to ensure restoration)
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    try {
      // Override console
      console.log = (...args: any[]) => {
        logs.push(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' ')
        )
        originalLog(...args)
      }

      console.error = (...args: any[]) => {
        errors.push(
          args.map((arg) => String(arg)).join(' ')
        )
        originalError(...args)
      }

      console.warn = (...args: any[]) => {
        logs.push(`⚠️  ${args.map((arg) => String(arg)).join(' ')}`)
        originalWarn(...args)
      }

      // Execute with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error('Tempo limite excedido')),
          options.timeout || this.DEFAULT_TIMEOUT
        )
      })

      const executionPromise = new Promise<void>((resolve, reject) => {
        try {
          // Create safe execution context
          const safeEval = new Function('console', code)
          safeEval(console)
          resolve()
        } catch (err: any) {
          reject(err)
        }
      })

      await Promise.race([executionPromise, timeoutPromise])

      return {
        output: logs.join('\n') || 'Código executado sem output',
        error: errors.length > 0 ? errors.join('\n') : undefined,
      }
    } catch (err: any) {
      return {
        output: logs.join('\n'),
        error: err.message || 'Erro desconhecido',
      }
    } finally {
      // ALWAYS restore console, even on error/timeout
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
    }
  }

  /**
   * Valida código contra critérios do desafio
   */
  static validate(
    code: string,
    step: WeeklyChallengeStep,
    executionOutput?: string
  ): ValidationResult {
    const criteriaResults = step.validationCriteria.map((criterion) => {
      const passed = this.checkCriterion(code, criterion, executionOutput)
      return { criterion, passed }
    })

    const allPassed = criteriaResults.every((r) => r.passed)

    return {
      success: allPassed,
      output: executionOutput || '',
      criteriaResults,
    }
  }

  /**
   * Verifica um critério específico
   */
  private static checkCriterion(
    code: string,
    criterion: string,
    output?: string
  ): boolean {
    const lowerCode = code.toLowerCase()
    const lowerCriterion = criterion.toLowerCase()

    // Keyword validation
    const keywordPatterns: { [key: string]: RegExp } = {
      'queryselector': /document\.queryselector/i,
      'function': /function\s+\w+|const\s+\w+\s*=\s*\(|let\s+\w+\s*=\s*\(/,
      'for': /for\s*\(/,
      'while': /while\s*\(/,
      'if': /if\s*\(/,
      'const': /const\s+/,
      'let': /let\s+/,
      'return': /return\s+/,
      'classlist': /\.classlist/i,
      'addeventlistener': /\.addeventlistener/i,
      'createelement': /document\.createelement/i,
      'foreach': /\.foreach/i,
      'map': /\.map\s*\(/,
      'filter': /\.filter\s*\(/,
    }

    // Check keyword patterns
    for (const [key, pattern] of Object.entries(keywordPatterns)) {
      if (lowerCriterion.includes(key)) {
        if (!pattern.test(code)) {
          return false
        }
      }
    }

    // Output validation
    if (lowerCriterion.includes('output') && output) {
      const expectedMatch = lowerCriterion.match(/output[:\s]+(.+)/i)
      if (expectedMatch) {
        const expectedValue = expectedMatch[1].trim()
        if (!output.toLowerCase().includes(expectedValue.toLowerCase())) {
          return false
        }
      }
    }

    // Number validation
    const numberMatch = lowerCriterion.match(/(\d+)/

)
    if (numberMatch) {
      const expectedNumber = numberMatch[1]
      if (!code.includes(expectedNumber) && !output?.includes(expectedNumber)) {
        return false
      }
    }

    return true
  }

  /**
   * Executa e valida em uma única operação
   */
  static async executeAndValidate(
    code: string,
    step: WeeklyChallengeStep,
    options: ExecutionOptions = {}
  ): Promise<ValidationResult> {
    const { output, error } = await this.execute(code, options)
    const validation = this.validate(code, step, output)

    // CRITICAL: If execution failed, force success to false
    if (error) {
      return {
        ...validation,
        success: false,
        output,
        error,
      }
    }

    return {
      ...validation,
      output,
      error,
    }
  }

  /**
   * Testa código com casos de teste
   */
  static async runTestCases(
    code: string,
    testCases: { input: any; expected: any; description?: string }[]
  ): Promise<{
    passed: number
    failed: number
    results: { description: string; passed: boolean; actual: any; expected: any }[]
  }> {
    const results: any[] = []

    for (const testCase of testCases) {
      try {
        // Wrap code in function that accepts input
        const wrappedCode = `
          ${code}
          return ${testCase.input};
        `

        const fn = new Function(wrappedCode)
        const actual = fn()
        const passed = JSON.stringify(actual) === JSON.stringify(testCase.expected)

        results.push({
          description: testCase.description || `Test ${results.length + 1}`,
          passed,
          actual,
          expected: testCase.expected,
        })
      } catch (err: any) {
        results.push({
          description: testCase.description || `Test ${results.length + 1}`,
          passed: false,
          actual: null,
          expected: testCase.expected,
        })
      }
    }

    return {
      passed: results.filter((r) => r.passed).length,
      failed: results.filter((r) => !r.passed).length,
      results,
    }
  }
}
