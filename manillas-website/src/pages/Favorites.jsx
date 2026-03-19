import React from 'react'
import { Heart } from 'lucide-react'
import FavoritesList from '../components/Favorites/FavoritesList'

const Favorites = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mis Favoritos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Gestiona tu lista de deseos y mantén un registro de los productos que te encantan
          </p>
        </div>

        {/* Favorites List */}
        <FavoritesList />
      </div>
    </div>
  )
}

export default Favorites
