'use client'

import { useState, useEffect } from 'react'
import { X, Lightbulb, BookOpen, Code, ExternalLink, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PocketContent {
  id: string
  title: string
  content: string
  type: 'tip' | 'concept' | 'example'
  codeExample?: string
  relatedLesson?: {
    title: string
    url: string
  }
}

interface ModalPocketProps {
  isOpen: boolean
  onClose: () => void
  challengeId: number
  context?: string // contexto específico que acionou o modal
}

// Dados contextuais por desafio
const pocketData: Record<number, PocketContent[]> = {
  1: [
    {
      id: 'html-basic-structure',
      title: 'Estrutura Básica do HTML',
      type: 'concept',
      content: `Todo documento HTML precisa começar com uma estrutura básica.

**Elementos obrigatórios:**
• \`<!DOCTYPE html>\` - declara que é HTML5
• \`<html>\` - elemento raiz que contém toda a página
• \`<head>\` - metadados que não aparecem na página
• \`<body>\` - conteúdo visível da página

**Por que usar \`<h1>\`?**
O \`<h1>\` é o título principal da página. Cada página deve ter apenas um \`<h1>\` que descreve o conteúdo principal.`,
      codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
</head>
<body>
    <h1>Título Principal</h1>
</body>
</html>`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    },
    {
      id: 'semantic-html',
      title: 'HTML Semântico',
      type: 'tip',
      content: `Use sempre HTML semântico para melhor acessibilidade e SEO.

**Dica importante:**
O \`<h1>\` não é apenas para "títulos grandes". Ele indica a HIERARQUIA do conteúdo. Navegadores, leitores de tela e mecanismos de busca usam essa informação.

**Como pensar:**
• \`<h1>\` = "Sobre o que é esta página?"
• \`<h2>\` = "Quais são as seções principais?"
• \`<h3>\` = "Quais são as subseções?"`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ],
  2: [
    {
      id: 'multiple-elements',
      title: 'Combinando Elementos HTML',
      type: 'concept',
      content: `Quando você tem múltiplos elementos, cada um serve um propósito específico.

**\`<h1>\` + \`<p>\`:**
Esta é uma combinação muito comum e semântica:
• \`<h1>\` apresenta o tópico principal
• \`<p>\` desenvolve a ideia com mais detalhes

**Estrutura lógica:**
Pense como um artigo de jornal - primeiro o título, depois o conteúdo.`,
      codeExample: `<h1>Bem-vindo ao Quple</h1>
<p>O app que conecta casais através de objetivos compartilhados.</p>

<!-- Isso cria uma hierarquia clara e lógica -->`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ],
  3: [
    {
      id: 'heading-hierarchy',
      title: 'Hierarquia de Títulos',
      type: 'concept',
      content: `HTML oferece 6 níveis de títulos (\`<h1>\` até \`<h6>\`) para criar estrutura.

**Regra importante:**
Use os títulos em ordem hierárquica! Não pule níveis.

**✅ Correto:**
\`<h1>\` → \`<h2>\` → \`<h3>\`

**❌ Errado:**
\`<h1>\` → \`<h3>\` (pulou o h2)

**Por que isso importa?**
Tecnologias assistivas (leitores de tela) usam essa hierarquia para navegação.`,
      codeExample: `<h1>Sobre o Quple</h1>
<p>Nosso app revolucionário...</p>

<h2>Funcionalidades Principais</h2>
<p>Descrição das funcionalidades...</p>

<h2>Como Funciona</h2>
<p>Explicação do processo...</p>`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ],
  4: [
    {
      id: 'lists-basics',
      title: 'Listas em HTML',
      type: 'concept',
      content: `Listas organizam informações relacionadas de forma clara e estruturada.

**Tipos de listas:**
• \`<ul>\` - Lista não-ordenada (bullets)
• \`<ol>\` - Lista ordenada (números)
• \`<li>\` - Item de lista

**Como funciona o aninhamento:**
As tags \`<li>\` SEMPRE devem estar dentro de \`<ul>\` ou \`<ol>\`. Isso é chamado de "aninhamento" - colocar elementos dentro de outros.

**Exemplo da vida real:**
Pense em uma lista de compras - você tem o "bloco de notas" (\`<ul>\`) e os "itens escritos nele" (\`<li>\`).`,
      codeExample: `<ul>
  <li>Objetivo 1: Viajar para Paris</li>
  <li>Objetivo 2: Aprender francês</li>
  <li>Objetivo 3: Visitar a Torre Eiffel</li>
</ul>

<!-- Cada <li> representa um objetivo do casal -->`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    },
    {
      id: 'nested-elements',
      title: 'Elementos Aninhados',
      type: 'tip',
      content: `Aninhamento é um conceito fundamental em HTML - significa colocar tags dentro de outras tags.

**Regras do aninhamento:**
1. Tags internas devem fechar ANTES das externas
2. Indentação ajuda a visualizar a hierarquia
3. Nem todas as tags podem conter outras tags

**✅ Correto:**
\`<ul>\`
  \`<li>\`...\`</li>\`
\`</ul>\`

**❌ Errado:**
\`<ul>\`
  \`<li>\`...
\`</ul>\`
\`</li>\` (fechou na ordem errada)

**Pense assim:**
É como caixas dentro de caixas - você precisa fechar a caixa pequena antes de fechar a grande.`,
      codeExample: `<!-- Estrutura correta com indentação -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`,
      relatedLesson: {
        title: 'HTML Fundamentos',
        url: '/learn/html-fundamentals'
      }
    }
  ],
  5: [
    {
      id: 'css-introduction',
      title: 'Introdução ao CSS',
      type: 'concept',
      content: `CSS (Cascading Style Sheets) é a linguagem que estiliza o HTML. Enquanto HTML define a estrutura, CSS define a aparência.

**Anatomia de uma regra CSS:**
\`seletor { propriedade: valor; }\`

• **Seletor**: Qual elemento você quer estilizar
• **Propriedade**: O que você quer mudar (cor, tamanho, etc)
• **Valor**: Como você quer mudar

**Exemplo prático:**
\`h1 { color: blue; }\`
↓
"Pegue todos os h1 e deixe a cor do texto azul"`,
      codeExample: `<style>
  h1 {
    color: blue;
  }
</style>

<h1>Quple</h1>

<!-- O texto "Quple" aparecerá em azul! -->`,
      relatedLesson: {
        title: 'CSS Básico',
        url: '/learn/css-basics'
      }
    },
    {
      id: 'css-colors',
      title: 'Cores em CSS',
      type: 'tip',
      content: `CSS oferece várias formas de especificar cores:

**1. Nomes de cores** (mais simples):
\`color: blue;\` \`color: red;\` \`color: green;\`

**2. Códigos hexadecimais** (mais preciso):
\`color: #FF0000;\` (vermelho)
\`color: #0000FF;\` (azul)

**3. RGB** (Red, Green, Blue):
\`color: rgb(255, 0, 0);\` (vermelho)

**Para começar:**
Use nomes de cores simples como blue, red, green, yellow, purple, orange. É mais fácil de lembrar!`,
      codeExample: `<style>
  h1 { color: blue; }
  p { color: darkgray; }
</style>

<h1>Título Azul</h1>
<p>Parágrafo cinza escuro</p>`,
      relatedLesson: {
        title: 'CSS Básico',
        url: '/learn/css-basics'
      }
    },
    {
      id: 'where-to-put-css',
      title: 'Onde Colocar o CSS',
      type: 'example',
      content: `Existem 3 formas de adicionar CSS ao HTML:

**1. Inline** (direto no elemento):
\`<h1 style="color: blue;">\`
❌ Não recomendado para projetos reais

**2. Internal** (tag \`<style>\` no \`<head>\`):
✅ Ótimo para aprendizado e páginas simples

**3. External** (arquivo .css separado):
✅ Melhor para projetos grandes

**Neste desafio:**
Use a tag \`<style>\` dentro do \`<head>\` para praticar!`,
      codeExample: `<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
<body>
  <h1>Quple</h1>
</body>
</html>`,
      relatedLesson: {
        title: 'CSS Básico',
        url: '/learn/css-basics'
      }
    }
  ],
  6: [
    {
      id: 'flexbox-introduction',
      title: 'O que é Flexbox?',
      type: 'concept',
      content: `Flexbox (Flexible Box Layout) é um sistema de layout CSS que facilita MUITO o alinhamento e distribuição de elementos em uma linha ou coluna.

**Por que Flexbox existe?**
Antes do Flexbox, criar layouts responsivos e alinhados era difícil e cheio de "hacks". Flexbox resolve isso de forma elegante.

**Conceito fundamental:**
Você tem um **container** (elemento pai) e **items** (elementos filhos). O container controla como os items são organizados.

**Exemplo do Quple:**
No layout do Quple, usamos Flexbox para:
• Alinhar o logo e menu no header
• Organizar os cards de objetivos em uma grid
• Centralizar botões e formulários

**Quando usar Flexbox:**
✅ Layouts de uma dimensão (linha OU coluna)
✅ Alinhar elementos no centro
✅ Distribuir espaço entre elementos
✅ Criar navbars responsivos`,
      codeExample: `/* Container com Flexbox */
.container {
  display: flex; /* Ativa o Flexbox */
  justify-content: space-between; /* Distribui espaço */
  align-items: center; /* Alinha verticalmente */
}

/* Os items dentro são organizados automaticamente */
<div class="container">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`,
      relatedLesson: {
        title: 'CSS Avançado - Flexbox',
        url: '/learn/css-advanced'
      }
    },
    {
      id: 'flexbox-justify-align',
      title: 'Justify-content vs Align-items',
      type: 'tip',
      content: `Esta é a confusão #1 do Flexbox! Vamos esclarecer de uma vez:

**justify-content** (eixo principal):
• Se flex-direction: row → controla HORIZONTAL
• Se flex-direction: column → controla VERTICAL

**align-items** (eixo cruzado):
• Se flex-direction: row → controla VERTICAL
• Se flex-direction: column → controla HORIZONTAL

**Pense assim:**
• justify-content = "para onde vai a fila?"
• align-items = "como alinha perpendicularmente?"

**Valores comuns:**

justify-content:
• flex-start = início
• center = centro
• space-between = espaçamento entre
• space-around = espaçamento ao redor

align-items:
• flex-start = topo
• center = meio
• flex-end = fundo
• stretch = estica para preencher

**Dica profissional:**
Use sempre ambos para controle total do layout!`,
      codeExample: `/* Centralizar perfeito */
.center-everything {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center; /* Vertical */
  height: 100vh; /* Altura total da tela */
}

/* Navbar do Quple */
.navbar {
  display: flex;
  justify-content: space-between; /* Logo à esquerda, menu à direita */
  align-items: center; /* Alinha verticalmente */
  padding: 1rem;
}`,
      relatedLesson: {
        title: 'CSS Avançado - Flexbox',
        url: '/learn/css-advanced'
      }
    },
    {
      id: 'flexbox-quple-example',
      title: 'Flexbox no Layout do Quple',
      type: 'example',
      content: `Vamos ver como o Quple usa Flexbox em situações reais:

**1. Header (Navbar):**
Logo à esquerda, menu à direita, tudo alinhado no centro verticalmente.

**2. Cards de Objetivos:**
Título, descrição e botão organizados verticalmente dentro de cada card, com espaçamento automático.

**3. Formulários:**
Labels e inputs organizados, botões alinhados ao centro.

**4. Footer:**
Links distribuídos uniformemente com espaçamento entre eles.

**Por que Flexbox é perfeito para o Quple:**
• Responsivo automaticamente
• Alinhamento preciso
• Código limpo e manutenível
• Funciona em todos os dispositivos`,
      codeExample: `/* Header do Quple */
.quple-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a2e;
}

/* Card de Objetivo */
.objetivo-card {
  display: flex;
  flex-direction: column; /* Vertical */
  gap: 1rem; /* Espaçamento entre elementos */
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
}

/* Botões do formulário */
.form-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}`,
      relatedLesson: {
        title: 'CSS Avançado - Flexbox',
        url: '/learn/css-advanced'
      }
    }
  ],
  7: [
    {
      id: 'media-queries-intro',
      title: 'Media Queries - Tornando Sites Responsivos',
      type: 'concept',
      content: `Media Queries são a forma de aplicar estilos CSS diferentes baseados no tamanho da tela (ou outras características do dispositivo).

**Por que são importantes:**
Hoje as pessoas acessam sites de:
• Smartphones (375px - 428px)
• Tablets (768px - 1024px)
• Laptops (1280px - 1440px)
• Desktops grandes (1920px+)

Seu site precisa funcionar PERFEITAMENTE em todos!

**Sintaxe básica:**
\`@media (max-width: 768px) { ... }\`
= "Se a largura for ATÉ 768px, aplique estes estilos"

**Breakpoints comuns:**
• 640px = Mobile grande
• 768px = Tablet
• 1024px = Laptop
• 1280px = Desktop

**Regra de ouro:**
Sempre teste em múltiplos tamanhos de tela!`,
      codeExample: `/* Desktop (padrão) */
.container {
  display: flex;
  flex-direction: row; /* Lado a lado */
  gap: 2rem;
}

/* Tablet */
@media (max-width: 1024px) {
  .container {
    gap: 1rem; /* Menos espaço */
  }
}

/* Mobile */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Um embaixo do outro */
    gap: 1rem;
  }
}`,
      relatedLesson: {
        title: 'CSS Avançado - Responsive Design',
        url: '/learn/css-advanced'
      }
    },
    {
      id: 'mobile-first-approach',
      title: 'Mobile-First: A Melhor Prática',
      type: 'tip',
      content: `Mobile-First significa escrever CSS para mobile PRIMEIRO, e depois adicionar estilos para telas maiores.

**Por que Mobile-First?**
1. Maioria dos usuários acessa de mobile
2. Força você a priorizar conteúdo essencial
3. Performance melhor (menos CSS para mobile)
4. Mais fácil expandir do que reduzir

**Como funciona:**
Ao invés de max-width (até X), use min-width (a partir de X).

**Fluxo de pensamento:**
1. Mobile = Base (sem media query)
2. Tablet = Adicione espaço e layout
3. Desktop = Layout completo com sidebars

**Dica profissional:**
Sempre desenvolva com DevTools aberto em 375px primeiro!`,
      codeExample: `/* ❌ Desktop-First (evite) */
.container {
  display: flex; /* Desktop */
}
@media (max-width: 768px) {
  .container {
    display: block; /* Mobile */
  }
}

/* ✅ Mobile-First (recomendado) */
.container {
  display: block; /* Mobile por padrão */
}
@media (min-width: 768px) {
  .container {
    display: flex; /* Desktop quando tela > 768px */
  }
}`,
      relatedLesson: {
        title: 'CSS Avançado - Responsive Design',
        url: '/learn/css-advanced'
      }
    },
    {
      id: 'responsive-quple',
      title: 'Responsive Design no Quple',
      type: 'example',
      content: `Vamos ver como o Quple se adapta a diferentes telas:

**Mobile (< 768px):**
• Menu vira hambúrguer
• Cards de objetivos empilham verticalmente
• Texto menor, espaçamento reduzido
• Botões ocupam largura total

**Tablet (768px - 1024px):**
• 2 colunas de cards
• Menu horizontal simplificado
• Espaçamentos médios

**Desktop (> 1024px):**
• 3-4 colunas de cards
• Menu completo
• Sidebar visível
• Espaçamentos generosos

**Técnicas usadas:**
• Flexbox com flex-wrap
• Grid responsivo
• Imagens com max-width: 100%
• Typography scaling (rem units)`,
      codeExample: `/* Quple Cards - Responsive */

/* Mobile (base) */
.objetivos-grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 coluna */
  gap: 1rem;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .objetivos-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas */
    gap: 1.5rem;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .objetivos-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 colunas */
    gap: 2rem;
    padding: 3rem;
  }
}`,
      relatedLesson: {
        title: 'CSS Avançado - Responsive Design',
        url: '/learn/css-advanced'
      }
    }
  ],
  8: [
    {
      id: 'dom-manipulation-intro',
      title: 'Manipulação do DOM',
      type: 'concept',
      content: `DOM (Document Object Model) é a representação do HTML em JavaScript. É como o JavaScript "enxerga" sua página.

**O que você pode fazer:**
• Buscar elementos (querySelector)
• Modificar conteúdo (textContent, innerHTML)
• Alterar estilos (style, classList)
• Adicionar/remover elementos
• Reagir a eventos (click, submit, etc)

**querySelector vs getElementById:**
• querySelector: Mais moderno, usa seletores CSS
• getElementById: Mais antigo, só por ID

**Exemplo prático:**
\`document.querySelector('.botao')\` = "Busque o elemento com classe 'botao'"

**Regra importante:**
Só manipule o DOM depois que a página carregar completamente!

**Por que isso importa no Quple:**
Todo clique de botão, preenchimento de formulário, toggle de senha - tudo é manipulação do DOM!`,
      codeExample: `// Buscar elemento
const titulo = document.querySelector('h1');

// Modificar conteúdo
titulo.textContent = 'Novo título!';

// Alterar estilo
titulo.style.color = 'blue';

// Adicionar classe
titulo.classList.add('destaque');

// Reagir a evento
const botao = document.querySelector('.btn');
botao.addEventListener('click', () => {
  alert('Botão clicado!');
});`,
      relatedLesson: {
        title: 'JavaScript Fundamentos',
        url: '/learn/javascript-fundamentals'
      }
    },
    {
      id: 'queryselector-addeventlistener',
      title: 'querySelector + addEventListener',
      type: 'tip',
      content: `Estas duas funções são a BASE da interatividade em JavaScript!

**querySelector(seletor):**
• Busca o PRIMEIRO elemento que corresponde ao seletor CSS
• Retorna o elemento ou null (se não encontrar)
• Use querySelectorAll() para buscar múltiplos

**addEventListener(evento, função):**
• "Escuta" por um evento específico
• Quando o evento acontece, executa a função
• Eventos comuns: 'click', 'submit', 'input', 'keydown'

**Fluxo típico:**
1. Buscar elemento (querySelector)
2. Adicionar listener (addEventListener)
3. Definir o que fazer quando evento ocorrer

**Dica profissional:**
Sempre verifique se o elemento existe antes de adicionar o listener!

**Exemplo do Quple:**
Quando você clica "Mostrar senha", pegamos o input e mudamos o type de 'password' para 'text'.`,
      codeExample: `// Verificar se elemento existe
const botao = document.querySelector('#meu-botao');

if (botao) {
  // Adicionar listener
  botao.addEventListener('click', function() {
    console.log('Botão foi clicado!');

    // Fazer algo útil
    const input = document.querySelector('#senha');
    if (input.type === 'password') {
      input.type = 'text'; // Mostrar senha
    } else {
      input.type = 'password'; // Esconder senha
    }
  });
} else {
  console.error('Botão não encontrado!');
}`,
      relatedLesson: {
        title: 'JavaScript Fundamentos',
        url: '/learn/javascript-fundamentals'
      }
    },
    {
      id: 'toggle-password-example',
      title: 'Toggle de Senha Visível',
      type: 'example',
      content: `Vamos implementar o recurso "Mostrar/Esconder Senha" do zero!

**O que precisamos:**
1. Input de senha (type="password")
2. Botão para toggle
3. JavaScript para alternar

**Lógica:**
• Se type = "password" → mudar para "text"
• Se type = "text" → mudar para "password"

**Boas práticas:**
• Mudar ícone do botão (👁️ vs 👁️‍🗨️)
• Mudar texto (Mostrar vs Esconder)
• Acessibilidade (aria-label)

**Aplicação no Quple:**
Exatamente o que você implementará! Usamos isso no login, cadastro e redefinição de senha.

**Dica extra:**
Você pode usar um único botão e alternar, ou dois botões (um para mostrar, outro para esconder).`,
      codeExample: `// HTML
<input type="password" id="senha" placeholder="Digite sua senha">
<button id="toggle-senha">👁️ Mostrar</button>

// JavaScript
const senhaInput = document.querySelector('#senha');
const toggleBtn = document.querySelector('#toggle-senha');

toggleBtn.addEventListener('click', () => {
  // Alternar tipo
  if (senhaInput.type === 'password') {
    senhaInput.type = 'text';
    toggleBtn.textContent = '👁️‍🗨️ Esconder';
  } else {
    senhaInput.type = 'password';
    toggleBtn.textContent = '👁️ Mostrar';
  }
});

// Resultado: clique alterna visibilidade!`,
      relatedLesson: {
        title: 'JavaScript Fundamentos',
        url: '/learn/javascript-fundamentals'
      }
    }
  ],
  9: [
    {
      id: 'form-validation-intro',
      title: 'Validação de Formulários',
      type: 'concept',
      content: `Validação de formulários garante que os dados enviados estão corretos ANTES de processar.

**Por que validar?**
• Melhor experiência do usuário (feedback imediato)
• Segurança (evitar dados maliciosos)
• Qualidade dos dados (informações corretas)
• Menos erros no backend

**Tipos de validação:**

1. **HTML5 (nativo):**
   • required, minlength, maxlength
   • type="email", type="url"
   • pattern (regex)

2. **JavaScript (custom):**
   • Validações complexas
   • Feedback visual customizado
   • Sincronização entre campos

**Fluxo ideal:**
1. HTML5 para validações básicas
2. JavaScript para validações avançadas
3. Backend para validação final (SEMPRE!)

**No Quple:**
Validamos email, senha (mínimo 8 caracteres), nome completo, etc.`,
      codeExample: `<!-- HTML5 validation -->
<form id="meu-form">
  <input
    type="email"
    name="email"
    required
    placeholder="seu@email.com"
  >

  <input
    type="password"
    name="senha"
    required
    minlength="8"
    placeholder="Mínimo 8 caracteres"
  >

  <button type="submit">Enviar</button>
</form>

<!-- Browser valida automaticamente! -->`,
      relatedLesson: {
        title: 'JavaScript Fundamentos',
        url: '/learn/javascript-fundamentals'
      }
    },
    {
      id: 'preventdefault-feedback',
      title: 'preventDefault e Feedback Visual',
      type: 'tip',
      content: `Duas técnicas essenciais para formulários interativos!

**preventDefault():**
Impede o comportamento padrão do navegador.

Quando usar:
• Evitar reload da página ao submeter form
• Interceptar cliques em links
• Controlar eventos de teclado

**Feedback Visual:**
Mostre ao usuário o que está acontecendo!

Boas práticas:
• ✅ Borda verde para campo válido
• ❌ Borda vermelha + mensagem para erro
• 💬 Mensagem clara do que está errado
• ⏳ Loading durante processamento

**Estados do formulário:**
1. Normal (padrão)
2. Validando (azul, pulsando)
3. Válido (verde, ✓)
4. Inválido (vermelho, ✗)
5. Processando (loading spinner)

**No Quple:**
Quando você tenta fazer login com senha errada, mostramos feedback vermelho + mensagem específica.`,
      codeExample: `const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const senhaInput = document.querySelector('#senha');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita reload!

  // Validar email
  if (!emailInput.value.includes('@')) {
    // Feedback visual
    emailInput.classList.add('erro');
    emailInput.classList.remove('valido');

    // Mensagem
    alert('Email inválido!');
    return;
  }

  // Feedback positivo
  emailInput.classList.add('valido');
  emailInput.classList.remove('erro');

  // Processar login...
  console.log('Fazendo login...');
});`,
      relatedLesson: {
        title: 'JavaScript Fundamentos',
        url: '/learn/javascript-fundamentals'
      }
    },
    {
      id: 'quple-validation-example',
      title: 'Validação no Formulário do Quple',
      type: 'example',
      content: `Vamos implementar a validação completa do formulário de login do Quple!

**Requisitos:**
• Email: Deve conter @ e .
• Senha: Mínimo 8 caracteres
• Feedback visual em tempo real
• Mensagens de erro claras

**Funcionalidades extras:**
• Validar enquanto digita (blur event)
• Desabilitar botão se inválido
• Loading ao submeter
• Mensagem de sucesso

**Estados:**
1. Inicial: Campos limpos
2. Digitando: Validação em tempo real
3. Inválido: Borda vermelha + mensagem
4. Válido: Borda verde + ✓
5. Submetendo: Loading spinner
6. Sucesso: Mensagem + redirecionamento

**Aplicação real:**
Este é EXATAMENTE o padrão usado no Quple para todos os formulários (login, cadastro, criar objetivo, etc).`,
      codeExample: `// HTML do Quple
<form id="quple-login">
  <div class="form-group">
    <label>Email</label>
    <input type="email" id="email" required>
    <span class="erro-msg"></span>
  </div>

  <div class="form-group">
    <label>Senha</label>
    <input type="password" id="senha" required minlength="8">
    <span class="erro-msg"></span>
  </div>

  <button type="submit" id="btn-login">Entrar</button>
</form>

// JavaScript
const form = document.querySelector('#quple-login');
const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const btn = document.querySelector('#btn-login');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar
  if (!email.value.includes('@')) {
    mostrarErro(email, 'Email inválido');
    return;
  }

  if (senha.value.length < 8) {
    mostrarErro(senha, 'Senha muito curta');
    return;
  }

  // Loading
  btn.textContent = 'Entrando...';
  btn.disabled = true;

  // Processar login (API)
  // ...

  // Sucesso!
  btn.textContent = 'Sucesso! ✓';
  setTimeout(() => {
    window.location.href = '/dashboard';
  }, 1000);
});

function mostrarErro(input, mensagem) {
  input.classList.add('erro');
  const erroMsg = input.nextElementSibling;
  erroMsg.textContent = mensagem;
}`,
      relatedLesson: {
        title: 'JavaScript Fundamentos',
        url: '/learn/javascript-fundamentals'
      }
    }
  ],
  10: [
    {
      id: 'react-components-intro',
      title: 'Componentes React - A Base de Tudo',
      type: 'concept',
      content: `React transforma HTML em componentes reutilizáveis. É como criar suas próprias tags HTML customizadas!

**Por que componentes?**
• Reutilização de código
• Organização melhor
• Manutenção mais fácil
• Testabilidade

**Analogia:**
Componente = Molde de bolo
Você cria o molde uma vez, e pode fazer infinitos bolos (instâncias).

**Tipos de componentes:**

1. **Function Component (moderno):**
\`\`\`jsx
function Botao() {
  return <button>Clique</button>
}
\`\`\`

2. **Class Component (legado):**
Ainda existe, mas não use em projetos novos.

**No Quple:**
Tudo é componente!
• QupleButton
• QupleCard
• QupleHeader
• QupleObjective
• etc...

**Composição:**
Componentes podem conter outros componentes, criando uma árvore.`,
      codeExample: `// Componente simples
function Botao() {
  return (
    <button className="btn-primary">
      Clique aqui
    </button>
  );
}

// Componente que usa outro componente
function Header() {
  return (
    <header>
      <h1>Quple</h1>
      <Botao /> {/* Reutilizando! */}
    </header>
  );
}

// Usar no app
function App() {
  return (
    <div>
      <Header />
      <Botao /> {/* Reutilizando novamente! */}
    </div>
  );
}`,
      relatedLesson: {
        title: 'React Introdução',
        url: '/learn/react-introduction'
      }
    },
    {
      id: 'jsx-syntax-basics',
      title: 'JSX - JavaScript + XML',
      type: 'tip',
      content: `JSX parece HTML, mas é JavaScript! O React transforma JSX em JavaScript puro.

**Diferenças do HTML:**

1. **className** ao invés de class
   \`<div className="card">\` (não "class")

2. **Fechar tags vazias**
   \`<img />\` ou \`<br />\` (sempre com /)

3. **camelCase para atributos**
   \`onClick\` (não "onclick")
   \`onChange\` (não "onchange")

4. **Expressões JavaScript com {}**
   \`<h1>{titulo}</h1>\`
   \`<img src={urlImagem} />\`

5. **Um único elemento raiz**
   Use \`<>\` (Fragment) ou \`<div>\`

**Regras importantes:**
• JavaScript dentro de {} (chaves)
• Sempre retornar UM elemento raiz
• Comentários: {/* assim */}

**Dica profissional:**
JSX é 99% igual a HTML. As diferenças você aprende rápido!`,
      codeExample: `// JSX básico
function QupleCard() {
  const nome = "Viajar para Paris";
  const concluido = true;

  return (
    <div className="card"> {/* className, não class */}
      <h2>{nome}</h2> {/* JavaScript entre {} */}

      {/* Condicional */}
      {concluido ? (
        <span>✓ Concluído</span>
      ) : (
        <span>⏳ Em progresso</span>
      )}

      {/* Evento com camelCase */}
      <button onClick={() => alert('Clicado!')}>
        Ver detalhes
      </button>
    </div>
  );
}

// Isso vira JavaScript!
// React.createElement('div', {className: 'card'}, ...)`,
      relatedLesson: {
        title: 'React Introdução',
        url: '/learn/react-introduction'
      }
    },
    {
      id: 'quple-component-example',
      title: 'Componente do Quple - Exemplo Real',
      type: 'example',
      content: `Vamos criar o componente QupleObjectiveCard que usamos no dashboard!

**Estrutura:**
• Props: título, descrição, status, progresso
• Visual: Card estilizado com informações
• Interação: Botão para ver detalhes

**Por que componentizar?**
• Usamos este card em várias páginas
• Se mudar o design, mudamos em 1 lugar só
• Testável isoladamente
• Fácil de entender

**Boas práticas aplicadas:**
• Nome descritivo (QupleObjectiveCard)
• Props tipadas (TypeScript)
• Estilização consistente (Tailwind)
• Acessibilidade (aria-labels)

**Próximo passo:**
Adicionar Props para tornar o componente dinâmico!`,
      codeExample: `// QupleObjectiveCard.tsx
function QupleObjectiveCard() {
  // Por enquanto, dados fixos
  // (Na próxima lição: props!)

  return (
    <div className="card">
      {/* Header do card */}
      <div className="card-header">
        <h3>Viajar para Paris</h3>
        <span className="badge">Em progresso</span>
      </div>

      {/* Corpo do card */}
      <p className="card-description">
        Planejar e realizar viagem romântica para Paris
        com o amor da minha vida ❤️
      </p>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{width: '60%'}} />
      </div>
      <span className="progress-text">60% concluído</span>

      {/* Ações */}
      <div className="card-actions">
        <button className="btn-primary">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}

// Usar no Dashboard
function Dashboard() {
  return (
    <div>
      <h1>Meus Objetivos</h1>
      <QupleObjectiveCard /> {/* Componente reutilizável! */}
      <QupleObjectiveCard /> {/* Mesmos dados por enquanto */}
    </div>
  );
}

// Próximo desafio: Props para dados dinâmicos!`,
      relatedLesson: {
        title: 'React Componentes',
        url: '/learn/react-components'
      }
    }
  ]
}

export function ModalPocket({ isOpen, onClose, challengeId }: ModalPocketProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const pocketContents = pocketData[challengeId] || []

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || pocketContents.length === 0) return null

  const currentContent = pocketContents[currentIndex]

  const goToNext = () => {
    if (currentIndex < pocketContents.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="h-5 w-5" />
      case 'concept':
        return <BookOpen className="h-5 w-5" />
      case 'example':
        return <Code className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tip':
        return 'text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/20'
      case 'concept':
        return 'text-primary bg-primary/20'
      case 'example':
        return 'text-accent bg-accent/20'
      default:
        return 'text-primary bg-primary/20'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'tip':
        return 'Dica'
      case 'concept':
        return 'Conceito'
      case 'example':
        return 'Exemplo'
      default:
        return 'Ajuda'
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className={cn(
            "relative w-full max-w-2xl glass-card rounded-2xl shadow-2xl transform transition-all duration-300",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-lg", getTypeColor(currentContent.type))}>
                {getTypeIcon(currentContent.type)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    getTypeColor(currentContent.type)
                  )}>
                    {getTypeLabel(currentContent.type)}
                  </span>
                  {pocketContents.length > 1 && (
                    <span className="text-xs text-muted-foreground">
                      {currentIndex + 1} de {pocketContents.length}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-foreground mt-1">
                  {currentContent.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Text Content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {currentContent.content}
              </div>
            </div>

            {/* Code Example */}
            {currentContent.codeExample && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <span className="text-sm font-medium text-foreground">Exemplo:</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-foreground">{currentContent.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Related Lesson */}
            {currentContent.relatedLesson && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary">
                      Quer saber mais?
                    </div>
                    <div className="text-sm text-foreground">
                      {currentContent.relatedLesson.title}
                    </div>
                  </div>
                  <a
                    href={currentContent.relatedLesson.url}
                    className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                    onClick={() => onClose()}
                  >
                    <span className="text-sm font-medium">Ver lição</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          {pocketContents.length > 1 && (
            <div className="flex items-center justify-between p-6 border-t border-border">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all",
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "glass-card premium-hover"
                )}
              >
                <span>Anterior</span>
              </button>

              <div className="flex space-x-2">
                {pocketContents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                disabled={currentIndex === pocketContents.length - 1}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all",
                  currentIndex === pocketContents.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "btn-primary-gradient premium-hover"
                )}
              >
                <span>Próximo</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}