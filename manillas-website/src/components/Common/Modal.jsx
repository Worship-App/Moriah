/**
 * Modal Component - Reusable modal dialog for confirmations and content
 * 
 * Features:
 * - Backdrop overlay with smooth animations
 * - Customizable title and content
 * - Close button with keyboard support
 * - Premium styling with shadows
 * - Responsive design
 */

import { useEffect } from 'react'

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  actions = null,
  size = 'md'
}) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-2xl w-full mx-4 ${sizeClasses[size]} animate-slide-in-up`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-secondary-500 hover:text-secondary-700 transition-colors p-1 rounded hover:bg-secondary-100"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex gap-3 p-6 border-t border-secondary-200 justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
