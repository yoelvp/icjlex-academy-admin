import type { FormHTMLAttributes } from "react"

import { forwardRef } from "react"

interface Props extends FormHTMLAttributes<HTMLFormElement> { }

export const Form = forwardRef<HTMLFormElement, Props>(({
  ...props
}, ref) => (
  <form ref={ref} {...props} />
))

Form.displayName = "Form"
