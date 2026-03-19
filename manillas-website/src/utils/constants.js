/**
 * Application Constants
 */

export const PRODUCT_TYPES = [
  { value: 'pulsera', label: 'Pulsera', description: 'Pulseras delicadas y elegantes' },
  { value: 'brazalete', label: 'Brazalete', description: 'Brazaletes anchos y statement' },
  { value: 'anillo', label: 'Anillo', description: 'Anillos finos y modernos' },
  { value: 'collar', label: 'Collar', description: 'Collares elegantes y versátiles' },
]

export const COLORS = [
  { value: 'dorado', label: 'Dorado', hex: '#FFD700' },
  { value: 'plateado', label: 'Plateado', hex: '#C0C0C0' },
  { value: 'cobre', label: 'Cobre', hex: '#B87333' },
  { value: 'negro', label: 'Negro', hex: '#000000' },
  { value: 'blanco', label: 'Blanco', hex: '#FFFFFF' },
]

export const MATERIALS = [
  { value: 'oro', label: 'Oro', description: 'Oro de alta pureza' },
  { value: 'plata', label: 'Plata', description: 'Plata esterlina 925' },
  { value: 'acero_inoxidable', label: 'Acero Inoxidable', description: 'Acero quirúrgico 316L' },
  { value: 'cobre', label: 'Cobre', description: 'Cobre pulido' },
  { value: 'bronce', label: 'Bronce', description: 'Bronce antiguo' },
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
