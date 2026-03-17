import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatBot from '../Chat/ChatBot'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow animate-fade-in">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
