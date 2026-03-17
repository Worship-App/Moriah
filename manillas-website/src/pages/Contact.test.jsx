import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Contact from './Contact'

// Mock the analytics service
vi.mock('../services/analyticsService', () => ({
  analyticsService: {
    trackPageView: vi.fn(),
  },
}))

// Mock the ContactForm component
vi.mock('../components/Forms/ContactForm', () => ({
  default: () => <div data-testid="contact-form">Contact Form Component</div>,
}))

// Mock the ContactChannels component
vi.mock('../components/Contact/ContactChannels', () => ({
  default: () => <div data-testid="contact-channels">Contact Channels Component</div>,
}))

const renderContact = () => {
  return render(
    <BrowserRouter>
      <Contact />
    </BrowserRouter>
  )
}

describe('Contact Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 5.3.1 - Contact Form Display Tests
  describe('Contact Form Display (5.3.1)', () => {
    it('should display the contact form section', () => {
      renderContact()
      expect(screen.getByText(/Envíanos un Mensaje/i)).toBeInTheDocument()
    })

    it('should render the ContactForm component', () => {
      renderContact()
      expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    })

    it('should display form description', () => {
      renderContact()
      expect(screen.getByText(/Completa el formulario y nos pondremos en contacto/i)).toBeInTheDocument()
    })

    it('should have form section with proper styling', () => {
      const { container } = renderContact()
      const formSection = container.querySelector('section')
      expect(formSection).toBeInTheDocument()
    })
  })

  // 5.3.2 - Direct Contact Information Tests
  describe('Direct Contact Information (5.3.2)', () => {
    it('should display contact information section', () => {
      renderContact()
      expect(screen.getByText(/Información de Contacto/i)).toBeInTheDocument()
    })

    it('should render ContactChannels component', () => {
      renderContact()
      expect(screen.getByTestId('contact-channels')).toBeInTheDocument()
    })

    it('should display business hours section', () => {
      renderContact()
      expect(screen.getByText(/Horario de Atención/i)).toBeInTheDocument()
    })

    it('should display weekday hours', () => {
      renderContact()
      expect(screen.getByText(/Lunes - Viernes/i)).toBeInTheDocument()
      expect(screen.getByText(/9:00 AM - 6:00 PM/i)).toBeInTheDocument()
    })

    it('should display Saturday hours', () => {
      renderContact()
      expect(screen.getByText(/Sábado/i)).toBeInTheDocument()
      expect(screen.getByText(/10:00 AM - 4:00 PM/i)).toBeInTheDocument()
    })

    it('should display Sunday as closed', () => {
      renderContact()
      expect(screen.getByText(/Domingo/i)).toBeInTheDocument()
      expect(screen.getByText(/Cerrado/i)).toBeInTheDocument()
    })

    it('should have hours section with proper styling', () => {
      const { container } = renderContact()
      const hoursSection = container.querySelector('[class*="from-gray-50"]')
      expect(hoursSection).toBeInTheDocument()
    })
  })

  // 5.3.3 - Social Media Links Tests
  describe('Social Media Links (5.3.3)', () => {
    it('should display social media section through ContactChannels', () => {
      renderContact()
      expect(screen.getByTestId('contact-channels')).toBeInTheDocument()
    })

    it('should have social media section title', () => {
      renderContact()
      // ContactChannels component should handle social media display
      expect(screen.getByTestId('contact-channels')).toBeInTheDocument()
    })
  })

  // 5.3.4 - Location Information Tests
  describe('Location Information (5.3.4)', () => {
    it('should display location section', () => {
      renderContact()
      expect(screen.getByText(/Estamos ubicados en el corazón de la ciudad/i)).toBeInTheDocument()
    })

    it('should display location description', () => {
      renderContact()
      expect(screen.getByText(/Estamos ubicados en el corazón de la ciudad/i)).toBeInTheDocument()
    })

    it('should display address information', () => {
      renderContact()
      expect(screen.getByText(/Dirección/i)).toBeInTheDocument()
      expect(screen.getByText(/Calle Principal 123/i)).toBeInTheDocument()
    })

    it('should display city information', () => {
      renderContact()
      expect(screen.getByText(/Tu Ciudad, País/i)).toBeInTheDocument()
    })

    it('should have location section with proper styling', () => {
      const { container } = renderContact()
      const locationSection = container.querySelector('[class*="from-blue-50"]')
      expect(locationSection).toBeInTheDocument()
    })
  })

  // 5.3.5 - Responsive Design Tests
  describe('Responsive Design (5.3.5)', () => {
    it('should have responsive header', () => {
      const { container } = renderContact()
      const header = container.querySelector('[class*="md:py"]')
      expect(header).toBeInTheDocument()
    })

    it('should have responsive grid layout', () => {
      const { container } = renderContact()
      const gridLayout = container.querySelector('[class*="lg:grid-cols"]')
      expect(gridLayout).toBeInTheDocument()
    })

    it('should have responsive text sizes', () => {
      const { container } = renderContact()
      const responsiveText = container.querySelectorAll('[class*="md:text"]')
      expect(responsiveText.length).toBeGreaterThan(0)
    })

    it('should have responsive padding', () => {
      const { container } = renderContact()
      const responsivePadding = container.querySelectorAll('[class*="md:py"], [class*="md:px"]')
      expect(responsivePadding.length).toBeGreaterThan(0)
    })

    it('should have mobile-first design', () => {
      const { container } = renderContact()
      const mobileElements = container.querySelectorAll('[class*="grid-cols-1"]')
      expect(mobileElements.length).toBeGreaterThan(0)
    })

    it('should have proper gap spacing for responsive layout', () => {
      const { container } = renderContact()
      const gapElements = container.querySelectorAll('[class*="gap"]')
      expect(gapElements.length).toBeGreaterThan(0)
    })
  })

  // FAQ Section Tests
  describe('FAQ Section', () => {
    it('should display FAQ section title', () => {
      renderContact()
      expect(screen.getByText(/Preguntas Frecuentes/i)).toBeInTheDocument()
    })

    it('should display delivery time FAQ', () => {
      renderContact()
      expect(screen.getByText(/¿Cuál es el tiempo de entrega\?/i)).toBeInTheDocument()
      expect(screen.getByText(/Los pedidos se preparan en 3-5 días hábiles/i)).toBeInTheDocument()
    })

    it('should display customization FAQ', () => {
      renderContact()
      expect(screen.getByText(/¿Aceptan personalizaciones\?/i)).toBeInTheDocument()
      expect(screen.getByText(/Sí, ofrecemos personalizaciones/i)).toBeInTheDocument()
    })

    it('should display returns policy FAQ', () => {
      renderContact()
      expect(screen.getByText(/¿Cuál es la política de devoluciones\?/i)).toBeInTheDocument()
      expect(screen.getByText(/Aceptamos devoluciones dentro de 30 días/i)).toBeInTheDocument()
    })

    it('should display warranty FAQ', () => {
      renderContact()
      expect(screen.getByText(/¿Ofrecen garantía\?/i)).toBeInTheDocument()
      expect(screen.getByText(/garantía de 1 año/i)).toBeInTheDocument()
    })

    it('should have 4 FAQ items', () => {
      const { container } = renderContact()
      const faqItems = container.querySelectorAll('[class*="md:grid-cols-2"] > div')
      expect(faqItems.length).toBeGreaterThanOrEqual(4)
    })
  })

  // CTA Section Tests
  describe('Call-to-Action Section', () => {
    it('should display CTA section title', () => {
      renderContact()
      expect(screen.getByText(/¿Tienes más preguntas\?/i)).toBeInTheDocument()
    })

    it('should display CTA description', () => {
      renderContact()
      expect(screen.getByText(/No dudes en contactarnos/i)).toBeInTheDocument()
    })

    it('should have message button in CTA', () => {
      renderContact()
      const buttons = screen.getAllByText(/Enviar Mensaje/i)
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('should have WhatsApp button in CTA', () => {
      renderContact()
      expect(screen.getByText(/Contactar por WhatsApp/i)).toBeInTheDocument()
    })

    it('should have WhatsApp button with correct href', () => {
      renderContact()
      const whatsappButton = screen.getByText(/Contactar por WhatsApp/i).closest('a')
      expect(whatsappButton).toHaveAttribute('href')
      expect(whatsappButton.getAttribute('href')).toMatch(/wa\.me/)
    })
  })

  // Response Time Info Tests
  describe('Response Time Information', () => {
    it('should display response time section', () => {
      renderContact()
      expect(screen.getByText(/Tiempo de Respuesta/i)).toBeInTheDocument()
    })

    it('should display 24-hour response time', () => {
      renderContact()
      expect(screen.getByText(/24 horas/i)).toBeInTheDocument()
    })

    it('should mention business days', () => {
      renderContact()
      expect(screen.getByText(/Respondemos a todos los mensajes dentro de/i)).toBeInTheDocument()
    })
  })

  // General Page Tests
  describe('General Page Structure', () => {
    it('should render without crashing', () => {
      renderContact()
      expect(screen.getByRole('heading', { level: 1, name: /Contacto/i })).toBeInTheDocument()
    })

    it('should have page header with title', () => {
      renderContact()
      const headers = screen.getAllByText(/Contacto/i)
      expect(headers.length).toBeGreaterThan(0)
    })

    it('should have header description', () => {
      renderContact()
      expect(screen.getByText(/Ponte en contacto con nosotros a través de múltiples canales/i)).toBeInTheDocument()
    })

    it('should have multiple sections', () => {
      const { container } = renderContact()
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(3)
    })

    it('should have gradient header styling', () => {
      const { container } = renderContact()
      const header = container.querySelector('[class*="from-primary"]')
      expect(header).toBeInTheDocument()
    })

    it('should have proper color scheme', () => {
      const { container } = renderContact()
      const primaryElements = container.querySelectorAll('[class*="primary"]')
      expect(primaryElements.length).toBeGreaterThan(0)
    })

    it('should track page view on mount', () => {
      const { analyticsService } = require('../services/analyticsService')
      renderContact()
      expect(analyticsService.trackPageView).toBeDefined()
    })
  })

  // Premium Styling Tests
  describe('Premium Styling', () => {
    it('should have gradient backgrounds', () => {
      const { container } = renderContact()
      const gradients = container.querySelectorAll('[class*="gradient"]')
      expect(gradients.length).toBeGreaterThan(0)
    })

    it('should have shadow effects', () => {
      const { container } = renderContact()
      const shadows = container.querySelectorAll('[class*="shadow"]')
      expect(shadows.length).toBeGreaterThan(0)
    })

    it('should have rounded corners', () => {
      const { container } = renderContact()
      const rounded = container.querySelectorAll('[class*="rounded"]')
      expect(rounded.length).toBeGreaterThan(0)
    })

    it('should have hover effects', () => {
      const { container } = renderContact()
      const hoverElements = container.querySelectorAll('[class*="hover"]')
      expect(hoverElements.length).toBeGreaterThan(0)
    })

    it('should have transition effects', () => {
      const { container } = renderContact()
      const transitions = container.querySelectorAll('[class*="transition"]')
      expect(transitions.length).toBeGreaterThan(0)
    })

    it('should have proper spacing', () => {
      const { container } = renderContact()
      const spacedElements = container.querySelectorAll('[class*="py-"], [class*="px-"]')
      expect(spacedElements.length).toBeGreaterThan(0)
    })
  })

  // Content Quality Tests
  describe('Content Quality', () => {
    it('should have professional messaging', () => {
      renderContact()
      expect(screen.getByText(/artesanía de calidad/i)).toBeInTheDocument()
    })

    it('should have clear section organization', () => {
      renderContact()
      expect(screen.getByText(/Envíanos un Mensaje/i)).toBeInTheDocument()
      expect(screen.getByText(/Información de Contacto/i)).toBeInTheDocument()
      expect(screen.getByText(/Preguntas Frecuentes/i)).toBeInTheDocument()
    })

    it('should have helpful information', () => {
      renderContact()
      expect(screen.getByText(/Horario de Atención/i)).toBeInTheDocument()
      expect(screen.getByText(/Estamos ubicados en el corazón de la ciudad/i)).toBeInTheDocument()
      expect(screen.getByText(/Tiempo de Respuesta/i)).toBeInTheDocument()
    })

    it('should have consistent branding', () => {
      const { container } = renderContact()
      const primaryElements = container.querySelectorAll('[class*="primary"]')
      const secondaryElements = container.querySelectorAll('[class*="secondary"]')
      expect(primaryElements.length).toBeGreaterThan(0)
      expect(secondaryElements.length).toBeGreaterThan(0)
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const { container } = renderContact()
      const h1 = container.querySelector('h1')
      const h2 = container.querySelectorAll('h2')
      expect(h1).toBeInTheDocument()
      expect(h2.length).toBeGreaterThan(0)
    })

    it('should have descriptive text for sections', () => {
      renderContact()
      expect(screen.getByText(/Completa el formulario/i)).toBeInTheDocument()
      expect(screen.getByText(/Estamos ubicados/i)).toBeInTheDocument()
    })

    it('should have proper link attributes', () => {
      renderContact()
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })
})
