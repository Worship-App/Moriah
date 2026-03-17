/**
 * Product Service
 * Handles all product-related API calls and data operations
 */

import { products } from '../data/products'

export const productService = {
  /**
   * Get all products
   */
  async getAll() {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
      // return response.json()
      return products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  /**
   * Get product by ID
   */
  async getById(id) {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      // return response.json()
      return products.find(p => p.id === id)
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts() {
    try {
      const allProducts = await this.getAll()
      return allProducts.filter(p => p.featured)
    } catch (error) {
      console.error('Error fetching featured products:', error)
      throw error
    }
  },

  /**
   * Search products by text
   */
  async searchProducts(query) {
    try {
      const allProducts = await this.getAll()
      const lowerQuery = query.toLowerCase()
      return allProducts.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      )
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  },

  /**
   * Filter products by criteria
   */
  async filterProducts(criteria) {
    try {
      let filtered = await this.getAll()

      if (criteria.type) {
        filtered = filtered.filter(p => p.type === criteria.type)
      }

      if (criteria.color) {
        filtered = filtered.filter(p => p.colors.includes(criteria.color))
      }

      if (criteria.material) {
        filtered = filtered.filter(p => p.materials.includes(criteria.material))
      }

      if (criteria.minPrice !== undefined && criteria.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= criteria.minPrice && p.price <= criteria.maxPrice)
      }

      if (criteria.inStock !== undefined) {
        filtered = filtered.filter(p => p.availability.inStock === criteria.inStock)
      }

      return filtered
    } catch (error) {
      console.error('Error filtering products:', error)
      throw error
    }
  },
}
