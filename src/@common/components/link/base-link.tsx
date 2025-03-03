import type { AnchorHTMLAttributes } from 'react'

import { Link } from 'react-router-dom'
import { forwardRef } from 'react'
import { buttonVariants } from '@/@common/constants/button-variants'
import { twVariants } from '@/@common/utils/tailwindcss'
import { ButtonBaseProps } from '@/@common/types/Button'

interface Props extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const ReactLink = forwardRef<HTMLAnchorElement, Props>(({
  children,
  className,
  variant,
  size,
  rounded,
  ...props
}, ref) => (
  <Link
    to={props.href}
    {...props}
    ref={ref}
    className={twVariants(buttonVariants({ variant, size, rounded, className }))}
  >
    {children}
  </Link>
))

ReactLink.displayName = 'ReactLink'

export default ReactLink
