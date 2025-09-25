import { ValidationResult } from '@/types'

export class CodeValidator {
  static validateHTML(code: string): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    let score = 100

    // Basic HTML structure validation
    if (!code.includes('<!DOCTYPE html>')) {
      errors.push('Falta a declaração DOCTYPE')
      score -= 20
    }

    if (!code.includes('<html')) {
      errors.push('Falta a tag <html>')
      score -= 20
    }

    if (!code.includes('<head>')) {
      errors.push('Falta a tag <head>')
      score -= 15
    }

    if (!code.includes('<body>')) {
      errors.push('Falta a tag <body>')
      score -= 15
    }

    // Meta charset validation
    if (!code.includes('charset=')) {
      warnings.push('Recomenda-se adicionar meta charset="UTF-8"')
      score -= 5
    }

    // Title validation
    if (!code.includes('<title>')) {
      warnings.push('Recomenda-se adicionar um título à página')
      score -= 5
    }

    // Accessibility validation
    const inputMatches = code.match(/<input[^>]*>/g) || []
    const labelMatches = code.match(/<label[^>]*>/g) || []

    if (inputMatches.length > 0 && labelMatches.length === 0) {
      warnings.push('Adicione labels aos seus inputs para melhor acessibilidade')
      score -= 10
    }

    // Form validation
    if (code.includes('<form') && !code.includes('action=')) {
      warnings.push('Considere adicionar um action ao seu formulário')
      score -= 5
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }

  static validateCSS(code: string): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    let score = 100

    // Check if CSS is present in HTML
    if (!code.includes('<style>') && !code.includes('style=')) {
      errors.push('Não foi encontrado CSS no código')
      score -= 50
    }

    // Basic CSS structure
    if (code.includes('<style>') && !code.includes('</style>')) {
      errors.push('Tag <style> não foi fechada corretamente')
      score -= 20
    }

    // Check for basic styling elements
    const hasColors = /color\s*:|background\s*:/.test(code)
    if (!hasColors) {
      warnings.push('Considere adicionar cores ao seu design')
      score -= 10
    }

    const hasFonts = /font-family\s*:|font-size\s*:/.test(code)
    if (!hasFonts) {
      warnings.push('Considere definir tipografia')
      score -= 10
    }

    const hasSpacing = /margin\s*:|padding\s*:/.test(code)
    if (!hasSpacing) {
      warnings.push('Adicione espaçamento com margin/padding')
      score -= 10
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }

  static validateChallenge(challengeId: number, code: string): ValidationResult {
    let result: ValidationResult

    switch (challengeId) {
      case 1:
        return this.validateChallenge1(code)
      case 2:
        return this.validateChallenge2(code)
      case 3:
        return this.validateChallenge3(code)
      case 4:
        return this.validateChallenge4(code)
      case 5:
        return this.validateChallenge5(code)
      default:
        result = this.validateHTML(code)
    }

    return result
  }

