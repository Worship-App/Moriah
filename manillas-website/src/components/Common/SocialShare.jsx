import React, { useState } from 'react'
import { Heart, Share2, Facebook, Twitter, Instagram, Pinterest, Link2, Check } from 'lucide-react'

const SocialShare = ({ 
  url, 
  title, 
  description, 
  image, 
  showLike = true, 
  compact = false,
  className = '' 
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10)
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
    instagram: null, // Instagram doesn't support direct URL sharing
  }

  const handleShare = (platform) => {
    const shareUrl = shareUrls[platform]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    } else if (platform === 'instagram') {
      // For Instagram, we'll copy the link and show a message
      handleCopyLink()
      alert('Instagram no permite compartir directamente. ¡El enlace ha sido copiado!')
    }
    setShowShareMenu(false)
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showLike && (
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
              isLiked
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>
        )}
        
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Compartir</span>
          </button>
          
          {showShareMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50">
              <div className="flex gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Compartir en Facebook"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Compartir en Twitter"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleShare('pinterest')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Compartir en Pinterest"
                >
                  <Pinterest className="w-4 h-4 text-red-600" />
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Compartir en Instagram"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Copiar enlace"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Link2 className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Like Button */}
      {showLike && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isLiked
                ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>Me gusta</span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
              {likeCount}
            </span>
          </button>
        </div>
      )}

      {/* Share Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Compartir este producto
        </h4>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Facebook className="w-5 h-5" />
            <span>Facebook</span>
          </button>
          
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('pinterest')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Pinterest className="w-5 h-5" />
            <span>Pinterest</span>
          </button>
          
          <button
            onClick={() => handleShare('instagram')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5" />
                <span>Copiar enlace</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={title}
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h5 className="font-medium text-gray-900 dark:text-white line-clamp-1">
              {title}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialShare
