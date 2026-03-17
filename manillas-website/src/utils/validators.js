/**
 * Validation Utilities
 */

export const validators = {
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Validate phone number
   */
  isValidPhone: (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  },

  /**
   * Validate URL
   */
  isValidUrl: (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * Validate required field
   */
  isRequired: (value) => {
    return value && value.trim().length > 0
  },

  /**
   * Validate minimum length
   */
  minLength: (value, length) => {
    return value && value.length >= length
  },

  /**
   * Validate maximum length
   */
  maxLength: (value, length) => {
    return value && value.length <= length
  },
}
