import { WeeklyModule } from '@/types/weekly-modules';

export const week07EventsAndForms: WeeklyModule = {
  id: 'week-07-events-and-forms',
  weekNumber: 7,
  title: 'Events and Forms',
  subtitle: 'Descrição curta do módulo',
  description: 'Descrição detalhada do que será aprendido nesta semana',
  
  learningObjectives: [
    'Objetivo de aprendizagem 1',
    'Objetivo de aprendizagem 2',
    'Objetivo de aprendizagem 3',
    'Objetivo de aprendizagem 4',
    'Objetivo de aprendizagem 5',
  ],
  
  prerequisites: ['week-06'],
  
  theoryContent: {
    id: 'week-07-events-and-forms-theory',
    sections: [
      {
        id: 'events-and-forms-intro',
        title: 'Introdução ao Events and Forms',
        content: `# Events and Forms

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
        id: 'events-and-forms-concepts',
        title: 'Conceitos Principais',
        content: `# Conceitos Importantes

Mais teoria...`,
        codeExamples: []
      }
    ]
  },
  
  resources: [
    {
      id: 'events-and-forms-mdn',
      type: 'reading',
      title: 'MDN: Events and Forms',
      url: 'https://developer.mozilla.org',
      required: true,
    }
  ],
  
  challenges: [
    {
      id: 'week-07-events-and-forms-challenge-1',
      type: 'coding',
      title: 'Desafio 1: Events and Forms Básico',
      description: 'Descrição do desafio',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'week-07-events-and-forms-challenge-1-step-1',
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
      id: 'week-07-events-and-forms-challenge-2',
      type: 'coding',
      title: 'Desafio 2: Events and Forms Intermediário',
      description: 'Descrição do desafio',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'week-07-events-and-forms-challenge-2-step-1',
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
      id: 'week-07-events-and-forms-challenge-3',
      type: 'coding',
      title: 'Desafio 3: Events and Forms Avançado',
      description: 'Descrição do desafio',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'week-07-events-and-forms-challenge-3-step-1',
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
      id: 'week-07-events-and-forms-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Projeto Mini',
      description: 'Descrição do desafio',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [
        {
          id: 'week-07-events-and-forms-challenge-4-step-1',
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
      id: 'week-07-events-and-forms-challenge-5',
      type: 'coding',
      title: 'Desafio 5: Desafio Complexo',
      description: 'Descrição do desafio',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      steps: [
        {
          id: 'week-07-events-and-forms-challenge-5-step-1',
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
    id: 'week-07-events-and-forms-project',
    title: 'Projeto: Events and Forms no Portfolio',
    description: 'Descrição do projeto semanal',
    learningObjectives: [
      'Aplicar Events and Forms em um projeto real',
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
    badgeId: 'events-and-forms-master',
  },
  
  preClassChecklist: {
    id: 'week-07-events-and-forms-checklist',
    weekId: 'week-07-events-and-forms',
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
    'Revisão dos conceitos principais de Events and Forms',
    'Discussão de dúvidas dos desafios',
    'Code review de soluções criativas',
    'Dicas para o projeto semanal',
    'Boas práticas e padrões profissionais',
  ],
  
  estimatedStudyHours: 6,
  difficulty: 'beginner',
  tags: ['javascript', 'events-and-forms', 'semana-7'],
  previousWeekId: 'week-06',
  nextWeekId: 'week-08',
};
