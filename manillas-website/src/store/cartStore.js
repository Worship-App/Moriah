import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      // Agregar producto al carrito
      addItem: (product) => {
        const existingItem = get().items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: get().items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }]
          })
        }
      },
      
      // Remover producto del carrito
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        })
      },
      
      // Actualizar cantidad
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        })
      },
      
      // Limpiar carrito
      clearCart: () => {
        set({ items: [] })
      },
      
      // Toggle carrito
      toggleCart: () => {
        set({ isOpen: !get().isOpen })
      },
      
      // Cerrar carrito
      closeCart: () => {
        set({ isOpen: false })
      },
      
      // Calcular total
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      },
      
      // Obtener cantidad total de items
      getTotalItems: () => {
        return get().items.reduce((total, item) => {
          return total + item.quantity
        }, 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)

export default useCartStore
