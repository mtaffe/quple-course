import { WeeklyModule } from '@/types/weekly-modules';

export const week04CSSGridResponsive: WeeklyModule = {
  id: 'week-04-css-grid-responsive',
  weekNumber: 4,
  title: 'CSS Grid & Design Responsivo',
  subtitle: 'Crie layouts complexos e adapte para qualquer tela',
  description: 'Domine CSS Grid para criar layouts profissionais de duas dimensões e aprenda design responsivo para que seu portfolio funcione perfeitamente em celular, tablet e desktop.',
  
  learningObjectives: [
    'Criar layouts complexos com CSS Grid',
    'Entender grid-template-columns, grid-template-rows e grid-gap',
    'Aplicar design responsivo com media queries',
    'Usar mobile-first approach',
    'Criar galeria de projetos responsiva no portfolio'
  ],
  
  prerequisites: ['week-03-flexbox'],
  
  theoryContent: {
    id: 'css-grid-responsive-theory',
    sections: [
      {
        id: 'grid-intro',
        title: 'CSS Grid: Layout Profissional de Verdade',
        content: `# CSS Grid: O Sistema de Layout Mais Poderoso

**CSS Grid** é perfeito para layouts **bidimensionais** (linhas E colunas ao mesmo tempo).

## Grid vs Flexbox: Quando Usar Cada Um?

### Flexbox (Semana 3)
- ✅ Layout em **uma dimensão** (linha OU coluna)
- ✅ Alinhar itens em uma barra de navegação
- ✅ Distribuir cards em uma linha

### CSS Grid (Esta Semana)
- ✅ Layout em **duas dimensões** (linhas E colunas)
- ✅ Estrutura completa de uma página
- ✅ Galerias de imagens complexas
- ✅ Dashboards e painéis

## Conceitos Básicos

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* 3 colunas */
  grid-template-rows: auto 1fr auto;      /* 3 linhas */
  grid-gap: 20px;                         /* Espaço entre itens */
}
\`\`\`

### Unidades Importantes:
- \`fr\` (fraction) = Fração do espaço disponível
- \`auto\` = Tamanho do conteúdo
- \`1fr 1fr\` = Duas colunas iguais
- \`2fr 1fr\` = Primeira coluna 2x maior que a segunda`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Layout de Blog com Grid */
.blog-layout {
  display: grid;
  grid-template-columns: 250px 1fr;  /* Sidebar + Conteúdo */
  grid-template-rows: auto 1fr auto; /* Header + Main + Footer */
  grid-gap: 20px;
  min-height: 100vh;
}

.header {
  grid-column: 1 / -1; /* Ocupar todas as colunas */
}

.footer {
  grid-column: 1 / -1;
}`,
            explanation: 'Layout profissional com header full-width, sidebar fixa e conteúdo fluid'
          }
        ]
      },
      {
        id: 'grid-template-areas',
        title: 'Grid Template Areas: Layouts Visuais',
        content: `# Grid Template Areas: Nomear Áreas do Layout

A forma mais **visual e legível** de criar layouts com Grid!

## Sintaxe

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header  header"
    "sidebar content aside"
    "footer  footer  footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }
\`\`\`

## Vantagens
✅ Visual: você VÊ o layout no código
✅ Fácil de modificar
✅ Responsivo: mude o template em media queries`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Portfolio com Grid Areas */
.portfolio {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-gap: 30px;
  grid-template-areas:
    "hero hero hero"
    "about about skills"
    "projects projects projects"
    "contact contact contact";
}

.hero     { grid-area: hero; }
.about    { grid-area: about; }
.skills   { grid-area: skills; }
.projects { grid-area: projects; }
.contact  { grid-area: contact; }

/* Responsivo: Mobile */
@media (max-width: 768px) {
  .portfolio {
    grid-template-columns: 1fr;
    grid-template-areas:
      "hero"
      "about"
      "skills"
      "projects"
      "contact";
  }
}`,
            explanation: 'Layout muda completamente em mobile com poucas linhas!'
          }
        ]
      },
      {
        id: 'responsive-design',
        title: 'Design Responsivo: Mobile, Tablet, Desktop',
        content: `# Design Responsivo com Media Queries

**Responsivo** = Seu site se adapta a QUALQUER tamanho de tela.

## Mobile-First Approach (Recomendado)

Comece pelo mobile e ADICIONE complexidade para telas maiores:

\`\`\`css
/* Base: Mobile (padrão) */
.container {
  padding: 20px;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container {
    padding: 40px;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
\`\`\`

## Breakpoints Comuns

| Dispositivo | Largura Min | Uso |
|------------|-------------|-----|
| Mobile     | 0px (padrão) | Base styles |
| Tablet     | 768px       | Layouts médios |
| Desktop    | 1024px      | Layouts grandes |
| Wide       | 1440px+     | Telas grandes |

## Dica Profissional
🔥 Use \`rem\` ao invés de \`px\` para fontes (acessibilidade)
📱 Teste em DevTools (Chrome/Firefox) com diferentes devices`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Portfolio Responsivo Completo */

/* Mobile First */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;        /* 1 coluna */
  gap: 20px;
}

.project-card {
  padding: 20px;
}

/* Tablet: 2 colunas */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas */
    gap: 30px;
  }
}

/* Desktop: 3 colunas */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 colunas */
    gap: 40px;
  }
  
  .project-card {
    padding: 30px;
  }
}`,
            explanation: 'Galeria que adapta de 1 → 2 → 3 colunas conforme a tela cresce'
          }
        ]
      },
      {
        id: 'responsive-units',
        title: 'Unidades Responsivas: rem, em, %, vw, vh',
        content: `# Unidades CSS para Design Responsivo

