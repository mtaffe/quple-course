export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          🎯 Tailwind CSS Test Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Card 1</h2>
            <p className="text-gray-600">Tailwind está funcionando!</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Botão Azul
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Card 2</h2>
            <p className="text-gray-600">Design system funcionando!</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
              Botão Verde
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Card 3</h2>
            <p className="text-gray-600">Responsivo e bonito!</p>
            <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
              Botão Roxo
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-white p-6 rounded-lg shadow-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-gray-700 font-medium">Tailwind CSS Funcionando! ✅</span>
          </div>
        </div>
      </div>
    </div>
  )
}