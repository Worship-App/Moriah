import { useState, useRef, useEffect } from 'react'
import config from '../../config/env'

/**
 * ChatBot Component
 * 
 * Un chatbot flotante que ayuda a los clientes con:
 * - Consultas sobre productos
 * - Hacer pedidos
 * - Información de contacto
 * - Chat interactivo con asesor virtual
 * - Redirigir a WhatsApp con mensajes pre-escritos
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('welcome') // welcome, chat
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setStep('welcome')
      setMessages([])
    }
  }

  const handleWhatsAppRedirect = (message) => {
    const phoneNumber = config.businessWhatsapp.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  const startChat = () => {
    setStep('chat')
    setMessages([
      {
        id: 1,
        text: '¡Hola! Soy tu asesor virtual de Moriah. 😊',
        sender: 'bot',
        timestamp: new Date()
      },
      {
        id: 2,
        text: '¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Respuestas automáticas basadas en palabras clave
    if (message.includes('precio') || message.includes('costo') || message.includes('cuanto')) {
      return 'Nuestros precios varían según el diseño y materiales. ¿Te gustaría que te enviara nuestro catálogo con precios por WhatsApp? 💰'
    }
    
    if (message.includes('envio') || message.includes('entrega') || message.includes('envío')) {
      return 'Realizamos envíos a todo el país. El tiempo de entrega es de 3-5 días hábiles. ¿A qué ciudad necesitas el envío? 📦'
    }
    
    if (message.includes('material') || message.includes('materiales')) {
      return 'Trabajamos con materiales premium: cuero genuino, acero inoxidable, piedras naturales y más. Cada manilla es única. ¿Te interesa algún material en particular? 💎'
    }
    
    if (message.includes('personalizado') || message.includes('diseño') || message.includes('custom')) {
      return '¡Claro! Hacemos diseños personalizados. Puedes elegir colores, materiales y hasta grabar iniciales. ¿Qué tienes en mente? ✨'
    }
    
    if (message.includes('catalogo') || message.includes('catálogo') || message.includes('productos')) {
      return 'Puedes ver nuestro catálogo completo en la sección "Catálogo" del menú. ¿Te gustaría que te ayude con algún producto específico? 📱'
    }
    
    if (message.includes('comprar') || message.includes('pedido') || message.includes('orden')) {
      return 'Perfecto, para hacer tu pedido puedo conectarte directamente con WhatsApp donde un asesor te atenderá personalmente. ¿Te parece bien? 🛍️'
    }
    
    if (message.includes('hola') || message.includes('hi') || message.includes('hey')) {
      return '¡Hola! 👋 ¿En qué puedo ayudarte hoy?'
    }
    
    if (message.includes('gracias') || message.includes('thanks')) {
      return '¡De nada! Estoy aquí para ayudarte. ¿Necesitas algo más? 😊'
    }
    
    if (message.includes('whatsapp') || message.includes('contacto') || message.includes('asesor')) {
      return 'Claro, puedo conectarte con un asesor por WhatsApp. ¿Quieres que abramos el chat ahora? 📞'
    }
    
    // Respuesta por defecto
    return 'Entiendo tu consulta. Para darte una respuesta más detallada, ¿te gustaría hablar directamente con un asesor por WhatsApp? También puedes preguntarme sobre precios, envíos, materiales o productos. 💬'
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 segundos
  }

  const handleConnectWhatsApp = () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop()
    const message = lastUserMessage 
      ? `Hola, tengo una consulta: ${lastUserMessage.text}`
      : 'Hola, me gustaría hablar con un asesor.'
    
    handleWhatsAppRedirect(message)
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
      action: 'chat' // Esta opción abre el chat
    }
  ]

  const handleOptionClick = (option) => {
    if (option.action === 'chat') {
      startChat()
    } else {
      handleWhatsAppRedirect(option.message)
    }
  }

  return (
    <>
      {/* Botón Flotante con efecto dorado premium */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-2xl hover:shadow-red-500/50' 
            : 'bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 shadow-2xl hover:shadow-amber-500/50 animate-pulse'
        }`}
        style={{
          boxShadow: isOpen 
            ? '0 20px 60px rgba(239, 68, 68, 0.4)' 
            : '0 20px 60px rgba(245, 158, 11, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
        }}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white mx-auto drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white mx-auto drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        
        {/* Badge de notificación con efecto dorado */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </button>

      {/* Ventana del Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl overflow-hidden animate-slide-in-up flex flex-col border-4 border-amber-400" style={{ height: '600px', maxHeight: 'calc(100vh - 8rem)', boxShadow: '0 25px 80px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)' }}>
          {/* Header del Chat con diseño dorado premium */}
          <div className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 p-4 text-white flex items-center justify-between relative overflow-hidden">
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ animation: 'shimmer 3s infinite' }}></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/50 shadow-lg">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="font-bold text-lg drop-shadow-md">Asistente Moriah</h3>
                <p className="text-xs text-white/95 font-medium">
                  {step === 'chat' ? '✨ En línea' : '👋 ¿En qué podemos ayudarte?'}
                </p>
              </div>
            </div>
            {step === 'chat' && (
              <button
                onClick={() => setStep('welcome')}
                className="p-2 hover:bg-white/20 rounded-lg transition-all relative z-10 border border-white/30"
                title="Volver al menú"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
          </div>

          {/* Contenido del Chat */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {step === 'welcome' ? (
              <div className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-amber-50/50 to-white">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl rounded-tl-none p-4 border-2 border-amber-200 shadow-md">
                    <p className="text-gray-800 font-medium">
                      ¡Hola! 👋 Bienvenido a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Moriah</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Selecciona una opción para que podamos ayudarte mejor:
                    </p>
                  </div>

                  {/* Opciones con diseño premium dorado */}
                  <div className="grid grid-cols-2 gap-3">
                    {options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className="group p-4 bg-gradient-to-br from-white to-amber-50 hover:from-amber-50 hover:to-yellow-100 rounded-xl border-3 border-amber-300 hover:border-amber-500 transition-all duration-300 text-left transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-amber-500/30"
                        style={{ boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)' }}
                      >
                        <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">{option.icon}</div>
                        <h4 className="font-bold text-sm text-gray-800 group-hover:text-amber-700 mb-1">
                          {option.title}
                        </h4>
                        <p className="text-xs text-gray-600 group-hover:text-gray-700">
                          {option.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Mensaje de WhatsApp con diseño mejorado */}
                  <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-md">
                    <div className="flex items-center gap-3 text-green-700">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-800">
                          Te conectaremos por WhatsApp
                        </p>
                        <p className="text-xs text-green-600">
                          Respuesta inmediata de nuestro equipo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Área de mensajes del chat con fondo premium */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-amber-50/30 to-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-br-none shadow-lg border border-amber-400'
                            : 'bg-white text-gray-800 rounded-bl-none shadow-md border-2 border-amber-200'
                        }`}
                        style={message.sender === 'user' ? { boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)' } : {}}
                      >
                        <p className="text-sm font-medium">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Indicador de escritura mejorado */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md border-2 border-amber-200">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Botón de conectar con WhatsApp mejorado */}
                <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-t-2 border-green-300">
                  <button
                    onClick={handleConnectWhatsApp}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-green-500/50 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Continuar en WhatsApp
                  </button>
                </div>

                {/* Input de mensaje con diseño premium */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t-2 border-amber-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-4 py-3 border-2 border-amber-300 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-amber-50/50"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="px-4 py-3 bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/50 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer con diseño premium */}
          {step === 'welcome' && (
            <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-t-2 border-amber-200">
              <p className="text-xs text-gray-600 text-center">
                Powered by <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Moriah</span> • ✨ Respuesta inmediata
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
