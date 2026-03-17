/**
 * Contact Service Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { contactService } from './contactService'

describe('contactService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('sendContactMessage', () => {
    it('should send a valid contact message successfully', async () => {
      const mockResponse = {
        success: true,
        id: '123',
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      const result = await contactService.sendContactMessage(data)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Mensaje enviado correctamente')
      expect(global.fetch).toHaveBeenCalledOnce()
    })

    it('should trim whitespace from input data', async () => {
      const mockResponse = {
        success: true,
        id: '123',
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const data = {
        name: '  John Doe  ',
        email: 'john@example.com',
        subject: '  Test Subject  ',
        message: '  This is a test message  ',
      }

      await contactService.sendContactMessage(data)

      const callArgs = global.fetch.mock.calls[0]
      const body = JSON.parse(callArgs[1].body)

      expect(body.name).toBe('John Doe')
      expect(body.email).toBe('john@example.com')
      expect(body.subject).toBe('Test Subject')
      expect(body.message).toBe('This is a test message')
    })

    it('should reject message with empty name', async () => {
      const data = {
        name: '',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
    })

    it('should reject message with empty email', async () => {
      const data = {
        name: 'John Doe',
        email: '',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
    })

    it('should reject message with invalid email format', async () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
    })

    it('should reject message with empty subject', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: 'This is a test message',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
    })

    it('should reject message with empty message', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: '',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
    })

    it('should retry on network failure', async () => {
      const mockResponse = {
        success: true,
        id: '123',
      }

      // First two calls fail, third succeeds
      global.fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        })

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      const result = await contactService.sendContactMessage(data)

      expect(result.success).toBe(true)
      expect(global.fetch).toHaveBeenCalledTimes(3)
    })

    it('should fail after max retries exceeded', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'))

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
      expect(global.fetch).toHaveBeenCalledTimes(3)
    })

    it('should handle HTTP error responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      await expect(contactService.sendContactMessage(data)).rejects.toThrow()
    })

    it('should include validation errors in thrown error', async () => {
      const data = {
        name: '',
        email: 'invalid',
        subject: '',
        message: '',
      }

      try {
        await contactService.sendContactMessage(data)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error.validationErrors).toBeDefined()
        expect(error.validationErrors.length).toBeGreaterThan(0)
      }
    })

    it('should accept valid email formats', async () => {
      const mockResponse = {
        success: true,
        id: '123',
      }

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })

      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user123@test-domain.com',
      ]

      for (const email of validEmails) {
        global.fetch.mockClear()
        const data = {
          name: 'John Doe',
          email,
          subject: 'Test Subject',
          message: 'This is a test message',
        }

        const result = await contactService.sendContactMessage(data)
        expect(result.success).toBe(true)
      }
    })

    it('should reject invalid email formats', async () => {
      const invalidEmails = [
        'user@',
        '@example.com',
        'user@.com',
        'user name@example.com',
        'user@example',
      ]

      for (const email of invalidEmails) {
        const data = {
          name: 'John Doe',
          email,
          subject: 'Test Subject',
          message: 'This is a test message',
        }

        await expect(contactService.sendContactMessage(data)).rejects.toThrow()
      }
    })

    it('should use correct API endpoint', async () => {
      const mockResponse = {
        success: true,
        id: '123',
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      await contactService.sendContactMessage(data)

      const callArgs = global.fetch.mock.calls[0]
      expect(callArgs[0]).toContain('/contact')
      expect(callArgs[1].method).toBe('POST')
      expect(callArgs[1].headers['Content-Type']).toBe('application/json')
    })

    it('should handle retry with exponential backoff', async () => {
      const mockResponse = {
        success: true,
        id: '123',
      }

      global.fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        })

      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      }

      const startTime = Date.now()
      await contactService.sendContactMessage(data)
      const duration = Date.now() - startTime

      // Should have waited at least 1 second (initial retry delay)
      expect(duration).toBeGreaterThanOrEqual(1000)
    })
  })
})
