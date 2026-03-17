import { useEffect } from 'react'
import ContactForm from '../components/Forms/ContactForm'
import ContactChannels from '../components/Contact/ContactChannels'
import { analyticsService } from '../services/analyticsService'

export default function Contact() {
  useEffect(() => {
    analyticsService.trackPageView('contact')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-lg md:text-xl text-gray-100">
            Ponte en contacto con nosotros a través de múltiples canales
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Envíanos un Mensaje</h2>
              <p className="text-gray-600 mb-6">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Información de Contacto</h2>

              {/* Direct Contact Channels */}
              <div className="mb-8">
                <ContactChannels />
              </div>

              {/* Hours */}
              <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 hover:border-primary transition-colors">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.828 2.829a1 1 0 101.415 1.415L9 10.586V6z" clipRule="evenodd" />
                  </svg>
                  Horario de Atención
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Lunes - Viernes:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sábado:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Domingo:</span>
                    <span className="text-red-600">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 hover:border-blue-400 transition-colors">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ubicación
                </h3>
                <p className="text-gray-700 mb-4">
                  Estamos ubicados en el corazón de la ciudad, en un espacio dedicado a la artesanía de calidad.
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Dirección:</span> Calle Principal 123, Apartado 456
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ciudad:</span> Tu Ciudad, País
                  </p>
                </div>
              </div>

              {/* Response Time Info */}
              <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tiempo de Respuesta
                </h3>
                <p className="text-sm text-gray-700">
                  Respondemos a todos los mensajes dentro de <span className="font-bold text-green-600">24 horas</span> durante días hábiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">Preguntas Frecuentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-primary mb-3">¿Cuál es el tiempo de entrega?</h3>
              <p className="text-gray-600">
                Los pedidos se preparan en 3-5 días hábiles. El envío depende de tu ubicación.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-primary mb-3">¿Aceptan personalizaciones?</h3>
              <p className="text-gray-600">
                Sí, ofrecemos personalizaciones en diseño, materiales y grabados. Contáctanos para más detalles.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-primary mb-3">¿Cuál es la política de devoluciones?</h3>
              <p className="text-gray-600">
                Aceptamos devoluciones dentro de 30 días si el producto no cumple con tus expectativas.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-primary mb-3">¿Ofrecen garantía?</h3>
              <p className="text-gray-600">
                Todos nuestros productos incluyen garantía de 1 año contra defectos de fabricación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Tienes más preguntas?</h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            No dudes en contactarnos. Estamos aquí para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Enviar Mensaje
            </a>
            <a
              href={`https://wa.me/${import.meta.env.VITE_BUSINESS_WHATSAPP?.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.119-2.259 3.356-.506 1.238-.749 2.565-.949 4.255-.2 1.69-.2 3.39 0 5.08.2 1.69.443 3.017.949 4.255.503 1.238 1.239 2.335 2.259 3.356 1.02 1.02 2.119 1.756 3.356 2.259 1.238.506 2.565.749 4.255.949 1.69.2 3.39.2 5.08 0 1.69-.2 3.017-.443 4.255-.949 1.238-.503 2.335-1.239 3.356-2.259 1.02-1.02 1.756-2.119 2.259-3.356.506-1.238.749-2.565.949-4.255.2-1.69.2-3.39 0-5.08-.2-1.69-.443-3.017-.949-4.255-.503-1.238-1.239-2.335-2.259-3.356-1.02-1.02-2.119-1.756-3.356-2.259-1.238-.506-2.565-.749-4.255-.949-1.69-.2-3.39-.2-5.08 0z" />
              </svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
