/**
 * Formatting Utilities
 */

export const formatters = {
  /**
   * Format price with currency
   */
  formatPrice: (price, currency = 'COP') => {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    })
    return formatter.format(price)
  },

  /**
   * Format date
   */
  formatDate: (date, locale = 'es-CO') => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  },

  /**
   * Format date and time
   */
  formatDateTime: (date, locale = 'es-CO') => {
    return new Date(date).toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  },

  /**
   * Truncate text
   */
  truncateText: (text, length = 100) => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  },

  /**
   * Capitalize first letter
   */
  capitalize: (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  },

  /**
   * Convert to slug
   */
  toSlug: (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },
}
