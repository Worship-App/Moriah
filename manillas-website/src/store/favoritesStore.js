import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      
      // Agregar producto a favoritos
      addToFavorites: (product) => {
        const exists = get().favorites.some(item => item.id === product.id)
        
        if (!exists) {
          set({
            favorites: [...get().favorites, {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images?.thumbnail || product.image,
              currency: product.currency,
              addedAt: new Date().toISOString()
            }]
          })
        }
      },
      
      // Remover producto de favoritos
      removeFromFavorites: (productId) => {
        set({
          favorites: get().favorites.filter(item => item.id !== productId)
        })
      },
      
      // Verificar si un producto está en favoritos
      isFavorite: (productId) => {
        return get().favorites.some(item => item.id === productId)
      },
      
      // Alternar favorito
      toggleFavorite: (product) => {
        const isFav = get().isFavorite(product.id)
        
        if (isFav) {
          get().removeFromFavorites(product.id)
        } else {
          get().addToFavorites(product)
        }
      },
      
      // Limpiar todos los favoritos
      clearFavorites: () => {
        set({ favorites: [] })
      },
      
      // Obtener cantidad de favoritos
      getFavoritesCount: () => {
        return get().favorites.length
      },
      
      // Mover favorito al carrito
      moveToCart: (productId, addToCart) => {
        const favorite = get().favorites.find(item => item.id === productId)
        
        if (favorite) {
          addToCart({
            id: favorite.id,
            name: favorite.name,
            price: favorite.price,
            image: favorite.image,
            currency: favorite.currency
          })
          get().removeFromFavorites(productId)
        }
      },
      
      // Mover todos los favoritos al carrito
      moveAllToCart: (addToCart) => {
        const { favorites } = get()
        
        favorites.forEach(favorite => {
          addToCart({
            id: favorite.id,
            name: favorite.name,
            price: favorite.price,
            image: favorite.image,
            currency: favorite.currency
          })
        })
        
        set({ favorites: [] })
      }
    }),
    {
      name: 'favorites-storage',
      partialize: (state) => ({ favorites: state.favorites })
    }
  )
)

export default useFavoritesStore
