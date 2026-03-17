import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import * as analyticsService from '../services/analyticsService'

// Mock the analytics service
vi.mock('../services/analyticsService', () => ({
  analyticsService: {
    trackPageView: vi.fn(),
  },
}))

// Mock the hooks
vi.mock('../hooks/useProducts', () => ({
  useProducts: () => ({
    products: [
      {
        id: '1',
        name: 'Manilla Gold',
        description: 'Manilla de oro premium',
        price: 50000,
        currency: 'COP',
        type: 'Brazalete',
        colors: ['Oro'],
        materials: ['Oro 18k'],
        images: {
          thumbnail: 'https://via.placeholder.com/300',
          main: 'https://via.placeholder.com/600',
          gallery: [],
        },
        availability: { inStock: true, quantity: 5 },
        featured: true,
      },
      {
        id: '2',
        name: 'Manilla Silver',
        description: 'Manilla de plata premium',
        price: 40000,
        currency: 'COP',
        type: 'Pulsera',
        colors: ['Plata'],
        materials: ['Plata 925'],
        images: {
          thumbnail: 'https://via.placeholder.com/300',
          main: 'https://via.placeholder.com/600',
          gallery: [],
        },
        availability: { inStock: true, quantity: 3 },
        featured: true,
      },
      {
        id: '3',
        name: 'Manilla Copper',
        description: 'Manilla de cobre premium',
        price: 30000,
        currency: 'COP',
        type: 'Brazalete',
        colors: ['Cobre'],
        materials: ['Cobre puro'],
        images: {
          thumbnail: 'https://via.placeholder.com/300',
          main: 'https://via.placeholder.com/600',
          gallery: [],
        },
        availability: { inStock: false, quantity: 0 },
        featured: true,
      },
    ],
    loading: false,
  }),
}))

const mockFeaturedProducts = [
  {
    id: '1',
    name: 'Manilla Gold',
    description: 'Manilla de oro premium',
    price: 50000,
    currency: 'COP',
    type: 'Brazalete',
    colors: ['Oro'],
    materials: ['Oro 18k'],
    images: {
      thumbnail: 'https://via.placeholder.com/300',
      main: 'https://via.placeholder.com/600',
      gallery: [],
    },
    availability: { inStock: true, quantity: 5 },
    featured: true,
  },
  {
    id: '2',
    name: 'Manilla Silver',
    description: 'Manilla de plata premium',
    price: 40000,
    currency: 'COP',
    type: 'Pulsera',
    colors: ['Plata'],
    materials: ['Plata 925'],
    images: {
      thumbnail: 'https://via.placeholder.com/300',
      main: 'https://via.placeholder.com/600',
      gallery: [],
    },
    availability: { inStock: true, quantity: 3 },
    featured: true,
  },
  {
    id: '3',
    name: 'Manilla Copper',
    description: 'Manilla de cobre premium',
    price: 30000,
    currency: 'COP',
    type: 'Brazalete',
    colors: ['Cobre'],
    materials: ['Cobre puro'],
    images: {
      thumbnail: 'https://via.placeholder.com/300',
      main: 'https://via.placeholder.com/600',
      gallery: [],
    },
    availability: { inStock: false, quantity: 0 },
    featured: true,
  },
]

vi.mock('../store/productStore', () => ({
  useProductStore: (selector) => {
    if (typeof selector === 'function') {
      return selector({
        getFeaturedProducts: () => mockFeaturedProducts,
      })
    }
    return () => mockFeaturedProducts
  },
}))

