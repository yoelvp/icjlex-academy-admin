import type { ButtonHTMLAttributes } from 'react'

import { forwardRef } from 'react'
import { buttonIconVariants } from '@/@common/constants/button-variants'
import { twVariants } from '@/@common/utils/tailwindcss'
import { ButtonBaseProps } from '@/@common/types/Button'

type Props = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>

const Icon = forwardRef<HTMLButtonElement, Props>(({
  children,
  className,
  variant,
  size,
  ...props
}, ref) => (
  <button
    ref={ref}
    className={twVariants(buttonIconVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </button>
))

Icon.displayName = 'Button.Icon'

export default Icon
