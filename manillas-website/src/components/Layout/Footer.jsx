import config from '../../config/env'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const businessEmail = config.businessEmail
  const businessWhatsapp = config.businessWhatsapp
  const instagramUrl = config.instagramUrl
  const facebookUrl = config.facebookUrl
  const tiktokUrl = config.tiktokUrl
  const linkedinUrl = config.linkedinUrl

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h3 className="text-lg font-bold text-primary-500">Manillas Premium</h3>
            </div>
            <p className="text-gray-100 text-sm">
              Artesanía de calidad premium para tu estilo personal
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-500">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-100 hover:text-primary-500 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalog" className="text-gray-100 hover:text-primary-500 transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-100 hover:text-primary-500 transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-100 hover:text-primary-500 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-500">Contacto</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a
                  href={`mailto:${businessEmail}`}
                  className="text-gray-100 hover:text-primary-500 transition-colors text-sm"
                >
                  {businessEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${businessWhatsapp.replace(/\D/g, '')}`}
                  className="text-gray-100 hover:text-primary-500 transition-colors text-sm"
                >
                  WhatsApp: {businessWhatsapp}
                </a>
              </li>
            </ul>
            <div className="flex gap-4 text-2xl">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                👍
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="TikTok"
              >
                🎵
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-200 text-sm">
              &copy; {currentYear} Manillas Premium. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-200 hover:text-primary-500 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-200 hover:text-primary-500 transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
