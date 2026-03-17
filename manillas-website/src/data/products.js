/**
 * Mock Products Data
 * 4 premium handmade bracelets with complete information
 */

export const products = [
  {
    id: '1',
    name: 'Pulsera Dorada Premium',
    description: 'Pulsera artesanal con acabado dorado de alta calidad. Diseño elegante y minimalista que combina perfectamente con cualquier estilo. Hecha con materiales premium y acabado duradero.',
    price: 85000,
    currency: 'COP',
    type: 'pulsera',
    colors: ['dorado', 'plateado'],
    materials: ['oro', 'acero_inoxidable'],
    images: {
      thumbnail: '/images/product-1-thumb.jpg',
      main: '/images/product-1-main.jpg',
      gallery: ['/images/product-1-1.jpg', '/images/product-1-2.jpg', '/images/product-1-3.jpg'],
    },
    availability: {
      inStock: true,
      quantity: 8,
    },
    featured: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Brazalete Plata Artesanal',
    description: 'Brazalete artesanal en plata pura con detalles grabados a mano. Pieza única que refleja la maestría del artesano. Perfecto para ocasiones especiales o uso diario.',
    price: 95000,
    currency: 'COP',
    type: 'brazalete',
    colors: ['plateado', 'blanco'],
    materials: ['plata', 'acero_inoxidable'],
    images: {
      thumbnail: '/images/product-2-thumb.jpg',
      main: '/images/product-2-main.jpg',
      gallery: ['/images/product-2-1.jpg', '/images/product-2-2.jpg', '/images/product-2-3.jpg'],
    },
    availability: {
      inStock: true,
      quantity: 5,
    },
    featured: true,
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
  },
  {
    id: '3',
    name: 'Pulsera Cobre Vintage',
    description: 'Pulsera vintage en cobre con patina natural. Diseño retro que evoca elegancia clásica. Cada pieza es única debido al proceso artesanal de oxidación controlada.',
    price: 65000,
    currency: 'COP',
    type: 'pulsera',
    colors: ['cobre', 'bronce'],
    materials: ['cobre', 'bronce'],
    images: {
      thumbnail: '/images/product-3-thumb.jpg',
      main: '/images/product-3-main.jpg',
      gallery: ['/images/product-3-1.jpg', '/images/product-3-2.jpg', '/images/product-3-3.jpg'],
    },
    availability: {
      inStock: true,
      quantity: 12,
    },
    featured: false,
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
  },
  {
    id: '4',
    name: 'Brazalete Mixto Lujo',
    description: 'Brazalete de lujo que combina oro y plata en un diseño sofisticado. Incrustaciones de piedras semipreciosas. Obra maestra de la joyería artesanal contemporánea.',
    price: 125000,
    currency: 'COP',
    type: 'brazalete',
    colors: ['dorado', 'plateado'],
    materials: ['oro', 'plata'],
    images: {
      thumbnail: '/images/product-4-thumb.jpg',
      main: '/images/product-4-main.jpg',
      gallery: ['/images/product-4-1.jpg', '/images/product-4-2.jpg', '/images/product-4-3.jpg'],
    },
    availability: {
      inStock: false,
      quantity: 0,
    },
    featured: true,
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
]
