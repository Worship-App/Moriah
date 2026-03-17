import { useState } from 'react'

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images.main)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-200 rounded-lg overflow-hidden h-96">
        <img
          src={selectedImage}
          alt="Product"
          className={`w-full h-full object-cover ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => setSelectedImage(images.main)}
          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
            selectedImage === images.main ? 'border-secondary' : 'border-gray-300'
          }`}
        >
          <img src={images.main} alt="Main" className="w-full h-full object-cover" />
        </button>

        {images.gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              selectedImage === image ? 'border-secondary' : 'border-gray-300'
            }`}
          >
            <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
