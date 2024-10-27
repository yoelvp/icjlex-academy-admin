import type { FormBaseProps } from '.'

import { forwardRef, useState } from 'react'
import { twVariants } from '@/@common/utils/tailwindcss'
import { inputVariants, passwordIconVariants, iconVariants } from '@/@common/constants/input-variants'
import { IconEye, IconEyeOff } from '@/assets/icons'

export const Password = forwardRef<HTMLInputElement, FormBaseProps>(({
  id,
  className = '',
  variant,
  size,
  rounded,
  withIcon,
  icon: Icon,
  iconPosition = 'left',
  iconClassName = '',
  type,
  error,
  ...props
}, ref) => {
  const [isIconPasswordVisible, setIsIconPasswordVisible] = useState(false)

  return (
    <div className="w-full relative">
      <input
        ref={ref}
        className={twVariants(inputVariants({
          variant: error ? 'error' : variant,
          size,
          rounded,
          className
        }))}
        type={isIconPasswordVisible ? 'text' : 'password'}
        {...props}
      />
      {Boolean(error) && (
        <span className="pl-4 text-error-500 text-sm">{error}</span>
      )}
      <button
        type="button"
        onClick={() => setIsIconPasswordVisible(!isIconPasswordVisible)}
        className={twVariants(passwordIconVariants({
          variant,
          size,
          rounded,
          className: 'absolute right-2'
        }))}
      >
        {isIconPasswordVisible ? <IconEyeOff /> : <IconEye />}
      </button>
      {Boolean(withIcon) && Icon && (
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

Password.displayName = 'Form.Password'
