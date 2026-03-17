import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { label: 'Inicio', path: '/', icon: '🏠' },
    { label: 'Catálogo', path: '/catalog', icon: '✨' },
    { label: 'Sobre Nosotros', path: '/about', icon: '💎' },
    { label: 'Contacto', path: '/contact', icon: '📞' },
  ]

  return (
    <ul className="flex flex-col md:flex-row gap-2 md:gap-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
            {isActive(item.path) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-1 h-1 bg-primary-500 rounded-full" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
