import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { 
  pbtConfig, 
  pbtConfigExtended, 
  pbtConfigQuick,
  createPbtConfig,
  arbitraries 
} from './pbt-config'

/**
 * Tests for PBT Configuration
 * Validates that the fast-check configuration is properly set up
 */
describe('PBT Configuration', () => {
  it('should export pbtConfig with correct defaults', () => {
    expect(pbtConfig).toBeDefined()
    expect(pbtConfig.numRuns).toBe(100)
    expect(pbtConfig.verbose).toBe(false)
  })

  it('should export pbtConfigExtended with 500 runs', () => {
    expect(pbtConfigExtended).toBeDefined()
    expect(pbtConfigExtended.numRuns).toBe(500)
  })

  it('should export pbtConfigQuick with 20 runs', () => {
    expect(pbtConfigQuick).toBeDefined()
    expect(pbtConfigQuick.numRuns).toBe(20)
  })

  it('should create custom config with overrides', () => {
    const customConfig = createPbtConfig({ numRuns: 200, verbose: true })
    expect(customConfig.numRuns).toBe(200)
    expect(customConfig.verbose).toBe(true)
  })

  it('should export arbitraries object', () => {
    expect(arbitraries).toBeDefined()
    expect(typeof arbitraries.productType).toBe('function')
    expect(typeof arbitraries.productColor).toBe('function')
    expect(typeof arbitraries.email).toBe('function')
  })

  it('should generate valid product types', () => {
    fc.assert(
      fc.property(
        arbitraries.productType(),
        (type) => {
          expect(['pulsera', 'brazalete']).toContain(type)
        }
      ),
      pbtConfigQuick // Use quick config for this test
    )
  })

  it('should generate valid product colors', () => {
    fc.assert(
      fc.property(
        arbitraries.productColor(),
        (color) => {
          expect(['dorado', 'plateado', 'cobre', 'bronce', 'blanco']).toContain(color)
        }
      ),
      pbtConfigQuick
    )
  })

  it('should generate valid price ranges', () => {
    fc.assert(
      fc.property(
        arbitraries.priceRange(),
        (price) => {
          expect(price).toBeGreaterThanOrEqual(0)
          expect(price).toBeLessThanOrEqual(150000)
        }
      ),
      pbtConfigQuick
    )
  })

  it('should work with fast-check basic property test', () => {
    fc.assert(
      fc.property(
        fc.integer(),
        (n) => {
          expect(n + 0).toBe(n)
        }
      ),
      pbtConfigQuick
    )
  })
})
