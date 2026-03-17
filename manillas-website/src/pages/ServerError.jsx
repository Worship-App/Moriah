import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Common/Button'
import { analyticsService } from '../services/analyticsService'

export default function ServerError() {
  useEffect(() => {
    analyticsService.trackPageView('500')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Error del Servidor</h2>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, algo salió mal en nuestro servidor. Por favor, intenta más tarde.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
