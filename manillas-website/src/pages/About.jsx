import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Common/Button'
import { analyticsService } from '../services/analyticsService'

export default function About() {
  const navigate = useNavigate()

  useEffect(() => {
    analyticsService.trackPageView('about')
  }, [])

  const handleContactClick = () => {
    navigate('/contact')
  }

  return (
    <div className="min-h-screen bg-accent-50">
      {/* Page Header - Premium Hero Section */}
      <section className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-lg md:text-xl text-accent-200 max-w-2xl">
              Descubre la historia, misión y valores que definen nuestro emprendimiento de manillas premium
            </p>
          </div>
        </div>
      </section>

      {/* History Section - 5.2.1 */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-slide-in-left">
              <div className="mb-2 inline-block">
                <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                  Nuestra Trayectoria
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Una Historia de Pasión y Artesanía
              </h2>
              
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Nuestro emprendimiento nace de la pasión genuina por crear manillas artesanales de alta calidad. 
                Cada pieza es diseñada y elaborada con cuidado meticuloso y dedicación absoluta para garantizar 
                la máxima satisfacción de nuestros clientes. Comenzamos con una visión clara: transformar la 
                artesanía tradicional en productos contemporáneos que reflejen elegancia y sofisticación.
              </p>
              
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Desde nuestros inicios, nos hemos comprometido a ofrecer productos premium que no solo sean 
                hermosos, sino que también reflejen el estilo y personalidad única de cada cliente. Combinamos 
                técnicas artesanales ancestrales con diseño moderno, creando piezas que trascienden las tendencias 
                y se convierten en accesorios atemporales.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Hoy, después de años de dedicación y mejora continua, nos enorgullece ser reconocidos por la 
                calidad excepcional de nuestras manillas y por el compromiso inquebrantable con la excelencia 
                en cada aspecto de nuestro negocio.
              </p>
            </div>

            {/* Visual Element */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 h-96 md:h-full rounded-2xl shadow-premium flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-white text-lg font-semibold">Artesanía Premium</p>
                    <p className="text-accent-200 text-sm mt-2">Desde el corazón</p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - 5.2.2 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Nuestro Propósito
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2">
              Misión
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border-l-4 border-primary-500 p-8 md:p-12 rounded-lg animate-fade-in">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                Crear manillas artesanales de alta calidad que reflejen la personalidad y estilo único de cada cliente, 
                combinando técnicas tradicionales con diseño contemporáneo. Nos comprometemos a ofrecer productos 
                excepcionales que trascienden las tendencias y se convierten en accesorios atemporales que nuestros 
                clientes atesoran y comparten con orgullo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - 5.2.3 */}
      <section className="py-16 md:py-24 bg-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Lo que nos define
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Estos principios fundamentales guían cada decisión y acción en nuestro emprendimiento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Value 1: Calidad Premium */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-premium transition-all duration-300 animate-fade-in">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Calidad Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada manilla es elaborada con los mejores materiales y técnicas, garantizando durabilidad 
                y belleza excepcional que perdura en el tiempo.
              </p>
            </div>

            {/* Value 2: Artesanía Auténtica */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-premium transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Artesanía Auténtica</h3>
              <p className="text-gray-600 leading-relaxed">
                Cada pieza es creada manualmente con dedicación y maestría, preservando técnicas 
                tradicionales que le dan carácter único a nuestros productos.
              </p>
            </div>

            {/* Value 3: Atención al Cliente */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-premium transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Atención al Cliente</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos importa cada cliente y su experiencia. Ofrecemos servicio personalizado y 
                soporte excepcional en cada etapa del proceso.
              </p>
            </div>

            {/* Value 4: Innovación Constante */}
            <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-premium transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Innovación Constante</h3>
              <p className="text-gray-600 leading-relaxed">
                Nos mantenemos en evolución continua, explorando nuevos diseños, materiales y 
                técnicas para ofrecer siempre lo mejor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - 5.2.4 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Conoce a nuestro equipo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2">
              El Creador y Equipo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Team Image */}
            <div className="animate-slide-in-left">
              <div className="relative">
                <div className="bg-gradient-to-br from-secondary-900 to-secondary-800 h-96 md:h-full rounded-2xl shadow-premium flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/40 to-transparent"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4">👨‍🎨</div>
                    <p className="text-white text-lg font-semibold">Nuestro Equipo</p>
                    <p className="text-accent-200 text-sm mt-2">Artesanos Dedicados</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Description */}
            <div className="animate-slide-in-right">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
                Pasión por la Excelencia
              </h3>
              
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Nuestro equipo está compuesto por artesanos apasionados y dedicados a crear las mejores 
                manillas del mercado. Cada miembro aporta años de experiencia, creatividad y un compromiso 
                inquebrantable con la calidad.
              </p>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Desde el diseño inicial hasta el acabado final, cada paso es supervisado con atención 
                meticulosa. Nuestro equipo no solo crea productos, sino que crea experiencias y recuerdos 
                que nuestros clientes atesoran.
              </p>

              <div className="bg-accent-50 p-6 rounded-lg mb-6 border-l-4 border-primary-500">
                <p className="text-gray-700 font-medium">
                  <span className="text-primary-500 font-bold">Filosofía:</span> Creemos que la verdadera 
                  artesanía no se trata solo de hacer cosas, sino de hacer cosas con propósito, pasión y perfección.
                </p>
              </div>

              <Button 
                variant="secondary" 
                size="lg"
                onClick={handleContactClick}
                className="w-full md:w-auto"
              >
                Contactar al Equipo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Premium Styling */}
      <section className="py-16 md:py-24 bg-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              Nos diferenciamos por nuestro compromiso con la excelencia en cada aspecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Cada producto pasa por rigurosos controles de calidad para asegurar perfección
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Personalización</h3>
              <p className="text-gray-600">
                Ofrecemos opciones de personalización para crear piezas únicas y especiales
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Relación Duradera</h3>
              <p className="text-gray-600">
                Construimos relaciones a largo plazo basadas en confianza y satisfacción
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="bg-gradient-to-r from-secondary-900 to-secondary-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para descubrir nuestras manillas?
          </h2>
          <p className="text-lg text-accent-200 mb-8 max-w-2xl mx-auto">
            Explora nuestro catálogo completo o contáctanos para consultas personalizadas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/catalog')}
            >
              Ver Catálogo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleContactClick}
              className="border-white text-white hover:bg-white hover:text-secondary-900"
            >
              Contactar
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
