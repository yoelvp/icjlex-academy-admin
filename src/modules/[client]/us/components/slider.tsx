'use client'

import type { FC } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Button from '@/@common/components/button'
import { SocialMediaLink } from './social-media-link'
import { IconArrowRoundForward, IconFacebook, IconInstagram, IconLinkedin, IconX, IconWhatsapp, IconYoutube } from '@/assets/icons'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  images: string[]
}

export const ImageSlider: FC<Props> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      breakpoints={{
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }}
      className="py-4"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <section className="m-2 px-4 py-6 shadow--primary rounded-lg flex flex-col gap-8 text-center justify-center items-center max-w-[400px]">

            <img src={image} alt="teacher image" className="rounded-full border-2 border-primary-200 h-[128px] w-[128px] object-cover object-top" />

            <div className="grid gap-2">
              <span className="text-[24px] text-primary-500 font-semibold">Shechira Katherine Mendoza Avila</span>
              <p className="text-primary-300">Derecho Notarial y Registral</p>
              <p className="text-primary-500 pt-4">Estudios culminados en la maestría d de la Universidad Señor de Sipán, con 04 años de experiencia en materia registral ejerciendo como analista registral en la Sunarp. Asimismo cuenta con cursos de especialización en derecho civil, notarial, registral y familia.            </p>
            </div>

            <div className="flex justify-start gap-4">
              <SocialMediaLink href="https://youtube.com" variant="secondary">
                <IconLinkedin size={18} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="secondary">
                <IconFacebook size={18} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="secondary">
                <IconX size={18} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="secondary">
                <IconInstagram size={18} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="secondary">
                <IconYoutube size={18} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="secondary">
                <IconWhatsapp size={18} />
              </SocialMediaLink>
            </div>

            <div className="w-full flex justify-between">
              <Button.Link variant={'primary.text'}>
                Ver más
                <IconArrowRoundForward size="24" />
              </Button.Link>
              <Button htmlType="button" variant="primary">
                Ver cursos
              </Button>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper >
  )
}
