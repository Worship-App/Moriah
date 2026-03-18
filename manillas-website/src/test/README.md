# Test Configuration

This directory contains the test configuration and utilities for the manillas-website project.

## Files

### `setup.js`
Global test setup file that runs before all tests. Configured in `vitest.config.js`.

**Includes:**
- `@testing-library/jest-dom` - Custom matchers for DOM testing
- Global test utilities

### `pbt-config.js`
Configuration and utilities for property-based testing with fast-check.

**Exports:**
- `pbtConfig` - Default configuration (100 runs)
- `pbtConfigExtended` - Extended configuration (500 runs)
- `pbtConfigQuick` - Quick configuration (20 runs)
- `createPbtConfig()` - Helper to create custom configurations
- `arbitraries` - Domain-specific arbitraries for the project
- `runPropertyTest()` - Utility to run property tests with default config

**Usage:**
```javascript
import { pbtConfig, arbitraries } from '@/test/pbt-config'
import fc from 'fast-check'

fc.assert(
  fc.property(
    arbitraries.productType(),
    (type) => {
      // Test implementation
    }
  ),
  pbtConfig
)
```

## Testing Strategy

This project uses a combination of testing approaches:

### 1. Unit Tests
Test individual components and functions in isolation.

**Location:** Co-located with source files (e.g., `Component.test.jsx`)

**Tools:** Vitest + React Testing Library

**Example:**
```javascript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### 2. Property-Based Tests
Test universal properties that should hold for all valid inputs.

**Location:** Separate files with `.pbt.test.js` suffix

**Tools:** Vitest + fast-check

**Example:**
```javascript
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { pbtConfig } from '@/test/pbt-config'

describe('MyFunction - Property-Based Tests', () => {
  it('should satisfy property', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        expect(myFunction(n)).toBeGreaterThan(0)
      }),
      pbtConfig
    )
  })
})
```

### 3. Integration Tests
Test how multiple components work together.

**Location:** Co-located with source files or in dedicated test directories

**Tools:** Vitest + React Testing Library

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run specific test file
npm test src/components/MyComponent.test.jsx

# Run only PBT tests
npm test -- --grep "Property-Based Tests"

# Run with coverage
npm test -- --coverage
```

## Test File Naming Conventions

- `*.test.js` / `*.test.jsx` - Unit tests and integration tests
- `*.pbt.test.js` - Property-based tests
- `*.spec.js` - Alternative naming for tests (not used in this project)

## Configuration Files

- `vitest.config.js` - Main Vitest configuration (in project root)
- `src/test/setup.js` - Global test setup
- `src/test/pbt-config.js` - Property-based testing configuration

## Best Practices

1. **Co-locate tests with source files** - Makes it easier to find and maintain tests
2. **Use descriptive test names** - Start with "should" and describe the expected behavior
3. **Test behavior, not implementation** - Focus on what the code does, not how it does it
4. **Keep tests simple** - One assertion per test when possible
5. **Use property-based tests for general properties** - Complement with example tests for specific cases
6. **Document requirements** - Link tests to requirements using `**Validates: Requirements X.Y**`

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [fast-check Documentation](https://fast-check.dev/)
- [Property-Based Testing Guide](../../docs/PROPERTY_BASED_TESTING.md)
