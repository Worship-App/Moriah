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
    <footer className="bg-gradient-to-br from-gray-900 via-secondary-900 to-black text-white relative overflow-hidden">
      {/* Efectos de fondo dorados */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section con diseño premium */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-2xl border-2 border-amber-400" style={{ boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)' }}>
                <span className="text-white font-bold text-xl drop-shadow-lg">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">Moriah</h3>
                <p className="text-xs text-amber-400 font-semibold">✨ Premium Collection</p>
              </div>
            </div>
            <p className="text-gray-100 text-sm leading-relaxed">
              Artesanía de calidad premium para tu estilo personal. Cada pieza es única y especial.
            </p>
          </div>

          {/* Quick Links con diseño mejorado */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center gap-2">
              <span>🔗</span> Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-100 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalog" className="text-gray-100 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-100 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-100 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:w-3 transition-all duration-300"></span>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social con diseño premium */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 flex items-center gap-2">
              <span>📞</span> Contacto
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`mailto:${businessEmail}`}
                  className="text-gray-100 hover:text-amber-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="text-amber-400">✉️</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{businessEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${businessWhatsapp.replace(/\D/g, '')}`}
                  className="text-gray-100 hover:text-amber-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="text-green-400">💬</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">WhatsApp: {businessWhatsapp}</span>
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-500 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50 border border-amber-500/30"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-500 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50 border border-amber-500/30"
                aria-label="Facebook"
              >
                👍
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-500 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50 border border-amber-500/30"
                aria-label="TikTok"
              >
                🎵
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 hover:from-amber-500 hover:to-yellow-500 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50 border border-amber-500/30"
                aria-label="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        {/* Divider con diseño dorado */}
        <div className="border-t-2 border-amber-900/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-200 text-sm flex items-center gap-2">
              <span className="text-amber-400">©</span> {currentYear} <span className="font-bold text-amber-400">Moriah</span>. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-200 hover:text-amber-400 transition-all duration-300 hover:underline">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-200 hover:text-amber-400 transition-all duration-300 hover:underline">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
