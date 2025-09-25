// Validador HTML simples e educativo para jovens
// Este arquivo valida HTML de forma clara e com mensagens em português

export interface ValidationResult {
  isValid: boolean
  score: number // 0-100
  errors: Array<{
    rule: string
    message: string
    line?: number
    suggestion?: string
  }>
  warnings: Array<{
    message: string
    suggestion?: string
  }>
  achievements: string[] // IDs das conquistas desbloqueadas
}

export class HTMLValidator {

  // Função principal para validar HTML
  static validate(code: string, challengeId: number): ValidationResult {
    const result: ValidationResult = {
      isValid: false,
      score: 0,
      errors: [],
      warnings: [],
      achievements: []
    }

    // Regras específicas para o Desafio 1
    if (challengeId === 1) {
      return this.validateChallenge1(code)
    }

    return result
  }

  // Validação específica do Desafio 1: "Página em Branco"
  private static validateChallenge1(code: string): ValidationResult {
    const result: ValidationResult = {
      isValid: false,
      score: 0,
      errors: [],
      warnings: [],
      achievements: []
    }

    let score = 0
    const maxScore = 100

    // 1. Verificar DOCTYPE (10 pontos)
    if (this.hasDoctype(code)) {
      score += 10
    } else {
      result.errors.push({
        rule: "must_have_doctype",
        message: "Seu HTML deve começar com <!DOCTYPE html>",
        suggestion: "Adicione <!DOCTYPE html> na primeira linha"
      })
    }

    // 2. Verificar tag <header> (15 pontos)
    if (this.hasTag(code, 'header')) {
      score += 15
    } else {
      result.errors.push({
        rule: "must_have_header_tag",
        message: "Use a tag <header> para o cabeçalho",
        suggestion: "Adicione <header> com o nome do app"
      })
    }

    // 3. Verificar <h1> com "Quple" (15 pontos)
    if (this.hasH1WithQuple(code)) {
      score += 15
    } else {
      result.errors.push({
        rule: "must_have_h1_with_quple",
        message: "Adicione um <h1> com o nome 'Quple'",
        suggestion: "<h1>Quple</h1>"
      })
    }

    // 4. Verificar tag <main> (15 pontos)
    if (this.hasTag(code, 'main')) {
      score += 15
    } else {
      result.errors.push({
        rule: "must_have_main_tag",
        message: "Use a tag <main> para o conteúdo principal",
        suggestion: "Envolva o formulário em <main>"
      })
    }

    // 5. Verificar tag <form> (15 pontos)
    if (this.hasTag(code, 'form')) {
      score += 15
    } else {
      result.errors.push({
        rule: "must_have_form_tag",
        message: "Crie um formulário com a tag <form>",
        suggestion: "Use <form> para agrupar os campos"
      })
    }

    // 6. Verificar input de email (15 pontos)
    if (this.hasEmailInput(code)) {
      score += 15
    } else {
      result.errors.push({
        rule: "must_have_email_input",
        message: "Adicione um campo de email com type='email'",
        suggestion: '<input type="email" id="email" name="email">'
      })
    }

    // 7. Verificar input de senha (10 pontos)
    if (this.hasPasswordInput(code)) {
      score += 10
    } else {
      result.errors.push({
        rule: "must_have_password_input",
        message: "Adicione um campo de senha com type='password'",
        suggestion: '<input type="password" id="password" name="password">'
      })
    }

    // 8. Verificar labels conectados (5 pontos)
    if (this.hasConnectedLabels(code)) {
      score += 5
      result.achievements.push('accessibility_hero')
    } else {
      result.warnings.push({
        message: "Use <label> conectados aos inputs para acessibilidade",
        suggestion: 'Use o atributo "for" no label e "id" no input'
      })
    }

    // Calcular resultado final
    result.score = Math.round((score / maxScore) * 100)
    result.isValid = result.errors.length === 0

    // Conquistas baseadas na pontuação
    if (result.isValid) {
      result.achievements.push('first_html')
    }

    if (result.score === 100) {
      result.achievements.push('semantic_master')
    }

    return result
  }

  // Funções auxiliares para validação

  private static hasDoctype(code: string): boolean {
    return /<!DOCTYPE\s+html>/i.test(code)
  }

  private static hasTag(code: string, tagName: string): boolean {
    const regex = new RegExp(`<${tagName}[^>]*>`, 'i')
    return regex.test(code)
  }

  private static hasH1WithQuple(code: string): boolean {
    return /<h1[^>]*>.*?quple.*?<\/h1>/i.test(code)
  }

  private static hasEmailInput(code: string): boolean {
    return /<input[^>]+type=["']email["'][^>]*>/i.test(code)
  }

  private static hasPasswordInput(code: string): boolean {
    return /<input[^>]+type=["']password["'][^>]*>/i.test(code)
  }

  private static hasConnectedLabels(code: string): boolean {
    // Verifica se existem labels com "for" e inputs com "id" correspondentes
    const labelMatches = code.match(/<label[^>]+for=["']([^"']+)["'][^>]*>/gi)
    const inputMatches = code.match(/<input[^>]+id=["']([^"']+)["'][^>]*>/gi)

    if (!labelMatches || !inputMatches) return false

    const labelFors = labelMatches.map(match => {
      const forMatch = match.match(/for=["']([^"']+)["']/i)
      return forMatch ? forMatch[1] : null
    }).filter(Boolean)

    const inputIds = inputMatches.map(match => {
      const idMatch = match.match(/id=["']([^"']+)["']/i)
      return idMatch ? idMatch[1] : null
    }).filter(Boolean)

    // Verifica se pelo menos um label está conectado a um input
    return labelFors.some(forValue => inputIds.includes(forValue))
  }

  // Função para gerar feedback positivo
  static generateFeedback(result: ValidationResult): string {
    if (result.score >= 90) {
      return "🎉 Excelente trabalho! Seu HTML está quase perfeito!"
    } else if (result.score >= 70) {
      return "👏 Muito bom! Você está no caminho certo!"
    } else if (result.score >= 50) {
      return "💪 Bom progresso! Continue assim!"
    } else {
      return "🌟 Todo mundo começa de algum lugar. Não desista!"
    }
  }
}