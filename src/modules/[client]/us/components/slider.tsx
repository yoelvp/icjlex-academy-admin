import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Link from '@/@common/components/link'
import { SocialMediaLink } from './social-media-link'
import {
  IconArrowRoundForward,
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconX,
  IconWhatsapp,
  IconYoutube
} from '@/assets/icons'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const ImageSlider = ({ teachers }) => {
  if (!teachers || teachers.length === 0) {
    return <p>No hay docentes disponibles</p>
  }

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
      {teachers?.map((teacher, index) => (
        <SwiperSlide
          key={index}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <section className="m-2 px-4 py-6 shadow--primary rounded-lg flex flex-col gap-8 text-center justify-center items-center max-w-[400px]">
            <img
              src={
                teacher.imageUrl ||
                'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png'
              }
              alt={teacher.firstName}
              className="rounded-full border-2 border-primary-200 h-[128px] w-[128px] object-cover object-top"
            />

            <div className="gap-2 h-60 w-full flex flex-col">
              <div>
                <span className="text-[24px] text-primary-500 font-semibold">
                  {teacher.firstName} {teacher.lastName}
                </span>
                <p className="text-primary-300">{teacher.profession}</p>
              </div>
              <div>
                <p className="text-primary-500 pt-4 line-clamp-5 text-start">
                  {teacher.aboutMe}
                </p>
              </div>
            </div>

            <div className="flex justify-start gap-4">
              <SocialMediaLink
                href={teacher?.socialMedia?.linkedin || '#'}
                variant="secondary"
              >
                <IconLinkedin size={18} />
              </SocialMediaLink>

              <SocialMediaLink
                href={teachers?.socialMedia?.facebook || '#'}
                variant="secondary"
              >
                <IconFacebook size={18} />
              </SocialMediaLink>

              <SocialMediaLink
                href={teachers?.socialMedia?.x || '#'}
                variant="secondary"
              >
                <IconX size={18} />
              </SocialMediaLink>

              <SocialMediaLink
                href={teachers?.socialMedia?.instagram || '#'}
                variant="secondary"
              >
                <IconInstagram size={18} />
              </SocialMediaLink>

              <SocialMediaLink
                href={teachers?.socialMedia?.youtube || '#'}
                variant="secondary"
              >
                <IconYoutube size={18} />
              </SocialMediaLink>

              <SocialMediaLink
                href={teachers?.socialMedia?.whatsapp || '#'}
                variant="secondary"
              >
                <IconWhatsapp size={18} />
              </SocialMediaLink>
            </div>

            <div className="w-full flex justify-between">
              <Link variant={'primary.text'}>
                Ver más
                <IconArrowRoundForward size="24" />
              </Link>
              <Link variant="primary">Ver cursos</Link>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
