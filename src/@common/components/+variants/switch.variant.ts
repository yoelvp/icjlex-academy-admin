import { RoundedStyle } from "@/@common/styles/variants/rounded.variant"
import { cva } from "class-variance-authority"

export const switchVariants = cva(
  "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md",
  {
    variants: {
      variant: {
        true: "bg-green-100 text-success-800",
        false: "bg-red-100 text-error-800"
      },
      rounded: RoundedStyle
    },
    defaultVariants: {
      variant: true
    }
  }
)
