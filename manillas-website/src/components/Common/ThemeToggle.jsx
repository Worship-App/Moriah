import { useTheme } from '../../context/ThemeContext'

/**
 * ThemeToggle Component
 * 
 * Toggle para cambiar entre modo claro y oscuro
 * Muestra un sol para modo claro y luna para modo oscuro
 */
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-gray-700 dark:to-gray-800 border-2 border-amber-300 dark:border-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-400/20 dark:from-amber-500/20 dark:to-yellow-500/20 blur-md group-hover:blur-lg transition-all duration-300" />
      
      {/* Icono */}
      <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
        {isDarkMode ? (
          // Luna (modo oscuro activo)
          <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          // Sol (modo claro activo)
          <svg className="w-7 h-7 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  )
}
