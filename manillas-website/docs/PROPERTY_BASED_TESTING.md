# Property-Based Testing with fast-check

## Overview

This project uses [fast-check](https://fast-check.dev/) for property-based testing (PBT). Property-based testing is a testing methodology where you define properties (universal truths) that should hold for all valid inputs, and the testing framework generates hundreds of test cases automatically.

## Why Property-Based Testing?

Traditional example-based testing validates specific scenarios:
```javascript
expect(add(2, 3)).toBe(5)
expect(add(0, 0)).toBe(0)
```

Property-based testing validates universal properties:
```javascript
fc.assert(
  fc.property(fc.integer(), fc.integer(), (a, b) => {
    expect(add(a, b)).toBe(add(b, a)) // Commutative property
  })
)
```

**Benefits:**
- Discovers edge cases you didn't think of
- Tests a much wider range of inputs (100+ per property)
- Documents the expected behavior as properties
- Complements example-based tests

## Installation

Fast-check is already installed in this project:

```bash
npm install --save-dev fast-check
```

Current version: `^3.14.0`

## Configuration

The project has a centralized PBT configuration in `src/test/pbt-config.js`:

```javascript
import { pbtConfig, createPbtConfig } from '@/test/pbt-config'

// Use default config (100 runs)
fc.assert(fc.property(...), pbtConfig)

// Use custom config
fc.assert(fc.property(...), createPbtConfig({ numRuns: 200 }))
```

### Configuration Options

- **`pbtConfig`**: Default configuration (100 runs) - use for all tests
- **`pbtConfigExtended`**: Extended configuration (500 runs) - use for critical properties
- **`pbtConfigQuick`**: Quick configuration (20 runs) - use during development only

## Writing Property-Based Tests

### Basic Structure

```javascript
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { pbtConfig } from '@/test/pbt-config'

/**
 * Property-Based Tests for [Component/Service Name]
 * **Validates: Requirements X.Y**
 */
describe('[Component] - Property-Based Tests', () => {
  /**
   * Property: [Description of the property]
   * [Detailed explanation of what this property validates]
   */
  it('should [property description]', () => {
    fc.assert(
      fc.property(
        fc.integer(), // Arbitrary generator
        (value) => {
          // Test the property
          const result = myFunction(value)
          expect(result).toBe(expectedBehavior)
        }
      ),
      pbtConfig // Use project configuration
    )
  })
})
```

### Property Documentation Format

Each property test MUST include:

1. **JSDoc comment** explaining the property
2. **Validates tag** linking to requirements: `**Validates: Requirements X.Y**`
3. **Descriptive test name** starting with "should"

Example:
```javascript
/**
 * Property 4: Search returns relevant results
 * For any search query, all returned products should contain the search term
 * in either the product name or description.
 * 
 * **Validates: Requirements 3.3, 3.4**
 */
it('should return only products containing search query', () => {
  // Test implementation
})
```

## Common Arbitraries

Fast-check provides many built-in arbitraries. Here are the most commonly used:

### Primitive Types
```javascript
fc.integer()                    // Any integer
fc.integer({ min: 0, max: 100 }) // Integer in range
fc.float()                      // Any float
fc.boolean()                    // true or false
fc.string()                     // Any string
fc.string({ minLength: 5, maxLength: 50 }) // String with length constraints
```

### Complex Types
```javascript
fc.array(fc.integer())          // Array of integers
fc.array(fc.string(), { minLength: 1, maxLength: 10 }) // Array with size constraints
fc.record({                     // Object with specific shape
  name: fc.string(),
  age: fc.integer({ min: 0, max: 120 })
})
fc.oneof(fc.string(), fc.integer()) // Union type
fc.constantFrom('a', 'b', 'c')  // One of specific values
```

### Domain-Specific Arbitraries
```javascript
fc.emailAddress()               // Valid email addresses
fc.webUrl()                     // Valid URLs
fc.date()                       // Date objects
fc.uuid()                       // UUID strings
```

### Custom Arbitraries

The project provides domain-specific arbitraries in `src/test/pbt-config.js`:

```javascript
import { arbitraries } from '@/test/pbt-config'

fc.property(
  arbitraries.productType(),    // 'pulsera' or 'brazalete'
  arbitraries.productColor(),   // Valid product colors
  arbitraries.email(),          // Valid email addresses
  (type, color, email) => {
    // Test implementation
  }
)
```

## Examples from This Project

### Example 1: Search Functionality

```javascript
/**
 * Property: Search returns relevant results
 * For any search query, all returned products should contain the search term
 */
it('should return only products containing search query', () => {
  fc.assert(
    fc.asyncProperty(
      fc.string({ minLength: 1, maxLength: 50 }),
      async (searchQuery) => {
        const results = await productService.searchProducts(searchQuery)
        const normalizedQuery = searchQuery.toLowerCase()
        
        results.forEach(product => {
          const nameMatch = product.name.toLowerCase().includes(normalizedQuery)
          const descriptionMatch = product.description.toLowerCase().includes(normalizedQuery)
          expect(nameMatch || descriptionMatch).toBe(true)
        })
      }
    ),
    pbtConfig
  )
})
```

### Example 2: Filter Validation

```javascript
/**
 * Property: Filtered results only contain matching products
 */
it('should return only products matching type filter', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('pulsera', 'brazalete'),
      (selectedType) => {
        const store = useFilterStore.getState()
        store.clearFilters()
        store.addFilterValue('type', selectedType)
        
        const filtered = store.getFilteredProducts(products)
        
        filtered.forEach(product => {
          expect(product.type).toBe(selectedType)
        })
      }
    ),
    pbtConfig
  )
})
```

### Example 3: Form Validation

```javascript
/**
 * Property: Valid emails are always accepted
 */
it('should accept all valid email formats', () => {
  fc.assert(
    fc.property(
      fc.emailAddress(),
      (email) => {
        const result = contactFormSchema.safeParse({
          name: 'John Doe',
          email: email,
          subject: 'Valid Subject',
          message: 'This is a valid message',
        })
        
        expect(result.success).toBe(true)
      }
    ),
    pbtConfig
  )
})
```

## Best Practices

### 1. Test Properties, Not Examples

❌ **Bad** - Testing specific examples:
```javascript
it('should add numbers correctly', () => {
  expect(add(2, 3)).toBe(5)
  expect(add(10, 20)).toBe(30)
})
```

✅ **Good** - Testing properties:
```javascript
it('should be commutative', () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      expect(add(a, b)).toBe(add(b, a))
    })
  )
})
```

### 2. Use Meaningful Generators

❌ **Bad** - Too broad:
```javascript
fc.string() // Generates any string, including empty, very long, special characters
```

✅ **Good** - Constrained to domain:
```javascript
fc.string({ minLength: 2, maxLength: 100 }) // Valid name length
```

### 3. Keep Properties Simple

❌ **Bad** - Testing multiple properties:
```javascript
it('should validate everything', () => {
  // Tests sorting, filtering, and searching all at once
})
```

✅ **Good** - One property per test:
```javascript
it('should maintain sort order', () => { /* ... */ })
it('should filter correctly', () => { /* ... */ })
it('should search accurately', () => { /* ... */ })
```

### 4. Handle Async Operations

For async functions, use `fc.asyncProperty`:

```javascript
fc.assert(
  fc.asyncProperty(
    fc.string(),
    async (query) => {
      const result = await searchProducts(query)
      expect(result).toBeDefined()
    }
  ),
  pbtConfig
)
```

### 5. Document Requirements

Always link properties to requirements:

```javascript
/**
 * Property 3: Filtered results only contain matching products
 * **Validates: Requirements 3.2**
 */
```

## Running Tests

### Run all tests (including PBT)
```bash
npm test
```

### Run only PBT tests
```bash
npm test -- --grep "Property-Based Tests"
```

### Run specific test file
```bash
npm test src/services/productService.pbt.test.js
```

### Run with UI
```bash
npm run test:ui
```

## Debugging Failed Properties

When a property test fails, fast-check provides:

1. **Counterexample**: The specific input that caused the failure
2. **Shrunk value**: The minimal input that still fails
3. **Seed**: To reproduce the exact test run

Example failure output:
```
Property failed after 42 tests
{ seed: 1234567890, path: "42:0", endOnFailure: true }
Counterexample: ["test@example"]
Shrunk 3 time(s)
Got error: Expected true but received false
```

### Steps to Debug:

1. **Look at the shrunk counterexample** - This is the minimal failing case
2. **Run the test with the seed** to reproduce:
   ```javascript
   fc.assert(fc.property(...), { ...pbtConfig, seed: 1234567890 })
   ```
3. **Add the counterexample as a unit test** for regression:
   ```javascript
   it('should handle edge case from PBT', () => {
     expect(myFunction("test@example")).toBe(expected)
   })
   ```

## Integration with Vitest

Fast-check integrates seamlessly with Vitest:

```javascript
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'

describe('My Component', () => {
  // Regular unit tests
  it('should handle specific case', () => {
    expect(myFunction(5)).toBe(10)
  })
  
  // Property-based tests
  it('should satisfy property for all inputs', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        expect(myFunction(n)).toBeGreaterThan(n)
      })
    )
  })
})
```

## Common Patterns

### Pattern 1: Idempotence

```javascript
it('should be idempotent', () => {
  fc.assert(
    fc.property(fc.anything(), (value) => {
      const once = transform(value)
      const twice = transform(once)
      expect(once).toEqual(twice)
    })
  )
})
```

### Pattern 2: Inverse Functions

```javascript
it('should be reversible', () => {
  fc.assert(
    fc.property(fc.string(), (str) => {
      const encoded = encode(str)
      const decoded = decode(encoded)
      expect(decoded).toBe(str)
    })
  )
})
```

### Pattern 3: Invariants

```javascript
it('should maintain invariant', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const sorted = sort(arr)
      expect(sorted.length).toBe(arr.length) // Length invariant
    })
  )
})
```

### Pattern 4: Consistency

```javascript
it('should be consistent across calls', () => {
  fc.assert(
    fc.property(fc.string(), (query) => {
      const result1 = search(query)
      const result2 = search(query)
      expect(result1).toEqual(result2)
    })
  )
})
```

## Resources

- [fast-check Documentation](https://fast-check.dev/)
- [fast-check GitHub](https://github.com/dubzzz/fast-check)
- [Property-Based Testing Introduction](https://fast-check.dev/docs/introduction/)
- [Arbitraries Reference](https://fast-check.dev/api-reference/index.html)

## Project-Specific Properties

This project validates the following properties (see design.md for complete list):

1. **Catalog displays exactly 4 products** (Requirements 1.1)
2. **All required product fields are displayed** (Requirements 1.3)
3. **Filtered results only contain matching products** (Requirements 3.2)
4. **Search returns relevant results** (Requirements 3.3)
5. **Product detail view contains all required information** (Requirements 2.2)
6. **Contact form validates required fields** (Requirements 6.2, 6.3)
7. **Valid contact form is submitted successfully** (Requirements 6.4, 6.5)
8. **Navigation menu contains all required sections** (Requirements 9.1)
9. **Active menu item is visually indicated** (Requirements 9.4)
10. **Home page contains all required elements** (Requirements 10.1, 10.2)
11. **Footer is present on all pages** (Requirements 11.1, 11.2)
12. **Contact channels are accessible from multiple sections** (Requirements 5.5)
13. **Page is responsive on all device sizes** (Requirements 7.1-7.4)
14. **Email link has correct format** (Requirements 5.3)
15. **WhatsApp link has correct format** (Requirements 5.2)
16. **About section contains all required content** (Requirements 4.2)
17. **Product availability status is clearly displayed** (Requirements 2.4)
18. **Images load and are viewable in high resolution** (Requirements 2.3)
19. **Search results appear within 1 second** (Requirements 3.4)
20. **Page loads completely within 3 seconds** (Requirements 1.2, 10.4, 12.1)

## Support

For questions or issues with property-based testing:
1. Check the [fast-check documentation](https://fast-check.dev/)
2. Review existing PBT tests in the project
3. Consult the design document for property specifications
