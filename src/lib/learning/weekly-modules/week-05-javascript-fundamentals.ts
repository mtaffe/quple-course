import { WeeklyModule } from '@/types/weekly-modules';

export const week05JavascriptFundamentals: WeeklyModule = {
  id: 'week-05-javascript-fundamentals',
  weekNumber: 5,
  title: 'JavaScript: Programação de Verdade',
  subtitle: 'Dê vida ao seu portfolio com código que FALA, PENSA e AGE',
  description: 'Bem-vindo ao JavaScript! Chegou a hora de fazer seu site FAZER coisas de verdade. Aprenda variáveis, funções, condicionais e loops para criar uma calculadora interativa no seu portfolio.',
  
  learningObjectives: [
    'Entender variáveis (let, const) e tipos de dados (string, number, boolean)',
    'Criar e usar funções para organizar seu código',
    'Usar condicionais (if/else) para tomar decisões no código',
    'Aplicar loops (for, while) para repetir ações',
    'Criar uma calculadora interativa funcional no portfolio'
  ],
  
  prerequisites: ['week-04-css-grid-responsive'],
  
  theoryContent: {
    id: 'week-05-javascript-fundamentals-theory',
    sections: [
      {
        id: 'js-intro',
        title: 'JavaScript: O Cérebro do Seu Site',
        content: `# JavaScript: Finalmente, Programação!

Até agora você usou:
- 🏗️ **HTML** = Estrutura (esqueleto)
- 🎨 **CSS** = Aparência (visual)

Agora vem o **JavaScript**:
- 🧠 **JavaScript** = Comportamento (inteligência, ações, lógica)

## O que JavaScript Faz?

JavaScript faz seu site **REAGIR** às coisas:
- 👆 Cliques de botão
- ⌨️ Digitação em formulários
- 🎬 Animações complexas
- 📊 Cálculos e processamento de dados
- 🌐 Buscar informações de outros sites (APIs)

## Analogia do Mundo Real

Pensa em um carro:
- HTML = Chassis, portas, bancos (estrutura)
- CSS = Pintura, estilo, design (aparência)
- **JavaScript = Motor, freios, direção (funcionalidades)**

Sem JavaScript, seu site é bonito mas **não faz nada**. Com JavaScript, ele vira uma **máquina funcional**!

## Seu Primeiro Código JavaScript

\`\`\`javascript
// Mostra uma mensagem no console
console.log("Olá, mundo!");

// Mostra um alerta na tela
alert("Bem-vindo ao JavaScript!");

// Pergunta algo ao usuário
let nome = prompt("Qual é seu nome?");
console.log("Olá, " + nome + "!");
\`\`\``,
        codeExamples: [
          {
            language: 'javascript',
            code: `// Console.log é sua melhor ferramenta de debug
console.log("Hello, JavaScript!");

// Você pode logar qualquer coisa
console.log(42);
console.log(true);
console.log("Meu nome é: " + "João");

// Dica: Abra DevTools (F12) e veja o Console!`,
            explanation: 'console.log() mostra mensagens no Console do navegador (ferramenta de desenvolvedor). É ESSENCIAL para debug!'
          }
        ]
      },
      {
        id: 'variables',
        title: 'Variáveis: Guardando Informações na Memória',
        content: `# Variáveis: Caixinhas para Guardar Dados

**Variável** = nome que você dá a um valor que pode mudar

## let vs const

### \`let\` = Pode mudar
\`\`\`javascript
let idade = 16;
console.log(idade); // 16

idade = 17; // Mudou!
console.log(idade); // 17
\`\`\`

### \`const\` = NÃO pode mudar (constante)
\`\`\`javascript
const nome = "Maria";
console.log(nome); // Maria

// nome = "João"; ❌ ERRO! const não muda
\`\`\`

## Tipos de Dados

JavaScript tem 3 tipos principais:

### 1. String (texto)
\`\`\`javascript
let mensagem = "Olá, mundo!";
let nome = 'João'; // Aspas simples ou duplas, tanto faz
let frase = \`Meu nome é \${nome}\`; // Template string
\`\`\`

### 2. Number (número)
\`\`\`javascript
let idade = 16;
let preco = 49.99;
let temperatura = -5;
\`\`\`

### 3. Boolean (verdadeiro ou falso)
\`\`\`javascript
let maiorDeIdade = false;
let estudante = true;
\`\`\`

## Operações Matemáticas

\`\`\`javascript
let a = 10;
let b = 5;

console.log(a + b);  // 15 (soma)
console.log(a - b);  // 5  (subtração)
console.log(a * b);  // 50 (multiplicação)
console.log(a / b);  // 2  (divisão)
console.log(a % b);  // 0  (resto da divisão)
\`\`\``,
        codeExamples: [
          {
            language: 'javascript',
            code: `// Calculadora básica
let numero1 = 10;
let numero2 = 5;

let soma = numero1 + numero2;
let subtracao = numero1 - numero2;
let multiplicacao = numero1 * numero2;
let divisao = numero1 / numero2;

console.log("Soma:", soma);           // 15
console.log("Subtração:", subtracao); // 5
console.log("Multiplicação:", multiplicacao); // 50
console.log("Divisão:", divisao);     // 2

// Template strings (moderno!)
console.log(\`\${numero1} + \${numero2} = \${soma}\`);`,
            explanation: 'Variáveis guardam resultados de cálculos. Template strings (\`\`) facilitam juntar texto com variáveis.'
          }
        ]
      },
      {
        id: 'functions',
        title: 'Funções: Código Reutilizável',
        content: `# Funções: Blocos de Código que Fazem Algo

**Função** = Receita que você pode usar várias vezes

## Sintaxe Básica

\`\`\`javascript
function saudar(nome) {
  console.log("Olá, " + nome + "!");
}

// Chamando a função
saudar("Maria"); // Olá, Maria!
saudar("João");  // Olá, João!
\`\`\`

## Parâmetros e Retorno

\`\`\`javascript
// Função que RETORNA um valor
function somar(a, b) {
  return a + b;
}

let resultado = somar(5, 3);
console.log(resultado); // 8
\`\`\`

## Arrow Functions (moderno)

\`\`\`javascript
// Jeito antigo
function somar(a, b) {
  return a + b;
}

// Jeito moderno (arrow function)
const somar = (a, b) => {
  return a + b;
}

// Ainda mais curto (quando só tem um return)
const somar = (a, b) => a + b;
\`\`\`

## Por que usar funções?

✅ **Reutilização**: Escreve uma vez, usa várias
✅ **Organização**: Código limpo e legível
✅ **Manutenção**: Fácil de encontrar e consertar bugs`,
        codeExamples: [
          {
            language: 'javascript',
            code: `// Função para calcular desconto
function calcularDesconto(preco, percentual) {
  const desconto = preco * (percentual / 100);
  const precoFinal = preco - desconto;
  return precoFinal;
}

// Usando a função
let preco1 = calcularDesconto(100, 10); // 90
let preco2 = calcularDesconto(50, 20);  // 40

console.log("Preço com 10% off:", preco1);
console.log("Preço com 20% off:", preco2);

// Arrow function versão
const calcularDescontoModerno = (preco, percentual) => {
  return preco - (preco * percentual / 100);
}`,
            explanation: 'Funções evitam repetir código. Você define uma vez e reutiliza com parâmetros diferentes.'
          }
        ]
      },
      {
        id: 'conditionals',
        title: 'Condicionais: Tomando Decisões',
        content: `# if/else: Código que Decide

**Condicional** = if (se) isso for verdade, faça aquilo

## Sintaxe Básica

\`\`\`javascript
let idade = 16;

if (idade >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}
\`\`\`

## if / else if / else

\`\`\`javascript
let nota = 85;

if (nota >= 90) {
  console.log("Excelente! A");
} else if (nota >= 80) {
  console.log("Muito bom! B");
} else if (nota >= 70) {
  console.log("Bom! C");
} else {
  console.log("Precisa estudar mais");
}
\`\`\`

## Operadores de Comparação

| Operador | Significado | Exemplo |
|----------|-------------|---------|
| \`===\`  | Igual a     | \`5 === 5\` (true) |
| \`!==\`  | Diferente   | \`5 !== 3\` (true) |
| \`>\`    | Maior       | \`10 > 5\` (true) |
| \`<\`    | Menor       | \`3 < 7\` (true) |
| \`>=\`   | Maior ou igual | \`5 >= 5\` (true) |
| \`<=\`   | Menor ou igual | \`3 <= 3\` (true) |

## Operadores Lógicos

\`\`\`javascript
// && (E/AND) - ambos precisam ser verdade
let idade = 20;
let temCarteira = true;

if (idade >= 18 && temCarteira) {
  console.log("Pode dirigir!");
}

// || (OU/OR) - um OU outro precisa ser verdade
let final = 85;
let trabalho = 92;

if (final >= 90 || trabalho >= 90) {
  console.log("Passou com nota alta!");
}

// ! (NÃO/NOT) - inverte verdadeiro/falso
let chovendo = false;

if (!chovendo) {
  console.log("Pode sair sem guarda-chuva!");
}
\`\`\``,
        codeExamples: [
          {
            language: 'javascript',
            code: `// Sistema de login simples
function verificarLogin(usuario, senha) {
  const usuarioCorreto = "admin";
  const senhaCorreta = "1234";
  
  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    return "Login bem-sucedido!";
  } else if (usuario !== usuarioCorreto) {
    return "Usuário incorreto";
  } else {
    return "Senha incorreta";
  }
}

console.log(verificarLogin("admin", "1234")); // Login bem-sucedido!
console.log(verificarLogin("user", "1234"));  // Usuário incorreto
console.log(verificarLogin("admin", "0000")); // Senha incorreta`,
            explanation: 'Condicionais permitem que o código tome decisões baseado em valores. Essencial para qualquer lógica de programação.'
          }
        ]
      },
      {
        id: 'loops',
        title: 'Loops: Repetindo Ações',
        content: `# Loops: Faça Isso Várias Vezes

**Loop** = Repetir código automaticamente

## For Loop (mais comum)

\`\`\`javascript
// Conta de 0 a 4
for (let i = 0; i < 5; i++) {
  console.log("Número:", i);
}
// Saída: 0, 1, 2, 3, 4
\`\`\`

### Anatomia do For
\`\`\`javascript
for (início; condição; incremento) {
  // código que repete
}

for (let i = 0; i < 10; i++) {
  // i = 0   (início)
  // i < 10  (enquanto isso for verdade, continua)
  // i++     (adiciona 1 a cada volta)
}
\`\`\`

## While Loop

\`\`\`javascript
let contador = 0;

while (contador < 5) {
  console.log("Contador:", contador);
  contador++; // Importante! Senão fica infinito
}
\`\`\`

## Loops com Arrays (Semana 8)

\`\`\`javascript
const frutas = ["maçã", "banana", "laranja"];

// Jeito 1: for tradicional
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// Jeito 2: for...of (moderno)
for (const fruta of frutas) {
  console.log(fruta);
}
\`\`\`

## Quando Usar Loops?

✅ Processar listas de dados
✅ Criar elementos HTML repetidos
✅ Calcular somas/médias
✅ Validar múltiplos campos de formulário`,
        codeExamples: [
          {
            language: 'javascript',
            code: `// Tabuada do 5
for (let i = 1; i <= 10; i++) {
  console.log(\`5 x \${i} = \${5 * i}\`);
}

// Soma de 1 a 100
let soma = 0;
for (let i = 1; i <= 100; i++) {
  soma += i; // soma = soma + i
}
console.log("Soma de 1 a 100:", soma); // 5050

// Criar lista HTML dinamicamente
let html = "";
for (let i = 1; i <= 5; i++) {
  html += \`<li>Item \${i}</li>\`;
}
console.log(html);`,
            explanation: 'Loops economizam MUITO código. Imagine escrever 100 linhas manualmente vs 3 linhas com loop!'
          }
        ]
      }
    ]
  },
  
  resources: [
    {
      id: 'js-mdn',
      type: 'reading',
      title: 'MDN: JavaScript Basics',
      url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/JavaScript_basics',
      required: true,
    },
    {
      id: 'javascript-info',
      type: 'reading',
      title: 'JavaScript.info - Fundamentos',
      url: 'https://javascript.info/first-steps',
      required: false,
    }
  ],
  
  challenges: [
    {
      id: 'week-05-challenge-1',
      type: 'coding',
      title: 'Desafio 1: Variáveis e Console',
      description: 'Crie variáveis para nome, idade e cidade, e mostre no console',
      difficulty: 'beginner',
      estimatedMinutes: 10,
      steps: [
        {
          id: 'week-05-challenge-1-step-1',
          title: 'Primeiras Variáveis',
          instruction: 'Crie 3 variáveis: nome (string), idade (number), estudante (boolean). Use console.log para mostrar cada uma.',
          starterCode: `// SEU CÓDIGO AQUI
// Crie as variáveis
let nome = 

// Mostre no console
console.log()`,
          solution: `let nome = "Maria Silva";
let idade = 16;
let estudante = true;

console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("É estudante?", estudante);`,
          hints: [
            'String usa aspas: "texto"',
            'Number não usa aspas: 16',
            'Boolean é true ou false (sem aspas)'
          ],
          validationCriteria: [
            'Criou variável nome (string)',
            'Criou variável idade (number)',
            'Criou variável estudante (boolean)',
            'Usou console.log para mostrar'
          ],
          xpReward: 20,
        }
      ],
      totalXP: 20,
    },
    {
      id: 'week-05-challenge-2',
      type: 'coding',
      title: 'Desafio 2: Calculadora Básica',
      description: 'Crie uma função que soma dois números',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      steps: [
        {
          id: 'week-05-challenge-2-step-1',
          title: 'Função Somar',
          instruction: 'Crie uma função chamada "somar" que recebe 2 parâmetros (a, b) e retorna a soma',
          starterCode: `// Crie a função somar
function somar(a, b) {
  // SEU CÓDIGO AQUI
}

// Teste
console.log(somar(5, 3));  // Deve mostrar 8
console.log(somar(10, 20)); // Deve mostrar 30`,
          solution: `function somar(a, b) {
  return a + b;
}

console.log(somar(5, 3));  // 8
console.log(somar(10, 20)); // 30`,
          hints: [
            'Use "return" para devolver o resultado',
            'a + b faz a soma de dois números'
          ],
          validationCriteria: [
            'Função somar criada',
            'Aceita 2 parâmetros',
            'Retorna a soma correta'
          ],
          xpReward: 30,
        }
      ],
      totalXP: 30,
    },
    {
      id: 'week-05-challenge-3',
      type: 'coding',
      title: 'Desafio 3: Maior de Idade',
      description: 'Use if/else para verificar se alguém é maior de idade',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      steps: [
        {
          id: 'week-05-challenge-3-step-1',
          title: 'Verificar Idade',
          instruction: 'Crie função verificarIdade(idade) que retorna "Maior de idade" se >= 18, senão "Menor de idade"',
          starterCode: `function verificarIdade(idade) {
  // SEU CÓDIGO AQUI
  if () {
    
  } else {
    
  }
}

console.log(verificarIdade(20)); // Maior de idade
console.log(verificarIdade(15)); // Menor de idade`,
          solution: `function verificarIdade(idade) {
  if (idade >= 18) {
    return "Maior de idade";
  } else {
    return "Menor de idade";
  }
}

console.log(verificarIdade(20)); // Maior de idade
console.log(verificarIdade(15)); // Menor de idade`,
          hints: [
            'Use if (idade >= 18)',
            'return dentro do if/else',
            '>= significa "maior ou igual"'
          ],
          validationCriteria: [
            'Função verificarIdade criada',
            'if/else implementado',
            'Compara com 18',
            'Retorna string correta'
          ],
          xpReward: 40,
        }
      ],
      totalXP: 40,
    },
    {
      id: 'week-05-challenge-4',
      type: 'coding',
      title: 'Desafio 4: Calculadora de Notas',
      description: 'Função que recebe nota e retorna conceito (A, B, C, D, F)',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      steps: [
        {
          id: 'week-05-challenge-4-step-1',
          title: 'Sistema de Notas',
          instruction: 'Crie função conceito(nota): 90+ = A, 80-89 = B, 70-79 = C, 60-69 = D, <60 = F',
          starterCode: `function conceito(nota) {
  // Use if/else if/else
  
}

console.log(conceito(95)); // A
console.log(conceito(85)); // B
console.log(conceito(75)); // C
console.log(conceito(65)); // D
console.log(conceito(50)); // F`,
          solution: `function conceito(nota) {
  if (nota >= 90) {
    return "A";
  } else if (nota >= 80) {
    return "B";
  } else if (nota >= 70) {
    return "C";
  } else if (nota >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(conceito(95)); // A
console.log(conceito(85)); // B
console.log(conceito(75)); // C
console.log(conceito(65)); // D
console.log(conceito(50)); // F`,
          hints: [
            'Comece pelo maior (90) e vá descendo',
            'if/else if/else em cadeia',
            'Não precisa checar < no else if (já foi filtrado)'
          ],
          validationCriteria: [
            'Múltiplos if/else if',
            'Todos os conceitos corretos',
            'Lógica de faixas implementada'
          ],
          xpReward: 50,
        }
      ],
      totalXP: 50,
    },
    {
      id: 'week-05-challenge-5',
      type: 'coding',
      title: 'Desafio 5: Tabuada com Loop',
      description: 'Use for loop para criar tabuada de qualquer número',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      steps: [
        {
          id: 'week-05-challenge-5-step-1',
          title: 'Tabuada Dinâmica',
          instruction: 'Crie função tabuada(numero) que usa for loop para mostrar tabuada de 1 a 10',
          starterCode: `function tabuada(numero) {
  // Use for loop de 1 a 10
  for () {
    
  }
}

tabuada(5);
// Deve mostrar:
// 5 x 1 = 5
// 5 x 2 = 10
// ...
// 5 x 10 = 50`,
          solution: `function tabuada(numero) {
  for (let i = 1; i <= 10; i++) {
    const resultado = numero * i;
    console.log(\`\${numero} x \${i} = \${resultado}\`);
  }
}

tabuada(5);
tabuada(7);`,
          hints: [
            'for (let i = 1; i <= 10; i++)',
            'Dentro do loop: numero * i',
            'Use template string para formatação bonita'
          ],
          validationCriteria: [
            'For loop de 1 a 10',
            'Multiplicação correta',
            'console.log formatado',
            'Funciona para qualquer número'
          ],
          xpReward: 60,
        }
      ],
      totalXP: 60,
    },
  ],
  
  weeklyProject: {
    id: 'week-05-project',
    title: 'Projeto: Calculadora Interativa',
    description: 'Adicione uma calculadora funcional ao seu portfolio que faz operações matemáticas básicas (+, -, *, /) com interface HTML/CSS e lógica JavaScript',
    learningObjectives: [
      'Conectar JavaScript ao HTML',
      'Capturar input do usuário',
      'Processar operações matemáticas',
      'Mostrar resultados dinamicamente',
    ],
    starterCode: `<!-- HTML da calculadora -->
<div class="calculator">
  <input type="number" id="num1" placeholder="Número 1">
  <select id="operation">
    <option value="+">+</option>
    <option value="-">-</option>
    <option value="*">×</option>
    <option value="/">÷</option>
  </select>
  <input type="number" id="num2" placeholder="Número 2">
  <button onclick="calcular()">Calcular</button>
  <p id="resultado"></p>
</div>

<script>
  function calcular() {
    // SEU CÓDIGO AQUI
    // 1. Pegar valores dos inputs
    // 2. Pegar operação selecionada
    // 3. Fazer o cálculo
    // 4. Mostrar resultado
  }
</script>`,
    completionCriteria: [
      'Função calcular() implementada',
      'Captura valores dos inputs corretamente',
      'Realiza todas as 4 operações (+, -, *, /)',
      'Mostra resultado no elemento #resultado',
      'Trata divisão por zero (mostra erro)',
      'CSS estilizado e responsivo'
    ],
    portfolioPiece: true,
    estimatedHours: 3,
    xpReward: 200,
    badgeId: 'js-fundamentals-master',
  },
  
  preClassChecklist: {
    id: 'week-05-checklist',
    weekId: 'week-05-javascript-fundamentals',
    items: [
      {
        id: 'read-js-theory',
        description: 'Ler toda teoria de JavaScript (variáveis, funções, if/else, loops)',
        type: 'content',
        estimatedMinutes: 60,
      },
      {
        id: 'test-console',
        description: 'Abrir DevTools (F12) e testar console.log no navegador',
        type: 'content',
        estimatedMinutes: 10,
      },
      {
        id: 'attempt-challenges',
        description: 'Tentar pelo menos 3 desafios de JavaScript',
        type: 'challenge',
        estimatedMinutes: 60,
      },
      {
        id: 'sketch-calculator',
        description: 'Esboçar design da calculadora do projeto',
        type: 'project',
        estimatedMinutes: 15,
      },
      {
        id: 'prepare-questions',
        description: 'Anotar dúvidas sobre lógica de programação',
        type: 'content',
        estimatedMinutes: 10,
      },
    ],
  },
  
  liveClassTopics: [
    'Diferença entre let, const e var (spoiler: nunca use var!)',
    'Arrow functions vs funções tradicionais',
    'Debug com console.log: técnicas profissionais',
    'Erros comuns de iniciantes em JavaScript',
    'Review da calculadora: feedback de projetos',
    'Próximos passos: DOM Manipulation (Semana 6)'
  ],
  
  estimatedStudyHours: 7,
  difficulty: 'intermediate',
  tags: ['javascript', 'programming', 'fundamentals', 'semana-5'],
  previousWeekId: 'week-04-css-grid-responsive',
  nextWeekId: 'week-06-dom-manipulation',
};
