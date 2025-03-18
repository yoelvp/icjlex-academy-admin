import { cva } from "class-variance-authority"
import { RoundedStyle } from "../styles/variants/rounded.variant"
import { SizeStyle } from "../styles/variants/size.variant"
import { ButtonStyle } from "../styles/variants/button.variant"

export const buttonVariants = cva(
  "flex gap-x-2 text-nowrap font-medium items-center justify-center outline-none transition-colors duration-300 focus:ring",
  {
    variants: {
      variant: ButtonStyle,
      size: SizeStyle,
      rounded: RoundedStyle
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md"
    }
  })

export const buttonIconVariants = cva(
  "flex-center text-nowrap font-medium outline-none focus:ring",
  {
    variants: {
      variant: ButtonStyle,
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12"
      },
      rounded: RoundedStyle
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md"
    }
  }
)
