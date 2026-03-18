/**
 * Property-Based Testing Configuration
 * 
 * This file contains the configuration and utilities for property-based testing
 * using fast-check library.
 * 
 * @see https://fast-check.dev/
 */

/**
 * Default configuration for fast-check property tests
 * 
 * According to the design document, we run a minimum of 100 iterations
 * per property to ensure thorough testing.
 */
export const pbtConfig = {
  // Number of test runs per property (minimum as per design spec)
  numRuns: 100,
  
  // Seed for reproducible tests (optional, can be overridden)
  // seed: 42,
  
  // Path for verbose output (useful for debugging)
  verbose: false,
  
  // Maximum number of shrink iterations when a test fails
  maxSkipsPerRun: 100,
  
  // Timeout per test run in milliseconds
  timeout: 5000,
}

/**
 * Extended configuration for more thorough testing
 * Use this for critical properties that need extra validation
 */
export const pbtConfigExtended = {
  ...pbtConfig,
  numRuns: 500,
}

/**
 * Quick configuration for faster test runs during development
 * Use this for rapid iteration, but always run full tests before committing
 */
export const pbtConfigQuick = {
  ...pbtConfig,
  numRuns: 20,
}

/**
 * Helper function to create consistent test configuration
 * 
 * @param {Object} overrides - Configuration overrides
 * @returns {Object} Merged configuration
 * 
 * @example
 * fc.assert(
 *   fc.property(...),
 *   createPbtConfig({ numRuns: 200 })
 * )
 */
export function createPbtConfig(overrides = {}) {
  return {
    ...pbtConfig,
    ...overrides,
  }
}

/**
 * Common arbitraries for the manillas website domain
 * These can be reused across different test files
 */
export const arbitraries = {
  /**
   * Generate valid product types
   */
  productType: () => {
    const fc = require('fast-check')
    return fc.constantFrom('pulsera', 'brazalete')
  },
  
  /**
   * Generate valid product colors
   */
  productColor: () => {
    const fc = require('fast-check')
    return fc.constantFrom('dorado', 'plateado', 'cobre', 'bronce', 'blanco')
  },
  
  /**
   * Generate valid product materials
   */
  productMaterial: () => {
    const fc = require('fast-check')
    return fc.constantFrom('oro', 'plata', 'cobre', 'bronce', 'acero_inoxidable')
  },
  
  /**
   * Generate valid price ranges
   */
  priceRange: () => {
    const fc = require('fast-check')
    return fc.integer({ min: 0, max: 150000 })
  },
  
  /**
   * Generate valid email addresses
   */
  email: () => {
    const fc = require('fast-check')
    return fc.emailAddress()
  },
  
  /**
   * Generate valid names (2-100 characters)
   */
  name: () => {
    const fc = require('fast-check')
    return fc.string({ minLength: 2, maxLength: 100 })
  },
  
  /**
   * Generate valid subjects (5-200 characters)
   */
  subject: () => {
    const fc = require('fast-check')
    return fc.string({ minLength: 5, maxLength: 200 })
  },
  
  /**
   * Generate valid messages (10-5000 characters)
   */
  message: () => {
    const fc = require('fast-check')
    return fc.string({ minLength: 10, maxLength: 5000 })
  },
  
  /**
   * Generate search queries
   */
  searchQuery: () => {
    const fc = require('fast-check')
    return fc.string({ minLength: 1, maxLength: 50 })
  },
}

/**
 * Utility function to run a property test with default configuration
 * 
 * @param {Function} property - The property to test
 * @param {Object} config - Optional configuration overrides
 * 
 * @example
 * runPropertyTest(
 *   fc.property(fc.integer(), (n) => {
 *     expect(n + 0).toBe(n)
 *   })
 * )
 */
export function runPropertyTest(property, config = {}) {
  const fc = require('fast-check')
  return fc.assert(property, createPbtConfig(config))
}

/**
 * Best practices for property-based testing:
 * 
 * 1. Test properties, not examples
 *    - Focus on universal truths that should hold for all inputs
 *    - Example: "search results always contain the search term"
 * 
 * 2. Use meaningful generators
 *    - Create arbitraries that match your domain
 *    - Constrain inputs to valid ranges
 * 
 * 3. Keep properties simple
 *    - Each property should test one characteristic
 *    - Complex properties are harder to debug when they fail
 * 
 * 4. Combine with example-based tests
 *    - Use PBT for general properties
 *    - Use example tests for specific edge cases
 * 
 * 5. Handle shrinking
 *    - fast-check automatically shrinks failing cases
 *    - Pay attention to the minimal failing example
 * 
 * 6. Document your properties
 *    - Explain what property is being tested
 *    - Link to requirements being validated
 *    - Use the format: "**Validates: Requirements X.Y**"
 */
