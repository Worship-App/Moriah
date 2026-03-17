/**
 * Application Constants
 */

export const PRODUCT_TYPES = [
  { value: 'pulsera', label: 'Pulsera' },
  { value: 'brazalete', label: 'Brazalete' },
  { value: 'anillo', label: 'Anillo' },
  { value: 'collar', label: 'Collar' },
]

export const COLORS = [
  { value: 'dorado', label: 'Dorado' },
  { value: 'plateado', label: 'Plateado' },
  { value: 'cobre', label: 'Cobre' },
  { value: 'negro', label: 'Negro' },
  { value: 'blanco', label: 'Blanco' },
]

export const MATERIALS = [
  { value: 'oro', label: 'Oro' },
  { value: 'plata', label: 'Plata' },
  { value: 'acero_inoxidable', label: 'Acero Inoxidable' },
  { value: 'cobre', label: 'Cobre' },
  { value: 'bronce', label: 'Bronce' },
]

export const PRICE_RANGES = [
  { value: { min: 0, max: 50000 }, label: 'Menos de $50.000' },
  { value: { min: 50000, max: 100000 }, label: '$50.000 - $100.000' },
  { value: { min: 100000, max: 200000 }, label: '$100.000 - $200.000' },
  { value: { min: 200000, max: 1000000 }, label: 'Más de $200.000' },
]

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
}

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCTS_BY_ID: '/products/:id',
  CONTACT: '/contact',
}
