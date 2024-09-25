import type { ButtonHTMLAttributes } from 'react'
import type { ButtonBaseProps } from '.'

import { forwardRef } from 'react'
import { twVariants } from '@/@common/utils/tailwindcss'
import { buttonVariants } from '@/@common/constants/button-variants'

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
