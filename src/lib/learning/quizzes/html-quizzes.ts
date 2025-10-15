/**
 * HTML Quizzes - Fundamentals and Advanced
 *
 * Quiz questions for HTML topics
 */

import { createQuiz, createQuizQuestion } from './index'
import type { Quiz } from './types'

// ============================================================================
// HTML FUNDAMENTALS QUIZZES
// ============================================================================

/**
 * Quiz for Lesson 1: Basic HTML Structure
 */
export const htmlFundamentalsLesson1Quiz: Quiz = createQuiz(
  'html-fundamentals-lesson-1-quiz',
  'lesson-1',
  'Quiz: Estrutura Básica do HTML',
  [
    createQuizQuestion(
      'q1',
      'O que significa HTML?',
      'multiple-choice',
      '2',
      [
        'HyperText Machine Language',
        'Home Tool Markup Language',
        'HyperText Markup Language',
        'Hyperlinks and Text Markup Language'
      ],
      'HTML significa HyperText Markup Language. É uma linguagem de marcação, não de programação.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual tag deve SEMPRE ser a primeira linha de um documento HTML5?',
      'multiple-choice',
      '1',
      [
        '<html>',
        '<!DOCTYPE html>',
        '<head>',
        '<meta charset="UTF-8">'
      ],
      'O <!DOCTYPE html> informa ao navegador que este é um documento HTML5 e deve ser a primeira linha.',
      10,
      'easy',
      'Pense na declaração que informa ao navegador qual versão do HTML você está usando.'
    ),

    createQuizQuestion(
      'q3',
      'Onde ficam as informações que NÃO aparecem visualmente na página, como título e meta tags?',
      'multiple-choice',
      '1',
      [
        'Na tag <body>',
        'Na tag <head>',
        'Na tag <html>',
        'Na tag <meta>'
      ],
      'A tag <head> contém metadados que não são exibidos visualmente, como título, charset, e links para CSS.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q4',
      'Qual é a estrutura correta de um elemento HTML?',
      'multiple-choice',
      '2',
      [
        '<tag>conteúdo<tag>',
        '[tag]conteúdo[/tag]',
        '<tag>conteúdo</tag>',
        '{tag}conteúdo{/tag}'
      ],
      'Elementos HTML usam < > para abertura e </> para fechamento: <tag>conteúdo</tag>',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q5',
      'Quantas tags <h1> você deve usar por página?',
      'multiple-choice',
      '1',
      [
        'Quantas quiser',
        'Uma única h1 por página',
        'No máximo três',
        'Pelo menos duas'
      ],
      'Deve-se usar apenas UMA tag <h1> por página. Ela representa o tópico principal da página e é importante para SEO e acessibilidade.',
      15,
      'medium',
      'Pense em semântica: quantos títulos principais uma página deveria ter?'
    )
  ],
  70, // Passing score: 70%
  5 // Time limit: 5 minutes
)

/**
 * Quiz for Lesson 2: Semantic HTML Tags
 */
export const htmlFundamentalsLesson2Quiz: Quiz = createQuiz(
  'html-fundamentals-lesson-2-quiz',
  'lesson-2',
  'Quiz: Tags Semânticas Essenciais',
  [
    createQuizQuestion(
      'q1',
      'Por que usar tags semânticas como <header>, <nav>, <main> ao invés de apenas <div>?',
      'multiple-choice',
      '3',
      [
        'Porque são mais curtas para escrever',
        'Porque carregam mais rápido',
        'Porque dão significado ao conteúdo e melhoram acessibilidade e SEO',
        'Porque são obrigatórias no HTML5'
      ],
      'Tags semânticas comunicam o SIGNIFICADO do conteúdo, ajudando leitores de tela, motores de busca e outros desenvolvedores a entenderem a estrutura.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q2',
      'Qual a diferença entre <strong> e <b>?',
      'multiple-choice',
      '0',
      [
        '<strong> tem significado semântico (importância), <b> é apenas visual',
        '<b> tem significado semântico, <strong> é apenas visual',
        'Não há diferença, são sinônimos',
        '<strong> é mais escuro que <b>'
      ],
      '<strong> indica importância semântica (leitores de tela enfatizam), enquanto <b> é apenas formatação visual.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Qual tag você deve usar para quebras de linha dentro de um parágrafo (ex: em um endereço)?',
      'multiple-choice',
      '1',
      [
        '<p>',
        '<br>',
        '<line>',
        '<break>'
      ],
      'A tag <br> cria uma quebra de linha sem iniciar um novo parágrafo. Útil para endereços e poemas.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q4',
      'Complete o código para criar um link que abre em nova aba: <a href="https://quple.com" ___>Quple</a>',
      'code-completion',
      'target="_blank"',
      undefined,
      'O atributo target="_blank" faz o link abrir em uma nova aba do navegador.',
      15,
      'medium',
      'Pense no atributo que controla onde o link será aberto.'
    ),

    createQuizQuestion(
      'q5',
      'Qual hierarquia de títulos está CORRETA?',
      'multiple-choice',
      '1',
      [
        '<h1> → <h3> → <h5>',
        '<h1> → <h2> → <h3>',
        '<h2> → <h1> → <h3>',
        '<h3> → <h2> → <h1>'
      ],
      'A hierarquia deve ser sequencial: h1 → h2 → h3 → h4 → h5 → h6. Nunca pule níveis!',
      15,
      'medium'
    )
  ],
  70,
  7
)

