import { Content } from '@/@common/components/content'
import Button from '@/@common/components/button'
import {
  IconWhatsapp,
  IconLinkedin,
  IconX,
  IconFacebook,
  IconYoutube,
  IconStudent,
  IconStar,
  IconCheckmark
} from '@/assets/icons'
import { SectionHeading } from '../components/section-heading'
import { CourseCard } from '@/@common/components/course-card'
import { Pagination } from '@/@common/components/pagination'
import { useParams } from 'react-router-dom'

const TeacherDetailsPage = () => {
  const params = useParams()

  const data = [
    {
      label: 'Total de estudiantes',
      value: '240',
      icon: IconStudent
    },
    {
      label: 'Valoraciones',
      value: '120',
      icon: IconStar
    }
  ]
  console.log(params)

  return (
    <Content className="flex flex-col-reverse items-start gap-y-16 gap-x-32 mt-16 mb-24 lg:flex-row">
      <section className="w-full flex-col-start gap-y-24">
        <div className="flex-col-start gap-y-8">
          <div className="flex-col-start gap-y-2">
            <p className="text-primary-300 font-semibold">
              INSTRUCTOR (A)
            </p>
            <div>
              <h3 className="text-primary-700 font-bold text-2xl">
                Nancy Lozano Diaz ({params.slug})
              </h3>
              <span className="text-primary-400">
                Abogada
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-8 gap-x-16 sm:flex-row">
            {data.map((item, index) => (
              <article key={index} className="flex-center gap-x-4">
                <div className="w-8 h-8 bg-primary-50 rounded-sm flex-center text-primary-500 text-lg">
                  <item.icon />
                </div>
                <div className="flex-col-start">
                  <strong className="text-sm font-normal text-primary-300">
                    {item.label}
                  </strong>
                  <span className="text-3xl text-primary-700 font-bold">
                    {item.value}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex-col-start gap-y-8">
          <article className="flex-col-start gap-y-4">
            <SectionHeading>
              Sobre mí
            </SectionHeading>

            <p>
              Egresada y titulada como abogada por la Universidad Católica de Trujillo Benedicto XVI, colegiada en el Colegio de Abogados de La Libertad, con estudios en curso de maestría en  MENCIÓN EN DERECHO PENAL Y CIENCIAS CRIMINOLÓGICAS - Universidad Nacional de Trujillo, 4 años de experiencia en el desarrollo de funciones como Asistente Administrativo  y Asistente en Función Fiscal, en el Distrito Fiscal La Libertad.  Asimismo con diversos cursos en el derecho penal y  procesal penal.
            </p>
          </article>

          <article className="flex-col-start gap-y-4">
            <SectionHeading>
              Especialidades
            </SectionHeading>

            <ul>
              <li className="flex-start gap-x-2">
                <IconCheckmark className="text-primary-500 text-2xl" />
                <span>
                   Derecho penal
                </span>
              </li>
              <li className="flex-start gap-x-2">
                <IconCheckmark className="text-primary-500 text-2xl" />
                <span>
                  Ciencias criminológicas
                </span>
              </li>
            </ul>
          </article>

          <article className="flex-col-start gap-y-4">
            <SectionHeading>
              Mis cursos (6)
            </SectionHeading>

            <div className="flex-col-center gap-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </div>
              <div>
                <Pagination />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="w-full gap-y-4 lg:gap-y-8 lg:flex-col-center lg:w-[360px]">
        <div className="h-80 w-80">
          <img
            src="https://www.fairviewer.org/wp-content/uploads/2017/12/1Q01257.jpg"
            alt="Teacher profile image"
            className="w-full h-full rounded-full object-cover object-center border-4 border-primary-500/25"
            loading="lazy"
          />
        </div>
        <div className="hidden w-full lg:flex-col-center gap-y-2">
          <Button size="lg" className="w-full">
            <IconWhatsapp />
            Enviar mensaje
          </Button>
          <Button size="lg" variant="primary.outline" className="w-full">
            <IconLinkedin />
            LinkedIn
          </Button>
          <Button size="lg" variant="primary.outline" className="w-full">
            <IconX />
            Twitter
          </Button>
          <Button size="lg" variant="primary.outline" className="w-full">
            <IconFacebook />
            Facebook
          </Button>
          <Button size="lg" variant="primary.outline" className="w-full">
            <IconYoutube />
            Youtube
          </Button>
        </div>
      </section>
    </Content>
  )
}

export default TeacherDetailsPage
