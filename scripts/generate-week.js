#!/usr/bin/env node

/**
 * Script para gerar scaffolding de novos módulos semanais
 * Uso: npm run generate:week <weekNumber> <title> <category>
 * Exemplo: npm run generate:week 4 "CSS Grid" "css"
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('❌ Uso: npm run generate:week <weekNumber> <title> <category>');
  console.error('Exemplo: npm run generate:week 4 "CSS Grid" "css"');
  process.exit(1);
}

const [weekNumber, title, category] = args;
const weekNum = parseInt(weekNumber);

if (isNaN(weekNum) || weekNum < 1 || weekNum > 12) {
  console.error('❌ Número da semana deve estar entre 1 e 12');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const weekId = `week-${weekNum.toString().padStart(2, '0')}-${slug}`;
const fileName = `${weekId}.ts`;
const filePath = path.join(__dirname, '..', 'src', 'lib', 'learning', 'weekly-modules', fileName);

if (fs.existsSync(filePath)) {
  console.error(`❌ Arquivo ${fileName} já existe!`);
  process.exit(1);
}

const template = `import { WeeklyModule } from '@/types/weekly-modules';

export const week${weekNum.toString().padStart(2, '0')}${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}: WeeklyModule = {
  id: '${weekId}',
  weekNumber: ${weekNum},
  title: '${title}',
  subtitle: 'Descrição curta do módulo',
  description: 'Descrição detalhada do que será aprendido nesta semana',
  
  learningObjectives: [
    'Objetivo de aprendizagem 1',
    'Objetivo de aprendizagem 2',
    'Objetivo de aprendizagem 3',
    'Objetivo de aprendizagem 4',
    'Objetivo de aprendizagem 5',
  ],
  
  prerequisites: ${weekNum > 1 ? `['week-${(weekNum - 1).toString().padStart(2, '0')}']` : '[]'},
  
  theoryContent: {
    id: '${weekId}-theory',
    sections: [
      {
        id: '${slug}-intro',
        title: 'Introdução ao ${title}',
        content: \`# ${title}

Conteúdo teórico aqui...

## Tópico 1

Explicação detalhada...

## Tópico 2

Mais conteúdo...\`,
        codeExamples: [
          {
            language: '${category === 'html' ? 'html' : category === 'css' ? 'css' : 'javascript'}',
            code: \`// Exemplo de código\`,
            explanation: 'Explicação do exemplo'
          }
        ]
      },
      {
        id: '${slug}-concepts',
        title: 'Conceitos Principais',
        content: \`# Conceitos Importantes

Mais teoria...\`,
        codeExamples: []
      }
    ]
  },
  
  resources: [
    {
      id: '${slug}-mdn',
      type: 'reading',
      title: 'MDN: ${title}',
      url: 'https://developer.mozilla.org',
      required: true,
    }
  ],
  
  challenges: [
    {
      id: '${weekId}-challenge-1',
      type: 'coding',
      title: 'Desafio 1: ${title} Básico',
      description: 'Descrição do desafio',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: '${weekId}-challenge-1-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: \`// Código inicial\`,
          solution: \`// Solução\`,
          hints: ['Dica 1', 'Dica 2'],
          validationCriteria: ['Critério 1', 'Critério 2'],
          xpReward: 20,
        }
      ],
      totalXP: 20,
    },
    {
      id: '${weekId}-challenge-2',
      type: 'coding',
      title: 'Desafio 2: ${title} Intermediário',
      description: 'Descrição do desafio',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: '${weekId}-challenge-2-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: \`// Código inicial\`,
          solution: \`// Solução\`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 30,
        }
      ],
      totalXP: 30,
    },
    {
      id: '${weekId}-challenge-3',
      type: 'coding',
      title: 'Desafio 3: ${title} Avançado',
      description: 'Descrição do desafio',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [
        {
          id: '${weekId}-challenge-3-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: \`// Código inicial\`,
          solution: \`// Solução\`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 40,
        }
      ],
      totalXP: 40,
    },
    {
      id: '${weekId}-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Projeto Mini',
      description: 'Descrição do desafio',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [
        {
          id: '${weekId}-challenge-4-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: \`// Código inicial\`,
          solution: \`// Solução\`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 50,
        }
      ],
      totalXP: 50,
    },
    {
      id: '${weekId}-challenge-5',
      type: 'coding',
      title: 'Desafio 5: Desafio Complexo',
      description: 'Descrição do desafio',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      steps: [
        {
          id: '${weekId}-challenge-5-step-1',
          title: 'Passo 1',
          instruction: 'Instruções do desafio',
          starterCode: \`// Código inicial\`,
          solution: \`// Solução\`,
          hints: ['Dica 1'],
          validationCriteria: ['Critério 1'],
          xpReward: 60,
        }
      ],
      totalXP: 60,
    },
  ],
  
  weeklyProject: {
    id: '${weekId}-project',
    title: 'Projeto: ${title} no Portfolio',
    description: 'Descrição do projeto semanal',
    learningObjectives: [
      'Aplicar ${title} em um projeto real',
      'Adicionar ao portfolio pessoal',
    ],
    starterCode: \`// Código inicial do projeto\`,
    completionCriteria: [
      'Critério 1 atendido',
      'Critério 2 atendido',
      'Código limpo e semântico',
    ],
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: 200,
    badgeId: '${slug}-master',
  },
  
  preClassChecklist: {
    id: '${weekId}-checklist',
    weekId: '${weekId}',
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
    'Revisão dos conceitos principais de ${title}',
    'Discussão de dúvidas dos desafios',
    'Code review de soluções criativas',
    'Dicas para o projeto semanal',
    'Boas práticas e padrões profissionais',
  ],
  
  estimatedStudyHours: 6,
  difficulty: 'beginner',
  tags: ['${category}', '${slug}', 'semana-${weekNum}'],
  previousWeekId: ${weekNum > 1 ? `'week-${(weekNum - 1).toString().padStart(2, '0')}'` : 'undefined'},
  nextWeekId: ${weekNum < 12 ? `'week-${(weekNum + 1).toString().padStart(2, '0')}'` : 'undefined'},
};
`;

// Escrever arquivo
fs.writeFileSync(filePath, template, 'utf8');

console.log(`✅ Módulo criado com sucesso: ${fileName}`);
console.log(`📁 Localização: ${filePath}`);
console.log(`\n📝 Próximos passos:`);
console.log(`   1. Editar ${fileName} e preencher o conteúdo`);
console.log(`   2. Adicionar import em src/lib/learning/weekly-modules/index.ts`);
console.log(`   3. Adicionar ao array weeklyModules`);
console.log(`   4. Validar com: npm run validate:weeks\n`);