## Unidades Fixas vs Fluidas

### ❌ Fixas (evitar em responsivo)
- \`px\` = Pixels (tamanho fixo)

### ✅ Fluidas (usar para responsivo)
- \`%\` = Porcentagem do elemento pai
- \`rem\` = Relativo ao root font-size (16px padrão)
- \`em\` = Relativo ao font-size do elemento
- \`vw\` = 1% da largura da viewport
- \`vh\` = 1% da altura da viewport

## Quando Usar Cada Uma

\`\`\`css
/* REM - Para fontes e espaçamentos */
font-size: 1rem;      /* 16px (base) */
font-size: 1.5rem;    /* 24px */
padding: 2rem;        /* 32px */

/* % - Para larguras de containers */
width: 90%;           /* 90% do pai */
max-width: 1200px;    /* Limita o tamanho máximo */

/* VW/VH - Para elementos de tela cheia */
height: 100vh;        /* 100% da altura da tela */
font-size: 5vw;       /* 5% da largura (cuidado!) */
\`\`\`

## Dica de Ouro
Use \`clamp()\` para fontes responsivas sem media queries:

\`\`\`css
font-size: clamp(1rem, 2.5vw, 2rem);
/* Min: 16px, Ideal: 2.5% da tela, Max: 32px */
\`\`\``,
        codeExamples: [
          {
            language: 'css',
            code: `/* Hero Section Responsivo */
.hero {
  padding: 2rem;              /* 32px base */
  height: 100vh;              /* Tela cheia */
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);  /* Responsivo */
  margin-bottom: 1rem;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 600px;           /* Limita largura */
  margin: 0 auto;             /* Centraliza */
}`,
            explanation: 'Hero que adapta automaticamente sem media queries complexas'
          }
        ]
      }
    ]
  },
  
  resources: [
    {
      id: 'grid-mdn',
      type: 'reading',
      title: 'MDN: CSS Grid Layout',
      url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout',
      required: true,
    },
    {
      id: 'grid-garden',
      type: 'interactive',
      title: 'Grid Garden - Jogo para Aprender Grid',
      url: 'https://cssgridgarden.com/#pt-br',
      required: false,
    },
    {
      id: 'responsive-mdn',
      type: 'reading',
      title: 'MDN: Design Responsivo',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Responsive_Design',
      required: true,
    }
  ],
  
  challenges: [
    {
      id: 'week-04-challenge-1',
      type: 'coding',
      title: 'Desafio 1: Grid Básico 2x2',
      description: 'Crie um grid com 4 cards em layout 2x2',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'week-04-challenge-1-step-1',
          title: 'Grid 2x2',
          instruction: 'Crie um container com display: grid, 2 colunas, 2 linhas, gap de 20px',
          starterCode: `<!-- HTML fornecido -->
<div class="grid-container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>

<style>
/* SEU CÓDIGO CSS AQUI */
.grid-container {
  /* Complete o grid */
}

.card {
  background: #e0e7ff;
  padding: 20px;
  border-radius: 8px;
}
</style>`,
          solution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}`,
          hints: [
            'Use grid-template-columns: 1fr 1fr para 2 colunas iguais',
            'gap: 20px adiciona espaço entre os itens'
          ],
          validationCriteria: [
            'Display grid aplicado',
            '2 colunas definidas',
            'Gap de 20px'
          ],
          xpReward: 30,
        }
      ],
      totalXP: 30,
    },
    {
      id: 'week-04-challenge-2',
      type: 'coding',
      title: 'Desafio 2: Grid Template Areas',
      description: 'Crie um layout com header, sidebar, content e footer usando grid-template-areas',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'week-04-challenge-2-step-1',
          title: 'Layout com Template Areas',
          instruction: 'Use grid-template-areas para criar layout: header full-width no topo, sidebar à esquerda, content no centro, footer full-width embaixo',
          starterCode: `<div class="layout">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Content</main>
  <footer class="footer">Footer</footer>
</div>

<style>
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  /* Adicione grid-template-areas aqui */
}

