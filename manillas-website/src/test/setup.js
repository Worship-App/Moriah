import '@testing-library/jest-dom'

/**
 * Test Setup Configuration
 * 
 * This file is automatically loaded before running tests (configured in vitest.config.js)
 * 
 * Setup includes:
 * - @testing-library/jest-dom for DOM matchers
 * - fast-check for property-based testing (imported in individual test files)
 */

// Configure fast-check global settings if needed
// Note: fast-check is imported directly in test files for better tree-shaking
// and explicit dependencies

// Global test utilities can be added here
globalThis.testUtils = {
  // Add any global test utilities here
}
