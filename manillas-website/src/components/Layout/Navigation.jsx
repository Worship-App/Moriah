import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalog' },
    { label: 'Sobre Nosotros', path: '/about' },
    { label: 'Contacto', path: '/contact' },
  ]

  return (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`font-medium transition-all duration-300 pb-2 border-b-2 ${
              isActive(item.path)
                ? 'text-secondary border-secondary'
                : 'text-primary hover:text-secondary border-transparent hover:border-secondary'
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
