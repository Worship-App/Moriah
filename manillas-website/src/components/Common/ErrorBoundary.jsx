/**
 * ErrorBoundary Component - Catches React errors and displays fallback UI
 * 
 * Features:
 * - Catches errors in child components
 * - Displays user-friendly error message
 * - Provides reload button
 * - Logs errors for debugging
 * - Integrates with Sentry for error tracking
 * - Premium styling
 */

import { Component } from 'react'
import Button from './Button'
import { captureException } from '../../services/sentryService'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ errorInfo })
    
    // Send error to Sentry (fire and forget)
    captureException(error, {
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    }).catch(err => console.warn('Failed to send error to Sentry:', err))
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary-50 to-accent-100 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-error bg-opacity-10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">
              Algo salió mal
            </h2>

            {/* Error Message */}
            <p className="text-secondary-600 mb-6">
              Disculpa, encontramos un error inesperado. Por favor, intenta recargar la página.
            </p>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-secondary-50 rounded text-left text-xs text-secondary-700 overflow-auto max-h-32">
                <p className="font-mono font-bold mb-2">Error Details:</p>
                <p className="font-mono">{this.state.error.toString()}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={this.handleReset}
                className="flex-1"
              >
                Intentar de nuevo
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                Ir al inicio
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
