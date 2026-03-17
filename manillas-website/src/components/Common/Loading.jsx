/**
 * Loading Component - Displays a loading spinner with message
 * 
 * Features:
 * - Animated spinner with premium styling
 * - Customizable loading message
 * - Centered layout
 * - Smooth animations
 */

export default function Loading({ message = 'Cargando...', fullScreen = false }) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50'
    : 'flex flex-col items-center justify-center py-12'

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        {/* Premium spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-secondary-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-500 animate-spin"></div>
        </div>
        
        {/* Loading message */}
        {message && (
          <p className="text-secondary-700 font-medium text-center">{message}</p>
        )}
      </div>
    </div>
  )
}
