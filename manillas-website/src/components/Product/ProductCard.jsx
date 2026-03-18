import { Link } from 'react-router-dom'
import { formatters } from '../../utils/formatters'

/**
 * ProductCard Component
 * 
 * Displays a premium product card with:
 * - Product image with hover effect
 * - Product name and price
 * - Brief description (truncated)
 * - Availability status badge
 * - "View Details" button
 * - Premium styling with Tailwind CSS
 * - Hover lift effect
 * - Smooth entrance animation
 * - Full responsiveness (mobile, tablet, desktop)
 */
export default function ProductCard({ product }) {
  const isOutOfStock = !product.availability.inStock

  return (
    <div className="animate-fade-in">
      <Link
        to={`/product/${product.id}`}
        className="group block h-full"
      >
        <div className="h-full bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 flex flex-col border-2 border-amber-200 dark:border-amber-600/30 hover:border-amber-400 dark:hover:border-amber-500 transform hover:-translate-y-2">
          {/* Image Container con efecto premium */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-amber-50 h-56 sm:h-64 md:h-72">
            <img
              src={product.images.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />

            {/* Overlay dorado sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Availability Badge con diseño premium */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              {isOutOfStock ? (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg border-2 border-red-400">
                  ❌ Agotado
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg border-2 border-green-400 animate-pulse">
                  ✓ Disponible
                </span>
              )}
            </div>

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
            )}
          </div>

          {/* Content Container con diseño premium */}
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-amber-50/20">
            {/* Product Name con efecto dorado */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-yellow-600 transition-all duration-300">
              {product.name}
            </h3>

            {/* Product Description */}
            <p className="text-xs sm:text-sm text-secondary-600 mb-4 line-clamp-2 flex-grow">
              {formatters.truncateText(product.description, 80)}
            </p>

            {/* Price and Details con diseño premium */}
            <div className="flex items-center justify-between mb-4 pt-3 border-t-2 border-amber-200">
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600">
                {formatters.formatPrice(product.price, product.currency)}
              </span>
              <span className="text-xs sm:text-sm px-3 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 font-bold rounded-full border border-amber-300">
                {product.type}
              </span>
            </div>

            {/* View Details Button con diseño dorado premium */}
            <button
              className={`w-full py-3 sm:py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                isOutOfStock
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl hover:shadow-amber-500/50 active:scale-95 transform hover:scale-105 border-2 border-amber-400'
              }`}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'No Disponible' : '✨ Ver Detalles'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
