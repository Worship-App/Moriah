/**
 * useFilters Hook
 * Custom hook for managing filters
 */

import { useMemo } from 'react'
import { useFilterStore } from '../store/filterStore'
import { useProductStore } from '../store/productStore'

export const useFilters = () => {
  const filters = useFilterStore((state) => state.filters)
  const products = useProductStore((state) => state.products)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by type
      if (filters.type.length > 0 && !filters.type.includes(product.type)) {
        return false
      }

      // Filter by color
      if (filters.color.length > 0) {
        const hasColor = filters.color.some(color => product.colors.includes(color))
        if (!hasColor) return false
      }

      // Filter by price range
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false
      }

      // Filter by materials
      if (filters.materials.length > 0) {
        const hasMaterial = filters.materials.some(material => product.materials.includes(material))
        if (!hasMaterial) return false
      }

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(query)
        const matchesDescription = product.description.toLowerCase().includes(query)
        if (!matchesName && !matchesDescription) return false
      }

      return true
    })
  }, [products, filters])

  return { filteredProducts, filters }
}
