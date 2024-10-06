import Link from '@/@common/components/link'
import { Card } from '@/@common/components/card'
import { IconStar, IconStudent } from '@/assets/icons'

export interface CollaboratorProps {
  name?: string
  role?: string
  slug?: string
  description?: string
  image?: string
}

export const CollaboratorCard = ({
  name,
  role,
  slug,
  description,
  image
}: CollaboratorProps) => {
  const data = [
    {
      label: 'Cursos',
      value: '240',
      icon: IconStudent
    },
    {
      label: 'Estudiantes',
      value: '120',
      icon: IconStar
    }
  ]

  return (
    <Card>
      <img
        src={image}
        alt="Teacher profile image"
        className="w-full h-96 rounded object-cover object-top"
        loading="lazy"
      />
      <section className="px-4 py-6 flex-col-start gap-y-8">
        <article className="flex gap-x-4 items-start">
          <img
            src={image}
            alt="Teacher profile image"
            className="w-8 h-8 rounded-full object-cover object-center"
            loading="lazy"
          />
          <div className="flex-col-start gap-y-4">
            <div>
              <h4 className="text-primary-700 font-bold text-xl leading-4">
                {name}
              </h4>
              <span className="text-xs font-medium text-primary-400">
                {role}
              </span>
            </div>
            <div className="flex flex-wrap gap-y-4 gap-x-8">
              {data.map((item, index) => (
                <article key={index} className="flex items-start gap-x-2">
                  <div className="w-6 h-6 bg-primary-50 rounded-sm flex-center text-primary-500 text-sm">
                    <item.icon />
                  </div>
                  <div className="flex-col-start">
                    <strong className="text-sm font-medium text-primary-400">
                      {item.label}
                    </strong>
                    <span className="text-xl text-primary-700 font-bold leading-5">
                      {item.value}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </article>
        <div className="w-full flex flex-col">
          <p className="text-primary-500  overflow-hidden text-ellipsis  mb-8 line-clamp-3">
            {description}
          </p>
          <Link
            href={`/us/${slug}`}
            variant="primary.link"
            className="w-full mx-auto z-100"
          >
            Ver perfil
          </Link>
        </div>
      </section>
    </Card>
  )
}
