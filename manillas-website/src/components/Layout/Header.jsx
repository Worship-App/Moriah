import { useState } from 'react'
import Navigation from './Navigation'
import ThemeToggle from '../Common/ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-gradient-to-r from-white via-amber-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b-2 border-amber-200 dark:border-amber-600/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo con diseño premium dorado */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-amber-500/60 transition-all duration-300 group-hover:scale-110 border-2 border-amber-300" style={{ boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)' }}>
                <span className="text-white font-bold text-2xl drop-shadow-lg">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 dark:from-yellow-400 dark:via-amber-400 dark:to-yellow-500">
                  Moriah
                </h1>
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">✨ Premium Collection</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav>
              <Navigation />
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button con diseño dorado */}
          <button
            className="md:hidden p-3 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 hover:from-amber-100 hover:to-yellow-100 dark:hover:from-gray-600 dark:hover:to-gray-700 border-2 border-amber-300 dark:border-amber-600 transition-all duration-300 group shadow-lg hover:shadow-xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className={`w-6 h-6 text-amber-700 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-all duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation con fondo premium */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 pt-4 border-t-2 border-amber-200 dark:border-amber-600/30 bg-gradient-to-b from-amber-50/50 to-white dark:from-gray-800 dark:to-gray-900 animate-fade-in">
            <Navigation />
          </nav>
        )}
      </div>
    </header>
  )
}
