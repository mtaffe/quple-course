/**
 * HTML Fundamentals - Complete Content
 *
 * This topic covers the foundational concepts of HTML, including basic structure,
 * semantic elements, and best practices for creating accessible web pages.
 */

import { Topic } from '../../types'
import { htmlQuizzes } from '../../quizzes/html-quizzes'

export const htmlFundamentals: Topic = {
  id: 'html-fundamentals',
  title: 'HTML Fundamentos',
  description: 'Domine a estrutura semântica e os elementos básicos do HTML',
  category: 'html',
  difficulty: 'beginner',
  totalTime: 45,
  lessons: [
    {
      id: 'lesson-1',
      title: 'Estrutura Básica do HTML',
      description: 'Entenda a anatomia de um documento HTML',
      estimatedTime: 8,
      quiz: htmlQuizzes.fundamentals.lesson1,
      sections: [
        {
          id: 'intro',
          title: 'O que é HTML?',
          type: 'theory',
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
          type: 'example',
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
          type: 'theory',
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
      quiz: htmlQuizzes.fundamentals.lesson2,
      sections: [
        {
          id: 'headings',
          title: 'Hierarquia de Títulos - A Espinha Dorsal do Conteúdo',
          type: 'example',
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
          type: 'example',
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
}
