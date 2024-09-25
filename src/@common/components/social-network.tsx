import type { FC } from 'react'
import {
  IconLinkedin,
  IconFacebook,
  IconX,
  IconInstagram,
  IconYoutube,
  IconWhatsapp
} from '@/assets/icons'

export const SocialNetwork: FC = () => {
  return (
    <div className="flex gap-x-4">
      <a href="/">
        <IconLinkedin size="24" />
      </a>
      <a href="/">
        <IconFacebook size="24" />
      </a>
      <a href="/">
        <IconX size="24" />
      </a>
      <a href="/">
        <IconInstagram size="24" />
      </a>
      <a href="/">
        <IconYoutube size="24" />
      </a>
      <a href="/">
        <IconWhatsapp size="24" />
      </a>
    </div>
  )
}
