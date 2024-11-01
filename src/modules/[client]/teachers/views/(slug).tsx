import { Content } from '@/@common/components/content'
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
import Link from '@/@common/components/link'
import { useTeachersById } from '../hooks/use-teachers-by-id'
import { RenderHTML } from '@/@common/components'

const TeacherDetailsPage = () => {
  const { id } = useParams()
  const { isLoading, teachers } = useTeachersById(id)

  const data = [
    {
      label: 'Total de estudiantes',
      value: '240',
      icon: IconStudent
    },
    {
      label: 'Valoraciones',
      value: teachers?.valorations,
      icon: IconStar
    }
  ]

  return (
    <Content className="flex flex-col-reverse items-start gap-y-16 gap-x-32 mt-16 mb-24 lg:flex-row">
      {isLoading ? (
        <div className="min-h-[30vh] flex-center w-full">
          <p className="text-primary-300">Cargando detalle del docente...</p>
        </div>
      ) : (
        <>
          <section className="w-full flex-col-start gap-y-24">
            <div className="flex-col-start gap-y-8">
              <div className="flex-col-start gap-y-2">
                <p className="text-primary-300 font-semibold">INSTRUCTOR (A)</p>
                <div>
                  <h3 className="text-primary-700 font-bold text-2xl">
                    {teachers?.firstName} {teachers?.lastName}
                  </h3>
                  <span className="text-primary-400">
                    {teachers?.profession}
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
                <SectionHeading>Sobre mí</SectionHeading>
                <RenderHTML content={teachers?.aboutMe ?? ''}/>
              </article>

              <article className="flex-col-start gap-y-4">
                <SectionHeading>Especialidades</SectionHeading>
                <ul>
                  {teachers?.docentToSpecialty &&
                  teachers.docentToSpecialty.length > 0 ? (
                      teachers.docentToSpecialty.map((specialty, index) => (
                        <li key={index} className="flex-start gap-x-2">
                          <IconCheckmark className="text-primary-500 text-2xl" />
                          <span>{specialty}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex-start gap-x-2">
                        <IconCheckmark className="text-primary-500 text-2xl" />
                        <span>No hay especialidades disponibles</span>
                      </li>
                    )}
                </ul>
              </article>

              <article className="flex-col-start gap-y-4">
                <SectionHeading>Mis cursos (6)</SectionHeading>

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
                    <Pagination
                      page={1}
                      totalItems={12}
                      size={100}
                      nextPage={() => console.log('Next Page')}
                      prevPage={() => console.log('Prev. page')}
                      goToPage={() => console.log('Go to page')}
                    />
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="w-full gap-y-4 lg:gap-y-8 lg:flex-col-center lg:w-[360px]">
            <div className="h-80 w-80">
              <img
                src={
                  teachers?.imageUrl ||
                  'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png'
                }
                alt="Teacher profile image"
                className="w-full h-full rounded-full object-cover object-top border-4 border-primary-500/25"
                loading="lazy"
              />
            </div>
            <div className="hidden w-full lg:flex-col-center gap-y-2">
              <Link
                size="lg"
                href={teachers?.socialMedia?.whatsapp || '#'}
                target="_blank"
                className="w-full"
              >
                <IconWhatsapp />
                {teachers?.socialMedia?.whatsapp
                  ? 'Enviar mensaje'
                  : 'No disponible'}
              </Link>

              <Link
                size="lg"
                href={teachers?.socialMedia?.linkedin || '#'}
                target="_blank"
                variant="primary.outline"
                className="w-full"
              >
                <IconLinkedin />
                {teachers?.socialMedia?.linkedin ? 'LinkedIn' : 'No disponible'}
              </Link>

              <Link
                size="lg"
                href={teachers?.socialMedia?.x || '#'}
                target="_blank"
                variant="primary.outline"
                className="w-full"
              >
                <IconX />
                {teachers?.socialMedia?.x ? 'Twitter' : 'No disponible'}
              </Link>

              <Link
                size="lg"
                href={teachers?.socialMedia?.facebook || '#'}
                target="_blank"
                variant="primary.outline"
                className="w-full"
              >
                <IconFacebook />
                {teachers?.socialMedia?.facebook ? 'Facebook' : 'No disponible'}
              </Link>

              <Link
                size="lg"
                href={teachers?.socialMedia?.youtube || '#'}
                target="_blank"
                variant="primary.outline"
                className="w-full"
              >
                <IconYoutube />
                {teachers?.socialMedia?.youtube ? 'YouTube' : 'No disponible'}
              </Link>
            </div>
          </section>
        </>
      )}
    </Content>
  )
}

export default TeacherDetailsPage
