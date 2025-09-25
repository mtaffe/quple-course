export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          ✅ Tailwind CSS Funcionando!
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            React Learning Playground
          </h2>
          <p className="text-gray-600 mb-6">
            Sistema completamente funcional com Tailwind CSS aplicado!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Cores</h3>
            <p>Sistema de cores funcionando</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Layout</h3>
            <p>Grid responsivo ativo</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Styling</h3>
            <p>Todas as classes aplicadas</p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4">
            Botão Primário
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Botão Secundário
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          🎯 Sistema pronto para uso! Todas as funcionalidades CSS estão ativas.
        </div>
      </div>
    </div>
  )
}