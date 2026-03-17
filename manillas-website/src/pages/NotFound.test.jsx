import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from './NotFound'

// Mock analyticsService
vi.mock('../services/analyticsService', () => ({
  analyticsService: {
    trackPageView: vi.fn(),
  },
}))

describe('NotFound Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render 404 error page', () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      expect(screen.getByText('404')).toBeInTheDocument()
    })

    it('should display page not found title', () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      expect(screen.getByText('Página No Encontrada')).toBeInTheDocument()
    })

    it('should display error message', () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      expect(screen.getByText(/la página que buscas no existe/i)).toBeInTheDocument()
    })

    it('should display return home button', () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have proper layout classes', () => {
      const { container } = render(
        <BrowserRouter>
          <NotFound />
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
          <NotFound />
        </BrowserRouter>
      )
      const heading = screen.getByText('404')
      expect(heading).toHaveClass('text-primary')
      expect(heading).toHaveClass('font-bold')
    })
  })

  describe('Navigation', () => {
    it('should have link to home page', () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      const link = screen.getByRole('link', { name: /volver al inicio/i })
      expect(link).toHaveAttribute('href', '/')
    })
  })
})
