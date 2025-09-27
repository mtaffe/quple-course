import Link from 'next/link'
import { TopicPageClient } from './TopicPageClient'

// Dados mockados - em produção viriam de um CMS ou banco de dados
const topicData = {
  'html-fundamentals': {
    title: 'HTML Fundamentos',
    description: 'Domine a estrutura semântica e os elementos básicos do HTML',
    category: 'html',
    totalTime: 45,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Estrutura Básica do HTML',
        description: 'Entenda a anatomia de um documento HTML',
        estimatedTime: 8,
        sections: [
          {
            id: 'intro',
            title: 'O que é HTML?',
            type: 'theory' as const,
            content: `HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar páginas web. Criada por Tim Berners-Lee em 1990, ela forma a espinha dorsal de praticamente toda página da internet.

**Principais características:**
- **Linguagem de marcação**: Usa tags para estruturar e dar significado ao conteúdo
- **Interpretação universal**: Funciona em qualquer navegador moderno
- **Base da web**: Todo site, desde blogs simples até aplicações complexas, usa HTML
- **Integração**: Trabalha em perfeita harmonia com CSS (estilo) e JavaScript (interatividade)
- **Semântica**: Descreve o SIGNIFICADO do conteúdo, não apenas sua aparência

**Por que HTML é fundamental?**

HTML não é uma linguagem de programação, mas sim de **marcação**. A diferença é crucial:
- **Linguagens de programação** (como JavaScript) executam lógica e cálculos
- **Linguagens de marcação** (como HTML) estruturam e dão significado ao conteúdo

**Analogia útil:**
Imagine HTML como a **estrutura de uma casa**:
- As tags são como as paredes, janelas e portas
- O conteúdo é como os móveis e decoração
- CSS seria a pintura e design interior
- JavaScript seriam os sistemas elétricos e hidráulicos

**Evolução do HTML:**
- **HTML 1.0** (1993): Versão básica inicial
- **HTML 2.0** (1995): Primeira versão padronizada
- **HTML 4.01** (1999): Versão amplamente adotada
- **XHTML** (2000): HTML mais rigoroso
- **HTML5** (2014): Versão moderna atual, com novos elementos semânticos

**HTML5 trouxe inovações importantes:**
- Elementos semânticos (<header>, <article>, <section>)
- Suporte nativo a áudio e vídeo
- Canvas para gráficos
- APIs JavaScript avançadas
- Melhor acessibilidade

**Impacto na acessibilidade:**
HTML bem estruturado é essencial para:
- **Leitores de tela**: Ajudam pessoas com deficiência visual
- **Navegação por teclado**: Para quem não pode usar mouse
- **SEO**: Mecanismos de busca entendem melhor o conteúdo
- **Dispositivos diversos**: Funciona em qualquer tela ou dispositivo

**📚 Para se aprofundar:**
- [MDN Web Docs - HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML5 Specification (W3C)](https://www.w3.org/TR/html52/)`
          },
          {
            id: 'structure',
            title: 'Estrutura de um Documento HTML',
            type: 'example' as const,
            content: `Todo documento HTML segue uma estrutura básica obrigatória. Entenda cada parte:

**1. DOCTYPE Declaration**
\`<!DOCTYPE html>\` - Informa ao navegador que este é um documento HTML5. SEMPRE deve ser a primeira linha.

**2. Elemento <html>**
O elemento raiz que contém todo o conteúdo da página. O atributo \`lang="pt-BR"\` especifica o idioma para:
- Acessibilidade (leitores de tela)
- Tradutores automáticos
- Motores de busca

**3. Seção <head>**
Contém metadados que NÃO aparecem na página, mas são cruciais:

- **\`<meta charset="UTF-8">\`**: Define a codificação de caracteres (suporta acentos, emojis, etc.)
- **\`<meta name="viewport">\`**: Torna o site responsivo em dispositivos móveis
- **\`<title>\`**: Aparece na aba do navegador e nos resultados de busca

**4. Seção <body>**
Contém todo o conteúdo visível da página.

**Metadados importantes para SEO:**
- \`<meta name="description" content="...">\` - Descrição nos resultados de busca
- \`<meta name="keywords" content="...">\` - Palavras-chave (menos importante hoje)
- \`<meta name="author" content="...">\` - Autor do conteúdo

**Para redes sociais (Open Graph):**
- \`<meta property="og:title" content="...">\`
- \`<meta property="og:description" content="...">\`
- \`<meta property="og:image" content="...">\``,
            codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Codificação de caracteres - OBRIGATÓRIO -->
    <meta charset="UTF-8">

    <!-- Responsividade em dispositivos móveis - ESSENCIAL -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Título da página (aparece na aba) -->
    <title>Quple - App para Casais | Objetivos Compartilhados</title>

    <!-- Descrição para motores de busca -->
    <meta name="description" content="O Quple ajuda casais a definirem e alcançarem objetivos juntos. Fortaleça seu relacionamento através de metas compartilhadas.">

    <!-- Palavras-chave (opcional) -->
    <meta name="keywords" content="relacionamento, casais, objetivos, metas, amor">

    <!-- Para redes sociais -->
    <meta property="og:title" content="Quple - App para Casais">
    <meta property="og:description" content="Fortaleça seu relacionamento com objetivos compartilhados">
    <meta property="og:image" content="/imagem-compartilhamento.jpg">

    <!-- Favicon (ícone na aba) -->
    <link rel="icon" href="/favicon.ico">

    <!-- CSS (será visto nas próximas lições) -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Todo conteúdo visível vai aqui -->
    <header>
        <h1>Bem-vindo ao Quple!</h1>
        <nav>
            <a href="#sobre">Sobre</a>
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#contato">Contato</a>
        </nav>
    </header>

    <main>
        <section id="sobre">
            <h2>Sobre o Quple</h2>
            <p>O app que conecta casais através de objetivos compartilhados.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Quple. Todos os direitos reservados.</p>
    </footer>
</body>
</html>`
          },
          {
            id: 'elements',
            title: 'Anatomia de um Elemento HTML',
            type: 'theory' as const,
            content: `Um elemento HTML é como uma caixa que organiza e dá significado ao conteúdo. Vamos destrinchar cada parte:

**📦 Estrutura básica de um elemento:**

**1. Tag de abertura:** \`<h1>\`
- Inicia o elemento
- Pode conter atributos
- Sempre entre < e >

**2. Conteúdo:** o texto que aparece na página
- Pode ser texto, outros elementos, ou ambos
- Alguns elementos não têm conteúdo (elementos vazios)

**3. Tag de fechamento:** \`</h1>\`
- Finaliza o elemento
- Sempre tem uma barra / antes do nome
- Deve corresponder exatamente à tag de abertura

**🏷️ Atributos - Informações extras:**

Atributos fornecem informações adicionais sobre os elementos:

\`<a href="https://quple.com" target="_blank" title="Visite o Quple">Link para o Quple</a>\`

- **href**: URL de destino
- **target**: Como abrir o link (_blank = nova aba)
- **title**: Texto que aparece ao passar o mouse

**Regras dos atributos:**
- Sempre na tag de abertura
- Formato: nome="valor"
- Valores sempre entre aspas (duplas ou simples)
- Múltiplos atributos separados por espaço

**🔧 Elementos vazios (self-closing):**

Alguns elementos não precisam de tag de fechamento porque não contêm conteúdo:

- \`<img src="foto.jpg" alt="Descrição da imagem">\` - Imagens
- \`<br>\` - Quebra de linha
- \`<hr>\` - Linha horizontal
- \`<input type="text" name="nome">\` - Campos de formulário
- \`<meta charset="UTF-8">\` - Metadados
- \`<link rel="stylesheet" href="style.css">\` - Links externos

**🔍 Elementos aninhados:**

Elementos podem conter outros elementos (aninhamento):

\`\`\`html
<article>
    <header>
        <h1>Título do artigo</h1>
        <p>Por <strong>João Silva</strong> em <time>2024</time></p>
    </header>
    <p>Conteúdo do artigo...</p>
</article>
\`\`\`

**Regras do aninhamento:**
- Tags devem ser fechadas na ordem inversa da abertura
- ✅ Correto: \`<p><strong>texto</strong></p>\`
- ❌ Errado: \`<p><strong>texto</p></strong>\`

**🎯 Elementos semânticos vs. não-semânticos:**

**Semânticos** (têm significado):
- \`<header>\` - Cabeçalho da página/seção
- \`<nav>\` - Menu de navegação
- \`<main>\` - Conteúdo principal
- \`<article>\` - Artigo independente
- \`<section>\` - Seção de conteúdo
- \`<aside>\` - Conteúdo lateral
- \`<footer>\` - Rodapé

**Não-semânticos** (apenas estrutura):
- \`<div>\` - Divisão genérica (bloco)
- \`<span>\` - Agrupamento genérico (inline)

**Por que semântica importa:**
- **Acessibilidade**: Leitores de tela navegam melhor
- **SEO**: Google entende melhor o conteúdo
- **Manutenção**: Código mais organizado e legível
- **CSS**: Mais fácil de estilizar especificamente

**📚 Referências essenciais:**
- [MDN - Referência de elementos HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element)
- [HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [ARIA - Acessibilidade Web](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA)`
          }
        ]
      },
      {
        id: 'lesson-2',
        title: 'Tags Semânticas Essenciais',
        description: 'Aprenda as principais tags e quando usá-las',
        estimatedTime: 12,
        sections: [
          {
            id: 'headings',
            title: 'Hierarquia de Títulos - A Espinha Dorsal do Conteúdo',
            type: 'example' as const,
            content: `HTML oferece 6 níveis de títulos (h1-h6) para criar uma hierarquia clara e lógica do conteúdo. Esta estrutura é FUNDAMENTAL para acessibilidade, SEO e organização.

**🎯 Por que a hierarquia importa:**

1. **Acessibilidade**: Leitores de tela usam títulos para navegação rápida
2. **SEO**: Google usa títulos para entender a estrutura do conteúdo
3. **Legibilidade**: Usuários escaneiam páginas através dos títulos
4. **Manutenção**: Código bem estruturado é mais fácil de manter

**📐 Regras fundamentais:**

- **Uma só h1 por página**: Representa o tópico principal
- **Ordem hierárquica**: Não pule níveis (h1 → h2 → h3, nunca h1 → h3)
- **Lógica semântica**: Use pelo significado, não pela aparência
- **Consistência**: Mantenha padrão em todo o site

**🏗️ Estrutura ideal:**

\`h1\` = Título da página (tema geral)
\`h2\` = Seções principais
\`h3\` = Subseções das h2
\`h4\` = Subseções das h3
\`h5\` e \`h6\` = Raramente necessários

**💡 Dica profissional:**
Pense nos títulos como o índice de um livro. Cada nível deve fluir naturalmente do anterior.`,
            codeExample: `<!-- Exemplo prático: Página do Quple -->

<h1>Quple - App para Casais</h1>

<h2>Como Funciona</h2>
    <h3>Criação de Objetivos</h3>
    <h3>Acompanhamento de Progresso</h3>
    <h3>Recompensas para o Casal</h3>

<h2>Funcionalidades</h2>
    <h3>Objetivos Pessoais</h3>
        <h4>Saúde e Fitness</h4>
        <h4>Desenvolvimento Profissional</h4>
    <h3>Objetivos de Relacionamento</h3>
        <h4>Comunicação</h4>
        <h4>Momentos Especiais</h4>

<h2>Planos e Preços</h2>
    <h3>Plano Gratuito</h3>
    <h3>Plano Premium</h3>

<h2>Depoimentos</h2>

<h2>Contato</h2>

<!-- ❌ ERRADO: Pular níveis -->
<h1>Título Principal</h1>
<h3>Ops! Pulei o h2</h3> <!-- Nunca faça isso! -->

<!-- ❌ ERRADO: Usar múltiplas h1 -->
<h1>Primeiro Título Principal</h1>
<h1>Segundo Título Principal</h1> <!-- Uma página = uma h1 -->

<!-- ✅ CORRETO: Hierarquia lógica -->
<h1>Página Sobre o Quple</h1>
<h2>Nossa História</h2>
<h2>Missão e Valores</h2>
    <h3>Nossa Missão</h3>
    <h3>Nossos Valores</h3>
        <h4>Transparência</h4>
        <h4>Inovação</h4>`
          },
          {
            id: 'paragraphs',
            title: 'Parágrafos e Texto - Criando Conteúdo Significativo',
            type: 'example' as const,
            content: `Os elementos de texto em HTML são fundamentais para criar conteúdo legível e acessível. Vamos explorar como usar cada elemento de forma semântica e profissional.

**📝 O Elemento \`<p>\` (Parágrafo):**
O parágrafo é a unidade básica de texto na web. Cada \`<p>\` deve conter uma ideia coesa e completa.

**💡 Boas práticas para parágrafos:**
- **Uma ideia por parágrafo**: Cada \`<p>\` deve desenvolver um conceito específico
- **Tamanho ideal**: Entre 50-100 palavras para web (mais legível)
- **Espaçamento automático**: Navegadores adicionam margem entre parágrafos
- **Semântica**: Use \`<p>\` apenas para texto de parágrafo, não para layout

**🎯 Elementos de Ênfase e Formatação:**

• **\`<strong>\`** - Importância forte (negrito semântico)
  - Use para palavras-chave importantes
  - Leitores de tela enfatizam o conteúdo
  - SEO considera como relevante

• **\`<em>\`** - Ênfase (itálico semântico)
  - Use para destacar palavras ou frases
  - Indica entonação diferente na leitura
  - Mais semântico que \`<i>\`

• **\`<br>\`** - Quebra de linha
  - Use apenas para quebras significativas (como endereços)
  - ❌ NÃO use para criar espaçamento entre elementos
  - ✅ Use para quebras dentro do mesmo contexto

• **\`<mark>\`** - Texto destacado
  - Como um marcador de texto
  - Útil para resultados de busca

**🎨 Elementos de Formatação Adicional:**

• **\`<small>\`** - Texto secundário (termos legais, direitos autorais)
• **\`<sup>\`** e **\`<sub>\`** - Sobrescrito e subscrito
• **\`<del>\`** e **\`<ins>\`** - Texto removido e inserido
• **\`<abbr>\`** - Abreviações com significado

**♿ Considerações de Acessibilidade:**
- Elementos semânticos são interpretados por leitores de tela
- Use ênfase com moderação (muita formatação confunde)
- Certifique-se de que o texto é compreensível sem a formatação visual

**🔍 Dica Profissional:**
No app Quple, use parágrafos bem estruturados para descrições de objetivos, perfis de usuário e instruções. Isso melhora a experiência de leitura em todos os dispositivos.

**📚 Para se aprofundar:**
- [MDN - Elementos de Texto](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element#Text_content)
- [W3C - Text-level Semantics](https://www.w3.org/TR/html52/textlevel-semantics.html)
- [WebAIM - Semantic Structure](https://webaim.org/techniques/semanticstructure/)`,
            codeExample: `<!-- ✅ EXEMPLO PROFISSIONAL: Página de perfil do Quple -->

<!-- Parágrafo bem estruturado com uma ideia central -->
<p>
    No <strong>Quple</strong>, acreditamos que relacionamentos saudáveis
    são construídos através de <em>objetivos compartilhados</em> e
    comunicação constante entre o casal.
</p>

<!-- Parágrafo com formatação semântica -->
<p>
    Nosso app permite que vocês criem <strong>metas conjuntas</strong>,
    acompanhem o progresso em tempo real e <em>celebrem cada conquista</em>
    alcançada juntos.
</p>

<!-- Uso correto de elementos semânticos -->
<p>
    <strong>Importante:</strong> Todas as informações compartilhadas
    no Quple são <mark>completamente privadas</mark> e protegidas por
    criptografia <abbr title="Advanced Encryption Standard">AES</abbr>-256.
</p>

<!-- Quebra de linha semântica (endereço) -->
<p>
    Quple Technologies Ltd.<br>
    123 Startup Avenue<br>
    São Paulo, SP - 01234-567
</p>

<!-- Formatação para termos legais -->
<p>
    <small>
        © 2024 Quple. Todos os direitos reservados.
        <a href="/termos">Termos de Uso</a> |
        <a href="/privacidade">Política de Privacidade</a>
    </small>
</p>

<!-- Exemplo com revisão de texto -->
<p>
    <del>Limite de 5 objetivos por casal</del>
    <ins>Objetivos ilimitados para todos os usuários</ins>
</p>

<!-- ❌ EVITE: Usar <br> para layout -->
<!-- <p>Texto<br><br><br>Outro texto</p> -->

<!-- ✅ CORRETO: Parágrafos separados -->
<p>Primeiro parágrafo com sua própria ideia.</p>
<p>Segundo parágrafo com outra ideia relacionada.</p>`
          }
        ]
      }
    ]
  },
  'css-basics': {
    title: 'CSS Essencial',
    description: 'Seletores, box model, positioning e responsividade',
    category: 'css',
    totalTime: 75,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introdução ao CSS',
        description: 'Entenda como o CSS funciona e como aplicar estilos',
        estimatedTime: 15,
        sections: [
          {
            id: 'what-is-css',
            title: 'O que é CSS? - A Arte de Estilizar a Web',
            type: 'theory' as const,
            content: `CSS (Cascading Style Sheets) é a linguagem responsável por toda a apresentação visual da web moderna. Criada em 1996 por Håkon Wium Lie e Bert Bos, revolucionou o desenvolvimento web ao separar conteúdo de apresentação.

**🎨 O que é CSS na prática:**
CSS é como um "designer gráfico" para suas páginas HTML. Enquanto o HTML define a estrutura e significado do conteúdo, o CSS define cores, layout, tipografia, animações e responsividade.

**📚 Evolução Histórica:**
- **CSS 1** (1996): Básico - cores, fontes, margens
- **CSS 2** (1998): Positioning, z-index, media types
- **CSS 2.1** (2004): Correções e melhorias
- **CSS 3** (2005-hoje): Módulos - animations, flexbox, grid, transforms
- **CSS 4** (em desenvolvimento): Container queries, nesting nativo

**🔥 Principais Características:**

• **🔄 Cascading (Cascata)**
  - Estilos "caem em cascata" do mais geral para o mais específico
  - Herança: elementos filhos herdam propriedades dos pais
  - Especificidade: regras mais específicas sobrescrevem as gerais

• **📦 Separação de Responsabilidades**
  - HTML: Estrutura e significado
  - CSS: Apresentação visual
  - JavaScript: Interatividade e comportamento

• **♻️ Reutilização e Manutenção**
  - Um arquivo CSS pode estilizar centenas de páginas
  - Mudanças globais com edições mínimas
  - Consistência visual em todo o projeto

• **⚡ Performance Otimizada**
  - Carregamento em paralelo com HTML
  - Cache do navegador para arquivos CSS
  - Compressão e minificação

**🎯 Por que CSS é Fundamental:**

• **🔧 Controle Total sobre Layout**
  - Flexbox: Layout unidimensional flexível
  - Grid: Layout bidimensional avançado
  - Positioning: Controle preciso de elementos
  - Float: Layout legado ainda útil

• **📱 Responsividade Nativa**
  - Media queries para diferentes dispositivos
  - Viewport units para dimensionamento flexível
  - Mobile-first ou desktop-first approaches

• **🎭 Experiência do Usuário**
  - Animations e transitions suaves
  - Hover effects e micro-interações
  - Dark mode e múltiplos temas
  - Loading states e feedback visual

• **♿ Acessibilidade Aprimorada**
  - Controle sobre contraste de cores
  - Tamanhos de fonte ajustáveis
  - Focus indicators para navegação por teclado
  - Reduced motion para usuários sensíveis

**🌐 CSS no Contexto Moderno:**

• **Metodologias Organizacionais:**
  - BEM (Block Element Modifier)
  - SMACSS (Scalable and Modular Architecture)
  - Atomic CSS / Utility-first (Tailwind)

• **Preprocessadores:**
  - Sass/SCSS: Variables, nesting, mixins
  - Less: Alternativa ao Sass
  - PostCSS: Plugin ecosystem moderno

• **CSS-in-JS (Para React/Next.js):**
  - Styled Components
  - Emotion
  - CSS Modules
  - Tailwind CSS

**🎨 Exemplo Prático no Quple:**
No app Quple, CSS transforma elementos básicos em uma interface moderna e atrativa. Um simples botão de login se torna uma experiência visual envolvente com gradientes, sombras, hover effects e micro-animações.

**💡 Dica Profissional:**
CSS moderno é mais poderoso que nunca. Features como Grid, Custom Properties (CSS Variables), e Container Queries tornam possível criar layouts complexos e responsivos que antes exigiam JavaScript.

**📚 Para se aprofundar:**
- [MDN CSS Documentation](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [CSS Tricks - Complete Guide](https://css-tricks.com/guides/)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)
- [Can I Use - CSS Support](https://caniuse.com/)
- [CSS Grid Garden](https://cssgridgarden.com/) - Jogo para aprender Grid
- [Flexbox Froggy](https://flexboxfroggy.com/) - Jogo para aprender Flexbox`
          },
          {
            id: 'css-syntax',
            title: 'Sintaxe do CSS - Dominando a Linguagem Visual',
            type: 'example' as const,
            content: `A sintaxe do CSS é elegante em sua simplicidade, mas poderosa em suas possibilidades. Compreender cada parte da regra CSS é fundamental para se tornar um desenvolvedor eficiente.

**🔧 Anatomia de uma Regra CSS:**

\`\`\`
seletor {
    propriedade: valor;
    propriedade: valor;
}
\`\`\`

**📍 Componentes da Regra:**

• **Seletor**: Define QUAL elemento será estilizado
• **Declaração**: Conjunto de propriedade + valor
• **Propriedade**: O QUE será alterado (cor, tamanho, posição)
• **Valor**: COMO será alterado (azul, 16px, center)
• **Bloco de declaração**: Tudo entre { }

**🎯 Tipos de Seletores CSS:**

• **Elemento/Tag**: \`h1\`, \`p\`, \`div\`
• **Classe**: \`.minha-classe\`
• **ID**: \`#meu-id\`
• **Atributo**: \`[type="button"]\`
• **Pseudo-classe**: \`:hover\`, \`:focus\`, \`:nth-child\`
• **Pseudo-elemento**: \`::before\`, \`::after\`
• **Universal**: \`*\` (todos os elementos)

**⚡ Especificidade CSS (Ordem de Importância):**
1. **Inline styles** (style="...") - 1000 pontos
2. **IDs** (#meu-id) - 100 pontos
3. **Classes, atributos, pseudo-classes** (.classe, [attr], :hover) - 10 pontos
4. **Elementos** (div, h1, p) - 1 ponto

**🎨 Valores CSS Modernos:**

• **Cores**: \`#ff0000\`, \`rgb(255,0,0)\`, \`hsl(0,100%,50%)\`, \`color-mix()\`
• **Unidades**: \`px\`, \`rem\`, \`em\`, \`%\`, \`vw\`, \`vh\`, \`fr\`
• **Funções**: \`calc()\`, \`min()\`, \`max()\`, \`clamp()\`
• **Custom Properties**: \`var(--minha-cor)\`

**💡 Boas Práticas de Sintaxe:**

• **Indentação consistente** (2 ou 4 espaços)
• **Uma propriedade por linha** para legibilidade
• **Ponto e vírgula** sempre, mesmo na última propriedade
• **Comentários descritivos** para lógicas complexas
• **Organização**: Agrupe propriedades relacionadas

**🔍 Debugging CSS:**
- Use DevTools do navegador (F12)
- Propriedade \`outline: 1px solid red\` para visualizar elementos
- Valide seu CSS no W3C CSS Validator

**📚 Para se aprofundar:**
- [MDN CSS Syntax](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Syntax)
- [CSS Specificity Calculator](https://specificity.keegan.st/)
- [CSS Reference - Codrops](https://tympanus.net/codrops/css_reference/)`,
            codeExample: `/* ================================================
   EXEMPLO COMPLETO: Estilizando o App Quple
   ================================================ */

/* ✅ REGRA BÁSICA: Elemento */
h1 {
    color: #2563eb;           /* Azul moderno */
    font-size: 2rem;          /* 32px */
    font-weight: 700;         /* Bold */
    text-align: center;       /* Centralizado */
    margin-bottom: 1rem;      /* Espaço inferior */
}

/* ✅ SELETOR DE CLASSE: .quple-button */
.quple-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;
}

/* ✅ PSEUDO-CLASSE: Estado hover */
.quple-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* ✅ SELETOR DE ID: #quple-login-form */
#quple-login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* ✅ MÚLTIPLOS SELETORES: Tipografia consistente */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.2;
    color: #1f2937;
}

/* ✅ SELETOR DE ATRIBUTO: Inputs de diferentes tipos */
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.2s ease;
}

/* ✅ PSEUDO-CLASSE: Focus state */
input[type="email"]:focus,
input[type="password"]:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* ✅ COMBINADOR DESCENDENTE: Elementos aninhados */
.quple-header .logo {
    height: 40px;
    width: auto;
}

/* ✅ COMBINADOR FILHO DIRETO: Apenas filhos diretos */
.quple-nav > li {
    margin-right: 2rem;
}

/* ✅ CUSTOM PROPERTIES (CSS Variables) */
:root {
    --quple-primary: #667eea;
    --quple-secondary: #764ba2;
    --quple-text: #1f2937;
    --quple-background: #f9fafb;
    --quple-radius: 8px;
}

/* ✅ USANDO CUSTOM PROPERTIES */
.quple-card {
    background: var(--quple-background);
    color: var(--quple-text);
    border-radius: var(--quple-radius);
    border: 1px solid color-mix(in srgb, var(--quple-primary) 20%, transparent);
}

/* ✅ FUNÇÕES CSS MODERNAS */
.quple-responsive-text {
    font-size: clamp(1rem, 2.5vw, 2rem);  /* Responsive font */
    width: min(90vw, 800px);               /* Max width responsivo */
    padding: max(1rem, 5vw);               /* Padding mínimo */
}

/* ✅ MEDIA QUERIES: Responsividade */
@media (max-width: 768px) {
    .quple-button {
        width: 100%;
        padding: 16px;
        font-size: 18px;
    }

    #quple-login-form {
        margin: 1rem;
        padding: 1.5rem;
    }
}

/* ✅ PSEUDO-ELEMENTO: Decoração */
.quple-title::after {
    content: '💕';
    margin-left: 0.5rem;
    font-size: 0.8em;
}

/* ❌ EVITE: Especificidade excessiva */
/* div.container #main .quple-button.primary.large */

/* ✅ PREFIRA: Simples e reutilizável */
/* .btn-primary-large */`
          }
        ]
      }
    ]
  },
  'js-fundamentals': {
    title: 'JavaScript Base',
    description: 'Variáveis, funções, eventos e manipulação do DOM',
    category: 'javascript',
    totalTime: 120,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Variáveis e Tipos de Dados',
        description: 'Fundamentos da linguagem JavaScript',
        estimatedTime: 25,
        sections: [
          {
            id: 'variables',
            title: 'Declarando Variáveis - O Coração do JavaScript',
            type: 'theory' as const,
            content: `JavaScript é uma linguagem de programação dinâmica e poderosa que trouxe interatividade para a web. Criado por Brendan Eich em 1995 em apenas 10 dias, hoje é uma das linguagens mais populares do mundo.

**🚀 JavaScript Moderno (ES6+):**
A linguagem evoluiu drasticamente. O JavaScript moderno (ES2015/ES6 em diante) introduziu recursos que tornam o código mais limpo, seguro e expressivo.

**📦 Três Formas de Declarar Variáveis:**

• **🚫 \`var\` (Legado - Evite usar)**
  - **Escopo de função**: Pode vazar para fora de blocos
  - **Hoisting confuso**: Declaração é "içada" mas valor não
  - **Redeclaração permitida**: Pode causar bugs silenciosos
  - **Problema temporal**: Pode ser acessada antes da declaração

• **✅ \`let\` (Recomendado para valores mutáveis)**
  - **Escopo de bloco**: Limitada ao bloco { } onde foi declarada
  - **Temporal Dead Zone**: Erro ao acessar antes da declaração
  - **Não pode ser redeclarada**: Evita bugs de nomeação
  - **Pode ser reatribuída**: Ideal para valores que mudam

• **🎯 \`const\` (Preferido quando possível)**
  - **Escopo de bloco**: Mesmas regras do \`let\`
  - **Imutável por atribuição**: Não pode ser reatribuída
  - **Declaração + Inicialização**: Deve ser inicializada na declaração
  - **Objetos e arrays**: O conteúdo pode ser modificado

**🧠 Conceitos Fundamentais:**

• **Escopo (Scope)**
  - **Global**: Acessível em todo o programa
  - **Função**: Acessível apenas dentro da função
  - **Bloco**: Acessível apenas dentro do bloco { }

• **Hoisting**
  - Declarações de variáveis são "içadas" para o topo
  - \`var\` é inicializada com \`undefined\`
  - \`let\` e \`const\` ficam em "zona morta temporal"

• **Temporal Dead Zone (TDZ)**
  - Período entre o início do escopo e a declaração
  - \`let\` e \`const\` não podem ser acessadas na TDZ
  - Previne bugs relacionados ao hoisting

**💡 Boas Práticas Modernas:**

• **Use \`const\` por padrão**: Se não vai reatribuir, use \`const\`
• **Use \`let\` quando necessário**: Para valores que mudam
• **Nunca use \`var\`**: Cause problemas de escopo
• **Nomes descritivos**: \`userAge\` melhor que \`a\`
• **camelCase**: Convenção JavaScript padrão

**🎨 Exemplo Prático no Quple:**
No app Quple, usamos \`const\` para dados imutáveis como configurações, \`let\` para contadores e estados que mudam, e evitamos \`var\` completamente.

**⚠️ Armadilhas Comuns:**

• **\`const\` não torna objetos imutáveis**
• **\`let\` dentro de loops** pode ter comportamento inesperado
• **Vazamento de escopo com \`var\`** em callbacks

**🔍 Debugging e Ferramentas:**
- Use \`console.log()\` para inspecionar valores
- DevTools do navegador para debugging
- ESLint para detectar problemas automaticamente
- TypeScript para tipagem estática opcional

**📚 Para se aprofundar:**
- [MDN JavaScript Guide](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)
- [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript.info - Modern Tutorial](https://javascript.info/)
- [ECMAScript Specifications](https://tc39.es/ecma262/)
- [ESLint Rules for Variables](https://eslint.org/docs/rules/#variables)`
          },
          {
            id: 'data-types',
            title: 'Tipos de Dados - O Sistema de Tipos Dinâmico do JavaScript',
            type: 'example' as const,
            content: `JavaScript é uma linguagem de tipagem dinâmica, o que significa que as variáveis podem armazenar diferentes tipos de dados e mudar de tipo durante a execução. Compreender os tipos é crucial para escrever código robusto.

**🔍 Sistema de Tipos do JavaScript:**
JavaScript tem 8 tipos de dados oficiais divididos em duas categorias principais:

**📦 Tipos Primitivos (7 tipos):**
Valores simples e imutáveis, armazenados diretamente na memória.

• **String** - Texto e caracteres
• **Number** - Números inteiros e decimais
• **BigInt** - Números inteiros muito grandes
• **Boolean** - Verdadeiro ou falso
• **Symbol** - Identificador único
• **Null** - Ausência intencional de valor
• **Undefined** - Valor não definido

**🏗️ Tipo Complexo (1 tipo):**
• **Object** - Coleções de propriedades (inclui arrays, funções, dates, etc.)

**💡 Características Importantes:**

• **Tipagem Dinâmica**: Variáveis podem mudar de tipo
• **Coerção de Tipo**: JavaScript converte tipos automaticamente
• **Duck Typing**: "Se anda como pato e faz quac, é um pato"
• **Referência vs Valor**: Primitivos por valor, objetos por referência

**🎯 Detalhes dos Tipos Primitivos:**

• **String**: Unicode UTF-16, imutável
  - Template literals: \`Olá \${nome}\`
  - Métodos: \`.length\`, \`.slice()\`, \`.includes()\`

• **Number**: IEEE 754 double precision
  - Inteiros seguros: ±2^53 - 1
  - Especiais: \`Infinity\`, \`-Infinity\`, \`NaN\`

• **BigInt**: Para números > Number.MAX_SAFE_INTEGER
  - Sintaxe: \`123n\` ou \`BigInt(123)\`

• **Boolean**: \`true\` ou \`false\`
  - Falsy values: \`false\`, \`0\`, \`''\`, \`null\`, \`undefined\`, \`NaN\`
  - Truthy: Tudo que não é falsy

**🔄 Coerção de Tipos:**
JavaScript converte tipos automaticamente em certas situações:

• **Implícita**: \`"5" + 3 = "53"\` (concatenação)
• **Explícita**: \`Number("123")\`, \`String(456)\`
• **Com operadores**: \`+\` força conversão para número

**🛠️ Verificação de Tipos:**

• **\`typeof\`**: Operador básico (com limitações)
• **\`Array.isArray()\`**: Para detectar arrays
• **\`instanceof\`**: Para objetos complexos
• **\`Object.prototype.toString.call()\`**: Mais preciso

**🎨 Exemplo Prático no Quple:**
No app Quple, usamos strings para nomes de usuário, numbers para idades e progresso, booleans para status de objetivos, e objects para dados complexos como perfis de casal.

**⚠️ Pegadinhas Comuns:**

• \`typeof null === "object"\` (bug histórico)
• \`NaN === NaN\` é \`false\` (use \`Number.isNaN()\`)
• Arrays são objects: \`typeof [] === "object"\`
• \`undefined\` vs \`null\` - diferentes, mas similares

**📚 Para se aprofundar:**
- [MDN Data Types](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures)
- [JavaScript Type Conversion](https://javascript.info/type-conversions)
- [Equality Comparisons and Sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)`,
            codeExample: `/* ================================================
   TIPOS DE DADOS NO QUPLE APP - EXEMPLOS PRÁTICOS
   ================================================ */

// ✅ TIPOS PRIMITIVOS

// 🔤 STRING - Texto e caracteres
const nomeUsuario = "Ana Silva";
const bioUsuario = \`Desenvolvedora apaixonada por tecnologia.
Sempre em busca de novos desafios! 🚀\`;
const emailUsuario = 'ana.silva@quple.com';

// 🔢 NUMBER - Números (inteiros e decimais)
const idadeUsuario = 28;
const progressoObjetivo = 75.5;  // Porcentagem
const metaDiaria = 10000;        // Passos
const pontuacaoXP = 1250;

// 🔢 BIGINT - Números muito grandes
const timestampPreciso = 1640995200000n;
const contadorGlobal = BigInt(Number.MAX_SAFE_INTEGER) + 1n;

// ✅ BOOLEAN - Verdadeiro ou falso
const objetivoConcluido = true;
const notificacoesAtivas = false;
const usuarioVIP = true;

// 🔍 SYMBOL - Identificador único
const ID_USUARIO = Symbol('usuario');
const CHAVE_PRIVADA = Symbol('chave');

// ❌ NULL - Ausência intencional de valor
let fotoPerfil = null;  // Usuário ainda não enviou foto
let ultimoLogin = null; // Primeiro acesso

// ❓ UNDEFINED - Valor não definido
let configuracaoOpcional;  // undefined por padrão
let cacheTemporario;       // será definido depois

// ================================================
// 🏗️ TIPOS COMPLEXOS (OBJECTS)
// ================================================

// 📦 OBJECT - Dados estruturados
const perfilUsuario = {
    nome: "Ana Silva",
    idade: 28,
    email: "ana@quple.com",
    parceiro: {
        nome: "Carlos",
        idade: 30
    },
    objetivos: ["Correr 5km", "Aprender violão"],
    ativo: true,

    // 🎯 MÉTODO - Função dentro de objeto
    apresentar() {
        return \`Olá! Eu sou \${this.nome} e tenho \${this.idade} anos.\`;
    }
};

// 📋 ARRAY - Lista ordenada (também é Object)
const objetivosCasal = [
    "Viajar para Europa",
    "Comprar casa própria",
    "Aprender dança de salão",
    "Fazer curso de culinária"
];

const dadosProgresso = [10, 25, 60, 80, 95]; // Porcentagens mensais

// 🔧 FUNCTION - Bloco de código reutilizável
function calcularProgresso(atual, meta) {
    return Math.round((atual / meta) * 100);
}

// 🏹 ARROW FUNCTION - Sintaxe moderna
const saudarUsuario = (nome) => \`Bem-vindo(a), \${nome}! 💕\`;

// 📅 DATE - Objeto para datas
const dataRegistro = new Date();
const proximoEncontro = new Date('2024-12-25');

// ================================================
// 🔍 VERIFICAÇÃO DE TIPOS
// ================================================

// typeof - Operador básico
console.log(typeof nomeUsuario);       // "string"
console.log(typeof idadeUsuario);      // "number"
console.log(typeof objetivoConcluido); // "boolean"
console.log(typeof perfilUsuario);     // "object"
console.log(typeof objetivosCasal);    // "object" (!)
console.log(typeof null);              // "object" (bug histórico!)

// Verificações mais específicas
console.log(Array.isArray(objetivosCasal));    // true
console.log(perfilUsuario instanceof Object);  // true
console.log(dataRegistro instanceof Date);     // true

// Verificação robusta para null
console.log(fotoPerfil === null);              // true

// Verificação para undefined
console.log(configuracaoOpcional === undefined); // true
console.log(typeof configuracaoOpcional === 'undefined'); // true

// ================================================
// 🔄 COERÇÃO DE TIPOS (CONVERSÕES)
// ================================================

// Conversão implícita (automática)
const resultado1 = "Usuário " + 123;           // "Usuário 123"
const resultado2 = "10" * 2;                   // 20 (string → number)
const resultado3 = !!"texto";                  // true (truthy)

// Conversão explícita (manual)
const numeroString = String(idadeUsuario);     // "28"
const stringNumero = Number("42");             // 42
const booleanValor = Boolean(nomeUsuario);     // true

// Conversões para o Quple App
const progressoTexto = \`\${progressoObjetivo}%\`;
const idadeNumero = parseInt(prompt("Sua idade:"), 10);

// ================================================
// ⚠️ PEGADINHAS COMUNS E SOLUÇÕES
// ================================================

// ❌ Problema: typeof null
console.log(typeof null === "object");         // true (confuso!)
// ✅ Solução: Verificação específica
console.log(fotoPerfil === null);              // true (correto)

// ❌ Problema: NaN comparação
console.log(NaN === NaN);                      // false (!)
// ✅ Solução: Number.isNaN()
console.log(Number.isNaN(NaN));                // true (correto)

// ❌ Problema: Array tipo
console.log(typeof objetivosCasal);            // "object" (confuso!)
// ✅ Solução: Array.isArray()
console.log(Array.isArray(objetivosCasal));    // true (correto)

// ================================================
// 💡 BOAS PRÁTICAS NO QUPLE
// ================================================

// Use const para valores que não mudam
const CONFIG_APP = {
    versao: "1.0.0",
    apiUrl: "https://api.quple.com"
};

// Use tipos consistentes
const objetivos = []; // Sempre array, nunca null
const configuracoes = {}; // Sempre object, nunca null

// Validação de entrada
function criarObjetivo(titulo, descricao) {
    if (typeof titulo !== 'string' || titulo.length === 0) {
        throw new Error('Título deve ser uma string não vazia');
    }

    return {
        id: Date.now(),
        titulo,
        descricao: descricao || '',
        concluido: false
    };
}`
          }
        ]
      }
    ]
  }
}

interface TopicPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params
  const topic = topicData[slug as keyof typeof topicData]

  if (!topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Tópico não encontrado</h1>
          <Link href="/learn" className="text-primary premium-hover">← Voltar aos conteúdos</Link>
        </div>
      </div>
    )
  }

  return <TopicPageClient topic={topic} slug={slug} />
}