import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />
      
      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              CarroConfiável: O seu próximo carro com laudo e transparência.
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Conectamos você a lojistas verificados e veículos com laudo cautelar aprovado.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Buscar veículos..."
                className="flex-1 w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium whitespace-nowrap">
                <Search className="mr-2 w-5 h-5" />
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}