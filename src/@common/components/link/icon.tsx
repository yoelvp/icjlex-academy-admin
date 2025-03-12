import type { AnchorHTMLAttributes } from "react"
import type { ButtonBaseProps } from "@/@common/types/Button"

import { Link } from "react-router"
import { forwardRef } from "react"
import { buttonVariants } from "@/@common/constants/button-variants"
import { twVariants } from "@/@common/utils/tailwindcss"

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
    ref={ref}
    className={twVariants(buttonVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </Link>
))

Icon.displayName = "Link.Icon"

export default Icon
