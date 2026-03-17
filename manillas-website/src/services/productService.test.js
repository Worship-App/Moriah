import { describe, it, expect } from 'vitest'
import { productService } from './productService'

describe('Product Service', () => {
  describe('getAll()', () => {
    it('should return exactly 4 products', async () => {
      const products = await productService.getAll()
      expect(products).toHaveLength(4)
    })

    it('should return products with all required fields', async () => {
      const products = await productService.getAll()
      const requiredFields = ['id', 'name', 'description', 'price', 'currency', 'type', 'colors', 'materials', 'images', 'availability', 'featured', 'createdAt', 'updatedAt']

      products.forEach(product => {
        requiredFields.forEach(field => {
          expect(product).toHaveProperty(field)
        })
      })
    })

    it('should return products with valid structure', async () => {
      const products = await productService.getAll()

      products.forEach(product => {
        expect(product.id).toBeDefined()
        expect(typeof product.name).toBe('string')
        expect(typeof product.description).toBe('string')
        expect(typeof product.price).toBe('number')
        expect(typeof product.currency).toBe('string')
        expect(typeof product.type).toBe('string')
        expect(Array.isArray(product.colors)).toBe(true)
        expect(Array.isArray(product.materials)).toBe(true)
        expect(product.images).toHaveProperty('thumbnail')
        expect(product.images).toHaveProperty('main')
        expect(product.images).toHaveProperty('gallery')
        expect(product.availability).toHaveProperty('inStock')
        expect(product.availability).toHaveProperty('quantity')
        expect(typeof product.featured).toBe('boolean')
      })
    })
  })

  describe('getById()', () => {
    it('should return a product by ID', async () => {
      const product = await productService.getById('1')
      expect(product).toBeDefined()
      expect(product.id).toBe('1')
    })

    it('should return undefined for non-existent ID', async () => {
      const product = await productService.getById('999')
      expect(product).toBeUndefined()
    })

    it('should return product with all required fields', async () => {
      const product = await productService.getById('1')
      const requiredFields = ['id', 'name', 'description', 'price', 'currency', 'type', 'colors', 'materials', 'images', 'availability', 'featured', 'createdAt', 'updatedAt']

      requiredFields.forEach(field => {
        expect(product).toHaveProperty(field)
      })
    })
  })

  describe('getFeaturedProducts()', () => {
    it('should return only featured products', async () => {
      const featured = await productService.getFeaturedProducts()
      featured.forEach(product => {
        expect(product.featured).toBe(true)
      })
    })

    it('should return at least one featured product', async () => {
      const featured = await productService.getFeaturedProducts()
      expect(featured.length).toBeGreaterThan(0)
    })
  })

  describe('searchProducts()', () => {
    it('should return products matching search query', async () => {
      const results = await productService.searchProducts('Dorada')
      expect(results.length).toBeGreaterThan(0)
      results.forEach(product => {
        const matchesName = product.name.toLowerCase().includes('dorada')
        const matchesDescription = product.description.toLowerCase().includes('dorada')
        expect(matchesName || matchesDescription).toBe(true)
      })
    })

    it('should return empty array for non-matching query', async () => {
      const results = await productService.searchProducts('xyz123nonexistent')
      expect(results).toHaveLength(0)
    })

    it('should be case-insensitive', async () => {
      const resultsLower = await productService.searchProducts('dorada')
      const resultsUpper = await productService.searchProducts('DORADA')
      expect(resultsLower).toHaveLength(resultsUpper.length)
    })
  })

  describe('filterProducts()', () => {
    it('should filter by type', async () => {
      const filtered = await productService.filterProducts({ type: 'pulsera' })
      filtered.forEach(product => {
        expect(product.type).toBe('pulsera')
      })
    })

    it('should filter by color', async () => {
      const filtered = await productService.filterProducts({ color: 'dorado' })
      filtered.forEach(product => {
        expect(product.colors).toContain('dorado')
      })
    })

    it('should filter by price range', async () => {
      const filtered = await productService.filterProducts({ minPrice: 60000, maxPrice: 100000 })
      filtered.forEach(product => {
        expect(product.price).toBeGreaterThanOrEqual(60000)
        expect(product.price).toBeLessThanOrEqual(100000)
      })
    })

    it('should filter by material', async () => {
      const filtered = await productService.filterProducts({ material: 'oro 18k' })
      filtered.forEach(product => {
        expect(product.materials).toContain('oro 18k')
      })
    })

    it('should filter by availability', async () => {
      const filtered = await productService.filterProducts({ inStock: true })
      filtered.forEach(product => {
        expect(product.availability.inStock).toBe(true)
      })
    })

    it('should combine multiple filters', async () => {
      const filtered = await productService.filterProducts({
        type: 'pulsera',
        minPrice: 60000,
        maxPrice: 100000,
      })
      filtered.forEach(product => {
        expect(product.type).toBe('pulsera')
        expect(product.price).toBeGreaterThanOrEqual(60000)
        expect(product.price).toBeLessThanOrEqual(100000)
      })
    })
  })
})