// ============================================================================
// HTML ADVANCED QUIZZES
// ============================================================================

/**
 * Quiz for Lesson 1: Advanced Forms
 */
export const htmlAdvancedLesson1Quiz: Quiz = createQuiz(
  'html-advanced-lesson-1-quiz',
  'lesson-1',
  'Quiz: Formulários Avançados e Validação',
  [
    createQuizQuestion(
      'q1',
      'Qual tipo de input abre um teclado numérico no celular?',
      'multiple-choice',
      '2',
      [
        'type="number"',
        'type="numeric"',
        'type="tel"',
        'type="phone"'
      ],
      'O input type="tel" abre o teclado numérico otimizado para telefones em dispositivos móveis.',
      10,
      'medium'
    ),

    createQuizQuestion(
      'q2',
      'Qual atributo torna um campo obrigatório usando validação HTML5 nativa?',
      'multiple-choice',
      '1',
      [
        'mandatory="true"',
        'required',
        'validate="required"',
        'obligatory'
      ],
      'O atributo "required" (booleano) marca o campo como obrigatório, com validação nativa do navegador.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q3',
      'Complete: Para validar CPF com regex use: <input pattern="___">',
      'code-completion',
      '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}',
      undefined,
      'O pattern usa regex. \\d significa dígito. O padrão completo é: \\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}',
      20,
      'hard',
      'Use \\d para dígitos e {n} para quantidade. Não esqueça de escapar os pontos com \\.'
    ),

    createQuizQuestion(
      'q4',
      'Qual atributo autocomplete você deve usar para o campo de NOVA senha no cadastro?',
      'multiple-choice',
      '1',
      [
        'autocomplete="password"',
        'autocomplete="new-password"',
        'autocomplete="current-password"',
        'autocomplete="off"'
      ],
      'Use "new-password" para novos cadastros e "current-password" para login. Isso ajuda gerenciadores de senha.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Qual propriedade do objeto "validity" verifica se um campo obrigatório está vazio?',
      'multiple-choice',
      '0',
      [
        'valueMissing',
        'isEmpty',
        'required',
        'notFilled'
      ],
      'input.validity.valueMissing retorna true se um campo "required" está vazio.',
      15,
      'medium'
    )
  ],
  70,
  8
)

/**
 * Quiz for Lesson 2: Accessibility
 */
