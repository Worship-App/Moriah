import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with children text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should render with default variant (primary)', () => {
      const { container } = render(<Button>Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-secondary-900')
    })

    it('should render with secondary variant', () => {
      const { container } = render(<Button variant="secondary">Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-primary-500')
    })

    it('should render with outline variant', () => {
      const { container } = render(<Button variant="outline">Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('border-2')
      expect(button).toHaveClass('border-secondary-900')
    })

    it('should render with ghost variant', () => {
      const { container } = render(<Button variant="ghost">Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('text-secondary-900')
    })
  })

  describe('Sizes', () => {
    it('should render with small size', () => {
      const { container } = render(<Button size="sm">Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('px-3')
      expect(button).toHaveClass('py-1.5')
      expect(button).toHaveClass('text-sm')
    })

    it('should render with medium size (default)', () => {
      const { container } = render(<Button>Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('px-4')
      expect(button).toHaveClass('py-2')
      expect(button).toHaveClass('text-base')
    })

    it('should render with large size', () => {
      const { container } = render(<Button size="lg">Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('px-6')
      expect(button).toHaveClass('py-3')
      expect(button).toHaveClass('text-lg')
    })
  })

  describe('Disabled State', () => {
    it('should render disabled button', () => {
      render(<Button disabled>Test</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should have disabled styles when disabled', () => {
      const { container } = render(<Button disabled>Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('opacity-60')
      expect(button).toHaveClass('cursor-not-allowed')
    })

    it('should not be clickable when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Test</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button')
      await user.click(button)
      expect(handleClick).toHaveBeenCalledOnce()
    })

    it('should support custom className', () => {
      const { container } = render(<Button className="custom-class">Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should support type prop', () => {
      const { container } = render(<Button type="submit">Submit</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('Accessibility', () => {
    it('should have focus ring on focus', () => {
      const { container } = render(<Button>Test</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus:ring-2')
      expect(button).toHaveClass('focus:outline-none')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Test</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
      
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
