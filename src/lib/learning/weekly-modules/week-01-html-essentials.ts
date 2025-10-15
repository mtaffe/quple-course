import { WeeklyModule } from '@/types/weekly-modules';

export const week01HTMLEssentials: WeeklyModule = {
  id: 'week-01-html-essentials',
  weekNumber: 1,
  title: 'HTML Essencial: A Estrutura da Web',
  subtitle: 'Construa a base do seu portfolio com HTML semântico',
  description: 'Nesta primeira semana, você vai aprender os fundamentos do HTML e criar a estrutura do seu portfolio pessoal. Vamos focar em HTML semântico, acessibilidade e boas práticas desde o início.',
  
  learningObjectives: [
    'Entender a estrutura básica de um documento HTML',
    'Usar tags semânticas corretas (header, nav, main, section, footer)',
    'Criar links, imagens e listas de forma profissional',
    'Aplicar boas práticas de acessibilidade desde o início',
    'Construir o header e navegação do seu portfolio'
  ],
  
  prerequisites: [],
  
  theoryContent: {
    id: 'html-essentials-theory',
    sections: [
      {
        id: 'html-intro',
        title: 'O que é HTML? A Linguagem que Estrutura a Internet',
        content: `# O que é HTML?

HTML (HyperText Markup Language) é a linguagem que estrutura TUDO que você vê na web. Pensa no HTML como o esqueleto de um site - ele define onde fica cada elemento, como títulos, parágrafos, imagens e botões.

## Por que HTML é importante?

Imagine construir uma casa. Você não começa pintando as paredes ou escolhendo móveis, certo? Você começa com a estrutura: paredes, portas, janelas. O HTML é exatamente isso para sites!

🏗️ **HTML** = Estrutura (onde ficam as coisas)
🎨 **CSS** = Aparência (cores, fontes, layout)
⚡ **JavaScript** = Comportamento (interações, animações)

## A Anatomia de uma Tag HTML

\`\`\`html
<tagname>Conteúdo aqui</tagname>
\`\`\`

- **Tag de abertura**: \`<tagname>\`
- **Conteúdo**: O que fica entre as tags
- **Tag de fechamento**: \`</tagname>\`

Algumas tags são "auto-fechantes" (não precisam de fechamento):
\`\`\`html
<img src="foto.jpg" alt="Minha foto">
<br>
<hr>
\`\`\``,
        codeExamples: [
          {
            language: 'html',
            code: `<!-- Exemplo de estrutura básica -->
<h1>Meu Primeiro Site</h1>
<p>Este é um parágrafo explicando algo interessante.</p>
<img src="imagem.jpg" alt="Descrição da imagem">`,
            explanation: 'h1 = título principal, p = parágrafo, img = imagem'
          }
        ]
      },
      {
        id: 'html-structure',
        title: 'Estrutura de um Documento HTML',
        content: `# Estrutura Básica de Todo Site HTML

Todo site HTML começa com essa estrutura fundamental:

\`\`\`html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Portfolio</title>
</head>
<body>
    <!-- Seu conteúdo visível aqui -->
</body>
</html>
\`\`\`

## Entendendo Cada Parte:

### \`<!DOCTYPE html>\`
Diz ao navegador: "Ei, isso é HTML5 moderno!"

### \`<html lang="pt-BR">\`
O contêiner de TUDO. O atributo \`lang\` ajuda leitores de tela e SEO.

### \`<head>\`
Informações SOBRE a página (não aparecem na tela):
- Título da aba do navegador
- Codificação de caracteres
- Links para CSS
- Metadados para SEO

### \`<body>\`
TODO o conteúdo visível do site vai aqui!`,
        codeExamples: [
          {
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>João Silva - Desenvolvedor Frontend</title>
    <meta name="description" content="Portfolio de João Silva, desenvolvedor web apaixonado por criar experiências incríveis.">
</head>
<body>
    <h1>Olá, eu sou o João! 👋</h1>
    <p>Desenvolvedor web em formação.</p>
</body>
</html>`,
            explanation: 'Estrutura completa de um documento HTML profissional'
          }
        ]
      },
      {
        id: 'semantic-html',
        title: 'HTML Semântico: Dando Significado ao Código',
        content: `# HTML Semântico: Código que Faz Sentido

**HTML Semântico** significa usar tags que descrevem o SIGNIFICADO do conteúdo, não apenas sua aparência.

## ❌ Jeito Antigo (Não Semântico):
\`\`\`html
<div class="header">
    <div class="nav">...</div>
</div>
<div class="main-content">...</div>
<div class="footer">...</div>
\`\`\`

## ✅ Jeito Moderno (Semântico):
\`\`\`html
<header>
    <nav>...</nav>
</header>
<main>...</main>
<footer>...</footer>
\`\`\`

## Por que isso importa?

1. **Acessibilidade**: Leitores de tela sabem o que é cada parte
2. **SEO**: Google entende melhor seu conteúdo
3. **Manutenção**: Fica mais fácil para outros devs (e você no futuro!) entenderem
4. **Profissionalismo**: É assim que devs experientes fazem

## Tags Semânticas Principais:

- \`<header>\`: Cabeçalho do site ou seção
- \`<nav>\`: Menu de navegação
- \`<main>\`: Conteúdo principal único da página
- \`<section>\`: Seção temática do conteúdo
- \`<article>\`: Conteúdo independente (post, produto)
- \`<aside>\`: Conteúdo relacionado lateral (sidebar)
- \`<footer>\`: Rodapé do site ou seção`,
        codeExamples: [
          {
            language: 'html',
            code: `<!-- Portfolio com HTML Semântico -->
<header>
    <h1>Maria Santos</h1>
    <nav>
        <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#projetos">Projetos</a></li>
            <li><a href="#contato">Contato</a></li>
        </ul>
    </nav>
</header>

<main>
    <section id="sobre">
        <h2>Sobre Mim</h2>
        <p>Sou uma desenvolvedora frontend...</p>
    </section>
    
    <section id="projetos">
        <h2>Meus Projetos</h2>
        <!-- projetos aqui -->
    </section>
</main>

<footer>
    <p>&copy; 2025 Maria Santos</p>
</footer>`,
            explanation: 'Estrutura semântica completa de um portfolio'
          }
        ]
      },
      {
        id: 'accessibility-basics',
        title: 'Acessibilidade: Construindo para Todos',
        content: `# Acessibilidade desde o Dia 1

Acessibilidade não é "extra" - é ESSENCIAL. Vamos construir pensando em TODAS as pessoas desde o início.

## Regras de Ouro:

### 1. Sempre use atributo \`alt\` em imagens
\`\`\`html
<!-- ❌ Ruim -->
<img src="foto.jpg">

<!-- ✅ Bom -->
<img src="foto.jpg" alt="João sorrindo em frente ao computador">
\`\`\`

### 2. Use headings na ordem certa (h1 → h2 → h3)
\`\`\`html
<!-- ❌ Ruim -->
<h1>Título Principal</h1>
<h3>Subtítulo</h3>  <!-- Pulou o h2! -->

<!-- ✅ Bom -->
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Sub-subtítulo</h3>
\`\`\`

### 3. Links descritivos (não "clique aqui")
\`\`\`html
<!-- ❌ Ruim -->
<a href="projeto.html">Clique aqui</a>

<!-- ✅ Bom -->
<a href="projeto.html">Ver meu projeto de calculadora</a>
\`\`\`

### 4. Use labels em formulários
\`\`\`html
<label for="nome">Seu nome:</label>
<input type="text" id="nome" name="nome">
\`\`\`

## Por que isso importa?

- 15% da população mundial tem alguma deficiência
- Leitores de tela dependem de HTML bem estruturado
- Código acessível = código de qualidade`,
        codeExamples: [
          {
            language: 'html',
            code: `<!-- Formulário 100% Acessível -->
<form>
    <div>
        <label for="email">E-mail:</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            required
            aria-describedby="email-help"
        >
        <small id="email-help">Nunca compartilharemos seu e-mail.</small>
    </div>
    
    <button type="submit">Enviar mensagem</button>
</form>`,
            explanation: 'Formulário com labels, ARIA e feedback claro'
          }
        ]
      }
    ]
  },
  
  resources: [
    {
      id: 'mdn-html-basics',
      type: 'reference',
      title: 'MDN: Introdução ao HTML',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Introduction_to_HTML',
      required: false
    },
    {
      id: 'html-semantic-guide',
      type: 'reading',
      title: 'Guia Completo de HTML Semântico',
      url: 'https://web.dev/learn/html/semantic-html/',
      duration: 15,
      required: true
    }
  ],
  
  challenges: [
    {
      id: 'challenge-01-basic-structure',
      type: 'coding',
      title: 'Crie sua Primeira Página HTML',
      description: 'Crie a estrutura básica de um documento HTML válido',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      steps: [
        {
          id: 'step-1',
          title: 'Estrutura DOCTYPE e HTML',
          instruction: 'Adicione a declaração DOCTYPE e a tag html com idioma português',
          starterCode: '',
          hints: [
            'Use <!DOCTYPE html> no início',
            'A tag html deve ter o atributo lang="pt-BR"'
          ],
          validationCriteria: ['Contém <!DOCTYPE html>', 'Tag html com lang="pt-BR"'],
          xpReward: 10
        },
        {
          id: 'step-2',
          title: 'Adicione Head e Body',
          instruction: 'Complete com as tags head e body corretamente',
          hints: [
            'Head vem antes do body',
            'Adicione charset UTF-8 no head'
          ],
          validationCriteria: ['Contém tag head', 'Contém tag body', 'Meta charset presente'],
          xpReward: 15
        }
      ],
      totalXP: 25
    },
    {
      id: 'challenge-02-semantic-header',
      type: 'coding',
      title: 'Header Semântico',
      description: 'Construa um header semântico com navegação',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'step-1',
          title: 'Crie a estrutura do header',
          instruction: 'Use a tag <header> e adicione seu nome em um <h1>',
          starterCode: '<body>\n  <!-- Seu código aqui -->\n</body>',
          hints: ['Use <header> para o cabeçalho', 'h1 deve ter seu nome'],
          validationCriteria: ['Contém tag header', 'h1 dentro do header'],
          xpReward: 15
        },
        {
          id: 'step-2',
          title: 'Adicione navegação',
          instruction: 'Crie um menu <nav> com 3 links: Sobre, Projetos, Contato',
          hints: [
            'Use <nav> dentro do header',
            'Liste os links em <ul> e <li>',
            'Use href="#secao" para criar âncoras'
          ],
          validationCriteria: ['Contém tag nav', 'Lista com 3 itens', 'Links com href'],
          xpReward: 20
        }
      ],
      totalXP: 35
    },
    {
      id: 'challenge-03-about-section',
      type: 'coding',
      title: 'Seção "Sobre Mim"',
      description: 'Crie uma seção sobre você com HTML semântico',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'step-1',
          title: 'Estrutura da seção',
          instruction: 'Crie uma <section> com id="sobre" e um título <h2>',
          starterCode: '<main>\n  <!-- Seu código aqui -->\n</main>',
          hints: ['Use <section id="sobre">', 'h2 com texto "Sobre Mim"'],
          validationCriteria: ['Section com id="sobre"', 'h2 presente'],
          xpReward: 10
        },
        {
          id: 'step-2',
          title: 'Adicione sua bio',
          instruction: 'Escreva 2 parágrafos sobre você e suas habilidades',
          hints: ['Use <p> para cada parágrafo', 'Seja autêntico!'],
          validationCriteria: ['Pelo menos 2 parágrafos', 'Mínimo 20 palavras'],
          xpReward: 15
        },
        {
          id: 'step-3',
          title: 'Adicione uma imagem',
          instruction: 'Insira uma foto sua com alt text descritivo',
          hints: [
            'Use <img src="..." alt="...">',
            'Alt deve descrever a imagem claramente'
          ],
          validationCriteria: ['Tag img presente', 'Atributo alt preenchido'],
          xpReward: 15
        }
      ],
      totalXP: 40
    },
    {
      id: 'challenge-04-skills-list',
      type: 'coding',
      title: 'Lista de Habilidades',
      description: 'Crie uma lista de suas habilidades técnicas',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'step-1',
          title: 'Lista não ordenada de skills',
          instruction: 'Crie uma <ul> com pelo menos 5 habilidades que você quer aprender',
          hints: ['Use <ul> e <li>', 'Exemplos: HTML, CSS, JavaScript, React, Git'],
          validationCriteria: ['Lista não ordenada', 'Mínimo 5 itens'],
          xpReward: 20
        }
      ],
      totalXP: 20
    },
    {
      id: 'challenge-05-footer',
      type: 'coding',
      title: 'Rodapé com Links Sociais',
      description: 'Crie um footer com copyright e links para redes sociais',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'step-1',
          title: 'Estrutura do footer',
          instruction: 'Crie <footer> com texto de copyright (use &copy; para ©)',
          hints: ['&copy; 2025 Seu Nome', 'Use <p> para o texto'],
          validationCriteria: ['Tag footer', 'Símbolo de copyright'],
          xpReward: 10
        },
        {
          id: 'step-2',
          title: 'Links sociais',
          instruction: 'Adicione 3 links: GitHub, LinkedIn, Email',
          hints: [
            'Use <a href="..." target="_blank">',
            'Para email: mailto:seu@email.com'
          ],
          validationCriteria: ['3 links presentes', 'Atributo target="_blank"'],
          xpReward: 15
        }
      ],
      totalXP: 25
    }
  ],
  
  weeklyProject: {
    id: 'project-week-01',
    title: 'Portfolio Header + Hero Section',
    description: 'Construa o header completo e a seção hero (primeira tela) do seu portfolio pessoal usando HTML semântico e acessível.',
    learningObjectives: [
      'Aplicar HTML semântico em projeto real',
      'Criar navegação funcional com âncoras',
      'Estruturar conteúdo pensando em acessibilidade',
      'Começar seu portfolio profissional'
    ],
    completionCriteria: [
      'Header com logo/nome e menu de navegação (mínimo 3 links)',
      'Hero section com título, subtítulo e call-to-action',
      'Imagem de perfil com alt text descritivo',
      'Footer com copyright e links sociais',
      'HTML 100% semântico (header, nav, main, section, footer)',
      'Código validado (sem erros no W3C Validator)',
      'Passar no teste de acessibilidade básico'
    ],
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: 200,
    badgeId: 'html-hero-master',
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu Nome - Portfolio</title>
</head>
<body>
    <!-- Construa seu portfolio aqui! -->
</body>
</html>`
  },
  
  preClassChecklist: {
    id: 'checklist-week-01',
    weekId: 'week-01-html-essentials',
    items: [
      {
        id: 'theory-complete',
        description: 'Ler todo o conteúdo teórico da semana',
        type: 'content',
        estimatedMinutes: 60
      },
      {
        id: 'challenges-complete',
        description: 'Completar os 5 desafios práticos',
        type: 'challenge',
        estimatedMinutes: 75
      },
      {
        id: 'project-started',
        description: 'Iniciar o projeto semanal (pelo menos o header)',
        type: 'project',
        estimatedMinutes: 90
      },
      {
        id: 'questions-prepared',
        description: 'Anotar dúvidas para a aula ao vivo',
        type: 'content',
        estimatedMinutes: 15
      }
    ]
  },
  
  liveClassTopics: [
    'Review coletivo: HTML semântico vs não-semântico (comparar códigos)',
    'Debugging ao vivo: erros comuns de HTML',
    'Code review dos headers criados pelos alunos',
    'Discussão: Por que acessibilidade importa? (casos reais)',
    'Projeto: Construir juntos uma section avançada',
    'Q&A: Dúvidas da semana'
  ],
  
  estimatedStudyHours: 6,
  difficulty: 'beginner',
  tags: ['HTML', 'Semântica', 'Acessibilidade', 'Portfolio', 'Fundamentos'],
  nextWeekId: 'week-02-css-basics'
};
