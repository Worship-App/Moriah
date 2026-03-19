import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Search, X } from 'lucide-react'

const VoiceSearch = ({ onSearch, placeholder = 'Buscar productos...', className = '' }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true)
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'es-ES'
      
      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setError('')
        setTranscript('')
      }
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        setTranscript(finalTranscript || interimTranscript)
        
        if (finalTranscript) {
          onSearch(finalTranscript)
          setIsListening(false)
        }
      }
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setError('Error en el reconocimiento de voz. Intenta de nuevo.')
        setIsListening(false)
      }
      
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      setIsSupported(false)
      setError('Tu navegador no soporta búsqueda por voz')
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onSearch])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        setError('Error al iniciar el reconocimiento de voz')
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const handleClear = () => {
    setTranscript('')
    onSearch('')
  }

  if (!isSupported) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Búsqueda por voz no compatible con este navegador
        </p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        
        <input
          type="text"
          value={transcript}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          onChange={(e) => {
            setTranscript(e.target.value)
            onSearch(e.target.value)
          }}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {transcript && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 rounded-full transition-all ${
              isListening
                ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
            title={isListening ? 'Detener grabación' : 'Iniciar búsqueda por voz'}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Voice Feedback */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-amber-700 dark:text-amber-300">
              Escuchando... Di lo que quieres buscar
            </span>
          </div>
          {transcript && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 italic">
              "{transcript}"
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg z-10">
          <p className="text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        </div>
      )}

      {/* Instructions */}
      {!isListening && !error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg z-10">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 Haz clic en el micrófono y di el nombre del producto que buscas
          </p>
        </div>
      )}
    </div>
  )
}

export default VoiceSearch
