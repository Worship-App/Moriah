/**
 * CustomLoader Component
 * 
 * Animación de carga personalizada con el logo dorado de Moriah
 * Muestra un loader premium con efectos de brillo y animación
 */
export default function CustomLoader({ message = 'Cargando...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-secondary-900 to-black">
      {/* Efectos de fondo dorados */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Contenedor del loader */}
      <div className="relative text-center">
        {/* Logo animado */}
        <div className="mb-8 animate-bounce-in">
          <div className="relative inline-block">
            {/* Círculo de fondo con brillo */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-2xl opacity-60 animate-pulse" />
            
            {/* Logo */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-300 animate-shimmer" style={{ boxShadow: '0 0 60px rgba(245, 158, 11, 0.8)' }}>
              <span className="text-white font-bold text-6xl drop-shadow-2xl">M</span>
            </div>
          </div>
        </div>

        {/* Texto de carga */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 animate-pulse">
            Moriah
          </h2>
          <p className="text-gray-300 text-sm font-medium animate-fade-in">
            {message}
          </p>
        </div>

        {/* Barra de progreso animada */}
        <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-full animate-loading-bar" style={{ boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)' }} />
        </div>

        {/* Puntos animados */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
