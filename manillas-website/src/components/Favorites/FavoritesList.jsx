import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, X, AlertCircle } from 'lucide-react'
import useFavoritesStore from '../../store/favoritesStore'
import useCartStore from '../../store/cartStore'
import { formatters } from '../../utils/formatters'

const FavoritesList = () => {
  const { favorites, removeFromFavorites, moveToCart, moveAllToCart, clearFavorites } = useFavoritesStore()
  const { addItem } = useCartStore()

  const handleMoveToCart = (productId) => {
    moveToCart(productId, addItem)
  }

  const handleMoveAllToCart = () => {
    moveAllToCart(addItem)
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No tienes favoritos
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Guarda tus productos favoritos para encontrarlos fácilmente más tarde.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Explorar Productos
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mis Favoritos ({favorites.length})
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Productos que has guardado
          </p>
        </div>
        
        <div className="flex gap-3">
          {favorites.length > 0 && (
            <>
              <button
                onClick={handleMoveAllToCart}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar todos al carrito
              </button>
              
              <button
                onClick={clearFavorites}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Limpiar todo
              </button>
            </>
          )}
        </div>
      </div>

      {/* Warning Message */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-200">
              ¡No te los pierdas!
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Los productos en favoritos pueden agotarse. Te recomendamos comprarlos pronto.
            </p>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
              <img
                src={favorite.image}
                alt={favorite.name}
                className="w-full h-full object-cover"
              />
              
              {/* Remove Button */}
              <button
                onClick={() => removeFromFavorites(favorite.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {favorite.name}
              </h3>
              
              <p className="text-xl font-bold text-amber-600 mb-4">
                {formatters.formatPrice(favorite.price, favorite.currency)}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(favorite.id)}
                  className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Agregar al carrito
                </button>
                
                <Link
                  to={`/product/${favorite.id}`}
                  className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-center"
                >
                  Ver detalles
                </Link>
              </div>

              {/* Added Date */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Agregado el {new Date(favorite.addedAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Resumen de favoritos
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {favorites.length} {favorites.length === 1 ? 'producto' : 'productos'} guardados
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Valor total
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatters.formatPrice(
                favorites.reduce((total, item) => total + item.price, 0),
                'USD'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoritesList
