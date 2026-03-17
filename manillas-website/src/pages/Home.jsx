import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/Product/ProductCard'
import Loading from '../components/Common/Loading'
import Button from '../components/Common/Button'
import { analyticsService } from '../services/analyticsService'

export default function Home() {
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const getFeaturedProducts = useProductStore((state) => state.getFeaturedProducts)

  useEffect(() => {
    analyticsService.trackPageView('home')
  }, [])

  const featuredProducts = getFeaturedProducts()

  const handleCatalogClick = () => {
    navigate('/catalog')
  }

  const handleContactClick = () => {
    navigate('/contact')
  }

  const handleAboutClick = () => {
    navigate('/about')
  }

  return (
    <div className="min-h-screen bg-accent-50">
      {/* Hero Banner - Premium Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-black text-white py-24 sm:py-32 md:py-40">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-block mb-6 px-6 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-sm font-semibold backdrop-blur-sm">
              ✨ Colección Premium 2024
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
                Moriah
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
                Premium
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra colección exclusiva de manillas artesanales de alta calidad, diseñadas para reflejar tu estilo único
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleCatalogClick}
                className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300 border-0"
              >
                <span className="flex items-center gap-2">
                  Ver Catálogo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleContactClick}
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                Contactar Ahora
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section - Brief Description */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-slide-in-left">
              <div className="inline-block mb-4 px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                Sobre Nosotros
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
                Artesanía que{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600">
                  Inspira
                </span>
              </h2>
              <p className="text-lg text-secondary-600 mb-4 leading-relaxed">
                Somos un emprendimiento dedicado a la creación de manillas artesanales de alta calidad. Cada pieza es diseñada y elaborada con cuidado meticuloso para garantizar la máxima satisfacción de nuestros clientes.
              </p>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Nuestro compromiso es ofrecer productos premium que reflejen tu estilo y personalidad, combinando diseño elegante con materiales de primera calidad.
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleAboutClick}
                className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
              >
                <span className="flex items-center gap-2">
                  Conocer Más
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Visual Element */}
            <div className="animate-slide-in-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 shadow-2xl border border-gray-100 group-hover:shadow-primary-500/20 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">✨</div>
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-900 to-secondary-700 mb-3">Calidad Premium</h3>
                    <p className="text-secondary-600 text-lg">Diseño artesanal con materiales de primera calidad</p>
                    <div className="mt-6 flex justify-center gap-4">
                      <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-4">
              Productos <span className="text-primary-500">Destacados</span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explora nuestra selección de manillas premium, cuidadosamente elegidas para ti
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <Loading message="Cargando productos..." />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-secondary-600">No hay productos destacados disponibles en este momento</p>
            </div>
          )}

          {/* View All Products CTA */}
          <div className="text-center mt-16">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleCatalogClick}
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Ver Todos los Productos
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-600 rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Nuestras Ventajas
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-secondary-900">¿Por Qué</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600">
                Elegirnos?
              </span>
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Descubre lo que nos hace únicos en el mundo de las manillas artesanales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group animate-slide-in-up text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="inline-block p-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-5xl">🎨</div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">Diseño Exclusivo</h3>
              <p className="text-secondary-600 leading-relaxed">Cada manilla es diseñada con atención al detalle y creatividad artesanal</p>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto" />
            </div>

            {/* Feature 2 */}
            <div className="group animate-slide-in-up text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100" style={{ animationDelay: '100ms' }}>
              <div className="inline-block p-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-5xl">💎</div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">Materiales Premium</h3>
              <p className="text-secondary-600 leading-relaxed">Utilizamos solo materiales de primera calidad para garantizar durabilidad</p>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto" />
            </div>

            {/* Feature 3 */}
            <div className="group animate-slide-in-up text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100" style={{ animationDelay: '200ms' }}>
              <div className="inline-block p-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-5xl">🤝</div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">Atención Personalizada</h3>
              <p className="text-secondary-600 leading-relaxed">Estamos aquí para ayudarte a encontrar la manilla perfecta para ti</p>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-secondary-900 text-white py-16 sm:py-20 md:py-24">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 opacity-90" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              ¿Listo para encontrar tu manilla <span className="text-primary-500">perfecta</span>?
            </h2>
            <p className="text-lg sm:text-xl text-accent-200 mb-10 max-w-2xl mx-auto">
              Explora nuestro catálogo completo y descubre todas nuestras opciones premium
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleCatalogClick}
                className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-primary-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Ir al Catálogo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleContactClick}
                className="w-full sm:w-auto border-accent-200 text-accent-200 hover:bg-accent-200 hover:text-secondary-900 transition-all duration-300"
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
