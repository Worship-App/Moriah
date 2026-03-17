import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading Component', () => {
  describe('Rendering', () => {
    it('should render loading component', () => {
      const { container } = render(<Loading />)
      expect(container.querySelector('.flex')).toBeInTheDocument()
    })

    it('should render default message', () => {
      render(<Loading />)
      expect(screen.getByText('Cargando...')).toBeInTheDocument()
    })

    it('should render custom message', () => {
      render(<Loading message="Por favor espera..." />)
      expect(screen.getByText('Por favor espera...')).toBeInTheDocument()
    })

    it('should render spinner', () => {
      const { container } = render(<Loading />)
      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have centered layout', () => {
      const { container } = render(<Loading />)
      const wrapper = container.querySelector('.flex')
      expect(wrapper).toHaveClass('flex-col')
      expect(wrapper).toHaveClass('items-center')
      expect(wrapper).toHaveClass('justify-center')
    })

    it('should have premium spinner styling', () => {
      const { container } = render(<Loading />)
      const spinnerContainer = container.querySelector('.relative')
      expect(spinnerContainer).toHaveClass('w-12')
      expect(spinnerContainer).toHaveClass('h-12')
    })

    it('should have proper message styling', () => {
      render(<Loading message="Loading..." />)
      const message = screen.getByText('Loading...')
      expect(message).toHaveClass('text-secondary-700')
      expect(message).toHaveClass('font-medium')
    })
  })

  describe('Full Screen Mode', () => {
    it('should render in normal mode by default', () => {
      const { container } = render(<Loading />)
      const wrapper = container.querySelector('.flex')
      expect(wrapper).toHaveClass('py-12')
      expect(wrapper).not.toHaveClass('fixed')
    })

    it('should render in full screen mode when fullScreen is true', () => {
      const { container } = render(<Loading fullScreen={true} />)
      const wrapper = container.querySelector('.flex')
      expect(wrapper).toHaveClass('fixed')
      expect(wrapper).toHaveClass('inset-0')
      expect(wrapper).toHaveClass('z-50')
    })

    it('should have backdrop in full screen mode', () => {
      const { container } = render(<Loading fullScreen={true} />)
      const wrapper = container.querySelector('.flex')
      expect(wrapper).toHaveClass('bg-white')
      expect(wrapper).toHaveClass('bg-opacity-90')
    })
  })

  describe('Message Handling', () => {
    it('should not render message when message prop is empty string', () => {
      const { container } = render(<Loading message="" />)
      const message = container.querySelector('p')
      expect(message).not.toBeInTheDocument()
    })

    it('should render message when provided', () => {
      render(<Loading message="Cargando datos..." />)
      expect(screen.getByText('Cargando datos...')).toBeInTheDocument()
    })

    it('should handle long messages', () => {
      const longMessage = 'Este es un mensaje muy largo que describe el proceso de carga en detalle'
      render(<Loading message={longMessage} />)
      expect(screen.getByText(longMessage)).toBeInTheDocument()
    })
  })

  describe('Animation', () => {
    it('should have spinning animation', () => {
      const { container } = render(<Loading />)
      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toHaveClass('animate-spin')
    })

    it('should have premium spinner border styling', () => {
      const { container } = render(<Loading />)
      const spinnerBorder = container.querySelector('.border-transparent')
      expect(spinnerBorder).toHaveClass('border-4')
      expect(spinnerBorder).toHaveClass('border-transparent')
    })
  })
})
