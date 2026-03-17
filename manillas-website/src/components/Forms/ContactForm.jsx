import { useContactForm } from '../../hooks/useContactForm'
import Button from '../Common/Button'

export default function ContactForm() {
  const { register, handleSubmit, errors, onSubmit, isSubmitting, watch, isSubmitted, submitError, handleSendAnother } = useContactForm()
  const formValues = watch()

  const getFieldStatus = (fieldName) => {
    if (!formValues[fieldName]) return 'empty'
    if (errors[fieldName]) return 'error'
    return 'valid'
  }

  const renderFieldIcon = (status) => {
    if (status === 'valid') {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
    if (status === 'error') {
      return (
        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    }
    return null
  }

  // Show success confirmation message
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">¡Mensaje Enviado!</h3>
          <p className="text-green-600 mb-6">
            Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.
          </p>
          <Button
            type="button"
            onClick={handleSendAnother}
            variant="secondary"
            className="transition-all duration-200 hover:shadow-lg"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Otro Mensaje
            </span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Name Field */}
      <div className="group">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2 transition-colors duration-200">
          Nombre <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            placeholder="Tu nombre completo"
            {...register('name')}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none ${
              getFieldStatus('name') === 'error'
                ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                : getFieldStatus('name') === 'valid'
                ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-200'
                : 'border-gray-300 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100'
            }`}
          />
          <div className="absolute right-3 top-3">
            {renderFieldIcon(getFieldStatus('name'))}
          </div>
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="group">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2 transition-colors duration-200">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            {...register('email')}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none ${
              getFieldStatus('email') === 'error'
                ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                : getFieldStatus('email') === 'valid'
                ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-200'
                : 'border-gray-300 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100'
            }`}
          />
          <div className="absolute right-3 top-3">
            {renderFieldIcon(getFieldStatus('email'))}
          </div>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div className="group">
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2 transition-colors duration-200">
          Asunto <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="subject"
            type="text"
            placeholder="¿Cuál es el asunto de tu mensaje?"
            {...register('subject')}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none ${
              getFieldStatus('subject') === 'error'
                ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                : getFieldStatus('subject') === 'valid'
                ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-200'
                : 'border-gray-300 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100'
            }`}
          />
          <div className="absolute right-3 top-3">
            {renderFieldIcon(getFieldStatus('subject'))}
          </div>
        </div>
        {errors.subject && (
          <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="group">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2 transition-colors duration-200">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            placeholder="Cuéntanos más detalles sobre tu consulta..."
            rows="5"
            {...register('message')}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none resize-none ${
              getFieldStatus('message') === 'error'
                ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200'
                : getFieldStatus('message') === 'valid'
                ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-200'
                : 'border-gray-300 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100'
            }`}
          />
          <div className="absolute right-3 top-3">
            {renderFieldIcon(getFieldStatus('message'))}
          </div>
        </div>
        {errors.message && (
          <p className="text-red-500 text-sm mt-2 flex items-center animate-fadeIn">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-semibold text-red-700">Error al enviar el mensaje</h4>
            <p className="text-red-600 text-sm mt-1">{submitError}</p>
            <p className="text-red-600 text-sm mt-2">Por favor, intenta de nuevo o contacta directamente por WhatsApp.</p>
          </div>
        </div>
      )}

      {/* Buttons Container */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="secondary"
          className="flex-1 transition-all duration-200 hover:shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Mensaje
            </span>
          )}
        </Button>
        <Button
          type="reset"
          variant="outline"
          className="flex-1 transition-all duration-200"
        >
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Limpiar
          </span>
        </Button>
      </div>

      {/* Form Info */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Los campos marcados con <span className="text-red-500">*</span> son obligatorios
      </p>
    </form>
  )
}