/* Defina as grid-areas para cada elemento */
</style>`,
          solution: `.layout {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }`,
          hints: [
            'grid-template-areas usa strings para definir o layout visualmente',
            'Repita o nome da área para ocupar múltiplas colunas'
          ],
          validationCriteria: [
            'grid-template-areas definido',
            'Header ocupa 2 colunas',
            'Footer ocupa 2 colunas',
            'Sidebar e content lado a lado'
          ],
          xpReward: 40,
        }
      ],
      totalXP: 40,
    },
    {
      id: 'week-04-challenge-3',
      type: 'coding',
      title: 'Desafio 3: Galeria Responsiva',
      description: 'Crie uma galeria que vai de 1 → 2 → 3 colunas conforme a tela cresce',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'week-04-challenge-3-step-1',
          title: 'Grid Responsivo',
          instruction: 'Mobile: 1 coluna, Tablet (768px+): 2 colunas, Desktop (1024px+): 3 colunas',
          starterCode: `<div class="gallery">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>

<style>
/* Mobile First: 1 coluna */
.gallery {
  display: grid;
  gap: 20px;
}

.item {
  background: #ddd;
  padding: 40px;
  text-align: center;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  /* 2 colunas aqui */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* 3 colunas aqui */
}
</style>`,
          solution: `.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
          hints: [
            'repeat(2, 1fr) cria 2 colunas iguais',
            'Use mobile first: base é 1 coluna, depois ADICIONE colunas em breakpoints maiores'
          ],
          validationCriteria: [
            'Mobile: 1 coluna',
            'Tablet: 2 colunas a partir de 768px',
            'Desktop: 3 colunas a partir de 1024px'
          ],
          xpReward: 50,
        }
      ],
      totalXP: 50,
    },
    {
      id: 'week-04-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Auto-fit e Minmax',
      description: 'Crie grid que adapta automaticamente a quantidade de colunas baseado no espaço disponível',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [
        {
          id: 'week-04-challenge-4-step-1',
          title: 'Grid Auto-Responsivo',
          instruction: 'Use grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) para criar grid que adapta automaticamente',
          starterCode: `<div class="auto-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
</div>

<style>
.auto-grid {
  display: grid;
  gap: 20px;
  /* Adicione grid-template-columns com auto-fit e minmax */
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
}
</style>`,
          solution: `.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}`,
          hints: [
            'auto-fit cria colunas automaticamente baseado no espaço',
            'minmax(250px, 1fr) define: mínimo 250px, máximo 1 fração do espaço disponível'
          ],
          validationCriteria: [
            'auto-fit usado',
            'minmax com mínimo 250px',
            'Grid adapta sem media queries'
          ],
          xpReward: 60,
        }
      ],
      totalXP: 60,
    },
    {
      id: 'week-04-challenge-5',
      type: 'coding',
      title: 'Desafio 5: Dashboard Layout Complexo',
      description: 'Crie um dashboard profissional com header, sidebar, stats cards e gráfico principal',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      steps: [
        {
          id: 'week-04-challenge-5-step-1',
          title: 'Dashboard com Grid Areas',
          instruction: 'Crie layout: header full-width, sidebar, 3 stat cards em linha, main chart ocupando 2 colunas',
          starterCode: `<div class="dashboard">
  <header class="header">Dashboard Header</header>
  <aside class="sidebar">Nav</aside>
  <div class="stat">Stat 1</div>
  <div class="stat">Stat 2</div>
  <div class="stat">Stat 3</div>
  <main class="chart">Main Chart</main>
  <section class="activity">Recent Activity</section>
</div>

<style>
.dashboard {
  display: grid;
  gap: 20px;
  min-height: 100vh;
  /* Defina colunas, linhas e template areas */
}

/* Atribua grid-area para cada elemento */
</style>`,
          solution: `.dashboard {
  display: grid;
  grid-template-columns: 200px repeat(3, 1fr);
  grid-template-rows: auto auto 1fr auto;
  gap: 20px;
  min-height: 100vh;
  grid-template-areas:
    "header header header header"
    "sidebar stat1 stat2 stat3"
    "sidebar chart chart chart"
    "sidebar activity activity activity";
}

.header   { grid-area: header; }
.sidebar  { grid-area: sidebar; }
.stat:nth-child(3) { grid-area: stat1; }
.stat:nth-child(4) { grid-area: stat2; }
.stat:nth-child(5) { grid-area: stat3; }
.chart    { grid-area: chart; }
.activity { grid-area: activity; }`,
          hints: [
            'Use 4 colunas: 200px para sidebar, 3x 1fr para conteúdo',
            'Stats devem ocupar 1 coluna cada, chart 3 colunas'
          ],
          validationCriteria: [
            'Header full-width',
            'Sidebar ocupa 4 linhas',
            '3 stats em linha',
            'Chart ocupa 3 colunas do conteúdo'
          ],
          xpReward: 80,
        }
      ],
      totalXP: 80,
    },
  ],
  
  weeklyProject: {
    id: 'week-04-project',
    title: 'Projeto: Galeria de Projetos Responsiva',
    description: 'Adicione uma galeria de projetos ao seu portfolio usando CSS Grid, que adapta perfeitamente de mobile (1 coluna) a desktop (3 colunas)',
    learningObjectives: [
      'Aplicar CSS Grid em projeto real',
      'Implementar design mobile-first',
      'Criar layout totalmente responsivo',
      'Usar grid-template-areas para organização',
    ],
    starterCode: `<!-- Adicione ao seu portfolio -->
<section class="projects-section">
  <h2>Meus Projetos</h2>
  <div class="projects-grid">
    <article class="project-card">
      <img src="projeto1.jpg" alt="Projeto 1">
      <h3>Nome do Projeto</h3>
      <p>Descrição breve</p>
      <a href="#">Ver Projeto</a>
    </article>
    <!-- Repita para 6 projetos -->
  </div>
</section>`,
    completionCriteria: [
      'Grid com 1 coluna no mobile',
      '2 colunas no tablet (768px+)',
      '3 colunas no desktop (1024px+)',
      'Gap consistente entre cards',
      'Imagens responsivas (width: 100%, height: auto)',
      'Hover effects nos cards'
    ],
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: 250,
    badgeId: 'grid-master',
  },
  
  preClassChecklist: {
    id: 'week-04-checklist',
    weekId: 'week-04-css-grid-responsive',
    items: [
      {
        id: 'read-grid-theory',
        description: 'Ler toda teoria sobre CSS Grid',
        type: 'content',
        estimatedMinutes: 40,
      },
      {
        id: 'read-responsive-theory',
        description: 'Ler teoria sobre Design Responsivo',
        type: 'content',
        estimatedMinutes: 30,
      },
      {
        id: 'play-grid-garden',
        description: 'Jogar Grid Garden (níveis 1-10)',
        type: 'content',
        estimatedMinutes: 20,
      },
      {
        id: 'attempt-grid-challenges',
        description: 'Tentar pelo menos 3 desafios de Grid',
        type: 'challenge',
        estimatedMinutes: 60,
      },
      {
        id: 'sketch-project',
        description: 'Esboçar layout da galeria (mobile e desktop)',
        type: 'project',
        estimatedMinutes: 15,
      },
      {
        id: 'prepare-grid-questions',
        description: 'Anotar dúvidas sobre Grid/Responsivo',
        type: 'content',
        estimatedMinutes: 10,
      },
    ],
  },
  
  liveClassTopics: [
    'Diferença entre Flexbox e Grid: quando usar cada um',
    'Grid Template Areas: truques e best practices',
    'Mobile-first vs Desktop-first: prós e contras',
    'Debugging de layouts Grid com DevTools',
    'Review dos projetos: feedback de designs responsivos',
    'Dicas profissionais: auto-fit, minmax e unidades responsivas'
  ],
  
  estimatedStudyHours: 6,
  difficulty: 'intermediate',
  tags: ['css', 'grid', 'responsive', 'layout', 'semana-4'],
  previousWeekId: 'week-03-flexbox',
  nextWeekId: 'week-05-javascript-intro',
};
