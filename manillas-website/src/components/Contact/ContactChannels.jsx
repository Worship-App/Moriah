import { useEffect } from 'react'

/**
 * ContactChannels Component
 * Displays direct contact channels with WhatsApp, Email, and Social Media links
 * All links open in new tabs with proper security attributes
 */
export default function ContactChannels({
  businessEmail = import.meta.env.VITE_BUSINESS_EMAIL,
  businessWhatsapp = import.meta.env.VITE_BUSINESS_WHATSAPP,
  instagramUrl = import.meta.env.VITE_INSTAGRAM_URL,
  facebookUrl = import.meta.env.VITE_FACEBOOK_URL,
  tiktokUrl = import.meta.env.VITE_TIKTOK_URL,
  linkedinUrl = import.meta.env.VITE_LINKEDIN_URL,
} = {}) {

  // Format WhatsApp number: remove all non-digits and ensure international format
  const formatWhatsAppNumber = (number) => {
    return number.replace(/\D/g, '')
  }

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate WhatsApp number format (should be international format)
  const isValidWhatsAppNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, '')
    return cleanNumber.length >= 10 && cleanNumber.length <= 15
  }

  // Validate URL format
  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="space-y-8">
      {/* WhatsApp Channel */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 hover:border-green-400 transition-colors">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-500 text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.119-2.259 3.356-.506 1.238-.749 2.565-.949 4.255-.2 1.69-.2 3.39 0 5.08.2 1.69.443 3.017.949 4.255.503 1.238 1.239 2.335 2.259 3.356 1.02 1.02 2.119 1.756 3.356 2.259 1.238.506 2.565.749 4.255.949 1.69.2 3.39.2 5.08 0 1.69-.2 3.017-.443 4.255-.949 1.238-.503 2.335-1.239 3.356-2.259 1.02-1.02 1.756-2.119 2.259-3.356.506-1.238.749-2.565.949-4.255.2-1.69.2-3.39 0-5.08-.2-1.69-.443-3.017-.949-4.255-.503-1.238-1.239-2.335-2.259-3.356-1.02-1.02-2.119-1.756-3.356-2.259-1.238-.506-2.565-.749-4.255-.949-1.69-.2-3.39-.2-5.08 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-sm text-gray-600 mb-4">Contacta directamente por WhatsApp</p>
            {isValidWhatsAppNumber(businessWhatsapp) ? (
              <a
                href={`https://wa.me/${formatWhatsAppNumber(businessWhatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                data-testid="whatsapp-button"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.119-2.259 3.356-.506 1.238-.749 2.565-.949 4.255-.2 1.69-.2 3.39 0 5.08.2 1.69.443 3.017.949 4.255.503 1.238 1.239 2.335 2.259 3.356 1.02 1.02 2.119 1.756 3.356 2.259 1.238.506 2.565.749 4.255.949 1.69.2 3.39.2 5.08 0 1.69-.2 3.017-.443 4.255-.949 1.238-.503 2.335-1.239 3.356-2.259 1.02-1.02 1.756-2.119 2.259-3.356.506-1.238.749-2.565.949-4.255.2-1.69.2-3.39 0-5.08-.2-1.69-.443-3.017-.949-4.255-.503-1.238-1.239-2.335-2.259-3.356-1.02-1.02-2.119-1.756-3.356-2.259-1.238-.506-2.565-.749-4.255-.949-1.69-.2-3.39-.2-5.08 0z" />
                </svg>
                {businessWhatsapp}
              </a>
            ) : (
              <p className="text-sm text-red-600">Número de WhatsApp no configurado correctamente</p>
            )}
          </div>
        </div>
      </div>

      {/* Email Channel */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200 hover:border-blue-400 transition-colors">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-4">Envíanos un correo electrónico</p>
            {isValidEmail(businessEmail) ? (
              <a
                href={`mailto:${businessEmail}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                data-testid="email-button"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {businessEmail}
              </a>
            ) : (
              <p className="text-sm text-red-600">Email no configurado correctamente</p>
            )}
          </div>
        </div>
      </div>

      {/* Social Media Channels */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 hover:border-purple-400 transition-colors">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500 text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Síguenos en Redes Sociales</h3>
            <p className="text-sm text-gray-600 mb-4">Conecta con nosotros en nuestras redes</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Instagram */}
              {isValidUrl(instagramUrl) && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-colors"
                  data-testid="instagram-button"
                  title="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                  </svg>
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              )}

              {/* Facebook */}
              {isValidUrl(facebookUrl) && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  data-testid="facebook-button"
                  title="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              )}

              {/* TikTok */}
              {isValidUrl(tiktokUrl) && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  data-testid="tiktok-button"
                  title="TikTok"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 5.1-1.82V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z" />
                  </svg>
                  <span className="hidden sm:inline">TikTok</span>
                </a>
              )}

              {/* LinkedIn */}
              {isValidUrl(linkedinUrl) && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
                  data-testid="linkedin-button"
                  title="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
