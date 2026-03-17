/**
 * Sentry Configuration and Error Logging Service
 * 
 * Handles error tracking and monitoring for the application
 */

let Sentry = null
let BrowserTracing = null

// Lazy load Sentry to avoid issues in test environments
const loadSentry = async () => {
  if (!Sentry) {
    try {
      Sentry = await import('@sentry/react')
      BrowserTracing = (await import('@sentry/tracing')).BrowserTracing
    } catch (error) {
      console.warn('Failed to load Sentry:', error)
    }
  }
  return Sentry
}

/**
 * Initialize Sentry for error tracking
 * Should be called early in the application lifecycle
 */
export const initSentry = async () => {
  try {
    const sentry = await loadSentry()
    if (!sentry) return

    const dsn = import.meta.env.VITE_SENTRY_DSN
    
    // Only initialize if DSN is provided
    if (!dsn) {
      console.warn('Sentry DSN not configured. Error tracking disabled.')
      return
    }

    sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      integrations: [
        new BrowserTracing(),
        new sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      // Release tracking
      release: import.meta.env.VITE_APP_VERSION || '0.1.0',
    })
  } catch (error) {
    console.warn('Failed to initialize Sentry:', error)
  }
}

/**
 * Capture an exception and send to Sentry
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context information
 */
export const captureException = async (error, context = {}) => {
  try {
    const sentry = await loadSentry()
    if (!sentry) return

    sentry.captureException(error, {
      contexts: {
        app: context,
      },
    })
  } catch (err) {
    console.warn('Failed to capture exception:', err)
  }
}

/**
 * Capture a message and send to Sentry
 * @param {string} message - The message to capture
 * @param {string} level - The severity level (fatal, error, warning, info, debug)
 * @param {Object} context - Additional context information
 */
export const captureMessage = async (message, level = 'info', context = {}) => {
  try {
    const sentry = await loadSentry()
    if (!sentry) return

    sentry.captureMessage(message, level)
    if (Object.keys(context).length > 0) {
      sentry.setContext('custom', context)
    }
  } catch (err) {
    console.warn('Failed to capture message:', err)
  }
}

/**
 * Set user context for error tracking
 * @param {Object} user - User information
 */
export const setUserContext = async (user) => {
  try {
    const sentry = await loadSentry()
    if (!sentry) return

    if (user) {
      sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
      })
    } else {
      sentry.setUser(null)
    }
  } catch (err) {
    console.warn('Failed to set user context:', err)
  }
}

/**
 * Add breadcrumb for tracking user actions
 * @param {string} message - Breadcrumb message
 * @param {string} category - Breadcrumb category
 * @param {string} level - Severity level
 * @param {Object} data - Additional data
 */
export const addBreadcrumb = async (message, category = 'user-action', level = 'info', data = {}) => {
  try {
    const sentry = await loadSentry()
    if (!sentry) return

    sentry.addBreadcrumb({
      message,
      category,
      level,
      data,
      timestamp: Date.now() / 1000,
    })
  } catch (err) {
    console.warn('Failed to add breadcrumb:', err)
  }
}

/**
 * Create a Sentry error boundary wrapper
 * @param {React.Component} Component - Component to wrap
 * @returns {React.Component} Wrapped component
 */
export const withSentryErrorBoundary = async (Component) => {
  try {
    const sentry = await loadSentry()
    if (!sentry) return Component

    return sentry.withErrorBoundary(Component, {
      fallback: <div>An error has occurred</div>,
      showDialog: false,
    })
  } catch (err) {
    console.warn('Failed to wrap component with Sentry:', err)
    return Component
  }
}

export default {
  initSentry,
  captureException,
  captureMessage,
  setUserContext,
  addBreadcrumb,
  withSentryErrorBoundary,
}
