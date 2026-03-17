import CustomLoader from './CustomLoader'

/**
 * Loading Component - Displays a loading spinner with message
 * 
 * Features:
 * - Animated spinner with premium styling
 * - Customizable loading message
 * - Centered layout
 * - Smooth animations
 * - Full screen custom loader option
 */

export default function Loading({ message = 'Cargando...', fullScreen = false, useCustomLoader = false }) {
  // Si se solicita el loader personalizado y es fullScreen, usar CustomLoader
  if (fullScreen && useCustomLoader) {
    return <CustomLoader message={message} />
  }

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50'
    : 'flex flex-col items-center justify-center py-12'

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        {/* Premium spinner con diseño dorado */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-yellow-500 animate-spin" style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' }}></div>
        </div>
        
        {/* Loading message */}
        {message && (
          <p className="text-secondary-700 font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600">{message}</p>
        )}
      </div>
    </div>
  )
}
