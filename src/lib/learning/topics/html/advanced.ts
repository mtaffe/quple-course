/**
 * HTML Advanced - Complete Content
 *
 * This topic covers advanced HTML concepts including forms, accessibility,
 * SEO, and modern HTML5 APIs.
 */

import { Topic } from '../../types'
import { htmlQuizzes } from '../../quizzes/html-quizzes'

export const htmlAdvanced: Topic = {
  id: 'html-advanced',
  title: 'HTML Avançado',
  description: 'Acessibilidade, SEO, formulários complexos e APIs web',
  category: 'html',
  difficulty: 'intermediate',
  totalTime: 90,
  prerequisites: ['html-fundamentals'],
  lessons: [
    {
      id: 'lesson-1',
      title: 'Formulários Avançados e Validação',
      description: 'Domine formulários complexos com validação nativa',
      estimatedTime: 30,
      quiz: htmlQuizzes.advanced.lesson1,
      sections: [
        {
          id: 'forms-intro',
          title: 'Formulários HTML5 - O Poder da Validação Nativa',
          type: 'theory',
          content: `Formulários são a principal forma de interação entre usuários e aplicações web. O HTML5 revolucionou formulários com validação nativa, novos tipos de input e APIs poderosas que eliminam a necessidade de JavaScript para casos básicos.

**🎯 Por que Formulários HTML5 Modernos Importam:**

• **Validação Nativa**: Economiza código JavaScript
• **Acessibilidade Built-in**: Navegadores entendem semântica dos inputs
• **UX Melhorada**: Teclados mobile específicos por tipo de input
• **Progressive Enhancement**: Funciona sem JavaScript, melhora com JS
• **Performance**: Validação no browser é instantânea

**📱 Novos Tipos de Input HTML5:**

Os novos tipos de input trazem benefícios incríveis para mobile:

• **\`email\`**: Teclado com @ otimizado
• **\`tel\`**: Teclado numérico para telefones
• **\`url\`**: Teclado com .com, .br, etc.
• **\`number\`**: Controles de incremento/decremento
• **\`range\`**: Slider visual
• **\`date\`, \`time\`, \`datetime-local\`**: Date pickers nativos
• **\`color\`**: Color picker nativo
• **\`search\`**: Ícone de busca e botão de limpar

**✅ Atributos de Validação Nativos:**

HTML5 oferece validação poderosa SEM JavaScript:

• **\`required\`**: Campo obrigatório
• **\`minlength\` / \`maxlength\`**: Tamanho de texto
• **\`min\` / \`max\`**: Valores numéricos
• **\`pattern\`**: Validação com regex
• **\`step\`**: Incremento para números
• **\`type\`**: Validação específica por tipo

**🔐 Validação com Pattern (Regex):**

O atributo \`pattern\` permite validações complexas:

\`\`\`html
<!-- CPF brasileiro -->
<input type="text" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}">

<!-- Telefone (XX) XXXXX-XXXX -->
<input type="tel" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}">

<!-- Senha forte (8+ chars, letra maiúscula, número) -->
<input type="password" pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
\`\`\`

**🎨 Customização de Mensagens:**

Use JavaScript para mensagens personalizadas:

\`\`\`javascript
const input = document.querySelector('#email')
input.addEventListener('invalid', (e) => {
  if (input.validity.valueMissing) {
    input.setCustomValidity('Por favor, insira seu e-mail')
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('Por favor, insira um e-mail válido')
  }
})
\`\`\`

**📊 API de Validação - Constraint Validation:**

Acesse o estado de validação programaticamente:

• **\`validity.valid\`**: Booleano se é válido
• **\`validity.valueMissing\`**: Campo obrigatório vazio
• **\`validity.typeMismatch\`**: Tipo incorreto (email, url)
• **\`validity.patternMismatch\`**: Não corresponde ao pattern
• **\`validity.tooLong\` / \`tooShort\`**: Tamanho incorreto
• **\`validity.rangeUnderflow\` / \`rangeOverflow\`**: Fora do range
• **\`checkValidity()\`**: Valida programaticamente
• **\`reportValidity()\`**: Valida e mostra mensagem

**♿ Acessibilidade em Formulários:**

Formulários acessíveis são CRUCIAIS:

• **\`<label>\`**: SEMPRE associe labels aos inputs
• **\`for\` / \`id\`**: Conecte label ao input correto
• **\`aria-label\`**: Para inputs sem label visual
• **\`aria-describedby\`**: Conecte a descrições de erro
• **\`aria-invalid\`**: Marque campos com erro
• **\`autocomplete\`**: Ajude preenchimento automático

**🔒 Atributo Autocomplete - Segurança e UX:**

O atributo \`autocomplete\` é ESSENCIAL para:

• **Segurança**: Navegadores gerenciam senhas seguramente
• **UX**: Preenchimento rápido de dados pessoais
• **Acessibilidade**: Ajuda usuários com deficiências cognitivas

Valores importantes:
- \`name\`: Nome completo
- \`email\`: Endereço de email
- \`username\`: Nome de usuário
- \`new-password\`: Nova senha (cadastro)
- \`current-password\`: Senha atual (login)
- \`tel\`: Telefone
- \`street-address\`: Endereço completo
- \`cc-name\`, \`cc-number\`: Cartão de crédito

**🎯 Exemplo Prático no Quple:**

No app Quple, formulários são usados para:
- Cadastro de usuários com validação de email
- Login com senhas seguras
- Criação de objetivos com datas e descrições
- Perfil com informações pessoais do casal

**💡 Dicas Profissionais:**

• Use \`novalidate\` no \`<form>\` para desativar validação nativa e usar JS customizado
• Combine validação nativa com JavaScript para melhor UX
• Sempre valide no servidor também (segurança)
• Use \`autocomplete="off"\` apenas quando absolutamente necessário
• Teste em dispositivos móveis reais

**📚 Para se aprofundar:**
- [MDN - HTML Forms](https://developer.mozilla.org/pt-BR/docs/Learn/Forms)
- [MDN - Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [HTML5 Input Types](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types)
- [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)
- [Autocomplete Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)`
        },
        {
          id: 'forms-example',
          title: 'Formulário Completo do Quple - Exemplo Profissional',
          type: 'example',
          content: `Vamos criar um formulário completo de cadastro para o Quple, demonstrando todas as técnicas avançadas de validação, acessibilidade e UX moderna.

**🎯 Funcionalidades Implementadas:**

• Validação nativa HTML5
• Mensagens de erro customizadas
• Inputs específicos por tipo (email, tel, date)
• Validação de senha forte com pattern
• Confirmação de senha
• Autocomplete para melhor UX
• Acessibilidade completa (labels, ARIA)
• Feedback visual de validação
• Progressive disclosure (mostrar/ocultar senha)

**🏗️ Estrutura do Formulário:**

1. **Informações Pessoais**: Nome, email, telefone
2. **Credenciais**: Senha forte com confirmação
3. **Informações do Casal**: Nome do parceiro, data de relacionamento
4. **Preferências**: Objetivos principais
5. **Termos**: Aceitação de termos e condições

**♿ Recursos de Acessibilidade:**

• Labels associadas a TODOS os inputs
• Instruções claras com \`aria-describedby\`
• Estados de erro com \`aria-invalid\`
• Mensagens de erro com role="alert"
• Navegação por teclado otimizada
• Contraste adequado em todos os estados

**🎨 Validação Visual:**

CSS moderno para feedback visual:

\`\`\`css
/* Estado válido */
input:valid {
  border-color: #10b981;
}

/* Estado inválido (após interação) */
input:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

/* Focus state */
input:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
\`\`\`

**💡 Dica Profissional:**

Este formulário combina o melhor de validação nativa HTML5 com JavaScript progressivo. Funciona perfeitamente sem JS, mas JavaScript adiciona melhorias como:
- Validação em tempo real
- Mensagens customizadas em português
- Indicador de força de senha
- Prevenção de envios duplicados`,
          codeExample: `<!-- ============================================
   FORMULÁRIO COMPLETO DE CADASTRO - QUPLE APP
   ============================================ -->

<form
  id="quple-signup-form"
  action="/api/signup"
  method="POST"
  novalidate
>
  <!-- Título do Formulário -->
  <h2>Cadastre-se no Quple 💕</h2>
  <p class="form-description">
    Crie sua conta e comece a fortalecer seu relacionamento
  </p>

  <!-- =====================================
       SEÇÃO 1: INFORMAÇÕES PESSOAIS
       ===================================== -->
  <fieldset>
    <legend>Suas Informações</legend>

    <!-- Nome Completo -->
    <div class="form-group">
      <label for="fullName">
        Nome Completo <span aria-label="obrigatório">*</span>
      </label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        required
        minlength="3"
        maxlength="100"
        autocomplete="name"
        placeholder="João Silva"
        aria-describedby="fullName-hint"
      />
      <small id="fullName-hint" class="hint">
        Como você gostaria de ser chamado(a)
      </small>
      <span class="error" role="alert"></span>
    </div>

    <!-- Email -->
    <div class="form-group">
      <label for="email">
        E-mail <span aria-label="obrigatório">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autocomplete="email"
        placeholder="joao@exemplo.com"
        aria-describedby="email-hint"
      />
      <small id="email-hint" class="hint">
        Usaremos para login e comunicações importantes
      </small>
      <span class="error" role="alert"></span>
    </div>

    <!-- Telefone -->
    <div class="form-group">
      <label for="phone">
        Telefone
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        pattern="\\(\\d{2}\\) \\d{5}-\\d{4}"
        autocomplete="tel"
        placeholder="(11) 98765-4321"
        aria-describedby="phone-hint"
      />
      <small id="phone-hint" class="hint">
        Formato: (XX) XXXXX-XXXX (opcional)
      </small>
      <span class="error" role="alert"></span>
    </div>
  </fieldset>

  <!-- =====================================
       SEÇÃO 2: CREDENCIAIS
       ===================================== -->
  <fieldset>
    <legend>Crie sua Senha</legend>

    <!-- Senha -->
    <div class="form-group">
      <label for="password">
        Senha <span aria-label="obrigatório">*</span>
      </label>
      <div class="password-wrapper">
        <input
          type="password"
          id="password"
          name="password"
          required
          minlength="8"
          pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          autocomplete="new-password"
          aria-describedby="password-requirements"
        />
        <button
          type="button"
          class="toggle-password"
          aria-label="Mostrar senha"
        >
          👁️
        </button>
      </div>
      <div id="password-requirements" class="requirements">
        <p>A senha deve conter:</p>
        <ul>
          <li data-requirement="length">Mínimo de 8 caracteres</li>
          <li data-requirement="uppercase">Uma letra maiúscula</li>
          <li data-requirement="lowercase">Uma letra minúscula</li>
          <li data-requirement="number">Um número</li>
        </ul>
      </div>
      <div class="password-strength">
        <div class="strength-bar"></div>
        <span class="strength-text"></span>
      </div>
      <span class="error" role="alert"></span>
    </div>

    <!-- Confirmar Senha -->
    <div class="form-group">
      <label for="confirmPassword">
        Confirme sua Senha <span aria-label="obrigatório">*</span>
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required
        autocomplete="new-password"
        aria-describedby="confirmPassword-hint"
      />
      <small id="confirmPassword-hint" class="hint">
        Digite a mesma senha novamente
      </small>
      <span class="error" role="alert"></span>
    </div>
  </fieldset>

  <!-- =====================================
       SEÇÃO 3: INFORMAÇÕES DO CASAL
       ===================================== -->
  <fieldset>
    <legend>Sobre Vocês Dois ❤️</legend>

    <!-- Nome do Parceiro(a) -->
    <div class="form-group">
      <label for="partnerName">
        Nome do(a) Parceiro(a)
      </label>
      <input
        type="text"
        id="partnerName"
        name="partnerName"
        minlength="3"
        maxlength="100"
        placeholder="Maria Silva"
        aria-describedby="partnerName-hint"
      />
      <small id="partnerName-hint" class="hint">
        Você poderá convidar depois (opcional)
      </small>
    </div>

    <!-- Data de Início do Relacionamento -->
    <div class="form-group">
      <label for="relationshipStart">
        Quando começaram o relacionamento?
      </label>
      <input
        type="date"
        id="relationshipStart"
        name="relationshipStart"
        max="2024-12-31"
        aria-describedby="relationshipStart-hint"
      />
      <small id="relationshipStart-hint" class="hint">
        Usaremos para calcular aniversários especiais
      </small>
    </div>

    <!-- Objetivos Principais -->
    <div class="form-group">
      <label for="mainGoals">
        Quais seus principais objetivos como casal?
      </label>
      <select
        id="mainGoals"
        name="mainGoals"
        multiple
        size="5"
        aria-describedby="mainGoals-hint"
      >
        <option value="health">Saúde e Bem-estar</option>
        <option value="financial">Metas Financeiras</option>
        <option value="travel">Viagens</option>
        <option value="communication">Melhorar Comunicação</option>
        <option value="hobbies">Hobbies Compartilhados</option>
        <option value="family">Planos Familiares</option>
        <option value="career">Desenvolvimento de Carreira</option>
      </select>
      <small id="mainGoals-hint" class="hint">
        Segure Ctrl (Cmd no Mac) para selecionar múltiplos
      </small>
    </div>
  </fieldset>

  <!-- =====================================
       SEÇÃO 4: TERMOS E CONDIÇÕES
       ===================================== -->
  <fieldset>
    <legend>Termos de Uso</legend>

    <!-- Aceitar Termos -->
    <div class="form-group checkbox-group">
      <input
        type="checkbox"
        id="acceptTerms"
        name="acceptTerms"
        required
        aria-describedby="acceptTerms-hint"
      />
      <label for="acceptTerms">
        Li e aceito os
        <a href="/termos" target="_blank">Termos de Uso</a> e
        <a href="/privacidade" target="_blank">Política de Privacidade</a>
        <span aria-label="obrigatório">*</span>
      </label>
      <span class="error" role="alert"></span>
    </div>

    <!-- Newsletter (Opcional) -->
    <div class="form-group checkbox-group">
      <input
        type="checkbox"
        id="newsletter"
        name="newsletter"
      />
      <label for="newsletter">
        Quero receber dicas e novidades do Quple por e-mail
      </label>
    </div>
  </fieldset>

  <!-- =====================================
       BOTÕES DE AÇÃO
       ===================================== -->
  <div class="form-actions">
    <button
      type="submit"
      class="btn-primary"
      aria-busy="false"
    >
      Criar Minha Conta
    </button>
    <button
      type="reset"
      class="btn-secondary"
    >
      Limpar Formulário
    </button>
  </div>

  <!-- Link para Login -->
  <p class="form-footer">
    Já tem uma conta?
    <a href="/login">Faça login aqui</a>
  </p>
</form>

<!-- =====================================
     JAVASCRIPT PARA VALIDAÇÃO AVANÇADA
     ===================================== -->
<script>
// Inicializar validação customizada
const form = document.getElementById('quple-signup-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Validação de confirmação de senha
confirmPassword.addEventListener('input', () => {
  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('As senhas não coincidem');
  } else {
    confirmPassword.setCustomValidity('');
  }
});

// Indicador de força de senha
password.addEventListener('input', () => {
  const strength = calculatePasswordStrength(password.value);
  updatePasswordStrength(strength);
});

// Mostrar/ocultar senha
document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    button.textContent = type === 'password' ? '👁️' : '🙈';
    button.setAttribute('aria-label',
      type === 'password' ? 'Mostrar senha' : 'Ocultar senha'
    );
  });
});

// Validação em tempo real
form.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('blur', () => {
    validateField(field);
  });
});

// Prevenir envio duplicado
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar todos os campos
  const isValid = form.checkValidity();

  if (!isValid) {
    form.reportValidity();
    return;
  }

  // Desabilitar botão durante envio
  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  submitButton.setAttribute('aria-busy', 'true');
  submitButton.textContent = 'Criando conta...';

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });

    if (response.ok) {
      // Sucesso - redirecionar
      window.location.href = '/dashboard';
    } else {
      // Erro do servidor
      const error = await response.json();
      showFormError(error.message);
    }
  } catch (error) {
    showFormError('Erro ao criar conta. Tente novamente.');
  } finally {
    submitButton.disabled = false;
    submitButton.setAttribute('aria-busy', 'false');
    submitButton.textContent = 'Criar Minha Conta';
  }
});

// Funções auxiliares
function validateField(field) {
  const errorElement = field.parentElement.querySelector('.error');

  if (!field.validity.valid) {
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = getCustomErrorMessage(field);
  } else {
    field.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
  }
}

function getCustomErrorMessage(field) {
  if (field.validity.valueMissing) {
    return 'Este campo é obrigatório';
  }
  if (field.validity.typeMismatch) {
    return 'Por favor, insira um valor válido';
  }
  if (field.validity.tooShort) {
    return \`Mínimo de \${field.minLength} caracteres\`;
  }
  if (field.validity.patternMismatch) {
    return 'Formato inválido';
  }
  return 'Valor inválido';
}

function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return Math.min(strength, 4);
}

function updatePasswordStrength(strength) {
  const labels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
  const colors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];

  const bar = document.querySelector('.strength-bar');
  const text = document.querySelector('.strength-text');

  bar.style.width = \`\${(strength / 4) * 100}%\`;
  bar.style.backgroundColor = colors[strength - 1] || '#ef4444';
  text.textContent = labels[strength] || '';
}

function showFormError(message) {
  // Implementar notificação de erro
  alert(message);
}
</script>`
        }
      ]
    },
    {
      id: 'lesson-2',
      title: 'Acessibilidade Web (A11y)',
      description: 'Criando experiências inclusivas com ARIA e semântica',
      estimatedTime: 30,
      quiz: htmlQuizzes.advanced.lesson2,
      sections: [
        {
          id: 'accessibility-intro',
          title: 'Acessibilidade Web - Criando para Todos',
          type: 'theory',
          content: `Acessibilidade web (A11y - 11 letras entre A e Y) é a prática de tornar websites e aplicações utilizáveis por TODAS as pessoas, independentemente de suas habilidades físicas, cognitivas ou tecnológicas.

**🌍 Por que Acessibilidade é Fundamental:**

• **Inclusão**: 15% da população mundial tem alguma deficiência
• **Legal**: Muitos países exigem acessibilidade por lei
• **SEO**: Sites acessíveis rankeiam melhor no Google
• **UX**: Beneficia TODOS os usuários, não apenas pessoas com deficiências
• **Negócios**: Amplia seu público potencial
• **Ética**: É a coisa certa a fazer

**♿ Tipos de Deficiências a Considerar:**

• **Visual**: Cegueira, baixa visão, daltonismo
• **Auditiva**: Surdez, perda auditiva parcial
• **Motora**: Dificuldade de usar mouse, tremores, paralisia
• **Cognitiva**: Dislexia, TDAH, autismo, demência
• **Temporária**: Braço quebrado, olho irritado, ambiente barulhento

**🔧 Tecnologias Assistivas:**

• **Leitores de Tela**: NVDA, JAWS, VoiceOver, TalkBack
• **Ampliadores de Tela**: ZoomText, MAGic
• **Navegação por Teclado**: Sem mouse
• **Reconhecimento de Voz**: Dragon NaturallySpeaking
• **Switches e Dispositivos Adaptativos**: Para mobilidade reduzida

**🎯 Princípios WCAG (Web Content Accessibility Guidelines):**

As diretrizes WCAG 2.1 são o padrão internacional. Baseiam-se em 4 princípios (POUR):

1. **Perceptível (Perceivable)**
   - Informação deve ser apresentada de forma que usuários possam percebê-la
   - Alternativas de texto para imagens
   - Legendas para vídeos
   - Conteúdo adaptável

2. **Operável (Operable)**
   - Interface deve ser operável por todos
   - Navegação por teclado
   - Tempo suficiente para ler/usar conteúdo
   - Sem gatilhos de convulsão (flashes)

3. **Compreensível (Understandable)**
   - Informação e operação devem ser compreensíveis
   - Texto legível
   - Funcionamento previsível
   - Ajuda com erros

4. **Robusto (Robust)**
   - Conteúdo deve funcionar com tecnologias atuais e futuras
   - Compatível com tecnologias assistivas
   - HTML válido

**📊 Níveis de Conformidade WCAG:**

• **Nível A**: Mínimo (básico)
• **Nível AA**: Recomendado (padrão legal em muitos países)
• **Nível AAA**: Ótimo (desejável mas nem sempre viável)

**🔍 HTML Semântico - A Base da Acessibilidade:**

HTML semântico comunica SIGNIFICADO, não apenas aparência:

\`\`\`html
<!-- ❌ NÃO semântico -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- ✅ Semântico -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
\`\`\`

**Elementos Semânticos Essenciais:**

• \`<header>\`: Cabeçalho da página/seção
• \`<nav>\`: Navegação principal
• \`<main>\`: Conteúdo principal (único por página)
• \`<article>\`: Conteúdo independente
• \`<section>\`: Seção temática
• \`<aside>\`: Conteúdo relacionado/sidebar
• \`<footer>\`: Rodapé
• \`<h1>\`-\`<h6>\`: Hierarquia de títulos

**🎨 ARIA - Accessible Rich Internet Applications:**

ARIA adiciona semântica quando HTML nativo não é suficiente.

**⚠️ Regra de Ouro do ARIA:**
**"Não use ARIA se HTML nativo já faz o trabalho"**

**Três Pilares do ARIA:**

1. **Roles**: Define o que um elemento É
   - \`role="button"\`, \`role="dialog"\`, \`role="alert"\`

2. **Properties**: Características do elemento
   - \`aria-label\`, \`aria-describedby\`, \`aria-required\`

3. **States**: Estado atual do elemento
   - \`aria-expanded\`, \`aria-hidden\`, \`aria-pressed\`

**🔗 Landmark Roles (Pontos de Referência):**

Leitores de tela usam landmarks para navegação rápida:

• \`<header>\` = \`role="banner"\` (implícito)
• \`<nav>\` = \`role="navigation"\`
• \`<main>\` = \`role="main"\`
• \`<aside>\` = \`role="complementary"\`
• \`<footer>\` = \`role="contentinfo"\`
• \`<form>\` = \`role="form"\` (se tiver label)

**⌨️ Navegação por Teclado:**

Essencial para acessibilidade:

• **Tab**: Navegar para frente
• **Shift + Tab**: Navegar para trás
• **Enter**: Ativar links/botões
• **Space**: Ativar botões/checkboxes
• **Arrow Keys**: Navegar em widgets (acordeões, tabs)
• **Esc**: Fechar modals/dropdowns

**Elementos Focáveis Nativamente:**
- Links (\`<a href>\`)
- Botões (\`<button>\`)
- Inputs de formulário
- \`<select>\`, \`<textarea>\`
- Elementos com \`tabindex="0"\`

**🎯 Exemplo Prático no Quple:**

No app Quple, acessibilidade significa:
- Leitores de tela podem navegar objetivos do casal
- Usuários com daltonismo distinguem estados (concluído/pendente)
- Navegação completa por teclado
- Mensagens de erro claras e anunciadas
- Contraste adequado em todos os temas

**💡 Testes de Acessibilidade:**

• **Ferramentas Automáticas**:
  - Lighthouse (Chrome DevTools)
  - axe DevTools (extensão)
  - WAVE (extensão)
  - Pa11y (CLI)

• **Testes Manuais**:
  - Navegação apenas por teclado
  - Testar com leitor de tela
  - Desabilitar CSS
  - Aumentar zoom para 200%
  - Testar com daltonismo simulado

• **Testes com Usuários Reais**:
  - Nada substitui feedback de pessoas com deficiências

**📚 Para se aprofundar:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)`
        },
        {
          id: 'aria-example',
          title: 'ARIA na Prática - Componentes Acessíveis do Quple',
          type: 'example',
          content: `Vamos criar componentes do Quple com acessibilidade de nível AA, demonstrando uso correto de ARIA, navegação por teclado e semântica.

**🎯 Componentes Implementados:**

1. **Modal Dialog Acessível**: Criação de objetivo
2. **Dropdown Menu**: Menu de usuário
3. **Tabs**: Navegação entre seções
4. **Notifications**: Alertas e mensagens
5. **Skip Links**: Navegação rápida

**♿ Recursos de Acessibilidade:**

• **Focus Management**: Foco capturado no modal
• **Keyboard Navigation**: Suporte completo
• **ARIA Labels**: Descrições claras
• **Live Regions**: Anúncios dinâmicos
• **Visual Indicators**: Estados claros visualmente

**💡 Padrões Implementados:**

Seguimos os padrões WAI-ARIA Authoring Practices:
- Modal Dialog Pattern
- Menu Button Pattern
- Tabs Pattern
- Alert Pattern

**🔍 Dicas de Implementação:**

• Sempre teste com leitor de tela real
• Use \`aria-live\` para conteúdo dinâmico
• Mantenha ordem de tabulação lógica
• Forneça feedback visual E por tela reader
• Documente padrões de teclado claramente`,
          codeExample: `<!-- ============================================
   COMPONENTES ACESSÍVEIS DO QUPLE
   ============================================ -->

<!-- =====================================
     1. SKIP LINKS - Navegação Rápida
     ===================================== -->
<div class="skip-links">
  <a href="#main-content" class="skip-link">
    Pular para conteúdo principal
  </a>
  <a href="#main-navigation" class="skip-link">
    Pular para navegação
  </a>
</div>

<!-- =====================================
     2. HEADER COM NAVEGAÇÃO ACESSÍVEL
     ===================================== -->
<header role="banner">
  <div class="container">
    <!-- Logo -->
    <a href="/" class="logo">
      <img
        src="/logo.svg"
        alt="Quple - App para Casais"
        width="120"
        height="40"
      />
    </a>

    <!-- Navegação Principal -->
    <nav id="main-navigation" role="navigation" aria-label="Principal">
      <ul>
        <li>
          <a href="/dashboard" aria-current="page">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/objetivos">
            Objetivos
          </a>
        </li>
        <li>
          <a href="/progresso">
            Progresso
          </a>
        </li>
      </ul>
    </nav>

    <!-- Menu de Usuário (Dropdown) -->
    <div class="user-menu">
      <button
        id="user-menu-button"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="user-menu-dropdown"
      >
        <img
          src="/avatar.jpg"
          alt=""
          aria-hidden="true"
          class="avatar"
        />
        <span>João Silva</span>
        <svg aria-hidden="true" class="icon-chevron">
          <use href="#icon-chevron-down"></use>
        </svg>
      </button>

      <ul
        id="user-menu-dropdown"
        role="menu"
        aria-labelledby="user-menu-button"
        hidden
      >
        <li role="none">
          <a href="/perfil" role="menuitem">
            Meu Perfil
          </a>
        </li>
        <li role="none">
          <a href="/configuracoes" role="menuitem">
            Configurações
          </a>
        </li>
        <li role="none">
          <button role="menuitem" onclick="logout()">
            Sair
          </button>
        </li>
      </ul>
    </div>
  </div>
</header>

<!-- =====================================
     3. CONTEÚDO PRINCIPAL COM LANDMARK
     ===================================== -->
<main id="main-content" role="main" aria-labelledby="page-title">
  <h1 id="page-title">Meus Objetivos 🎯</h1>

  <!-- =====================================
       TABS ACESSÍVEIS
       ===================================== -->
  <div class="tabs" data-component="tabs">
    <div
      role="tablist"
      aria-label="Categorias de objetivos"
    >
      <button
        role="tab"
        id="tab-personal"
        aria-selected="true"
        aria-controls="panel-personal"
        tabindex="0"
      >
        Pessoais
      </button>
      <button
        role="tab"
        id="tab-couple"
        aria-selected="false"
        aria-controls="panel-couple"
        tabindex="-1"
      >
        Do Casal
      </button>
      <button
        role="tab"
        id="tab-completed"
        aria-selected="false"
        aria-controls="panel-completed"
        tabindex="-1"
      >
        Concluídos
      </button>
    </div>

    <!-- Tab Panel 1 -->
    <div
      role="tabpanel"
      id="panel-personal"
      aria-labelledby="tab-personal"
      tabindex="0"
    >
      <h2>Objetivos Pessoais</h2>
      <ul class="objectives-list">
        <li>
          <article class="objective-card">
            <h3>Correr 5km</h3>
            <p>Meta: Completar até dezembro</p>
            <div
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Progresso: 75%"
            >
              <div class="progress-fill" style="width: 75%"></div>
            </div>
            <button aria-label="Editar objetivo: Correr 5km">
              Editar
            </button>
          </article>
        </li>
      </ul>
    </div>

    <!-- Outros painéis ocultos inicialmente -->
    <div
      role="tabpanel"
      id="panel-couple"
      aria-labelledby="tab-couple"
      tabindex="0"
      hidden
    >
      <!-- Conteúdo do painel -->
    </div>

    <div
      role="tabpanel"
      id="panel-completed"
      aria-labelledby="tab-completed"
      tabindex="0"
      hidden
    >
      <!-- Conteúdo do painel -->
    </div>
  </div>

  <!-- Botão para adicionar objetivo -->
  <button
    class="btn-add-objective"
    aria-label="Adicionar novo objetivo"
    data-opens-dialog="modal-new-objective"
  >
    <svg aria-hidden="true" class="icon-plus">
      <use href="#icon-plus"></use>
    </svg>
    Novo Objetivo
  </button>
</main>

<!-- =====================================
     4. MODAL DIALOG ACESSÍVEL
     ===================================== -->
<div
  id="modal-new-objective"
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
  hidden
  class="modal-overlay"
>
  <div class="modal-content">
    <!-- Cabeçalho do Modal -->
    <header class="modal-header">
      <h2 id="modal-title">Criar Novo Objetivo</h2>
      <button
        class="modal-close"
        aria-label="Fechar modal"
        data-close-dialog
      >
        <svg aria-hidden="true">
          <use href="#icon-close"></use>
        </svg>
      </button>
    </header>

    <!-- Conteúdo do Modal -->
    <div id="modal-description" class="modal-body">
      <form>
        <div class="form-group">
          <label for="objective-title">
            Título do Objetivo
            <span aria-label="obrigatório">*</span>
          </label>
          <input
            type="text"
            id="objective-title"
            required
            aria-required="true"
            aria-describedby="objective-title-hint"
          />
          <small id="objective-title-hint">
            Seja específico e mensurável
          </small>
        </div>

        <div class="form-group">
          <label for="objective-category">
            Categoria
          </label>
          <select id="objective-category">
            <option value="personal">Pessoal</option>
            <option value="couple">Do Casal</option>
          </select>
        </div>

        <div class="form-group">
          <label for="objective-deadline">
            Prazo
          </label>
          <input
            type="date"
            id="objective-deadline"
            min="2024-01-01"
          />
        </div>
      </form>
    </div>

    <!-- Rodapé do Modal -->
    <footer class="modal-footer">
      <button
        type="button"
        class="btn-secondary"
        data-close-dialog
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="btn-primary"
        form="objective-form"
      >
        Criar Objetivo
      </button>
    </footer>
  </div>
</div>

<!-- =====================================
     5. NOTIFICAÇÕES (LIVE REGION)
     ===================================== -->
<div
  role="region"
  aria-live="polite"
  aria-atomic="true"
  aria-label="Notificações"
  class="notifications"
>
  <!-- Notificações são injetadas aqui via JS -->
  <!-- Exemplo de notificação de sucesso -->
  <div
    role="alert"
    class="notification notification-success"
  >
    <svg aria-hidden="true" class="icon-check">
      <use href="#icon-check"></use>
    </svg>
    <p>Objetivo criado com sucesso!</p>
    <button aria-label="Fechar notificação">
      ✕
    </button>
  </div>
</div>

<!-- =====================================
     JAVASCRIPT PARA ACESSIBILIDADE
     ===================================== -->
<script>
// ===== DROPDOWN MENU =====
const menuButton = document.getElementById('user-menu-button');
const menuDropdown = document.getElementById('user-menu-dropdown');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !expanded);
  menuDropdown.hidden = expanded;

  if (!expanded) {
    // Foca no primeiro item do menu
    menuDropdown.querySelector('[role="menuitem"]').focus();
  }
});

// Navegação por teclado no menu
menuDropdown.addEventListener('keydown', (e) => {
  const items = Array.from(menuDropdown.querySelectorAll('[role="menuitem"]'));
  const current = document.activeElement;
  const index = items.indexOf(current);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    items[(index + 1) % items.length].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    items[(index - 1 + items.length) % items.length].focus();
  } else if (e.key === 'Escape') {
    menuButton.focus();
    menuButton.click();
  }
});

// ===== TABS =====
const tabButtons = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

tabButtons.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Desativa todas as tabs
    tabButtons.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.tabIndex = -1;
    });

    tabPanels.forEach(p => {
      p.hidden = true;
    });

    // Ativa tab clicada
    tab.setAttribute('aria-selected', 'true');
    tab.tabIndex = 0;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
  });

  // Navegação por teclado
  tab.addEventListener('keydown', (e) => {
    let newIndex = index;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (index + 1) % tabButtons.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabButtons.length - 1;
    }

    if (newIndex !== index) {
      tabButtons[newIndex].click();
      tabButtons[newIndex].focus();
    }
  });
});

// ===== MODAL DIALOG =====
let lastFocusedElement;

function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  lastFocusedElement = document.activeElement;

  dialog.hidden = false;

  // Captura foco no modal
  const focusableElements = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  firstElement.focus();

  // Trap focus dentro do modal
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    } else if (e.key === 'Escape') {
      closeDialog(dialogId);
    }
  });
}

function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  dialog.hidden = true;

  // Restaura foco
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Event listeners para modais
document.querySelectorAll('[data-opens-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    openDialog(button.dataset.opensDialog);
  });
});

document.querySelectorAll('[data-close-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    closeDialog(button.closest('[role="dialog"]').id);
  });
});

// ===== NOTIFICAÇÕES (LIVE REGION) =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.role = 'alert';
  notification.className = \`notification notification-\${type}\`;
  notification.innerHTML = \`
    <p>\${message}</p>
    <button aria-label="Fechar notificação" onclick="this.parentElement.remove()">
      ✕
    </button>
  \`;

  document.querySelector('.notifications').appendChild(notification);

  // Remove automaticamente após 5 segundos
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// ===== SKIP LINKS =====
document.querySelectorAll('.skip-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.tabIndex = -1;
    target.focus();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
</script>`
        }
      ]
    },
    {
      id: 'lesson-3',
      title: 'SEO e Metadados',
      description: 'Otimização para motores de busca e redes sociais',
      estimatedTime: 30,
      quiz: htmlQuizzes.advanced.lesson3,
      sections: [
        {
          id: 'seo-intro',
          title: 'SEO Moderno - Dominando os Mecanismos de Busca',
          type: 'theory',
          content: `SEO (Search Engine Optimization) é a prática de otimizar websites para aparecerem melhor nos resultados de busca orgânicos. Para desenvolvedores, HTML semântico e metadados corretos são a base de um bom SEO.

**🔍 Por que SEO Importa:**

• **Tráfego Orgânico**: 53% do tráfego web vem de busca orgânica
• **Credibilidade**: Posições altas = confiança dos usuários
• **ROI**: SEO tem melhor ROI que publicidade paga
• **Long-term**: Resultados sustentáveis a longo prazo
• **Competitivo**: Essencial para se destacar online

**🎯 Pilares do SEO Técnico (Responsabilidade do Dev):**

1. **HTML Semântico**
   - Uso correto de tags (h1-h6, article, section)
   - Estrutura lógica de conteúdo
   - Hierarquia clara de informações

2. **Meta Tags Essenciais**
   - Title: 50-60 caracteres
   - Description: 150-160 caracteres
   - Viewport para mobile
   - Robots para controle de indexação

3. **Performance**
   - Core Web Vitals (LCP, FID, CLS)
   - Tempo de carregamento < 3s
   - Imagens otimizadas
   - Lazy loading

4. **Mobile-First**
   - Design responsivo
   - Touch-friendly
   - Velocidade em mobile

5. **Estrutura de URLs**
   - URLs descritivas e curtas
   - Hífens para separar palavras
   - Lowercase sempre

**📊 Core Web Vitals - Métricas Essenciais:**

Google usa estas métricas para rankear sites:

• **LCP (Largest Contentful Paint)**: < 2.5s
  - Tempo até maior elemento ser renderizado
  - Otimização: Imagens otimizadas, cache, CDN

• **FID (First Input Delay)**: < 100ms
  - Tempo até primeira interação
  - Otimização: Reduzir JavaScript, code splitting

• **CLS (Cumulative Layout Shift)**: < 0.1
  - Estabilidade visual durante carregamento
  - Otimização: Dimensões fixas para imagens/vídeos

**🏷️ Meta Tags Fundamentais:**

\`\`\`html
<head>
  <!-- Charset - SEMPRE primeiro -->
  <meta charset="UTF-8">

  <!-- Viewport - Mobile essencial -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Title - 50-60 caracteres -->
  <title>Quple | App para Casais Fortalecerem Relacionamentos</title>

  <!-- Description - 150-160 caracteres -->
  <meta name="description" content="O Quple ajuda casais a definirem objetivos compartilhados, acompanharem progresso e fortalecerem relacionamentos através de metas conjuntas.">

  <!-- Keywords (menos importante hoje) -->
  <meta name="keywords" content="relacionamento, casais, objetivos, metas, app">

  <!-- Author -->
  <meta name="author" content="Quple Team">

  <!-- Robots -->
  <meta name="robots" content="index, follow">

  <!-- Canonical URL (evita conteúdo duplicado) -->
  <link rel="canonical" href="https://quple.com/">
</head>
\`\`\`

**🌐 Open Graph (Facebook, LinkedIn):**

Open Graph transforma links em cards ricos nas redes sociais:

\`\`\`html
<!-- Open Graph básico -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://quple.com/">
<meta property="og:title" content="Quple - App para Casais">
<meta property="og:description" content="Fortaleça seu relacionamento com objetivos compartilhados">
<meta property="og:image" content="https://quple.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Quple">
\`\`\`

**🐦 Twitter Cards:**

Cards específicos para Twitter:

\`\`\`html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@qupleapp">
<meta name="twitter:creator" content="@qupleapp">
<meta name="twitter:title" content="Quple - App para Casais">
<meta name="twitter:description" content="Fortaleça seu relacionamento com objetivos compartilhados">
<meta name="twitter:image" content="https://quple.com/twitter-image.jpg">
\`\`\`

**📱 PWA Meta Tags:**

Para Progressive Web Apps:

\`\`\`html
<!-- Theme Color -->
<meta name="theme-color" content="#667eea">

<!-- Apple -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Quple">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/manifest.json">
\`\`\`

**🔗 Structured Data (Schema.org):**

Structured data ajuda Google entender seu conteúdo:

\`\`\`html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Quple",
  "description": "App para casais fortalecerem relacionamentos",
  "url": "https://quple.com",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  }
}
</script>
\`\`\`

**🖼️ Otimização de Imagens para SEO:**

• **Alt text**: SEMPRE descrever imagens
• **Formatos modernos**: WebP, AVIF
• **Responsive images**: \`srcset\` e \`sizes\`
• **Lazy loading**: \`loading="lazy"\`
• **Dimensões**: Sempre especificar width/height

**🔍 Sitemap XML:**

Arquivo que lista todas as páginas do site:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://quple.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://quple.com/sobre</loc>
    <lastmod>2024-01-10</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
\`\`\`

**🤖 Robots.txt:**

Controla o que buscadores podem indexar:

\`\`\`
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://quple.com/sitemap.xml
\`\`\`

**📚 Para se aprofundar:**
- [Google Search Central](https://developers.google.com/search)
- [Core Web Vitals](https://web.dev/vitals/)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)
- [Twitter Cards Validator](https://cards-dev.twitter.com/validator)`
        },
        {
          id: 'seo-example',
          title: 'SEO Completo do Quple - Template Production-Ready',
          type: 'example',
          content: `Template HTML completo com TODOS os metadados, otimizações de performance e SEO para o Quple App. Este é um exemplo production-ready que você pode usar como referência.

**🎯 O que está incluído:**

• Meta tags básicas otimizadas
• Open Graph completo
• Twitter Cards
• Structured Data (JSON-LD)
• PWA meta tags
• Favicons para todos os dispositivos
• Preconnects para performance
• Resource hints
• Canonical URLs

**⚡ Otimizações de Performance:**

• DNS Prefetch para domínios externos
• Preconnect para fontes
• Preload para recursos críticos
• Async/defer em scripts
• Dimensões fixas em imagens

**🔍 Testando SEO:**

• Google Search Console
• Lighthouse (Chrome DevTools)
• Facebook Sharing Debugger
• Twitter Card Validator
• Rich Results Test (Google)`,
          codeExample: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <!-- ========================================
       BASIC META TAGS
       ======================================== -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Title (50-60 caracteres) -->
  <title>Quple | App para Casais Fortalecerem Relacionamentos 💕</title>

  <!-- Description (150-160 caracteres) -->
  <meta name="description" content="O Quple ajuda casais a definirem objetivos compartilhados, acompanharem progresso e fortalecerem relacionamentos através de metas conjuntas. Gratuito e fácil de usar.">

  <!-- Keywords (menos importante, mas não faz mal) -->
  <meta name="keywords" content="relacionamento de casal, app para casais, objetivos compartilhados, metas de relacionamento, fortalecer relacionamento, comunicação no relacionamento">

  <!-- Author -->
  <meta name="author" content="Quple Team">

  <!-- Robots -->
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://quple.com/">

  <!-- Language -->
  <meta http-equiv="content-language" content="pt-BR">

  <!-- ========================================
       OPEN GRAPH (Facebook, LinkedIn, WhatsApp)
       ======================================== -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://quple.com/">
  <meta property="og:site_name" content="Quple">
  <meta property="og:title" content="Quple - App para Casais Fortalecerem Relacionamentos">
  <meta property="og:description" content="Definam objetivos juntos, acompanhem progresso e fortaleçam o relacionamento. O Quple é gratuito e feito especialmente para casais.">
  <meta property="og:image" content="https://quple.com/images/og-image.jpg">
  <meta property="og:image:secure_url" content="https://quple.com/images/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Quple - App para Casais">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:locale:alternate" content="en_US">

  <!-- Facebook App ID (se tiver) -->
  <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID">

  <!-- ========================================
       TWITTER CARDS
       ======================================== -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@qupleapp">
  <meta name="twitter:creator" content="@qupleapp">
  <meta name="twitter:title" content="Quple - App para Casais">
  <meta name="twitter:description" content="Fortaleça seu relacionamento com objetivos compartilhados. Gratuito e fácil de usar.">
  <meta name="twitter:image" content="https://quple.com/images/twitter-card.jpg">
  <meta name="twitter:image:alt" content="Quple - App para Casais">

  <!-- ========================================
       PWA META TAGS
       ======================================== -->
  <meta name="theme-color" content="#667eea">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Quple">
  <meta name="application-name" content="Quple">
  <meta name="msapplication-TileColor" content="#667eea">
  <meta name="msapplication-config" content="/browserconfig.xml">

  <!-- Web App Manifest -->
  <link rel="manifest" href="/manifest.json">

  <!-- ========================================
       FAVICONS (Todos os Dispositivos)
       ======================================== -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#667eea">
  <link rel="shortcut icon" href="/favicon.ico">

  <!-- ========================================
       PERFORMANCE OPTIMIZATION
       ======================================== -->

  <!-- DNS Prefetch para domínios externos -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link rel="dns-prefetch" href="https://cdn.quple.com">

  <!-- Preconnect para recursos críticos -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Preload de recursos críticos -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/css/critical.css" as="style">

  <!-- ========================================
       STRUCTURED DATA (JSON-LD)
       ======================================== -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Quple",
    "description": "App para casais definirem e alcançarem objetivos compartilhados",
    "url": "https://quple.com",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web Browser, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2547"
    },
    "author": {
      "@type": "Organization",
      "name": "Quple",
      "url": "https://quple.com"
    }
  }
  </script>

  <!-- Organization Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Quple",
    "url": "https://quple.com",
    "logo": "https://quple.com/images/logo.png",
    "sameAs": [
      "https://facebook.com/qupleapp",
      "https://twitter.com/qupleapp",
      "https://instagram.com/qupleapp",
      "https://linkedin.com/company/quple"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "suporte@quple.com",
      "availableLanguage": ["Portuguese", "English"]
    }
  }
  </script>

  <!-- Breadcrumb Schema (para páginas internas) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://quple.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Funcionalidades",
        "item": "https://quple.com/funcionalidades"
      }
    ]
  }
  </script>

  <!-- ========================================
       STYLESHEETS
       ======================================== -->
  <!-- Critical CSS inline -->
  <style>
    /* Critical CSS aqui para First Paint */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
    }
  </style>

  <!-- Non-critical CSS carregado async -->
  <link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>

  <!-- Google Fonts (otimizado) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- ========================================
       ANALYTICS & TRACKING (async)
       ======================================== -->
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Facebook Pixel (opcional) -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  </script>
</head>

