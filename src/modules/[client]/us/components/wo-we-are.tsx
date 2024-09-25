import Button from '@/@common/components/button'
import { SocialMediaLink } from './social-media-link'
import { Content } from '@/@common/components/content'
import { IoIosArrowRoundForward } from 'react-icons/io'
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconX,
  IconWhatsapp,
  IconYoutube,
  IconBookMarked,
  IconPresentation,
  IconSupport
} from '@/assets/icons'

export const WhoWeAre = () => {
  return (
    <Content className="mt-[-100px]">
      <div className=" h-full px-6 py-16 flex flex-col gap-16 lg:flex-row border-2 border-primary-50 rounded-[32px] mb-32  bg-white">
        <section className="lg:w-9/12 h-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded flex-col-center shadow--primary p-8 gap-y-8">
            <IconBookMarked className="text-[64px] text-primary-400 mb-4" />
            <div className="space-y-2">
              <strong className="font-semibold text-lg text-primary-700 pb-2">Educación de excelencia</strong>
              <p className="text-primary-500 text-center">Ofrecemos cursos diseñados y dictados por expertos jurídicos.</p>
            </div>
          </div>

          <div className="rounded flex-col-center gap-y-8 shadow--primary px-2 py-8">
            <IconPresentation className="text-[64px] text-primary-400 mb-4" />
            <div className="space-y-2 flex-col-center">
              <strong className="font-semibold text-lg text-primary-700 text-center pb-2">Contenido actualizado</strong>
              <p className="text-primary-500 text-center">Mantenemos nuestros cursos al día con las últimas tendencias.</p>
            </div>
          </div>

          <div className="rounded flex-col-center gap-y-8 shadow--primary px-2 py-8 md:col-span-2">
            <IconSupport className="text-[64px] text-primary-400 mb-4" />
            <div className="space-y-2 flex-col-center">
              <strong className="font-semibold text-lg text-primary-700 text-center pb-2">Soporte y tutoría</strong>
              <p className="text-primary-500 text-center">Contamos con un equipo de soporte y tutores disponibles para ayudarte en cada paso de tu formación</p>
            </div>
          </div>
        </section>

        <article className="flex justify-between flex-col gap-12 lg:w-9/12">
          <section className="flex justify-between flex-col gap-8 ">
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-semibold text-primary-700">¿Quiénes somos?</h2>
              <p className="text-primary-400">ICJ LEX & CARRANZA CONSULTORES, es una empresa peruana que brinda consultoría, capacitación y auditorías de Sistemas de Gestión, compliance, sostenibilidad y Servicios Integrales de Seguridad y Salud en el Trabajo, enfocada en brindar un servicio de calidad y que contribuya al desarrollo sostenible de las organizaciones. <br /><br />
                Contamos con un equipo multidisciplinario y con experiencia en consultoría de Sistemas de Gestión, los cuales se rigen a los lineamientos y metodología de nuestra organización, diseñada pensando en las necesidades y expectativas de los clientes.</p>
            </div>

            <div className="block">
              <Button htmlType="button" variant="secondary">
                Explora todos nuestros cursos
                <IoIosArrowRoundForward size="24" />
              </Button>
            </div>
          </section>

          <div className="grid gap-4">
            <p className="text-primary-300">Síguenos en: </p>
            <div className="flex justify-start gap-4">
              <SocialMediaLink href="https://youtube.com" variant="primary">
                <IconLinkedin size={24} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="primary">
                <IconFacebook size={24} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="primary">
                <IconX size={24} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="primary">
                <IconInstagram size={24} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="primary">
                <IconYoutube size={24} />
              </SocialMediaLink>

              <SocialMediaLink href="https://youtube.com" variant="primary">
                <IconWhatsapp size={24} />
              </SocialMediaLink>
            </div>
          </div>
        </article>
      </div>
    </Content>
  )
}
