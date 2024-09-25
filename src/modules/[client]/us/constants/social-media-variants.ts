import { cva } from 'class-variance-authority'

export const socialMediaVariants = cva(
  'text-primary-400 rounded-full',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white p-1',
        secondary: 'bg-secondary-500 text-primary-500 rounded-full p-1'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)
