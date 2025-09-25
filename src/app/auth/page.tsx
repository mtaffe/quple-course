export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="mb-4 inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm">
              ✨ React Learning Playground
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-600">
              Continue sua jornada de aprendizado em desenvolvimento web
            </p>
          </div>

          {/* Auth Options */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="space-y-4">
              <a
                href="/auth/login"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
              >
                🔐 Fazer Login
              </a>

              <div className="text-center text-gray-500 text-sm">
                ou
              </div>

              <a
                href="/auth/register"
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors text-center block"
              >
                ✨ Criar Conta Nova
              </a>
            </div>
          </div>

          {/* Features Preview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">
              O que você vai encontrar:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                  🎯
                </div>
                <span className="text-sm text-gray-600">5 desafios progressivos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">
                  🏆
                </div>
                <span className="text-sm text-gray-600">Sistema de XP e badges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm">
                  💻
                </div>
                <span className="text-sm text-gray-600">Editor de código integrado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm">
                  📊
                </div>
                <span className="text-sm text-gray-600">Progresso personalizado</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
            >
              ← Voltar para início
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}