import { useState } from 'react'
import { formatters } from '../../utils/formatters'
import ProductGallery from './ProductGallery'
import config from '../../config/env'

/**
 * ProductDetail Component
 * 
 * Displays complete product information with:
 * - Product gallery with zoom functionality
 * - Complete description
 * - Price with currency formatting
 * - Materials list
 * - Available colors
 * - Availability status with quantity
 * - WhatsApp and email contact buttons
 * - Premium styling with Tailwind CSS
 * - Full responsiveness
 * 
 * Validates: Requirements 2.2, 2.3, 2.4, 5.2, 5.3
 */
export default function ProductDetail({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const isOutOfStock = !product.availability.inStock

  const whatsappUrl = `https://wa.me/${config.businessWhatsapp.replace(/\D/g, '')}?text=Hola, me interesa el producto: ${product.name}`
  const emailUrl = `mailto:${config.businessEmail}?subject=Consulta sobre: ${product.name}`

  return (
    <div className="bg-accent-50 min-h-screen py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 md:mb-12">
          <p className="text-sm text-secondary-600">
            <span className="hover:text-primary-500 cursor-pointer">Catálogo</span>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">{product.name}</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Gallery Section */}
          <div className="animate-fade-in">
            <ProductGallery images={product.images} />
          </div>

          {/* Product Information Section */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              {product.name}
            </h1>

            {/* Product Type Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
              </span>
            </div>

            {/* Price Section */}
            <div className="mb-8 pb-8 border-b border-accent-300">
              <p className="text-secondary-600 text-sm mb-2">Precio</p>
              <p className="text-4xl md:text-5xl font-bold text-primary-500">
                {formatters.formatPrice(product.price, product.currency)}
              </p>
            </div>

            {/* Availability Section */}
            <div className="mb-8 pb-8 border-b border-accent-300">
              <p className="text-secondary-600 text-sm mb-3">Disponibilidad</p>
              <div className="flex items-center gap-3">
                {isOutOfStock ? (
                  <>
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <span className="text-lg font-semibold text-error">Agotado</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span className="text-lg font-semibold text-success">
                      Disponible ({product.availability.quantity} en stock)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Colors Section */}
            <div className="mb-8 pb-8 border-b border-accent-300">
              <p className="text-secondary-600 text-sm mb-4 font-medium">Colores Disponibles</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedColor === color
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-accent-200 text-secondary-700 hover:bg-accent-300'
                    }`}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Materials Section */}
            <div className="mb-8 pb-8 border-b border-accent-300">
              <p className="text-secondary-600 text-sm mb-4 font-medium">Materiales</p>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg text-sm font-medium"
                  >
                    {material.charAt(0).toUpperCase() + material.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8 pb-8 border-b border-accent-300">
              <p className="text-secondary-600 text-sm mb-3 font-medium">Descripción</p>
              <p className="text-secondary-700 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-success-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-success/30 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.119-2.259 3.356-.606 1.605-.949 3.31-.949 5.199 0 1.487.24 2.909.703 4.236l.072.213-.76 2.794 2.8-.764.205.074c1.312.43 2.707.667 4.041.667 1.889 0 3.594-.343 5.199-.949 1.238-.503 2.335-1.236 3.356-2.259 1.02-1.02 1.756-2.119 2.259-3.356.606-1.605.949-3.31.949-5.199 0-1.889-.343-3.594-.949-5.199-.503-1.238-1.236-2.335-2.259-3.356-1.02-1.02-2.119-1.756-3.356-2.259-1.605-.606-3.31-.949-5.199-.949z" />
                </svg>
                <span>Contactar por WhatsApp</span>
              </a>

              {/* Email Button */}
              <a
                href={emailUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary-700 text-white rounded-lg font-semibold hover:bg-secondary-800 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondary-700/30 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Enviar Email</span>
              </a>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-accent-300">
              <p className="text-xs text-secondary-500">
                ID del Producto: <span className="font-mono text-secondary-600">{product.id}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
