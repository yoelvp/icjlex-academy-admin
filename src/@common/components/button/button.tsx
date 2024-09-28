import type { ButtonHTMLAttributes } from 'react'

import { forwardRef } from 'react'
import { twVariants } from '@/@common/utils/tailwindcss'
import { buttonVariants } from '@/@common/constants/button-variants'
import { ButtonBaseProps } from '@/@common/types/Button'

interface Props extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> { }

const Button = forwardRef<HTMLButtonElement, Props>(({
  children,
  className = '',
  variant,
  size,
  htmlType,
  ...props
}, ref) => (
  <button
    ref={ref}
    className={twVariants(buttonVariants({ variant, size, className }))}
    type={htmlType}
    {...props}
  >
    {children}
  </button>
))

Button.displayName = 'Button'

export default Button
