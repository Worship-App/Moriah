/**
 * Filter Store
 * Zustand store for managing filter state
 */

import { create } from 'zustand'

export const useFilterStore = create((set, get) => ({
  filters: {
    type: [],
    color: [],
    priceRange: { min: 0, max: 1000000 },
    materials: [],
    searchQuery: '',
  },

  /**
   * Set filter
   */
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }))
  },

  /**
   * Add filter value
   */
  addFilterValue: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: [...state.filters[filterName], value],
      },
    }))
  },

  /**
   * Remove filter value
   */
  removeFilterValue: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: state.filters[filterName].filter(v => v !== value),
      },
    }))
  },

  /**
   * Clear all filters
   */
  clearFilters: () => {
    set({
      filters: {
        type: [],
        color: [],
        priceRange: { min: 0, max: 1000000 },
        materials: [],
        searchQuery: '',
      },
    })
  },

  /**
   * Set search query
   */
  setSearchQuery: (query) => {
    set((state) => ({
      filters: {
        ...state.filters,
        searchQuery: query,
      },
    }))
  },

  /**
   * Get filtered products
   */
  getFilteredProducts: (products) => {
    const state = get()
    const { type, color, priceRange, materials, searchQuery } = state.filters

    let filtered = [...products]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Filter by type
    if (type.length > 0) {
      filtered = filtered.filter(p => type.includes(p.type))
    }

    // Filter by color
    if (color.length > 0) {
      filtered = filtered.filter(p =>
        color.some(c => p.colors.includes(c))
      )
    }

    // Filter by price range
    filtered = filtered.filter(p =>
      p.price >= priceRange.min && p.price <= priceRange.max
    )

    // Filter by materials
    if (materials.length > 0) {
      filtered = filtered.filter(p =>
        materials.some(m => p.materials.includes(m))
      )
    }

    return filtered
  },
}))
