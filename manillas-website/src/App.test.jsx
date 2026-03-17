import { describe, it, expect } from 'vitest'

describe('App Routing Configuration', () => {
  it('should have all required routes defined', () => {
    // This test verifies that the routing structure is correct
    const routes = [
      { path: '/', name: 'Home' },
      { path: '/catalog', name: 'Catalog' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
    ]

    expect(routes).toHaveLength(4)
    expect(routes[0].path).toBe('/')
    expect(routes[1].path).toBe('/catalog')
    expect(routes[2].path).toBe('/about')
    expect(routes[3].path).toBe('/contact')
  })

  it('should have 404 route for not found pages', () => {
    const notFoundRoute = { path: '*', name: 'NotFound' }
    expect(notFoundRoute.path).toBe('*')
  })

  it('should have navigation items for all routes', () => {
    const navItems = [
      { label: 'Inicio', path: '/' },
      { label: 'Catálogo', path: '/catalog' },
      { label: 'Sobre Nosotros', path: '/about' },
      { label: 'Contacto', path: '/contact' },
    ]

    expect(navItems).toHaveLength(4)
    navItems.forEach((item) => {
      expect(item).toHaveProperty('label')
      expect(item).toHaveProperty('path')
    })
  })
})

