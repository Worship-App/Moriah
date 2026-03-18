import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import config from '../../config/env'

// Mock the config module
vi.mock('../../config/env', () => ({
  default: {
    businessEmail: 'test@manillas.com',
    businessWhatsapp: '+573001234567',
    instagramUrl: 'https://instagram.com/moriah',
    facebookUrl: 'https://facebook.com/moriah',
    tiktokUrl: 'https://tiktok.com/@moriah',
    linkedinUrl: 'https://linkedin.com/company/moriah',
  },
}))

describe('Footer Component', () => {
  describe('Requirement 11.1: Footer contains required information', () => {
    it('should display contact information', () => {
      render(<Footer />)
      
      // Check email is displayed
      expect(screen.getByText(config.businessEmail)).toBeInTheDocument()
      
      // Check WhatsApp is displayed (text is split across elements)
      expect(screen.getByText(/WhatsApp:/)).toBeInTheDocument()
      expect(screen.getByText((content, element) => {
        return element?.textContent === `WhatsApp: ${config.businessWhatsapp}`
      })).toBeInTheDocument()
    })

    it('should display social media links', () => {
      render(<Footer />)
      
      // Check all social media links are present
      const instagramLink = screen.getByLabelText('Instagram')
      const facebookLink = screen.getByLabelText('Facebook')
      const tiktokLink = screen.getByLabelText('TikTok')
      const linkedinLink = screen.getByLabelText('LinkedIn')
      
      expect(instagramLink).toBeInTheDocument()
      expect(facebookLink).toBeInTheDocument()
      expect(tiktokLink).toBeInTheDocument()
      expect(linkedinLink).toBeInTheDocument()
    })

    it('should display copyright information', () => {
      render(<Footer />)
      
      const currentYear = new Date().getFullYear()
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
      expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument()
    })
  })

  describe('Requirement 11.3: Footer links execute correct actions', () => {
    it('should have correct email link format', () => {
      render(<Footer />)
      
      const emailLink = screen.getByText(config.businessEmail).closest('a')
      expect(emailLink).toHaveAttribute('href', `mailto:${config.businessEmail}`)
    })

    it('should have correct WhatsApp link format', () => {
      render(<Footer />)
      
      const whatsappLink = screen.getByText(/WhatsApp:/).closest('a')
      const expectedHref = `https://wa.me/${config.businessWhatsapp.replace(/\D/g, '')}`
      expect(whatsappLink).toHaveAttribute('href', expectedHref)
    })

    it('should have correct social media link formats', () => {
      render(<Footer />)
      
      const instagramLink = screen.getByLabelText('Instagram')
      const facebookLink = screen.getByLabelText('Facebook')
      const tiktokLink = screen.getByLabelText('TikTok')
      const linkedinLink = screen.getByLabelText('LinkedIn')
      
      expect(instagramLink).toHaveAttribute('href', config.instagramUrl)
      expect(facebookLink).toHaveAttribute('href', config.facebookUrl)
      expect(tiktokLink).toHaveAttribute('href', config.tiktokUrl)
      expect(linkedinLink).toHaveAttribute('href', config.linkedinUrl)
    })

    it('should open social media links in new tab', () => {
      render(<Footer />)
      
      const instagramLink = screen.getByLabelText('Instagram')
      const facebookLink = screen.getByLabelText('Facebook')
      const tiktokLink = screen.getByLabelText('TikTok')
      const linkedinLink = screen.getByLabelText('LinkedIn')
      
      expect(instagramLink).toHaveAttribute('target', '_blank')
      expect(facebookLink).toHaveAttribute('target', '_blank')
      expect(tiktokLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      
      // Check security attributes
      expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(tiktokLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Requirement 11.4: Footer is responsive', () => {
    it('should render with responsive classes', () => {
      const { container } = render(<Footer />)
      
      // Check for responsive grid classes
      const gridElement = container.querySelector('.grid')
      expect(gridElement).toHaveClass('grid-cols-1')
      expect(gridElement).toHaveClass('md:grid-cols-3')
    })

    it('should have responsive padding', () => {
      const { container } = render(<Footer />)
      
      const mainContent = container.querySelector('.max-w-7xl')
      expect(mainContent).toHaveClass('px-4')
      expect(mainContent).toHaveClass('sm:px-6')
      expect(mainContent).toHaveClass('lg:px-8')
    })
  })

  describe('Brand and Navigation', () => {
    it('should display brand name', () => {
      render(<Footer />)
      
      const moriahs = screen.getAllByText('Moriah')
      expect(moriahs.length).toBeGreaterThan(0)
      expect(screen.getByText('✨ Premium Collection')).toBeInTheDocument()
    })

    it('should display quick navigation links', () => {
      render(<Footer />)
      
      expect(screen.getByText('Inicio')).toBeInTheDocument()
      expect(screen.getByText('Catálogo')).toBeInTheDocument()
      expect(screen.getByText('Sobre Nosotros')).toBeInTheDocument()
      // Use getAllByText for "Contacto" since it appears multiple times
      const contactoElements = screen.getAllByText(/Contacto/)
      expect(contactoElements.length).toBeGreaterThan(0)
    })

    it('should have correct navigation link hrefs', () => {
      render(<Footer />)
      
      const inicioLink = screen.getByText('Inicio').closest('a')
      const catalogoLink = screen.getByText('Catálogo').closest('a')
      const aboutLink = screen.getByText('Sobre Nosotros').closest('a')
      
      // Find the navigation link for Contacto (not the heading)
      const allLinks = screen.getAllByRole('link')
      const contactLink = allLinks.find(link => link.getAttribute('href') === '/contact')
      
      expect(inicioLink).toHaveAttribute('href', '/')
      expect(catalogoLink).toHaveAttribute('href', '/catalog')
      expect(aboutLink).toHaveAttribute('href', '/about')
      expect(contactLink).toHaveAttribute('href', '/contact')
    })
  })

  describe('Premium Design Elements', () => {
    it('should have premium styling classes', () => {
      const { container } = render(<Footer />)
      
      const footer = container.querySelector('footer')
      expect(footer).toHaveClass('bg-gradient-to-br')
      expect(footer).toHaveClass('from-gray-900')
    })

    it('should display brand description', () => {
      render(<Footer />)
      
      expect(screen.getByText(/Artesanía de calidad premium/i)).toBeInTheDocument()
    })
  })

  describe('Additional Links', () => {
    it('should display privacy policy and terms links', () => {
      render(<Footer />)
      
      expect(screen.getByText('Política de Privacidad')).toBeInTheDocument()
      expect(screen.getByText('Términos de Servicio')).toBeInTheDocument()
    })
  })
})
