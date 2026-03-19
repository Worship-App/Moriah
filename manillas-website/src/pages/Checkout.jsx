import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, CreditCard, Truck, Shield, Mail, Phone, User, MapPin, Check } from 'lucide-react'
import useCartStore from '../store/cartStore'
import CartItem from '../components/Cart/CartItem'

// Schema de validación para el formulario
const checkoutSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres'),
  postalCode: z.string().min(4, 'El código postal debe tener al menos 4 caracteres'),
  paymentMethod: z.enum(['credit-card', 'paypal', 'cash']),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVV: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === 'credit-card') {
    return data.cardNumber && data.cardName && data.cardExpiry && data.cardCVV
  }
  return true
}, {
  message: 'Todos los campos de la tarjeta son requeridos',
  path: ['cardNumber']
})

export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  
  const total = getTotal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit-card'
    }
  })

  const paymentMethod = watch('paymentMethod')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    // Simular procesamiento del pedido
    setTimeout(() => {
      console.log('Order data:', { ...data, items, total })
      setOrderCompleted(true)
      clearCart()
      setIsSubmitting(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Agrega productos antes de proceder al checkout
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación pronto.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Completa tus datos para finalizar el pedido
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            {/* Información Personal */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-amber-600" />
                Información Personal
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    {...register('firstName')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Juan"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Apellido
                  </label>
                  <input
                    {...register('lastName')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Pérez"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="juan@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    {...register('phone')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Dirección de Envío */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                Dirección de Envío
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Dirección
                  </label>
                  <input
                    {...register('address')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Calle 123 #45-67"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ciudad
                    </label>
                    <input
                      {...register('city')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Bogotá"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Código Postal
                    </label>
                    <input
                      {...register('postalCode')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="110111"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                Método de Pago
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="credit-card"
                    className="mr-3 text-amber-600"
                  />
                  <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-900 dark:text-white">Tarjeta de Crédito</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="paypal"
                    className="mr-3 text-amber-600"
                  />
                  <div className="w-5 h-5 mr-2 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                  <span className="text-gray-900 dark:text-white">PayPal</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="cash"
                    className="mr-3 text-amber-600"
                  />
                  <Truck className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-900 dark:text-white">Contraentrega</span>
                </label>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Número de Tarjeta
                    </label>
                    <input
                      {...register('cardNumber')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      {...register('cardName')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Vencimiento
                      </label>
                      <input
                        {...register('cardExpiry')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="MM/AA"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        {...register('cardCVV')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Resumen del Pedido
              </h2>
              
              {/* Items */}
              <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Beneficios */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <span>Envío gratis en pedidos mayores a $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <span>Compra 100% segura</span>
                </div>
              </div>

              {/* Botón de Confirmación */}
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full mt-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  'Confirmar Pedido'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
