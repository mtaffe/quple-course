/**
 * JavaScript Fundamentals - Complete Content
 *
 * This topic covers the essential concepts of JavaScript, including variables,
 * data types, functions, and DOM manipulation fundamentals.
 */

import { Topic } from '../../types'

export const jsFundamentals: Topic = {
  id: 'js-fundamentals',
  title: 'JavaScript Base',
  description: 'Variáveis, funções, eventos e manipulação do DOM',
  category: 'javascript',
  difficulty: 'beginner',
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
          type: 'theory',
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
          type: 'example',
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
