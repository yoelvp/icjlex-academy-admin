import { cva } from "class-variance-authority"
import { RoundedStyle } from "../styles/variants/rounded.variant"
import { SizeStyle } from "../styles/variants/size.variant"

export const inputVariants = cva(
  "w-full border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-offset-1",
  {
    variants: {
      variant: {
        primary: "border-primary-400 text-primary-500 placeholder:text-primary-200 disabled:bg-primary-50 disabled:border-primary-400 disabled:hover:text-primary-100 focus:ring-primary-500/20",
        secondary: "border-secondary-600 text-secondary-500 placeholder:text-secondary-200 disabled:bg-secondary-50 disabled:border-secondary-400 disabled:hover:text-secondary-100 focus:ring-secondary-500/20",
        white: "border-white text-white placeholder:text-primary-100 disabled:bg-white/60 disabled:border-white/60 focus:ring-white/15",
        error: "border-red-400 disabled:bg-red-50 disabled:border-red-400 disabled:hover:text-red-100 focus:ring-red-500/15"
      },
      size: SizeStyle,
      rounded: RoundedStyle,
      withIcon: {
        true: null,
        false: null
      },
      isInput: {
        true: null,
        false: null
      }
    },
    compoundVariants: [
      {
        size: ["sm", "md", "lg"],
        withIcon: true,
        isInput: true,
        class: "!pl-8"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md"
    }
  }
)

export const iconVariants = cva(
  "absolute",
  {
    variants: {
      variant: {
        primary: "text-primary-500",
        secondary: "text-secondary-500",
        white: "text-white/60",
        error: "text-error-500"
      },
      size: {
        sm: "text-sm top-[7px] md:top-[9px]",
        md: "text-lg top-[9px] md:top-[11px]",
        lg: "text-xl top-[12px] md:top-[14px]"
      },
      position: {
        left: "left-3",
        right: "right-3"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

export const passwordIconVariants = cva(
  "flex justify-center items-center",
  {
    variants: {
      variant: {
        primary: "text-primary-900",
        secondary: "text-secondary-900",
        white: "text-secondary-900",
        error: "text-error-500"
      },
      size: {
        sm: "h-4 w-8 text-lg top-[7px] md:top-[7px] md:text-xl md:h-5 md:w-10",
        md: "h-[1.4rem] w-12 text-xl top-[7px] md:text-2xl md:top-[8px] md:h-6",
        lg: "h-[1.75rem] w-12 text-2xl top-[9px] md:h-8"
      },
      rounded: {
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded",
        lg: "rounded-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md"
    }
  }
)
