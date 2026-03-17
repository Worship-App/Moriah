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
        <div className="h-full bg-accent-50 rounded-xl overflow-hidden shadow-lg hover-lift transition-all duration-300 flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-secondary-100 h-56 sm:h-64 md:h-72">
            <img
              src={product.images.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />

            {/* Availability Badge */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              {isOutOfStock ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-error text-white shadow-lg">
                  Agotado
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-success text-white shadow-lg">
                  Disponible
                </span>
              )}
            </div>

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
            )}
          </div>

          {/* Content Container */}
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
            {/* Product Name */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors duration-300">
              {product.name}
            </h3>

            {/* Product Description */}
            <p className="text-xs sm:text-sm text-secondary-600 mb-4 line-clamp-2 flex-grow">
              {formatters.truncateText(product.description, 80)}
            </p>

            {/* Price and Details */}
            <div className="flex items-center justify-between mb-4 pt-2 border-t border-accent-300">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-500">
                {formatters.formatPrice(product.price, product.currency)}
              </span>
              <span className="text-xs sm:text-sm text-secondary-500 font-medium">
                {product.type}
              </span>
            </div>

            {/* View Details Button */}
            <button
              className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                isOutOfStock
                  ? 'bg-secondary-300 text-secondary-600 cursor-not-allowed opacity-75'
                  : 'bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg hover:shadow-primary-500/30 active:scale-95'
              }`}
              disabled={isOutOfStock}
            >
              Ver Detalles
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
