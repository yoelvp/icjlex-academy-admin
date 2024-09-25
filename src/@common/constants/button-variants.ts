import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded-lg flex gap-x-2 text-nowrap font-medium items-center justify-center outline-none transition-colors duration-300 focus:ring',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-primary-50 hover:bg-primary-600 disabled:bg-primary-200 disabled:text-primary-400 focus:bg-primary-700 focus:ring-primary-500/25',
        secondary: 'bg-secondary-500 text-primary-500 hover:bg-secondary-600 disabled:bg-secondary-200 disabled:text-primary-400 focus:ring-secondary-500/40',
        white: 'bg-white text-primary-500 hover:bg-primary-50 disabled:bg-primary-100 disabled:text-primary-400 focus:bg-primary-50 focus:ring-white/25',
        error: 'bg-error-500 text-white hover:bg-error-600 disabled:bg-error-300 disabled:text-error-50 focus:bg-error-600 focus:ring-error-500/25',
        warning: 'bg-warning-500 text-warning-900 hover:bg-warning-600 disabled:bg-warning-200 disabled:text-warning-600 focus:bg-warning-600 focus:ring-warning-500/40',
        success: 'bg-success-500 text-white hover:bg-success-600 disabled:bg-success-200 disabled:text-success-500 focus:bg-success-600 focus:ring-success-500/25',
        'primary.outline': 'border border-primary-500 text-primary-500 hover:border-primary-700 disabled:border-primary-300 disabled:text-primary-300 focus:ring-primary-600/25',
        'primary.text': 'bg-primary-50/25 text-primary-500 hover:bg-primary-50/50 hover:text-primary-700 disabled:text-primary-300 disabled:hover:bg-primary-50/25 focus:ring-primary-500/15',
        'primary.link': 'text-primary-500 underline transition-[text-decoration-style] duration-300 hover:decoration-wavy hover:text-primary-700 disabled:text-primary-300 focus:ring-primary-700/25',
        'primary.underline': 'text-primary-500 !rounded-none btn-underline btn-underline--primary hover:text-primary-700 disabled:text-primary-300 focus:ring-transparent',
        'secondary.outline': 'default',
        'secondary.text': 'bg-secondary-50 text-secondary-700 hover:bg-secondary-100/80 disabled:text-secondary-400 disabled:hover:bg-secondary-50 focus:bg-secondary-100/80 focus:ring-secondary-500/25',
        'secondary.link': 'text-secondary-500 !rounded-none btn-underline btn-underline--secondary hover:text-secondary-700 disabled:text-secondary-300 !focus:ring-transparent',
        'white.outline': 'default',
        'white.text': 'default',
        'white.link': 'text-white !rounded-none btn-underline btn-underline--white hover:text-secondary-700 disabled:text-secondary-300 focus:!ring-none',
        'error.outline': 'default',
        'error.text': 'default',
        'error.link': 'default',
        'warning.outline': 'default',
        'warning.text': 'default',
        'warning.link': 'default',
        'success.outline': 'default',
        'success.text': 'default',
        'success.link': 'default'
      },
      size: {
        xs: 'h-[1.5rem] px-3 text-xs font-medium md:h-[1.75rem] md:px-4',
        sm: 'h-[2rem] px-4 sm:h-[2.25rem] sm:px-6',
        md: 'h-[2.5rem] px-6 sm:h-[2.75rem] sm:px-8',
        lg: 'h-[3rem] px-8 sm:h-[3.25rem] sm:px-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  })
