import type { AnchorHTMLAttributes } from 'react'
import type { ButtonBaseProps } from '.'

import { forwardRef } from 'react'
import { buttonVariants } from '@/@common/constants/button-variants'
import { twVariants } from '@/@common/utils/tailwindcss'

interface Props extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {}

const ButtonLink = forwardRef<HTMLAnchorElement, Props>(({
  children,
  className = '',
  variant,
  size,
  ...props
}, ref) => {
  return (
    <a
      {...props}
      ref={ref}
      className={twVariants(buttonVariants({ variant, size, className }))}
    >
      {children}
    </a>
  )
})

ButtonLink.displayName = 'Button.Link'

export default ButtonLink
