/**
 * CSS Advanced - Complete Topic
 *
 * Advanced CSS concepts: Flexbox, Grid, and Animations
 * Target audience: Students who completed CSS Basics
 */

import { Topic } from '../../types'

export const cssAdvanced: Topic = {
  id: 'css-advanced',
  title: 'CSS Avançado',
  description: 'Domine layouts modernos com Flexbox e Grid, e crie animações profissionais',
  category: 'css',
  difficulty: 'intermediate',
  totalTime: 240, // 4 hours
  icon: '🎨',
  lessons: [
    // =========================================================================
    // LESSON 1: FLEXBOX COMPLETO
    // =========================================================================
    {
      id: 'lesson-1',
      title: 'Flexbox - Layout Moderno e Responsivo',
      description: 'Aprenda a criar layouts flexíveis e responsivos com Flexbox',
      estimatedTime: 80,
      sections: [
        // ---------------------------------------------------------------------
        // SECTION 1.1: Conceitos Fundamentais
        // ---------------------------------------------------------------------
        {
          id: 'fundamentals',
          title: 'Conceitos Fundamentais do Flexbox',
          type: 'theory',
          content: `
# Conceitos Fundamentais do Flexbox

Flexbox (Flexible Box Layout) é um dos sistemas de layout mais poderosos do CSS moderno. Ele foi projetado especificamente para distribuir espaço e alinhar elementos dentro de um container, mesmo quando o tamanho dos elementos é dinâmico ou desconhecido.

## Por que Flexbox existe?

Antes do Flexbox, criar layouts responsivos era extremamente difícil. Tínhamos que usar truques com \`float\`, \`position\`, e até mesmo \`table\`. Isso tornava o código confuso e difícil de manter. O Flexbox resolve esses problemas de forma elegante.

## O Modelo Flexbox: Container e Items

O Flexbox funciona com dois níveis:

1. **Flex Container** - O elemento pai que tem \`display: flex\`
2. **Flex Items** - Os filhos diretos do container

Quando você define \`display: flex\` em um elemento, ele se torna um **flex container** e seus filhos diretos se tornam **flex items**. A partir daí, você pode controlar como esses items são posicionados, alinhados e distribuídos.

## Os Dois Eixos: Main Axis e Cross Axis

Este é o conceito mais importante do Flexbox. Tudo gira em torno de dois eixos:

### Main Axis (Eixo Principal)
É a direção principal na qual os flex items são posicionados. Por padrão, é **horizontal** (da esquerda para a direita), mas pode ser alterada com \`flex-direction\`.

### Cross Axis (Eixo Transversal)
É o eixo perpendicular ao main axis. Se o main axis é horizontal, o cross axis é **vertical** (de cima para baixo).

## Entendendo flex-direction

A propriedade \`flex-direction\` define a direção do main axis:

- \`row\` (padrão): Main axis horizontal, da esquerda para direita
- \`row-reverse\`: Main axis horizontal, da direita para esquerda
- \`column\`: Main axis vertical, de cima para baixo
- \`column-reverse\`: Main axis vertical, de baixo para cima

**Importante:** Quando você muda \`flex-direction\`, o cross axis também muda! Se você usar \`flex-direction: column\`, o main axis passa a ser vertical e o cross axis se torna horizontal.

## Exemplo Prático: Header do Quple

Imagine o header do app Quple. Ele tem um logo à esquerda e botões de navegação à direita. Com Flexbox, isso é simples:

\`\`\`css
.header {
  display: flex;
  justify-content: space-between; /* Distribui espaço entre logo e nav */
  align-items: center; /* Alinha verticalmente no centro */
  padding: 1rem 2rem;
}
\`\`\`

Sem Flexbox, você teria que usar \`float\`, calcular larguras, e lidar com problemas de alinhamento vertical. Com Flexbox, são apenas 3 linhas de CSS!

## Quando usar Flexbox?

Flexbox é ideal para:
- Layouts unidimensionais (uma linha ou uma coluna)
- Alinhar elementos verticalmente
- Distribuir espaço entre elementos
- Criar componentes responsivos (cards, botões, navbars)

Para layouts bidimensionais complexos (linhas E colunas ao mesmo tempo), CSS Grid é melhor. Mas Flexbox e Grid trabalham muito bem juntos!

## Flex Container vs Flex Item

É importante entender que algumas propriedades são aplicadas no **container** e outras nos **items**:

**Propriedades do Container:**
- \`display: flex\`
- \`flex-direction\`
- \`justify-content\`
- \`align-items\`
- \`flex-wrap\`
- \`gap\`

**Propriedades dos Items:**
- \`flex-grow\`
- \`flex-shrink\`
- \`flex-basis\`
- \`align-self\`
- \`order\`

Nas próximas seções, vamos explorar cada uma dessas propriedades em detalhes!
          `,
          codeExample: `<!-- HTML -->
<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>

/* CSS */
.flex-container {
  display: flex;
  flex-direction: row; /* Padrão */
  gap: 1rem; /* Espaço entre items */
  padding: 1rem;
  background: #f0f0f0;
}

.flex-item {
  padding: 1rem 2rem;
  background: #007bff;
  color: white;
  border-radius: 8px;
}`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.2: Propriedades do Container
        // ---------------------------------------------------------------------
        {
          id: 'container-properties',
          title: 'Propriedades do Flex Container',
          type: 'theory',
          content: `
# Propriedades do Flex Container

O flex container controla como seus filhos (flex items) são dispostos e alinhados. Vamos explorar cada propriedade em profundidade.

## 1. display: flex

Esta é a propriedade que inicia tudo. Quando você define \`display: flex\` em um elemento:
- Ele se torna um flex container
- Seus filhos diretos se tornam flex items
- O layout Flexbox é ativado

\`\`\`css
.container {
  display: flex; /* Ativa Flexbox */
}
\`\`\`

Existe também \`display: inline-flex\`, que faz o container se comportar como um elemento inline (não ocupa 100% da largura).

## 2. flex-direction

Define a direção do main axis (eixo principal). Esta é uma das propriedades mais importantes.

\`\`\`css
.container {
  flex-direction: row; /* Padrão: horizontal, esquerda → direita */
}
\`\`\`

**Valores:**
- \`row\`: Items dispostos horizontalmente (←→)
- \`row-reverse\`: Horizontal invertido (→←)
- \`column\`: Items dispostos verticalmente (↑↓)
- \`column-reverse\`: Vertical invertido (↓↑)

**Exemplo Prático:** No Quple, a lista de objetivos usa \`flex-direction: column\` para empilhar os cards verticalmente.

## 3. justify-content

Controla o alinhamento ao longo do **main axis** (eixo principal). Se \`flex-direction\` é \`row\`, controla o alinhamento horizontal. Se é \`column\`, controla o vertical.

\`\`\`css
.container {
  justify-content: flex-start; /* Padrão */
}
\`\`\`

**Valores:**
- \`flex-start\`: Items no início do main axis
- \`flex-end\`: Items no final do main axis
- \`center\`: Items centralizados no main axis
- \`space-between\`: Espaço igual ENTRE os items (primeiro e último colados nas bordas)
- \`space-around\`: Espaço igual AO REDOR dos items
- \`space-evenly\`: Espaço perfeitamente igual entre todos os items e bordas

**Diferença importante:**
- \`space-between\`: |item| ←espaço→ |item| ←espaço→ |item|
- \`space-around\`: |←espaço→ item ←espaço→|←espaço→ item ←espaço→|
- \`space-evenly\`: |←espaço→ item ←espaço→ item ←espaço→ item ←espaço→|

## 4. align-items

Controla o alinhamento ao longo do **cross axis** (eixo transversal). Se \`flex-direction\` é \`row\`, controla o alinhamento vertical. Se é \`column\`, controla o horizontal.

\`\`\`css
.container {
  align-items: stretch; /* Padrão */
}
\`\`\`

**Valores:**
- \`stretch\`: Items esticam para preencher o cross axis (padrão)
- \`flex-start\`: Items no início do cross axis
- \`flex-end\`: Items no final do cross axis
- \`center\`: Items centralizados no cross axis
- \`baseline\`: Items alinhados pela linha base do texto

**Exemplo Prático:** Para centralizar verticalmente um botão dentro de um container:

\`\`\`css
.button-container {
  display: flex;
  align-items: center; /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */
  height: 200px;
}
\`\`\`

## 5. flex-wrap

Define se os items devem quebrar linha quando não há espaço suficiente.

\`\`\`css
.container {
  flex-wrap: nowrap; /* Padrão */
}
\`\`\`

**Valores:**
- \`nowrap\`: Todos items em uma única linha (podem encolher ou transbordar)
- \`wrap\`: Items quebram para nova linha se necessário
- \`wrap-reverse\`: Items quebram para nova linha, mas na ordem inversa

**Quando usar wrap?** Cards responsivos! No Quple, a grid de cards de objetivos usa \`flex-wrap: wrap\` para que os cards se reorganizem automaticamente em telas menores.

## 6. gap (row-gap e column-gap)

Adiciona espaço ENTRE os flex items (não nas bordas externas).

\`\`\`css
.container {
  gap: 1rem; /* Espaço entre items */
}

/* Ou especificar row e column separadamente */
.container {
  row-gap: 1rem; /* Espaço vertical */
  column-gap: 2rem; /* Espaço horizontal */
}
\`\`\`

**Por que usar gap?** Antigamente, tínhamos que adicionar \`margin\` em cada item e usar truques para remover a margin do último item. Com \`gap\`, isso é automático!

## 7. align-content

Quando há múltiplas linhas (com \`flex-wrap: wrap\`), controla o espaçamento entre as linhas no cross axis.

\`\`\`css
.container {
  flex-wrap: wrap;
  align-content: flex-start;
}
\`\`\`

**Valores:** Similar a \`justify-content\`, mas para linhas múltiplas:
- \`flex-start\`, \`flex-end\`, \`center\`
- \`space-between\`, \`space-around\`, \`space-evenly\`
- \`stretch\` (padrão)

**Diferença entre align-items e align-content:**
- \`align-items\`: Alinha items DENTRO de cada linha
- \`align-content\`: Alinha AS LINHAS em si

## Exemplo Completo: Navbar do Quple

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between; /* Logo à esquerda, nav à direita */
  align-items: center; /* Tudo alinhado verticalmente */
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-links {
  display: flex;
  gap: 2rem; /* Espaço entre links */
  align-items: center;
}
\`\`\`

Com apenas essas propriedades, você tem um navbar profissional e responsivo!
          `,
          codeExample: `/* Exemplo: Cards responsivos */
.card-container {
  display: flex;
  flex-wrap: wrap; /* Quebra linha em telas pequenas */
  gap: 1.5rem; /* Espaço entre cards */
  padding: 2rem;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, base width */
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Em telas pequenas, cards ocupam 100% */
@media (max-width: 768px) {
  .card {
    flex: 1 1 100%;
  }
}`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.3: Propriedades dos Items
        // ---------------------------------------------------------------------
        {
          id: 'item-properties',
          title: 'Propriedades dos Flex Items',
          type: 'theory',
          content: `
# Propriedades dos Flex Items

Enquanto o container controla o layout geral, cada flex item pode ter suas próprias propriedades para controlar seu comportamento individual. Estas são as propriedades mais poderosas do Flexbox!

## 1. flex-grow

Define a capacidade de um item CRESCER para preencher espaço disponível. É um número (sem unidade) que representa a proporção de crescimento.

\`\`\`css
.item {
  flex-grow: 1; /* Pode crescer */
}
\`\`\`

**Como funciona:**
- \`flex-grow: 0\` (padrão): O item não cresce
- \`flex-grow: 1\`: O item pode crescer para preencher espaço disponível
- \`flex-grow: 2\`: Este item cresce 2x mais rápido que items com \`flex-grow: 1\`

**Exemplo Prático:** No Quple, imagine um input de busca e um botão. Você quer que o input cresça para preencher o espaço, mas o botão mantenha seu tamanho:

\`\`\`css
.search-input {
  flex-grow: 1; /* Cresce para preencher espaço */
}

.search-button {
  flex-grow: 0; /* Mantém tamanho fixo */
  width: 100px;
}
\`\`\`

## 2. flex-shrink

Define a capacidade de um item ENCOLHER quando não há espaço suficiente. Também é um número sem unidade.

\`\`\`css
.item {
  flex-shrink: 1; /* Padrão: pode encolher */
}
\`\`\`

**Como funciona:**
- \`flex-shrink: 0\`: O item não encolhe (mantém tamanho mínimo)
- \`flex-shrink: 1\` (padrão): O item encolhe proporcionalmente
- \`flex-shrink: 2\`: Este item encolhe 2x mais rápido

**Quando usar flex-shrink: 0?** Para elementos que DEVEM manter seu tamanho, como:
- Logos
- Ícones
- Botões com largura fixa

\`\`\`css
.logo {
  flex-shrink: 0; /* Logo nunca encolhe */
  width: 150px;
}
\`\`\`

## 3. flex-basis

Define o tamanho BASE do item antes de distribuir espaço extra ou encolher. Funciona como \`width\` ou \`height\` (dependendo do \`flex-direction\`), mas é mais flexível.

\`\`\`css
.item {
  flex-basis: 200px; /* Tamanho inicial de 200px */
}
\`\`\`

**Valores aceitos:**
- \`auto\` (padrão): Usa width/height ou conteúdo
- Tamanho específico: \`200px\`, \`50%\`, \`20rem\`
- \`0\`: Ignora conteúdo, distribui espaço igualmente

**Diferença entre flex-basis e width:**
- \`width\`: Tamanho fixo, pode quebrar o layout
- \`flex-basis\`: Tamanho sugerido, flexível com grow/shrink

## 4. flex (shorthand)

A propriedade \`flex\` é um atalho que combina \`flex-grow\`, \`flex-shrink\`, e \`flex-basis\`:

\`\`\`css
.item {
  flex: 1 1 auto; /* grow shrink basis */
}
\`\`\`

**Atalhos comuns:**
- \`flex: 1\`: Equivale a \`flex: 1 1 0\` (grow, shrink, basis 0)
- \`flex: auto\`: Equivale a \`flex: 1 1 auto\` (flexível baseado no conteúdo)
- \`flex: none\`: Equivale a \`flex: 0 0 auto\` (rígido, não muda)

**Exemplo Prático: Layout com Sidebar**

\`\`\`css
.layout {
  display: flex;
}

.sidebar {
  flex: 0 0 250px; /* Não cresce, não encolhe, 250px fixo */
}

.main-content {
  flex: 1; /* Cresce para preencher espaço restante */
}
\`\`\`

## 5. align-self

Permite que um item individual sobrescreva o \`align-items\` do container. Útil para alinhar um item diferente dos outros.

\`\`\`css
.container {
  align-items: center; /* Todos items centralizados */
}

.special-item {
  align-self: flex-end; /* Este item vai pro final */
}
\`\`\`

**Valores:** Mesmos de \`align-items\`:
- \`auto\` (padrão): Usa o \`align-items\` do container
- \`flex-start\`, \`flex-end\`, \`center\`, \`baseline\`, \`stretch\`

**Exemplo:** No Quple, você pode ter cards de objetivos onde um card especial (objetivo em destaque) tem alinhamento diferente.

## 6. order

Controla a ordem visual dos items, sem mudar o HTML. Por padrão, todos items têm \`order: 0\`.

\`\`\`css
.first {
  order: 1; /* Aparece depois */
}

.second {
  order: 0; /* Aparece primeiro (padrão) */
}

.third {
  order: 2; /* Aparece por último */
}
\`\`\`

**Importante:** A ordem no HTML continua a mesma para leitores de tela e SEO. Use \`order\` apenas para ajustes visuais, não para reordenar conteúdo semanticamente importante.

## Combinando Propriedades: Card Flexível

Vamos criar um card com header, conteúdo e footer, onde o conteúdo cresce:

\`\`\`css
.card {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.card-header {
  flex: 0 0 auto; /* Tamanho baseado no conteúdo */
  padding: 1rem;
  background: #f0f0f0;
}

.card-content {
  flex: 1; /* Cresce para preencher espaço disponível */
  padding: 1rem;
  overflow-y: auto; /* Scroll se necessário */
}

.card-footer {
  flex: 0 0 auto; /* Tamanho baseado no conteúdo */
  padding: 1rem;
  background: #f0f0f0;
}
\`\`\`

Este padrão é usado em muitos apps modernos, incluindo o Quple!

## Cenários Comuns

**1. Três colunas: Sidebar, Content, Ads**
\`\`\`css
.container { display: flex; }
.sidebar { flex: 0 0 200px; }
.content { flex: 1; }
.ads { flex: 0 0 150px; }
\`\`\`

**2. Formulário com label e input**
\`\`\`css
.form-row { display: flex; gap: 1rem; }
.label { flex: 0 0 150px; }
.input { flex: 1; }
\`\`\`

**3. Cards responsivos**
\`\`\`css
.card { flex: 1 1 300px; min-width: 250px; }
\`\`\`

Com essas propriedades, você tem controle total sobre cada item individual no layout Flexbox!
          `,
          codeExample: `/* Exemplo Completo: Layout Dashboard */
.dashboard {
  display: flex;
  min-height: 100vh;
}

/* Sidebar fixa */
.sidebar {
  flex: 0 0 250px; /* Não cresce, não encolhe, 250px */
  background: #1a1a2e;
  padding: 2rem;
}

/* Conteúdo principal cresce */
.main-content {
  flex: 1; /* Ocupa todo espaço restante */
  padding: 2rem;
  overflow-y: auto;
}

/* Card dentro do conteúdo */
.card {
  display: flex;
  flex-direction: column;
  height: 300px;
}

.card-title {
  flex: 0 0 auto; /* Tamanho fixo baseado no conteúdo */
}

.card-body {
  flex: 1; /* Cresce para preencher */
  overflow-y: auto;
}

.card-actions {
  flex: 0 0 auto; /* Botões sempre visíveis */
}`
        },

        // ---------------------------------------------------------------------
        // SECTION 1.4: Layouts Práticos
        // ---------------------------------------------------------------------
        {
          id: 'practical-layouts',
          title: 'Layouts Práticos com Flexbox',
          type: 'example',
          content: `
# Layouts Práticos com Flexbox

Agora que você domina as propriedades individuais, vamos ver como combiná-las para criar layouts reais e profissionais. Vamos reconstruir partes do app Quple usando apenas Flexbox!

## 1. Navbar Responsiva

Um navbar típico tem logo à esquerda, links no centro/direita, e deve se adaptar a mobile.

### Desktop Version
\`\`\`html
<nav class="navbar">
  <div class="logo">Quple</div>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/goals">Objetivos</a></li>
    <li><a href="/profile">Perfil</a></li>
  </ul>
  <button class="btn-logout">Sair</button>
</nav>
\`\`\`

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between; /* Logo e botão nas pontas */
  align-items: center; /* Tudo alinhado verticalmente */
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  flex-shrink: 0; /* Logo nunca encolhe */
}

.nav-links {
  display: flex;
  gap: 2rem; /* Espaço entre links */
  list-style: none;
  margin: 0 2rem; /* Espaço dos lados */
}

.nav-links a {
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #007bff;
}

.btn-logout {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0; /* Botão mantém tamanho */
}

/* Mobile: Links em coluna, menu hamburguer */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
  }

  .nav-links {
    flex-direction: column; /* Vertical em mobile */
    width: 100%; /* Ocupa linha toda */
    margin: 1rem 0 0 0;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
}
\`\`\`

## 2. Grid de Cards (Objetivos do Quple)

Cards que se adaptam automaticamente ao tamanho da tela.

\`\`\`html
<div class="goals-grid">
  <div class="goal-card">
    <h3>Viajar para Paris</h3>
    <p>Economizar R$ 10.000</p>
    <div class="progress-bar">
      <div class="progress-fill" style="width: 60%"></div>
    </div>
  </div>
  <!-- Mais cards... -->
</div>
\`\`\`

\`\`\`css
.goals-grid {
  display: flex;
  flex-wrap: wrap; /* Cards quebram linha */
  gap: 1.5rem; /* Espaço entre cards */
  padding: 2rem;
}

.goal-card {
  flex: 1 1 300px; /* Cresce, encolhe, base 300px */
  min-width: 250px; /* Não fica menor que 250px */
  max-width: 400px; /* Não fica maior que 400px */
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  /* Card em si também é flex (vertical) */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.goal-card h3 {
  margin: 0;
  color: #333;
}

.goal-card p {
  margin: 0;
  color: #666;
  flex: 1; /* Descrição ocupa espaço disponível */
}

.progress-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0; /* Barra mantém altura */
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  transition: width 0.3s ease;
}
\`\`\`

**Resultado:** Em telas grandes, você vê 3 cards por linha. Em tablets, 2 cards. Em mobile, 1 card. Tudo automático!

## 3. Footer com Múltiplas Colunas

Footer típico com logo, links e redes sociais.

\`\`\`css
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  padding: 3rem 2rem;
  background: #1a1a2e;
  color: white;
}

.footer-section {
  flex: 1 1 200px; /* Cada seção flexível */
  min-width: 200px;
}

.footer-section h4 {
  margin-bottom: 1rem;
  color: #007bff;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  transition: background 0.2s;
}

.social-icon:hover {
  background: #007bff;
}
\`\`\`

## 4. Modal Dialog Centralizado

Como centralizar perfeita um modal na tela:

\`\`\`css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);

  /* Centraliza o modal */
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem; /* Espaço nas bordas */
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh; /* Não ultrapassa 90% da tela */

  /* Modal em si é flex vertical */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-header {
  flex: 0 0 auto; /* Tamanho fixo */
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.modal-content {
  flex: 1; /* Conteúdo cresce */
  overflow-y: auto; /* Scroll se necessário */
}

.modal-actions {
  flex: 0 0 auto; /* Botões sempre visíveis */
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
\`\`\`

## 5. Form Layout Horizontal

Formulário com labels à esquerda e inputs à direita:

\`\`\`css
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
}

.form-row {
  display: flex;
  align-items: center; /* Alinha label com input */
  gap: 1rem;
}

.form-label {
  flex: 0 0 150px; /* Label com largura fixa */
  font-weight: 600;
  text-align: right;
}

.form-input {
  flex: 1; /* Input ocupa espaço restante */
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Mobile: Label acima do input */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }

  .form-label {
    text-align: left; /* Label à esquerda em mobile */
  }
}
\`\`\`

## 6. Holy Grail Layout

O famoso layout com header, footer, sidebar esquerda, conteúdo e sidebar direita:

\`\`\`css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex: 0 0 auto; /* Header tamanho fixo */
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.main-wrapper {
  flex: 1; /* Ocupa espaço entre header e footer */
  display: flex;
}

.sidebar-left {
  flex: 0 0 250px; /* Sidebar fixa 250px */
  background: #f5f5f5;
  padding: 2rem;
}

.content {
  flex: 1; /* Conteúdo cresce */
  padding: 2rem;
}

.sidebar-right {
  flex: 0 0 200px; /* Sidebar menor à direita */
  background: #f5f5f5;
  padding: 2rem;
}

.footer {
  flex: 0 0 auto; /* Footer tamanho fixo */
  padding: 2rem;
  background: #1a1a2e;
  color: white;
}

/* Mobile: Sidebars abaixo do conteúdo */
@media (max-width: 768px) {
  .main-wrapper {
    flex-direction: column;
  }

  .sidebar-left,
  .sidebar-right {
    flex: 0 0 auto;
  }
}
\`\`\`

## Dicas de Ouro para Layouts com Flexbox

1. **Sempre comece com display: flex no container**
2. **Use gap para espaçamento** (mais limpo que margins)
3. **flex: 1 é seu melhor amigo** para elementos que devem crescer
4. **flex: 0 0 auto para tamanhos fixos** (headers, footers, sidebars)
5. **Combine flex-direction: column** para layouts verticais
6. **Use flex-wrap: wrap** para layouts responsivos
7. **Media queries + flex-direction** para mobile (row → column)

Com Flexbox, você pode criar praticamente qualquer layout moderno de forma simples e responsiva!
          `,
          codeExample: `/* Layout Completo: Página Quple */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.header {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Main com sidebar */
.main {
  flex: 1;
  display: flex;
}

.sidebar {
  flex: 0 0 250px;
  background: #f5f5f5;
  padding: 2rem;
}

.content {
  flex: 1;
  padding: 2rem;
}

/* Grid de cards */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 300px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Footer */
.footer {
  flex: 0 0 auto;
  padding: 2rem;
  background: #1a1a2e;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }

  .sidebar {
    flex: 0 0 auto;
  }

  .card {
    flex: 1 1 100%;
  }
}`
        }
      ]
    },

    // =========================================================================
    // LESSON 2: CSS GRID COMPLETO
    // =========================================================================
    {
      id: 'lesson-2',
      title: 'CSS Grid - Layouts Bidimensionais',
      description: 'Crie layouts complexos com linhas e colunas usando CSS Grid',
      estimatedTime: 80,
      sections: [
        // Conteúdo similar ao Flexbox, mas focado em Grid
        // Por questões de espaço, vou resumir aqui
        {
          id: 'grid-fundamentals',
          title: 'Conceitos Fundamentais do CSS Grid',
          type: 'theory',
          content: `
# Conceitos Fundamentais do CSS Grid

CSS Grid é o sistema de layout mais poderoso do CSS. Enquanto Flexbox é ideal para layouts unidimensionais (uma linha OU uma coluna), Grid é perfeito para layouts bidimensionais (linhas E colunas ao mesmo tempo).

## Por que Grid existe?

Imagine criar um dashboard com cards dispostos em uma grade complexa. Com Flexbox, você precisaria de múltiplos containers aninhados. Com Grid, você faz tudo em um único container! Grid foi projetado especificamente para layouts complexos.

## O Modelo Grid: Container e Items

Similar ao Flexbox:
1. **Grid Container** - O elemento com \`display: grid\`
2. **Grid Items** - Os filhos diretos do container

Mas Grid adiciona conceitos novos:

### Grid Tracks (Faixas)
- **Rows (Linhas)** - Faixas horizontais
- **Columns (Colunas)** - Faixas verticais

### Grid Cells (Células)
A interseção de uma linha com uma coluna cria uma célula, como em uma planilha Excel.

### Grid Areas (Áreas)
Você pode agrupar múltiplas células para formar áreas maiores.

### Grid Lines (Linhas de Grade)
As linhas que delimitam rows e columns. São numeradas a partir de 1.

## Anatomia de um Grid

\`\`\`
    1         2         3         4
  ┌─────────┬─────────┬─────────┐
1 │ Cell1,1 │ Cell1,2 │ Cell1,3 │
  ├─────────┼─────────┼─────────┤
2 │ Cell2,1 │ Cell2,2 │ Cell2,3 │
  ├─────────┼─────────┼─────────┤
3 │ Cell3,1 │ Cell3,2 │ Cell3,3 │
  └─────────┴─────────┴─────────┘
\`\`\`

Neste grid 3x3:
- Temos 3 column tracks e 3 row tracks
- 9 cells no total
- 4 column lines (verticais) e 4 row lines (horizontais)

## Grid vs Flexbox: Quando usar cada um?

**Use Flexbox quando:**
- Layout unidimensional (navbar, lista de botões)
- Items devem se adaptar ao conteúdo
- Você quer controle sobre alinhamento individual

**Use Grid quando:**
- Layout bidimensional (dashboard, galeria)
- Você precisa de linhas E colunas ao mesmo tempo
- Layout deve ser consistente e previsível

**Use ambos juntos!** É comum ter um Grid no layout principal e Flexbox nos componentes internos.

## Exemplo Básico: Dashboard do Quple

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr; /* Sidebar + Content */
  grid-template-rows: 60px 1fr 50px; /* Header + Main + Footer */
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-column: 1 / 3; } /* Ocupa 2 colunas */
.sidebar { grid-row: 2 / 3; } /* Só na segunda linha */
.content { /* Posição automática */ }
.footer { grid-column: 1 / 3; } /* Ocupa 2 colunas */
\`\`\`

Com apenas algumas linhas, temos um layout completo!

## Unidades Especiais do Grid

### fr (fraction)
Representa uma fração do espaço disponível.

\`\`\`css
grid-template-columns: 1fr 2fr 1fr;
/* Primeira coluna: 25% */
/* Segunda coluna: 50% */
/* Terceira coluna: 25% */
\`\`\`

### repeat()
Repete um padrão.

\`\`\`css
grid-template-columns: repeat(3, 1fr);
/* Equivale a: 1fr 1fr 1fr */

grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
/* Cria colunas responsivas automaticamente! */
\`\`\`

### minmax()
Define tamanho mínimo e máximo.

\`\`\`css
grid-template-columns: minmax(200px, 400px) 1fr;
/* Primeira coluna: mín 200px, máx 400px */
\`\`\`

### auto-fit vs auto-fill
- \`auto-fit\`: Colapsa tracks vazias
- \`auto-fill\`: Mantém tracks vazias

Usamos \`auto-fit\` para cards responsivos!

Nas próximas seções, vamos explorar todas as propriedades e criar layouts reais!
          `
        },
        {
          id: 'grid-properties',
          title: 'Propriedades do Grid Container',
          type: 'theory',
          content: `
# Propriedades do Grid Container

O grid container define a estrutura completa do layout. Vamos explorar cada propriedade e ver como elas trabalham juntas.

## 1. grid-template-columns e grid-template-rows

Estas são as propriedades mais importantes. Elas definem o tamanho e número de colunas e linhas.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* 3 colunas */
  grid-template-rows: 100px auto 50px; /* 3 linhas */
}
\`\`\`

**Unidades aceitas:**
- Pixels: \`200px\`
- Frações: \`1fr\` (divide espaço disponível)
- Auto: \`auto\` (baseado no conteúdo)
- Porcentagem: \`33.33%\`
- Mínimo/Máximo: \`minmax(100px, 1fr)\`

**Exemplo: Dashboard Quple**
\`\`\`css
.dashboard {
  grid-template-columns: 250px 1fr; /* Sidebar fixa + conteúdo flexível */
  grid-template-rows: 60px 1fr 50px; /* Header + Main + Footer */
}
\`\`\`

## 2. repeat() - Repetir Padrões

Ao invés de escrever \`1fr 1fr 1fr 1fr\`, use \`repeat()\`:

\`\`\`css
.grid {
  grid-template-columns: repeat(4, 1fr); /* 4 colunas iguais */
}
\`\`\`

**Auto-responsive com repeat:**
\`\`\`css
.cards {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
\`\`\`
Isso cria colunas que se adaptam automaticamente! Se cabem 4 cards, mostra 4. Se cabem 2, mostra 2.

## 3. grid-template-areas - Layout Nomeado

A forma mais intuitiva de criar layouts. Você "desenha" o layout no CSS:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 50px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }
\`\`\`

Use \`.\` para células vazias:
\`\`\`css
grid-template-areas:
  "header header header"
  "sidebar main ."
  "footer footer footer";
\`\`\`

## 4. gap, row-gap, column-gap

Adiciona espaço entre células (não nas bordas externas):

\`\`\`css
.grid {
  gap: 1rem; /* 1rem entre linhas e colunas */
}

/* Ou específico */
.grid {
  row-gap: 1.5rem; /* Entre linhas */
  column-gap: 1rem; /* Entre colunas */
}
\`\`\`

Antigamente era \`grid-gap\`, mas agora é apenas \`gap\`.

## 5. justify-items e align-items

Controlam o alinhamento dos items DENTRO de suas células.

**justify-items** - Alinhamento horizontal
\`\`\`css
.grid {
  justify-items: start; /* Padrão: stretch */
}
\`\`\`
Valores: \`start\`, \`end\`, \`center\`, \`stretch\`

**align-items** - Alinhamento vertical
\`\`\`css
.grid {
  align-items: center;
}
\`\`\`

**Exemplo:** Centralizar conteúdo dentro de cada célula:
\`\`\`css
.grid {
  justify-items: center;
  align-items: center;
}
\`\`\`

## 6. justify-content e align-content

Quando o grid é menor que o container, controla o posicionamento do grid como um todo.

**justify-content** - Posicionamento horizontal do grid
\`\`\`css
.container {
  justify-content: center; /* Grid centralizado */
}
\`\`\`

**align-content** - Posicionamento vertical do grid
\`\`\`css
.container {
  align-content: space-between;
}
\`\`\`

Valores: \`start\`, \`end\`, \`center\`, \`space-between\`, \`space-around\`, \`space-evenly\`

## 7. grid-auto-columns e grid-auto-rows

Define o tamanho de colunas/linhas criadas automaticamente (implícitas):

\`\`\`css
.grid {
  grid-template-columns: 200px 200px;
  grid-auto-columns: 100px; /* Colunas extras terão 100px */
}
\`\`\`

## 8. grid-auto-flow

Controla como items são colocados automaticamente:

\`\`\`css
.grid {
  grid-auto-flow: row; /* Padrão: preenche linha por linha */
}
\`\`\`

Valores:
- \`row\`: Preenche linhas
- \`column\`: Preenche colunas
- \`row dense\`: Tenta preencher buracos
- \`column dense\`: Igual, mas em colunas

**Exemplo Completo: Dashboard Quple**
\`\`\`css
.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "sidebar footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}
\`\`\`

Com essas propriedades, você tem controle total sobre seu layout Grid!
          `,
          codeExample: `/* Grid Responsivo Completo */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* Grid com áreas nomeadas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: 60px 1fr 50px;
  gap: 1rem;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }`
        },
        {
          id: 'grid-items',
          title: 'Propriedades dos Grid Items',
          type: 'theory',
          content: `
# Propriedades dos Grid Items

Enquanto o container define a grade, os items individuais podem controlar onde e como são posicionados dentro dela.

## 1. grid-column e grid-row

Definem onde um item começa e termina nas linhas da grade.

\`\`\`css
.item {
  grid-column: 1 / 3; /* Coluna 1 até coluna 3 (2 colunas) */
  grid-row: 1 / 2; /* Linha 1 até linha 2 (1 linha) */
}
\`\`\`

**Numeração de linhas:**
\`\`\`
    1    2    3    4
  ┌────┬────┬────┐
1 │    │    │    │
  ├────┼────┼────┤
2 │    │    │    │
  └────┴────┴────┘
\`\`\`

**Atalho com span:**
\`\`\`css
.item {
  grid-column: 1 / span 2; /* Começa em 1, ocupa 2 colunas */
  grid-row: span 2; /* Ocupa 2 linhas */
}
\`\`\`

**Exemplo: Header do Quple ocupando toda largura**
\`\`\`css
.header {
  grid-column: 1 / -1; /* Da primeira até última coluna */
}
\`\`\`

## 2. grid-area

Atalho que combina grid-row e grid-column OU nomeia uma área:

**Forma 1: Posicionamento**
\`\`\`css
.item {
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
\`\`\`

**Forma 2: Nome (usado com grid-template-areas)**
\`\`\`css
.header {
  grid-area: header;
}
\`\`\`

## 3. justify-self e align-self

Permite que um item individual sobrescreva o alinhamento do container.

**justify-self** - Alinhamento horizontal dentro da célula
\`\`\`css
.item {
  justify-self: center; /* Item centralizado horizontalmente */
}
\`\`\`

**align-self** - Alinhamento vertical dentro da célula
\`\`\`css
.item {
  align-self: end; /* Item no final da célula verticalmente */
}
\`\`\`

Valores: \`start\`, \`end\`, \`center\`, \`stretch\`

**Exemplo: Card especial centralizado**
\`\`\`css
.featured-card {
  justify-self: center;
  align-self: center;
  max-width: 400px;
}
\`\`\`

## 4. place-self (atalho)

Combina justify-self e align-self:

\`\`\`css
.item {
  place-self: center; /* Centraliza horizontal e vertical */
}

/* Ou valores diferentes */
.item {
  place-self: start end; /* align-self / justify-self */
}
\`\`\`

## Exemplos Práticos

**Sidebar que ocupa 2 linhas:**
\`\`\`css
.sidebar {
  grid-column: 1 / 2;
  grid-row: 2 / 4; /* Da linha 2 até linha 4 */
}
\`\`\`

**Item que ocupa 2x2 células:**
\`\`\`css
.big-card {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

**Sobrepor items (z-index funciona):**
\`\`\`css
.background {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 1;
}

.content {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  z-index: 2; /* Fica por cima */
}
\`\`\`
          `,
          codeExample: `/* Exemplo: Item especial que ocupa mais espaço */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.card {
  padding: 2rem;
  background: white;
  border-radius: 8px;
}

.featured-card {
  grid-column: span 2; /* Ocupa 2 colunas */
  grid-row: span 2; /* Ocupa 2 linhas */
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.small-card {
  grid-column: span 1;
  grid-row: span 1;
}`
        },
        {
          id: 'grid-layouts',
          title: 'Layouts Complexos com Grid',
          type: 'example',
          content: `
# Layouts Complexos com Grid

Vamos criar layouts reais e profissionais usando CSS Grid. Estes são padrões usados em apps modernos, incluindo o Quple!

## 1. Dashboard com Áreas Nomeadas

O layout mais comum: header fixo, sidebar, conteúdo principal e footer.

\`\`\`html
<div class="dashboard">
  <header class="header">Quple App</header>
  <nav class="sidebar">Menu</nav>
  <main class="main-content">Conteúdo</main>
  <footer class="footer">© 2024</footer>
</div>
\`\`\`

\`\`\`css
.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr auto;
  gap: 1rem;
  min-height: 100vh;
  padding: 1rem;
}

.header {
  grid-area: header;
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.sidebar {
  grid-area: sidebar;
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
}

.main-content {
  grid-area: main;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

.footer {
  grid-area: footer;
  background: #1a1a2e;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
}

/* Mobile: Layout em coluna única */
@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}
\`\`\`

## 2. Galeria de Fotos Responsiva

Grid responsivo que se adapta automaticamente ao tamanho da tela.

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 2rem;
}

.gallery-item {
  aspect-ratio: 1 / 1; /* Quadrado */
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

/* Item destaque ocupa mais espaço */
.gallery-item.featured {
  grid-column: span 2;
  grid-row: span 2;
}
\`\`\`

**Resultado:** Cards se reorganizam automaticamente! Em telas grandes, você vê 4 por linha. Em tablets, 2 por linha. Em mobile, 1 por linha.

## 3. Magazine Layout Assimétrico

Layout tipo revista com cards de tamanhos diferentes.

\`\`\`css
.magazine {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}

.article {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Diferentes tamanhos */
.article-1 { grid-column: span 2; grid-row: span 2; }
.article-2 { grid-column: span 4; grid-row: span 1; }
.article-3 { grid-column: span 2; grid-row: span 1; }
.article-4 { grid-column: span 4; grid-row: span 2; }
.article-5 { grid-column: span 3; grid-row: span 1; }
.article-6 { grid-column: span 3; grid-row: span 1; }

@media (max-width: 768px) {
  .magazine {
    grid-template-columns: 1fr;
  }

  .article {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}
\`\`\`

## 4. Form Layout em Duas Colunas

Formulário com campos organizados em grid.

\`\`\`css
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  padding: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Campos que ocupam linha inteira */
.form-field.full-width {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .form {
    grid-template-columns: 1fr;
  }

  .form-field.full-width {
    grid-column: span 1;
  }
}
\`\`\`

## 5. Card Grid com Subgrid

Grid dentro de grid para alinhar elementos internos.

\`\`\`css
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.card-actions {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 1rem;
}
\`\`\`

## 6. Holy Grail Layout com Grid

O famoso layout com header, sidebar esquerda, conteúdo, sidebar direita e footer.

\`\`\`css
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav content aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.content { grid-area: content; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

@media (max-width: 1024px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "nav"
      "content"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}
\`\`\`

## Dicas Profissionais

1. **Use auto-fit/auto-fill** para grids responsivos automáticos
2. **Combine Grid + Flexbox**: Grid para layout macro, Flexbox para componentes
3. **grid-template-areas** torna o código mais legível
4. **minmax()** garante tamanhos mínimos e máximos
5. **gap** é mais limpo que margins
6. **Media queries** para reorganizar em mobile
7. **aspect-ratio** para manter proporções

Com CSS Grid, você tem o poder de criar qualquer layout imaginável!
          `,
          codeExample: `/* Layout Completo: App Quple com Grid */
.app {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: 60px 1fr 50px;
  gap: 1rem;
  min-height: 100vh;
  padding: 1rem;
}

/* Galeria de objetivos com auto-fit */
.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.goal-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Mobile */
@media (max-width: 768px) {
  .app {
    grid-template-areas:
      "header"
      "main"
      "aside"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}`
        }
      ]
    },

    // =========================================================================
    // LESSON 3: ANIMAÇÕES E TRANSITIONS
    // =========================================================================
    {
      id: 'lesson-3',
      title: 'Animações e Transitions',
      description: 'Crie interfaces animadas e interativas com CSS',
      estimatedTime: 80,
      sections: [
        {
          id: 'transitions',
          title: 'CSS Transitions - Transições Suaves',
          type: 'theory',
          content: `
# CSS Transitions - Transições Suaves

Transitions permitem que você anime mudanças de propriedades CSS de forma suave. Ao invés de uma mudança instantânea, você tem uma transição gradual.

## Conceito Básico

Sem transition:
\`\`\`css
.button { background: blue; }
.button:hover { background: red; } /* Mudança instantânea */
\`\`\`

Com transition:
\`\`\`css
.button {
  background: blue;
  transition: background 0.3s ease;
}
.button:hover { background: red; } /* Mudança suave em 0.3s */
\`\`\`

## Propriedades de Transition

### 1. transition-property
Define QUAL propriedade será animada.

\`\`\`css
.element {
  transition-property: background; /* Só anima background */
  transition-property: all; /* Anima todas propriedades que mudarem */
  transition-property: width, height; /* Múltiplas propriedades */
}
\`\`\`

**Propriedades animáveis:** colors, opacity, transform, width, height, padding, margin, etc.
**NÃO animáveis:** display, font-family, position

### 2. transition-duration
Duração da animação em segundos (s) ou milissegundos (ms).

\`\`\`css
.element {
  transition-duration: 0.3s; /* 300 milissegundos */
  transition-duration: 500ms; /* Meio segundo */
}
\`\`\`

### 3. transition-timing-function
Controla a "curva" da animação.

\`\`\`css
.element {
  transition-timing-function: ease; /* Padrão: começa devagar, rápido no meio, termina devagar */
}
\`\`\`

**Valores predefinidos:**
- \`ease\`: Padrão, natural
- \`linear\`: Velocidade constante
- \`ease-in\`: Começa devagar, acelera
- \`ease-out\`: Começa rápido, desacelera
- \`ease-in-out\`: Começa e termina devagar

**Curva personalizada:**
\`\`\`css
.element {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
\`\`\`

### 4. transition-delay
Tempo de espera antes da animação começar.

\`\`\`css
.element {
  transition-delay: 0.1s; /* Espera 100ms antes de animar */
}
\`\`\`

## Shorthand: transition

Combina todas propriedades em uma linha:

\`\`\`css
.element {
  transition: property duration timing-function delay;
}

/* Exemplo */
.button {
  transition: background 0.3s ease 0s;
}

/* Múltiplas transições */
.button {
  transition:
    background 0.3s ease,
    transform 0.2s ease-out,
    box-shadow 0.3s ease;
}
\`\`\`

## Exemplos Práticos do Quple

**1. Botão com hover suave**
\`\`\`css
.button {
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
}

.button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,123,255,0.3);
}
\`\`\`

**2. Card com hover elegante**
\`\`\`css
.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
\`\`\`

**3. Input com focus animado**
\`\`\`css
.input {
  padding: 0.75rem 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
  outline: none;
}
\`\`\`

## Dicas de Ouro

1. **Use ease-out** para interações do usuário (hover, click)
2. **0.2s-0.3s** é ideal para a maioria das transitions
3. **Transform e opacity** são mais performáticos que width/height
4. **Sempre teste em dispositivos reais** (pode ser lento em mobile)
5. **Não anime tudo**: transitions sutis são melhores
          `,
          codeExample: `/* Botão Quple com multiple transitions */
.quple-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;

  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out,
    opacity 0.2s ease;
}

.quple-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 20px rgba(102,126,234,0.4);
}

.quple-button:active {
  transform: translateY(0) scale(0.98);
  opacity: 0.9;
}`
        },
        {
          id: 'animations',
          title: 'CSS Animations e Keyframes',
          type: 'theory',
          content: `
# CSS Animations e Keyframes

Enquanto transitions animam mudanças entre dois estados, animations permitem criar animações complexas com múltiplos estados usando @keyframes.

## @keyframes - Definindo a Animação

Keyframes definem COMO a animação acontece.

\`\`\`css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
\`\`\`

**Ou com porcentagens** (mais controle):
\`\`\`css
@keyframes slideInBounce {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
\`\`\`

## Propriedades de Animation

### 1. animation-name
Nome do @keyframes a usar.

\`\`\`css
.element {
  animation-name: fadeIn;
}
\`\`\`

### 2. animation-duration
Duração da animação.

\`\`\`css
.element {
  animation-duration: 1s;
}
\`\`\`

### 3. animation-timing-function
Curva de aceleração (mesmas de transition).

\`\`\`css
.element {
  animation-timing-function: ease-in-out;
}
\`\`\`

### 4. animation-delay
Atraso antes da animação começar.

\`\`\`css
.element {
  animation-delay: 0.5s;
}
\`\`\`

### 5. animation-iteration-count
Quantas vezes a animação repete.

\`\`\`css
.element {
  animation-iteration-count: 3; /* Repete 3 vezes */
  animation-iteration-count: infinite; /* Loop infinito */
}
\`\`\`

### 6. animation-direction
Direção da animação.

\`\`\`css
.element {
  animation-direction: normal; /* Padrão: 0% → 100% */
  animation-direction: reverse; /* 100% → 0% */
  animation-direction: alternate; /* 0%→100%→0%→100% */
  animation-direction: alternate-reverse; /* 100%→0%→100%→0% */
}
\`\`\`

### 7. animation-fill-mode
O que acontece antes/depois da animação.

\`\`\`css
.element {
  animation-fill-mode: none; /* Padrão */
  animation-fill-mode: forwards; /* Mantém estado final */
  animation-fill-mode: backwards; /* Aplica estado inicial antes do delay */
  animation-fill-mode: both; /* forwards + backwards */
}
\`\`\`

### 8. animation-play-state
Pausar/retomar animação.

\`\`\`css
.element {
  animation-play-state: running; /* Padrão */
}

.element:hover {
  animation-play-state: paused; /* Pausa no hover */
}
\`\`\`

## Shorthand: animation

\`\`\`css
.element {
  animation: name duration timing-function delay iteration-count direction fill-mode;
}

/* Exemplo */
.fade-in {
  animation: fadeIn 1s ease-in 0s 1 normal forwards;
}

/* Simplificado */
.fade-in {
  animation: fadeIn 1s ease-in forwards;
}
\`\`\`

## Animações Comuns do Quple

**1. Fade In (aparecer suavemente)**
\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
\`\`\`

**2. Slide In from Bottom**
\`\`\`css
@keyframes slideInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideInUp 0.4s ease-out forwards;
}
\`\`\`

**3. Pulse (pulsação de atenção)**
\`\`\`css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse-button {
  animation: pulse 2s ease-in-out infinite;
}
\`\`\`

**4. Rotate Loading Spinner**
\`\`\`css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
\`\`\`

**5. Bounce**
\`\`\`css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.bounce {
  animation: bounce 1s ease-in-out;
}
\`\`\`

## Animando Múltiplos Elementos em Sequência

Use animation-delay!

\`\`\`css
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }
.card:nth-child(4) { animation-delay: 0.3s; }
\`\`\`

Ou com calc():
\`\`\`css
.card {
  animation: slideInUp 0.4s ease-out forwards;
  animation-delay: calc(var(--index) * 0.1s);
}
\`\`\`
          `,
          codeExample: `/* Loading Spinner do Quple */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0,123,255,0.2);
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Card aparecendo com delay progressivo */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }`
        },
        {
          id: 'transforms',
          title: 'Transform - Transformações 2D e 3D',
          type: 'theory',
          content: `
# Transform - Transformações 2D e 3D

A propriedade \`transform\` permite mover, rotacionar, escalar e distorcer elementos SEM afetar o layout dos outros elementos. É uma das propriedades mais performáticas para animações!

## Transformações 2D

### 1. translate() - Mover

Move o elemento no eixo X e/ou Y.

\`\`\`css
.element {
  transform: translateX(50px); /* Move 50px para direita */
  transform: translateY(-20px); /* Move 20px para cima */
  transform: translate(50px, -20px); /* X e Y juntos */
}
\`\`\`

### 2. scale() - Escalar

Aumenta ou diminui o tamanho do elemento.

\`\`\`css
.element {
  transform: scale(1.2); /* 120% do tamanho original */
  transform: scaleX(0.5); /* Metade da largura */
  transform: scaleY(2); /* Dobro da altura */
  transform: scale(1.5, 0.8); /* 150% largura, 80% altura */
}
\`\`\`

### 3. rotate() - Rotacionar

Gira o elemento.

\`\`\`css
.element {
  transform: rotate(45deg); /* Gira 45 graus horário */
  transform: rotate(-90deg); /* Gira 90 graus anti-horário */
}
\`\`\`

### 4. skew() - Inclinar

Distorce o elemento.

\`\`\`css
.element {
  transform: skew(10deg); /* Inclina no eixo X */
  transform: skewY(10deg); /* Inclina no eixo Y */
  transform: skew(10deg, 5deg); /* X e Y juntos */
}
\`\`\`

## Combinando Transforms

Você pode combinar múltiplas transformações:

\`\`\`css
.card:hover {
  transform: translateY(-10px) scale(1.05) rotate(2deg);
}
\`\`\`

**IMPORTANTE:** A ordem importa!
\`\`\`css
/* Diferente de: */
transform: rotate(45deg) translate(100px);
/* vs */
transform: translate(100px) rotate(45deg);
\`\`\`

## transform-origin

Define o ponto de origem da transformação (padrão é o centro).

\`\`\`css
.element {
  transform-origin: center center; /* Padrão */
  transform-origin: top left; /* Canto superior esquerdo */
  transform-origin: 50% 50%; /* Centro (igual ao padrão) */
  transform-origin: 100px 50px; /* Ponto específico */
}

/* Exemplo: Rotacionar a partir do canto */
.card {
  transform-origin: bottom right;
  transform: rotate(10deg);
}
\`\`\`

## Transformações 3D

### 1. translateZ() e translate3d()

\`\`\`css
.element {
  transform: translateZ(100px); /* Move no eixo Z (profundidade) */
  transform: translate3d(50px, 20px, 100px); /* X, Y, Z */
}
\`\`\`

### 2. rotateX(), rotateY(), rotateZ()

\`\`\`css
.card {
  transform: rotateX(45deg); /* Rotaciona horizontalmente */
  transform: rotateY(45deg); /* Rotaciona verticalmente */
  transform: rotateZ(45deg); /* Igual a rotate() */
}
\`\`\`

### 3. scale3d()

\`\`\`css
.element {
  transform: scale3d(1.5, 1.5, 2); /* X, Y, Z */
}
\`\`\`

## Perspective - Profundidade 3D

Para ver efeitos 3D, você precisa definir perspective no **container pai**:

\`\`\`css
.container {
  perspective: 1000px; /* Quanto menor, mais dramático */
}

.card {
  transform: rotateY(45deg); /* Agora você vê o efeito 3D! */
}
\`\`\`

### preserve-3d

Permite que elementos filhos mantenham posição 3D:

\`\`\`css
.parent {
  transform-style: preserve-3d;
}
\`\`\`

### backface-visibility

Controla se o "verso" do elemento é visível quando rotacionado:

\`\`\`css
.card {
  backface-visibility: hidden; /* Esconde o verso */
}
\`\`\`

## Exemplos Práticos do Quple

**1. Card com hover lift**
\`\`\`css
.goal-card {
  transition: transform 0.3s ease;
}

.goal-card:hover {
  transform: translateY(-8px) scale(1.02);
}
\`\`\`

**2. Botão com press effect**
\`\`\`css
.button {
  transition: transform 0.1s ease;
}

.button:active {
  transform: scale(0.95);
}
\`\`\`

**3. Card flip 3D**
\`\`\`css
.flip-container {
  perspective: 1000px;
}

.flip-card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-container:hover .flip-card {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
\`\`\`

**4. Loading pulse**
\`\`\`css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
}

.loading-dot {
  animation: pulse 1.5s ease-in-out infinite;
}
\`\`\`
          `,
          codeExample: `/* Card 3D Hover Effect - Quple */
.card-3d-container {
  perspective: 1000px;
}

.card-3d {
  transition: transform 0.4s ease;
  transform-style: preserve-3d;
}

.card-3d:hover {
  transform: rotateY(10deg) rotateX(5deg) translateZ(20px);
}

/* Button Press Effect */
.button-press {
  transition: transform 0.1s ease;
}

.button-press:active {
  transform: translateY(2px) scale(0.98);
}

/* Floating Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}`
        },
        {
          id: 'performance',
          title: 'Performance e Will-Change',
          type: 'theory',
          content: `
# Performance e Will-Change

Animações podem deixar seu site lento se não forem otimizadas. Vamos aprender as melhores práticas para animações performáticas!

## Propriedades Performáticas vs Custosas

### ✅ Animações Performáticas (GPU-accelerated)
Estas propriedades são aceleradas pela GPU e não causam reflow/repaint:

- **transform** (translate, scale, rotate)
- **opacity**

\`\`\`css
/* BOM - Usa GPU */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}
\`\`\`

### ❌ Animações Custosas (CPU-bound)
Estas causam reflow (recálculo de layout) e repaint (redesenho):

- **width, height**
- **top, left, right, bottom**
- **margin, padding**
- **border**

\`\`\`css
/* RUIM - Causa reflow */
.element {
  width: 200px; /* Recalcula layout! */
  left: 100px; /* Recalcula posição! */
}
\`\`\`

## will-change - Otimização Avançada

A propriedade \`will-change\` avisa o browser que uma propriedade vai mudar, permitindo otimizações antecipadas.

### Uso Correto

\`\`\`css
.card {
  /* Avisa que transform vai mudar */
  will-change: transform;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-10px);
}
\`\`\`

### ⚠️ NÃO use will-change em tudo!

\`\`\`css
/* RUIM - Desperdiça memória */
* {
  will-change: transform, opacity; /* Não faça isso! */
}
\`\`\`

### Quando usar will-change

1. **Animações que vão acontecer em breve**
\`\`\`javascript
// Adiciona will-change antes da animação
element.style.willChange = 'transform';

// Remove depois da animação
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto';
});
\`\`\`

2. **Elementos que animam frequentemente**
\`\`\`css
.draggable {
  will-change: transform; /* Elemento que user arrasta */
}
\`\`\`

3. **Animações longas ou complexas**
\`\`\`css
.complex-animation {
  will-change: transform, opacity;
  animation: complexMove 2s ease-in-out;
}
\`\`\`

## Dicas de Performance

### 1. Use transform ao invés de position

\`\`\`css
/* RUIM */
.slide-bad {
  position: relative;
  left: 100px; /* Causa reflow */
}

/* BOM */
.slide-good {
  transform: translateX(100px); /* GPU accelerated */
}
\`\`\`

### 2. Use scale ao invés de width/height

\`\`\`css
/* RUIM */
.grow-bad {
  width: 200px;
  height: 200px;
}

/* BOM */
.grow-good {
  transform: scale(1.2); /* Muito mais performático */
}
\`\`\`

### 3. Use opacity ao invés de visibility

\`\`\`css
/* BOM para fade */
.fade {
  opacity: 0;
  transition: opacity 0.3s;
}

/* Se precisa remover da DOM, combine: */
.hidden {
  opacity: 0;
  pointer-events: none; /* Desabilita cliques */
}
\`\`\`

### 4. Contenha animações com contain

\`\`\`css
.animated-card {
  contain: layout style paint; /* Isola mudanças */
}
\`\`\`

### 5. Use transform-style: preserve-3d com cuidado

3D é custoso, use apenas quando necessário.

### 6. Reduza motion para acessibilidade

Respeite as preferências do usuário:

\`\`\`css
/* Usuários que preferem menos animação */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

## Checklist de Performance

✅ **Use transform e opacity**
✅ **Evite animar width, height, top, left**
✅ **Use will-change estrategicamente**
✅ **Respeite prefers-reduced-motion**
✅ **Teste em dispositivos reais (mobile!)**
✅ **Use DevTools para medir performance**
✅ **Mantenha animações < 0.5s**
✅ **Evite muitos elementos animando simultaneamente**

## Ferramentas de Debug

### Chrome DevTools - Performance

1. Abra DevTools (F12)
2. Aba **Performance**
3. Grave interação com animações
4. Procure por **Rendering** longo (vermelho)

### Rendering tab

1. DevTools → More tools → Rendering
2. Ative **Paint flashing** (mostra repaints)
3. Ative **Layout Shift Regions** (mostra reflows)

## Exemplo Otimizado do Quple

\`\`\`css
.goal-card {
  /* Otimizações */
  will-change: transform; /* Avisa que vai mudar */
  contain: layout style paint; /* Isola mudanças */

  /* Transição performática */
  transition: transform 0.3s ease-out;
}

.goal-card:hover {
  /* Usa GPU */
  transform: translateY(-8px) scale(1.02);
}

/* Respeita preferências */
@media (prefers-reduced-motion: reduce) {
  .goal-card {
    transition: none;
  }

  .goal-card:hover {
    transform: none;
  }
}
\`\`\`

## Resumo: Regras de Ouro

1. **Transform e opacity** são seus melhores amigos
2. **will-change** com moderação
3. **Teste no mobile** (performance muito diferente)
4. **Menos é mais** (animações sutis são melhores)
5. **Acessibilidade** sempre (prefers-reduced-motion)

Com essas práticas, suas animações serão suaves em qualquer dispositivo!
          `,
          codeExample: `/* Card Otimizado - Quple */
.quple-card {
  /* Performance hints */
  will-change: transform;
  contain: layout style paint;

  /* Transição performática */
  transition: transform 0.3s ease-out,
              box-shadow 0.3s ease-out;

  /* Força GPU acceleration */
  transform: translateZ(0);
}

.quple-card:hover {
  /* Apenas propriedades GPU-accelerated */
  transform: translateY(-8px) translateZ(0);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* Acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .quple-card {
    transition: none;
  }

  .quple-card:hover {
    transform: none;
    box-shadow: none;
  }
}

/* Cleanup will-change após animação */
.quple-card:not(:hover) {
  will-change: auto;
}`
        }
      ]
    }
  ]
}
