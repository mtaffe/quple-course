import { WeeklyModule } from '@/types/weekly-modules';

export const week03Flexbox: WeeklyModule = {
  id: 'week-03-flexbox',
  weekNumber: 3,
  title: 'Flexbox: Layouts Modernos Simplificados',
  subtitle: 'Domine a ferramenta mais usada para criar layouts profissionais',
  description: 'Flexbox revolucionou CSS! Aprenda a criar navbars, grids de cards e layouts complexos com poucas linhas de código. Nesta semana você vai construir a grid de habilidades do seu portfolio.',
  
  learningObjectives: [
    'Entender como Flexbox funciona (main axis vs cross axis)',
    'Dominar justify-content, align-items e flex-direction',
    'Criar navbars responsivas com Flexbox',
    'Construir grids de cards flexíveis',
    'Aplicar Flexbox no portfolio (skills grid)'
  ],
  
  prerequisites: ['week-02-css-basics'],
  
  theoryContent: {
    id: 'flexbox-theory',
    sections: [
      {
        id: 'flexbox-intro',
        title: 'Flexbox: O Fim dos Problemas de Layout',
        content: `# Por Que Flexbox Mudou Tudo?

Antes do Flexbox, centralizar elementos era um PESADELO. Hoje é uma linha de código!

## ❌ Jeito Antigo (Float Hell)
\`\`\`css
.container {
  overflow: hidden;
}
.item {
  float: left;
  width: 33.33%;
}
/* E reze pra funcionar... 😅 */
\`\`\`

## ✅ Jeito Moderno (Flexbox)
\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
}
/* Pronto! 🎉 */
\`\`\`

## O que é Flexbox?

**Flexbox** é um sistema de layout que distribui espaço entre elementos de forma flexível e responsiva.

### Conceito Chave: Container + Items

\`\`\`html
<div class="flex-container">  <!-- Pai -->
  <div class="item">1</div>    <!-- Filho -->
  <div class="item">2</div>    <!-- Filho -->
  <div class="item">3</div>    <!-- Filho -->
</div>
\`\`\`

\`\`\`css
.flex-container {
  display: flex; /* Ativa Flexbox! */
}
\`\`\`

## 🎯 Quando Usar Flexbox?

✅ **Perfeito para:**
- Navbars (logo à esquerda, menu à direita)
- Grids de cards (produtos, portfólio)
- Centralizar elementos (vertical/horizontal)
- Footers com espaçamento automático
- Layouts de 1 dimensão (linha OU coluna)

❌ **Não ideal para:**
- Layouts de 2 dimensões complexos (use Grid)
- Páginas inteiras (combine com Grid)`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Exemplo básico de Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

/* Resultado: Navbar tipo Instagram/Twitter */`,
            explanation: 'Flexbox cria navbar profissional com 6 linhas de código!'
          }
        ]
      },
      {
        id: 'main-axis',
        title: 'Os 2 Eixos do Flexbox',
        content: `# Entendendo Main Axis vs Cross Axis

O segredo do Flexbox está em entender os **2 eixos**!

## 📏 Main Axis (Eixo Principal)

Por padrão, é **HORIZONTAL** (esquerda → direita)

\`\`\`css
.container {
  display: flex;
  flex-direction: row; /* Padrão */
}
\`\`\`

\`\`\`
Main Axis →
┌──────────────────────────┐
│ [1] [2] [3]              │
└──────────────────────────┘
\`\`\`

## ⬆️ Cross Axis (Eixo Transversal)

Perpendicular ao Main Axis (se main é horizontal, cross é **VERTICAL**)

\`\`\`
        ↑ Cross Axis
┌──────────────────────────┐
│ [1] [2] [3]              │
└──────────────────────────┘
        ↓
\`\`\`

## 🔄 Mudando a Direção

\`\`\`css
.container {
  display: flex;
  flex-direction: column; /* Agora Main Axis é VERTICAL! */
}
\`\`\`

\`\`\`
Main Axis
    ↓
┌─────┐
│ [1] │
│ [2] │
│ [3] │
└─────┘
← Cross Axis
\`\`\`

## 🎯 Propriedades dos Eixos

### Main Axis (justify-content)
- \`flex-start\` - Início (padrão)
- \`flex-end\` - Fim
- \`center\` - Centro
- \`space-between\` - Espaço entre items
- \`space-around\` - Espaço ao redor
- \`space-evenly\` - Espaço uniforme

### Cross Axis (align-items)
- \`stretch\` - Estica (padrão)
- \`flex-start\` - Início
- \`flex-end\` - Fim
- \`center\` - Centro
- \`baseline\` - Linha de base do texto`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Centralizar perfeito (vertical + horizontal) */
.container {
  display: flex;
  justify-content: center;  /* Main Axis - horizontal */
  align-items: center;      /* Cross Axis - vertical */
  height: 100vh;
}

/* Navbar clássica */
.navbar {
  display: flex;
  justify-content: space-between; /* Logo ←→ Menu */
  align-items: center;            /* Alinha verticalmente */
}

/* Grid de 3 colunas iguais */
.grid {
  display: flex;
  justify-content: space-evenly; /* Espaço igual entre todos */
}`,
            explanation: 'Main vs Cross é a chave para dominar Flexbox!'
          }
        ]
      },
      {
        id: 'flex-properties',
        title: 'Propriedades Flex Avançadas',
        content: `# Controlando Items Flex

Além do container, os **items** também têm propriedades!

## flex-grow (Crescer)

Quanto o item pode **crescer** se houver espaço extra?

\`\`\`css
.item-1 { flex-grow: 1; } /* Cresce 1x */
.item-2 { flex-grow: 2; } /* Cresce 2x (o dobro!) */
\`\`\`

\`\`\`
┌──────────────────────────────────┐
│ [Item 1] [Item 2.............. ] │
│  grow: 1   grow: 2               │
└──────────────────────────────────┘
\`\`\`

## flex-shrink (Encolher)

Quanto o item pode **encolher** se faltar espaço?

\`\`\`css
.item { flex-shrink: 1; } /* Encolhe se necessário (padrão) */
.item-fixed { flex-shrink: 0; } /* NUNCA encolhe */
\`\`\`

## flex-basis (Tamanho Base)

Tamanho inicial antes de distribuir espaço

\`\`\`css
.item {
  flex-basis: 200px; /* Começa com 200px */
}
\`\`\`

## 🎯 Atalho: flex

\`\`\`css
/* Forma longa */
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

/* Atalho (MELHOR!) */
.item {
  flex: 1 1 0; /* grow shrink basis */
}

/* Padrões úteis */
.item { flex: 1; }      /* Distribui espaço igualmente */
.item { flex: 0 0 auto; } /* Tamanho fixo baseado no conteúdo */
\`\`\`

## gap (Espaçamento)

Espaço entre items (MUITO ÚTIL!)

\`\`\`css
.container {
  display: flex;
  gap: 1rem; /* 16px entre todos os items */
}

/* Gap diferente vertical/horizontal */
.container {
  display: flex;
  gap: 1rem 2rem; /* row-gap | column-gap */
}
\`\`\``,
        codeExamples: [
          {
            language: 'css',
            code: `/* Grid responsivo de cards */
.card-grid {
  display: flex;
  flex-wrap: wrap; /* Quebra linha se necessário */
  gap: 2rem;
}

.card {
  flex: 1 1 300px; /* Cresce, encolhe, base 300px */
  min-width: 250px;
}

/* Sidebar + Conteúdo */
.layout {
  display: flex;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 250px; /* Fixo em 250px */
}

.content {
  flex: 1; /* Ocupa espaço restante */
}`,
            explanation: 'flex property controla como items se adaptam ao espaço disponível'
          }
        ]
      },
      {
        id: 'real-world-layouts',
        title: 'Layouts Reais com Flexbox',
        content: `# Padrões Que Você Vai Usar Sempre

Aprenda esses 5 padrões e você resolve 90% dos layouts!

## 1️⃣ Navbar Clássica

\`\`\`html
<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li>Home</li>
    <li>Sobre</li>
    <li>Contato</li>
  </ul>
</nav>
\`\`\`

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
\`\`\`

## 2️⃣ Grid de Cards (3 colunas)

\`\`\`css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.card {
  flex: 1 1 calc(33.333% - 2rem);
  min-width: 250px;
}
\`\`\`

## 3️⃣ Centralizar Conteúdo

\`\`\`css
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
\`\`\`

## 4️⃣ Footer com Social Links

\`\`\`css
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 1rem;
}
\`\`\`

## 5️⃣ Sidebar + Conteúdo

\`\`\`css
.layout {
  display: flex;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 250px;
}

.main-content {
  flex: 1;
}
\`\`\``,
        codeExamples: [
          {
            language: 'html',
            code: `<!-- Navbar Profissional Completa -->
<nav class="navbar">
  <h1 class="logo">MeuSite</h1>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#sobre">Sobre</a></li>
    <li><a href="#projetos">Projetos</a></li>
    <li><a href="#contato">Contato</a></li>
  </ul>
  <button class="cta">Login</button>
</nav>`,
            explanation: 'Navbar tipo Instagram/LinkedIn com Flexbox'
          }
        ]
      }
    ]
  },
  
  resources: [
    {
      id: 'flexbox-froggy',
      type: 'interactive',
      title: 'Flexbox Froggy - Jogo para aprender Flexbox',
      url: 'https://flexboxfroggy.com/#pt-br',
      duration: 30,
      required: true
    },
    {
      id: 'css-tricks-flexbox',
      type: 'reference',
      title: 'CSS Tricks: Complete Guide to Flexbox',
      url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      required: false
    }
  ],
  
  challenges: [
    {
      id: 'challenge-01-flexbox-basics',
      type: 'coding',
      title: 'Primeiro Flexbox',
      description: 'Crie um container flex básico com 3 items',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'step-1',
          title: 'Ativar Flexbox',
          instruction: 'Crie um container com display: flex',
          starterCode: '.container {\n  /* Seu código */\n}',
          hints: ['display: flex;'],
          validationCriteria: ['display: flex aplicado'],
          xpReward: 20
        },
        {
          id: 'step-2',
          title: 'Distribuir items',
          instruction: 'Use justify-content: space-between para distribuir os 3 items',
          hints: ['justify-content controla o Main Axis'],
          validationCriteria: ['space-between aplicado', 'Items distribuídos'],
          xpReward: 25
        }
      ],
      totalXP: 45
    },
    {
      id: 'challenge-02-center-perfect',
      type: 'coding',
      title: 'Centralização Perfeita',
      description: 'Centralize um elemento vertical e horizontalmente',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      steps: [
        {
          id: 'step-1',
          title: 'Centro absoluto',
          instruction: 'Use Flexbox para centralizar vertical E horizontalmente',
          hints: [
            'justify-content: center (horizontal)',
            'align-items: center (vertical)',
            'Dê height: 100vh ao container'
          ],
          validationCriteria: ['Elemento perfeitamente centralizado'],
          xpReward: 30
        }
      ],
      totalXP: 30
    },
    {
      id: 'challenge-03-navbar',
      type: 'build',
      title: 'Navbar Profissional',
      description: 'Construa uma navbar com logo à esquerda e menu à direita',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'step-1',
          title: 'Estrutura da navbar',
          instruction: 'Crie navbar com justify-content: space-between',
          hints: ['Logo e nav-links como filhos diretos', 'align-items: center'],
          validationCriteria: ['Logo à esquerda', 'Menu à direita', 'Alinhado verticalmente'],
          xpReward: 25
        },
        {
          id: 'step-2',
          title: 'Menu horizontal',
          instruction: 'Use Flexbox para deixar os links do menu lado a lado com gap',
          hints: ['display: flex no <ul>', 'gap: 2rem', 'list-style: none'],
          validationCriteria: ['Links horizontais', 'Espaçamento entre links'],
          xpReward: 25
        }
      ],
      totalXP: 50
    },
    {
      id: 'challenge-04-cards-grid',
      type: 'build',
      title: 'Grid de Cards Responsivo',
      description: 'Crie grid de 3 colunas que se adapta ao espaço',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [
        {
          id: 'step-1',
          title: 'Container flex',
          instruction: 'Crie container com flex-wrap: wrap e gap',
          hints: ['flex-wrap permite quebra de linha', 'gap: 2rem'],
          validationCriteria: ['flex-wrap ativo', 'gap entre items'],
          xpReward: 20
        },
        {
          id: 'step-2',
          title: 'Cards flexíveis',
          instruction: 'Configure cards com flex: 1 1 calc(33.333% - 2rem)',
          hints: [
            'flex: 1 1 calc(33.333% - ajuste do gap)',
            'min-width: 250px para mobile'
          ],
          validationCriteria: ['3 colunas em desktop', 'Responsivo'],
          xpReward: 35
        }
      ],
      totalXP: 55
    },
    {
      id: 'challenge-05-footer',
      type: 'build',
      title: 'Footer com Social Links',
      description: 'Crie footer com copyright à esquerda e ícones sociais à direita',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'step-1',
          title: 'Layout do footer',
          instruction: 'Use Flexbox para distribuir conteúdo do footer',
          hints: [
            'justify-content: space-between',
            'align-items: center',
            'padding adequado'
          ],
          validationCriteria: ['Copyright à esquerda', 'Social à direita'],
          xpReward: 25
        },
        {
          id: 'step-2',
          title: 'Ícones sociais',
          instruction: 'Links sociais em linha com gap entre eles',
          hints: ['display: flex', 'gap: 1rem'],
          validationCriteria: ['Ícones horizontais', 'Espaçamento uniforme'],
          xpReward: 20
        }
      ],
      totalXP: 45
    }
  ],
  
  weeklyProject: {
    id: 'project-week-03',
    title: 'Skills Grid com Flexbox',
    description: 'Crie a seção de habilidades do seu portfolio usando Flexbox. Mostre suas skills (HTML, CSS, JavaScript, etc.) em cards organizados em grid flexível que se adapta a qualquer tela.',
    learningObjectives: [
      'Aplicar Flexbox para criar layouts complexos',
      'Construir grid responsivo sem media queries',
      'Usar flex-wrap para quebra automática',
      'Combinar Flexbox com design visual'
    ],
    completionCriteria: [
      'Seção com título "Minhas Habilidades"',
      'Grid de pelo menos 6 skill cards',
      'Cards com ícone/emoji + nome da skill + nível',
      'Layout em 3 colunas (desktop) e 1-2 colunas (mobile)',
      'Uso de flex-wrap para responsividade',
      'gap entre cards',
      'Cards visuais (border, padding, shadow, hover effect)'
    ],
    portfolioPiece: true,
    estimatedHours: 4,
    xpReward: 300,
    badgeId: 'flexbox-master',
    figmaDesign: 'https://www.figma.com/design-example',
    starterCode: `<!-- HTML Structure -->
<section class="skills">
  <h2>Minhas Habilidades</h2>
  <div class="skills-grid">
    <div class="skill-card">
      <span class="skill-icon">📝</span>
      <h3>HTML</h3>
      <p>Intermediário</p>
    </div>
    <!-- Adicione mais 5 skills -->
  </div>
</section>

/* CSS Starter */
.skills-grid {
  display: flex;
  /* Complete com Flexbox */
}`
  },
  
  preClassChecklist: {
    id: 'checklist-week-03',
    weekId: 'week-03-flexbox',
    items: [
      {
        id: 'theory-complete',
        description: 'Ler teoria sobre Main Axis, Cross Axis e propriedades Flex',
        type: 'content',
        estimatedMinutes: 80
      },
      {
        id: 'flexbox-froggy',
        description: 'Completar Flexbox Froggy (jogo interativo)',
        type: 'content',
        estimatedMinutes: 30
      },
      {
        id: 'challenges-complete',
        description: 'Completar os 5 desafios de Flexbox',
        type: 'challenge',
        estimatedMinutes: 100
      },
      {
        id: 'project-started',
        description: 'Iniciar grid de habilidades do portfolio',
        type: 'project',
        estimatedMinutes: 120
      }
    ]
  },
  
  liveClassTopics: [
    'Demo ao vivo: Main Axis vs Cross Axis com visualização',
    'Code review: Analisar diferentes soluções de navbar',
    'Debugging: Resolver problemas comuns de Flexbox',
    'Projeto: Construir card grid responsivo juntos',
    'Discussão: Flexbox vs Grid - quando usar cada um?',
    'Q&A sobre flex-grow, flex-shrink e flex-basis'
  ],
  
  estimatedStudyHours: 7,
  difficulty: 'intermediate',
  tags: ['CSS', 'Flexbox', 'Layout', 'Responsive', 'Portfolio'],
  previousWeekId: 'week-02-css-basics',
  nextWeekId: 'week-04-css-grid'
};
