/**
 * Contact Service
 * Handles all contact-related API calls
 */

import config from '../config/env'

const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY = 1000 // 1 second

/**
 * Calculate exponential backoff delay
 */
const getRetryDelay = (attempt) => {
  return INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1)
}

/**
 * Validate contact message data
 */
const validateContactData = (data) => {
  const errors = []

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('El nombre es requerido')
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.push('El email es requerido')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('El email no es válido')
    }
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.push('El asunto es requerido')
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('El mensaje es requerido')
  }

  return errors
}

/**
 * Send request with retry logic
 */
const sendWithRetry = async (data, attempt = 1) => {
  try {
    const response = await fetch(`${config.apiUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      const delay = getRetryDelay(attempt)
      console.warn(`Intento ${attempt} falló. Reintentando en ${delay}ms...`, error)
      await new Promise(resolve => setTimeout(resolve, delay))
      return sendWithRetry(data, attempt + 1)
    }
    throw error
  }
}

export const contactService = {
  /**
   * Send contact form message with validation and retry logic
   * @param {Object} data - Contact form data {name, email, subject, message}
   * @returns {Promise<Object>} Response from server
   * @throws {Error} If validation fails or all retries are exhausted
   */
  async sendContactMessage(data) {
    try {
      // Validate input data
      const validationErrors = validateContactData(data)
      if (validationErrors.length > 0) {
        const error = new Error('Validation failed')
        error.validationErrors = validationErrors
        throw error
      }

      // Send with retry logic
      const response = await sendWithRetry({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      })

      return {
        success: true,
        message: 'Mensaje enviado correctamente',
        id: response.id || Date.now(),
      }
    } catch (error) {
      console.error('Error sending contact message:', error)
      throw error
    }
  },
}
