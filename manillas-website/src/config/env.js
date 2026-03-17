/**
 * Environment Configuration
 * Provides safe defaults for all environment variables
 */

export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || '',
  
  // Business Contact Information
  businessEmail: import.meta.env.VITE_BUSINESS_EMAIL || 'contacto@manillas.com',
  businessWhatsapp: import.meta.env.VITE_BUSINESS_WHATSAPP || '+573001234567',
  businessPhone: import.meta.env.VITE_BUSINESS_PHONE || '+573001234567',
  
  // Social Media
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com',
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com',
  tiktokUrl: import.meta.env.VITE_TIKTOK_URL || 'https://tiktok.com',
  linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com',
  
  // Analytics
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
  
  // Error Tracking
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
  
  // Application
  appVersion: import.meta.env.VITE_APP_VERSION || '0.1.0',
  environment: import.meta.env.MODE || 'production',
  
  // Helpers
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
}

export default config
