import { useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useFilterStore } from '../store/filterStore'
import ProductCard from '../components/Product/ProductCard'
import ProductFilters from '../components/Product/ProductFilters'
import Loading from '../components/Common/Loading'
import { analyticsService } from '../services/analyticsService'

/**
 * Catalog Page Component
 * 
 * Displays a premium catalog of 4 handmade bracelets with:
 * - Responsive grid layout (1 col mobile, 2 tablet, 3-4 desktop)
 * - Product filtering and search
 * - Loading state
 * - Empty state message
 * - Premium styling with animations
 * - Full responsiveness
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 3.2, 3.3, 3.4, 7.1-7.4
 */
export default function Catalog() {
  const { products, loading } = useProducts()
  const getFilteredProducts = useFilterStore((state) => state.getFilteredProducts)

  useEffect(() => {
    analyticsService.trackPageView('catalog')
  }, [])

  const filteredProducts = getFilteredProducts(products)

  return (
    <div className="min-h-screen bg-accent-50">
      {/* Page Header - Premium Section */}
      <section className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent-200 max-w-2xl">
              Explora nuestra colección completa de manillas artesanales premium, diseñadas con maestría y elegancia
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <ProductFilters />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <Loading message="Cargando productos..." />
              ) : filteredProducts.length > 0 ? (
                <div>
                  {/* Results Count */}
                  <div className="mb-6 md:mb-8">
                    <p className="text-sm md:text-base text-secondary-600 font-medium">
                      Mostrando {filteredProducts.length} de {products.length} productos
                    </p>
                  </div>

                  {/* Products Grid - Responsive Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-fade-in"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 md:py-16 lg:py-20">
                  <div className="inline-block">
                    <svg
                      className="w-16 h-16 md:w-20 md:h-20 text-secondary-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p className="text-base md:text-lg text-secondary-600 font-medium mb-2">
                    No se encontraron productos
                  </p>
                  <p className="text-sm md:text-base text-secondary-500">
                    Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
