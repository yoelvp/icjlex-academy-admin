import { cva } from "class-variance-authority"

export const modalVariants = cva(
  "w-full shadow-lg rounded-t sm:rounded-md",
  {
    variants: {
      variant: {
        white: "bg-white"
      },
      size: {
        sm: "sm:max-w-md lg:max-w-lg xl:max-w-xl",
        md: "sm:max-w-lg lg:max-w-xl xl:max-w-2xl",
        lg: "sm:max-w-xl lg:max-w-2xl xl:max-w-4xl"
      }
    },
    defaultVariants: {
      variant: "white",
      size: "md"
    }
  }
)
