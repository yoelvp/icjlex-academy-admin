import type { AnchorHTMLAttributes } from 'react'
import type { ButtonBaseProps } from '.'

import { Link } from 'react-router-dom'
import { forwardRef } from 'react'
import { buttonVariants } from '@/@common/constants/button-variants'
import { twVariants } from '@/@common/utils/tailwindcss'

interface Props extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const NextLink = forwardRef<HTMLAnchorElement, Props>(({
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

NextLink.displayName = 'Button.NextLink'

export default NextLink
