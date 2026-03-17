import { useState } from 'react'
import config from '../../config/env'

/**
 * ChatBot Component
 * 
 * Un chatbot flotante que ayuda a los clientes con:
 * - Consultas sobre productos
 * - Hacer pedidos
 * - Información de contacto
 * - Redirigir a WhatsApp con mensajes pre-escritos
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('welcome') // welcome, options, product-inquiry, order

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setStep('welcome')
    }
  }

  const handleWhatsAppRedirect = (message) => {
    const phoneNumber = config.businessWhatsapp.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  const options = [
    {
      id: 'product-info',
      icon: '💎',
      title: 'Información de Productos',
      description: 'Conoce más sobre nuestras manillas',
      message: '¡Hola! Me gustaría conocer más información sobre sus productos.'
    },
    {
      id: 'make-order',
      icon: '🛍️',
      title: 'Hacer un Pedido',
      description: 'Quiero comprar una manilla',
      message: '¡Hola! Me gustaría hacer un pedido de una manilla.'
    },
    {
      id: 'custom-order',
      icon: '✨',
      title: 'Pedido Personalizado',
      description: 'Diseño a tu medida',
      message: '¡Hola! Me interesa un diseño personalizado de manilla.'
    },
    {
      id: 'pricing',
      icon: '💰',
      title: 'Consultar Precios',
      description: 'Información sobre costos',
      message: '¡Hola! Me gustaría consultar los precios de sus productos.'
    },
    {
      id: 'shipping',
      icon: '📦',
      title: 'Envíos y Entregas',
      description: 'Información de envío',
      message: '¡Hola! Quisiera información sobre envíos y tiempos de entrega.'
    },
    {
      id: 'other',
      icon: '💬',
      title: 'Otra Consulta',
      description: 'Hablar con un asesor',
      message: '¡Hola! Tengo una consulta.'
    }
  ]

  return (
    <>
      {/* Botón Flotante */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
        }`}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        
        {/* Badge de notificación */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </button>

      {/* Ventana del Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-in-up">
          {/* Header del Chat */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Asistente Moriah</h3>
                <p className="text-sm text-white/90">¿En qué podemos ayudarte?</p>
              </div>
            </div>
          </div>

          {/* Contenido del Chat */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {step === 'welcome' && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                  <p className="text-gray-800">
                    ¡Hola! 👋 Bienvenido a <span className="font-bold text-primary-600">Moriah</span>
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Selecciona una opción para que podamos ayudarte mejor:
                  </p>
                </div>

                {/* Opciones */}
                <div className="grid grid-cols-2 gap-3">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleWhatsAppRedirect(option.message)}
                      className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-300 text-left transform hover:scale-105"
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <h4 className="font-semibold text-sm text-gray-800 group-hover:text-primary-700 mb-1">
                        {option.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Mensaje de WhatsApp */}
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <p className="text-sm font-medium">
                      Te conectaremos por WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Powered by <span className="font-semibold text-primary-600">Moriah</span> • Respuesta inmediata
            </p>
          </div>
        </div>
      )}
    </>
  )
}
