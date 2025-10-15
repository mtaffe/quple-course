/**
 * CSS Quizzes - Fundamentals and Advanced
 *
 * Quiz questions for CSS topics
 */

import { createQuiz, createQuizQuestion } from './index'
import type { Quiz } from './types'

// ============================================================================
// CSS FUNDAMENTALS QUIZZES
// ============================================================================

/**
 * Quiz for Lesson 1: CSS Basics and Selectors
 */
export const cssFundamentalsLesson1Quiz: Quiz = createQuiz(
  'css-fundamentals-lesson-1-quiz',
  'lesson-1',
  'Quiz: CSS Básico e Seletores',
  [
    createQuizQuestion(
      'q1',
      'O que significa CSS?',
      'multiple-choice',
      '1',
      [
        'Computer Style Sheets',
        'Cascading Style Sheets',
        'Creative Style System',
        'Colorful Style Sheets'
      ],
      'CSS significa Cascading Style Sheets (Folhas de Estilo em Cascata). É a linguagem usada para estilizar páginas HTML.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual é a sintaxe correta para mudar a cor de todos os parágrafos para azul?',
      'multiple-choice',
      '2',
      [
        'p { text-color: blue; }',
        'p { font-color: blue; }',
        'p { color: blue; }',
        '<p color="blue">'
      ],
      'A propriedade correta é "color" (não text-color ou font-color). Use: p { color: blue; }',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q3',
      'Qual seletor CSS tem MAIOR especificidade (prioridade)?',
      'multiple-choice',
      '0',
      [
        '#header (ID)',
        '.header (classe)',
        'header (elemento)',
        'header p (descendente)'
      ],
      'IDs (#) têm maior especificidade que classes (.) e elementos. Ordem: ID > Classe > Elemento.',
      15,
      'medium',
      'Pense na hierarquia: IDs são únicos, classes podem ser reutilizadas, elementos são gerais.'
    ),

    createQuizQuestion(
      'q4',
      'Como você adiciona um comentário em CSS?',
      'multiple-choice',
      '1',
      [
        '// Este é um comentário',
        '/* Este é um comentário */',
        '<!-- Este é um comentário -->',
        '# Este é um comentário'
      ],
      'CSS usa /* */ para comentários (mesmo estilo do C). HTML usa <!-- -->, JavaScript usa //',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q5',
      'Verdadeiro ou Falso: A propriedade "padding" adiciona espaço DENTRO de um elemento (entre o conteúdo e a borda).',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! Padding é o espaço interno. Margin é o espaço externo (fora da borda).',
      15,
      'easy'
    )
  ],
  70, // Passing score: 70%
  5 // Time limit: 5 minutes
)

/**
 * Quiz for Lesson 2: Box Model and Layout
 */
export const cssFundamentalsLesson2Quiz: Quiz = createQuiz(
  'css-fundamentals-lesson-2-quiz',
  'lesson-2',
  'Quiz: Box Model e Layout',
  [
    createQuizQuestion(
      'q1',
      'Quais são as 4 partes do Box Model CSS, de dentro para fora?',
      'multiple-choice',
      '2',
      [
        'margin → padding → border → content',
        'padding → margin → content → border',
        'content → padding → border → margin',
        'content → border → padding → margin'
      ],
      'Box Model (de dentro para fora): Content → Padding → Border → Margin. Lembre: "ConPaBorMa"!',
      15,
      'medium',
      'Comece pelo centro (conteúdo) e vá para fora.'
    ),

    createQuizQuestion(
      'q2',
      'O que faz a propriedade "box-sizing: border-box"?',
      'multiple-choice',
      '1',
      [
        'Faz padding e border serem calculados FORA da largura',
        'Faz padding e border serem incluídos NA largura definida',
        'Remove padding e border do elemento',
        'Adiciona uma borda ao redor do elemento'
      ],
      'border-box inclui padding e border na largura. Se width: 100px, o elemento terá exatamente 100px (incluindo padding/border).',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Como você centraliza horizontalmente um elemento com largura fixa?',
      'multiple-choice',
      '0',
      [
        'margin: 0 auto;',
        'text-align: center;',
        'align: center;',
        'center: true;'
      ],
      'margin: 0 auto; centraliza elementos de bloco com largura fixa. "auto" distribui margin igualmente nos lados.',
      15,
      'easy'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: "display: none" remove o elemento do fluxo, enquanto "visibility: hidden" mantém o espaço.',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! display: none = elemento desaparece completamente. visibility: hidden = invisível mas ocupa espaço.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Qual propriedade controla o espaço entre LINHAS de texto?',
      'multiple-choice',
      '2',
      [
        'letter-spacing',
        'word-spacing',
        'line-height',
        'text-spacing'
      ],
      'line-height controla a altura entre linhas. letter-spacing = espaço entre letras, word-spacing = espaço entre palavras.',
      10,
      'easy'
    )
  ],
  70,
  7
)

