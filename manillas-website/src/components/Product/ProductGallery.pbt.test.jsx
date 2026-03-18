import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import fc from 'fast-check'
import ProductGallery from './ProductGallery'

/**
 * Property-Based Tests for ProductGallery
 * **Validates: Requirements 2.3**
 */

// Helper to generate image URL strings (alphanumeric only to avoid URL encoding issues)
const imageUrlArbitrary = () => 
  fc.string({ minLength: 10, maxLength: 50, unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-_'.split('')) })
    .map(s => `/images/${s}.jpg`)

describe('ProductGallery - Property-Based Tests', () => {
  /**
   * Property 18: Images load and are viewable in high resolution
   * For any product detail view, all product images should load successfully
   * and be viewable in high resolution through a gallery or zoom feature.
   * 
   * This property verifies that the gallery component renders all images
   * (main image + all gallery images) in the DOM.
   */
  it('should render all images (main + gallery) in the DOM', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary image URLs for main and gallery
        imageUrlArbitrary(),
        fc.array(imageUrlArbitrary(), { minLength: 1, maxLength: 10 }),
        (mainImage, galleryImages) => {
          const images = {
            main: mainImage,
            gallery: galleryImages,
          }

          const { container } = render(<ProductGallery images={images} />)

          // Get all img elements in the component
          const imgElements = container.querySelectorAll('img')

          // Total expected images: 1 main display + 1 main thumbnail + gallery thumbnails
          const expectedImageCount = 1 + 1 + galleryImages.length

          // Verify that the correct number of images are rendered
          expect(imgElements.length).toBe(expectedImageCount)

          // Verify that the main image is displayed in the large view
          const mainDisplayImage = imgElements[0]
          // Browser URL-encodes the src, so we need to decode or check differently
          const decodedSrc = decodeURIComponent(mainDisplayImage.src)
          expect(decodedSrc).toContain(mainImage)

          // Verify that all gallery images are present in thumbnails
          const thumbnailImages = Array.from(imgElements).slice(1)
          const thumbnailSrcs = thumbnailImages.map(img => decodeURIComponent(img.src))

          // Main image should be in thumbnails
          expect(thumbnailSrcs.some(src => src.includes(mainImage))).toBe(true)

          // All gallery images should be in thumbnails
          galleryImages.forEach(galleryImage => {
            expect(thumbnailSrcs.some(src => src.includes(galleryImage))).toBe(true)
          })
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Gallery always includes the main image
   * For any product images object, the main image should always be
   * accessible in the gallery (as a thumbnail).
   */
  it('should always include main image as a selectable thumbnail', () => {
    fc.assert(
      fc.property(
        imageUrlArbitrary(),
        fc.array(imageUrlArbitrary(), { minLength: 1, maxLength: 10 }),
        (mainImage, galleryImages) => {
          const images = {
            main: mainImage,
            gallery: galleryImages,
          }

          const { container } = render(<ProductGallery images={images} />)

          // Get all thumbnail buttons
          const thumbnailButtons = container.querySelectorAll('button')

          // Should have at least one button (for main image)
          expect(thumbnailButtons.length).toBeGreaterThan(0)

          // First button should be for the main image
          const firstButton = thumbnailButtons[0]
          const firstButtonImg = firstButton.querySelector('img')
          expect(firstButtonImg).toBeTruthy()
          const decodedSrc = decodeURIComponent(firstButtonImg.src)
          expect(decodedSrc).toContain(mainImage)
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Gallery renders correct number of thumbnails
   * For any product images object, the number of thumbnail buttons
   * should equal 1 (main) + gallery.length.
   */
  it('should render correct number of thumbnail buttons', () => {
    fc.assert(
      fc.property(
        imageUrlArbitrary(),
        fc.array(imageUrlArbitrary(), { minLength: 0, maxLength: 10 }),
        (mainImage, galleryImages) => {
          const images = {
            main: mainImage,
            gallery: galleryImages,
          }

          const { container } = render(<ProductGallery images={images} />)

          // Get all thumbnail buttons
          const thumbnailButtons = container.querySelectorAll('button')

          // Expected: 1 button for main + 1 button per gallery image
          const expectedButtonCount = 1 + galleryImages.length

          expect(thumbnailButtons.length).toBe(expectedButtonCount)
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: All gallery images are unique in the DOM
   * For any set of unique image URLs, each image should appear
   * exactly once in the thumbnail list (no duplicates).
   */
  it('should not duplicate images when all URLs are unique', () => {
    fc.assert(
      fc.property(
        imageUrlArbitrary(),
        fc.uniqueArray(imageUrlArbitrary(), { minLength: 1, maxLength: 10 }),
        (mainImage, galleryImages) => {
          // Ensure main image is not in gallery to guarantee uniqueness
          const uniqueGalleryImages = galleryImages.filter(img => img !== mainImage)

          const images = {
            main: mainImage,
            gallery: uniqueGalleryImages,
          }

          const { container } = render(<ProductGallery images={images} />)

          // Get all thumbnail images
          const thumbnailButtons = container.querySelectorAll('button')
          const thumbnailImgs = Array.from(thumbnailButtons).map(btn => 
            decodeURIComponent(btn.querySelector('img').src)
          )

          // Create a set to check for duplicates
          const uniqueSrcs = new Set(thumbnailImgs)

          // Number of unique sources should equal total number of thumbnails
          expect(uniqueSrcs.size).toBe(thumbnailImgs.length)
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: Gallery handles empty gallery array
   * For any product with only a main image and empty gallery array,
   * the component should still render correctly with just the main image.
   */
  it('should handle empty gallery array gracefully', () => {
    fc.assert(
      fc.property(
        imageUrlArbitrary(),
        (mainImage) => {
          const images = {
            main: mainImage,
            gallery: [],
          }

          const { container } = render(<ProductGallery images={images} />)

          // Should render the main display image
          const imgElements = container.querySelectorAll('img')
          expect(imgElements.length).toBeGreaterThan(0)

          // Main display should show the main image
          const mainDisplayImage = imgElements[0]
          const decodedSrc = decodeURIComponent(mainDisplayImage.src)
          expect(decodedSrc).toContain(mainImage)

          // Should have exactly 1 thumbnail button (for main image only)
          const thumbnailButtons = container.querySelectorAll('button')
          expect(thumbnailButtons.length).toBe(1)
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property: All images have valid src attributes
   * For any product images, all rendered img elements should have
   * non-empty src attributes.
   */
  it('should render all images with valid src attributes', () => {
    fc.assert(
      fc.property(
        imageUrlArbitrary(),
        fc.array(imageUrlArbitrary(), { minLength: 1, maxLength: 10 }),
        (mainImage, galleryImages) => {
          const images = {
            main: mainImage,
            gallery: galleryImages,
          }

          const { container } = render(<ProductGallery images={images} />)

          // Get all img elements
          const imgElements = container.querySelectorAll('img')

          // Every image should have a non-empty src attribute
          imgElements.forEach(img => {
            expect(img.src).toBeTruthy()
            expect(img.src.length).toBeGreaterThan(0)
          })
        }
      ),
      { numRuns: 20 }
    )
  })
})

