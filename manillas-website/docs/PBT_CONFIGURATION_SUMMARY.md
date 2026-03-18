# fast-check Configuration Summary

## Overview

This document summarizes the fast-check configuration for property-based testing in the manillas-website project.

## Installation Status

✅ **fast-check v3.14.0** is installed and configured

```json
{
  "devDependencies": {
    "fast-check": "^3.14.0"
  }
}
```

## Configuration Files

### 1. `src/test/pbt-config.js`
Central configuration file for all property-based tests.

**Exports:**
- `pbtConfig` - Default configuration (100 runs per property)
- `pbtConfigExtended` - Extended configuration (500 runs)
- `pbtConfigQuick` - Quick configuration (20 runs, dev only)
- `createPbtConfig(overrides)` - Helper function
- `arbitraries` - Domain-specific generators
- `runPropertyTest(property, config)` - Utility function

### 2. `src/test/setup.js`
Global test setup file (runs before all tests).

**Includes:**
- `@testing-library/jest-dom` matchers
- Global test utilities

### 3. `vitest.config.js`
Vitest configuration with fast-check integration.

**Settings:**
- Environment: `happy-dom`
- Setup file: `./src/test/setup.js`
- Globals: enabled

## Usage Pattern

### Standard Usage
```javascript
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { pbtConfig } from '@/test/pbt-config'

describe('Component - Property-Based Tests', () => {
  it('should satisfy property', () => {
    fc.assert(
      fc.property(
        fc.integer(),
        (value) => {
          expect(myFunction(value)).toBeDefined()
        }
      ),
      pbtConfig // Use project configuration
    )
  })
})
```

### With Domain Arbitraries
```javascript
import { arbitraries } from '@/test/pbt-config'

fc.assert(
  fc.property(
    arbitraries.productType(),
    arbitraries.productColor(),
    (type, color) => {
      // Test implementation
    }
  ),
  pbtConfig
)
```

## Configuration Values

### Default Configuration (`pbtConfig`)
```javascript
{
  numRuns: 100,           // Minimum as per design spec
  verbose: false,
  maxSkipsPerRun: 100,
  timeout: 5000
}
```

### Extended Configuration (`pbtConfigExtended`)
```javascript
{
  numRuns: 500,           // For critical properties
  verbose: false,
  maxSkipsPerRun: 100,
  timeout: 5000
}
```

### Quick Configuration (`pbtConfigQuick`)
```javascript
{
  numRuns: 20,            // Development only
  verbose: false,
  maxSkipsPerRun: 100,
  timeout: 5000
}
```

## Domain-Specific Arbitraries

The project provides pre-configured arbitraries for common domain types:

| Arbitrary | Description | Example Values |
|-----------|-------------|----------------|
| `productType()` | Product types | 'pulsera', 'brazalete' |
| `productColor()` | Product colors | 'dorado', 'plateado', 'cobre', 'bronce', 'blanco' |
| `productMaterial()` | Product materials | 'oro', 'plata', 'cobre', 'bronce', 'acero_inoxidable' |
| `priceRange()` | Price values | 0-150000 |
| `email()` | Valid emails | Uses `fc.emailAddress()` |
| `name()` | Valid names | 2-100 characters |
| `subject()` | Valid subjects | 5-200 characters |
| `message()` | Valid messages | 10-5000 characters |
| `searchQuery()` | Search queries | 1-50 characters |

## Existing PBT Test Files

The following property-based test files are already implemented:

1. **`src/services/productService.pbt.test.js`**
   - 10 properties testing search functionality
   - Validates Requirements 3.3, 3.4

2. **`src/components/Product/ProductGallery.pbt.test.jsx`**
   - 6 properties testing image gallery
   - Validates Requirements 2.3

3. **`src/components/Product/ProductFilters.pbt.test.js`**
   - 10 properties testing filter functionality
   - Validates Requirements 3.2

4. **`src/components/Forms/ContactForm.pbt.test.js`**
   - 11 properties testing form validation
   - Validates Requirements 6.2, 6.3

**Total: 37 property-based tests running 100 iterations each = 3,700 test cases**

## Test Execution

### Run All Tests
```bash
npm test
```

### Run Only PBT Tests
```bash
npm test -- --grep "Property-Based Tests"
```

### Run Specific PBT File
```bash
npm test src/services/productService.pbt.test.js
```

### Run with UI
```bash
npm run test:ui
```

## Documentation

| Document | Purpose | Location |
|----------|---------|----------|
| **Property-Based Testing Guide** | Complete guide to PBT in this project | `docs/PROPERTY_BASED_TESTING.md` |
| **Quick Start PBT** | Quick reference for writing PBT tests | `docs/QUICK_START_PBT.md` |
| **Test Configuration** | Test setup and configuration details | `src/test/README.md` |
| **PBT Config Source** | Configuration file with utilities | `src/test/pbt-config.js` |

## Integration with CI/CD

Property-based tests run automatically in the CI/CD pipeline:

```yaml
# .github/workflows/deploy.yml
- name: Run tests
  run: npm test
```

All PBT tests must pass before deployment.

## Best Practices

1. ✅ Always use `pbtConfig` for consistency
2. ✅ Document properties with JSDoc comments
3. ✅ Link to requirements: `**Validates: Requirements X.Y**`
4. ✅ Use domain arbitraries when available
5. ✅ Keep properties simple and focused
6. ✅ Run full test suite before committing
7. ✅ Add counterexamples as unit tests

## Performance

- **Average PBT test duration:** 50-100ms per property (100 runs)
- **Total PBT suite duration:** ~5-10 seconds
- **Recommended:** Run PBT tests on every commit

## Troubleshooting

### Tests are slow
- Use `pbtConfigQuick` during development
- Always run full suite before committing

### Test failures
- Check the shrunk counterexample
- Add it as a unit test for regression
- Review property definition

### Deprecated API warnings
- Update to use `fc.string()` instead of `fc.stringOf(fc.char())`
- Use `fc.string({ unit: 'grapheme' })` for Unicode support

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 3.14.0 | 2024 | Initial installation and configuration |

## Resources

- [fast-check Documentation](https://fast-check.dev/)
- [fast-check API Reference](https://fast-check.dev/api-reference/)
- [Property-Based Testing Introduction](https://fast-check.dev/docs/introduction/)
- [Arbitraries Guide](https://fast-check.dev/docs/core-blocks/arbitraries/)

## Support

For questions about property-based testing configuration:
1. Check this document
2. Review `docs/PROPERTY_BASED_TESTING.md`
3. Consult `src/test/pbt-config.js`
4. Check existing PBT test files for examples

---

**Status:** ✅ Configured and operational  
**Last Updated:** 2024  
**Maintained By:** Development Team