// ============================================================================
// CSS ADVANCED QUIZZES
// ============================================================================

/**
 * Quiz for Lesson 1: Flexbox
 */
export const cssAdvancedLesson1Quiz: Quiz = createQuiz(
  'css-advanced-lesson-1-quiz',
  'lesson-1',
  'Quiz: Flexbox Layout',
  [
    createQuizQuestion(
      'q1',
      'Qual propriedade você aplica no CONTAINER para ativar Flexbox?',
      'multiple-choice',
      '1',
      [
        'flex: 1;',
        'display: flex;',
        'flexbox: true;',
        'layout: flex;'
      ],
      'Use display: flex; no CONTAINER pai. Os filhos automaticamente se tornam flex items.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'O que faz a propriedade "justify-content" no Flexbox?',
      'multiple-choice',
      '0',
      [
        'Alinha itens no eixo principal (horizontal se flex-direction: row)',
        'Alinha itens no eixo transversal (vertical se flex-direction: row)',
        'Define o tamanho dos itens',
        'Quebra itens em múltiplas linhas'
      ],
      'justify-content controla alinhamento no eixo PRINCIPAL. align-items controla o eixo TRANSVERSAL.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Complete o código para centralizar vertical E horizontalmente: display: flex; ___ : center; align-items: center;',
      'code-completion',
      'justify-content',
      undefined,
      'justify-content: center; (eixo principal) + align-items: center; (eixo transversal) = perfeita centralização!',
      15,
      'medium',
      'Pense na propriedade que controla o alinhamento horizontal quando flex-direction é row.'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: "flex-direction: column" inverte os eixos - justify-content passa a controlar o vertical.',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! Com column, o eixo principal vira vertical. justify-content = vertical, align-items = horizontal.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'O que faz "gap: 20px" em um container Flexbox?',
      'multiple-choice',
      '2',
      [
        'Adiciona margin de 20px em todos os itens',
        'Adiciona padding de 20px no container',
        'Adiciona espaço de 20px ENTRE os itens',
        'Define largura mínima de 20px para os itens'
      ],
      'gap adiciona espaçamento ENTRE os itens flex, sem afetar as bordas do container. Muito melhor que usar margin!',
      15,
      'easy'
    )
  ],
  70,
  8
)

/**
 * Quiz for Lesson 2: Grid Layout
 */
