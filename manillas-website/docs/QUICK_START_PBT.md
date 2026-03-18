# Quick Start: Property-Based Testing

A quick reference guide for writing property-based tests in this project.

## 1. Import Dependencies

```javascript
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { pbtConfig } from '@/test/pbt-config'
```

## 2. Basic Template

```javascript
/**
 * Property-Based Tests for [Component/Service Name]
 * **Validates: Requirements X.Y**
 */
describe('[Component] - Property-Based Tests', () => {
  /**
   * Property: [Description]
   * [Detailed explanation]
   */
  it('should [property description]', () => {
    fc.assert(
      fc.property(
        fc.integer(), // Generator
        (value) => {
          // Test logic
          const result = myFunction(value)
          expect(result).toBe(expected)
        }
      ),
      pbtConfig // Always use project config
    )
  })
})
```

## 3. Common Generators

```javascript
// Primitives
fc.integer()                    // Any integer
fc.integer({ min: 0, max: 100 }) // Range
fc.string()                     // Any string
fc.string({ minLength: 5, maxLength: 50 }) // Length constraints
fc.boolean()                    // true/false

// Collections
fc.array(fc.integer())          // Array of integers
fc.array(fc.string(), { minLength: 1, maxLength: 10 }) // Sized array

// Domain-specific
fc.emailAddress()               // Valid emails
fc.constantFrom('a', 'b', 'c')  // One of values
```

## 4. Project-Specific Generators

```javascript
import { arbitraries } from '@/test/pbt-config'

arbitraries.productType()       // 'pulsera' or 'brazalete'
arbitraries.productColor()      // Valid colors
arbitraries.productMaterial()   // Valid materials
arbitraries.priceRange()        // 0-150000
arbitraries.email()             // Valid email
arbitraries.name()              // 2-100 chars
arbitraries.subject()           // 5-200 chars
arbitraries.message()           // 10-5000 chars
arbitraries.searchQuery()       // 1-50 chars
```

## 5. Async Properties

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

## 6. Multiple Generators

```javascript
fc.assert(
  fc.property(
    fc.integer(),
    fc.string(),
    fc.boolean(),
    (num, str, bool) => {
      // Use all three values
    }
  ),
  pbtConfig
)
```

## 7. Common Patterns

### Idempotence
```javascript
it('should be idempotent', () => {
  fc.assert(
    fc.property(fc.anything(), (value) => {
      const once = transform(value)
      const twice = transform(once)
      expect(once).toEqual(twice)
    }),
    pbtConfig
  )
})
```

### Inverse Functions
```javascript
it('should be reversible', () => {
  fc.assert(
    fc.property(fc.string(), (str) => {
      expect(decode(encode(str))).toBe(str)
    }),
    pbtConfig
  )
})
```

### Consistency
```javascript
it('should be consistent', () => {
  fc.assert(
    fc.property(fc.string(), (query) => {
      const result1 = search(query)
      const result2 = search(query)
      expect(result1).toEqual(result2)
    }),
    pbtConfig
  )
})
```

## 8. Running Tests

```bash
# All tests
npm test

# Only PBT tests
npm test -- --grep "Property-Based Tests"

# Specific file
npm test src/services/productService.pbt.test.js

# With UI
npm run test:ui
```

## 9. Debugging Failures

When a test fails, fast-check shows:
```
Property failed after 42 tests
Counterexample: ["test@example"]
Shrunk 3 time(s)
```

**Steps:**
1. Look at the shrunk counterexample
2. Add it as a unit test for regression
3. Fix the code or adjust the property

## 10. Checklist

Before committing PBT tests:

- [ ] Test has descriptive JSDoc comment
- [ ] Includes `**Validates: Requirements X.Y**` tag
- [ ] Uses `pbtConfig` for configuration
- [ ] Test name starts with "should"
- [ ] Generator constraints match domain
- [ ] Property is simple and focused
- [ ] All tests pass with 100 runs

## Examples from This Project

### Search Validation
```javascript
it('should return only products containing search query', () => {
  fc.assert(
    fc.asyncProperty(
      fc.string({ minLength: 1, maxLength: 50 }),
      async (searchQuery) => {
        const results = await productService.searchProducts(searchQuery)
        const normalized = searchQuery.toLowerCase()
        
        results.forEach(product => {
          const match = 
            product.name.toLowerCase().includes(normalized) ||
            product.description.toLowerCase().includes(normalized)
          expect(match).toBe(true)
        })
      }
    ),
    pbtConfig
  )
})
```

### Filter Validation
```javascript
it('should return only products matching type filter', () => {
  fc.assert(
    fc.property(
      arbitraries.productType(),
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

### Form Validation
```javascript
it('should accept all valid names', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 2, maxLength: 100 }),
      (name) => {
        const result = contactFormSchema.safeParse({
          name,
          email: 'test@example.com',
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

## Need More Help?

- Full guide: [docs/PROPERTY_BASED_TESTING.md](./PROPERTY_BASED_TESTING.md)
- fast-check docs: https://fast-check.dev/
- Test config: [src/test/pbt-config.js](../src/test/pbt-config.js)
