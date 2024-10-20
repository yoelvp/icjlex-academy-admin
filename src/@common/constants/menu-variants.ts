import { cva } from 'class-variance-authority'

export const menuVariants = cva('absolute z-50 bg-white rounded-sm', {
  variants: {
    size: {
      xs: 'w-auto shadow--primary',
      sm: 'w-auto shadow--primary',
      md: 'w-40',
      lg: 'w-80'
    },
    defaultVariants: {
      size: 'lg'
    }
  }
})
