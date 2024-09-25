import type { FC } from 'react'

import { Content } from '@/@common/components/content'
import { Icon } from './icon'
import { SocialMediaLink } from './social-media-link'
import { UsForm } from './form'
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconX,
  IconWhatsapp,
  IconYoutube,
  IconMail,
  IconPhone
} from '@/assets/icons'

export const SectionForm: FC = () => {
  return (
    <section className="py-32 bg-primary-50 mt-32">
      <Content className="flex gap-8 flex-col">
        <h3 className="text-[32px] font-semibold text-primary-500 md:text-center">Ponte en contacto con nosotros</h3>

        <div className="w-full flex flex-col items-center md:flex-row gap-8 md:items-center md:justify-center lg:gap-16">
          <UsForm />

          <div className="grid gap-6">
            <div className="gap-4 flex items-center h-auto">
              <Icon variant="primary">
                <IconPhone size={24} />
              </Icon>
              <div>
                <span className="text-primary-300">Teléfono</span>
                <p className="text-primary-500 text-[24px]">941036553</p>
              </div>
            </div>

            <div className="gap-4 flex items-center h-auto ">
              <Icon variant="primary">
                <IconMail size={24} />
              </Icon>
              <div>
                <span className="text-primary-300">Correo</span>
                <p className="text-primary-500 text-[24px]">icjlex@academy.edu</p>
              </div>
            </div>

            <div className="grid gap-4">
              <p className="text-primary-300">Síguenos en: </p>
              <div className="flex h-auto items-center gap-4">
                <SocialMediaLink href="https://youtube.com" variant="secondary">
                  <IconLinkedin size={32} />
                </SocialMediaLink>

                <SocialMediaLink href="https://youtube.com" variant="secondary">
                  <IconFacebook size={32} />
                </SocialMediaLink>

                <SocialMediaLink href="https://youtube.com" variant="secondary">
                  <IconX size={32} />
                </SocialMediaLink>

                <SocialMediaLink href="https://youtube.com" variant="secondary">
                  <IconInstagram size={32} />
                </SocialMediaLink>

                <SocialMediaLink href="https://youtube.com" variant="secondary">
                  <IconYoutube size={32} />
                </SocialMediaLink>

                <SocialMediaLink href="https://youtube.com" variant="secondary">
                  <IconWhatsapp size={32} />
                </SocialMediaLink>
              </div>
            </div>

          </div>
        </div>
      </Content >
    </section >
  )
}
