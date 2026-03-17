import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal Component', () => {
  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <Modal isOpen={false} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      )
      expect(container.innerHTML).toBe('')
    })

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
          Content
        </Modal>
      )
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should render title', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="My Modal Title">
          Content
        </Modal>
      )
      expect(screen.getByText('My Modal Title')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          <div>Custom content here</div>
        </Modal>
      )
      expect(screen.getByText('Custom content here')).toBeInTheDocument()
    })

    it('should render close button', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      expect(screen.getByLabelText('Cerrar modal')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('should render with small size', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test" size="sm">
          Content
        </Modal>
      )
      const modal = container.querySelector('.max-w-sm')
      expect(modal).toBeInTheDocument()
    })

    it('should render with medium size (default)', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      const modal = container.querySelector('.max-w-md')
      expect(modal).toBeInTheDocument()
    })

    it('should render with large size', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test" size="lg">
          Content
        </Modal>
      )
      const modal = container.querySelector('.max-w-lg')
      expect(modal).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test">
          Content
        </Modal>
      )
      
      const closeButton = screen.getByLabelText('Cerrar modal')
      await user.click(closeButton)
      expect(handleClose).toHaveBeenCalledOnce()
    })

    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      const { container } = render(
        <Modal isOpen={true} onClose={handleClose} title="Test">
          Content
        </Modal>
      )
      
      const backdrop = container.querySelector('[aria-hidden="true"]')
      await user.click(backdrop)
      expect(handleClose).toHaveBeenCalledOnce()
    })

    it('should call onClose when Escape key is pressed', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      render(
        <Modal isOpen={true} onClose={handleClose} title="Test">
          Content
        </Modal>
      )
      
      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledOnce()
    })

    it('should not call onClose when Escape is pressed and modal is closed', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      render(
        <Modal isOpen={false} onClose={handleClose} title="Test">
          Content
        </Modal>
      )
      
      await user.keyboard('{Escape}')
      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('Actions', () => {
    it('should render action buttons when provided', () => {
      const actions = (
        <>
          <button>Cancel</button>
          <button>Confirm</button>
        </>
      )
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test" actions={actions}>
          Content
        </Modal>
      )
      
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('should not render action section when actions are not provided', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      
      const actionSection = container.querySelector('border-t')
      expect(actionSection).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      
      const backdrop = container.querySelector('[aria-hidden="true"]')
      expect(backdrop).toHaveAttribute('aria-hidden', 'true')
    })

    it('should have close button with proper label', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      
      const closeButton = screen.getByLabelText('Cerrar modal')
      expect(closeButton).toBeInTheDocument()
    })
  })

  describe('Body Overflow', () => {
    it('should hide body overflow when modal is open', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should restore body overflow when modal is closed', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      
      rerender(
        <Modal isOpen={false} onClose={vi.fn()} title="Test">
          Content
        </Modal>
      )
      
      expect(document.body.style.overflow).toBe('unset')
    })
  })
})
