import React from 'react'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCartStore from '../../store/cartStore'
import CartItem from './CartItem'

const Cart = () => {
  const { items, isOpen, toggleCart, closeCart, getTotal, getTotalItems, clearCart } = useCartStore()

  const total = getTotal()
  const totalItems = getTotalItems()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Panel del carrito */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold">
                Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-gray-600 mb-6">
                  Agrega algunos productos para comenzar
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            ) : (
              <div className="py-2">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Resumen */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Acciones */}
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full px-6 py-3 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Proceder al checkout
                </Link>
                
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Vaciar carrito
                  </button>
                  <button
                    onClick={closeCart}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
