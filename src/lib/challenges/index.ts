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
    title: "🎯 Fundamentos HTML",
    description: "**Bem-vindo ao desenvolvimento web moderno!**\n\n**Contexto:** HTML é a linguagem fundamental que estrutura toda página web. Cada elemento é definido por 'tags' que instruem o navegador sobre como exibir o conteúdo.\n\n**Objetivo:** Criar sua primeira tag HTML para exibir o título \"Quple\" na página. Este é o primeiro passo na sua jornada como desenvolvedor web.",
    difficulty: "beginner",
    xpReward: 25,
    estimatedTime: 15,
    prerequisites: [],
    category: "html",

    // Objetivos de aprendizado
    learningObjectives: [
      "Compreender a estrutura básica de tags HTML",
      "Implementar elementos de cabeçalho semânticos",
      "Observar a transformação de código em interface",
      "Desenvolver confiança em programação"
    ],

    // Conceitos fundamentais
    concepts: [
      {
        title: "Anatomia de uma Tag HTML",
        description: "Tags HTML são marcadores que definem elementos estruturais. Utilizamos os símbolos < e > para delimitar instruções ao navegador sobre como interpretar o conteúdo."
      },
      {
        title: "Estrutura de Abertura e Fechamento",
        description: "Elementos HTML seguem um padrão de abertura <tag> e fechamento </tag>, criando containers semânticos que encapsulam o conteúdo."
      },
      {
        title: "Hierarquia de Cabeçalhos",
        description: "A tag <h1> representa o título principal da página, estabelecendo a hierarquia visual e semântica do documento."
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
  <title>Fundamentos HTML - Quple</title>
</head>
<body>
  <!--
    🎯 OBJETIVO:
    Implementar um elemento de cabeçalho principal para exibir "Quple"

    💡 INSTRUÇÃO TÉCNICA:
    Utilize a tag <h1> para criar o título principal

    EXEMPLO DE SINTAXE:
    <h1>Conteúdo do título</h1>

    Implemente sua solução abaixo:
  -->

  <!-- Área de implementação: -->


</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fundamentos HTML - Quple</title>
</head>
<body>
  <!-- Implementação: elemento de cabeçalho principal -->
  <h1>Quple</h1>

</body>
</html>`,

    // Sistema de orientação progressiva
    hints: [
      {
        level: 1,
        title: "🔍 Entendendo o Contexto",
        content: "O documento HTML já possui a estrutura base necessária. Seu foco deve ser localizar a área de implementação indicada pelos comentários.",
        example: `<!-- Área de implementação: -->
<h1>Quple</h1>

Este é o local onde você deve inserir seu código.`
      },
      {
        level: 2,
        title: "⚙️ Sintaxe da Tag H1",
        content: "A tag <h1> segue uma estrutura específica: abertura, conteúdo e fechamento. Esta é a sintaxe padrão para elementos HTML.",
        example: `<h1>Quple</h1>

Estrutura:
• <h1> → tag de abertura
• Quple → conteúdo
• </h1> → tag de fechamento`
      },
      {
        level: 3,
        title: "⚠️ Atenção aos Detalhes",
        content: "A precisão é fundamental em programação. Certifique-se de utilizar a sintaxe exata, respeitando maiúsculas, minúsculas e caracteres especiais.",
        example: `✅ CORRETO: <h1>Quple</h1>
❌ INCORRETO: <H1>Quple<H1>
❌ INCORRETO: <h1>Quple<h1>
❌ INCORRETO: h1>Quple</h1>`
      },
      {
        level: 4,
        title: "🎯 Implementação Final",
        content: "Implemente a tag H1 na área designada. A solução é: `<h1>Quple</h1>`. Este é um padrão que você utilizará constantemente no desenvolvimento web.",
        example: `<h1>Quple</h1>

Esta implementação criará um cabeçalho principal
semanticamente correto para sua aplicação.`
      }
    ],

    // Critérios de validação técnica
    validationRules: [
      {
        type: "must_have_h1_tag",
        message: "Implemente uma tag <h1> para criar o cabeçalho principal",
        weight: 60
      },
      {
        type: "must_have_quple_text",
        message: "O conteúdo da tag deve ser 'Quple' conforme especificação",
        weight: 40
      }
    ],

    // Sistema de conquistas
    achievements: [
      {
        id: "first_html_implementation",
        title: "🎯 Primeiro Elemento HTML",
        description: "Implementação bem-sucedida de sua primeira tag HTML. Fundação estabelecida para desenvolvimento web.",
        condition: "complete_challenge"
      },
      {
        id: "semantic_precision",
        title: "⚙️ Precisão Semântica",
        description: "Utilização correta de elementos semânticos HTML. Demonstra compreensão da estrutura adequada.",
        condition: "perfect_score"
      }
    ]
  },
  {
    id: 2,
    title: "📄 Estrutura de Conteúdo",
    description: "**Excelente progresso no desenvolvimento HTML!**\n\n**Contexto:** Aplicações web requerem diferentes elementos para estruturar informações. Além de cabeçalhos, utilizamos parágrafos para conteúdo descritivo.\n\n**Objetivo:** Implementar um elemento de parágrafo complementar ao cabeçalho existente, estabelecendo uma hierarquia de informações clara.",
    difficulty: "beginner",
    xpReward: 30,
    estimatedTime: 20,
    prerequisites: [1],
    category: "html",

    // Objetivos de aprendizado
    learningObjectives: [
      "Implementar elementos de parágrafo HTML",
      "Compreender a hierarquia de elementos de texto",
      "Aplicar múltiplas tags em um documento",
      "Estabelecer estrutura semântica básica"
    ],

    // Conceitos que serão abordados
    concepts: [
      {
        title: "A Tag <p> (Parágrafo)",
        description: "A tag <p> é usada para criar parágrafos - textos normais que explicam coisas. É diferente do <h1> que é para títulos grandes."
      },
      {
        title: "Combinando Tags",
        description: "Você pode usar várias tags diferentes na mesma página! Um <h1> para o título e um <p> para a explicação."
      },
      {
        title: "Sequência de Tags",
        description: "As tags aparece na ordem que você escreve. Primeiro <h1>, depois <p>, e assim por diante."
      }
    ],

    // Materiais de apoio em português
    resources: [
      {
        title: "📖 Tags de Texto - MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/p",
        type: "documentation",
        description: "Tudo sobre a tag <p> de parágrafo"
      },
      {
        title: "🎥 HTML Tags - Curso em Vídeo",
        url: "https://www.cursoemvideo.com/curso/html5/",
        type: "video",
        description: "Vídeo explicando diferentes tags HTML"
      }
    ],

    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Segunda Página</title>
</head>
<body>
  <!--
    🎯 SUA NOVA MISSÃO:
    1. Manter o título <h1> que você já sabe fazer
    2. Adicionar um parágrafo <p> embaixo do título

    💡 LEMBRA DA TAG <p>:
    <p>Texto do parágrafo aqui</p>
  -->

  <!-- Primeiro, escreva o título <h1> com "Quple": -->
  <h1>Quple</h1>

  <!-- Agora, escreva um parágrafo <p> com "O app para casais": -->


</body>
</html>`,

    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Segunda Página</title>
</head>
<body>
  <!-- Parabéns! Agora você conhece duas tags diferentes! -->
  <h1>Quple</h1>
  <p>O app para casais</p>

</body>
</html>`,

    // Sistema de dicas progressivo
    hints: [
      {
        level: 1,
        title: "🤓 Qual a diferença entre <h1> e <p>?",
        content: "O `<h1>` faz títulos GRANDES e chamam atenção. O `<p>` faz parágrafos menores para explicar coisas. Os dois são importantes!",
        example: `<h1>Este é um título grande</h1>
<p>Este é um parágrafo normal para explicar</p>

Viu a diferença? Título = destaque, parágrafo = explicação.`
      },
      {
        level: 2,
        title: "📝 Como escrever a tag <p>",
        content: "A tag `<p>` funciona igual a `<h1>`! Você escreve `<p>`, o texto no meio, e fecha com `</p>`. Super simples!",
        example: `<p>O app para casais</p>

Estrutura:
- <p> = abre o parágrafo
- O app para casais = texto
- </p> = fecha o parágrafo`
      },
      {
        level: 3,
        title: "🔄 Colocando as duas tags juntas",
        content: "Agora você vai escrever as DUAS tags na mesma página! Primeiro o `<h1>Quple</h1>`, depois o `<p>O app para casais</p>`.",
        example: `<h1>Quple</h1>
<p>O app para casais</p>

Uma embaixo da outra, nesta ordem! 📚`
      },
      {
        level: 4,
        title: "🎯 Dica final - você está quase lá!",
        content: "Copie exatamente: `<p>O app para casais</p>` embaixo do seu `<h1>`. Mantenha o título que você já fez e só adicione o parágrafo!",
        example: `RESULTADO FINAL:
<h1>Quple</h1>
<p>O app para casais</p>

Título + descrição = página completa! 🎉`
      }
    ],

    // Critérios de validação simples
    validationRules: [
      {
        type: "must_have_h1_quple",
        message: "Mantenha seu título <h1>Quple</h1> - você já aprendeu isso!",
        weight: 50
      },
      {
        type: "must_have_p_tag",
        message: "Adicione uma tag <p> para o parágrafo - é sua nova habilidade!",
        weight: 30
      },
      {
        type: "must_have_casais_text",
        message: "O parágrafo deve ter o texto 'O app para casais'",
        weight: 20
      }
    ],

    // Conquistas
    achievements: [
      {
        id: "two_tags_master",
        title: "🎯 Mestre de Duas Tags!",
        description: "Incrível! Você já domina <h1> E <p>! Sua página está ganhando vida! 🌱",
        condition: "complete_challenge"
      },
      {
        id: "text_structure_pro",
        title: "📚 Expert em Estrutura de Texto",
        description: "Título + descrição = a base de qualquer boa página web! Você entendeu o conceito! 💡",
        condition: "perfect_score"
      }
    ]
  },
  {
    id: 3,
    title: "🔤 Títulos de Diferentes Tamanhos",
    description: "**Você já domina `<h1>` e `<p>`! Que evolução!** 🌟\n\n**Situação:** O app Quple precisa de uma página 'Sobre Nós' com títulos de diferentes tamanhos - um título grande para a página e um título menor para uma seção.\n\n**Sua nova missão:** Aprender que existem diferentes tipos de títulos: `<h1>` (gigante), `<h2>` (grande), etc. Vamos usar dois tipos diferentes! 📏",
    difficulty: "beginner",
    xpReward: 35,
    estimatedTime: 25,
    prerequisites: [2],
    category: "html",

    // Explicação detalhada do que o estudante vai aprender
    learningObjectives: [
      "Descobrir que existem 6 tipos de títulos (h1, h2, h3, h4, h5, h6)",
      "Aprender a diferença entre <h1> e <h2>",
      "Entender hierarquia visual (maior para menor)",
      "Praticar estrutura básica de página com seções"
    ],

    // Conceitos que serão abordados
    concepts: [
      {
        title: "A Família dos Títulos",
        description: "HTML tem 6 tipos de títulos: <h1> é o maior, <h2> é um pouco menor, <h3> menor ainda... até <h6>. Como tamanhos de fonte no Word!"
      },
      {
        title: "Hierarquia Visual",
        description: "<h1> é para o título principal da página. <h2> é para títulos de seções importantes. É como organizar um livro: título do livro, depois título dos capítulos."
      },
      {
        title: "Quando Usar Qual",
        description: "Use <h1> uma vez por página (título principal). Use <h2> para seções importantes. Pense como se fosse um sumário de livro!"
      }
    ],

    // Materiais de apoio
    resources: [
      {
        title: "📖 Hierarquia de Títulos - MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Heading_Elements",
        type: "documentation",
        description: "Tudo sobre h1, h2, h3, h4, h5, h6"
      },
      {
        title: "🎥 Títulos HTML - Curso em Vídeo",
        url: "https://www.cursoemvideo.com/curso/html5/",
        type: "video",
        description: "Explicação visual da hierarquia de títulos"
      }
    ],
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre o Quple</title>
</head>
<body>
  <!--
    🎯 SUA NOVA MISSÃO:
    1. Criar um título PRINCIPAL da página com <h1>
    2. Criar um título de SEÇÃO menor com <h2>
    3. Adicionar parágrafos explicativos

    💡 LEMBRE-SE:
    <h1> = Título gigante (só um por página)
    <h2> = Título grande (para seções)
    <p> = Parágrafo normal
  -->

  <!-- 1. Escreva o título principal da página: "Sobre o Quple" -->


  <!-- 2. Escreva um parágrafo: "Conheça nossa história" -->


  <!-- 3. Agora um título de seção menor: "Nossa Missão" -->


  <!-- 4. E um parágrafo final: "Ajudar casais a crescerem juntos" -->


</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre o Quple</title>
</head>
<body>
  <!-- Parabéns! Você está dominando a hierarquia de títulos! -->
  <h1>Sobre o Quple</h1>
  <p>Conheça nossa história</p>

  <h2>Nossa Missão</h2>
  <p>Ajudar casais a crescerem juntos</p>

</body>
</html>`,
    // Sistema de dicas progressivo
    hints: [
      {
        level: 1,
        title: "🔤 A diferença entre <h1> e <h2>",
        content: "O `<h1>` é o título PRINCIPAL da página (o maior). O `<h2>` é para seções importantes (menor que h1). É como um livro: título do livro (h1) e título dos capítulos (h2).",
        example: `<h1>Este é o título principal</h1>
<h2>Este é um título de seção</h2>

Veja como <h2> é menor que <h1>!`
      },
      {
        level: 2,
        title: "📝 Como montar a estrutura",
        content: "Siga esta ordem: primeiro o título principal (`<h1>Sobre o Quple</h1>`), depois um parágrafo explicativo, depois um título de seção (`<h2>Nossa Missão</h2>`).",
        example: `<h1>Sobre o Quple</h1>
<p>Conheça nossa história</p>
<h2>Nossa Missão</h2>
<p>Ajudar casais a crescerem juntos</p>`
      },
      {
        level: 3,
        title: "💡 Passo a passo simples",
        content: "1. Escreva `<h1>Sobre o Quple</h1>`\n2. Escreva `<p>Conheça nossa história</p>`\n3. Escreva `<h2>Nossa Missão</h2>`\n4. Escreva `<p>Ajudar casais a crescerem juntos</p>`",
        example: `Siga exatamente essa ordem.
Copie e cole se necessário! 😊`
      },
      {
        level: 4,
        title: "🎯 Revisão final",
        content: "Você precisa de 4 tags: h1, p, h2, p. Todas seguem o mesmo padrão de abertura e fechamento que você já conhece. Você consegue!",
        example: `<h1>...</h1>  ← Título principal
<p>...</p>    ← Parágrafo
<h2>...</h2>  ← Título seção
<p>...</p>    ← Parágrafo`
      }
    ],

    // Critérios de validação
    validationRules: [
      {
        type: "must_have_h1_sobre",
        message: "Use <h1> para o título principal 'Sobre o Quple'",
        weight: 30
      },
      {
        type: "must_have_h2_missao",
        message: "Use <h2> para o título da seção 'Nossa Missão'",
        weight: 30
      },
      {
        type: "must_have_historia_paragraph",
        message: "Adicione parágrafo 'Conheça nossa história'",
        weight: 20
      },
      {
        type: "must_have_casais_paragraph",
        message: "Adicione parágrafo 'Ajudar casais a crescerem juntos'",
        weight: 20
      }
    ],

    // Conquistas
    achievements: [
      {
        id: "title_hierarchy_master",
        title: "👑 Mestre da Hierarquia!",
        description: "Você entendeu a diferença entre <h1> e <h2>! Agora sabe criar estruturas organizadas! 🎯",
        condition: "complete_challenge"
      },
      {
        id: "page_structure_pro",
        title: "🏗️ Arquiteto de Páginas",
        description: "Título principal + seção + parágrafos = estrutura perfeita de página web! 📚",
        condition: "perfect_score"
      }
    ]
  },
  {
    id: 4,
    title: "📋 Sua Primeira Lista",
    description: "**Parabéns! Você já domina títulos e parágrafos!** 🎉\n\n**Situação:** O app Quple precisa mostrar uma lista das principais funcionalidades. Imagine como uma lista de compras, mas no código!\n\n**Sua nova missão:** Aprender a criar listas usando `<ul>` (lista) e `<li>` (item da lista). É como fazer uma lista de tarefas, mas em HTML! 📝",
    difficulty: "beginner",
    xpReward: 40,
    estimatedTime: 30,
    prerequisites: [3],
    category: "html",

    // Explicação detalhada do que o estudante vai aprender
    learningObjectives: [
      "Aprender a tag <ul> para criar listas",
      "Aprender a tag <li> para criar itens da lista",
      "Entender como aninhar tags (li dentro de ul)",
      "Criar uma lista de funcionalidades do app"
    ],

    // Conceitos que serão abordados
    concepts: [
      {
        title: "A Tag <ul> (Lista)",
        description: "UL significa 'Unordered List' (lista não ordenada). É como uma lista de compras - você coloca vários itens, mas a ordem não importa tanto."
      },
      {
        title: "A Tag <li> (Item da Lista)",
        description: "LI significa 'List Item' (item da lista). Cada <li> é um pontinho na lista. É como cada linha da sua lista de compras."
      },
      {
        title: "Tags Aninhadas",
        description: "As tags <li> ficam DENTRO da tag <ul>. É como uma caixa (ul) com itens dentro (li, li, li). Uma tag dentro da outra!"
      }
    ],

    // Materiais de apoio
    resources: [
      {
        title: "📖 Listas HTML - MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/ul",
        type: "documentation",
        description: "Guia completo sobre listas em HTML"
      },
      {
        title: "🎥 Listas em HTML - Curso em Vídeo",
        url: "https://www.cursoemvideo.com/curso/html5/",
        type: "video",
        description: "Vídeo explicando como criar listas"
      }
    ],
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Funcionalidades do Quple</title>
</head>
<body>
  <!--
    🎯 SUA NOVA MISSÃO:
    1. Criar um título <h1> para a página
    2. Criar uma lista <ul> das funcionalidades
    3. Cada funcionalidade é um item <li> dentro da lista

    💡 ESTRUTURA DE UMA LISTA:
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>

    Viu? A lista <ul> é como uma caixa, e os <li> são os itens dentro!
  -->

  <!-- 1. Escreva um título: "Funcionalidades do Quple" -->


  <!-- 2. Escreva um parágrafo: "O que você pode fazer no nosso app:" -->


  <!-- 3. Agora crie uma lista com essas 3 funcionalidades: -->
  <!-- - Criar objetivos em casal -->
  <!-- - Acompanhar progresso -->
  <!-- - Celebrar conquistas -->


</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Funcionalidades do Quple</title>
</head>
<body>
  <!-- Parabéns! Você criou sua primeira lista! -->
  <h1>Funcionalidades do Quple</h1>
  <p>O que você pode fazer no nosso app:</p>

  <ul>
    <li>Criar objetivos em casal</li>
    <li>Acompanhar progresso</li>
    <li>Celebrar conquistas</li>
  </ul>

</body>
</html>`,
    // Sistema de dicas progressivo
    hints: [
      {
        level: 1,
        title: "🤔 O que é uma lista?",
        content: "Uma lista é como uma lista de compras! Você tem a 'sacola' (`<ul>`) e dentro dela coloca os 'itens' (`<li>`). Cada item é uma linha com um pontinho na frente.",
        example: `<ul>
  <li>Leite</li>
  <li>Pão</li>
  <li>Ovos</li>
</ul>

Viu? ul = sacola, li = cada item da lista!`
      },
      {
        level: 2,
        title: "📝 Como escrever uma lista",
        content: "Primeiro você abre a 'caixa' com `<ul>`, depois coloca os itens com `<li>`, e depois fecha a caixa com `</ul>`. Os `<li>` ficam DENTRO!",
        example: `<ul>
  <li>Criar objetivos em casal</li>
  <li>Acompanhar progresso</li>
  <li>Celebrar conquistas</li>
</ul>`
      },
      {
        level: 3,
        title: "🎯 Passo a passo",
        content: "1. Faça o título e parágrafo que você já sabe\n2. Escreva `<ul>` para abrir a lista\n3. Escreva os 3 `<li>` com os textos\n4. Feche com `</ul>`",
        example: `<h1>Funcionalidades do Quple</h1>
<p>O que você pode fazer no nosso app:</p>
<ul>
  <li>Criar objetivos em casal</li>
  <li>Acompanhar progresso</li>
  <li>Celebrar conquistas</li>
</ul>`
      },
      {
        level: 4,
        title: "💡 Última dica!",
        content: "Lembre-se: as tags `<li>` ficam DENTRO da `<ul>`. É como colocar itens dentro de uma caixa. Você já sabe como fazer - é só seguir o padrão!",
        example: `Não esqueça de fechar todas as tags:
<ul> ← abre a lista
  <li>...</li> ← item 1
  <li>...</li> ← item 2
  <li>...</li> ← item 3
</ul> ← fecha a lista`
      }
    ],

    // Critérios de validação
    validationRules: [
      {
        type: "must_have_h1_funcionalidades",
        message: "Use <h1> para o título 'Funcionalidades do Quple'",
        weight: 25
      },
      {
        type: "must_have_ul_tag",
        message: "Use <ul> para criar a lista",
        weight: 25
      },
      {
        type: "must_have_three_li_tags",
        message: "Crie 3 itens de lista com <li>",
        weight: 30
      },
      {
        type: "must_have_app_paragraph",
        message: "Adicione parágrafo 'O que você pode fazer no nosso app:'",
        weight: 20
      }
    ],

    // Conquistas
    achievements: [
      {
        id: "first_list_creator",
        title: "📋 Criador de Listas!",
        description: "Incrível! Você criou sua primeira lista HTML! Agora sabe organizar informações como um profissional! 🎯",
        condition: "complete_challenge"
      },
      {
        id: "nested_tags_master",
        title: "🏗️ Mestre das Tags Aninhadas",
        description: "Você entendeu como colocar tags dentro de outras tags! Isso é fundamental na programação! 💪",
        condition: "perfect_score"
      }
    ]
  },
  {
    id: 5,
    title: "🎨 App Sem Cor",
    description: "**Incrível! Você já domina HTML básico!** 🌟\n\n**Situação:** O app Quple está funcionando, mas está tudo preto e branco. Que tal dar vida a ele com uma cor?\n\n**Sua nova missão:** Aprender CSS (a linguagem que dá estilo às páginas) mudando a cor do título principal para AZUL. É sua primeira vez mexendo com cores no código! 🎨",
    difficulty: "beginner",
    xpReward: 50,
    estimatedTime: 35,
    prerequisites: [4],
    category: "css",

    // Explicação detalhada do que o estudante vai aprender
    learningObjectives: [
      "Descobrir o que é CSS (linguagem de estilo)",
      "Aprender a tag <style> para escrever CSS",
      "Mudar a cor de um elemento com 'color'",
      "Entender a conexão entre HTML e CSS"
    ],

    // Conceitos que serão abordados
    concepts: [
      {
        title: "O que é CSS?",
        description: "CSS é como um 'pintor' para suas páginas web. HTML faz a estrutura (como as paredes de uma casa) e CSS pinta e decora tudo!"
      },
      {
        title: "A Tag <style>",
        description: "Dentro da tag <style> você escreve comandos de CSS. É como dizer: 'Pinte o título de azul', 'Faça esse texto maior', etc."
      },
      {
        title: "A Propriedade 'color'",
        description: "'color' é o comando para mudar a cor do texto. Você pode usar nomes como 'blue', 'red', ou códigos como '#3366cc'."
      }
    ],

    // Materiais de apoio
    resources: [
      {
        title: "📖 CSS Básico - MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
        type: "documentation",
        description: "Introdução ao CSS em português"
      },
      {
        title: "🎥 CSS para Iniciantes - Curso em Vídeo",
        url: "https://www.cursoemvideo.com/curso/html5-css3/",
        type: "video",
        description: "Vídeos sobre CSS básico"
      }
    ],
    starterCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Primeira Página com Cor</title>
  <style>
    /*
      🎯 SUA MISSÃO SUPER SIMPLES:
      Mudar a cor do título <h1> para azul!

      💡 COMO FAZER:
      h1 {
        color: blue;
      }

      Copie e cole exatamente essas 3 linhas aqui embaixo ⬇️
    */


  </style>
</head>
<body>
  <h1>Quple</h1>
  <p>O app para casais</p>

</body>
</html>`,
    solutionCode: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Primeira Página com Cor</title>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
<body>
  <h1>Quple</h1>
  <p>O app para casais</p>

</body>
</html>`,
    // Sistema de dicas progressivo educativo
    hints: [
      {
        level: 1,
        title: "🤔 O que é CSS?",
        content: "CSS é como uma 'caixa de tintas' para suas páginas! HTML faz a estrutura, CSS coloca as cores. É sua primeira vez usando CSS!",
        example: `CSS = Cascading Style Sheets
É a linguagem que dá estilo às páginas web!

HTML = esqueleto
CSS = roupas e cores`
      },
      {
        level: 2,
        title: "📝 Como escrever CSS",
        content: "CSS usa esta estrutura: `h1 { color: blue; }`. Isso significa: 'Pinte todos os títulos h1 de azul'. É como dar uma instrução específica!",
        example: `h1 {
  color: blue;
}

- h1 = qual elemento pintar
- color = que propriedade mudar
- blue = para qual cor`
      },
      {
        level: 3,
        title: "💡 Onde escrever o CSS",
        content: "Você escreve CSS dentro da tag `<style>` no `<head>`. É lá que fica toda a 'pintura' da sua página!",
        example: `<style>
  h1 {
    color: blue;
  }
</style>

Copie essas 3 linhas exatamente!`
      },
      {
        level: 4,
        title: "🎯 Sua primeira cor!",
        content: "Digite exatamente `h1 { color: blue; }` dentro da tag style. Cada caractere importa: as chaves { }, os dois pontos :, o ponto e vírgula ;",
        example: `EXATAMENTE assim:

h1 {
  color: blue;
}

Você consegue! É sua primeira cor! 🎨`
      }
    ],

    // Critérios de validação super simples
    validationRules: [
      {
        type: "has_style_tag",
        message: "Você precisa ter CSS dentro da tag <style>",
        weight: 30
      },
      {
        type: "h1_has_color_property",
        message: "O título h1 precisa ter a propriedade 'color'",
        weight: 40
      },
      {
        type: "color_is_blue",
        message: "A cor deve ser 'blue' (azul em inglês)",
        weight: 30
      }
    ],

    // Conquistas especiais para primeiro CSS
    achievements: [
      {
        id: "first_css_ever",
        title: "🎨 Primeira Cor da Vida!",
        description: "Parabéns! Você acabou de escrever seu primeiro CSS! Agora você sabe dar cor às páginas! 🌈",
        condition: "complete_challenge"
      },
      {
        id: "css_styler",
        title: "✨ Estilista Web",
        description: "Você transformou texto preto e branco em algo colorido! Bem-vindo ao mundo do CSS! 🎭",
        condition: "perfect_score"
      }
    ]
  },
  {
    id: 6,
    title: "💥 Layout Quebrado",
    description: "**Ótimo! Você já sabe dar cor aos elementos!** 🎨\n\n**Situação:** O app Quple está com os textos todos grudados nas bordas da tela. Parece apertado e desconfortável!\n\n**Sua nova missão:** Aprender `padding` (espaço interno) para dar 'respiração' aos elementos. É como colocar uma almofada dentro de uma caixa! 📦",
    difficulty: "beginner",
    xpReward: 60,
    estimatedTime: 40,
    prerequisites: [5],
    category: "css",

    // Explicação detalhada do que o estudante vai aprender
    learningObjectives: [
      "Descobrir o que é padding (espaço interno)",
      "Aprender como padding melhora a aparência",
      "Usar padding para dar espaço aos textos",
      "Entender a diferença visual que o espaçamento faz"
    ],

    // Conceitos que serão abordados
    concepts: [
      {
        title: "O que é Padding?",
        description: "Padding é o espaço INTERNO de um elemento - como uma almofada dentro de uma caixa. Deixa o conteúdo mais confortável e bonito!"
      },
      {
        title: "Como Usar Padding",
        description: "Você escreve 'padding: 20px;' para dar 20 pixels de espaço interno. É como dar uma 'almofada' para seu texto."
      },
      {
        title: "Por que Usar Espaçamento",
        description: "Textos grudados nas bordas ficam feios e difíceis de ler. Com padding, fica mais elegante e profissional!"
      }
    ],

    // Materiais de apoio
    resources: [
      {
        title: "📖 CSS Padding - MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/padding",
        type: "documentation",
        description: "Tudo sobre padding em CSS"
      },
      {
        title: "🎥 Espaçamento CSS - Curso em Vídeo",
        url: "https://www.cursoemvideo.com/curso/html5-css3/",
        type: "video",
        description: "Vídeos explicando padding e margin"
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