import { Card } from '@/@common/components'
import Link from '@/@common/components/link'
import { IconStarFilled, IconWhatsapp } from '@/assets/icons'
import { CourseResult } from '@/modules/courses/types/Course'
import { FC } from 'react'
import { useFormattedPrice } from '../../utils/format-price'

interface CourseCardProps {
  course: CourseResult // Asegúrate de que sea un solo curso
}

export const CourseCardFind: FC<CourseCardProps> = ({ course }) => {
  const formattedPrice = useFormattedPrice(course.price ?? '')
  if (!course) {
    return null // O manejar un estado de carga/placeholder
  }

  return (
    <Card>
      <div className="relative h-64 rounded overflow-hidden">
        <img
          src={course.imageUrl ?? ''}
          alt={course.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="py-4 px-2 flex flex-col gap-y-8 pb-4">
        <article className="flex flex-col gap-y-2">
          <div>
            <h4 className="text-primary-700 font-bold">{course.name}</h4>
            <p className="text-sm text-primary-500">
              <span className="text-primary-400">{'Nancy Lozano Díaz'}</span>{' '}
              &bull; <span className="text-primary-300">{'Abogada'}</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <span className="text-primary-500 font-semibold">{'4,5'}</span>
            <div className="flex-center gap-x-1">
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
              <IconStarFilled className="text-gold" />
            </div>
            <span className="text-primary-400 font-semibold">
              {'(120 valoraciones)'}
            </span>
          </div>
          <div className="flex items-center gap-x-1 text-primary-500">
            <span className="text-primary-400">2.5 horas</span>
            &bull;
            <span className="text-primary-400">1 clase</span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="font-bold text-primary-500 text-2xl">
              S/. {formattedPrice}
            </span>
            <span className="hidden text-primary-300 text-sm font-medium">
              S/. 160.00
            </span>
          </div>
        </article>
        <div className="flex gap-x-4">
          <Link
            href={`/courses/${course.id}`}
            variant="primary.link"
            size="sm"
            className="text-nowrap w-auto !px:0"
          >
            Ver detalles
          </Link>
          <Link
            href="/whatsapp"
            size="sm"
            className="w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inscribirme
            <IconWhatsapp size="18" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
