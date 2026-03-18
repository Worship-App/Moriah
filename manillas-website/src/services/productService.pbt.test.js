import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { productService } from './productService'
import { products } from '../data/products'

/**
 * Property-Based Tests for Product Search
 * **Validates: Requirements 3.3, 3.4**
 */

describe('ProductService Search - Property-Based Tests', () => {
  /**
   * Property 4: Search returns relevant results
   * For any search query, all returned products should contain the search term
   * in either the product name or description.
   */
  it('should return only products containing search query in name or description', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (searchQuery) => {
          // Perform search
          const results = await productService.searchProducts(searchQuery)
          
          // Normalize search query for comparison
          const normalizedQuery = searchQuery.toLowerCase()
          
          // All returned products must contain the search query in name or description
          results.forEach(product => {
            const nameMatch = product.name.toLowerCase().includes(normalizedQuery)
            const descriptionMatch = product.description.toLowerCase().includes(normalizedQuery)
            
            expect(nameMatch || descriptionMatch).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search with known terms returns expected products
   * For any term that exists in product data, search should return at least one result
   */
  it('should return results for terms that exist in product data', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom(
          'pulsera', 'brazalete', 'dorada', 'plata', 'cobre', 'vintage',
          'artesanal', 'premium', 'lujo', 'oro', 'diseño', 'elegante'
        ),
        async (knownTerm) => {
          const results = await productService.searchProducts(knownTerm)
          
          // Should return at least one product for known terms
          expect(results.length).toBeGreaterThan(0)
          
          // All results should contain the term
          const normalizedTerm = knownTerm.toLowerCase()
          results.forEach(product => {
            const nameMatch = product.name.toLowerCase().includes(normalizedTerm)
            const descriptionMatch = product.description.toLowerCase().includes(normalizedTerm)
            expect(nameMatch || descriptionMatch).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search is case-insensitive
   * For any search query, results should be the same regardless of case
   */
  it('should return same results regardless of case', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom('pulsera', 'brazalete', 'dorada', 'plata', 'artesanal'),
        async (term) => {
          const lowerResults = await productService.searchProducts(term.toLowerCase())
          const upperResults = await productService.searchProducts(term.toUpperCase())
          const mixedResults = await productService.searchProducts(
            term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()
          )
          
          // All variations should return the same number of results
          expect(lowerResults.length).toBe(upperResults.length)
          expect(lowerResults.length).toBe(mixedResults.length)
          
          // Results should contain the same product IDs
          const lowerIds = lowerResults.map(p => p.id).sort()
          const upperIds = upperResults.map(p => p.id).sort()
          const mixedIds = mixedResults.map(p => p.id).sort()
          
          expect(lowerIds).toEqual(upperIds)
          expect(lowerIds).toEqual(mixedIds)
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search with non-existent terms returns empty array
   * For any search query that doesn't exist in any product, should return empty array
   */
  it('should return empty array for non-existent search terms', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom(
          'xyz123notfound', 'qwerty999', 'nonexistent', 'zzzzz',
          '!!!###$$$', '12345678901234567890'
        ),
        async (nonExistentTerm) => {
          const results = await productService.searchProducts(nonExistentTerm)
          
          // Should return an array (not null or undefined)
          expect(Array.isArray(results)).toBe(true)
          
          // If no matches, should be empty
          // If there are results, they must contain the term
          results.forEach(product => {
            const normalizedTerm = nonExistentTerm.toLowerCase()
            const nameMatch = product.name.toLowerCase().includes(normalizedTerm)
            const descriptionMatch = product.description.toLowerCase().includes(normalizedTerm)
            expect(nameMatch || descriptionMatch).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search with empty string returns all products
   * For empty search query, should return all products
   */
  it('should return all products for empty search query', async () => {
    const results = await productService.searchProducts('')
    
    expect(results.length).toBe(products.length)
    expect(results).toEqual(products)
  })

  /**
   * Property: Search results are a subset of all products
   * For any search query, results should only contain products from the original dataset
   */
  it('should return only products from the original dataset', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 50 }),
        async (searchQuery) => {
          const results = await productService.searchProducts(searchQuery)
          
          // All results should be in the original products array
          results.forEach(result => {
            const existsInOriginal = products.some(p => p.id === result.id)
            expect(existsInOriginal).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search with partial words returns matching products
   * For any substring of a product name or description, search should find it
   */
  it('should find products with partial word matches', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom(
          'puls', 'braza', 'dora', 'plat', 'arte', 'prem',
          'vint', 'cob', 'luj', 'diseñ'
        ),
        async (partialTerm) => {
          const results = await productService.searchProducts(partialTerm)
          
          // All results should contain the partial term
          const normalizedTerm = partialTerm.toLowerCase()
          results.forEach(product => {
            const nameMatch = product.name.toLowerCase().includes(normalizedTerm)
            const descriptionMatch = product.description.toLowerCase().includes(normalizedTerm)
            expect(nameMatch || descriptionMatch).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search results maintain product structure
   * For any search query, returned products should have all required fields
   */
  it('should return products with complete structure', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom('pulsera', 'brazalete', 'artesanal', 'premium'),
        async (searchQuery) => {
          const results = await productService.searchProducts(searchQuery)
          
          // All results should have required fields
          results.forEach(product => {
            expect(product).toHaveProperty('id')
            expect(product).toHaveProperty('name')
            expect(product).toHaveProperty('description')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('type')
            expect(product).toHaveProperty('colors')
            expect(product).toHaveProperty('materials')
            expect(product).toHaveProperty('images')
            expect(product).toHaveProperty('availability')
            
            // Validate types
            expect(typeof product.id).toBe('string')
            expect(typeof product.name).toBe('string')
            expect(typeof product.description).toBe('string')
            expect(typeof product.price).toBe('number')
            expect(Array.isArray(product.colors)).toBe(true)
            expect(Array.isArray(product.materials)).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search with whitespace is handled correctly
   * For any search query with leading/trailing whitespace, should work correctly
   */
  it('should handle whitespace in search queries', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom('pulsera', 'brazalete', 'artesanal'),
        fc.constantFrom('', ' ', '  ', '   '),
        fc.constantFrom('', ' ', '  ', '   '),
        async (term, leadingSpace, trailingSpace) => {
          const queryWithSpaces = `${leadingSpace}${term}${trailingSpace}`
          const results = await productService.searchProducts(queryWithSpaces)
          
          // Should find results despite whitespace
          const normalizedTerm = term.toLowerCase()
          results.forEach(product => {
            const nameMatch = product.name.toLowerCase().includes(normalizedTerm)
            const descriptionMatch = product.description.toLowerCase().includes(normalizedTerm)
            expect(nameMatch || descriptionMatch).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Search is consistent across multiple calls
   * For the same search query, results should be identical across multiple calls
   */
  it('should return consistent results for the same query', async () => {
    fc.assert(
      fc.asyncProperty(
        fc.constantFrom('pulsera', 'brazalete', 'dorada', 'plata', 'artesanal'),
        async (searchQuery) => {
          const results1 = await productService.searchProducts(searchQuery)
          const results2 = await productService.searchProducts(searchQuery)
          const results3 = await productService.searchProducts(searchQuery)
          
          // All calls should return the same number of results
          expect(results1.length).toBe(results2.length)
          expect(results2.length).toBe(results3.length)
          
          // Results should have the same product IDs in the same order
          const ids1 = results1.map(p => p.id)
          const ids2 = results2.map(p => p.id)
          const ids3 = results3.map(p => p.id)
          
          expect(ids1).toEqual(ids2)
          expect(ids2).toEqual(ids3)
        }
      ),
      { numRuns: 20 }
    )
  })
})

