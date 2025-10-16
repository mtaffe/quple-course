import { WeeklyModule } from '@/types/weekly-modules';

export const week09ReactBasics: WeeklyModule = {
  id: 'week-09-react-basics',
  weekNumber: 9,
  title: 'React: Componentes Reutilizáveis',
  subtitle: 'Construa UIs modernas com a biblioteca mais popular do mundo',
  description: 'Bem-vindo ao React! Aprenda a criar componentes reutilizáveis, usar JSX e transformar seu portfolio em uma aplicação React moderna.',
  
  learningObjectives: [
    'Entender o que é React e por que usar',
    'Criar componentes React funcionais',
    'Usar JSX para escrever HTML no JavaScript',
    'Passar dados entre componentes com Props',
    'Refatorar portfolio para componentes React'
  ],
  
  prerequisites: ['week-08-arrays-and-api'],
  
  theoryContent: {
    id: 'week-09-react-basics-theory',
    sections: [
      {
        id: 'react-intro',
        title: 'React: A Biblioteca Mais Popular',
        content: `# O que é React?

**React** = Biblioteca JavaScript para construir interfaces de usuário (UIs) usando **componentes reutilizáveis**

## Por que React?

✅ **Componentes**: Blocos de UI reutilizáveis como LEGO
✅ **JSX**: Escreve HTML dentro do JavaScript
✅ **Virtual DOM**: Super rápido, atualiza só o necessário
✅ **Comunidade**: Milhões de devs, milhares de jobs

## Analogia
HTML/CSS/JS tradicional = Montar móvel do zero toda vez
React = Ter peças prontas (componentes) e só montar

\`\`\`jsx
// Componente Button reutilizável
function Button({ text }) {
  return <button className="btn">{text}</button>
}

// Usar várias vezes
<Button text="Salvar" />
<Button text="Cancelar" />
<Button text="Enviar" />
\`\`\``,
        codeExamples: [
          {
            language: 'jsx',
            code: `// Primeiro componente React
function Welcome() {
  return (
    <div>
      <h1>Olá, React!</h1>
      <p>Meu primeiro componente</p>
    </div>
  );
}`,
            explanation: 'Componente React é uma função que retorna JSX (HTML + JavaScript)'
          }
        ]
      },
      {
        id: 'jsx',
        title: 'JSX: HTML + JavaScript',
        content: `# JSX: O Superpoder do React

**JSX** = JavaScript XML = HTML dentro do JavaScript

\`\`\`jsx
const nome = "Maria";
const elemento = <h1>Olá, {nome}!</h1>;

// JavaScript dentro de {}
const resultado = <p>2 + 2 = {2 + 2}</p>;

// Múltiplas linhas com ()
const card = (
  <div className="card">
    <h2>{titulo}</h2>
    <p>{descricao}</p>
  </div>
);
\`\`\`

## Diferenças do HTML

| HTML | JSX (React) |
|------|-------------|
| \`class="btn"\` | \`className="btn"\` |
| \`for="nome"\` | \`htmlFor="nome"\` |
| \`onclick=""\` | \`onClick={}\` |
| \`style="color: red"\` | \`style={{color: 'red'}}\` |`,
        codeExamples: [
          {
            language: 'jsx',
            code: `function Card() {
  const titulo = "React é incrível";
  const pontos = [95, 87, 92];
  const media = pontos.reduce((a,b)=>a+b)/pontos.length;
  
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <p>Média: {media.toFixed(1)}</p>
      <button onClick={() => alert('Clicou!')}>
        Ver Detalhes
      </button>
    </div>
  );
}`,
            explanation: 'JSX permite JavaScript completo dentro de {}. Super poderoso!'
          }
        ]
      },
      {
        id: 'components',
        title: 'Componentes: Blocos Reutilizáveis',
        content: `# Criando Componentes

Componente = Função que retorna JSX

\`\`\`jsx
// Componente simples
function Header() {
  return (
    <header>
      <h1>Meu Site</h1>
      <nav>...</nav>
    </header>
  );
}

// Componente com lógica
function Greeting() {
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';
  
  return <h1>{saudacao}!</h1>;
}

// Usar componentes
function App() {
  return (
    <div>
      <Header />
      <Greeting />
    </div>
  );
}
\`\`\`

## Regras dos Componentes

1. **Nome com Maiúscula**: \`<Button>\` não \`<button>\`
2. **Retorna JSX**: Sempre retorna elementos
3. **Um elemento raiz**: Ou use \`<></>\` (Fragment)

\`\`\`jsx
// ❌ Errado: múltiplos elementos raiz
function Errado() {
  return (
    <h1>Título</h1>
    <p>Parágrafo</p>
  );
}

// ✅ Correto: um elemento raiz
function Correto() {
  return (
    <>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </>
  );
}
\`\`\``,
        codeExamples: [
          {
            language: 'jsx',
            code: `// Portfolio componentizado
function Header() {
  return <header><h1>João Silva</h1></header>;
}

function About() {
  return (
    <section>
      <h2>Sobre Mim</h2>
      <p>Desenvolvedor apaixonado por React</p>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <About />
    </>
  );
}`,
            explanation: 'Portfolio dividido em componentes reutilizáveis e organizados'
          }
        ]
      },
      {
        id: 'props',
        title: 'Props: Passando Dados',
        content: `# Props: Propriedades dos Componentes

**Props** = Dados que você passa para um componente (como parâmetros de função)

\`\`\`jsx
// Componente recebe props
function Card(props) {
  return (
    <div className="card">
      <h3>{props.titulo}</h3>
      <p>{props.descricao}</p>
    </div>
  );
}

// Usar com props diferentes
<Card titulo="HTML" descricao="Estrutura" />
<Card titulo="CSS" descricao="Estilo" />
<Card titulo="JavaScript" descricao="Lógica" />
\`\`\`

## Destructuring (moderno)

\`\`\`jsx
// Jeito antigo
function Card(props) {
  return <h3>{props.titulo}</h3>;
}

// Jeito moderno (destructuring)
function Card({ titulo, descricao }) {
  return (
    <div>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}
\`\`\`

## Props Children

\`\`\`jsx
function Button({ children }) {
  return <button className="btn">{children}</button>;
}

// Usar
<Button>Clique Aqui</Button>
<Button><strong>Enviar</strong></Button>
\`\`\``,
        codeExamples: [
          {
            language: 'jsx',
            code: `function ProjectCard({ titulo, tecnologia, url }) {
  return (
    <div className="project-card">
      <h3>{titulo}</h3>
      <span className="tech">{tecnologia}</span>
      <a href={url}>Ver Projeto</a>
    </div>
  );
}

// Reutilizar com dados diferentes
<ProjectCard 
  titulo="Todo App" 
  tecnologia="React" 
  url="/todo" 
/>
<ProjectCard 
  titulo="Weather App" 
  tecnologia="React + API" 
  url="/weather" 
/>`,
            explanation: 'Props tornam componentes reutilizáveis com dados diferentes'
          }
        ]
      }
    ]
  },
  
  resources: [
    {
      id: 'react-docs',
      type: 'reading',
      title: 'React Docs',
      url: 'https://react.dev/learn',
      required: true,
    }
  ],
  
  challenges: [
    {
      id: 'week-09-challenge-1',
      type: 'coding',
      title: 'Desafio 1: Primeiro Componente',
      description: 'Crie componente Welcome que mostra seu nome',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [{
        id: 'week-09-challenge-1-step-1',
        title: 'Welcome Component',
        instruction: 'Crie componente que retorna <h1>Olá, [seu nome]!</h1>',
        starterCode: `function Welcome() { }`,
        solution: `function Welcome() { return <h1>Olá, Maria!</h1>; }`,
        hints: ['return JSX', 'Use maiúscula no nome'],
        validationCriteria: ['Componente funcional', 'Retorna JSX'],
        xpReward: 30,
      }],
      totalXP: 30,
    },
    {
      id: 'week-09-challenge-2',
      type: 'coding',
      title: 'Desafio 2: Componente com Props',
      description: 'Componente Button que recebe texto via props',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [{
        id: 'week-09-challenge-2-step-1',
        title: 'Button com Props',
        instruction: 'Receba texto via props e mostre no button',
        starterCode: `function Button(props) { }`,
        solution: `function Button({ text }) { return <button>{text}</button>; }`,
        hints: ['Destructuring props', '{text}'],
        validationCriteria: ['Props usados'],
        xpReward: 40,
      }],
      totalXP: 40,
    },
    {
      id: 'week-09-challenge-3',
      type: 'coding',
      title: 'Desafio 3: Card Component',
      description: 'Card com título, descrição e botão',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [{
        id: 'week-09-challenge-3-step-1',
        title: 'Project Card',
        instruction: 'Componente ProjectCard com props: titulo, desc, url',
        starterCode: `function ProjectCard() { }`,
        solution: `function ProjectCard({titulo,desc,url}) { return <div><h3>{titulo}</h3><p>{desc}</p><a href={url}>Ver</a></div>; }`,
        hints: ['Múltiplos props', 'div root'],
        validationCriteria: ['3 props', 'JSX correto'],
        xpReward: 50,
      }],
      totalXP: 50,
    },
    {
      id: 'week-09-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Lista de Componentes',
      description: 'Renderize array de dados como componentes',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [{
        id: 'week-09-challenge-4-step-1',
        title: 'Lista Dinâmica',
        instruction: 'Mapeie array de projetos para componentes ProjectCard',
        starterCode: `const projetos=[{id:1,titulo:"App"}]; function Projects() { }`,
        solution: `function Projects() { return projetos.map(p => <ProjectCard key={p.id} {...p} />); }`,
        hints: ['map()', 'key prop', 'spread operator'],
        validationCriteria: ['map usado', 'key presente'],
        xpReward: 60,
      }],
      totalXP: 60,
    },
    {
      id: 'week-09-challenge-5',
      type: 'coding',
      title: 'Desafio 5: Composição',
      description: 'Layout com Header, Content, Footer components',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      steps: [{
        id: 'week-09-challenge-5-step-1',
        title: 'App Layout',
        instruction: 'Crie Header, Content, Footer e componha no App',
        starterCode: `function Header() {} function Content() {} function Footer() {} function App() {}`,
        solution: `function Header() { return <header>Header</header>; } function Content() { return <main>Content</main>; } function Footer() { return <footer>Footer</footer>; } function App() { return <><Header/><Content/><Footer/></>; }`,
        hints: ['Fragment <>', 'Componha 3 components'],
        validationCriteria: ['3 components', 'Composição'],
        xpReward: 70,
      }],
      totalXP: 70,
    },
  ],
  
  weeklyProject: {
    id: 'week-09-project',
    title: 'Projeto: Portfolio em React',
    description: 'Refatore seu portfolio para React usando componentes reutilizáveis',
    learningObjectives: ['Componentizar UI', 'Usar props', 'Composição'],
    starterCode: `function App() { return <>...</>; }`,
    completionCriteria: ['Header component', 'About component', 'Projects map', 'Footer component', 'Props usados'],
    portfolioPiece: true,
    estimatedHours: 4,
    xpReward: 300,
    badgeId: 'react-basics-master',
  },
  
  preClassChecklist: {
    id: 'week-09-checklist',
    weekId: 'week-09-react-basics',
    items: [
      { id: 'read', description: 'Ler teoria React', type: 'content', estimatedMinutes: 50 },
      { id: 'setup', description: 'Configurar ambiente React', type: 'content', estimatedMinutes: 20 },
      { id: 'challenges', description: '3 desafios React', type: 'challenge', estimatedMinutes: 60 },
      { id: 'plan', description: 'Planejar componentização', type: 'project', estimatedMinutes: 20 },
      { id: 'questions', description: 'Dúvidas React', type: 'content', estimatedMinutes: 10 },
    ],
  },
  
  liveClassTopics: [
    'JSX vs HTML: diferenças',
    'Props vs State (preview semana 11)',
    'Composição de componentes',
    'Review portfolios React',
    'Next.js preview'
  ],
  
  estimatedStudyHours: 7,
  difficulty: 'intermediate',
  tags: ['react', 'components', 'jsx', 'props', 'semana-9'],
  previousWeekId: 'week-08-arrays-and-api',
  nextWeekId: 'week-10-react-components',
};
