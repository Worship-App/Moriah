import { describe, it, expect, beforeEach } from 'vitest'
import { useProductStore } from './productStore'

describe('Product Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useProductStore.setState({
      products: [],
      loading: false,
      error: null,
    })
  })

  describe('fetchProducts()', () => {
    it('should fetch and set products', async () => {
      const store = useProductStore.getState()
      await store.fetchProducts()

      const state = useProductStore.getState()
      expect(state.products).toHaveLength(4)
      expect(state.loading).toBe(false)
      expect(state.error).toBeNull()
    })

    it('should set loading state during fetch', async () => {
      const store = useProductStore.getState()
      const fetchPromise = store.fetchProducts()

      // Check loading state
      let state = useProductStore.getState()
      expect(state.loading).toBe(true)

      await fetchPromise
      state = useProductStore.getState()
      expect(state.loading).toBe(false)
    })
  })

  describe('getProductById()', () => {
    beforeEach(async () => {
      const store = useProductStore.getState()
      await store.fetchProducts()
    })

    it('should return product by ID', () => {
      const store = useProductStore.getState()
      const product = store.getProductById('1')
      expect(product).toBeDefined()
      expect(product.id).toBe('1')
    })

    it('should return undefined for non-existent ID', () => {
      const store = useProductStore.getState()
      const product = store.getProductById('999')
      expect(product).toBeUndefined()
    })
  })

  describe('getFeaturedProducts()', () => {
    beforeEach(async () => {
      const store = useProductStore.getState()
      await store.fetchProducts()
    })

    it('should return only featured products', () => {
      const store = useProductStore.getState()
      const featured = store.getFeaturedProducts()
      featured.forEach(product => {
        expect(product.featured).toBe(true)
      })
    })

    it('should return at least one featured product', () => {
      const store = useProductStore.getState()
      const featured = store.getFeaturedProducts()
      expect(featured.length).toBeGreaterThan(0)
    })
  })

  describe('searchProducts()', () => {
    beforeEach(async () => {
      const store = useProductStore.getState()
      await store.fetchProducts()
    })

    it('should search and set filtered products', async () => {
      const store = useProductStore.getState()
      await store.searchProducts('Dorada')

      const state = useProductStore.getState()
      expect(state.products.length).toBeGreaterThan(0)
      state.products.forEach(product => {
        const matchesName = product.name.toLowerCase().includes('dorada')
        const matchesDescription = product.description.toLowerCase().includes('dorada')
        expect(matchesName || matchesDescription).toBe(true)
      })
    })
  })

  describe('filterProducts()', () => {
    beforeEach(async () => {
      const store = useProductStore.getState()
      await store.fetchProducts()
    })

    it('should filter by type', async () => {
      const store = useProductStore.getState()
      await store.filterProducts({ type: 'pulsera' })

      const state = useProductStore.getState()
      state.products.forEach(product => {
        expect(product.type).toBe('pulsera')
      })
    })

    it('should filter by price range', async () => {
      const store = useProductStore.getState()
      await store.filterProducts({ minPrice: 60000, maxPrice: 100000 })

      const state = useProductStore.getState()
      state.products.forEach(product => {
        expect(product.price).toBeGreaterThanOrEqual(60000)
        expect(product.price).toBeLessThanOrEqual(100000)
      })
    })
  })

  describe('clearError()', () => {
    it('should clear error state', () => {
      useProductStore.setState({ error: 'Test error' })
      const store = useProductStore.getState()
      store.clearError()

      const state = useProductStore.getState()
      expect(state.error).toBeNull()
    })
  })
})
