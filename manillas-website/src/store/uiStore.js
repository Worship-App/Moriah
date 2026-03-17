/**
 * UI Store
 * Zustand store for managing UI state
 */

import { create } from 'zustand'

export const useUIStore = create((set) => ({
  isLoading: false,
  notification: null,
  modal: null,

  /**
   * Set loading state
   */
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Show notification
   */
  showNotification: (message, type = 'info', duration = 3000) => {
    set({ notification: { message, type, id: Date.now() } })
    if (duration > 0) {
      setTimeout(() => {
        set({ notification: null })
      }, duration)
    }
  },

  /**
   * Clear notification
   */
  clearNotification: () => set({ notification: null }),

  /**
   * Open modal
   */
  openModal: (modalData) => set({ modal: modalData }),

  /**
   * Close modal
   */
  closeModal: () => set({ modal: null }),
}))
