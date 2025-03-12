import { ReactNode } from "react"
import { buttonVariants } from "../constants/button-variants"
import { VariantProps } from "class-variance-authority"

/**
 * Type representing the keys of the button variants.
 *
 * @see {@link buttonVariants} for the actual variant definitions.
 */
export type ButtonVariant = typeof buttonVariants

/**
 * Props for the base `Button` component.
 *
 * This interface extends `VariantProps` to include the variant options for the button,
 * and adds additional properties for styling and content.
 *
 * @extends VariantProps<ButtonVariant>
 *
 * @property className - Optional CSS class names to apply custom styling.
 * @property children - Optional content to be rendered inside the button.
 * @property disabled - Optional content to be rendered inside the button.
 */
export interface ButtonBaseProps extends VariantProps<ButtonVariant> {
  className?: string
  children?: ReactNode
  disabled?: boolean
  isLoading?: boolean
  loaderPosition?: LoaderPosition
  htmlType?: "submit" | "button" | "reset"
}

/**
 * Icon position in Button
 */
export type IconPosition = "left" | "right"

/**
 * Icon loader pissition in Button
 */
export type LoaderPosition = IconPosition
