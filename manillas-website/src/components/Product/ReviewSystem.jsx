import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star, ThumbsUp, ThumbsDown, User, Calendar } from 'lucide-react'

// Schema de validación para reseñas
const reviewSchema = z.object({
  rating: z.number().min(1, 'Debes calificar con al menos 1 estrella').max(5),
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido').optional()
})

const StarRating = ({ rating, onRatingChange, interactive = false, size = 'md' }) => {
  const [hoverRating, setHoverRating] = useState(0)
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleStarClick = (starValue) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue)
    }
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= (hoverRating || rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-amber-300' : ''}`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        />
      ))}
    </div>
  )
}

const ReviewCard = ({ review, onHelpful = null }) => {
  const [isHelpful, setIsHelpful] = useState(null)
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleHelpful = (helpful) => {
    setIsHelpful(helpful)
    if (onHelpful) {
      onHelpful(review.id, helpful)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <StarRating rating={review.rating} size="sm" />
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        </div>
        
        {review.verified && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            ✓ Compra verificada
          </span>
        )}
      </div>

      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{review.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{review.comment}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ¿Te fue útil esta reseña?
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleHelpful(true)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                isHelpful === true
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              Sí ({review.helpful || 0})
            </button>
            <button
              onClick={() => handleHelpful(false)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                isHelpful === false
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ThumbsDown className="w-3 h-3" />
              No ({review.notHelpful || 0})
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0
    }
  })

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await onSubmit({ ...data, rating })
      reset()
      setRating(0)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Escribe tu reseña
      </h3>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Calificación
          </label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            interactive={true}
            size="lg"
          />
          <input
            {...register('rating', { value: rating })}
            type="hidden"
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Título de la reseña
          </label>
          <input
            {...register('title')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Resumen de tu experiencia"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Comentario
          </label>
          <textarea
            {...register('comment')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Cuéntanos más sobre tu experiencia con este producto..."
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tu nombre
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email (opcional)
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="juan@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            No compartiremos tu email públicamente
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="flex-1 py-2 px-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publicando...' : 'Publicar reseña'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const ReviewSystem = ({ productId, existingReviews = [] }) => {
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState(existingReviews)

  // Datos de ejemplo para reseñas
  const sampleReviews = [
    {
      id: 1,
      name: 'María González',
      rating: 5,
      title: '¡Increíble calidad!',
      comment: 'La manilla superó mis expectativas. El acabado es perfecto y el brillo es espectacular. La uso todos los días y sigue como nueva. Definitivamente volveré a comprar.',
      date: '2024-03-15',
      verified: true,
      helpful: 12,
      notHelpful: 1
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      rating: 4,
      title: 'Muy buena compra',
      comment: 'Excelente producto, justo como lo describen. El único detalle es que el cierre podría ser un poco más resistente, pero en general muy satisfecho con la compra.',
      date: '2024-03-10',
      verified: true,
      helpful: 8,
      notHelpful: 2
    },
    {
      id: 3,
      name: 'Ana Sofía',
      rating: 5,
      title: 'Regalo perfecto',
      comment: 'Compré esta manilla como regalo y fue un éxito total. La presentación es hermosa y la calidad es excelente. ¡La destinataria la amó!',
      date: '2024-03-05',
      verified: false,
      helpful: 15,
      notHelpful: 0
    }
  ]

  const allReviews = reviews.length > 0 ? reviews : sampleReviews

  const handleReviewSubmit = async (reviewData) => {
    // Simular envío de reseña
    const newReview = {
      id: allReviews.length + 1,
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      helpful: 0,
      notHelpful: 0
    }
    
    setReviews([newReview, ...allReviews])
    setShowForm(false)
  }

  const handleHelpful = (reviewId, helpful) => {
    setReviews(reviews.map(review => 
      review.id === reviewId
        ? {
            ...review,
            helpful: helpful ? review.helpful + 1 : review.helpful,
            notHelpful: !helpful ? review.notHelpful + 1 : review.notHelpful
          }
        : review
    ))
  }

  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length
  const ratingCounts = [1, 2, 3, 4, 5].map(rating => 
    allReviews.filter(review => review.rating === rating).length
  )

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Resumen de valoraciones
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Basado en {allReviews.length} reseñas
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {rating}
                </span>
                <Star rating={rating} className="w-4 h-4 fill-amber-400 text-amber-400" />
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full"
                    style={{
                      width: `${allReviews.length > 0 ? (ratingCounts[rating - 1] / allReviews.length) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {ratingCounts[rating - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          {showForm ? 'Cancelar' : 'Escribir una reseña'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Reseñas de clientes
        </h3>
        
        {allReviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            Sé el primero en dejar una reseña
          </p>
        ) : (
          allReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onHelpful={handleHelpful}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default ReviewSystem