export const htmlAdvancedLesson2Quiz: Quiz = createQuiz(
  'html-advanced-lesson-2-quiz',
  'lesson-2',
  'Quiz: Acessibilidade Web (A11y)',
  [
    createQuizQuestion(
      'q1',
      'O que significa A11y?',
      'multiple-choice',
      '1',
      [
        'Accessibility Level 11',
        'Accessibility (11 letras entre A e Y)',
        'Advanced 11 Year Standard',
        'Algo relacionado a segurança'
      ],
      'A11y é uma abreviação de "Accessibility" - A + 11 letras + Y.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual é o nível de conformidade WCAG recomendado (padrão legal na maioria dos países)?',
      'multiple-choice',
      '1',
      [
        'Nível A',
        'Nível AA',
        'Nível AAA',
        'Nível B'
      ],
      'WCAG Nível AA é o padrão recomendado e requerido por lei em muitos países.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q3',
      'Complete o código acessível: <button ___ ___="Fechar modal">X</button>',
      'code-completion',
      'aria-label',
      undefined,
      'Use aria-label para dar um nome descritivo a elementos quando o texto visual não é suficiente.',
      15,
      'medium',
      'Pense no atributo ARIA que fornece um rótulo alternativo.'
    ),

    createQuizQuestion(
      'q4',
      'Qual o papel (role) ARIA de um elemento <header> no topo da página?',
      'multiple-choice',
      '1',
      [
        'role="header"',
        'role="banner"',
        'role="top"',
        'role="main"'
      ],
      'O <header> no topo da página tem role="banner" implícito. É um landmark de navegação.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Qual atributo você usa para associar uma label a um input?',
      'multiple-choice',
      '2',
      [
        'connect',
        'link-to',
        'for',
        'input-id'
      ],
      'Use <label for="campo-id"> e <input id="campo-id"> para associar label ao input. Essencial para acessibilidade!',
      15,
      'easy'
    ),

    createQuizQuestion(
      'q6',
      'Verdadeiro ou Falso: Você deve usar ARIA sempre que possível, mesmo quando HTML nativo já funciona.',
      'true-false',
      'false',
      ['Verdadeiro', 'Falso'],
      'FALSO! Regra de Ouro do ARIA: "Não use ARIA se HTML nativo já faz o trabalho". HTML semântico é sempre preferível.',
      15,
      'medium'
    )
  ],
  70,
  8
)

/**
 * Quiz for Lesson 3: SEO
 */
export const htmlAdvancedLesson3Quiz: Quiz = createQuiz(
  'html-advanced-lesson-3-quiz',
  'lesson-3',
  'Quiz: SEO e Metadados',
  [
    createQuizQuestion(
      'q1',
      'Quantos caracteres deve ter o <title> ideal para SEO?',
      'multiple-choice',
      '1',
      [
        '30-40 caracteres',
        '50-60 caracteres',
        '70-80 caracteres',
        'Sem limite'
      ],
      'O <title> ideal tem 50-60 caracteres. Mais que isso é cortado nos resultados de busca do Google.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual meta tag é essencial para responsividade mobile?',
      'multiple-choice',
      '2',
      [
        '<meta name="mobile">',
        '<meta name="responsive">',
        '<meta name="viewport">',
        '<meta name="device">'
      ],
      'A tag <meta name="viewport" content="width=device-width, initial-scale=1.0"> é ESSENCIAL para sites responsivos.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q3',
      'Complete o Open Graph para Facebook: <meta property="og:___" content="website">',
      'code-completion',
      'type',
      undefined,
      'og:type define o tipo de conteúdo (website, article, video, etc.).',
      15,
      'medium',
      'Pense em qual propriedade define o TIPO de conteúdo.'
    ),

    createQuizQuestion(
      'q4',
      'Qual o tamanho ideal de imagem Open Graph?',
      'multiple-choice',
      '1',
      [
        '800x600',
        '1200x630',
        '1920x1080',
        '600x600'
      ],
      'A imagem Open Graph ideal é 1200x630 pixels (proporção 1.91:1). Aparece bem em todas as redes sociais.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'O que é LCP (Largest Contentful Paint) e qual o valor ideal?',
      'multiple-choice',
      '0',
      [
        'Tempo até maior elemento ser renderizado - ideal < 2.5s',
        'Tempo até primeira interação - ideal < 100ms',
        'Estabilidade visual - ideal < 0.1',
        'Tempo de carregamento total - ideal < 3s'
      ],
      'LCP mede o tempo até o maior elemento visível ser renderizado. Google recomenda < 2.5 segundos.',
      20,
      'hard'
    ),

    createQuizQuestion(
      'q6',
      'Verdadeiro ou Falso: A meta tag "keywords" ainda é muito importante para SEO em 2024.',
      'true-false',
      'false',
      ['Verdadeiro', 'Falso'],
      'FALSO! O Google não usa mais a meta keywords desde 2009. Foque em conteúdo de qualidade e HTML semântico.',
      10,
      'easy'
    )
  ],
  70,
  10
)

// ============================================================================
// EXPORT ALL QUIZZES
// ============================================================================

export const htmlQuizzes = {
  fundamentals: {
    lesson1: htmlFundamentalsLesson1Quiz,
    lesson2: htmlFundamentalsLesson2Quiz
  },
  advanced: {
    lesson1: htmlAdvancedLesson1Quiz,
    lesson2: htmlAdvancedLesson2Quiz,
    lesson3: htmlAdvancedLesson3Quiz
  }
}

export default htmlQuizzes