<body>
  <!-- ========================================
       SKIP LINKS (Acessibilidade)
       ======================================== -->
  <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>

  <!-- ========================================
       HEADER
       ======================================== -->
  <header role="banner">
    <nav role="navigation" aria-label="Principal">
      <a href="/">
        <img
          src="/images/logo.svg"
          alt="Quple - App para Casais"
          width="120"
          height="40"
          loading="eager"
        />
      </a>
      <!-- Navegação -->
    </nav>
  </header>

  <!-- ========================================
       MAIN CONTENT
       ======================================== -->
  <main id="main-content" role="main">
    <article>
      <h1>Fortaleça Seu Relacionamento com Objetivos Compartilhados</h1>

      <img
        src="/images/hero.jpg"
        alt="Casal sorrindo usando o app Quple juntos"
        width="1200"
        height="630"
        loading="eager"
        fetchpriority="high"
      />

      <p>
        O <strong>Quple</strong> é o app que ajuda casais a definirem e
        alcançarem objetivos juntos, fortalecendo o relacionamento através
        de metas compartilhadas.
      </p>

      <!-- Conteúdo restante -->
    </article>
  </main>

  <!-- ========================================
       FOOTER
       ======================================== -->
  <footer role="contentinfo">
    <p>&copy; 2024 Quple. Todos os direitos reservados.</p>
    <nav aria-label="Rodapé">
      <a href="/termos">Termos de Uso</a>
      <a href="/privacidade">Política de Privacidade</a>
      <a href="/contato">Contato</a>
    </nav>
  </footer>

  <!-- ========================================
       SCRIPTS (carregados no final)
       ======================================== -->
  <script src="/js/main.js" defer></script>
</body>
</html>`
        }
      ]
    }
  ]
}

