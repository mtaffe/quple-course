export default function SimplePage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          🎯 React Learning Playground
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sistema Funcionando!</h2>
          <p className="text-gray-600 mb-6">
            Sistema gamificado para ensinar desenvolvimento web através de desafios práticos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Desafios</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">Completo</div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">Web</div>
              <div className="text-sm text-gray-600">Focado</div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            🚀 Começar Desafios
          </button>

          <div className="text-sm text-gray-500">
            Tailwind CSS está funcionando perfeitamente!
          </div>
        </div>
      </div>
    </div>
  )
}