  private static validateChallenge1(code: string): ValidationResult {
    const baseValidation = this.validateHTML(code)
    const errors = [...baseValidation.errors]
    const warnings = [...baseValidation.warnings]
    let score = baseValidation.score

    // Challenge 1 specific validations
    if (!code.includes('<h1>')) {
      errors.push('Adicione um título principal (h1) ao seu app')
      score -= 15
    }

    if (!code.includes('<form>')) {
      errors.push('Crie um formulário de login')
      score -= 20
    }

    if (!code.includes('type="email"')) {
      errors.push('Adicione um campo de email')
      score -= 15
    }

    if (!code.includes('type="password"')) {
      errors.push('Adicione um campo de senha')
      score -= 15
    }

    if (!code.includes('<button')) {
      errors.push('Adicione um botão de submit')
      score -= 10
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }

  private static validateChallenge2(code: string): ValidationResult {
    const baseValidation = this.validateHTML(code)
    const errors = [...baseValidation.errors]
    const warnings = [...baseValidation.warnings]
    let score = baseValidation.score

    // Challenge 2 specific validations
    if (!code.includes('type="text"') && !code.includes('name="name"')) {
      errors.push('Adicione um campo de nome')
      score -= 20
    }

    if (!code.includes('confirm-password') && !code.includes('confirmar')) {
      errors.push('Adicione um campo para confirmar a senha')
      score -= 20
    }

    if (!code.includes('type="number"') && !code.includes('idade')) {
      errors.push('Adicione um campo de idade')
      score -= 15
    }

    const requiredCount = (code.match(/required/g) || []).length
    if (requiredCount < 3) {
      warnings.push('Adicione o atributo "required" nos campos obrigatórios')
      score -= 10
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }

  private static validateChallenge3(code: string): ValidationResult {
    const baseValidation = this.validateHTML(code)
    const errors = [...baseValidation.errors]
    const warnings = [...baseValidation.warnings]
    let score = baseValidation.score

    // Challenge 3 specific validations
    const linkMatches = code.match(/<a[^>]*href=[^>]*>/g) || []
    if (linkMatches.length < 3) {
      errors.push('Adicione links de navegação com href')
      score -= 25
    }

    if (!code.includes('<button')) {
      errors.push('Adicione botões de ação')
      score -= 20
    }

    if (!code.includes('<nav>')) {
      warnings.push('Use a tag <nav> para navegação')
      score -= 10
    }

    const emptyLinks = (code.match(/<a[^>]*>/g) || []).filter(link =>
      !link.includes('href=') || link.includes('href=""') || link.includes('href="#"')
    ).length

    if (emptyLinks > 0) {
      errors.push('Todos os links devem ter um href válido')
      score -= 15
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }

  private static validateChallenge4(code: string): ValidationResult {
    const baseValidation = this.validateHTML(code)
    const errors = [...baseValidation.errors]
    const warnings = [...baseValidation.warnings]
    let score = baseValidation.score

    // Challenge 4 specific validations
    if (!code.includes('<header>')) {
      errors.push('Use a tag <header> para o cabeçalho')
      score -= 15
    }

    if (!code.includes('<main>')) {
      errors.push('Use a tag <main> para o conteúdo principal')
      score -= 15
    }

    if (!code.includes('<section>')) {
      errors.push('Use tags <section> para organizar o conteúdo')
      score -= 15
    }

    if (!code.includes('<article>')) {
      warnings.push('Considere usar <article> para conteúdo independente')
      score -= 10
    }

    // Check heading hierarchy
    const h1Count = (code.match(/<h1>/g) || []).length
    const h2Count = (code.match(/<h2>/g) || []).length
    const h3Count = (code.match(/<h3>/g) || []).length

    if (h1Count !== 1) {
      errors.push('Deve haver exatamente um h1 por página')
      score -= 20
    }

    if (h2Count === 0 && h3Count > 0) {
      errors.push('Hierarquia incorreta: h3 sem h2')
      score -= 15
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }

  private static validateChallenge5(code: string): ValidationResult {
    const baseValidation = this.validateHTML(code)
    const cssValidation = this.validateCSS(code)
    const errors = [...baseValidation.errors, ...cssValidation.errors]
    const warnings = [...baseValidation.warnings, ...cssValidation.warnings]
    let score = Math.min(baseValidation.score, cssValidation.score)

    // Challenge 5 specific validations
    if (!code.includes('background') && !code.includes('color:')) {
      errors.push('Adicione cores ao seu design')
      score -= 25
    }

    if (!code.includes('font-')) {
      errors.push('Defina propriedades de tipografia')
      score -= 20
    }

    if (!code.includes('padding') && !code.includes('margin')) {
      errors.push('Adicione espaçamento com padding/margin')
      score -= 20
    }

    if (code.includes('flexbox') || code.includes('display: flex')) {
      warnings.push('Ótimo uso do flexbox!')
    } else {
      warnings.push('Considere usar flexbox para layout')
      score -= 10
    }

    if (code.includes(':hover')) {
      warnings.push('Excelente! Efeitos hover melhoram a UX')
    }

    return {
      isValid: errors.length === 0 && score >= 70,
      errors,
      warnings,
      score: Math.max(0, score)
    }
  }
}