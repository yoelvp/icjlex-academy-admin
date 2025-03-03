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
          variant: error ? 'error' : variant,
          size,
          rounded,
          isInput: true,
          withIcon,
          className
        }))}
        {...props}
      />
      {Boolean(error) && (
        <span className="pl-2 text-error-400 text-xs">{error}</span>
      )}
      {withIcon && Icon && (
        <label
          htmlFor={id}
          className={twVariants(iconVariants({
            variant: error ? 'error' : variant,
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
