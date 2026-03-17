/**
 * Button Component - Reusable button with multiple variants and sizes
 * 
 * Variants:
 * - primary: Black background with gold hover (main CTA)
 * - secondary: Gold background with darker gold hover
 * - outline: Transparent with black border
 * - ghost: Transparent with hover effect
 * 
 * Sizes:
 * - sm: Small button for secondary actions
 * - md: Medium button (default)
 * - lg: Large button for primary CTAs
 */

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2 whitespace-nowrap'

  const variants = {
    primary: 'bg-secondary-900 text-white hover:bg-secondary-800 active:bg-secondary-900 focus:ring-secondary-900 disabled:bg-secondary-400 shadow-md hover:shadow-lg',
    secondary: 'bg-primary-500 text-secondary-900 hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-300 shadow-md hover:shadow-lg font-semibold',
    outline: 'border-2 border-secondary-900 text-secondary-900 hover:bg-secondary-900 hover:text-white active:bg-secondary-800 focus:ring-secondary-900 disabled:border-secondary-400 disabled:text-secondary-400 transition-colors',
    ghost: 'text-secondary-900 hover:bg-secondary-100 active:bg-secondary-200 focus:ring-secondary-900 disabled:text-secondary-400',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
