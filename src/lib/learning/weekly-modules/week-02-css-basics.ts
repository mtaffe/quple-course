import { WeeklyModule } from '@/types/weekly-modules';

export const week02CSSBasics: WeeklyModule = {
  id: 'week-02-css-basics',
  weekNumber: 2,
  title: 'CSS Básico: Dando Vida ao HTML',
  subtitle: 'Transforme estrutura em design com cores, tipografia e box model',
  description: 'Agora que você já sabe HTML, vamos aprender CSS para deixar seu site bonito! Nesta semana você vai dominar cores, fontes, espaçamentos e criar a seção "Sobre Mim" estilizada do seu portfolio.',
  
  learningObjectives: [
    'Conectar CSS ao HTML (inline, interno, externo)',
    'Dominar cores (hex, rgb, rgba) e aplicar paletas profissionais',
    'Trabalhar com tipografia (font-family, size, weight, line-height)',
    'Entender o Box Model (margin, padding, border)',
    'Estilizar a seção "Sobre Mim" do portfolio com design profissional'
  ],
  
  prerequisites: ['week-01-html-essentials'],
  
  theoryContent: {
    id: 'css-basics-theory',
    sections: [
      {
        id: 'css-intro',
        title: 'CSS: A Linguagem que Deixa Sites Bonitos',
        content: `# O que é CSS?

**CSS (Cascading Style Sheets)** é a linguagem que **estiliza** seu HTML. Se HTML é o esqueleto, CSS é a pele, roupa e maquiagem do site!

## Analogia do Mundo Real

Pensa num carro:
- 🏗️ **HTML** = Estrutura (chassis, motor, rodas)
- 🎨 **CSS** = Aparência (pintura, bancos de couro, adesivos)
- ⚡ **JavaScript** = Funcionalidades (air bag, sensor de ré)

## 3 Formas de Adicionar CSS

### 1️⃣ CSS Inline (não recomendado)
\`\`\`html
<h1 style="color: blue; font-size: 32px;">Título</h1>
\`\`\`
❌ **Problema**: Difícil de manter, repetitivo

### 2️⃣ CSS Interno
\`\`\`html
<head>
  <style>
    h1 {
      color: blue;
      font-size: 32px;
    }
  </style>
</head>
\`\`\`
✅ **Bom para**: Testes rápidos

### 3️⃣ CSS Externo (MELHOR!)
\`\`\`html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

\`\`\`css
/* styles.css */
h1 {
  color: blue;
  font-size: 32px;
}
\`\`\`
✅ **Profissional**: Organizado, reutilizável, fácil de manter`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Anatomia de uma regra CSS */
seletor {
  propriedade: valor;
}

/* Exemplo real */
h1 {
  color: #3b82f6;
  font-size: 2rem;
  font-weight: bold;
}`,
            explanation: 'Seletor define O QUE estilizar, propriedades definem COMO estilizar'
          }
        ]
      },
      {
        id: 'colors',
        title: 'Cores: Criando Paletas Profissionais',
        content: `# Trabalhando com Cores em CSS

Cores são ESSENCIAIS para o visual. Vamos aprender as formas de definir cores!

## Formatos de Cores

### 1️⃣ Nomes de Cores (limitado)
\`\`\`css
color: red;
background-color: blue;
\`\`\`
😕 Só 140 cores disponíveis

### 2️⃣ Hexadecimal - HEX (mais usado!)
\`\`\`css
color: #3b82f6;  /* Azul do Tailwind */
background: #1e293b; /* Cinza escuro */
\`\`\`
📝 **Formato**: #RRGGBB (Red, Green, Blue)

### 3️⃣ RGB / RGBA (com transparência)
\`\`\`css
color: rgb(59, 130, 246);
background: rgba(30, 41, 59, 0.8); /* 80% opaco */
\`\`\`
✨ **RGBA** = RGB + Alpha (transparência 0-1)

## 🎨 Criando Paletas Profissionais

### Dica de Ouro: Regra 60-30-10

- **60%** - Cor principal (fundo, grandes áreas)
- **30%** - Cor secundária (cards, seções)
- **10%** - Cor de destaque (botões, links, CTAs)

\`\`\`css
:root {
  --primary: #3b82f6;    /* Azul - 60% */
  --secondary: #1e293b;  /* Cinza - 30% */
  --accent: #f59e0b;     /* Laranja - 10% */
}
\`\`\`

## Sites para Paletas
- [Coolors.co](https://coolors.co) - Gerador de paletas
- [Adobe Color](https://color.adobe.com) - Roda de cores
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Paletas prontas`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Exemplo de paleta profissional */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent: #3b82f6;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.section {
  background: var(--bg-secondary);
}

button {
  background: var(--accent);
  color: white;
}`,
            explanation: 'CSS Variables deixam o código limpo e fácil de mudar temas'
          }
        ]
      },
      {
        id: 'typography',
        title: 'Tipografia: O Texto que Comunica',
        content: `# Tipografia Profissional

90% do conteúdo web é TEXTO. Tipografia boa = leitura confortável!

## Propriedades Essenciais

### 1️⃣ Font Family (Família de Fontes)
\`\`\`css
/* Web Safe Fonts (funcionam em qualquer navegador) */
font-family: Arial, sans-serif;
font-family: 'Times New Roman', serif;

/* Google Fonts (bonitas e grátis!) */
font-family: 'Inter', sans-serif;
font-family: 'Roboto', sans-serif;
\`\`\`

### 2️⃣ Font Size (Tamanho)
\`\`\`css
font-size: 16px;   /* Pixels - fixo */
font-size: 1rem;   /* Relativo ao root (melhor!) */
font-size: 1.5em;  /* Relativo ao pai */
\`\`\`

### 3️⃣ Font Weight (Peso)
\`\`\`css
font-weight: 400;  /* Normal */
font-weight: 700;  /* Bold */
font-weight: 900;  /* Extra Bold */
\`\`\`

### 4️⃣ Line Height (Altura da Linha)
\`\`\`css
line-height: 1.5;  /* 1.5x o tamanho da fonte */
line-height: 1.6;  /* Ideal para leitura */
\`\`\`

## 📏 Hierarquia Tipográfica

\`\`\`css
h1 { font-size: 2.5rem; font-weight: 700; }  /* 40px */
h2 { font-size: 2rem; font-weight: 600; }    /* 32px */
h3 { font-size: 1.5rem; font-weight: 600; }  /* 24px */
p  { font-size: 1rem; line-height: 1.6; }    /* 16px */
\`\`\`

## 🚀 Usando Google Fonts

1. Acesse [fonts.google.com](https://fonts.google.com)
2. Escolha uma fonte (ex: Inter)
3. Copie o link no \`<head>\`:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
\`\`\`

4. Use no CSS:
\`\`\`css
body {
  font-family: 'Inter', sans-serif;
}
\`\`\``,
        codeExamples: [
          {
            language: 'css',
            code: `/* Sistema tipográfico completo */
body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1e293b;
}

h1, h2, h3 {
  line-height: 1.2;
  font-weight: 700;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

p {
  margin-bottom: 1rem;
  color: #64748b;
}`,
            explanation: 'Tipografia consistente em todo o site'
          }
        ]
      },
      {
        id: 'box-model',
        title: 'Box Model: O Segredo do Espaçamento',
        content: `# Box Model: Tudo é uma Caixa!

No CSS, **TUDO é uma caixa retangular**. Entender isso muda tudo!

## 📦 As 4 Partes da Caixa

\`\`\`
┌─────────────────────────────┐
│        MARGIN (externo)      │
│  ┌─────────────────────────┐ │
│  │   BORDER (borda)        │ │
│  │  ┌─────────────────────┐│ │
│  │  │  PADDING (interno) ││ │
│  │  │  ┌───────────────┐ ││ │
│  │  │  │   CONTENT     │ ││ │
│  │  │  └───────────────┘ ││ │
│  │  └─────────────────────┘│ │
│  └─────────────────────────┘ │
└─────────────────────────────┘
\`\`\`

### 1️⃣ Content (Conteúdo)
O conteúdo real (texto, imagem)

### 2️⃣ Padding (Preenchimento)
Espaço INTERNO entre conteúdo e borda
\`\`\`css
padding: 20px;              /* Todos os lados */
padding: 10px 20px;         /* Vertical | Horizontal */
padding: 10px 20px 15px 5px; /* Top | Right | Bottom | Left */
\`\`\`

### 3️⃣ Border (Borda)
A linha ao redor do elemento
\`\`\`css
border: 2px solid #3b82f6;
border-radius: 8px; /* Bordas arredondadas */
\`\`\`

### 4️⃣ Margin (Margem)
Espaço EXTERNO entre elementos
\`\`\`css
margin: 20px;
margin-bottom: 2rem;
margin: 0 auto; /* Centraliza horizontalmente */
\`\`\`

## 🎯 Truque do Desenvolvedor

Use **DevTools do navegador** (F12) para visualizar o Box Model de qualquer elemento!

## ⚡ Box Sizing

\`\`\`css
/* SEMPRE use isso! */
* {
  box-sizing: border-box;
}
\`\`\`

Isso faz padding e border NÃO aumentarem o tamanho total. Muito melhor!`,
        codeExamples: [
          {
            language: 'css',
            code: `/* Box Model na prática */
.card {
  /* Conteúdo */
  width: 300px;
  height: 200px;
  
  /* Padding (espaço interno) */
  padding: 20px;
  
  /* Border */
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  
  /* Margin (espaço externo) */
  margin: 20px;
  
  /* Background */
  background: white;
}

/* Centralizar elemento */
.container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto; /* Centraliza! */
  padding: 0 20px;
}`,
            explanation: 'Box Model controlando layout e espaçamento'
          }
        ]
      }
    ]
  },
  
  resources: [
    {
      id: 'mdn-css-basics',
      type: 'reference',
      title: 'MDN: CSS Básico',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/CSS/First_steps',
      required: false
    },
    {
      id: 'google-fonts',
      type: 'interactive',
      title: 'Google Fonts',
      url: 'https://fonts.google.com',
      required: true
    }
  ],
  
  challenges: [
    {
      id: 'challenge-01-link-css',
      type: 'coding',
      title: 'Conecte CSS ao HTML',
      description: 'Crie um arquivo CSS externo e conecte ao seu HTML',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'step-1',
          title: 'Crie arquivo CSS',
          instruction: 'Crie um arquivo chamado "styles.css" e adicione uma regra básica',
          starterCode: '/* Seu CSS aqui */',
          hints: ['Crie uma regra para body com background-color'],
          validationCriteria: ['Arquivo styles.css existe', 'Contém pelo menos 1 regra CSS'],
          xpReward: 15
        },
        {
          id: 'step-2',
          title: 'Link no HTML',
          instruction: 'Use <link> para conectar o CSS ao HTML',
          hints: ['<link rel="stylesheet" href="styles.css">', 'Coloque dentro do <head>'],
          validationCriteria: ['Tag link presente', 'href aponta para styles.css'],
          xpReward: 20
        }
      ],
      totalXP: 35
    },
    {
      id: 'challenge-02-color-palette',
      type: 'coding',
      title: 'Crie uma Paleta de Cores',
      description: 'Defina CSS variables para uma paleta profissional',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'step-1',
          title: 'CSS Variables',
          instruction: 'Crie 5 variáveis de cor em :root (primary, secondary, accent, text, background)',
          starterCode: ':root {\n  /* Suas cores aqui */\n}',
          hints: [
            'Use --nome-variavel: valor;',
            'Escolha cores complementares',
            'Use hex ou rgb'
          ],
          validationCriteria: ['5 CSS variables definidas', 'Cores válidas'],
          xpReward: 25
        },
        {
          id: 'step-2',
          title: 'Aplicar cores',
          instruction: 'Use var(--nome) para aplicar as cores no body e headings',
          hints: ['background: var(--background);', 'color: var(--text);'],
          validationCriteria: ['Variáveis aplicadas', 'Visual coerente'],
          xpReward: 20
        }
      ],
      totalXP: 45
    },
    {
      id: 'challenge-03-typography',
      type: 'coding',
      title: 'Sistema Tipográfico',
      description: 'Configure Google Fonts e hierarquia de títulos',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'step-1',
          title: 'Google Fonts',
          instruction: 'Adicione uma Google Font (Inter, Roboto ou Poppins) ao projeto',
          hints: [
            'Acesse fonts.google.com',
            'Copie o <link> para o <head>',
            'Aplique no body'
          ],
          validationCriteria: ['Google Font carregada', 'font-family aplicada'],
          xpReward: 20
        },
        {
          id: 'step-2',
          title: 'Hierarquia',
          instruction: 'Defina tamanhos progressivos para h1, h2, h3 e p',
          hints: [
            'h1: 2.5rem, h2: 2rem, h3: 1.5rem',
            'Use font-weight para diferenciar',
            'line-height: 1.6 para parágrafos'
          ],
          validationCriteria: ['Tamanhos progressivos', 'Hierarquia clara'],
          xpReward: 25
        }
      ],
      totalXP: 45
    },
    {
      id: 'challenge-04-box-model',
      type: 'coding',
      title: 'Dominar Box Model',
      description: 'Crie cards com padding, border e margin corretos',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'step-1',
          title: 'Box sizing',
          instruction: 'Adicione box-sizing: border-box para todos os elementos',
          starterCode: '* {\n  /* Seu código */\n}',
          hints: ['Use * { box-sizing: border-box; }'],
          validationCriteria: ['box-sizing aplicado globalmente'],
          xpReward: 15
        },
        {
          id: 'step-2',
          title: 'Criar card',
          instruction: 'Crie uma classe .card com padding 20px, border 1px, border-radius 8px, margin 20px',
          hints: [
            'padding: 20px;',
            'border: 1px solid #ddd;',
            'margin: 20px;'
          ],
          validationCriteria: ['Card com espaçamentos corretos', 'Bordas arredondadas'],
          xpReward: 30
        }
      ],
      totalXP: 45
    },
    {
      id: 'challenge-05-responsive-text',
      type: 'coding',
      title: 'Texto Responsivo',
      description: 'Use unidades relativas (rem, em) para tipografia fluida',
      difficulty: 'intermediate',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'step-1',
          title: 'Converter px para rem',
          instruction: 'Converta todos os font-size de px para rem',
          hints: [
            '16px = 1rem',
            '32px = 2rem',
            'Use calc() se necessário'
          ],
          validationCriteria: ['Todos tamanhos em rem', 'Proporções mantidas'],
          xpReward: 30
        }
      ],
      totalXP: 30
    }
  ],
  
  weeklyProject: {
    id: 'project-week-02',
    title: 'Seção "Sobre Mim" Estilizada',
    description: 'Transforme a seção "Sobre Mim" criada na semana 1 em um design profissional usando CSS. Aplique paleta de cores, tipografia Google Fonts, e espaçamentos com Box Model.',
    learningObjectives: [
      'Aplicar paleta de cores profissional com CSS variables',
      'Integrar Google Fonts para tipografia moderna',
      'Usar Box Model para espaçamentos harmoniosos',
      'Criar design responsivo com unidades relativas'
    ],
    completionCriteria: [
      'CSS externo conectado ao HTML',
      'Paleta de cores com CSS variables (mínimo 4 cores)',
      'Google Font aplicada em todo o texto',
      'Hierarquia tipográfica clara (h1, h2, p com tamanhos diferentes)',
      'Box Model aplicado (padding, margin, border) em cards ou seções',
      'Bordas arredondadas (border-radius) em pelo menos 3 elementos',
      'Código CSS organizado e comentado'
    ],
    portfolioPiece: true,
    estimatedHours: 4,
    xpReward: 250,
    badgeId: 'css-designer',
    starterCode: `/* styles.css */

/* === CSS VARIABLES (Paleta) === */
:root {
  /* Suas cores aqui */
}

/* === RESET & BASE === */
* {
  box-sizing: border-box;
}

/* === TIPOGRAFIA === */
/* Configure Google Fonts aqui */

/* === COMPONENTES === */
/* Seus estilos aqui */`
  },
  
  preClassChecklist: {
    id: 'checklist-week-02',
    weekId: 'week-02-css-basics',
    items: [
      {
        id: 'theory-complete',
        description: 'Ler conteúdo sobre cores, tipografia e box model',
        type: 'content',
        estimatedMinutes: 70
      },
      {
        id: 'google-fonts-explore',
        description: 'Explorar Google Fonts e escolher 1 fonte para o projeto',
        type: 'content',
        estimatedMinutes: 15
      },
      {
        id: 'challenges-complete',
        description: 'Completar os 5 desafios CSS',
        type: 'challenge',
        estimatedMinutes: 105
      },
      {
        id: 'project-started',
        description: 'Iniciar estilização da seção "Sobre Mim"',
        type: 'project',
        estimatedMinutes: 120
      }
    ]
  },
  
  liveClassTopics: [
    'Demo ao vivo: Construindo uma paleta de cores do zero',
    'Code review: Comparar diferentes abordagens de box model',
    'Discussão: Como escolher fontes que combinam?',
    'Debugging: Resolver problemas comuns de espaçamento',
    'Projeto colaborativo: Estilizar uma seção juntos',
    'Q&A sobre CSS variables e boas práticas'
  ],
  
  estimatedStudyHours: 7,
  difficulty: 'beginner',
  tags: ['CSS', 'Design', 'Cores', 'Tipografia', 'Box Model', 'Portfolio'],
  previousWeekId: 'week-01-html-essentials',
  nextWeekId: 'week-03-flexbox'
};
