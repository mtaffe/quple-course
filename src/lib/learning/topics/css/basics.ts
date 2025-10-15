/**
 * CSS Basics - Complete Content
 *
 * This topic covers the essential concepts of CSS, including selectors,
 * syntax, the box model, positioning, and responsive design fundamentals.
 */

import { Topic } from '../../types'

export const cssBasics: Topic = {
  id: 'css-basics',
  title: 'CSS Essencial',
  description: 'Seletores, box model, positioning e responsividade',
  category: 'css',
  difficulty: 'beginner',
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
          type: 'theory',
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
          type: 'example',
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
}
