import { Fragment, type FC } from 'react'

import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { Popover, Spinner } from 'flowbite-react'
import Link from '@/@common/components/link'
import { useGetAllCourses } from '../../hooks'
import { Card } from '@/@common/components'
import { formatCurrency } from '@/@common/utils/currencies'
import { whatsappMessage } from '@/@common/utils/whatsapp'
import { WHATSAPP_ADMIN_NUMBER_PHONE } from '@/@common/env'
import { IconWhatsapp } from '@/assets/icons'

export const SpecializedCourses: FC = () => {
  const { isLoading, courses } = useGetAllCourses({
    page: 1,
    perPage: 6
  })

  return (
    <Content className="flex flex-col gap-y-8">
      <SectionHeader
        title="Cursos especializados"
        description="Ven y encuentra cursos cortos y concisos, tu futuro está en tus manos."
        withButton
        buttonLabel="Ver todos los cursos especializados"
        buttonHref="/courses?t=s"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && (
          <Spinner />
        )}
        {!isLoading && courses?.map((course) => (
          <Card key={course?.id}>
            <div className="relative h-64 rounded overflow-hidden">
              <img
                src={course?.imageUrl ?? 'https://cdn.pixabay.com/photo/2020/12/05/14/08/man-5806011_1280.jpg'}
                alt="Course image"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="py-4 px-2 grid grid-rows-[1fr_auto] gap-y-8 pb-4">
              <article className="overflow-hidden h-full flex flex-col gap-y-2">
                <div>
                  <Popover
                    trigger="hover"
                    content={course?.name}
                    placement="bottom-start"
                    className="px-2 py-0 bg-white text-priamry-500 rounded-sm outline-none border border-primary-500/15"
                  >
                    <h4 className="w-full overflow-hidden text-primary-700 font-bold text-ellipsis text-nowrap">
                      {course?.name}
                    </h4>
                  </Popover>
                  <p className="text-sm text-primary-500">
                    {course?.teachers && course?.teachers?.length > 0 && course?.teachers?.map((teacher) => (
                      <Fragment>
                        <span className="text-primary-400">
                          {teacher?.firstName} {teacher?.lastName}
                        </span>{' '}
                        &bull;{' '}
                        <span className="text-primary-300">
                          {teacher?.profession}
                        </span>
                      </Fragment>
                    ))}

                    {!course?.teachers || course?.teachers?.length < 1 && (
                      <span className="text-primary-400">
                        ICJ LEX &amp; CARRANZA CONSULTORES
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-x-1">
                  <span className="font-bold text-primary-500 text-2xl">
                    {!course?.isFree ? formatCurrency(course?.price ?? 0) : 'Gratis'}
                  </span>
                  <span className="hidden text-primary-300 text-sm font-medium">
                    {formatCurrency((course?.price ?? 0) + 5)}
                  </span>
                </div>
              </article>
              <div className="flex gap-x-4">
                <Link
                  href={`/courses/${course?.slug}/${course?.id}`}
                  variant="primary.link"
                  size="sm"
                  className="text-nowrap w-auto !px:0"
                >
                  Ver detalles
                </Link>
                <Link
                  href={whatsappMessage({
                    phoneNumber: WHATSAPP_ADMIN_NUMBER_PHONE,
                    message: `Hola, quiero adquirir el curso *${course?.name} _(${course?.id})_*, por favor, brindarme más información acerca de los métodos de pago y el acceso a su plataforma`
                  })}
                  size="sm"
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inscripción
                  <IconWhatsapp size="18" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Content>
  )
}
