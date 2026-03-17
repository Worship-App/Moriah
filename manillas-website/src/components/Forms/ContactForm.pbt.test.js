import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { z } from 'zod'

/**
 * Property-Based Tests for ContactForm Validation
 * **Validates: Requirements 6.2, 6.3**
 */

const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(5, 'El email debe tener al menos 5 caracteres'),
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no puede exceder 200 caracteres'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'El mensaje no puede exceder 5000 caracteres'),
})

describe('ContactForm Validation - Property-Based Tests', () => {
  /**
   * Property 1: Valid names are always accepted
   * For any string with length >= 2 and <= 100, validation should pass
   */
  it('should accept all valid names (length 2-100)', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { minLength: 2, maxLength: 100 }),
        (name) => {
          const validEmail = 'test@example.com'
          const validSubject = 'Valid Subject'
          const validMessage = 'This is a valid message'

          const result = contactFormSchema.safeParse({
            name,
            email: validEmail,
            subject: validSubject,
            message: validMessage,
          })

          expect(result.success).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 2: Invalid names are always rejected
   * For any string with length < 2 or > 100, validation should fail
   */
  it('should reject all invalid names (length < 2 or > 100)', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { maxLength: 1 }),
          fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { minLength: 101 })
        ),
        (name) => {
          const validEmail = 'test@example.com'
          const validSubject = 'Valid Subject'
          const validMessage = 'This is a valid message'

          const result = contactFormSchema.safeParse({
            name,
            email: validEmail,
            subject: validSubject,
            message: validMessage,
          })

          expect(result.success).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 3: Valid subjects are always accepted
   * For any string with length >= 5 and <= 200, validation should pass
   */
  it('should accept all valid subjects (length 5-200)', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { minLength: 5, maxLength: 200 }),
        (subject) => {
          const validName = 'John Doe'
          const validEmail = 'test@example.com'
          const validMessage = 'This is a valid message'

          const result = contactFormSchema.safeParse({
            name: validName,
            email: validEmail,
            subject,
            message: validMessage,
          })

          expect(result.success).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 4: Invalid subjects are always rejected
   * For any string with length < 5 or > 200, validation should fail
   */
  it('should reject all invalid subjects (length < 5 or > 200)', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { maxLength: 4 }),
          fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { minLength: 201 })
        ),
        (subject) => {
          const validName = 'John Doe'
          const validEmail = 'test@example.com'
          const validMessage = 'This is a valid message'

          const result = contactFormSchema.safeParse({
            name: validName,
            email: validEmail,
            subject,
            message: validMessage,
          })

          expect(result.success).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 5: Valid messages are always accepted
   * For any string with length >= 10 and <= 5000, validation should pass
   */
  it('should accept all valid messages (length 10-5000)', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { minLength: 10, maxLength: 5000 }),
        (message) => {
          const validName = 'John Doe'
          const validEmail = 'test@example.com'
          const validSubject = 'Valid Subject'

          const result = contactFormSchema.safeParse({
            name: validName,
            email: validEmail,
            subject: validSubject,
            message,
          })

          expect(result.success).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 6: Invalid messages are always rejected
   * For any string with length < 10 or > 5000, validation should fail
   */
  it('should reject all invalid messages (length < 10 or > 5000)', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { maxLength: 9 }),
          fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { minLength: 5001 })
        ),
        (message) => {
          const validName = 'John Doe'
          const validEmail = 'test@example.com'
          const validSubject = 'Valid Subject'

          const result = contactFormSchema.safeParse({
            name: validName,
            email: validEmail,
            subject: validSubject,
            message,
          })

          expect(result.success).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 7: Validation errors are specific to the invalid field
   * For any invalid field, the error should reference that specific field
   */
  it('should provide specific error messages for invalid fields', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r'), { maxLength: 1 }),
        (invalidName) => {
          const result = contactFormSchema.safeParse({
            name: invalidName,
            email: 'test@example.com',
            subject: 'Valid Subject',
            message: 'This is a valid message',
          })

          expect(result.success).toBe(false)
          if (!result.success) {
            const nameError = result.error.issues.find(issue => issue.path[0] === 'name')
            expect(nameError).toBeDefined()
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 8: Email validation rejects strings without @ symbol
   * For any string without @, validation should fail
   */
  it('should reject emails without @ symbol', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.char().filter(c => c !== '\n' && c !== '\r' && c !== '@'), { minLength: 5, maxLength: 50 }),
        (email) => {
          const validName = 'John Doe'
          const validSubject = 'Valid Subject'
          const validMessage = 'This is a valid message'

          const result = contactFormSchema.safeParse({
            name: validName,
            email,
            subject: validSubject,
            message: validMessage,
          })

          expect(result.success).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 9: All fields must be non-empty strings
   * For any empty field, validation should fail
   */
  it('should reject forms with empty fields', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant({ name: '', email: 'test@example.com', subject: 'Valid Subject', message: 'This is a valid message' }),
          fc.constant({ name: 'John Doe', email: '', subject: 'Valid Subject', message: 'This is a valid message' }),
          fc.constant({ name: 'John Doe', email: 'test@example.com', subject: '', message: 'This is a valid message' }),
          fc.constant({ name: 'John Doe', email: 'test@example.com', subject: 'Valid Subject', message: '' })
        ),
        (formData) => {
          const result = contactFormSchema.safeParse(formData)
          expect(result.success).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 10: Validation is consistent across multiple runs
   * For the same input, validation result should always be the same
   */
  it('should produce consistent validation results', () => {
    const testData = {
      name: 'John Doe',
      email: 'test@example.com',
      subject: 'Valid Subject',
      message: 'This is a valid message',
    }

    const result1 = contactFormSchema.safeParse(testData)
    const result2 = contactFormSchema.safeParse(testData)
    const result3 = contactFormSchema.safeParse(testData)

    expect(result1.success).toBe(result2.success)
    expect(result2.success).toBe(result3.success)
    expect(result1.success).toBe(true)
  })
})
