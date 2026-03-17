/**
 * Product Store
 * Zustand store for managing product state
 */

import { create } from 'zustand'
import { productService } from '../services/productService'

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  /**
   * Fetch all products
   */
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const products = await productService.getAll()
      set({ products, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Get product by ID
   */
  getProductById: (id) => {
    const state = get()
    return state.products.find(p => p.id === id)
  },

  /**
   * Get featured products
   */
  getFeaturedProducts: () => {
    const state = get()
    return state.products.filter(p => p.featured)
  },

  /**
   * Search products
   */
  searchProducts: async (query) => {
    set({ loading: true, error: null })
    try {
      const products = await productService.searchProducts(query)
      set({ products, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Filter products
   */
  filterProducts: async (criteria) => {
    set({ loading: true, error: null })
    try {
      const products = await productService.filterProducts(criteria)
      set({ products, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Clear error
   */
  clearError: () => set({ error: null }),
}))
