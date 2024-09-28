import type { AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react'

import BaseLink from './base-link'
import { ButtonBaseProps } from '@/@common/types/Button'
import Icon from './icon'

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
interface LinkComponent extends ForwardRefExoticComponent<
  ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> &
  RefAttributes<HTMLAnchorElement>
> {
  Icon: typeof Icon
}

/**
 * Assigns subcomponents to the `Button` component and exports it.
 *
 * The `Button` component is cast to the `ButtonComponent` type to include
 * additional subcomponents. The `Link` and `NextLink` subcomponents are assigned
 * to `Button` for handling different types of links.
 */
const Link = BaseLink as LinkComponent
Link.Icon = Icon

/*
 * Export default Button component
 */
export default Link
