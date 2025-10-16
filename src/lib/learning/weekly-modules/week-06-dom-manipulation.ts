import { WeeklyModule } from '@/types/weekly-modules';

export const week06DomManipulation: WeeklyModule = {
  id: 'week-06-dom-manipulation',
  weekNumber: 6,
  title: 'DOM Manipulation: Controlando a Página',
  subtitle: 'Modifique HTML e CSS com JavaScript em tempo real',
  description: 'Aprenda a manipular o DOM (Document Object Model) para criar, modificar e deletar elementos HTML dinamicamente. Crie um dark mode toggle interativo no seu portfolio!',
  
  learningObjectives: [
    'Entender o que é o DOM (Document Object Model)',
    'Selecionar elementos HTML com querySelector',
    'Modificar conteúdo, estilos e atributos com JavaScript',
    'Criar e remover elementos dinamicamente',
    'Implementar dark mode toggle no portfolio'
  ],
  
  prerequisites: ['week-05-javascript-fundamentals'],
  
  theoryContent: {
    id: 'week-06-dom-manipulation-theory',
    sections: [
      {
        id: 'dom-intro',
        title: 'O que é o DOM?',
        content: `# DOM: A Ponte Entre JavaScript e HTML

**DOM (Document Object Model)** = Representação do HTML que o JavaScript consegue manipular

## Analogia
Imagine o HTML como um **prédio**:
- Cada tag HTML é um **cômodo**
- JavaScript é um **robô**
- O DOM é o **mapa** que o robô usa para encontrar e modificar os cômodos

##Como Funciona

\`\`\`html
<h1 id="titulo">Olá</h1>
<button onclick="mudarTitulo()">Mudar</button>

<script>
function mudarTitulo() {
  const titulo = document.querySelector('#titulo');
  titulo.textContent = 'Título Mudado!';
}
</script>
\`\`\``,
        codeExamples: [
          {
            language: 'javascript',
            code: `console.log(document.title);
console.log(document.body);
document.title = "Novo Título";`,
            explanation: 'document é o objeto raiz do DOM. Tudo começa a partir dele.'
          }
        ]
      },
      {
        id: 'selecting',
        title: 'Selecionando Elementos',
        content: `# querySelector: Encontrando Elementos

## querySelector (mais usado)
\`\`\`javascript
const titulo = document.querySelector('#titulo');
const botao = document.querySelector('.btn');
const paragrafo = document.querySelector('p');
\`\`\`

## querySelectorAll (vários)
\`\`\`javascript
const cards = document.querySelectorAll('.card');
cards.forEach(card => console.log(card));
\`\`\``,
        codeExamples: [{
          language: 'javascript',
          code: `const botoes = document.querySelectorAll('button');
botoes.forEach((btn, i) => {
  btn.textContent = 'Botão ' + (i+1);
});`,
          explanation: 'querySelectorAll retorna NodeList. Use forEach para iterar.'
        }]
      },
      {
        id: 'modifying',
        title: 'Modificando Conteúdo e Estilos',
        content: `# Modificar Texto e Aparência

## Texto
\`\`\`javascript
const h1 = document.querySelector('h1');
h1.textContent = 'Novo Título';
\`\`\`

## Estilos
\`\`\`javascript
const box = document.querySelector('.box');
box.style.backgroundColor = '#3b82f6';
box.style.padding = '20px';
\`\`\`

## Classes (melhor!)
\`\`\`javascript
const btn = document.querySelector('button');
btn.classList.add('ativo');
btn.classList.toggle('dark-mode');
\`\`\``,
        codeExamples: [{
          language: 'javascript',
          code: `const body = document.body;
body.classList.toggle('dark-mode');
if (body.classList.contains('dark-mode')) {
  console.log('Dark mode ativo');
}`,
          explanation: 'classList.toggle é perfeito para dark mode.'
        }]
      },
      {
        id: 'creating',
        title: 'Criando e Removendo Elementos',
        content: `# Criar e Deletar Elementos

## Criar
\`\`\`javascript
const div = document.createElement('div');
div.textContent = 'Novo elemento';
div.classList.add('card');
document.body.appendChild(div);
\`\`\`

## Remover
\`\`\`javascript
const card = document.querySelector('.card');
card.remove();
\`\`\``,
        codeExamples: [{
          language: 'javascript',
          code: `function adicionarTarefa(texto) {
  const li = document.createElement('li');
  li.innerHTML = texto + '<button onclick="this.parentElement.remove()">X</button>';
  document.querySelector('#lista').appendChild(li);
}`,
          explanation: 'Criar elementos dinamicamente permite UIs completamente interativas.'
        }]
      }
    ]
  },
  
  resources: [
    {
      id: 'dom-mdn',
      type: 'reading',
      title: 'MDN: Manipulando Documentos',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents',
      required: true,
    }
  ],
  
  challenges: [
    {
      id: 'week-06-challenge-1',
      type: 'coding',
      title: 'Desafio 1: Mudar Cor',
      description: 'Mude cor de fundo ao clicar',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [{
        id: 'week-06-challenge-1-step-1',
        title: 'Mudança de Cor',
        instruction: 'Selecione .box e mude backgroundColor',
        starterCode: `function mudarCor() { }`,
        solution: `function mudarCor() { document.querySelector('.box').style.backgroundColor = '#3b82f6'; }`,
        hints: ['Use querySelector'],
        validationCriteria: ['querySelector usado'],
        xpReward: 25,
      }],
      totalXP: 25,
    },
    {
      id: 'week-06-challenge-2',
      type: 'coding',
      title: 'Desafio 2: Toggle Class',
      description: 'Toggle classe ativo',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [{
        id: 'week-06-challenge-2-step-1',
        title: 'Toggle',
        instruction: 'Use classList.toggle',
        starterCode: `function toggle() { }`,
        solution: `function toggle() { document.querySelector('#btn').classList.toggle('ativo'); }`,
        hints: ['classList.toggle'],
        validationCriteria: ['Toggle funcional'],
        xpReward: 30,
      }],
      totalXP: 30,
    },
    {
      id: 'week-06-challenge-3',
      type: 'coding',
      title: 'Desafio 3: Criar Elemento',
      description: 'Crie card dinamicamente',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [{
        id: 'week-06-challenge-3-step-1',
        title: 'Criar Card',
        instruction: 'createElement e appendChild',
        starterCode: `function criar() { }`,
        solution: `function criar() { const c = document.createElement('div'); c.className='card'; document.querySelector('.container').appendChild(c); }`,
        hints: ['createElement'],
        validationCriteria: ['Elemento criado'],
        xpReward: 40,
      }],
      totalXP: 40,
    },
    {
      id: 'week-06-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Contador',
      description: 'Contador +/-',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [{
        id: 'week-06-challenge-4-step-1',
        title: 'Contador',
        instruction: 'Incremente e atualize DOM',
        starterCode: `let c=0; function inc() { }`,
        solution: `let c=0; function inc() { c++; document.querySelector('#val').textContent=c; }`,
        hints: ['Atualize textContent'],
        validationCriteria: ['Contador funcional'],
        xpReward: 50,
      }],
      totalXP: 50,
    },
    {
      id: 'week-06-challenge-5',
      type: 'coding',
      title: 'Desafio 5: To-Do',
      description: 'Lista de tarefas',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      steps: [{
        id: 'week-06-challenge-5-step-1',
        title: 'To-Do List',
        instruction: 'Adicione e remova tarefas',
        starterCode: `function add() { }`,
        solution: `function add() { const li=document.createElement('li'); li.innerHTML=document.querySelector('#in').value+'<button onclick="this.parentElement.remove()">X</button>'; document.querySelector('#list').appendChild(li); }`,
        hints: ['Crie li dinamicamente'],
        validationCriteria: ['Adiciona e remove'],
        xpReward: 70,
      }],
      totalXP: 70,
    },
  ],
  
  weeklyProject: {
    id: 'week-06-project',
    title: 'Projeto: Dark Mode Toggle',
    description: 'Adicione dark mode ao portfolio',
    learningObjectives: ['Toggle classes', 'Salvar preferências'],
    starterCode: `<button id="dm">🌙</button>`,
    completionCriteria: ['Toggle funcional', 'CSS dark-mode', 'Salva preferência'],
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: 250,
    badgeId: 'dom-master',
  },
  
  preClassChecklist: {
    id: 'week-06-checklist',
    weekId: 'week-06-dom-manipulation',
    items: [
      { id: 'read', description: 'Ler teoria DOM', type: 'content', estimatedMinutes: 45 },
      { id: 'test', description: 'Testar DevTools', type: 'content', estimatedMinutes: 15 },
      { id: 'challenges', description: '3 desafios DOM', type: 'challenge', estimatedMinutes: 60 },
      { id: 'plan', description: 'Planejar dark mode', type: 'project', estimatedMinutes: 15 },
      { id: 'questions', description: 'Anotar dúvidas', type: 'content', estimatedMinutes: 10 },
    ],
  },
  
  liveClassTopics: [
    'querySelector vs querySelectorAll',
    'textContent vs innerHTML',
    'classList methods',
    'Review dark modes',
    'Debugging DOM'
  ],
  
  estimatedStudyHours: 6,
  difficulty: 'intermediate',
  tags: ['javascript', 'dom', 'semana-6'],
  previousWeekId: 'week-05-javascript-fundamentals',
  nextWeekId: 'week-07-events-and-forms',
};
