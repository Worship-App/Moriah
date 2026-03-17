import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactChannels from './ContactChannels'

const defaultProps = {
  businessEmail: 'contacto@manillas.com',
  businessWhatsapp: '+573001234567',
  instagramUrl: 'https://instagram.com/manillas',
  facebookUrl: 'https://facebook.com/manillas',
  tiktokUrl: 'https://tiktok.com/@manillas',
  linkedinUrl: 'https://linkedin.com/company/manillas',
}

describe('ContactChannels Component', () => {
  describe('WhatsApp Button (Subtask 4.5.1)', () => {
    it('renders WhatsApp button with correct href format', () => {
      render(<ContactChannels {...defaultProps} />)
      const whatsappButton = screen.getByTestId('whatsapp-button')
      
      expect(whatsappButton).toBeInTheDocument()
      expect(whatsappButton.href).toMatch(/^https:\/\/wa\.me\/\d+$/)
    })

    it('formats WhatsApp number correctly by removing non-digits', () => {
      render(<ContactChannels {...defaultProps} />)
      const whatsappButton = screen.getByTestId('whatsapp-button')
      
      const match = whatsappButton.href.match(/wa\.me\/(\d+)/)
      expect(match).toBeTruthy()
      expect(match[1]).toBe('573001234567')
    })

    it('opens WhatsApp link in new tab with security attributes', () => {
      render(<ContactChannels {...defaultProps} />)
      const whatsappButton = screen.getByTestId('whatsapp-button')
      
      expect(whatsappButton).toHaveAttribute('target', '_blank')
      expect(whatsappButton).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('displays WhatsApp number in button text', () => {
      render(<ContactChannels {...defaultProps} />)
      const whatsappButton = screen.getByTestId('whatsapp-button')
      
      expect(whatsappButton.textContent).toContain('+573001234567')
    })

    it('validates WhatsApp number format (10-15 digits)', () => {
      render(<ContactChannels {...defaultProps} />)
      const whatsappButton = screen.getByTestId('whatsapp-button')
      
      const match = whatsappButton.href.match(/wa\.me\/(\d+)/)
      const digits = match[1]
      
      expect(digits.length).toBeGreaterThanOrEqual(10)
      expect(digits.length).toBeLessThanOrEqual(15)
    })
  })

  describe('Email Button (Subtask 4.5.2)', () => {
    it('renders email button with correct mailto format', () => {
      render(<ContactChannels {...defaultProps} />)
      const emailButton = screen.getByTestId('email-button')
      
      expect(emailButton).toBeInTheDocument()
      expect(emailButton.href).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/)
    })

    it('email link contains correct business email', () => {
      render(<ContactChannels {...defaultProps} />)
      const emailButton = screen.getByTestId('email-button')
      
      expect(emailButton.href).toBe('mailto:contacto@manillas.com')
    })

    it('displays email address in button text', () => {
      render(<ContactChannels {...defaultProps} />)
      const emailButton = screen.getByTestId('email-button')
      
      expect(emailButton.textContent).toContain('contacto@manillas.com')
    })

    it('email link does not open in new tab (mailto behavior)', () => {
      render(<ContactChannels {...defaultProps} />)
      const emailButton = screen.getByTestId('email-button')
      
      expect(emailButton).not.toHaveAttribute('target', '_blank')
    })

    it('validates email format with regex', () => {
      render(<ContactChannels {...defaultProps} />)
      const emailButton = screen.getByTestId('email-button')
      
      const emailRegex = /^mailto:([^\s@]+@[^\s@]+\.[^\s@]+)$/
      const match = emailButton.href.match(emailRegex)
      
      expect(match).toBeTruthy()
      expect(match[1]).toBe('contacto@manillas.com')
    })
  })

  describe('Social Media Links (Subtask 4.5.3)', () => {
    it('renders Instagram link with correct URL format', () => {
      render(<ContactChannels {...defaultProps} />)
      const instagramButton = screen.getByTestId('instagram-button')
      
      expect(instagramButton).toBeInTheDocument()
      expect(instagramButton.href).toBe('https://instagram.com/manillas')
    })

    it('renders Facebook link with correct URL format', () => {
      render(<ContactChannels {...defaultProps} />)
      const facebookButton = screen.getByTestId('facebook-button')
      
      expect(facebookButton).toBeInTheDocument()
      expect(facebookButton.href).toBe('https://facebook.com/manillas')
    })

    it('renders TikTok link with correct URL format', () => {
      render(<ContactChannels {...defaultProps} />)
      const tiktokButton = screen.getByTestId('tiktok-button')
      
      expect(tiktokButton).toBeInTheDocument()
      expect(tiktokButton.href).toBe('https://tiktok.com/@manillas')
    })

    it('renders LinkedIn link with correct URL format', () => {
      render(<ContactChannels {...defaultProps} />)
      const linkedinButton = screen.getByTestId('linkedin-button')
      
      expect(linkedinButton).toBeInTheDocument()
      expect(linkedinButton.href).toBe('https://linkedin.com/company/manillas')
    })

    it('all social media links open in new tab with security attributes', () => {
      render(<ContactChannels {...defaultProps} />)
      const socialButtons = [
        screen.getByTestId('instagram-button'),
        screen.getByTestId('facebook-button'),
        screen.getByTestId('tiktok-button'),
        screen.getByTestId('linkedin-button'),
      ]
      
      socialButtons.forEach((button) => {
        expect(button).toHaveAttribute('target', '_blank')
        expect(button).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('validates all social media URLs are valid URLs', () => {
      render(<ContactChannels {...defaultProps} />)
      const socialButtons = [
        screen.getByTestId('instagram-button'),
        screen.getByTestId('facebook-button'),
        screen.getByTestId('tiktok-button'),
        screen.getByTestId('linkedin-button'),
      ]
      
      socialButtons.forEach((button) => {
        expect(() => new URL(button.href)).not.toThrow()
      })
    })
  })

  describe('Link Format Validation (Subtask 4.5.4)', () => {
    it('all links have correct format', () => {
      render(<ContactChannels {...defaultProps} />)
      
      const whatsappButton = screen.getByTestId('whatsapp-button')
      const emailButton = screen.getByTestId('email-button')
      const instagramButton = screen.getByTestId('instagram-button')
      const facebookButton = screen.getByTestId('facebook-button')
      const tiktokButton = screen.getByTestId('tiktok-button')
      const linkedinButton = screen.getByTestId('linkedin-button')
      
      expect(whatsappButton.href).toMatch(/^https:\/\/wa\.me\/\d+$/)
      expect(emailButton.href).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/)
      expect(instagramButton.href).toMatch(/^https:\/\//)
      expect(facebookButton.href).toMatch(/^https:\/\//)
      expect(tiktokButton.href).toMatch(/^https:\/\//)
      expect(linkedinButton.href).toMatch(/^https:\/\//)
    })

    it('WhatsApp link uses international format', () => {
      render(<ContactChannels {...defaultProps} />)
      const whatsappButton = screen.getByTestId('whatsapp-button')
      
      const match = whatsappButton.href.match(/wa\.me\/(\d+)/)
      expect(match[1]).toMatch(/^\d+$/)
    })

    it('email link is properly encoded', () => {
      render(<ContactChannels {...defaultProps} />)
      const emailButton = screen.getByTestId('email-button')
      
      expect(emailButton.href).not.toContain('%')
    })

    it('social media links use HTTPS protocol', () => {
      render(<ContactChannels {...defaultProps} />)
      const socialButtons = [
        screen.getByTestId('instagram-button'),
        screen.getByTestId('facebook-button'),
        screen.getByTestId('tiktok-button'),
        screen.getByTestId('linkedin-button'),
      ]
      
      socialButtons.forEach((button) => {
        expect(button.href).toMatch(/^https:\/\//)
      })
    })

    it('all links have proper security attributes', () => {
      render(<ContactChannels {...defaultProps} />)
      
      const whatsappButton = screen.getByTestId('whatsapp-button')
      const instagramButton = screen.getByTestId('instagram-button')
      const facebookButton = screen.getByTestId('facebook-button')
      const tiktokButton = screen.getByTestId('tiktok-button')
      const linkedinButton = screen.getByTestId('linkedin-button')
      
      const externalLinks = [
        whatsappButton,
        instagramButton,
        facebookButton,
        tiktokButton,
        linkedinButton,
      ]
      
      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Accessibility and Responsiveness', () => {
    it('renders all contact channels', () => {
      render(<ContactChannels {...defaultProps} />)
      
      expect(screen.getByTestId('whatsapp-button')).toBeInTheDocument()
      expect(screen.getByTestId('email-button')).toBeInTheDocument()
      expect(screen.getByTestId('instagram-button')).toBeInTheDocument()
      expect(screen.getByTestId('facebook-button')).toBeInTheDocument()
      expect(screen.getByTestId('tiktok-button')).toBeInTheDocument()
      expect(screen.getByTestId('linkedin-button')).toBeInTheDocument()
    })

    it('buttons have descriptive titles for accessibility', () => {
      render(<ContactChannels {...defaultProps} />)
      
      expect(screen.getByTestId('instagram-button')).toHaveAttribute('title', 'Instagram')
      expect(screen.getByTestId('facebook-button')).toHaveAttribute('title', 'Facebook')
      expect(screen.getByTestId('tiktok-button')).toHaveAttribute('title', 'TikTok')
      expect(screen.getByTestId('linkedin-button')).toHaveAttribute('title', 'LinkedIn')
    })

    it('component has responsive grid layout', () => {
      const { container } = render(<ContactChannels {...defaultProps} />)
      
      const socialGrid = container.querySelector('.grid')
      expect(socialGrid).toHaveClass('grid-cols-2', 'sm:grid-cols-4')
    })
  })
})
