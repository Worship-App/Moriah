import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from './filterStore'
import { products } from '../data/products'

describe('Filter Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useFilterStore.getState()
    store.clearFilters()
  })

  describe('3.1.2 - Filtro por tipo de manilla', () => {
    it('Debe filtrar productos por tipo pulsera', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('type', 'pulsera')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.type === 'pulsera')).toBe(true)
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('Debe filtrar productos por tipo brazalete', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('type', 'brazalete')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.type === 'brazalete')).toBe(true)
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('Debe permitir múltiples tipos de filtro', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('type', 'pulsera')
      store.addFilterValue('type', 'brazalete')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.type === 'pulsera' || p.type === 'brazalete')).toBe(true)
    })
  })

  describe('3.1.3 - Filtro por color', () => {
    it('Debe filtrar productos por color dorado', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('color', 'dorado')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.colors.includes('dorado'))).toBe(true)
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('Debe filtrar productos por color plateado', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('color', 'plateado')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.colors.includes('plateado'))).toBe(true)
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('Debe permitir múltiples colores de filtro', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('color', 'dorado')
      store.addFilterValue('color', 'plateado')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        p.colors.includes('dorado') || p.colors.includes('plateado')
      )).toBe(true)
    })
  })

  describe('3.1.4 - Filtro por rango de precio', () => {
    it('Debe filtrar productos por rango de precio mínimo', () => {
      const store = useFilterStore.getState()
      store.setFilter('priceRange', { min: 80000, max: 1000000 })
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.price >= 80000)).toBe(true)
    })

    it('Debe filtrar productos por rango de precio máximo', () => {
      const store = useFilterStore.getState()
      store.setFilter('priceRange', { min: 0, max: 90000 })
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.price <= 90000)).toBe(true)
    })

    it('Debe filtrar productos por rango de precio completo', () => {
      const store = useFilterStore.getState()
      store.setFilter('priceRange', { min: 80000, max: 100000 })
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.price >= 80000 && p.price <= 100000)).toBe(true)
    })

    it('Debe retornar todos los productos con rango por defecto', () => {
      const store = useFilterStore.getState()
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.length).toBe(products.length)
    })
  })

  describe('3.1.5 - Filtro por materiales', () => {
    it('Debe filtrar productos por material oro', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('materials', 'oro')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.materials.includes('oro'))).toBe(true)
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('Debe filtrar productos por material plata', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('materials', 'plata')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => p.materials.includes('plata'))).toBe(true)
      expect(filtered.length).toBeGreaterThan(0)
    })

    it('Debe permitir múltiples materiales de filtro', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('materials', 'oro')
      store.addFilterValue('materials', 'plata')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        p.materials.includes('oro') || p.materials.includes('plata')
      )).toBe(true)
    })
  })

  describe('3.1.6 - Limpiar filtros', () => {
    it('Debe limpiar todos los filtros', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('type', 'pulsera')
      store.addFilterValue('color', 'dorado')
      store.addFilterValue('materials', 'oro')
      store.setSearchQuery('test')
      
      store.clearFilters()
      
      const state = store.filters
      expect(state.type).toEqual([])
      expect(state.color).toEqual([])
      expect(state.materials).toEqual([])
      expect(state.searchQuery).toBe('')
      expect(state.priceRange).toEqual({ min: 0, max: 1000000 })
    })

    it('Debe retornar todos los productos después de limpiar filtros', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('type', 'pulsera')
      store.clearFilters()
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.length).toBe(products.length)
    })
  })

  describe('Búsqueda por texto', () => {
    it('Debe buscar productos por nombre', () => {
      const store = useFilterStore.getState()
      store.setSearchQuery('dorada')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        p.name.toLowerCase().includes('dorada') || 
        p.description.toLowerCase().includes('dorada')
      )).toBe(true)
    })

    it('Debe buscar productos por descripción', () => {
      const store = useFilterStore.getState()
      store.setSearchQuery('artesanal')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        p.name.toLowerCase().includes('artesanal') || 
        p.description.toLowerCase().includes('artesanal')
      )).toBe(true)
    })

    it('Debe ser case-insensitive', () => {
      const store = useFilterStore.getState()
      store.setSearchQuery('PULSERA')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.length).toBeGreaterThan(0)
    })
  })

  describe('Filtros combinados', () => {
    it('Debe combinar filtro de tipo y color', () => {
      const store = useFilterStore.getState()
      store.addFilterValue('type', 'pulsera')
      store.addFilterValue('color', 'dorado')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        p.type === 'pulsera' && p.colors.includes('dorado')
      )).toBe(true)
    })

    it('Debe combinar filtro de precio y materiales', () => {
      const store = useFilterStore.getState()
      store.setFilter('priceRange', { min: 80000, max: 100000 })
      store.addFilterValue('materials', 'oro')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        p.price >= 80000 && 
        p.price <= 100000 && 
        p.materials.includes('oro')
      )).toBe(true)
    })

    it('Debe combinar búsqueda con filtros', () => {
      const store = useFilterStore.getState()
      store.setSearchQuery('pulsera')
      store.addFilterValue('color', 'dorado')
      
      const filtered = store.getFilteredProducts(products)
      
      expect(filtered.every(p => 
        (p.name.toLowerCase().includes('pulsera') || 
         p.description.toLowerCase().includes('pulsera')) &&
        p.colors.includes('dorado')
      )).toBe(true)
    })
  })
})
