interface ErrorPattern {
  pattern: RegExp
  errorType: string
  description: string
  hint: string
  example?: string
  severity: 'low' | 'medium' | 'high'
  category: 'syntax' | 'semantic' | 'logic' | 'best-practice'
}

interface SmartHint {
  id: string
  title: string
  content: string
  example?: string
  type: 'error-based' | 'context' | 'progressive' | 'best-practice'
  priority: number
  triggered: boolean
  errorContext?: string
}

class IntelligentHintSystem {
  private errorPatterns: ErrorPattern[] = [
    // HTML Errors
    {
      pattern: /missing.*doctype/i,
      errorType: 'missing_doctype',
      description: 'DOCTYPE declaration ausente',
      hint: '💡 Todo documento HTML deve começar com `<!DOCTYPE html>` para declarar que é HTML5. Isso garante que o navegador interprete o código corretamente.',
      example: '<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body>...</body>\n</html>',
      severity: 'high',
      category: 'syntax'
    },
    {
      pattern: /unclosed.*tag/i,
      errorType: 'unclosed_tag',
      description: 'Tag HTML não fechada',
      hint: '🔧 Você esqueceu de fechar uma tag HTML! Toda tag que abre deve ter sua correspondente de fechamento. Ex: `<h1>` deve ter `</h1>`.',
      example: '<!-- ❌ Errado -->\n<h1>Título\n\n<!-- ✅ Correto -->\n<h1>Título</h1>',
      severity: 'high',
      category: 'syntax'
    },
    {
      pattern: /missing.*title/i,
      errorType: 'missing_title',
      description: 'Elemento title ausente',
      hint: '📋 O elemento `<title>` é obrigatório no `<head>`. Ele define o título que aparece na aba do navegador e é importante para SEO.',
      example: '<head>\n  <meta charset="UTF-8">\n  <title>Minha Página</title>\n</head>',
      severity: 'medium',
      category: 'semantic'
    },
    {
      pattern: /invalid.*nesting/i,
      errorType: 'invalid_nesting',
      description: 'Aninhamento inválido de elementos',
      hint: '🏗️ Alguns elementos HTML não podem ser aninhados dentro de outros. Por exemplo, não coloque `<div>` dentro de `<p>` ou `<h1>` dentro de `<h2>`.',
      example: '<!-- ❌ Errado -->\n<p><div>conteúdo</div></p>\n\n<!-- ✅ Correto -->\n<div><p>conteúdo</p></div>',
      severity: 'medium',
      category: 'semantic'
    },
    {
      pattern: /missing.*alt.*attribute/i,
      errorType: 'missing_alt',
      description: 'Atributo alt ausente em imagem',
      hint: '♿ O atributo `alt` em imagens é essencial para acessibilidade. Descreva o que a imagem mostra para pessoas que usam leitores de tela.',
      example: '<!-- ✅ Correto -->\n<img src="logo.png" alt="Logo da empresa Quple">',
      severity: 'medium',
      category: 'best-practice'
    },

    // CSS Errors
    {
      pattern: /property.*not.*exist/i,
      errorType: 'invalid_css_property',
      description: 'Propriedade CSS inválida',
      hint: '🎨 Você digitou uma propriedade CSS que não existe. Verifique a ortografia. Propriedades comuns: color, background, margin, padding, display.',
      example: '/* ❌ Errado */\ncolour: red;\n\n/* ✅ Correto */\ncolor: red;',
      severity: 'high',
      category: 'syntax'
    },
    {
      pattern: /missing.*semicolon/i,
      errorType: 'missing_semicolon',
      description: 'Ponto e vírgula ausente',
      hint: '⚡ Toda declaração CSS deve terminar com ponto e vírgula (;). Isso é obrigatório!',
      example: '/* ✅ Correto */\n.classe {\n  color: blue;\n  font-size: 16px;\n}',
      severity: 'high',
      category: 'syntax'
    },

    // JavaScript Errors
    {
      pattern: /is.*not.*defined/i,
      errorType: 'undefined_variable',
      description: 'Variável não definida',
      hint: '📦 Você está tentando usar uma variável que não foi declarada. Use `let`, `const` ou `var` para criar variáveis.',
      example: '// ✅ Correto\nconst nome = "João";\nconsole.log(nome);',
      severity: 'high',
      category: 'logic'
    },
    {
      pattern: /unexpected.*token/i,
      errorType: 'syntax_error',
      description: 'Erro de sintaxe JavaScript',
      hint: '⚠️ Erro de sintaxe! Verifique parênteses, chaves e pontos e vírgulas. Cada `{` deve ter um `}` correspondente.',
      example: '// ✅ Correto\nif (condicao) {\n  console.log("ok");\n}',
      severity: 'high',
      category: 'syntax'
    }
  ]

