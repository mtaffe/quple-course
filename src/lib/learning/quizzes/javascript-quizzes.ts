/**
 * JavaScript Quizzes - Fundamentals and Advanced
 *
 * Quiz questions for JavaScript topics
 */

import { createQuiz, createQuizQuestion } from './index'
import type { Quiz } from './types'

// ============================================================================
// JAVASCRIPT FUNDAMENTALS QUIZZES
// ============================================================================

/**
 * Quiz for Lesson 1: JavaScript Basics and Variables
 */
export const jsFundamentalsLesson1Quiz: Quiz = createQuiz(
  'js-fundamentals-lesson-1-quiz',
  'lesson-1',
  'Quiz: JavaScript Básico e Variáveis',
  [
    createQuizQuestion(
      'q1',
      'Qual palavra-chave você deve usar para declarar variáveis modernas em JavaScript?',
      'multiple-choice',
      '1',
      [
        'var',
        'let ou const',
        'variable',
        'def'
      ],
      'Use "let" (para valores que mudam) ou "const" (para valores fixos). Evite "var" (obsoleto e problemático).',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual é a diferença entre "let" e "const"?',
      'multiple-choice',
      '0',
      [
        'let permite reatribuição, const não permite',
        'const é mais rápida que let',
        'let é para números, const é para texto',
        'Não há diferença'
      ],
      'const = constante, não pode ser reatribuída. let = variável, pode mudar de valor.',
      15,
      'easy',
      'Pense no significado de "constante" - algo que não muda.'
    ),

    createQuizQuestion(
      'q3',
      'Como você escreve um comentário de uma linha em JavaScript?',
      'multiple-choice',
      '2',
      [
        '/* comentário */',
        '<!-- comentário -->',
        '// comentário',
        '# comentário'
      ],
      '// para comentário de uma linha. /* */ para múltiplas linhas. HTML usa <!-- -->.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: JavaScript é case-sensitive (diferencia maiúsculas de minúsculas).',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! "minhaVariavel" é diferente de "minhavariavel" ou "MinhaVariavel".',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q5',
      'Qual operador você usa para verificar igualdade ESTRITA (valor E tipo)?',
      'multiple-choice',
      '1',
      [
        '= ou ==',
        '===',
        '!=',
        'equals()'
      ],
      'Use === (igualdade estrita). Evite == (igualdade frouxa com coerção de tipos).',
      15,
      'medium',
      'Pense: quantos sinais de igual você precisa para comparação rigorosa?'
    )
  ],
  70, // Passing score: 70%
  5 // Time limit: 5 minutes
)

/**
 * Quiz for Lesson 2: Functions and Scope
 */
export const jsFundamentalsLesson2Quiz: Quiz = createQuiz(
  'js-fundamentals-lesson-2-quiz',
  'lesson-2',
  'Quiz: Funções e Escopo',
  [
    createQuizQuestion(
      'q1',
      'Qual é a sintaxe moderna para criar uma função arrow?',
      'multiple-choice',
      '2',
      [
        'function => () {}',
        'arrow function() {}',
        'const minhaFuncao = () => {}',
        'def minhaFuncao() {}'
      ],
      'Arrow function: const nome = () => {}. Mais concisa que function tradicional.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'O que é "escopo" em JavaScript?',
      'multiple-choice',
      '1',
      [
        'O tipo de uma variável',
        'Onde uma variável pode ser acessada',
        'O tamanho de uma variável',
        'A velocidade de execução'
      ],
      'Escopo define ONDE uma variável pode ser acessada. let/const têm escopo de bloco {}.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Complete a função que retorna o dobro de um número: const dobro = (num) => ___',
      'code-completion',
      'num * 2',
      undefined,
      'Arrow functions com expressão simples retornam automaticamente: (num) => num * 2',
      15,
      'easy',
      'Pense na operação matemática para multiplicar por 2.'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: Variáveis declaradas com "let" dentro de um bloco {} não são acessíveis fora dele.',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! let e const têm escopo de bloco. Variáveis dentro de {} não "vazam" para fora.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Qual é a diferença entre parâmetros e argumentos?',
      'multiple-choice',
      '0',
      [
        'Parâmetros são na definição, argumentos são na chamada',
        'Parâmetros são na chamada, argumentos são na definição',
        'São sinônimos, não há diferença',
        'Parâmetros são opcionais, argumentos são obrigatórios'
      ],
      'Parâmetros = variáveis na DEFINIÇÃO da função. Argumentos = valores PASSADOS na chamada.',
      15,
      'medium'
    )
  ],
  70,
  7
)

// ============================================================================
// JAVASCRIPT ADVANCED QUIZZES
// ============================================================================

/**
 * Quiz for Lesson 1: DOM Manipulation
 */
