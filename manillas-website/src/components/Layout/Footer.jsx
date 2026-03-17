export default function Footer() {
  const currentYear = new Date().getFullYear()
  const businessEmail = import.meta.env.VITE_BUSINESS_EMAIL
  const businessWhatsapp = import.meta.env.VITE_BUSINESS_WHATSAPP
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL
  const tiktokUrl = import.meta.env.VITE_TIKTOK_URL
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">M</span>
              </div>
              <h3 className="text-lg font-bold">Manillas Premium</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Artesanía de calidad premium para tu estilo personal
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalog" className="text-gray-300 hover:text-secondary transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-secondary transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a
                  href={`mailto:${businessEmail}`}
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                  {businessEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${businessWhatsapp.replace(/\D/g, '')}`}
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                  WhatsApp: {businessWhatsapp}
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                👍
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="TikTok"
              >
                🎵
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
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
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Manillas Premium. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
