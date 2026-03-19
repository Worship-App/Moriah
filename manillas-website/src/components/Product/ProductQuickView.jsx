import React, { useState } from 'react'
import { X, ShoppingCart, Heart, Star, ExternalLink, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageZoom from '../Common/ImageZoom'
import SocialShare from '../Common/SocialShare'
import useCartStore from '../../store/cartStore'
import { formatters } from '../../utils/formatters'

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!isOpen || !product) return null

  const images = product.images?.gallery 
    ? [product.images.main, ...product.images.gallery]
    : [product.images?.main || product.image]

  const currentImage = images[selectedImage]

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.thumbnail || product.image,
      currency: product.currency
    }
    
    for (let i = 0; i < quantity; i++) {
      addItem(productToAdd)
    }
    
    onClose()
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/product/${product.id}`
    : ''

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Vista Rápida
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)] overflow-y-auto">
            {/* Images Section */}
            <div className="lg:w-1/2 p-6">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setSelectedImage(selectedImage)}
                  />
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-amber-500 scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:w-1/2 p-6 space-y-6">
              {/* Product Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating || 4.5}
                    </span>
                  </div>
                  
                  {product.availability?.inStock && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      En stock
                    </span>
                  )}
                </div>

                <p className="text-2xl font-bold text-amber-600 mb-4">
                  {formatters.formatPrice(product.price, product.currency)}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 dark:bg-gray-700 dark:text-white"
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.availability?.inStock}
                  className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.availability?.inStock ? 'Agregar al Carrito' : 'Agotado'}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Detalles
                  </Link>
                  
                  <button className="py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favoritos
                  </button>
                </div>
              </div>

              {/* Product Features */}
              {product.features && (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Características</h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Share */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Compartir</h3>
                <SocialShare
                  url={shareUrl}
                  title={product.name}
                  description={product.description}
                  image={currentImage}
                  compact={true}
                />
              </div>

              {/* Shipping Info */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                  Información de Envío
                </h4>
                <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                  <li>✓ Envío gratis en pedidos mayores a $50</li>
                  <li>✓ Entrega en 2-3 días hábiles</li>
                  <li>✓ Devoluciones gratuitas en 30 días</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductQuickView
