import { cva } from 'class-variance-authority'

export const menuVariants = cva('absolute z-50 bg-white rounded-sm py-4', {
  variants: {
    size: {
      xs: 'w-auto py-2 shadow--primary',
      md: 'w-40',
      lg: 'w-80'
    },
    defaultVariants: {
      size: 'lg'
    }
  }
})