const renderHome = () => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('5.1.1 - Banner Principal', () => {
    it('should display main banner with title', () => {
      renderHome()
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      expect(h1.textContent).toContain('Manillas')
      expect(h1.textContent).toContain('Premium')
    })

    it('should display banner description', () => {
      renderHome()
      expect(screen.getByText(/Descubre nuestra colección exclusiva/i)).toBeInTheDocument()
    })

    it('should have banner with gradient background', () => {
      const { container } = renderHome()
      const banner = container.querySelector('section')
      expect(banner).toHaveClass('bg-secondary-900')
    })
  })

  describe('5.1.2 - Descripción del Emprendimiento', () => {
    it('should display about section with title', () => {
      renderHome()
      expect(screen.getByText(/Sobre Nuestro/i)).toBeInTheDocument()
    })

    it('should display about section description', () => {
      renderHome()
      expect(screen.getByText(/emprendimiento dedicado a la creación/i)).toBeInTheDocument()
    })

    it('should have "Conocer Más" button in about section', () => {
      renderHome()
      const buttons = screen.getAllByText(/Conocer Más/i)
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  describe('5.1.3 - Productos Destacados', () => {
    it('should display featured products section title', () => {
      renderHome()
      const h2s = screen.getAllByRole('heading', { level: 2 })
      const productsHeading = h2s.find(h => h.textContent.includes('Productos') && h.textContent.includes('Destacados'))
      expect(productsHeading).toBeInTheDocument()
    })

    it('should display featured products', () => {
      renderHome()
      expect(screen.getByText('Manilla Gold')).toBeInTheDocument()
      expect(screen.getByText('Manilla Silver')).toBeInTheDocument()
      expect(screen.getByText('Manilla Copper')).toBeInTheDocument()
    })

    it('should display at least 3 featured products', () => {
      renderHome()
      const productCards = screen.getAllByText(/Ver Detalles/i)
      expect(productCards.length).toBeGreaterThanOrEqual(3)
    })

    it('should display "Ver Todos los Productos" button', () => {
      renderHome()
      expect(screen.getByText(/Ver Todos los Productos/i)).toBeInTheDocument()
    })
  })

  describe('5.1.4 - Llamadas a Acción (CTA)', () => {
    it('should display "Ver Catálogo" button in hero banner', () => {
      renderHome()
      const catalogButtons = screen.getAllByText(/Ver Catálogo/i)
      expect(catalogButtons.length).toBeGreaterThan(0)
    })

    it('should display "Contactar Ahora" button in hero banner', () => {
      renderHome()
      expect(screen.getByText(/Contactar Ahora/i)).toBeInTheDocument()
    })

    it('should display "Ir al Catálogo" button in final CTA section', () => {
      renderHome()
      const catalogButtons = screen.getAllByText(/Ir al Catálogo/i)
      expect(catalogButtons.length).toBeGreaterThan(0)
    })

    it('should display "Contactar" button in final CTA section', () => {
      renderHome()
      const contactButtons = screen.getAllByText(/Contactar/i)
      expect(contactButtons.length).toBeGreaterThan(0)
    })

    it('should have clickable CTA buttons', () => {
      renderHome()
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      // Filter out disabled buttons (from ProductCard)
      const enabledButtons = buttons.filter(button => !button.disabled)
      expect(enabledButtons.length).toBeGreaterThan(0)
    })
  })

  describe('5.1.5 - Estilos Premium y Responsive', () => {
    it('should have premium color scheme', () => {
      const { container } = renderHome()
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
      
      // Check for premium colors in the entire page
      const html = container.innerHTML
      const hasPremiumColors = html.includes('primary-500') || html.includes('secondary-900') || html.includes('accent')
      expect(hasPremiumColors).toBe(true)
    })

    it('should have responsive grid layout', () => {
      const { container } = renderHome()
      const grids = container.querySelectorAll('[class*="grid"]')
      expect(grids.length).toBeGreaterThan(0)
      
      // Check for responsive classes
      const hasResponsiveClasses = Array.from(grids).some(grid => 
        grid.className.includes('grid-cols-1') && 
        (grid.className.includes('md:') || grid.className.includes('lg:'))
      )
      expect(hasResponsiveClasses).toBe(true)
    })

    it('should have smooth animations', () => {
      const { container } = renderHome()
      const animatedElements = container.querySelectorAll('[class*="animate-"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('should have proper spacing and padding', () => {
      const { container } = renderHome()
      const sections = container.querySelectorAll('section')
      sections.forEach(section => {
        expect(section.className).toMatch(/py-|px-/)
      })
    })

    it('should have rounded corners for premium look', () => {
      const { container } = renderHome()
      const roundedElements = container.querySelectorAll('[class*="rounded"]')
      expect(roundedElements.length).toBeGreaterThan(0)
    })

    it('should have shadow effects for depth', () => {
      const { container } = renderHome()
      const shadowElements = container.querySelectorAll('[class*="shadow"]')
      expect(shadowElements.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation and Interactions', () => {
    it('should track page view on mount', () => {
      renderHome()
      expect(analyticsService.analyticsService.trackPageView).toHaveBeenCalledWith('home')
    })

    it('should have proper section structure', () => {
      const { container } = renderHome()
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(4) // Hero, About, Featured, CTA, Why Choose Us
    })

    it('should display "Por Qué Elegirnos" section', () => {
      renderHome()
      expect(screen.getByText(/¿Por Qué Elegirnos\?/i)).toBeInTheDocument()
    })

    it('should display feature cards', () => {
      renderHome()
      expect(screen.getByText(/Diseño Exclusivo/i)).toBeInTheDocument()
      expect(screen.getByText(/Materiales Premium/i)).toBeInTheDocument()
      expect(screen.getByText(/Atención Personalizada/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderHome()
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      
      const h2s = screen.getAllByRole('heading', { level: 2 })
      expect(h2s.length).toBeGreaterThan(0)
    })

    it('should have descriptive button text', () => {
      renderHome()
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.textContent.trim().length).toBeGreaterThan(0)
      })
    })

    it('should have alt text for images', () => {
      renderHome()
      const images = screen.getAllByRole('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
      })
    })
  })
})
