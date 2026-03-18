import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { initSentry } from './services/sentryService'
import { ThemeProvider } from './context/ThemeContext'

// Initialize Sentry for error tracking
initSentry().catch(err => console.warn('Failed to initialize Sentry:', err))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
