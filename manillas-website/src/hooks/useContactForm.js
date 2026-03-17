/**
 * useContactForm Hook
 * Custom hook for managing contact form
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { contactService } from '../services/contactService'
import { useUIStore } from '../store/uiStore'

const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(5, 'El email debe tener al menos 5 caracteres'),
  subject: z.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no puede exceder 200 caracteres'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(5000, 'El mensaje no puede exceder 5000 caracteres'),
})

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const showNotification = useUIStore((state) => state.showNotification)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await contactService.sendContactMessage(data)
      showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success', 4000)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error sending contact message:', error)
      const errorMessage = error.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
      setSubmitError(errorMessage)
      showNotification(errorMessage, 'error', 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendAnother = () => {
    setIsSubmitted(false)
    setSubmitError(null)
    reset()
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    watch,
    isSubmitted,
    submitError,
    handleSendAnother,
  }
}
