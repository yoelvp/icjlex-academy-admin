import type { FC, ReactNode } from 'react'
import type { VariantProps } from 'class-variance-authority'

import { Link } from 'react-router-dom'
import { twVariants } from '@/@common/utils/tailwindcss'
import { socialMediaVariants } from '../constants/social-media-variants'

type Variant = typeof socialMediaVariants

interface Props extends VariantProps<Variant> {
  children: ReactNode
  href: string
  className?: string
}

export const SocialMediaLink: FC<Props> = ({ children, variant, href, className }) => {
  return (
    <Link to={href} target="_blank" className={twVariants(socialMediaVariants({ variant, className }))}>
      {children}
    </Link >
  )
}
