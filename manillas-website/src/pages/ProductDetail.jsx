import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/productStore'
import ProductDetail from '../components/Product/ProductDetail'
import Loading from '../components/Common/Loading'
import { analyticsService } from '../services/analyticsService'

/**
 * ProductDetail Page Component
 * 
 * Displays complete product information with:
 * - Product gallery with zoom
 * - Full description, price, materials
 * - Availability status
 * - Contact buttons (WhatsApp, email)
 * - Back to catalog navigation
 * - Error handling for product not found
 * - Premium styling and animations
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 5.2, 5.3
 */
export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, loading, fetchProducts } = useProductStore()
  const [product, setProduct] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    analyticsService.trackPageView('product_detail', { productId: id })
  }, [id])

  useEffect(() => {
    const loadProduct = async () => {
      // Ensure products are loaded
      if (products.length === 0) {
        await fetchProducts()
      }

      // Find product by ID
      const foundProduct = products.find(p => p.id === id)
      if (foundProduct) {
        setProduct(foundProduct)
        setNotFound(false)
      } else {
        setNotFound(true)
      }
    }

    loadProduct()
  }, [id, products, fetchProducts])

  if (loading && !product) {
    return <Loading message="Cargando producto..." />
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-20 h-20 md:w-24 md:h-24 text-secondary-300 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
            Producto no encontrado
          </h1>
          <p className="text-secondary-600 text-lg mb-8">
            Lo sentimos, el producto que buscas no existe o ha sido removido.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al Catálogo
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div>
      {/* Back Button */}
      <div className="bg-accent-50 border-b border-accent-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al Catálogo
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <ProductDetail product={product} />
    </div>
  )
}
