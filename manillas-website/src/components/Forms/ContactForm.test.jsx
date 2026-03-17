import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'
import { useUIStore } from '../../store/uiStore'

// Mock the useUIStore
vi.mock('../../store/uiStore', () => ({
  useUIStore: vi.fn(),
}))

// Mock the contactService
vi.mock('../../services/contactService', () => ({
  contactService: {
    sendContactMessage: vi.fn().mockResolvedValue({ success: true }),
  },
}))

describe('ContactForm Component', () => {
  const mockShowNotification = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useUIStore.mockImplementation((selector) => {
      const store = {
        showNotification: mockShowNotification,
      }
      return selector(store)
    })
  })

  it('renders all form fields', () => {
    render(<ContactForm />)

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
  })

  it('renders submit and reset buttons', () => {
    render(<ContactForm />)

    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument()
  })

  it('shows required field indicator', () => {
    render(<ContactForm />)

    const requiredIndicators = screen.getAllByText('*')
    expect(requiredIndicators.length).toBeGreaterThan(0)
  })

  it('displays error message for empty name field', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    await user.click(nameInput)
    await user.type(nameInput, 'a')
    await user.clear(nameInput)
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument()
    })
  })

  it('displays error message for invalid email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i)
    await user.click(emailInput)
    await user.type(emailInput, 'invalid-email')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/por favor ingresa un email válido/i)).toBeInTheDocument()
    })
  })

  it('displays error message for short subject', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const subjectInput = screen.getByLabelText(/asunto/i)
    await user.click(subjectInput)
    await user.type(subjectInput, 'test')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/el asunto debe tener al menos 5 caracteres/i)).toBeInTheDocument()
    })
  })

  it('displays error message for short message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const messageInput = screen.getByLabelText(/mensaje/i)
    await user.click(messageInput)
    await user.type(messageInput, 'short')
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument()
    })
  })

  it('shows valid state indicator when field is valid', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    await user.click(nameInput)
    await user.type(nameInput, 'John Doe')
    await user.tab()

    await waitFor(() => {
      const checkmark = nameInput.parentElement.querySelector('svg')
      expect(checkmark).toBeInTheDocument()
    })
  })

  it('clears form when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const resetButton = screen.getByRole('button', { name: /limpiar/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')

    await user.click(resetButton)

    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
  })

  it('is responsive on mobile screens', () => {
    render(<ContactForm />)

    const form = screen.getByRole('button', { name: /enviar mensaje/i }).closest('form')
    expect(form).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
  })

  it('has proper accessibility attributes', () => {
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)

    expect(nameInput).toHaveAttribute('id', 'name')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(subjectInput).toHaveAttribute('id', 'subject')
    expect(messageInput).toHaveAttribute('id', 'message')
  })

  it('shows success confirmation message after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeInTheDocument()
      expect(screen.getByText(/Gracias por tu mensaje/i)).toBeInTheDocument()
    })
  })

  it('shows send another message button after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /enviar otro mensaje/i })).toBeInTheDocument()
    })
  })

  it('returns to form when send another message button is clicked', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeInTheDocument()
    })

    const sendAnotherButton = screen.getByRole('button', { name: /enviar otro mensaje/i })
    await user.click(sendAnotherButton)

    await waitFor(() => {
      expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
    })
  })

  it('shows error message when submission fails', async () => {
    const { contactService } = await import('../../services/contactService')
    vi.mocked(contactService.sendContactMessage).mockRejectedValueOnce(new Error('Network error'))

    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Error al enviar el mensaje/i)).toBeInTheDocument()
    })
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const nameInput = screen.getByLabelText(/nombre/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/asunto/i)
    const messageInput = screen.getByLabelText(/mensaje/i)
    const submitButton = screen.getByRole('button', { name: /enviar mensaje/i })

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'This is a test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeInTheDocument()
    })

    const sendAnotherButton = screen.getByRole('button', { name: /enviar otro mensaje/i })
    await user.click(sendAnotherButton)

    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(subjectInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })
})