export const cssAdvancedLesson2Quiz: Quiz = createQuiz(
  'css-advanced-lesson-2-quiz',
  'lesson-2',
  'Quiz: CSS Grid Layout',
  [
    createQuizQuestion(
      'q1',
      'Qual propriedade ativa o CSS Grid em um container?',
      'multiple-choice',
      '1',
      [
        'grid: true;',
        'display: grid;',
        'layout: grid;',
        'grid-container: true;'
      ],
      'Use display: grid; no container para ativar o Grid Layout.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'O que significa "1fr" no Grid?',
      'multiple-choice',
      '2',
      [
        '1 pixel',
        '1 frame',
        '1 fração do espaço disponível',
        '1 forma de tamanho fixo'
      ],
      '"fr" = fração. "1fr" = 1 parte do espaço disponível. "grid-template-columns: 1fr 2fr" = segunda coluna tem o dobro da primeira.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Como você cria 3 colunas de tamanho igual no Grid?',
      'multiple-choice',
      '1',
      [
        'grid-columns: 3;',
        'grid-template-columns: 1fr 1fr 1fr;',
        'columns: 3;',
        'grid-count: 3;'
      ],
      'grid-template-columns: 1fr 1fr 1fr; cria 3 colunas iguais. Ou use: repeat(3, 1fr);',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q4',
      'Complete: Para repetir 4 colunas de 200px: grid-template-columns: ___(4, 200px);',
      'code-completion',
      'repeat',
      undefined,
      'A função repeat() evita repetição: repeat(4, 200px) = 200px 200px 200px 200px',
      15,
      'medium',
      'Use a função CSS que repete valores automaticamente.'
    ),

    createQuizQuestion(
      'q5',
      'Verdadeiro ou Falso: "gap: 20px 10px" define gap de 20px entre LINHAS e 10px entre COLUNAS.',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! gap: [row] [column]. Ou use row-gap e column-gap separadamente.',
      15,
      'medium'
    )
  ],
  70,
  8
)

/**
 * Quiz for Lesson 3: Responsive Design
 */
export const cssAdvancedLesson3Quiz: Quiz = createQuiz(
  'css-advanced-lesson-3-quiz',
  'lesson-3',
  'Quiz: Design Responsivo e Media Queries',
  [
    createQuizQuestion(
      'q1',
      'Qual é a sintaxe correta para aplicar estilos em telas menores que 768px?',
      'multiple-choice',
      '1',
      [
        '@media screen and (min-width: 768px)',
        '@media screen and (max-width: 768px)',
        '@media (width < 768px)',
        '@screen (max: 768px)'
      ],
      'max-width: 768px = telas ATÉ 768px (menores). min-width: 768px = telas A PARTIR DE 768px (maiores).',
      15,
      'medium',
      'Pense: MAX = máximo, telas menores. MIN = mínimo, telas maiores.'
    ),

    createQuizQuestion(
      'q2',
      'Qual abordagem de design responsivo é recomendada atualmente?',
      'multiple-choice',
      '0',
      [
        'Mobile First (design para mobile, adiciona regras para desktop)',
        'Desktop First (design para desktop, adiciona regras para mobile)',
        'Tablet First (design para tablet)',
        'Não importa, ambos são iguais'
      ],
      'Mobile First é recomendado: design para mobile primeiro, depois adiciona recursos para telas maiores com min-width.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Verdadeiro ou Falso: A meta tag viewport é ESSENCIAL para sites responsivos funcionarem em mobile.',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! <meta name="viewport" content="width=device-width, initial-scale=1.0"> é OBRIGATÓRIA para responsividade.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q4',
      'Qual unidade CSS é relativa ao tamanho da VIEWPORT (janela do navegador)?',
      'multiple-choice',
      '2',
      [
        'em',
        'rem',
        'vw / vh',
        '%'
      ],
      'vw (viewport width) e vh (viewport height) são relativas à janela. 100vw = largura total da tela.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Qual propriedade torna imagens responsivas (não ultrapassam container)?',
      'multiple-choice',
      '1',
      [
        'width: responsive;',
        'max-width: 100%;',
        'responsive: true;',
        'fit: container;'
      ],
      'max-width: 100%; + height: auto; faz imagens se adaptarem ao container sem distorcer.',
      10,
      'easy'
    )
  ],
  70,
  8
)

// ============================================================================
// EXPORT ALL QUIZZES
// ============================================================================

export const cssQuizzes = {
  fundamentals: {
    lesson1: cssFundamentalsLesson1Quiz,
    lesson2: cssFundamentalsLesson2Quiz
  },
  advanced: {
    lesson1: cssAdvancedLesson1Quiz,
    lesson2: cssAdvancedLesson2Quiz,
    lesson3: cssAdvancedLesson3Quiz
  }
}

export default cssQuizzes
