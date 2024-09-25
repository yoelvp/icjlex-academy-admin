import type { FormBaseProps } from '.'

import { forwardRef } from 'react'
import { twVariants } from '@/@common/utils/tailwindcss'
import { inputVariants, iconVariants } from '@/@common/constants/input-variants'

export const Input = forwardRef<HTMLInputElement, FormBaseProps>(({
  className,
  containerClassName = '',
  variant,
  size,
  withIcon,
  icon: Icon,
  iconPosition = 'left',
  iconClassName = '',
  rounded,
  hasError,
  ...props
}, ref) => {
  return (
    <div className={`w-full relative ${containerClassName}`}>
      <input
        ref={ref}
        className={twVariants(inputVariants({
          variant: hasError ? 'error' : variant,
          size,
          rounded,
          className
        }))}
        {...props}
      />
      {withIcon && Icon && (
        <div
          className={twVariants(iconVariants({
            variant: hasError ? 'error' : variant,
            size,
            position: iconPosition,
            className: iconClassName
          }))}
        >
          <Icon />
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Form.Input'
