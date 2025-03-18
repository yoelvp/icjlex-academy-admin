import type { ButtonHTMLAttributes } from "react"

import { forwardRef } from "react"
import { twVariants } from "@/@common/utils/tailwindcss"
import { buttonVariants } from "@/@common/constants/button-variants"
import { ButtonBaseProps } from "@/@common/types/Button"
import { Spinner } from "../spinner"

interface Props extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> { }

const Button = forwardRef<HTMLButtonElement, Props>(({
  children,
  className = "",
  variant,
  size,
  rounded,
  htmlType,
  isLoading,
  loaderPosition = "left",
  ...props
}, ref) => (
  <button
    ref={ref}
    className={twVariants(buttonVariants({ variant, size, className, rounded }))}
    type={htmlType}
    {...props}
  >
    {loaderPosition === "left" && isLoading && (
      <Spinner />
    )}
    {children}
    {loaderPosition === "right" && isLoading && (
      <Spinner />
    )}
  </button>
))

Button.displayName = "Button"

export default Button
