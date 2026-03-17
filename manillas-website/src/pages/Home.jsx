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
      <section className="relative overflow-hidden bg-secondary-900 text-white py-24 sm:py-32 md:py-40">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 opacity-90" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Moriah <span className="text-primary-500">Premium</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-accent-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra colección exclusiva de manillas artesanales de alta calidad, diseñadas para reflejar tu estilo único
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleCatalogClick}
                className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-primary-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Ver Catálogo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleContactClick}
                className="w-full sm:w-auto border-accent-200 text-accent-200 hover:bg-accent-200 hover:text-secondary-900 transition-all duration-300"
              >
                Contactar Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Brief Description */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-slide-in-left">
              <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
                Sobre Nuestro <span className="text-primary-500">Emprendimiento</span>
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
                className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Conocer Más Sobre Nosotros
              </Button>
            </div>

            {/* Visual Element */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl blur-2xl opacity-20" />
                <div className="relative bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl p-12 shadow-xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <h3 className="text-2xl font-bold text-secondary-900 mb-2">Calidad Premium</h3>
                    <p className="text-secondary-600">Diseño artesanal con materiales de primera calidad</p>
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
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 text-center mb-16">
            ¿Por Qué Elegirnos?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="animate-slide-in-up text-center p-8 rounded-xl bg-accent-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">Diseño Exclusivo</h3>
              <p className="text-secondary-600">Cada manilla es diseñada con atención al detalle y creatividad artesanal</p>
            </div>

            {/* Feature 2 */}
            <div className="animate-slide-in-up text-center p-8 rounded-xl bg-accent-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{ animationDelay: '100ms' }}>
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">Materiales Premium</h3>
              <p className="text-secondary-600">Utilizamos solo materiales de primera calidad para garantizar durabilidad</p>
            </div>

            {/* Feature 3 */}
            <div className="animate-slide-in-up text-center p-8 rounded-xl bg-accent-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{ animationDelay: '200ms' }}>
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-3">Atención Personalizada</h3>
              <p className="text-secondary-600">Estamos aquí para ayudarte a encontrar la manilla perfecta para ti</p>
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
