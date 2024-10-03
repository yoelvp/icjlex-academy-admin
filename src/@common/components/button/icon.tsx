import type { AnchorHTMLAttributes } from 'react'

import { Link } from 'react-router-dom'
import { forwardRef } from 'react'
import { buttonVariants } from '@/@common/constants/button-variants'
import { twVariants } from '@/@common/utils/tailwindcss'
import { ButtonBaseProps } from '@/@common/types/Button'

interface Props extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const Icon = forwardRef<HTMLAnchorElement, Props>(({
  children,
  className,
  variant,
  size,
  ...props
}, ref) => (
  <Link
    to={props.href}
    {...props}
    ref={ref}
    className={twVariants(buttonVariants({ variant, size, className }))}
  >
    {children}
  </Link>
))

Icon.displayName = 'Button.Icon'

export default Icon
