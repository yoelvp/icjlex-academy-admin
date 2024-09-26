import type { FormBaseProps } from '.'

import { forwardRef } from 'react'
import { twVariants } from '@/@common/utils/tailwindcss'
import { inputVariants, iconVariants } from '@/@common/constants/input-variants'

export const Input = forwardRef<HTMLInputElement, FormBaseProps>(({
  id,
  className,
  containerClassName = '',
  variant,
  size,
  withIcon,
  icon: Icon,
  iconPosition = 'left',
  iconClassName = '',
  rounded,
  error,
  ...props
}, ref) => {
  return (
    <div className={`w-full relative ${containerClassName}`}>
      <input
        ref={ref}
        className={twVariants(inputVariants({
          variant: Boolean(error) ? 'error' : variant,
          size,
          rounded,
          className
        }))}
        {...props}
      />
      {Boolean(error) && (
        <span className="pl-4 text-error-500 text-sm">{error}</span>
      )}
      {withIcon && Icon && (
        <label
          htmlFor={id}
          className={twVariants(iconVariants({
            variant: Boolean(error) ? 'error' : variant,
            size,
            position: iconPosition,
            className: iconClassName
          }))}
        >
          <Icon />
        </label>
      )}
    </div>
  )
})

Input.displayName = 'Form.Input'
