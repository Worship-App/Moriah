import React, { useState, useRef, useEffect } from 'react'
import { X, ZoomIn, ZoomOut } from 'lucide-react'

const ImageZoom = ({ src, alt, className = '' }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(2)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!isZoomed || !containerRef.current || !imageRef.current) return

    const container = containerRef.current
    const image = imageRef.current
    const rect = container.getBoundingClientRect()
    
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1))
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      setZoomLevel(2)
      setPosition({ x: 50, y: 50 })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false)
      }
      if (e.key === '+' || e.key === '=') {
        handleZoomIn()
      }
      if (e.key === '-' || e.key === '_') {
        handleZoomOut()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed, zoomLevel])

  if (isZoomed) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
        <div className="relative max-w-7xl max-h-full p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              disabled={zoomLevel >= 5}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              disabled={zoomLevel <= 1}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <div className="bg-white rounded-full px-3 py-1 text-sm font-medium text-center">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {/* Zoomed Image */}
          <div className="overflow-auto max-w-full max-h-full">
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              className="max-w-none transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center',
                cursor: zoomLevel > 1 ? 'move' : 'default'
              }}
              draggable={false}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-4 py-2 text-sm text-gray-600">
            Usa +/- para zoom • ESC para cerrar
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={toggleZoom}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200"
        style={{
          transform: isHovering ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Zoom indicator */}
      {isHovering && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <ZoomIn className="w-3 h-3" />
          Click para zoom
        </div>
      )}
    </div>
  )
}

export default ImageZoom
