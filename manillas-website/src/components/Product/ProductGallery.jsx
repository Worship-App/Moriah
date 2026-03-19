import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import ImageZoom from '../Common/ImageZoom'

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images?.main || images?.[0])
  const [isZoomed, setIsZoomed] = useState(false)
  const [showZoomModal, setShowZoomModal] = useState(false)
  const [zoomImage, setZoomImage] = useState(null)

  // Handle case where images is an array instead of object
  const imageArray = images?.gallery ? [images.main, ...images.gallery] : images || []
  const currentIndex = imageArray.findIndex(img => img === selectedImage)

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : imageArray.length - 1
    setSelectedImage(imageArray[newIndex])
  }

  const handleNext = () => {
    const newIndex = currentIndex < imageArray.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(imageArray[newIndex])
  }

  const handleZoom = (imageSrc) => {
    setZoomImage(imageSrc)
    setShowZoomModal(true)
  }

  const handleThumbnailClick = (image) => {
    setSelectedImage(image)
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group bg-gray-100 rounded-lg overflow-hidden h-96">
          <img
            src={selectedImage || '/placeholder.jpg'}
            alt="Product"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
            onClick={() => handleZoom(selectedImage)}
          />
          
          {/* Navigation Buttons */}
          {imageArray.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Zoom Button */}
          <button
            onClick={() => handleZoom(selectedImage)}
            className="absolute bottom-2 right-2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          {/* Image Counter */}
          {imageArray.length > 1 && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100">
              {currentIndex + 1} / {imageArray.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {imageArray.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {imageArray.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === image
                    ? 'border-amber-500 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {showZoomModal && (
        <ImageZoom
          src={zoomImage}
          alt="Product zoom"
          onClose={() => setShowZoomModal(false)}
        />
      )}
    </>
  )
}