export const jsAdvancedLesson1Quiz: Quiz = createQuiz(
  'js-advanced-lesson-1-quiz',
  'lesson-1',
  'Quiz: Manipulação do DOM',
  [
    createQuizQuestion(
      'q1',
      'Qual método você usa para selecionar um elemento pelo ID?',
      'multiple-choice',
      '0',
      [
        'document.getElementById("meuId")',
        'document.getElement("#meuId")',
        'document.select("#meuId")',
        'document.find("meuId")'
      ],
      'document.getElementById("meuId") - sem #. querySelector("#meuId") também funciona (com #).',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual propriedade você usa para MUDAR o texto de um elemento?',
      'multiple-choice',
      '2',
      [
        'element.text',
        'element.content',
        'element.textContent ou element.innerText',
        'element.value'
      ],
      'textContent (recomendado) ou innerText para mudar texto. innerHTML para incluir HTML.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Complete: Para adicionar um event listener de clique: element.___("click", minhaFuncao)',
      'code-completion',
      'addEventListener',
      undefined,
      'addEventListener("evento", funcao) é a forma moderna e recomendada de adicionar eventos.',
      10,
      'easy',
      'Pense no método que "adiciona um ouvinte de eventos".'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: querySelector() retorna TODOS os elementos que correspondem ao seletor.',
      'true-false',
      'false',
      ['Verdadeiro', 'Falso'],
      'FALSO! querySelector() retorna apenas o PRIMEIRO elemento. Use querySelectorAll() para todos.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Como você adiciona uma classe CSS a um elemento?',
      'multiple-choice',
      '1',
      [
        'element.class.add("minhaClasse")',
        'element.classList.add("minhaClasse")',
        'element.addClass("minhaClasse")',
        'element.class = "minhaClasse"'
      ],
      'element.classList.add("minhaClasse") adiciona uma classe. .remove() remove, .toggle() alterna.',
      10,
      'easy'
    )
  ],
  70,
  8
)

/**
 * Quiz for Lesson 2: Events and Interactivity
 */
export const jsAdvancedLesson2Quiz: Quiz = createQuiz(
  'js-advanced-lesson-2-quiz',
  'lesson-2',
  'Quiz: Eventos e Interatividade',
  [
    createQuizQuestion(
      'q1',
      'O que é o objeto "event" (ou "e") nos event listeners?',
      'multiple-choice',
      '2',
      [
        'Um erro do navegador',
        'O elemento que disparou o evento',
        'Informações detalhadas sobre o evento',
        'Uma função de callback'
      ],
      'O objeto event contém informações sobre o evento: tipo, target (elemento), coordenadas do mouse, tecla pressionada, etc.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q2',
      'Como você previne o comportamento padrão de um formulário (não enviar)?',
      'multiple-choice',
      '1',
      [
        'return false;',
        'event.preventDefault();',
        'event.stopDefault();',
        'form.prevent();'
      ],
      'event.preventDefault() previne o comportamento padrão (útil para validar forms antes de enviar).',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q3',
      'Complete: Para pegar o valor de um input: const valor = input.___',
      'code-completion',
      'value',
      undefined,
      'A propriedade .value retorna o conteúdo atual de inputs, textareas e selects.',
      10,
      'easy',
      'Pense na propriedade que contém o "valor" do input.'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: "event.target" representa o elemento que DISPAROU o evento.',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! event.target é o elemento que disparou o evento. event.currentTarget é onde o listener está anexado.',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Qual evento é disparado quando um input PERDE o foco?',
      'multiple-choice',
      '2',
      [
        'focus',
        'click',
        'blur',
        'unfocus'
      ],
      'blur = perder foco. focus = ganhar foco. Útil para validação de campos.',
      10,
      'easy'
    )
  ],
  70,
  7
)

/**
 * Quiz for Lesson 3: Arrays and Objects
 */
export const jsAdvancedLesson3Quiz: Quiz = createQuiz(
  'js-advanced-lesson-3-quiz',
  'lesson-3',
  'Quiz: Arrays e Objetos',
  [
    createQuizQuestion(
      'q1',
      'Como você acessa o TERCEIRO elemento de um array?',
      'multiple-choice',
      '2',
      [
        'array[3]',
        'array.get(3)',
        'array[2]',
        'array.third()'
      ],
      'Arrays começam em índice 0. Primeiro = [0], segundo = [1], terceiro = [2].',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q2',
      'Qual método adiciona um elemento no FINAL de um array?',
      'multiple-choice',
      '0',
      [
        'array.push(elemento)',
        'array.add(elemento)',
        'array.append(elemento)',
        'array.insert(elemento)'
      ],
      'push() adiciona no final. unshift() adiciona no início. pop() remove do final. shift() remove do início.',
      10,
      'easy'
    ),

    createQuizQuestion(
      'q3',
      'Complete: Para criar um objeto com nome e idade: const pessoa = { nome: "Ana", ___ : 25 }',
      'code-completion',
      'idade',
      undefined,
      'Objetos usam pares chave:valor. { chave: valor, outraChave: outroValor }',
      10,
      'easy',
      'Pense na segunda propriedade mencionada - idade.'
    ),

    createQuizQuestion(
      'q4',
      'Verdadeiro ou Falso: "const arr = []" cria um array vazio mas você ainda pode adicionar elementos com push().',
      'true-false',
      'true',
      ['Verdadeiro', 'Falso'],
      'VERDADEIRO! const impede REATRIBUIÇÃO, mas arrays/objetos podem ser MODIFICADOS (push, pop, propriedades).',
      15,
      'medium'
    ),

    createQuizQuestion(
      'q5',
      'Como você acessa a propriedade "nome" de um objeto "pessoa"?',
      'multiple-choice',
      '3',
      [
        'pessoa->nome',
        'pessoa::nome',
        'pessoa("nome")',
        'pessoa.nome ou pessoa["nome"]'
      ],
      'Duas formas: pessoa.nome (dot notation) ou pessoa["nome"] (bracket notation).',
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

export const javascriptQuizzes = {
  fundamentals: {
    lesson1: jsFundamentalsLesson1Quiz,
    lesson2: jsFundamentalsLesson2Quiz
  },
  advanced: {
    lesson1: jsAdvancedLesson1Quiz,
    lesson2: jsAdvancedLesson2Quiz,
    lesson3: jsAdvancedLesson3Quiz
  }
}

export default javascriptQuizzes