  private contextualHints: { [key: string]: SmartHint[] } = {
    'html-basics': [
      {
        id: 'html-structure',
        title: 'Estrutura HTML Básica',
        content: 'Todo documento HTML precisa de uma estrutura padrão: DOCTYPE, html, head e body.',
        example: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Título</title>\n</head>\n<body>\n  <!-- Conteúdo aqui -->\n</body>\n</html>',
        type: 'context',
        priority: 10,
        triggered: false
      },
      {
        id: 'semantic-elements',
        title: 'Elementos Semânticos',
        content: 'Use elementos que descrevem o significado do conteúdo: h1 para título principal, p para parágrafos, etc.',
        example: '<h1>Título Principal</h1>\n<p>Este é um parágrafo explicativo.</p>',
        type: 'best-practice',
        priority: 8,
        triggered: false
      }
    ],
    'css-styling': [
      {
        id: 'css-selectors',
        title: 'Seletores CSS',
        content: 'Use classes (.classe) para estilização reutilizável e IDs (#id) para elementos únicos.',
        example: '.botao { background: blue; }\n#header { background: gray; }',
        type: 'context',
        priority: 9,
        triggered: false
      }
    ]
  }

  // Analisar código e retornar hints específicos
  analyzeCode(code: string, challengeType: string = 'html-basics'): SmartHint[] {
    const hints: SmartHint[] = []

    // 1. Verificar padrões de erro
    this.errorPatterns.forEach(pattern => {
      if (pattern.pattern.test(code)) {
        hints.push({
          id: `error_${pattern.errorType}`,
          title: pattern.description,
          content: pattern.hint,
          example: pattern.example,
          type: 'error-based',
          priority: pattern.severity === 'high' ? 10 : pattern.severity === 'medium' ? 7 : 5,
          triggered: true,
          errorContext: pattern.errorType
        })
      }
    })

    // 2. Adicionar hints contextuais baseados no tipo de desafio
    const contextHints = this.contextualHints[challengeType] || []
    contextHints.forEach(hint => {
      if (!hints.find(h => h.id === hint.id)) {
        hints.push({ ...hint })
      }
    })

    // 3. Hints progressivos baseados no comprimento do código
    if (code.length < 50) {
      hints.push({
        id: 'getting-started',
        title: 'Começando',
        content: 'Comece digitando a estrutura básica. Não tenha medo de experimentar!',
        type: 'progressive',
        priority: 6,
        triggered: false
      })
    }

    // 4. Hints baseados em boas práticas
    if (code.length > 100 && !code.includes('<!--')) {
      hints.push({
        id: 'use-comments',
        title: 'Use Comentários',
        content: 'Adicione comentários para explicar partes importantes do seu código: <!-- Comentário -->',
        example: '<!-- Este é o cabeçalho principal -->\n<h1>Bem-vindo</h1>',
        type: 'best-practice',
        priority: 4,
        triggered: false
      })
    }

    // Ordenar por prioridade
    return hints.sort((a, b) => b.priority - a.priority)
  }

  // Analisar erros específicos e sugerir correções
  analyzeError(error: string, code: string): SmartHint | null {
    for (const pattern of this.errorPatterns) {
      if (pattern.pattern.test(error) || pattern.pattern.test(code)) {
        return {
          id: `error_fix_${pattern.errorType}`,
          title: `🔧 ${pattern.description}`,
          content: pattern.hint,
          example: pattern.example,
          type: 'error-based',
          priority: 10,
          triggered: true,
          errorContext: pattern.errorType
        }
      }
    }

    // Fallback para erros não categorizados
    return {
      id: 'generic_error',
      title: '🤔 Erro Detectado',
      content: 'Revise seu código linha por linha. Verifique a sintaxe e se todas as tags estão fechadas corretamente.',
      type: 'error-based',
      priority: 5,
      triggered: true,
      errorContext: 'generic'
    }
  }

  // Sugerir próxima ação baseada no progresso
  suggestNextAction(code: string, timeSpent: number, hintsUsed: number): SmartHint | null {
    // Se passou muito tempo sem progresso
    if (timeSpent > 300000 && code.length < 100) { // 5 minutos
      return {
        id: 'time_help',
        title: '⏰ Parece que você está travado',
        content: 'Não tem problema! Programação é desafiadora. Que tal dar uma olhada na estrutura básica e começar pequeno?',
        example: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Início</title>\n</head>\n<body>\n  <h1>Primeiro passo</h1>\n</body>\n</html>',
        type: 'progressive',
        priority: 9,
        triggered: true
      }
    }

    // Se usou muitas dicas
    if (hintsUsed > 3) {
      return {
        id: 'independence',
        title: '💪 Desenvolva Independência',
        content: 'Você já tem as ferramentas! Tente experimentar e errar. É assim que se aprende programação de verdade.',
        type: 'progressive',
        priority: 7,
        triggered: true
      }
    }

    return null
  }

  // Gerar hint personalizada baseada no histórico do usuário
  generatePersonalizedHint(userHistory: any): SmartHint {
    const commonErrors = userHistory.commonErrors || []
    const strugglingAreas = userHistory.strugglingAreas || []

    if (commonErrors.includes('missing_doctype')) {
      return {
        id: 'personal_doctype',
        title: '🎯 Dica Personalizada',
        content: 'Notei que você frequentemente esquece do DOCTYPE. Crie o hábito: sempre comece com <!DOCTYPE html>',
        type: 'context',
        priority: 8,
        triggered: true
      }
    }

    return {
      id: 'keep_going',
      title: '🚀 Continue Evoluindo!',
      content: 'Você está progredindo bem! Cada erro é uma oportunidade de aprender algo novo.',
      type: 'progressive',
      priority: 5,
      triggered: true
    }
  }
}

export const intelligentHintSystem = new IntelligentHintSystem()
export type { SmartHint, ErrorPattern }