import type { FormBaseProps } from '.'

import { forwardRef, useState } from 'react'
import { twVariants } from '@/@common/utils/tailwindcss'
import { inputVariants, passwordIconVariants, iconVariants } from '@/@common/constants/input-variants'
import { IconEye, IconEyeOff } from '@/assets/icons'

export const Password = forwardRef<HTMLInputElement, FormBaseProps>(({
  className = '',
  variant,
  size,
  rounded,
  withIcon,
  icon: Icon,
  iconPosition = 'left',
  iconClassName = '',
  hasError,
  type,
  ...props
}, ref) => {
  const [isIconPasswordVisible, setIsIconPasswordVisible] = useState(false)

  return (
    <div className="w-full relative">
      <input
        ref={ref}
        className={twVariants(inputVariants({
          variant: hasError ? 'error' : variant,
          size,
          rounded,
          className
        }))}
        type={isIconPasswordVisible ? 'text' : 'password'}
        {...props}
      />
      <button
        onClick={() => setIsIconPasswordVisible(!isIconPasswordVisible)}
        className={twVariants(passwordIconVariants({
          variant,
          size,
          rounded,
          className: 'absolute top-1/2 right-3 -translate-y-1/2'
        }))}
      >
        {isIconPasswordVisible ? <IconEyeOff /> : <IconEye />}
      </button>
      {Boolean(withIcon) && Icon && (
        <div
          className={twVariants(iconVariants({
            variant: hasError ? 'error' : variant,
            size,
            position: iconPosition,
            className: iconClassName
          }))}>
          <Icon />
        </div>
      )}
    </div>
  )
})

Password.displayName = 'Form.Password'
