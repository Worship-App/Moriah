import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ServerError from './ServerError'

// Mock analyticsService
vi.mock('../services/analyticsService', () => ({
  analyticsService: {
    trackPageView: vi.fn(),
  },
}))

describe('ServerError Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render 500 error page', () => {
      render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      expect(screen.getByText('500')).toBeInTheDocument()
    })

    it('should display server error title', () => {
      render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      expect(screen.getByText('Error del Servidor')).toBeInTheDocument()
    })

    it('should display error message', () => {
      render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      expect(screen.getByText(/algo salió mal en nuestro servidor/i)).toBeInTheDocument()
    })

    it('should display return home button', () => {
      render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have proper layout classes', () => {
      const { container } = render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      const wrapper = container.querySelector('.min-h-screen')
      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('items-center')
      expect(wrapper).toHaveClass('justify-center')
    })

    it('should have premium styling', () => {
      const { container } = render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      const heading = screen.getByText('500')
      expect(heading).toHaveClass('text-primary')
      expect(heading).toHaveClass('font-bold')
    })
  })

  describe('Navigation', () => {
    it('should have link to home page', () => {
      render(
        <BrowserRouter>
          <ServerError />
        </BrowserRouter>
      )
      const link = screen.getByRole('link', { name: /volver al inicio/i })
      expect(link).toHaveAttribute('href', '/')
    })
  })
})
