import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote, Play } from 'lucide-react'

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 ${
      isActive ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95 absolute'
    }`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
            />
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
              {testimonial.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
        
        <Quote className="w-8 h-8 text-amber-400 opacity-50" />
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">
        "{testimonial.content}"
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {testimonial.product && (
            <div className="flex items-center gap-2">
              <img
                src={testimonial.product.image}
                alt={testimonial.product.name}
                className="w-10 h-10 rounded object-cover"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.product.name}
              </span>
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {testimonial.date}
        </div>
      </div>
    </div>
  )
}

const VideoTestimonial = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="relative aspect-video bg-gray-900">
        {isPlaying ? (
          <iframe
            src={testimonial.videoUrl}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={testimonial.thumbnail}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shadow-lg"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          {testimonial.title}
        </p>
      </div>
    </div>
  )
}

const TestimonialStats = () => {
  const stats = [
    { number: '500+', label: 'Clientes Felices' },
    { number: '4.9/5', label: 'Calificación Promedio' },
    { number: '1000+', label: 'Manillas Vendidas' },
    { number: '98%', label: 'Satisfacción' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">
            {stat.number}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

const Testimonials = ({ showVideo = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Datos de ejemplo para testimonios
  const textTestimonials = [
    {
      id: 1,
      name: 'María Fernanda López',
      role: 'Cliente Premium',
      rating: 5,
      content: 'Las manillas de Moriah son simplemente espectaculares. La calidad del material y el acabado son incomparables. ¡Llevo usando mi manilla Dorada Elegante por meses y sigue brillando como el primer día!',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c6ca?w=150&h=150&fit=crop&crop=face',
      verified: true,
      date: 'Marzo 2024',
      product: {
        name: 'Dorada Elegante',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=40&h=40&fit=crop'
      }
    },
    {
      id: 2,
      name: 'Carlos Andrés Martínez',
      role: 'Cliente recurrente',
      rating: 5,
      content: 'Compré la manilla Bohemia Chic como regalo para mi esposa y fue el mejor regalo que le he dado. La calidad superó todas mis expectativas. Definitivamente volveré a comprar.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true,
      date: 'Febrero 2024',
      product: {
        name: 'Bohemia Chic',
        image: 'https://images.unsplash.com/photo-1529139574841-a036b828b5b5?w=40&h=40&fit=crop'
      }
    },
    {
      id: 3,
      name: 'Ana Sofía Rodríguez',
      role: 'Influencer de moda',
      rating: 5,
      content: 'Como amante de la moda, puedo decir que las manillas de Moriah son únicas. El diseño Minimalista Moderno combina perfectamente con cualquier outfit. ¡Mis seguidores siempre preguntan dónde las compro!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true,
      date: 'Enero 2024',
      product: {
        name: 'Minimalista Moderna',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=40&h=40&fit=crop'
      }
    }
  ]

  const videoTestimonials = [
    {
      id: 4,
      name: 'Laura Valencia',
      role: 'Emprendedora',
      title: 'Mi experiencia con las manillas de Moriah',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=640&h=360&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      name: 'Diego Herrera',
      role: 'Fotógrafo',
      title: 'La calidad que buscaba',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=640&h=360&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % textTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, textTestimonials.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? textTestimonials.length - 1 : prev - 1))
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === textTestimonials.length - 1 ? 0 : prev + 1))
    setIsAutoPlaying(false)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="py-16 bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Descubre por qué miles de personas confían en Moriah para sus accesorios premium
          </p>
        </div>

        {/* Stats */}
        <TestimonialStats />

        {/* Text Testimonials Carousel */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96">
              {textTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {textTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-amber-500'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Video Testimonials */}
        {showVideo && videoTestimonials.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Testimonios en video
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {videoTestimonials.map((testimonial) => (
                <VideoTestimonial
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Lista para unirte a nuestros clientes felices?
            </h3>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Descubre la colección premium de Moriah y encuentra la manilla perfecta para ti.
            </p>
            <button className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Ver Colección
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
