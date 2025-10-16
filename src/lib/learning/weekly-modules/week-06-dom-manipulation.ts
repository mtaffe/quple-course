import { WeeklyModule } from '@/types/weekly-modules';

export const week06DomManipulation: WeeklyModule = {
  id: 'week-06-dom-manipulation',
  weekNumber: 6,
  title: 'DOM Manipulation',
  subtitle: 'Descrição curta do módulo',
  description: 'Descrição detalhada do que será aprendido nesta semana',
  
  learningObjectives: [
    'Objetivo de aprendizagem 1',
    'Objetivo de aprendizagem 2',
    'Objetivo de aprendizagem 3',
    'Objetivo de aprendizagem 4',
    'Objetivo de aprendizagem 5',
  ],
  
  prerequisites: ['week-05'],
  
  theoryContent: {
    id: 'week-06-dom-manipulation-theory',
    sections: [
      {
        id: 'dom-manipulation-intro',
        title: 'Introdução ao DOM Manipulation',
        content: `# DOM Manipulation

Conteúdo teórico aqui...

## Tópico 1

Explicação detalhada...

## Tópico 2

Mais conteúdo...`,
        codeExamples: [
          {
            language: 'javascript',
            code: `// Exemplo de código`,
            explanation: 'Explicação do exemplo'
          }
        ]
      },
      {
        id: 'dom-manipulation-concepts',
        title: 'Conceitos Principais',
        content: `# Conceitos Importantes

Mais teoria...`,
        codeExamples: []
      }
    ]
  },
  
  resources: [
    {
      id: 'dom-manipulation-mdn',
      type: 'reading',
      title: 'MDN: DOM Manipulation',
      url: 'https://developer.mozilla.org',
      required: true,
    }
  ],
  
  challenges: [
    {
      id: 'week-06-dom-manipulation-challenge-1',
      type: 'coding',
      title: 'Desafio 1: DOM Manipulation Básico',
      description: 'Descrição do desafio',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'week-06-dom-manipulation-challenge-1-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: `// Código inicial`,
          solution: `// Solução`,
          hints: ['Dica 1', 'Dica 2'],
          validationCriteria: ['Critério 1', 'Critério 2'],
          xpReward: 20,
        }
      ],
      totalXP: 20,
    },
    {
      id: 'week-06-dom-manipulation-challenge-2',
      type: 'coding',
      title: 'Desafio 2: DOM Manipulation Intermediário',
      description: 'Descrição do desafio',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'week-06-dom-manipulation-challenge-2-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: `// Código inicial`,
          solution: `// Solução`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 30,
        }
      ],
      totalXP: 30,
    },
    {
      id: 'week-06-dom-manipulation-challenge-3',
      type: 'coding',
      title: 'Desafio 3: DOM Manipulation Avançado',
      description: 'Descrição do desafio',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'week-06-dom-manipulation-challenge-3-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: `// Código inicial`,
          solution: `// Solução`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 40,
        }
      ],
      totalXP: 40,
    },
    {
      id: 'week-06-dom-manipulation-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Projeto Mini',
      description: 'Descrição do desafio',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [
        {
          id: 'week-06-dom-manipulation-challenge-4-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: `// Código inicial`,
          solution: `// Solução`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 50,
        }
      ],
      totalXP: 50,
    },
    {
      id: 'week-06-dom-manipulation-challenge-5',
      type: 'coding',
      title: 'Desafio 5: Desafio Complexo',
      description: 'Descrição do desafio',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      steps: [
        {
          id: 'week-06-dom-manipulation-challenge-5-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: `// Código inicial`,
          solution: `// Solução`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 60,
        }
      ],
      totalXP: 60,
    },
  ],
  
  weeklyProject: {
    id: 'week-06-dom-manipulation-project',
    title: 'Projeto: DOM Manipulation no Portfolio',
    description: 'Descrição do projeto semanal',
    learningObjectives: [
      'Aplicar DOM Manipulation em um projeto real',
      'Adicionar ao portfolio pessoal',
    ],
    starterCode: `// Código inicial do projeto`,
    completionCriteria: [
      'Critério 1 atendido',
      'Critério 2 atendido',
      'Código limpo e semântico',
    ],
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: 200,
    badgeId: 'dom-manipulation-master',
  },
  
  preClassChecklist: {
    id: 'week-06-dom-manipulation-checklist',
    weekId: 'week-06-dom-manipulation',
    items: [
      {
        id: 'read-theory',
        description: 'Ler todo o conteúdo teórico',
        type: 'content',
        estimatedMinutes: 45,
      },
      {
        id: 'try-examples',
        description: 'Testar os exemplos de código',
        type: 'content',
        estimatedMinutes: 15,
      },
      {
        id: 'attempt-challenges',
        description: 'Tentar pelo menos 3 desafios',
        type: 'challenge',
        estimatedMinutes: 60,
      },
      {
        id: 'review-project',
        description: 'Revisar requisitos do projeto',
        type: 'project',
        estimatedMinutes: 10,
      },
      {
        id: 'prepare-questions',
        description: 'Anotar dúvidas para a aula',
        type: 'content',
        estimatedMinutes: 10,
      },
    ],
  },
  
  liveClassTopics: [
    'Revisão dos conceitos principais de DOM Manipulation',
    'Discussão de dúvidas dos desafios',
    'Code review de soluções criativas',
    'Dicas para o projeto semanal',
    'Boas práticas e padrões profissionais',
  ],
  
  estimatedStudyHours: 6,
  difficulty: 'beginner',
  tags: ['javascript', 'dom-manipulation', 'semana-6'],
  previousWeekId: 'week-05',
  nextWeekId: 'week-07',
};
