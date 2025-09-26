import { Challenge } from '@/types'

export const challenges: Challenge[] = [
  // DESAFIO 0: AVALIAÇÃO DE NÍVEL - Diagnóstico inicial
  {
    id: 0,
    title: "🔍 Avaliação de Nível",
    description: "**Bem-vindo ao React Learning Playground!**\n\nAntes de começarmos sua jornada, precisamos entender seu nível atual de conhecimento. Esta avaliação nos ajudará a personalizar sua experiência de aprendizado.\n\n**Não se preocupe:** Não há respostas certas ou erradas - queremos apenas saber onde você está para te ajudar melhor!",
    difficulty: "assessment",
    xpReward: 25,
    estimatedTime: 15,
    prerequisites: [],
    category: "assessment",

    learningObjectives: [
      "Identificar seu nível atual de conhecimento em HTML/CSS/JavaScript",
      "Personalizar a experiência de aprendizado baseada em suas habilidades",
      "Entender quais conceitos você já domina",
      "Descobrir suas áreas de interesse e objetivos"
    ],

    concepts: [
      {
        title: "Avaliação Adaptativa",
        description: "Esta avaliação se adapta às suas respostas para determinar seu nível de forma precisa e rápida."
      },
      {
        title: "Aprendizado Personalizado",
        description: "Com base nos resultados, personalizaremos os desafios para seu nível específico."
      }
    ],

    resources: [
      {
        title: "🎯 Por que fazer uma avaliação?",
        url: "#",
        type: "documentation",
        description: "Entenda a importância de conhecer seu ponto de partida no aprendizado"
      }
    ],

    // Não é realmente um desafio de código, mas um questionário interativo
    starterCode: `<!--
  AVALIAÇÃO DE NÍVEL - React Learning Playground

  Esta não é uma tarefa de programação, mas sim um questionário
  interativo que aparecerá na interface.

  Ao completar esta avaliação, você será direcionado para o
  desafio apropriado baseado em seu nível:

  📚 INICIANTE (0-30%): Começa do Desafio 1 (HTML Básico)
  💡 INTERMEDIÁRIO (31-65%): Começa do Desafio 4 (CSS/Layout)
  🚀 AVANÇADO (66-100%): Começa do Desafio 7 (JavaScript/React)

  Boa sorte! 🎉
-->

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliação de Nível - React Learning Playground</title>
</head>
<body>
    <h1>🔍 Avaliação de Nível</h1>
    <p>Esta avaliação será apresentada como um questionário interativo na interface.</p>
</body>
</html>`,

    solutionCode: `<!-- A "solução" é completar o questionário interativo -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliação Concluída!</title>
</head>
<body>
    <h1>✅ Avaliação Concluída!</h1>
    <p>Seu nível foi determinado e você será direcionado para o desafio apropriado.</p>
</body>
</html>`,

    hints: [
      {
        level: 1,
        title: "📋 Como funciona a avaliação?",
        content: "Esta avaliação consiste em perguntas de múltipla escolha sobre HTML, CSS, JavaScript e React. Responda honestamente - não há problema em não saber algo!"
      },
      {
        level: 2,
        title: "⏰ Tempo e pontuação",
        content: "Não há limite de tempo. Cada pergunta correta vale pontos diferentes baseados na dificuldade. Sua pontuação final determinará seu nível."
      },
      {
        level: 3,
        title: "🎯 Níveis de direcionamento",
        content: "INICIANTE (0-30%): HTML/CSS básico\nINTERMEDIÁRIO (31-65%): CSS avançado + JavaScript\nAVANÇADO (66%+): JavaScript + React"
      },
      {
        level: 4,
        title: "🚀 Próximos passos",
        content: "Após a avaliação, você será direcionado automaticamente para o primeiro desafio do seu nível. Você sempre pode voltar e fazer desafios anteriores se quiser revisar conceitos!"
      }
    ],

    validationRules: [
      {
        type: "assessment_completed",
        message: "Avaliação concluída com sucesso!"
      }
    ],

    achievements: [
      {
        id: "level_assessed",
        title: "🎯 Nível Avaliado",
        description: "Completou a avaliação inicial de conhecimentos",
        icon: "🎯"
      }
    ]
  },

  {
    id: 1,
    title: "🏗️ Página em Branco",
    description: "**Situação:** O Quple está com uma página completamente em branco! Os usuários não conseguem fazer login e estão frustrados.\n\n**Sua missão:** Criar a estrutura HTML básica para a tela de login do app. Este é seu primeiro desafio como desenvolvedor web - vamos começar do zero!",
    difficulty: "easy",
    xpReward: 50,
    estimatedTime: 30,
    prerequisites: [],
    category: "html",

    // Explicação detalhada do que o estudante vai aprender
    learningObjectives: [
      "Estrutura básica de um documento HTML5",
      "Tags semânticas como header, main, form",
      "Como criar formulários acessíveis",
      "Organização lógica do conteúdo"
    ],

    // Conceitos que serão abordados
    concepts: [
      {
        title: "DOCTYPE e HTML5",
        description: "Todo documento HTML precisa começar com <!DOCTYPE html> para funcionar corretamente nos navegadores modernos."
      },
      {
        title: "Tags Semânticas",
        description: "Tags como <header>, <main>, <form> dão significado ao conteúdo, não apenas estrutura visual."
      },
      {
        title: "Formulários Acessíveis",
        description: "Labels conectados aos inputs tornam o site utilizável por pessoas com deficiência."
      }
    ],

    // Materiais de apoio em português
    resources: [
      {
        title: "📖 HTML Básico - MDN em Português",
        url: "https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/HTML_basics",
        type: "documentation",
        description: "Guia oficial da Mozilla sobre HTML básico"
      },
      {
        title: "🎥 HTML para Iniciantes - Curso em Vídeo",
        url: "https://www.cursoemvideo.com/curso/html5/",
        type: "video",
        description: "Curso completo e gratuito do Gustavo Guanabara"
      },
      {
        title: "📚 W3Schools HTML em Português",
        url: "https://www.w3schools.com/html/",
        type: "tutorial",
        description: "Tutorial interativo com exemplos práticos"
      },
      {
        title: "🔧 HTML Validator",
        url: "https://validator.w3.org/",
        type: "tool",
        description: "Ferramenta para validar se seu HTML está correto"
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Login</title>
</head>
<body>
  <!--
    🚨 PROBLEMA: A página está completamente em branco!

    ✅ O QUE VOCÊ PRECISA FAZER:
    1. Criar um cabeçalho (header) com o nome do app
    2. Adicionar uma área principal (main)
    3. Criar um formulário de login
    4. Não esquecer dos labels nos campos

    💡 DICA: Comece pelo cabeçalho e vá descendo!
  -->

  <!-- Adicione seu código aqui! -->

</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Login</title>
</head>
<body>
  <!-- Cabeçalho do site -->
  <header>
    <h1>Quple</h1>
    <p>O app para casais</p>
  </header>

  <!-- Conteúdo principal -->
  <main>
    <h2>Entre na sua conta</h2>

    <!-- Formulário de login -->
    <form>
      <!-- Campo de email -->
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>

      <!-- Campo de senha -->
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required>
      </div>

      <!-- Botão de submit -->
      <button type="submit">Entrar</button>
    </form>

    <!-- Link para cadastro -->
    <p>Não tem conta? <a href="/cadastro">Cadastre-se</a></p>
  </main>
</body>
</html>`,

    // Sistema de dicas progressivo com explicações educativas
    hints: [
      {
        level: 1,
        title: "🏗️ Comece pela estrutura",
        content: "Todo site precisa de uma estrutura básica. Comece criando um **cabeçalho (header)** com o nome do app. Use `<header>` e `<h1>`.",
        example: `<header>
  <h1>Quple</h1>
  <p>O app para casais</p>
</header>`
      },
      {
        level: 2,
        title: "📝 Área principal do conteúdo",
        content: "Após o header, crie uma área **main** para o conteúdo principal. Dentro dela, adicione um título `<h2>` e prepare o espaço para o formulário.",
        example: `<main>
  <h2>Entre na sua conta</h2>
  <!-- formulário vai aqui -->
</main>`
      },
      {
        level: 3,
        title: "📋 Criando o formulário",
        content: "Use a tag `<form>` para criar o formulário. Dentro dele, adicione campos para **email** e **senha**. Não esqueça dos `<label>` para acessibilidade!",
        example: `<form>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
  </div>
  <!-- campo senha aqui -->
</form>`
      },
      {
        level: 4,
        title: "🔐 Finalizando com o botão",
        content: "Adicione um campo de senha e um botão de submit. Use `type=\"password\"` para o campo de senha e `type=\"submit\"` para o botão.",
        example: `<div>
  <label for="password">Senha:</label>
  <input type="password" id="password" name="password">
</div>
<button type="submit">Entrar</button>`
      }
    ],

    // Critérios de validação automática
    validationRules: [
      {
        type: "must_have_doctype",
        message: "Seu HTML deve começar com <!DOCTYPE html>",
        weight: 10
      },
      {
        type: "must_have_header_tag",
        message: "Use a tag <header> para o cabeçalho",
        weight: 15
      },
      {
        type: "must_have_h1_with_quple",
        message: "Adicione um <h1> com o nome 'Quple'",
        weight: 15
      },
      {
        type: "must_have_main_tag",
        message: "Use a tag <main> para o conteúdo principal",
        weight: 15
      },
      {
        type: "must_have_form_tag",
        message: "Crie um formulário com a tag <form>",
        weight: 15
      },
      {
        type: "must_have_email_input",
        message: "Adicione um campo de email com type='email'",
        weight: 15
      },
      {
        type: "must_have_password_input",
        message: "Adicione um campo de senha com type='password'",
        weight: 10
      },
      {
        type: "must_have_labels",
        message: "Use <label> conectados aos inputs (atributo 'for')",
        weight: 5
      }
    ],

    // Conquistas que o usuário pode desbloquear
    achievements: [
      {
        id: "first_html",
        title: "🎉 Primeiro HTML",
        description: "Você criou sua primeira página web!",
        condition: "complete_challenge"
      },
      {
        id: "semantic_master",
        title: "🏗️ Mestre da Semântica",
        description: "Usou todas as tags semânticas corretamente",
        condition: "perfect_validation"
      },
      {
        id: "accessibility_hero",
        title: "♿ Herói da Acessibilidade",
        description: "Conectou todos os labels corretamente",
        condition: "all_labels_connected"
      }
    ]
  },
  {
    id: 2,
    title: "Formulário Incompleto",
    description: "O formulário de cadastro do Quple está incompleto! Faltam alguns campos importantes que os usuários precisam preencher.",
    difficulty: "easy",
    xpReward: 60,
    estimatedTime: 45,
    prerequisites: [1],
    category: "html",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Cadastro</title>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <p>O app para casais</p>
  </header>

  <main>
    <h2>Crie sua conta</h2>
    <form>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
      </div>
      <!-- Faltam campos importantes aqui! -->
      <button type="submit">Criar Conta</button>
    </form>
  </main>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Cadastro</title>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <p>O app para casais</p>
  </header>

  <main>
    <h2>Crie sua conta</h2>
    <form>
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div>
        <label for="confirm-password">Confirmar Senha:</label>
        <input type="password" id="confirm-password" name="confirm-password" required>
      </div>
      <div>
        <label for="age">Idade:</label>
        <input type="number" id="age" name="age" min="18" required>
      </div>
      <button type="submit">Criar Conta</button>
    </form>

    <p>Já tem conta? <a href="/login">Entre aqui</a></p>
  </main>
</body>
</html>`,
    hints: [
      "Todo cadastro precisa de nome, não é?",
      "Adicione um campo para confirmar a senha",
      "O Quple é para maiores de 18, adicione campo de idade",
      "Use o atributo 'required' nos campos obrigatórios"
    ]
  },
  {
    id: 3,
    title: "Links Quebrados",
    description: "A navegação do Quple está quebrada! Os links não estão levando para lugar nenhum e alguns botões importantes sumiram.",
    difficulty: "easy",
    xpReward: 70,
    estimatedTime: 45,
    prerequisites: [2],
    category: "html",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Dashboard</title>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <nav>
      <!-- Links de navegação quebrados -->
      <a>Dashboard</a>
      <a>Perfil</a>
      <a>Objetivos</a>
      <a>Configurações</a>
    </nav>
  </header>

  <main>
    <h2>Bem-vindo ao Quple!</h2>
    <p>Gerencie seus objetivos como casal</p>

    <section>
      <h3>Ações Rápidas</h3>
      <!-- Botões de ação perdidos -->
    </section>

    <section>
      <h3>Objetivos Recentes</h3>
      <ul>
        <li>Jantar romântico - <span>Em progresso</span></li>
        <li>Viagem de fim de semana - <span>Concluído</span></li>
      </ul>
    </section>
  </main>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Dashboard</title>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <nav>
      <a href="/dashboard">Dashboard</a>
      <a href="/perfil">Perfil</a>
      <a href="/objetivos">Objetivos</a>
      <a href="/configuracoes">Configurações</a>
      <a href="/logout">Sair</a>
    </nav>
  </header>

  <main>
    <h2>Bem-vindo ao Quple!</h2>
    <p>Gerencie seus objetivos como casal</p>

    <section>
      <h3>Ações Rápidas</h3>
      <a href="/objetivos/novo">
        <button type="button">Criar Novo Objetivo</button>
      </a>
      <a href="/perfil/parceiro">
        <button type="button">Convidar Parceiro</button>
      </a>
      <a href="/objetivos">
        <button type="button">Ver Todos Objetivos</button>
      </a>
    </section>

    <section>
      <h3>Objetivos Recentes</h3>
      <ul>
        <li>
          <a href="/objetivos/1">Jantar romântico</a> -
          <span>Em progresso</span>
        </li>
        <li>
          <a href="/objetivos/2">Viagem de fim de semana</a> -
          <span>Concluído</span>
        </li>
      </ul>
    </section>
  </main>
</body>
</html>`,
    hints: [
      "Todo link precisa do atributo 'href'",
      "Adicione botões de ação na seção de ações rápidas",
      "Torne os objetivos clicáveis com links",
      "Não esqueça do link de 'Sair' na navegação"
    ]
  },
  {
    id: 4,
    title: "Conteúdo Bagunçado",
    description: "O HTML do Quple está todo bagunçado! A hierarquia de títulos está errada e o conteúdo está sem organização semântica.",
    difficulty: "medium",
    xpReward: 80,
    estimatedTime: 60,
    prerequisites: [3],
    category: "html",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Objetivos</title>
</head>
<body>
  <div>
    <h3>Quple</h3>
    <div>
      <span>Dashboard</span>
      <span>Perfil</span>
      <span>Objetivos</span>
    </div>
  </div>

  <div>
    <h1>Seus Objetivos</h1>

    <div>
      <h4>Objetivos Ativos</h4>
      <div>
        <h2>Jantar Romântico</h2>
        <div>Planeje um jantar especial para vocês dois</div>
        <div>Status: Em Progresso</div>
        <div>Prazo: 15/10/2024</div>
      </div>

      <div>
        <h2>Aprender Dança</h2>
        <div>Façam aulas de dança juntos</div>
        <div>Status: Não Iniciado</div>
        <div>Prazo: 30/10/2024</div>
      </div>
    </div>

    <div>
      <h4>Objetivos Concluídos</h4>
      <div>
        <h2>Primeira Viagem</h2>
        <div>Nossa primeira viagem como casal</div>
        <div>Concluído em: 20/09/2024</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Objetivos</title>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <nav>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/perfil">Perfil</a></li>
        <li><a href="/objetivos">Objetivos</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h2>Seus Objetivos</h2>

    <section>
      <h3>Objetivos Ativos</h3>

      <article>
        <h4>Jantar Romântico</h4>
        <p>Planeje um jantar especial para vocês dois</p>
        <p><strong>Status:</strong> Em Progresso</p>
        <p><strong>Prazo:</strong> <time datetime="2024-10-15">15/10/2024</time></p>
      </article>

      <article>
        <h4>Aprender Dança</h4>
        <p>Façam aulas de dança juntos</p>
        <p><strong>Status:</strong> Não Iniciado</p>
        <p><strong>Prazo:</strong> <time datetime="2024-10-30">30/10/2024</time></p>
      </article>
    </section>

    <section>
      <h3>Objetivos Concluídos</h3>

      <article>
        <h4>Primeira Viagem</h4>
        <p>Nossa primeira viagem como casal</p>
        <p><strong>Concluído em:</strong> <time datetime="2024-09-20">20/09/2024</time></p>
      </article>
    </section>
  </main>
</body>
</html>`,
    hints: [
      "Use header, main, section, article nas tags certas",
      "A hierarquia deve ser h1 > h2 > h3 > h4...",
      "Use nav com ul/li para navegação",
      "Tags time são ótimas para datas"
    ]
  },
  {
    id: 5,
    title: "App Sem Cor",
    description: "O Quple está todo sem cor e sem personalidade! Os usuários estão reclamando que está muito feio. Adicione cores, tipografia e estilo básico.",
    difficulty: "medium",
    xpReward: 90,
    estimatedTime: 90,
    prerequisites: [4],
    category: "css",
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Styled</title>
  <style>
    /* Adicione os estilos aqui */
  </style>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <p>O app para casais</p>
  </header>

  <main>
    <section class="welcome">
      <h2>Bem-vindos ao Quple!</h2>
      <p>Construam objetivos juntos e fortaleçam sua relação</p>
      <button class="cta-button">Começar Agora</button>
    </section>

    <section class="features">
      <h3>Por que usar o Quple?</h3>
      <div class="feature-list">
        <div class="feature">
          <h4>Objetivos Compartilhados</h4>
          <p>Criem e acompanhem objetivos juntos</p>
        </div>
        <div class="feature">
          <h4>Comunicação</h4>
          <p>Melhorem a comunicação no relacionamento</p>
        </div>
        <div class="feature">
          <h4>Progresso</h4>
          <p>Visualizem o crescimento como casal</p>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Styled</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 2rem 0;
      text-align: center;
      color: white;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .welcome {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      margin-bottom: 3rem;
    }

    .welcome h2 {
      color: #764ba2;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .welcome p {
      font-size: 1.3rem;
      color: #666;
      margin-bottom: 2rem;
    }

    .cta-button {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(118, 75, 162, 0.4);
    }

    .features {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .features h3 {
      color: #764ba2;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .feature-list {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .feature {
      flex: 1;
      min-width: 250px;
      padding: 2rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 15px;
      text-align: center;
    }

    .feature h4 {
      color: #667eea;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .feature p {
      color: #555;
      font-size: 1.1rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>Quple</h1>
    <p>O app para casais</p>
  </header>

  <main>
    <section class="welcome">
      <h2>Bem-vindos ao Quple!</h2>
      <p>Construam objetivos juntos e fortaleçam sua relação</p>
      <button class="cta-button">Começar Agora</button>
    </section>

    <section class="features">
      <h3>Por que usar o Quple?</h3>
      <div class="feature-list">
        <div class="feature">
          <h4>Objetivos Compartilhados</h4>
          <p>Criem e acompanhem objetivos juntos</p>
        </div>
        <div class="feature">
          <h4>Comunicação</h4>
          <p>Melhorem a comunicação no relacionamento</p>
        </div>
        <div class="feature">
          <h4>Progresso</h4>
          <p>Visualizem o crescimento como casal</p>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,
    hints: [
      "Use um gradiente de fundo para dar personalidade",
      "Adicione padding e margins para espaçamento",
      "Crie um botão com hover effects",
      "Use flexbox para organizar os cards de features"
    ]
  },
  {
    id: 6,
    title: "💥 Layout Quebrado",
    description: "**Situação:** O layout do Quple está completamente quebrado! Os elementos estão empilhados verticalmente e nada fica na posição certa.\n\n**Sua missão:** Usar CSS Flexbox para organizar o layout e deixar tudo alinhado perfeitamente. Este desafio vai te ensinar uma das habilidades mais importantes do CSS moderno!",
    difficulty: "medium",
    xpReward: 100,
    estimatedTime: 90,
    prerequisites: [5],
    category: "css",

    learningObjectives: [
      "Flexbox e suas propriedades essenciais",
      "Como alinhar elementos horizontal e verticalmente",
      "Distribuição de espaço entre elementos",
      "Layouts responsivos com flex"
    ],

    concepts: [
      {
        title: "Display Flex",
        description: "display: flex transforma um elemento em um container flexível, organizando seus filhos automaticamente."
      },
      {
        title: "Justify-Content",
        description: "Controla o alinhamento horizontal (eixo principal) dos elementos flex."
      },
      {
        title: "Align-Items",
        description: "Controla o alinhamento vertical (eixo transversal) dos elementos flex."
      },
      {
        title: "Flex-Direction",
        description: "Define se os elementos devem ficar em linha (row) ou coluna (column)."
      }
    ],

    resources: [
      {
        title: "📖 CSS Flexbox - MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox",
        type: "documentation",
        description: "Guia completo sobre Flexbox"
      },
      {
        title: "🎮 Flexbox Froggy",
        url: "https://flexboxfroggy.com/#pt-br",
        type: "tool",
        description: "Jogo para aprender Flexbox de forma divertida"
      },
      {
        title: "📚 CSS-Tricks Flexbox Guide",
        url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
        type: "documentation",
        description: "Guia visual completo do Flexbox"
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }

    /* 🚨 PROBLEMA: O header não está alinhado corretamente */
    .header {
      background: #6366f1;
      color: white;
      padding: 1rem 2rem;
      /* Adicione flexbox aqui para alinhar logo e navegação */
    }

    .logo {
      font-size: 2rem;
      font-weight: bold;
    }

    .nav {
      /* Lista de navegação precisa de flexbox */
    }

    .nav a {
      color: white;
      text-decoration: none;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background 0.3s;
    }

    .nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* 🚨 PROBLEMA: Os cards não estão lado a lado */
    .dashboard {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .stats-grid {
      margin-bottom: 2rem;
      gap: 1.5rem;
      /* Adicione flexbox para organizar os cards em linha */
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
      min-width: 200px;
      /* Faça os cards crescerem igualmente */
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 1.1rem;
    }

    /* 🚨 PROBLEMA: A seção de objetivos está desalinhada */
    .objectives-section {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .section-header {
      margin-bottom: 1.5rem;
      /* Alinhe título e botão horizontalmente */
    }

    .section-title {
      font-size: 1.5rem;
      color: #333;
    }

    .add-button {
      background: #10b981;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s;
    }

    .add-button:hover {
      background: #059669;
    }

    .objective-item {
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      margin-bottom: 1rem;
      /* Alinhe conteúdo do objetivo horizontalmente */
    }

    .objective-content {
      /* Flex para o conteúdo crescer */
    }

    .objective-title {
      font-weight: 500;
      color: #333;
      margin-bottom: 0.25rem;
    }

    .objective-status {
      color: #666;
      font-size: 0.9rem;
    }

    .objective-actions {
      /* Botões de ação lado a lado */
      gap: 0.5rem;
    }

    .action-btn {
      background: #f3f4f6;
      border: none;
      padding: 0.5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .action-btn:hover {
      background: #e5e7eb;
    }
  </style>
</head>
<body>
  <!--
    🚨 PROBLEMAS A RESOLVER:
    1. Logo e navegação não estão na mesma linha
    2. Cards de estatísticas empilhados verticalmente
    3. Título e botão "Adicionar" desalinhados
    4. Itens dos objetivos mal organizados

    ✅ SOLUÇÃO: Use Flexbox em todos os containers!

    💡 DICAS:
    - display: flex
    - justify-content: space-between (para espaçar nas pontas)
    - align-items: center (para centralizar verticalmente)
    - flex: 1 (para elementos crescerem igualmente)
  -->

  <header class="header">
    <div class="logo">Quple</div>
    <nav class="nav">
      <a href="#dashboard">Dashboard</a>
      <a href="#objectives">Objetivos</a>
      <a href="#profile">Perfil</a>
      <a href="#settings">Configurações</a>
    </nav>
  </header>

  <main class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">12</div>
        <div class="stat-label">Objetivos Ativos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">28</div>
        <div class="stat-label">Concluídos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">85%</div>
        <div class="stat-label">Taxa de Sucesso</div>
      </div>
    </div>

    <section class="objectives-section">
      <div class="section-header">
        <h2 class="section-title">Objetivos Recentes</h2>
        <button class="add-button">+ Adicionar Objetivo</button>
      </div>

      <div class="objective-item">
        <div class="objective-content">
          <div class="objective-title">Jantar romântico no restaurante novo</div>
          <div class="objective-status">Em progresso • Prazo: 25/09/2024</div>
        </div>
        <div class="objective-actions">
          <button class="action-btn">✏️</button>
          <button class="action-btn">✅</button>
        </div>
      </div>

      <div class="objective-item">
        <div class="objective-content">
          <div class="objective-title">Aprender uma receita nova juntos</div>
          <div class="objective-status">Não iniciado • Prazo: 30/09/2024</div>
        </div>
        <div class="objective-actions">
          <button class="action-btn">✏️</button>
          <button class="action-btn">▶️</button>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Dashboard</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }

    /* ✅ SOLUÇÃO: Header com flexbox para alinhar logo e navegação */
    .header {
      background: #6366f1;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 2rem;
      font-weight: bold;
    }

    .nav {
      display: flex;
      align-items: center;
    }

    .nav a {
      color: white;
      text-decoration: none;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background 0.3s;
    }

    .nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    /* ✅ SOLUÇÃO: Cards lado a lado com flexbox */
    .dashboard {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .stats-grid {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
      flex: 1; /* Cards crescem igualmente */
      min-width: 200px;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 1.1rem;
    }

    /* ✅ SOLUÇÃO: Seção de objetivos alinhada */
    .objectives-section {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
      color: #333;
    }

    .add-button {
      background: #10b981;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s;
    }

    .add-button:hover {
      background: #059669;
    }

    .objective-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      margin-bottom: 1rem;
    }

    .objective-content {
      flex: 1; /* Conteúdo cresce para ocupar espaço */
    }

    .objective-title {
      font-weight: 500;
      color: #333;
      margin-bottom: 0.25rem;
    }

    .objective-status {
      color: #666;
      font-size: 0.9rem;
    }

    .objective-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      background: #f3f4f6;
      border: none;
      padding: 0.5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .action-btn:hover {
      background: #e5e7eb;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo">Quple</div>
    <nav class="nav">
      <a href="#dashboard">Dashboard</a>
      <a href="#objectives">Objetivos</a>
      <a href="#profile">Perfil</a>
      <a href="#settings">Configurações</a>
    </nav>
  </header>

  <main class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">12</div>
        <div class="stat-label">Objetivos Ativos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">28</div>
        <div class="stat-label">Concluídos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">85%</div>
        <div class="stat-label">Taxa de Sucesso</div>
      </div>
    </div>

    <section class="objectives-section">
      <div class="section-header">
        <h2 class="section-title">Objetivos Recentes</h2>
        <button class="add-button">+ Adicionar Objetivo</button>
      </div>

      <div class="objective-item">
        <div class="objective-content">
          <div class="objective-title">Jantar romântico no restaurante novo</div>
          <div class="objective-status">Em progresso • Prazo: 25/09/2024</div>
        </div>
        <div class="objective-actions">
          <button class="action-btn">✏️</button>
          <button class="action-btn">✅</button>
        </div>
      </div>

      <div class="objective-item">
        <div class="objective-content">
          <div class="objective-title">Aprender uma receita nova juntos</div>
          <div class="objective-status">Não iniciado • Prazo: 30/09/2024</div>
        </div>
        <div class="objective-actions">
          <button class="action-btn">✏️</button>
          <button class="action-btn">▶️</button>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,

    hints: [
      {
        level: 1,
        title: "🔧 Display Flex no Header",
        content: "Adicione `display: flex` no `.header` e use `justify-content: space-between` para separar logo e navegação.",
        example: `.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`
      },
      {
        level: 2,
        title: "📊 Cards Lado a Lado",
        content: "No `.stats-grid`, use flexbox para colocar os cards em linha. Adicione `flex: 1` nos cards para crescerem igualmente.",
        example: `.stats-grid {
  display: flex;
  gap: 1.5rem;
}

.stat-card {
  flex: 1;
}`
      },
      {
        level: 3,
        title: "⚖️ Alinhamento da Seção",
        content: "No `.section-header`, use flexbox para alinhar título e botão nas pontas.",
        example: `.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`
      },
      {
        level: 4,
        title: "🎯 Items dos Objetivos",
        content: "Cada `.objective-item` precisa de flex para organizar conteúdo e botões. Use `flex: 1` no conteúdo.",
        example: `.objective-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.objective-content {
  flex: 1;
}`
      }
    ],

    validationRules: [
      {
        type: "header_has_flex",
        message: "O header deve usar display: flex",
        weight: 20
      },
      {
        type: "stats_grid_flex",
        message: "O .stats-grid deve usar flexbox",
        weight: 20
      },
      {
        type: "cards_equal_width",
        message: "Os cards devem ter flex: 1 para largura igual",
        weight: 15
      },
      {
        type: "section_header_flex",
        message: "O .section-header deve usar flexbox",
        weight: 15
      },
      {
        type: "objective_items_flex",
        message: "Os .objective-item devem usar flexbox",
        weight: 15
      },
      {
        type: "navigation_flex",
        message: "A navegação deve usar flexbox",
        weight: 10
      },
      {
        type: "proper_spacing",
        message: "Use gap ou margin para espaçamento adequado",
        weight: 5
      }
    ],

    achievements: [
      {
        id: "flexbox_master",
        title: "🏗️ Mestre do Flexbox",
        description: "Dominou o Flexbox como um profissional!",
        condition: "complete_challenge"
      },
      {
        id: "layout_designer",
        title: "🎨 Designer de Layouts",
        description: "Organizou um layout complexo perfeitamente",
        condition: "perfect_validation"
      },
      {
        id: "alignment_expert",
        title: "⚖️ Expert em Alinhamento",
        description: "Alinhou todos os elementos corretamente",
        condition: "all_flex_applied"
      }
    ]
  },
  {
    id: 7,
    title: "📱 Mobile Horrível",
    description: "**Situação:** O Quple está completamente quebrado no celular! Os usuários não conseguem usar o app em dispositivos móveis.\n\n**Sua missão:** Tornar o layout responsivo usando media queries e técnicas de design mobile-first. Aprenda a criar interfaces que funcionam em qualquer tela!",
    difficulty: "medium",
    xpReward: 120,
    estimatedTime: 120,
    prerequisites: [6],
    category: "css",

    learningObjectives: [
      "Media queries e breakpoints",
      "Design mobile-first",
      "Layout responsivo com flexbox",
      "Adaptação de elementos para diferentes telas"
    ],

    concepts: [
      {
        title: "Media Queries",
        description: "@media screen and (max-width: 768px) permite aplicar estilos diferentes para telas menores."
      },
      {
        title: "Mobile-First",
        description: "Comece projetando para mobile e depois adapte para desktop."
      },
      {
        title: "Breakpoints",
        description: "Pontos onde o layout muda: 768px (tablet), 1024px (desktop)."
      },
      {
        title: "Viewport Meta",
        description: "A tag viewport é essencial para sites responsivos funcionarem no mobile."
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Responsive</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }

    /* 🚨 PROBLEMA: Layout fixo não se adapta ao mobile */
    .header {
      background: #6366f1;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 2rem;
      font-weight: bold;
    }

    /* 🚨 PROBLEMA: Navegação quebrada no mobile */
    .nav {
      display: flex;
      align-items: center;
    }

    .nav a {
      color: white;
      text-decoration: none;
      margin: 0 1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background 0.3s;
    }

    /* 🚨 PROBLEMA: Cards não se adaptam a telas pequenas */
    .dashboard {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .stats-grid {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
      flex: 1;
      min-width: 200px;
    }

    /* 🚨 PROBLEMA: Textos muito grandes no mobile */
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 0.5rem;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 4rem 2rem;
    }

    /* 🚨 PROBLEMA: Título muito grande no mobile */
    .hero-title {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .cta-button {
      background: white;
      color: #667eea;
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
    }

    /* 🚨 PROBLEMA: Cards de features não se adaptam */
    .features {
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 2rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 3rem;
    }

    .feature-card {
      background: white;
      padding: 2.5rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .feature-description {
      color: #666;
      line-height: 1.6;
    }

    /*
      ✅ ADICIONE MEDIA QUERIES AQUI!

      Você precisa adicionar estilos para:
      - Telas pequenas (max-width: 768px)
      - Telas muito pequenas (max-width: 480px)

      Dicas do que ajustar:
      - Navegação em coluna no mobile
      - Cards empilhados verticalmente
      - Textos menores
      - Padding reduzido
      - Grid de features com 1 coluna
    */

  </style>
</head>
<body>
  <!--
    🚨 PROBLEMAS NO MOBILE:
    1. Navegação quebrada (links muito juntos)
    2. Cards cortados na horizontal
    3. Textos enormes
    4. Grid de features não cabe
    5. Botões muito pequenos para touch

    ✅ SOLUÇÕES:
    - Media queries para diferentes breakpoints
    - flex-direction: column no mobile
    - Fontes menores
    - Padding ajustado
    - Grid responsivo
  -->

  <header class="header">
    <div class="logo">Quple</div>
    <nav class="nav">
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#about">Sobre</a>
      <a href="#contact">Contato</a>
    </nav>
  </header>

  <section class="hero-section">
    <h1 class="hero-title">Construam o Amor Juntos</h1>
    <p class="hero-subtitle">
      O Quple ajuda casais a definirem e alcançarem objetivos compartilhados,
      fortalecendo a relação através de conquistas em comum.
    </p>
    <button class="cta-button">Começar Agora</button>
  </section>

  <main class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">10K+</div>
        <div class="stat-label">Casais Ativos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">50K+</div>
        <div class="stat-label">Objetivos Concluídos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">95%</div>
        <div class="stat-label">Satisfação</div>
      </div>
    </div>
  </main>

  <section class="features">
    <h2 style="text-align: center; font-size: 2.5rem; color: #333; margin-bottom: 1rem;">
      Por que escolher o Quple?
    </h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">💕</div>
        <h3 class="feature-title">Objetivos Compartilhados</h3>
        <p class="feature-description">
          Definam metas juntos e acompanhem o progresso de forma colaborativa
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3 class="feature-title">Sempre Conectados</h3>
        <p class="feature-description">
          Sincronização em tempo real entre os dispositivos do casal
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3 class="feature-title">Gamificação</h3>
        <p class="feature-description">
          Ganhem pontos e conquistas por cada objetivo alcançado juntos
        </p>
      </div>
    </div>
  </section>
</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Responsive</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
    }

    /* ✅ Base styles (mobile-first) */
    .header {
      background: #6366f1;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    /* ✅ Navegação adaptada para mobile */
    .nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 5px;
      transition: background 0.3s;
      font-size: 0.9rem;
    }

    .nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .dashboard {
      max-width: 1200px;
      margin: 1rem auto;
      padding: 0 1rem;
    }

    /* ✅ Cards empilhados no mobile */
    .stats-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }

    /* ✅ Textos ajustados para mobile */
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 0.5rem;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 2rem 1rem;
    }

    /* ✅ Título responsivo */
    .hero-title {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .hero-subtitle {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      opacity: 0.9;
      line-height: 1.5;
    }

    .cta-button {
      background: white;
      color: #667eea;
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      min-height: 48px; /* Touch-friendly */
    }

    .features {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .features h2 {
      text-align: center;
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 1rem;
    }

    /* ✅ Grid responsivo - 1 coluna no mobile */
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .feature-description {
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    /* ✅ TABLET - 768px e acima */
    @media screen and (min-width: 768px) {
      .header {
        padding: 1rem 2rem;
      }

      .logo {
        font-size: 2rem;
      }

      .nav {
        flex-direction: row;
        gap: 1rem;
      }

      .nav a {
        font-size: 1rem;
        padding: 0.5rem 1rem;
      }

      .dashboard {
        margin: 2rem auto;
        padding: 0 2rem;
      }

      /* Cards lado a lado no tablet */
      .stats-grid {
        flex-direction: row;
        gap: 1.5rem;
      }

      .stat-card {
        flex: 1;
        padding: 2rem;
      }

      .stat-number {
        font-size: 2.5rem;
      }

      .hero-section {
        padding: 3rem 2rem;
      }

      .hero-title {
        font-size: 3rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }

      .features {
        margin: 3rem auto;
        padding: 0 2rem;
      }

      .features h2 {
        font-size: 2.2rem;
      }

      /* 2 colunas no tablet */
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
    }

    /* ✅ DESKTOP - 1024px e acima */
    @media screen and (min-width: 1024px) {
      .hero-section {
        padding: 4rem 2rem;
      }

      .hero-title {
        font-size: 3.5rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
      }

      .features {
        margin: 4rem auto;
      }

      .features h2 {
        font-size: 2.5rem;
      }

      /* 3 colunas no desktop */
      .features-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .feature-card {
        padding: 2.5rem;
      }

      .feature-icon {
        font-size: 3rem;
      }

      .feature-title {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo">Quple</div>
    <nav class="nav">
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#about">Sobre</a>
      <a href="#contact">Contato</a>
    </nav>
  </header>

  <section class="hero-section">
    <h1 class="hero-title">Construam o Amor Juntos</h1>
    <p class="hero-subtitle">
      O Quple ajuda casais a definirem e alcançarem objetivos compartilhados,
      fortalecendo a relação através de conquistas em comum.
    </p>
    <button class="cta-button">Começar Agora</button>
  </section>

  <main class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">10K+</div>
        <div class="stat-label">Casais Ativos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">50K+</div>
        <div class="stat-label">Objetivos Concluídos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">95%</div>
        <div class="stat-label">Satisfação</div>
      </div>
    </div>
  </main>

  <section class="features">
    <h2>Por que escolher o Quple?</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">💕</div>
        <h3 class="feature-title">Objetivos Compartilhados</h3>
        <p class="feature-description">
          Definam metas juntos e acompanhem o progresso de forma colaborativa
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3 class="feature-title">Sempre Conectados</h3>
        <p class="feature-description">
          Sincronização em tempo real entre os dispositivos do casal
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3 class="feature-title">Gamificação</h3>
        <p class="feature-description">
          Ganhem pontos e conquistas por cada objetivo alcançado juntos
        </p>
      </div>
    </div>
  </section>
</body>
</html>`,

    hints: [
      {
        level: 1,
        title: "📱 Mobile-First Approach",
        content: "Comece com estilos para mobile (telas pequenas) e depois adicione media queries para telas maiores.",
        example: `/* Base: Mobile */
.stats-grid {
  flex-direction: column;
}

/* Tablet e acima */
@media screen and (min-width: 768px) {
  .stats-grid {
    flex-direction: row;
  }
}`
      },
      {
        level: 2,
        title: "🔧 Media Query Breakpoints",
        content: "Use breakpoints padrão: 768px para tablet e 1024px para desktop.",
        example: `@media screen and (min-width: 768px) {
  /* Estilos para tablet */
}

@media screen and (min-width: 1024px) {
  /* Estilos para desktop */
}`
      },
      {
        level: 3,
        title: "📏 Grid Responsivo",
        content: "Ajuste o grid conforme o tamanho da tela: 1 coluna (mobile), 2 colunas (tablet), 3 colunas (desktop).",
        example: `.features-grid {
  grid-template-columns: 1fr; /* Mobile */
}

@media screen and (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }
}

@media screen and (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop */
  }
}`
      },
      {
        level: 4,
        title: "✂️ Ajustar Textos e Espaçamentos",
        content: "Reduza fontes, padding e margins para mobile. Aumente gradualmente para telas maiores.",
        example: `.hero-title {
  font-size: 2rem; /* Mobile */
}

@media screen and (min-width: 768px) {
  .hero-title {
    font-size: 3rem; /* Tablet */
  }
}

@media screen and (min-width: 1024px) {
  .hero-title {
    font-size: 3.5rem; /* Desktop */
  }
}`
      }
    ],

    validationRules: [
      {
        type: "has_mobile_styles",
        message: "Deve ter estilos base para mobile",
        weight: 20
      },
      {
        type: "has_tablet_media_query",
        message: "Deve ter media query para tablet (768px)",
        weight: 20
      },
      {
        type: "has_desktop_media_query",
        message: "Deve ter media query para desktop (1024px)",
        weight: 20
      },
      {
        type: "responsive_grid",
        message: "Grid deve adaptar colunas por breakpoint",
        weight: 15
      },
      {
        type: "responsive_navigation",
        message: "Navegação deve adaptar para mobile",
        weight: 10
      },
      {
        type: "touch_friendly_buttons",
        message: "Botões devem ter min-height: 48px",
        weight: 10
      },
      {
        type: "responsive_typography",
        message: "Textos devem adaptar por breakpoint",
        weight: 5
      }
    ],

    achievements: [
      {
        id: "responsive_master",
        title: "📱 Mestre do Responsivo",
        description: "Criou um layout que funciona em qualquer dispositivo!",
        condition: "complete_challenge"
      },
      {
        id: "mobile_first_hero",
        title: "🌟 Herói Mobile-First",
        description: "Seguiu a metodologia mobile-first perfeitamente",
        condition: "mobile_first_approach"
      },
      {
        id: "breakpoint_expert",
        title: "📐 Expert em Breakpoints",
        description: "Usou media queries como um profissional",
        condition: "all_breakpoints_used"
      }
    ]
  },
  {
    id: 8,
    title: "👁️ Senha Visível",
    description: "**Situação:** O campo de senha do Quple não tem botão para mostrar/ocultar! Os usuários estão digitando senhas erradas porque não conseguem ver o que estão digitando.\n\n**Sua missão:** Implementar um toggle de visibilidade de senha usando JavaScript. Aprenda a manipular o DOM e criar interatividade!",
    difficulty: "medium",
    xpReward: 150,
    estimatedTime: 90,
    prerequisites: [7],
    category: "javascript",

    learningObjectives: [
      "Manipulação do DOM com JavaScript",
      "Event listeners e interatividade",
      "Alteração de atributos HTML dinamicamente",
      "Criação de componentes interativos"
    ],

    concepts: [
      {
        title: "DOM Manipulation",
        description: "document.querySelector() permite selecionar elementos HTML para modificá-los com JavaScript."
      },
      {
        title: "Event Listeners",
        description: "addEventListener('click', function) executa código quando o usuário clica em um elemento."
      },
      {
        title: "Toggle States",
        description: "Alternar entre dois estados (mostrar/ocultar) é um padrão comum em interfaces interativas."
      },
      {
        title: "Input Type Change",
        description: "Mudar input type de 'password' para 'text' torna a senha visível."
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Login Interativo</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-container {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo h1 {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .logo p {
      color: #666;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .form-group input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    /* 🚨 PROBLEMA: Botão de toggle não existe e não funciona */
    .password-toggle {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      color: #666;
      font-size: 1.2rem;
    }

    .password-toggle:hover {
      color: #667eea;
    }

    .login-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s;
      margin-top: 1rem;
    }

    .login-button:hover {
      transform: translateY(-2px);
    }

    .forgot-password {
      text-align: center;
      margin-top: 1.5rem;
    }

    .forgot-password a {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-password a:hover {
      text-decoration: underline;
    }

    /* Estilos para diferentes estados do input */
    .password-visible {
      border-color: #10b981 !important;
    }

    .password-hidden {
      border-color: #e1e5e9;
    }
  </style>
</head>
<body>
  <!--
    🚨 PROBLEMAS A RESOLVER:
    1. Não há botão para mostrar/ocultar senha
    2. Não há JavaScript para fazer o toggle
    3. Falta feedback visual quando senha está visível
    4. Não há validação básica

    ✅ O QUE IMPLEMENTAR:
    1. Adicionar botão de toggle no campo senha
    2. JavaScript para alternar type do input
    3. Mudar ícone baseado no estado
    4. Feedback visual quando senha visível
  -->

  <div class="login-container">
    <div class="logo">
      <h1>Quple</h1>
      <p>Entre na sua conta</p>
    </div>

    <form id="loginForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <div class="input-container">
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="input-container">
          <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
          <!-- 🚨 ADICIONE O BOTÃO DE TOGGLE AQUI -->
        </div>
      </div>

      <button type="submit" class="login-button">Entrar</button>

      <div class="forgot-password">
        <a href="#forgot">Esqueceu sua senha?</a>
      </div>
    </form>
  </div>

  <script>
    // 🚨 ADICIONE O JAVASCRIPT AQUI!

    /*
      ✅ PASSOS PARA IMPLEMENTAR:

      1. Selecionar elementos do DOM:
         - Campo de senha
         - Botão de toggle

      2. Criar função para alternar visibilidade:
         - Se type="password", mudar para "text"
         - Se type="text", mudar para "password"
         - Atualizar ícone do botão

      3. Adicionar event listener no botão:
         - Escutar clique
         - Executar função de toggle

      4. Bonus: Feedback visual
         - Mudar cor da borda
         - Adicionar classe CSS
    */

    // Selecionar elementos
    // const passwordInput = document.querySelector('#password');
    // const toggleButton = document.querySelector('#passwordToggle');

    // Função para alternar visibilidade
    // function togglePasswordVisibility() {
    //   // Seu código aqui
    // }

    // Adicionar event listener
    // toggleButton.addEventListener('click', togglePasswordVisibility);

    console.log('🚀 JavaScript carregado! Implemente a funcionalidade de toggle.');
  </script>
</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Login Interativo</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-container {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo h1 {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .logo p {
      color: #666;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .form-group input {
      width: 100%;
      padding: 1rem;
      padding-right: 3rem; /* Espaço para o botão */
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    /* ✅ SOLUÇÃO: Botão de toggle estilizado */
    .password-toggle {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      color: #666;
      font-size: 1.2rem;
      border-radius: 5px;
      transition: all 0.3s;
    }

    .password-toggle:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    .login-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s;
      margin-top: 1rem;
    }

    .login-button:hover {
      transform: translateY(-2px);
    }

    .forgot-password {
      text-align: center;
      margin-top: 1.5rem;
    }

    .forgot-password a {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-password a:hover {
      text-decoration: underline;
    }

    /* ✅ Estados visuais do input */
    .password-visible {
      border-color: #10b981 !important;
      background: rgba(16, 185, 129, 0.05);
    }

    .password-hidden {
      border-color: #e1e5e9;
    }

    /* Animação suave para o toggle */
    .password-toggle.active {
      color: #10b981;
      transform: scale(1.1);
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="logo">
      <h1>Quple</h1>
      <p>Entre na sua conta</p>
    </div>

    <form id="loginForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <div class="input-container">
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="input-container">
          <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
          <!-- ✅ SOLUÇÃO: Botão de toggle adicionado -->
          <button type="button" id="passwordToggle" class="password-toggle">👁️</button>
        </div>
      </div>

      <button type="submit" class="login-button">Entrar</button>

      <div class="forgot-password">
        <a href="#forgot">Esqueceu sua senha?</a>
      </div>
    </form>
  </div>

  <script>
    // ✅ SOLUÇÃO COMPLETA: JavaScript para toggle de senha

    // 1. Selecionar elementos do DOM
    const passwordInput = document.querySelector('#password');
    const toggleButton = document.querySelector('#passwordToggle');

    // 2. Variável para controlar estado
    let isPasswordVisible = false;

    // 3. Função para alternar visibilidade da senha
    function togglePasswordVisibility() {
      if (isPasswordVisible) {
        // Ocultar senha
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
        passwordInput.classList.remove('password-visible');
        passwordInput.classList.add('password-hidden');
        toggleButton.classList.remove('active');
        console.log('🔒 Senha ocultada');
      } else {
        // Mostrar senha
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
        passwordInput.classList.remove('password-hidden');
        passwordInput.classList.add('password-visible');
        toggleButton.classList.add('active');
        console.log('👁️ Senha visível');
      }

      // Alternar estado
      isPasswordVisible = !isPasswordVisible;

      // Manter foco no input
      passwordInput.focus();
    }

    // 4. Adicionar event listener ao botão
    toggleButton.addEventListener('click', togglePasswordVisibility);

    // 5. Bonus: Atalho de teclado (Ctrl + Espaço)
    passwordInput.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault();
        togglePasswordVisibility();
      }
    });

    // 6. Bonus: Feedback no console
    passwordInput.addEventListener('input', function() {
      const length = passwordInput.value.length;
      if (length > 0) {
        console.log(\`✍️ Senha tem \${length} caracteres\`);
      }
    });

    // 7. Validação simples do formulário
    document.querySelector('#loginForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const email = document.querySelector('#email').value;
      const password = passwordInput.value;

      if (email && password) {
        console.log('✅ Formulário válido!', { email, passwordLength: password.length });
        alert(\`Login simulado para: \${email}\`);
      } else {
        console.log('❌ Preencha todos os campos');
        alert('Por favor, preencha todos os campos');
      }
    });

    console.log('🚀 JavaScript carregado! Clique no olho para ver/ocultar a senha.');
    console.log('💡 Dica: Use Ctrl + Espaço como atalho!');
  </script>
</body>
</html>`,

    hints: [
      {
        level: 1,
        title: "🎯 Selecionar Elementos",
        content: "Use document.querySelector() para pegar o campo de senha e o botão de toggle.",
        example: `const passwordInput = document.querySelector('#password');
const toggleButton = document.querySelector('#passwordToggle');`
      },
      {
        level: 2,
        title: "👁️ Adicionar o Botão",
        content: "Adicione um botão dentro do .input-container com id='passwordToggle'",
        example: `<button type="button" id="passwordToggle" class="password-toggle">👁️</button>`
      },
      {
        level: 3,
        title: "🔄 Função de Toggle",
        content: "Crie uma função que alterna o tipo do input entre 'password' e 'text'",
        example: `function togglePasswordVisibility() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = '👁️';
  }
}`
      },
      {
        level: 4,
        title: "⚡ Event Listener",
        content: "Conecte o clique do botão à função de toggle",
        example: `toggleButton.addEventListener('click', togglePasswordVisibility);`
      }
    ],

    validationRules: [
      {
        type: "has_toggle_button",
        message: "Deve ter um botão de toggle no campo senha",
        weight: 25
      },
      {
        type: "button_has_event_listener",
        message: "Botão deve ter event listener para clique",
        weight: 25
      },
      {
        type: "changes_input_type",
        message: "Deve alterar o tipo do input entre password e text",
        weight: 20
      },
      {
        type: "updates_button_icon",
        message: "Deve atualizar o ícone do botão conforme estado",
        weight: 15
      },
      {
        type: "visual_feedback",
        message: "Deve ter feedback visual quando senha visível",
        weight: 10
      },
      {
        type: "maintains_focus",
        message: "Deve manter foco no input após toggle",
        weight: 5
      }
    ],

    achievements: [
      {
        id: "javascript_interactive",
        title: "⚡ JavaScript Interativo",
        description: "Criou sua primeira funcionalidade interativa!",
        condition: "complete_challenge"
      },
      {
        id: "dom_manipulator",
        title: "🎭 Manipulador do DOM",
        description: "Dominou a manipulação de elementos HTML",
        condition: "perfect_dom_manipulation"
      },
      {
        id: "ux_enhancer",
        title: "✨ Melhorador de UX",
        description: "Melhorou a experiência do usuário com JavaScript",
        condition: "enhanced_user_experience"
      }
    ]
  },
  {
    id: 9,
    title: "✅ Validação Ausente",
    description: "**Situação:** O formulário de cadastro do Quple aceita qualquer coisa! Emails inválidos, senhas fracas, campos vazios... está um caos!\n\n**Sua missão:** Implementar validação completa em tempo real usando JavaScript. Aprenda a criar formulários seguros e com boa experiência de usuário!",
    difficulty: "hard",
    xpReward: 180,
    estimatedTime: 120,
    prerequisites: [8],
    category: "javascript",

    learningObjectives: [
      "Validação de formulários em tempo real",
      "Expressões regulares (RegEx) básicas",
      "Feedback visual para o usuário",
      "Prevenção de envio de dados inválidos"
    ],

    concepts: [
      {
        title: "Form Validation",
        description: "Validar dados no frontend melhora a experiência, mas a validação no backend é obrigatória para segurança."
      },
      {
        title: "Regular Expressions",
        description: "RegEx são padrões para validar strings, como emails, telefones e senhas."
      },
      {
        title: "Real-time Feedback",
        description: "Mostrar erros enquanto o usuário digita cria uma experiência mais fluida."
      },
      {
        title: "Event Types",
        description: "Different events like 'input', 'blur', 'focus' permitem diferentes tipos de validação."
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Cadastro com Validação</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .register-container {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 500px;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo h1 {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .logo p {
      color: #666;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .input-container {
      position: relative;
    }

    .form-group input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    /* 🚨 PROBLEMA: Não há estilos para estados de validação */
    .input-valid {
      border-color: #10b981 !important;
      background: rgba(16, 185, 129, 0.05);
    }

    .input-invalid {
      border-color: #ef4444 !important;
      background: rgba(239, 68, 68, 0.05);
    }

    /* 🚨 PROBLEMA: Mensagens de erro não existem */
    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      display: none; /* Será mostrada via JavaScript */
    }

    .success-message {
      color: #10b981;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      display: none;
    }

    /* Indicador de força da senha */
    .password-strength {
      margin-top: 0.5rem;
      height: 4px;
      background: #e1e5e9;
      border-radius: 2px;
      overflow: hidden;
    }

    .password-strength-bar {
      height: 100%;
      width: 0%;
      transition: all 0.3s;
      border-radius: 2px;
    }

    .strength-weak { background: #ef4444; width: 25%; }
    .strength-fair { background: #f59e0b; width: 50%; }
    .strength-good { background: #10b981; width: 75%; }
    .strength-strong { background: #059669; width: 100%; }

    .register-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 1rem;
    }

    .register-button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .register-button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .checkbox-group input[type="checkbox"] {
      width: auto;
      margin-top: 0.2rem;
    }

    .checkbox-group label {
      font-size: 0.9rem;
      line-height: 1.4;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <!--
    🚨 PROBLEMAS A RESOLVER:
    1. Não há validação de email
    2. Não há validação de senha forte
    3. Confirmação de senha não é verificada
    4. Não há feedback visual em tempo real
    5. Formulário pode ser enviado com dados inválidos

    ✅ O QUE IMPLEMENTAR:
    1. Validação de email com RegEx
    2. Validação de senha (8+ chars, maiúscula, número, símbolo)
    3. Confirmação de senha
    4. Validação de nome (2+ chars)
    5. Feedback visual em tempo real
    6. Indicador de força da senha
    7. Disable botão se inválido
  -->

  <div class="register-container">
    <div class="logo">
      <h1>Quple</h1>
      <p>Crie sua conta</p>
    </div>

    <form id="registerForm" novalidate>
      <div class="form-group">
        <label for="fullName">Nome Completo:</label>
        <div class="input-container">
          <input type="text" id="fullName" name="fullName" placeholder="Seu nome completo" required>
          <div class="error-message" id="fullNameError"></div>
          <div class="success-message" id="fullNameSuccess"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <div class="input-container">
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
          <div class="error-message" id="emailError"></div>
          <div class="success-message" id="emailSuccess"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="input-container">
          <input type="password" id="password" name="password" placeholder="Crie uma senha forte" required>
          <div class="password-strength">
            <div class="password-strength-bar" id="passwordStrengthBar"></div>
          </div>
          <div class="error-message" id="passwordError"></div>
          <div class="success-message" id="passwordSuccess"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmar Senha:</label>
        <div class="input-container">
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Digite a senha novamente" required>
          <div class="error-message" id="confirmPasswordError"></div>
          <div class="success-message" id="confirmPasswordSuccess"></div>
        </div>
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="termsAccepted" name="termsAccepted" required>
        <label for="termsAccepted">
          Li e aceito os <a href="#terms" style="color: #667eea;">termos de uso</a> e
          <a href="#privacy" style="color: #667eea;">política de privacidade</a>
        </label>
      </div>
      <div class="error-message" id="termsError"></div>

      <button type="submit" class="register-button" id="registerButton" disabled>
        Criar Conta
      </button>

      <div class="login-link">
        <a href="#login">Já tem conta? Entre aqui</a>
      </div>
    </form>
  </div>

  <script>
    // 🚨 IMPLEMENTE A VALIDAÇÃO AQUI!

    /*
      ✅ FUNCIONALIDADES NECESSÁRIAS:

      1. Validação de Nome:
         - Mínimo 2 caracteres
         - Apenas letras e espaços

      2. Validação de Email:
         - Formato válido (RegEx)
         - Não pode estar vazio

      3. Validação de Senha:
         - Mínimo 8 caracteres
         - Pelo menos 1 maiúscula
         - Pelo menos 1 número
         - Pelo menos 1 símbolo
         - Indicador de força visual

      4. Confirmação de Senha:
         - Deve ser idêntica à senha

      5. Termos de Uso:
         - Deve estar marcado

      6. Controle do Botão:
         - Disabled se alguma validação falhar
         - Enabled apenas quando tudo válido

      7. Feedback Visual:
         - Bordas verdes/vermelhas
         - Mensagens de erro/sucesso
    */

    console.log('🚀 JavaScript carregado! Implemente as validações.');
    console.log('💡 Dica: Comece pela validação mais simples (nome) e vá avançando.');
  </script>
</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Cadastro com Validação</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .register-container {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 500px;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo h1 {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .logo p {
      color: #666;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }

    .input-container {
      position: relative;
    }

    .form-group input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    /* ✅ Estados de validação */
    .input-valid {
      border-color: #10b981 !important;
      background: rgba(16, 185, 129, 0.05);
    }

    .input-invalid {
      border-color: #ef4444 !important;
      background: rgba(239, 68, 68, 0.05);
    }

    /* ✅ Mensagens de feedback */
    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      display: none;
    }

    .error-message.show {
      display: block;
    }

    .success-message {
      color: #10b981;
      font-size: 0.85rem;
      margin-top: 0.5rem;
      display: none;
    }

    .success-message.show {
      display: block;
    }

    /* Indicador de força da senha */
    .password-strength {
      margin-top: 0.5rem;
      height: 4px;
      background: #e1e5e9;
      border-radius: 2px;
      overflow: hidden;
    }

    .password-strength-bar {
      height: 100%;
      width: 0%;
      transition: all 0.3s;
      border-radius: 2px;
    }

    .strength-weak { background: #ef4444; width: 25%; }
    .strength-fair { background: #f59e0b; width: 50%; }
    .strength-good { background: #10b981; width: 75%; }
    .strength-strong { background: #059669; width: 100%; }

    .register-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 1rem;
    }

    .register-button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .register-button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
    }

    .login-link a {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .checkbox-group input[type="checkbox"] {
      width: auto;
      margin-top: 0.2rem;
    }

    .checkbox-group label {
      font-size: 0.9rem;
      line-height: 1.4;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="register-container">
    <div class="logo">
      <h1>Quple</h1>
      <p>Crie sua conta</p>
    </div>

    <form id="registerForm" novalidate>
      <div class="form-group">
        <label for="fullName">Nome Completo:</label>
        <div class="input-container">
          <input type="text" id="fullName" name="fullName" placeholder="Seu nome completo" required>
          <div class="error-message" id="fullNameError"></div>
          <div class="success-message" id="fullNameSuccess"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <div class="input-container">
          <input type="email" id="email" name="email" placeholder="seu@email.com" required>
          <div class="error-message" id="emailError"></div>
          <div class="success-message" id="emailSuccess"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <div class="input-container">
          <input type="password" id="password" name="password" placeholder="Crie uma senha forte" required>
          <div class="password-strength">
            <div class="password-strength-bar" id="passwordStrengthBar"></div>
          </div>
          <div class="error-message" id="passwordError"></div>
          <div class="success-message" id="passwordSuccess"></div>
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmar Senha:</label>
        <div class="input-container">
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Digite a senha novamente" required>
          <div class="error-message" id="confirmPasswordError"></div>
          <div class="success-message" id="confirmPasswordSuccess"></div>
        </div>
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="termsAccepted" name="termsAccepted" required>
        <label for="termsAccepted">
          Li e aceito os <a href="#terms" style="color: #667eea;">termos de uso</a> e
          <a href="#privacy" style="color: #667eea;">política de privacidade</a>
        </label>
      </div>
      <div class="error-message" id="termsError"></div>

      <button type="submit" class="register-button" id="registerButton" disabled>
        Criar Conta
      </button>

      <div class="login-link">
        <a href="#login">Já tem conta? Entre aqui</a>
      </div>
    </form>
  </div>

  <script>
    // ✅ SOLUÇÃO COMPLETA: Sistema de validação em tempo real

    // 1. Seleção de elementos
    const form = document.getElementById('registerForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsAccepted');
    const registerButton = document.getElementById('registerButton');
    const passwordStrengthBar = document.getElementById('passwordStrengthBar');

    // 2. Estado de validação
    const validationState = {
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false,
      terms: false
    };

    // 3. Expressões regulares
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

    // 4. Funções de validação
    function validateFullName() {
      const value = fullNameInput.value.trim();
      const errorElement = document.getElementById('fullNameError');
      const successElement = document.getElementById('fullNameSuccess');

      if (value.length < 2) {
        showError(fullNameInput, errorElement, successElement, 'Nome deve ter pelo menos 2 caracteres');
        validationState.fullName = false;
      } else if (!nameRegex.test(value)) {
        showError(fullNameInput, errorElement, successElement, 'Nome deve conter apenas letras e espaços');
        validationState.fullName = false;
      } else {
        showSuccess(fullNameInput, errorElement, successElement, 'Nome válido');
        validationState.fullName = true;
      }
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      const errorElement = document.getElementById('emailError');
      const successElement = document.getElementById('emailSuccess');

      if (value === '') {
        showError(emailInput, errorElement, successElement, 'Email é obrigatório');
        validationState.email = false;
      } else if (!emailRegex.test(value)) {
        showError(emailInput, errorElement, successElement, 'Formato de email inválido');
        validationState.email = false;
      } else {
        showSuccess(emailInput, errorElement, successElement, 'Email válido');
        validationState.email = true;
      }
    }

    function validatePassword() {
      const value = passwordInput.value;
      const errorElement = document.getElementById('passwordError');
      const successElement = document.getElementById('passwordSuccess');

      // Critérios da senha
      const hasMinLength = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

      const score = [hasMinLength, hasUpperCase, hasNumber, hasSymbol].filter(Boolean).length;

      // Atualizar indicador de força
      updatePasswordStrength(score);

      if (value === '') {
        showError(passwordInput, errorElement, successElement, 'Senha é obrigatória');
        validationState.password = false;
      } else if (!hasMinLength) {
        showError(passwordInput, errorElement, successElement, 'Senha deve ter pelo menos 8 caracteres');
        validationState.password = false;
      } else if (score < 3) {
        showError(passwordInput, errorElement, successElement, 'Senha deve ter maiúscula, número e símbolo');
        validationState.password = false;
      } else {
        showSuccess(passwordInput, errorElement, successElement, 'Senha forte');
        validationState.password = true;
      }

      // Re-validar confirmação se já foi preenchida
      if (confirmPasswordInput.value) {
        validateConfirmPassword();
      }
    }

    function validateConfirmPassword() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const errorElement = document.getElementById('confirmPasswordError');
      const successElement = document.getElementById('confirmPasswordSuccess');

      if (confirmPassword === '') {
        showError(confirmPasswordInput, errorElement, successElement, 'Confirmação de senha é obrigatória');
        validationState.confirmPassword = false;
      } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, errorElement, successElement, 'Senhas não coincidem');
        validationState.confirmPassword = false;
      } else {
        showSuccess(confirmPasswordInput, errorElement, successElement, 'Senhas coincidem');
        validationState.confirmPassword = true;
      }
    }

    function validateTerms() {
      const errorElement = document.getElementById('termsError');

      if (!termsCheckbox.checked) {
        errorElement.textContent = 'Você deve aceitar os termos de uso';
        errorElement.classList.add('show');
        validationState.terms = false;
      } else {
        errorElement.classList.remove('show');
        validationState.terms = true;
      }
    }

    // 5. Funções auxiliares
    function showError(input, errorElement, successElement, message) {
      input.classList.remove('input-valid');
      input.classList.add('input-invalid');
      errorElement.textContent = message;
      errorElement.classList.add('show');
      successElement.classList.remove('show');
    }

    function showSuccess(input, errorElement, successElement, message) {
      input.classList.remove('input-invalid');
      input.classList.add('input-valid');
      errorElement.classList.remove('show');
      successElement.textContent = message;
      successElement.classList.add('show');
    }

    function updatePasswordStrength(score) {
      const classes = ['strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];

      // Remove todas as classes
      passwordStrengthBar.className = 'password-strength-bar';

      // Adiciona a classe correspondente
      if (score > 0) {
        passwordStrengthBar.classList.add(classes[score - 1]);
      }
    }

    function updateSubmitButton() {
      const allValid = Object.values(validationState).every(state => state === true);
      registerButton.disabled = !allValid;
    }

    // 6. Event listeners
    fullNameInput.addEventListener('input', () => {
      validateFullName();
      updateSubmitButton();
    });

    emailInput.addEventListener('input', () => {
      validateEmail();
      updateSubmitButton();
    });

    passwordInput.addEventListener('input', () => {
      validatePassword();
      updateSubmitButton();
    });

    confirmPasswordInput.addEventListener('input', () => {
      validateConfirmPassword();
      updateSubmitButton();
    });

    termsCheckbox.addEventListener('change', () => {
      validateTerms();
      updateSubmitButton();
    });

    // 7. Validação no blur (quando perde o foco)
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

    // 8. Submissão do formulário
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Validar tudo novamente
      validateFullName();
      validateEmail();
      validatePassword();
      validateConfirmPassword();
      validateTerms();
      updateSubmitButton();

      // Verificar se tudo está válido
      const allValid = Object.values(validationState).every(state => state === true);

      if (allValid) {
        // Simular envio
        registerButton.textContent = 'Criando conta...';
        registerButton.disabled = true;

        setTimeout(() => {
          alert('🎉 Conta criada com sucesso! Bem-vindo ao Quple!');
          console.log('✅ Dados do formulário:', {
            fullName: fullNameInput.value,
            email: emailInput.value,
            passwordLength: passwordInput.value.length
          });
          registerButton.textContent = 'Criar Conta';
          registerButton.disabled = false;
        }, 2000);
      } else {
        alert('❌ Por favor, corrija os erros no formulário');
      }
    });

    console.log('🚀 Sistema de validação carregado!');
    console.log('✅ Validações ativas: Nome, Email, Senha, Confirmação, Termos');
    console.log('🎯 Digite em qualquer campo para ver a validação em tempo real');
  </script>
</body>
</html>`,

    hints: [
      {
        level: 1,
        title: "📝 Validação Básica de Nome",
        content: "Comece validando se o nome tem pelo menos 2 caracteres e use uma expressão regular simples.",
        example: `function validateFullName() {
  const value = fullNameInput.value.trim();
  if (value.length < 2) {
    // mostrar erro
  } else {
    // mostrar sucesso
  }
}`
      },
      {
        level: 2,
        title: "📧 Validação de Email",
        content: "Use uma expressão regular para validar o formato do email.",
        example: `const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  // email inválido
}`
      },
      {
        level: 3,
        title: "🔒 Validação de Senha Forte",
        content: "Verifique se a senha tem maiúscula, número, símbolo e 8+ caracteres.",
        example: `const hasUpperCase = /[A-Z]/.test(password);
const hasNumber = /\d/.test(password);
const hasSymbol = /[!@#$%^&*]/.test(password);
const hasMinLength = password.length >= 8;`
      },
      {
        level: 4,
        title: "🎨 Feedback Visual",
        content: "Adicione/remova classes CSS para mostrar estados válidos/inválidos.",
        example: `function showError(input, errorElement, message) {
  input.classList.add('input-invalid');
  errorElement.textContent = message;
  errorElement.classList.add('show');
}`
      }
    ],

    validationRules: [
      {
        type: "validates_name_length",
        message: "Deve validar nome com mínimo 2 caracteres",
        weight: 15
      },
      {
        type: "validates_email_format",
        message: "Deve validar formato do email com RegEx",
        weight: 20
      },
      {
        type: "validates_password_strength",
        message: "Deve validar senha forte (maiúscula, número, símbolo)",
        weight: 20
      },
      {
        type: "validates_password_confirmation",
        message: "Deve validar confirmação de senha",
        weight: 15
      },
      {
        type: "validates_terms_acceptance",
        message: "Deve validar aceitação dos termos",
        weight: 10
      },
      {
        type: "shows_visual_feedback",
        message: "Deve mostrar feedback visual (bordas coloridas)",
        weight: 10
      },
      {
        type: "disables_submit_when_invalid",
        message: "Botão deve ficar disabled quando dados inválidos",
        weight: 10
      }
    ],

    achievements: [
      {
        id: "validation_master",
        title: "✅ Mestre da Validação",
        description: "Implementou sistema completo de validação!",
        condition: "complete_challenge"
      },
      {
        id: "regex_expert",
        title: "🔍 Expert em RegEx",
        description: "Usou expressões regulares como um profissional",
        condition: "perfect_regex_usage"
      },
      {
        id: "ux_validator",
        title: "🎯 Validador de UX",
        description: "Criou validação com excelente experiência do usuário",
        condition: "excellent_user_feedback"
      }
    ]
  },
  {
    id: 10,
    title: "⚛️ Transformar em Componente",
    description: "**Situação:** Chegou a hora de dar o próximo passo! Você dominou HTML, CSS e JavaScript. Agora precisa transformar seu código em um componente React moderno.\n\n**Sua missão:** Refatorar o formulário de login para React com hooks, props e state management. Welcome to the future of web development! 🚀",
    difficulty: "hard",
    xpReward: 200,
    estimatedTime: 150,
    prerequisites: [9],
    category: "react",

    learningObjectives: [
      "Componentes React funcionais",
      "React Hooks (useState, useEffect)",
      "Props e prop types",
      "Gerenciamento de estado local",
      "Event handling em React"
    ],

    concepts: [
      {
        title: "Functional Components",
        description: "Componentes React modernos são funções que retornam JSX, mais simples que class components."
      },
      {
        title: "useState Hook",
        description: "useState permite adicionar estado a componentes funcionais de forma simples e limpa."
      },
      {
        title: "useEffect Hook",
        description: "useEffect gerencia side effects como validações, API calls e subscriptions."
      },
      {
        title: "JSX",
        description: "JSX é uma sintaxe que combina JavaScript com HTML, compilada para React.createElement()."
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Login React</title>

  <!-- ✅ React via CDN para desenvolvimento -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-title {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .logo-subtitle {
      color: #666;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
      font-size: 0.9rem;
    }

    .form-input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .input-valid {
      border-color: #10b981 !important;
      background: rgba(16, 185, 129, 0.05);
    }

    .input-invalid {
      border-color: #ef4444 !important;
      background: rgba(239, 68, 68, 0.05);
    }

    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .success-message {
      color: #10b981;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .submit-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }

    .loading {
      opacity: 0.7;
    }

    .forgot-link {
      text-align: center;
      margin-top: 1.5rem;
    }

    .forgot-link a {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // 🚨 PROBLEMA: Código está em HTML/JavaScript vanilla
    // ✅ MISSÃO: Converter para componente React!

    /*
      ✅ O QUE VOCÊ PRECISA FAZER:

      1. Criar componente LoginForm usando React
      2. Usar useState para gerenciar estado do formulário
      3. Implementar validação em tempo real
      4. Usar useEffect para side effects
      5. Converter event handlers para React
      6. Implementar prop types se possível

      ESTRUTURA SUGERIDA:
      - LoginForm (componente principal)
      - FormInput (componente reutilizável)
      - ValidationMessage (componente de mensagens)
    */

    // 🚨 SUBSTITUA ESTE CÓDIGO HTML/JS POR COMPONENTES REACT

    function LoginForm() {
      // ✅ 1. State management com useState
      // const [formData, setFormData] = React.useState({
      //   email: '',
      //   password: ''
      // });

      // ✅ 2. Estado de validação
      // const [validation, setValidation] = React.useState({
      //   email: { isValid: false, message: '' },
      //   password: { isValid: false, message: '' }
      // });

      // ✅ 3. Estados da UI
      // const [isLoading, setIsLoading] = React.useState(false);

      // ✅ 4. Funções de validação
      // const validateEmail = (email) => {
      //   // Implementar validação de email
      // };

      // const validatePassword = (password) => {
      //   // Implementar validação de senha
      // };

      // ✅ 5. Handlers de eventos
      // const handleInputChange = (e) => {
      //   // Atualizar estado e validar
      // };

      // const handleSubmit = (e) => {
      //   // Enviar formulário
      // };

      // ✅ 6. useEffect para validação em tempo real
      // React.useEffect(() => {
      //   // Validar quando formData mudar
      // }, [formData]);

      return (
        <div className="container">
          <div className="login-card">
            <div className="logo">
              <h1 className="logo-title">Quple</h1>
              <p className="logo-subtitle">Entre na sua conta</p>
            </div>

            {/* ✅ IMPLEMENTE O FORMULÁRIO AQUI */}
            <form>
              <div style={{color: '#666', textAlign: 'center', padding: '2rem'}}>
                🚧 Implemente os componentes React aqui!
                <br /><br />
                Dicas:
                <br />• Use useState para formData
                <br />• Use useEffect para validação
                <br />• Crie componentes reutilizáveis
              </div>
            </form>
          </div>
        </div>
      );
    }

    // ✅ COMPONENTES AUXILIARES SUGERIDOS:

    // function FormInput({ label, type, name, value, onChange, validation }) {
    //   return (
    //     <div className="form-group">
    //       {/* Implementar input com validação */}
    //     </div>
    //   );
    // }

    // function ValidationMessage({ validation }) {
    //   return (
    //     <div>
    //       {/* Mostrar mensagem de erro/sucesso */}
    //     </div>
    //   );
    // }

    // ✅ Renderizar o app
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<LoginForm />);

    console.log('🚀 React carregado! Transforme este código em componentes React.');
    console.log('💡 Comece implementando o estado com useState.');
  </script>
</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quple - Login React</title>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-title {
      font-size: 2.5rem;
      color: #667eea;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .logo-subtitle {
      color: #666;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
      font-size: 0.9rem;
    }

    .form-input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .input-valid {
      border-color: #10b981 !important;
      background: rgba(16, 185, 129, 0.05);
    }

    .input-invalid {
      border-color: #ef4444 !important;
      background: rgba(239, 68, 68, 0.05);
    }

    .error-message {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .success-message {
      color: #10b981;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .submit-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }

    .loading {
      opacity: 0.7;
    }

    .forgot-link {
      text-align: center;
      margin-top: 1.5rem;
    }

    .forgot-link a {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // ✅ SOLUÇÃO COMPLETA: Componente React com hooks

    // Componente de mensagem de validação
    function ValidationMessage({ validation }) {
      if (!validation.message) return null;

      const className = validation.isValid ? 'success-message' : 'error-message';

      return (
        <div className={className}>
          {validation.message}
        </div>
      );
    }

    // Componente de input reutilizável
    function FormInput({ label, type, name, value, onChange, validation, placeholder }) {
      const inputClassName = \`form-input \${
        validation.message
          ? validation.isValid
            ? 'input-valid'
            : 'input-invalid'
          : ''
      }\`;

      return (
        <div className="form-group">
          <label htmlFor={name} className="form-label">
            {label}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClassName}
            placeholder={placeholder}
            required
          />
          <ValidationMessage validation={validation} />
        </div>
      );
    }

    // Componente principal do formulário
    function LoginForm() {
      // ✅ 1. Estado do formulário
      const [formData, setFormData] = React.useState({
        email: '',
        password: ''
      });

      // ✅ 2. Estado de validação
      const [validation, setValidation] = React.useState({
        email: { isValid: false, message: '' },
        password: { isValid: false, message: '' }
      });

      // ✅ 3. Estados da UI
      const [isLoading, setIsLoading] = React.useState(false);

      // ✅ 4. Regex para validação
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // ✅ 5. Funções de validação
      const validateEmail = React.useCallback((email) => {
        if (email === '') {
          return { isValid: false, message: 'Email é obrigatório' };
        } else if (!emailRegex.test(email)) {
          return { isValid: false, message: 'Formato de email inválido' };
        } else {
          return { isValid: true, message: '✓ Email válido' };
        }
      }, [emailRegex]);

      const validatePassword = React.useCallback((password) => {
        if (password === '') {
          return { isValid: false, message: 'Senha é obrigatória' };
        } else if (password.length < 6) {
          return { isValid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
        } else {
          return { isValid: true, message: '✓ Senha válida' };
        }
      }, []);

      // ✅ 6. Handler de mudança de input
      const handleInputChange = React.useCallback((e) => {
        const { name, value } = e.target;

        // Atualizar dados do formulário
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));

        // Validar em tempo real
        let newValidation;
        if (name === 'email') {
          newValidation = validateEmail(value);
        } else if (name === 'password') {
          newValidation = validatePassword(value);
        }

        setValidation(prevValidation => ({
          ...prevValidation,
          [name]: newValidation
        }));
      }, [validateEmail, validatePassword]);

      // ✅ 7. Handler de envio do formulário
      const handleSubmit = React.useCallback(async (e) => {
        e.preventDefault();

        // Validar tudo novamente
        const emailValidation = validateEmail(formData.email);
        const passwordValidation = validatePassword(formData.password);

        setValidation({
          email: emailValidation,
          password: passwordValidation
        });

        // Verificar se tudo é válido
        if (emailValidation.isValid && passwordValidation.isValid) {
          setIsLoading(true);

          try {
            // Simular API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Sucesso
            alert(\`🎉 Login realizado com sucesso!\nBem-vindo, \${formData.email}!\`);
            console.log('✅ Login data:', {
              email: formData.email,
              timestamp: new Date().toISOString()
            });

          } catch (error) {
            console.error('❌ Erro no login:', error);
            alert('❌ Erro ao fazer login. Tente novamente.');
          } finally {
            setIsLoading(false);
          }
        } else {
          console.log('❌ Formulário inválido');
        }
      }, [formData, validateEmail, validatePassword]);

      // ✅ 8. Verificar se formulário é válido
      const isFormValid = React.useMemo(() => {
        return validation.email.isValid && validation.password.isValid;
      }, [validation]);

      // ✅ 9. useEffect para logs e debugging
      React.useEffect(() => {
        console.log('🔄 Form data updated:', formData);
      }, [formData]);

      React.useEffect(() => {
        console.log('✅ Validation updated:', validation);
      }, [validation]);

      return (
        <div className="container">
          <div className="login-card">
            <div className="logo">
              <h1 className="logo-title">Quple</h1>
              <p className="logo-subtitle">Entre na sua conta</p>
            </div>

            <form onSubmit={handleSubmit}>
              <FormInput
                label="Email:"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                validation={validation.email}
                placeholder="seu@email.com"
              />

              <FormInput
                label="Senha:"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                validation={validation.password}
                placeholder="Digite sua senha"
              />

              <button
                type="submit"
                className={\`submit-button \${isLoading ? 'loading' : ''}\`}
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="forgot-link">
              <a href="#forgot">Esqueceu sua senha?</a>
            </div>
          </div>
        </div>
      );
    }

    // ✅ Renderizar aplicação
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<LoginForm />);

    console.log('🚀 React App carregada!');
    console.log('✅ Funcionalidades implementadas:');
    console.log('  • Componentes funcionais');
    console.log('  • useState para estado');
    console.log('  • useEffect para side effects');
    console.log('  • useCallback para otimização');
    console.log('  • useMemo para computações');
    console.log('  • Validação em tempo real');
    console.log('  • Componentes reutilizáveis');
  </script>
</body>
</html>`,

    hints: [
      {
        level: 1,
        title: "🎯 Setup Básico do Estado",
        content: "Comece criando o estado do formulário com useState. Use um objeto para os dados.",
        example: `const [formData, setFormData] = React.useState({
  email: '',
  password: ''
});`
      },
      {
        level: 2,
        title: "📝 Componente de Input",
        content: "Crie um componente FormInput reutilizável que aceita props como label, type, name, etc.",
        example: `function FormInput({ label, type, name, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}`
      },
      {
        level: 3,
        title: "🔄 Event Handlers",
        content: "Implemente handleInputChange para atualizar o estado quando o usuário digitar.",
        example: `const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};`
      },
      {
        level: 4,
        title: "⚡ useEffect para Validação",
        content: "Use useEffect para validar automaticamente quando os dados mudarem.",
        example: `React.useEffect(() => {
  // Validar email e senha quando formData mudar
  validateForm();
}, [formData]);`
      }
    ],

    validationRules: [
      {
        type: "uses_functional_components",
        message: "Deve usar componentes funcionais React",
        weight: 20
      },
      {
        type: "uses_usestate_hook",
        message: "Deve usar useState para gerenciar estado",
        weight: 20
      },
      {
        type: "uses_useeffect_hook",
        message: "Deve usar useEffect para side effects",
        weight: 15
      },
      {
        type: "implements_event_handlers",
        message: "Deve implementar event handlers para inputs e submit",
        weight: 15
      },
      {
        type: "creates_reusable_components",
        message: "Deve criar componentes reutilizáveis",
        weight: 10
      },
      {
        type: "manages_form_validation",
        message: "Deve implementar validação em tempo real",
        weight: 10
      },
      {
        type: "uses_proper_jsx_syntax",
        message: "Deve usar sintaxe JSX corretamente",
        weight: 10
      }
    ],

    achievements: [
      {
        id: "react_developer",
        title: "⚛️ Desenvolvedor React",
        description: "Bem-vindo ao mundo do React moderno!",
        condition: "complete_challenge"
      },
      {
        id: "hooks_master",
        title: "🎣 Mestre dos Hooks",
        description: "Dominou useState e useEffect perfeitamente",
        condition: "perfect_hooks_usage"
      },
      {
        id: "component_architect",
        title: "🏗️ Arquiteto de Componentes",
        description: "Criou componentes reutilizáveis e bem estruturados",
        condition: "excellent_component_design"
      }
    ]
  }
]

export function getChallengeById(id: number): Challenge | undefined {
  return challenges.find(challenge => challenge.id === id)
}

export function getChallengesByCategory(category: Challenge['category']): Challenge[] {
  return challenges.filter(challenge => challenge.category === category)
}

export function getNextChallenge(currentId: number): Challenge | undefined {
  return challenges.find(challenge => challenge.id === currentId + 1)
}

export function canAccessChallenge(challengeId: number, completedChallenges: number[]): boolean {
  const challenge = getChallengeById(challengeId)
  if (!challenge) return false

  return challenge.prerequisites.every(prereqId =>
    completedChallenges.includes(prereqId)
  )
}