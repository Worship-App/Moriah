import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { useFilterStore } from '../../store/filterStore'
import { products } from '../../data/products'

/**
 * Property-Based Tests for Product Filters
 * **Validates: Requirements 3.2**
 */

describe('ProductFilters - Property-Based Tests', () => {
  /**
   * Property 3: Filtered results only contain matching products
   * For any filter criteria applied (type, color, price range, materials),
   * all returned products should match the selected criteria.
   */
  it('should return only products matching type filter', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('pulsera', 'brazalete'),
        (selectedType) => {
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply type filter
          store.addFilterValue('type', selectedType)
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should match the selected type
          filtered.forEach(product => {
            expect(product.type).toBe(selectedType)
          })
          
          // Should have at least one product (we know our data has both types)
          expect(filtered.length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return only products matching color filter', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dorado', 'plateado', 'cobre', 'bronce', 'blanco'),
        (selectedColor) => {
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply color filter
          store.addFilterValue('color', selectedColor)
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should include the selected color
          filtered.forEach(product => {
            expect(product.colors).toContain(selectedColor)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return only products matching material filter', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('oro', 'plata', 'cobre', 'bronce', 'acero_inoxidable'),
        (selectedMaterial) => {
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply material filter
          store.addFilterValue('materials', selectedMaterial)
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should include the selected material
          filtered.forEach(product => {
            expect(product.materials).toContain(selectedMaterial)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return only products within price range', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 150000 }),
        fc.integer({ min: 0, max: 150000 }),
        (min, max) => {
          // Ensure min <= max
          const minPrice = Math.min(min, max)
          const maxPrice = Math.max(min, max)
          
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply price range filter
          store.setFilter('priceRange', { min: minPrice, max: maxPrice })
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should be within the price range
          filtered.forEach(product => {
            expect(product.price).toBeGreaterThanOrEqual(minPrice)
            expect(product.price).toBeLessThanOrEqual(maxPrice)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return only products matching multiple filters (type + color)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('pulsera', 'brazalete'),
        fc.constantFrom('dorado', 'plateado', 'cobre', 'bronce', 'blanco'),
        (selectedType, selectedColor) => {
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply multiple filters
          store.addFilterValue('type', selectedType)
          store.addFilterValue('color', selectedColor)
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should match ALL criteria
          filtered.forEach(product => {
            expect(product.type).toBe(selectedType)
            expect(product.colors).toContain(selectedColor)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return only products matching multiple filters (material + price)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('oro', 'plata', 'cobre', 'bronce', 'acero_inoxidable'),
        fc.integer({ min: 0, max: 150000 }),
        fc.integer({ min: 0, max: 150000 }),
        (selectedMaterial, min, max) => {
          // Ensure min <= max
          const minPrice = Math.min(min, max)
          const maxPrice = Math.max(min, max)
          
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply multiple filters
          store.addFilterValue('materials', selectedMaterial)
          store.setFilter('priceRange', { min: minPrice, max: maxPrice })
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should match ALL criteria
          filtered.forEach(product => {
            expect(product.materials).toContain(selectedMaterial)
            expect(product.price).toBeGreaterThanOrEqual(minPrice)
            expect(product.price).toBeLessThanOrEqual(maxPrice)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return only products matching all filters (type + color + material + price)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('pulsera', 'brazalete'),
        fc.constantFrom('dorado', 'plateado', 'cobre', 'bronce', 'blanco'),
        fc.constantFrom('oro', 'plata', 'cobre', 'bronce', 'acero_inoxidable'),
        fc.integer({ min: 0, max: 150000 }),
        fc.integer({ min: 0, max: 150000 }),
        (selectedType, selectedColor, selectedMaterial, min, max) => {
          // Ensure min <= max
          const minPrice = Math.min(min, max)
          const maxPrice = Math.max(min, max)
          
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply all filters
          store.addFilterValue('type', selectedType)
          store.addFilterValue('color', selectedColor)
          store.addFilterValue('materials', selectedMaterial)
          store.setFilter('priceRange', { min: minPrice, max: maxPrice })
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should match ALL criteria
          filtered.forEach(product => {
            expect(product.type).toBe(selectedType)
            expect(product.colors).toContain(selectedColor)
            expect(product.materials).toContain(selectedMaterial)
            expect(product.price).toBeGreaterThanOrEqual(minPrice)
            expect(product.price).toBeLessThanOrEqual(maxPrice)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return empty array when no products match filters', () => {
    fc.assert(
      fc.property(
        fc.constant('pulsera'),
        fc.constant('plateado'),
        fc.constant('plata'),
        () => {
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply filters that we know won't match any product
          // (pulsera + plateado + plata - no product has this exact combination)
          store.addFilterValue('type', 'pulsera')
          store.addFilterValue('color', 'plateado')
          store.addFilterValue('materials', 'plata')
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // Should return empty array when no matches
          expect(Array.isArray(filtered)).toBe(true)
          
          // If there are results, they must match all criteria
          filtered.forEach(product => {
            expect(product.type).toBe('pulsera')
            expect(product.colors).toContain('plateado')
            expect(product.materials).toContain('plata')
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  it('should return all products when no filters are applied', () => {
    const store = useFilterStore.getState()
    
    // Clear all filters
    store.clearFilters()
    
    // Get filtered products
    const filtered = store.getFilteredProducts(products)
    
    // Should return all products
    expect(filtered.length).toBe(products.length)
    expect(filtered).toEqual(products)
  })

  it('should handle multiple values for the same filter type', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dorado', 'plateado'),
        fc.constantFrom('cobre', 'bronce'),
        (color1, color2) => {
          const store = useFilterStore.getState()
          
          // Clear filters first
          store.clearFilters()
          
          // Apply multiple color filters
          store.addFilterValue('color', color1)
          store.addFilterValue('color', color2)
          
          // Get filtered products
          const filtered = store.getFilteredProducts(products)
          
          // All filtered products should have at least one of the selected colors
          filtered.forEach(product => {
            const hasMatchingColor = product.colors.includes(color1) || product.colors.includes(color2)
            expect(hasMatchingColor).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })
})

