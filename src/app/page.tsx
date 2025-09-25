export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-white font-semibold text-lg">React Playground</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Como Funciona</a>
            <a href="/simple" className="text-gray-300 hover:text-white transition-colors">Demo</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Sistema Online • Pronto para Usar</span>
          </div>

          {/* Título */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
            Domine React
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Construindo Apps Reais
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Plataforma gamificada que te ensina desenvolvimento web através de desafios práticos.
            <span className="text-blue-300 font-medium">Construa o Quple</span> (app para casais) enquanto domina HTML, CSS, JS e React.
          </p>

          {/* Botões de Login/Cadastro */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/auth/register" className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              <span className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>Começar Agora - Grátis</span>
              </span>
            </a>
            <a href="/auth/login" className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
              <span className="flex items-center justify-center space-x-2">
                <span>🔑</span>
                <span>Já Tenho Conta</span>
              </span>
            </a>
          </div>

          {/* Preview Button */}
          <div className="mb-16">
            <a href="/simple" className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
              <span>👀 Ver o Sistema em Ação</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Desafios</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">2-3h</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Por Dia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">5</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Semanas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Prático</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Como Você Vai Aprender</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Sistema baseado em projetos reais. Aprenda fazendo, não só assistindo.
            </p>
          </div>

          {/* Cards de Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">🔨</div>
              <h3 className="text-xl font-semibold mb-3 text-white">HTML na Prática</h3>
              <p className="text-gray-300">Crie estruturas reais que funcionam. Nada de "Hello World".</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">🎨</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Design Responsivo</h3>
              <p className="text-gray-300">CSS que funciona em qualquer dispositivo. Visual profissional.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-white">JS Interativo</h3>
              <p className="text-gray-300">Funcionalidades que usuários realmente usam.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Desafios Reais</h3>
              <p className="text-gray-300">Conserte bugs de um app real. Como na vida real.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">🏆</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Sistema de Níveis</h3>
              <p className="text-gray-300">XP, conquistas e progresso. Viciante de um jeito bom.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-200">🚀</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Projeto Final</h3>
              <p className="text-gray-300">App completo no seu portfólio. Pronto para mostrar.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Sua Jornada em 5 Semanas</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Do zero ao seu primeiro app React. Cada semana um novo superpoder.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { week: 1, title: "Semana 1-2: Base Sólida", desc: "HTML semântico e estruturas que fazem sentido", icon: "🏗️" },
              { week: 2, title: "Semana 2-3: Visual Profissional", desc: "CSS responsivo e design system", icon: "🎨" },
              { week: 3, title: "Semana 3-4: Interatividade", desc: "JavaScript que os usuários vão usar", icon: "⚡" },
              { week: 4, title: "Semana 4-5: React Power", desc: "Componentes e estado. O futuro chegou", icon: "⚛️" },
              { week: 5, title: "Semana 5: Portfólio", desc: "App completo pronto para mostrar ao mundo", icon: "🚀" },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
                <div className="text-2xl font-bold text-blue-400">#{item.week}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-6 rounded-2xl mb-12">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Virar Dev?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Não é só mais um curso. É sua entrada no mundo do desenvolvimento.
            <strong className="text-white">Comece hoje, seja dev amanhã.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/register" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              🚀 Começar Grátis Agora
            </a>
            <a href="/simple" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-200">
              👀 Ver Demo Primeiro
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-semibold">React Playground</span>
          </div>
          <p className="text-gray-400 text-sm">
            Plataforma gamificada para aprender desenvolvimento web. Criado para jovens desenvolvedores.
          </p>
        </div>
      </footer>
    </div>
  )
}
