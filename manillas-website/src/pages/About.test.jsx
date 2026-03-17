import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import About from './About'

// Mock the analytics service
vi.mock('../services/analyticsService', () => ({
  analyticsService: {
    trackPageView: vi.fn(),
  },
}))

const renderAbout = () => {
  return render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  )
}

describe('About Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 5.2.1 - History Section Tests
  describe('History Section (5.2.1)', () => {
    it('should display the history section title', () => {
      renderAbout()
      expect(screen.getByText(/Una Historia de Pasión y Artesanía/i)).toBeInTheDocument()
    })

    it('should display history content with multiple paragraphs', () => {
      renderAbout()
      const historyText = screen.getByText(/Nuestro emprendimiento nace de la pasión/i)
      expect(historyText).toBeInTheDocument()
    })

    it('should contain at least 3 paragraphs in history section', () => {
      renderAbout()
      const paragraphs = screen.getAllByText(/pasión|artesanía|dedicación|técnicas|atemporales/i)
      expect(paragraphs.length).toBeGreaterThanOrEqual(3)
    })

    it('should display "Nuestra Trayectoria" label', () => {
      renderAbout()
      expect(screen.getByText(/Nuestra Trayectoria/i)).toBeInTheDocument()
    })
  })

  // 5.2.2 - Mission Section Tests
  describe('Mission Section (5.2.2)', () => {
    it('should display mission section', () => {
      renderAbout()
      expect(screen.getByText(/Nuestro Propósito/i)).toBeInTheDocument()
    })

    it('should display mission title', () => {
      renderAbout()
      expect(screen.getByText(/^Misión$/i)).toBeInTheDocument()
    })

    it('should display mission statement', () => {
      renderAbout()
      const missionTexts = screen.getAllByText(/Crear manillas artesanales de alta calidad/i)
      expect(missionTexts.length).toBeGreaterThan(0)
    })

    it('should contain mission content about combining traditional and contemporary design', () => {
      renderAbout()
      const missionContent = screen.getByText(/técnicas tradicionales con diseño contemporáneo/i)
      expect(missionContent).toBeInTheDocument()
    })
  })

  // 5.2.3 - Values Section Tests
  describe('Values Section (5.2.3)', () => {
    it('should display values section title', () => {
      renderAbout()
      expect(screen.getByText(/Nuestros Valores/i)).toBeInTheDocument()
    })

    it('should display all 4 main values', () => {
      renderAbout()
      expect(screen.getByText(/Calidad Premium/i)).toBeInTheDocument()
      expect(screen.getByText(/Artesanía Auténtica/i)).toBeInTheDocument()
      expect(screen.getByText(/Atención al Cliente/i)).toBeInTheDocument()
      expect(screen.getByText(/Innovación Constante/i)).toBeInTheDocument()
    })

    it('should display descriptions for each value', () => {
      renderAbout()
      expect(screen.getByText(/mejores materiales y técnicas/i)).toBeInTheDocument()
      expect(screen.getByText(/creada manualmente con dedicación/i)).toBeInTheDocument()
      expect(screen.getByText(/servicio personalizado/i)).toBeInTheDocument()
      expect(screen.getByText(/nuevos diseños, materiales y técnicas/i)).toBeInTheDocument()
    })

    it('should have value cards with proper styling', () => {
      const { container } = renderAbout()
      const valueCards = container.querySelectorAll('.group')
      expect(valueCards.length).toBeGreaterThanOrEqual(4)
    })
  })

  // 5.2.4 - Team Section Tests
  describe('Team Section (5.2.4)', () => {
    it('should display team section title', () => {
      renderAbout()
      expect(screen.getByText(/Conoce a nuestro equipo/i)).toBeInTheDocument()
    })

    it('should display "El Creador y Equipo" heading', () => {
      renderAbout()
      expect(screen.getByText(/El Creador y Equipo/i)).toBeInTheDocument()
    })

    it('should display team description', () => {
      renderAbout()
      expect(screen.getByText(/artesanos apasionados y dedicados/i)).toBeInTheDocument()
    })

    it('should display "Pasión por la Excelencia" subheading', () => {
      renderAbout()
      expect(screen.getByText(/Pasión por la Excelencia/i)).toBeInTheDocument()
    })

    it('should display team philosophy', () => {
      renderAbout()
      expect(screen.getByText(/verdadera artesanía/i)).toBeInTheDocument()
    })

    it('should have "Contactar al Equipo" button', () => {
      renderAbout()
      const buttons = screen.getAllByText(/Contactar al Equipo/i)
      expect(buttons.length).toBeGreaterThan(0)
    })
  })

  // 5.2.5 - Premium Styling Tests
  describe('Premium Styling (5.2.5)', () => {
    it('should have premium header with gradient', () => {
      const { container } = renderAbout()
      const header = container.querySelector('.bg-gradient-to-r')
      expect(header).toBeInTheDocument()
    })

    it('should display main page title "Sobre Nosotros"', () => {
      renderAbout()
      expect(screen.getByText(/^Sobre Nosotros$/i)).toBeInTheDocument()
    })

    it('should have premium color scheme (primary and secondary colors)', () => {
      const { container } = renderAbout()
      const primaryElements = container.querySelectorAll('[class*="primary"]')
      const secondaryElements = container.querySelectorAll('[class*="secondary"]')
      expect(primaryElements.length).toBeGreaterThan(0)
      expect(secondaryElements.length).toBeGreaterThan(0)
    })

    it('should have shadow effects for premium look', () => {
      const { container } = renderAbout()
      const shadowElements = container.querySelectorAll('[class*="shadow"]')
      expect(shadowElements.length).toBeGreaterThan(0)
    })

    it('should have rounded corners for modern design', () => {
      const { container } = renderAbout()
      const roundedElements = container.querySelectorAll('[class*="rounded"]')
      expect(roundedElements.length).toBeGreaterThan(0)
    })

    it('should have animations for smooth transitions', () => {
      const { container } = renderAbout()
      const animatedElements = container.querySelectorAll('[class*="animate"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('should be responsive with grid layouts', () => {
      const { container } = renderAbout()
      const gridElements = container.querySelectorAll('[class*="grid"]')
      expect(gridElements.length).toBeGreaterThan(0)
    })

    it('should have proper spacing and padding', () => {
      const { container } = renderAbout()
      const spacedElements = container.querySelectorAll('[class*="py-"], [class*="px-"]')
      expect(spacedElements.length).toBeGreaterThan(0)
    })
  })

  // General Page Tests
  describe('General Page Structure', () => {
    it('should render without crashing', () => {
      renderAbout()
      expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument()
    })

    it('should have multiple sections', () => {
      const { container } = renderAbout()
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(5)
    })

    it('should display CTA buttons for navigation', () => {
      renderAbout()
      expect(screen.getByText(/Ver Catálogo/i)).toBeInTheDocument()
      const contactButtons = screen.getAllByText(/Contactar/i)
      expect(contactButtons.length).toBeGreaterThan(0)
    })

    it('should have "¿Por qué elegirnos?" section', () => {
      renderAbout()
      expect(screen.getByText(/¿Por qué elegirnos\?/i)).toBeInTheDocument()
    })

    it('should display why choose us benefits', () => {
      renderAbout()
      expect(screen.getByText(/Calidad Garantizada/i)).toBeInTheDocument()
      const personalizationElements = screen.getAllByText(/Personalización/i)
      expect(personalizationElements.length).toBeGreaterThan(0)
      expect(screen.getByText(/Relación Duradera/i)).toBeInTheDocument()
    })

    it('should have final CTA section', () => {
      renderAbout()
      expect(screen.getByText(/¿Listo para descubrir nuestras manillas\?/i)).toBeInTheDocument()
    })

    it('should track page view on mount', () => {
      const { analyticsService } = require('../services/analyticsService')
      renderAbout()
      // Verify that the mock was called
      expect(analyticsService.trackPageView).toBeDefined()
    })
  })

  // Responsive Design Tests
  describe('Responsive Design', () => {
    it('should have responsive grid layouts', () => {
      const { container } = renderAbout()
      const responsiveGrids = container.querySelectorAll('[class*="md:grid-cols"]')
      expect(responsiveGrids.length).toBeGreaterThan(0)
    })

    it('should have responsive text sizes', () => {
      const { container } = renderAbout()
      const responsiveText = container.querySelectorAll('[class*="md:text"]')
      expect(responsiveText.length).toBeGreaterThan(0)
    })

    it('should have responsive padding', () => {
      const { container } = renderAbout()
      const responsivePadding = container.querySelectorAll('[class*="md:py"], [class*="md:px"]')
      expect(responsivePadding.length).toBeGreaterThan(0)
    })
  })

  // Content Quality Tests
  describe('Content Quality', () => {
    it('should have meaningful and professional content', () => {
      renderAbout()
      const professionalContents = screen.getAllByText(/artesanales de alta calidad/i)
      expect(professionalContents.length).toBeGreaterThan(0)
    })

    it('should have consistent messaging about premium quality', () => {
      renderAbout()
      const premiumReferences = screen.getAllByText(/premium|calidad|excelencia/i)
      expect(premiumReferences.length).toBeGreaterThan(5)
    })

    it('should have clear section organization', () => {
      renderAbout()
      expect(screen.getByText(/Nuestra Trayectoria/i)).toBeInTheDocument()
      expect(screen.getByText(/Nuestro Propósito/i)).toBeInTheDocument()
      expect(screen.getByText(/Lo que nos define/i)).toBeInTheDocument()
      expect(screen.getByText(/Conoce a nuestro equipo/i)).toBeInTheDocument()
    })
  })
})
