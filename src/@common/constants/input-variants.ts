import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'w-full border rounded-xl text-base focus:outline-none focus:ring',
  {
    variants: {
      variant: {
        primary: 'border-primary-400 text-primary-500 placeholder:text-primary-200 disabled:bg-primary-50 disabled:border-primary-400 disabled:hover:text-primary-100 focus:ring-primary-500/20',
        secondary: 'border-secondary-600 text-secondary-500 placeholder:text-secondary-200 disabled:bg-secondary-50 disabled:border-secondary-400 disabled:hover:text-secondary-100 focus:ring-secondary-500/20',
        white: 'border-white text-white placeholder:text-primary-100 disabled:bg-white/60 disabled:border-white/60 focus:ring-white/15',
        error: 'border-error-400 text-error-500 placeholder:text-error-200 disabled:bg-error-50 disabled:border-error-400 disabled:hover:text-error-100 focus:ring-error-500/15'
      },
      size: {
        sm: 'h-[1.75rem] pl-8 pr-6 text-sm font-medium md:h-[2rem] md:font-normal',
        md: 'h-[2.25rem] pl-8 pr-6 md:h-[2.5rem]',
        lg: 'h-[2.75rem] pl-8 pr-6 md:h-[3rem]'
      },
      rounded: {
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'lg'
    }
  }
)

export const iconVariants = cva(
  'absolute top-1/2 -translate-y-1/2',
  {
    variants: {
      variant: {
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        white: 'text-white/60',
        error: 'text-error-500'
      },
      size: {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-xl'
      },
      position: {
        left: 'left-3',
        right: 'right-3'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export const passwordIconVariants = cva(
  'flex justify-center items-center',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 text-primary-900 hover:bg-primary-200',
        secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300',
        white: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300',
        error: 'bg-error-100/50 text-error-500'
      },
      size: {
        sm: 'h-4 w-8 text-sm md:h-5 md:w-10',
        md: 'h-[1.4rem] w-12 text-lg md:h-6',
        lg: 'h-[1.75rem] w-12 md:h-8 text-xl'
      },
      rounded: {
        xs: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md'
    }
  }
)
