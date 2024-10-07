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
import { CourseCard } from '@/@common/components/course-card'
import { useParams } from 'react-router-dom'
import { useCollaborators } from '../hooks/use-collaborator'

const CollaboratorDetailsPage = () => {
  const { slug } = useParams()
  const collaborator = useCollaborators(slug)

  if (!collaborator || Array.isArray(collaborator)) {
    return
  }

  const { name, role, description, image } = collaborator
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

  return (
    <Content className="flex flex-col-reverse items-start gap-y-16 gap-x-32 mt-16 mb-24 lg:flex-row">
      <section className="w-full flex-col-start gap-y-24">
        <div className="flex-col-start gap-y-8">
          <div className="flex-col-start gap-y-2">
            <p className="text-primary-300 font-semibold">COLABORADOR (A)</p>
            <div>
              <h3 className="text-primary-700 font-bold text-2xl">{name}</h3>
              <span className="text-primary-400">{role}</span>
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
            <p>{description}</p>
          </article>

          <article className="flex-col-start gap-y-4">
            <ul>
              <li className="flex-start gap-x-2">
                <IconCheckmark className="text-primary-500 text-2xl" />
                <span>Derecho penal</span>
              </li>
              <li className="flex-start gap-x-2">
                <IconCheckmark className="text-primary-500 text-2xl" />
                <span>Ciencias criminológicas</span>
              </li>
            </ul>
          </article>

          <article className="flex-col-start gap-y-4">
            <div className="flex-col-center gap-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <CourseCard />
                <CourseCard />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="w-full gap-y-4 lg:gap-y-8 lg:flex-col-center lg:w-[360px]">
        <div className="h-80 w-80">
          <img
            src={image}
            alt={`${name} profile image`}
            className="w-full h-full rounded-full object-cover object-top border-4 border-primary-500/25"
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

export default CollaboratorDetailsPage
