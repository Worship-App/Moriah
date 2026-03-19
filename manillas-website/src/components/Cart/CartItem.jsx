import React from 'react'
import { X, Plus, Minus } from 'lucide-react'
import useCartStore from '../../store/cartStore'

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore()

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Imagen del producto */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
        <p className="text-sm font-medium text-primary-600 mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Reducir cantidad"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={handleRemove}
        className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-red-500 transition-colors"
        aria-label="Eliminar producto"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default CartItem
