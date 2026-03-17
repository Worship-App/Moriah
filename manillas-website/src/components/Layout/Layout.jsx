import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatBot from '../Chat/ChatBot'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Marco dorado premium alrededor de toda la página */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Borde superior */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 shadow-lg" style={{ boxShadow: '0 2px 15px rgba(245, 158, 11, 0.6)' }} />
        
        {/* Borde inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 shadow-lg" style={{ boxShadow: '0 -2px 15px rgba(245, 158, 11, 0.6)' }} />
        
        {/* Borde izquierdo */}
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-yellow-500 via-amber-500 to-yellow-500 shadow-lg" style={{ boxShadow: '2px 0 15px rgba(245, 158, 11, 0.6)' }} />
        
        {/* Borde derecho */}
        <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-b from-yellow-500 via-amber-500 to-yellow-500 shadow-lg" style={{ boxShadow: '-2px 0 15px rgba(245, 158, 11, 0.6)' }} />
        
        {/* Esquinas decorativas con efecto brillante */}
        {/* Esquina superior izquierda */}
        <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-br-full" style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)' }} />
        
        {/* Esquina superior derecha */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-400 to-yellow-600 rounded-bl-full" style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)' }} />
        
        {/* Esquina inferior izquierda */}
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-amber-400 to-yellow-600 rounded-tr-full" style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)' }} />
        
        {/* Esquina inferior derecha */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-amber-400 to-yellow-600 rounded-tl-full" style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.8)' }} />
      </div>

      <Header />
      <main className="flex-grow animate-fade-in">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
