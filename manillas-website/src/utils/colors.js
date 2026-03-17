/**
 * Color Palette Configuration
 * Premium, elegant color scheme for the manillas website
 * 
 * Main Colors:
 * - Primary: Deep Black (#1a1a1a)
 * - Secondary: Premium Gold (#d4af37)
 * - Accent: Off-white/Cream (#f5f5f1)
 */

export const colors = {
  // Primary Colors
  primary: {
    50: '#f9f7f4',
    100: '#f3efe8',
    200: '#e7dfd1',
    300: '#dccfba',
    400: '#c4af7f',
    500: '#d4af37', // Main gold
    600: '#b8941f',
    700: '#9c7a17',
    800: '#80600f',
    900: '#644607',
  },

  // Secondary Colors (Black)
  secondary: {
    50: '#f8f8f8',
    100: '#f0f0f0',
    200: '#e0e0e0',
    300: '#d0d0d0',
    400: '#a8a8a8',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a', // Main black
  },

  // Accent Colors (Off-white)
  accent: {
    50: '#ffffff',
    100: '#fafaf8',
    200: '#f5f5f1',
    300: '#f0f0ea',
    400: '#e5e5dd',
    500: '#d9d9d1',
    600: '#c0c0b8',
    700: '#a7a79f',
    800: '#8e8e86',
    900: '#75756d',
  },

  // Semantic Colors
  success: '#16a34a',
  successLight: '#86efac',
  warning: '#ea580c',
  warningLight: '#fed7aa',
  error: '#dc2626',
  errorLight: '#fecaca',
  info: '#0284c7',
  infoLight: '#7dd3fc',

  // Text Colors
  text: '#1a1a1a',
  textLight: '#666666',
  textLighter: '#999999',
  textInverse: '#ffffff',

  // Border Colors
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderDark: '#cccccc',
};

/**
 * Color Aliases for easier usage
 */
export const colorAliases = {
  // Main brand colors
  brand: colors.secondary[900], // Black
  brandGold: colors.primary[500], // Gold
  brandLight: colors.accent[200], // Off-white

  // UI colors
  background: colors.accent[50],
  surface: colors.accent[100],
  surfaceHover: colors.accent[200],
  
  // Text colors
  textPrimary: colors.text,
  textSecondary: colors.textLight,
  textTertiary: colors.textLighter,
  textOnBrand: colors.accent[50],

  // Interactive colors
  interactive: colors.primary[500],
  interactiveHover: colors.primary[600],
  interactiveActive: colors.primary[700],

  // Feedback colors
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
};

/**
 * Shadow definitions
 */
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  premium: '0 10px 30px rgba(212, 175, 55, 0.15)',
  premiumDark: '0 10px 30px rgba(26, 26, 26, 0.2)',
};

/**
 * Spacing scale
 */
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
};

/**
 * Typography scale
 */
export const typography = {
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * Border radius scale
 */
export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
};

/**
 * Transition durations
 */
export const transitions = {
  fast: '150ms ease-in-out',
  base: '300ms ease-in-out',
  slow: '500ms ease-in-out',
};

/**
 * Z-index scale
 */
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

/**
 * Utility function to get color with opacity
 * @param {string} color - Color hex value
 * @param {number} opacity - Opacity value (0-1)
 * @returns {string} RGBA color string
 */
export const withOpacity = (color, opacity) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Utility function to lighten a color
 * @param {string} color - Color hex value
 * @param {number} percent - Percentage to lighten (0-100)
 * @returns {string} Lightened color hex
 */
export const lighten = (color, percent) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.round(r + (255 - r) * (percent / 100));
  const newG = Math.round(g + (255 - g) * (percent / 100));
  const newB = Math.round(b + (255 - b) * (percent / 100));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

/**
 * Utility function to darken a color
 * @param {string} color - Color hex value
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darkened color hex
 */
export const darken = (color, percent) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.round(r * (1 - percent / 100));
  const newG = Math.round(g * (1 - percent / 100));
  const newB = Math.round(b * (1 - percent / 100));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

export default {
  colors,
  colorAliases,
  shadows,
  spacing,
  typography,
  borderRadius,
  transitions,
  zIndex,
  withOpacity,
  lighten,
  darken,
};
