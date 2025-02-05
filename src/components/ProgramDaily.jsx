function ProgramDaily() {
  return (
    <div className="hidden md:block bg-white/20 backdrop-blur-lg rounded-lg p-6 text-white max-w-md">
      <h2 className="text-2xl font-bold mb-6">PROGRAMACIÓN SEMANAL</h2>

      {/* Morning Program */}
      <div className="mb-8">
        <h3 className="text-blue-400 mb-4">Programa Matutino</h3>
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
            alt="Juan"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h4 className="font-bold">Despertar con Juan</h4>
            <p className="text-sm text-gray-300">
              Lunes a Viernes, 6:00 - 10:00
            </p>
            <p className="text-sm text-gray-300">
              Noticias, tráfico y los éxitos del momento
            </p>
          </div>
        </div>
      </div>

      {/* Midday Program */}
      <div>
        <h3 className="text-blue-400 mb-4">Programa del Mediodía</h3>
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
            alt="Maria"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h4 className="font-bold">Conexión Maria</h4>
            <p className="text-sm text-gray-300">
              Lunes a Viernes, 10:00 - 14:00
            </p>
            <p className="text-sm text-gray-300">
              Música latina y entrevistas exclusivas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramDaily;
