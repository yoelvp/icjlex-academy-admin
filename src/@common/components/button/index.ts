import type { ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'

import ButtonBase from './button'
import ButtonLink from './link'
import ButtonNextLink from './next-link'
import { buttonVariants } from '@/@common/constants/button-variants'

/**
 * Interface for the `Button` component used with `forwardRef`.
 *
 * This interface defines the type of component that can receive refs and has two subcomponents:
 * `Link` and `NextLink`.
 *
 * @extends ForwardRefExoticComponent<PropsWithoutRef<ButtonBaseProps> & RefAttributes<HTMLButtonElement>>
 *
 * @property Link - Subcomponent for handling standard links.
 * @property NextLink - Subcomponent for handling Next.js links.
 */
interface ButtonComponent extends ForwardRefExoticComponent<
  PropsWithoutRef<ButtonBaseProps> &
  RefAttributes<HTMLButtonElement>
> {
  Link: typeof ButtonLink
  NextLink: typeof ButtonNextLink
}

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
 */
export interface ButtonBaseProps extends VariantProps<ButtonVariant> {
  className?: string
  children?: ReactNode
  disabled?: boolean
  htmlType?: 'submit' | 'button' | 'reset' | undefined
}

/**
 * Icon position in Button
 */
export type IconPosition = 'left' | 'right'

/**
 * Assigns subcomponents to the `Button` component and exports it.
 *
 * The `Button` component is cast to the `ButtonComponent` type to include
 * additional subcomponents. The `Link` and `NextLink` subcomponents are assigned
 * to `Button` for handling different types of links.
 */
const Button = ButtonBase as ButtonComponent
Button.Link = ButtonLink
Button.NextLink = ButtonNextLink

/*
 * Export default Button component
 */
export default Button
