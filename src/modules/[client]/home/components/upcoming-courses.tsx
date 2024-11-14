import { Fragment, type FC } from 'react'

import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { Popover, Spinner } from 'flowbite-react'
import { Card } from '@/@common/components'
import { formatCurrency } from '@/@common/utils/currencies'
import Link from '@/@common/components/link'
import { whatsappMessage } from '@/@common/utils/whatsapp'
import { WHATSAPP_ADMIN_NUMBER_PHONE } from '@/@common/env'
import { IconWhatsapp } from '@/assets/icons'
import { formatDateTime } from '@/@common/utils/date'
import { useGetAllCourses } from '../../hooks'

export const UpcomingCourses: FC = () => {
  const { isLoading, courses } = useGetAllCourses({
    page: 1,
    perPage: 3,
    isScheduled: true
  })

  return (
    <Content className="flex flex-col gap-y-8">
      <SectionHeader
        title="Nuestros próximos cursos"
        description="No te pierdas la oportunidad de formarte con expertos del sector. Inscríbete en nuestros próximos cursos y lleva tu carrera al siguiente nivel."
        withButton
        buttonLabel="Ver todos los próximos cursos"
        buttonHref="/courses?t=s"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && <Spinner />}
        {!isLoading && courses && courses.map((course) => (
          <Card key={course?.id}>
            <div className="relative h-64 rounded overflow-hidden">
              <img
                src={
                  course?.imageUrl
                    ? course?.imageUrl
                    : 'https://cdn.pixabay.com/photo/2020/12/05/14/08/man-5806011_1280.jpg'
                }
                alt="Course image"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 bg-white text-primary-400 rounded-sm px-2 py-1 text-sm font-bold border-2 border-primary-500/25">
                {formatDateTime(course?.publicationDate)}
              </div>
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
                {/* <div className="flex justify-start items-center gap-x-2"> */}
                {/*   <span className="text-primary-500 font-semibold">{'4,5'}</span> */}
                {/*   <div className="flex-center gap-x-1"> */}
                {/*     <IconStarFilled className="text-gold" /> */}
                {/*     <IconStarFilled className="text-gold" /> */}
                {/*     <IconStarFilled className="text-gold" /> */}
                {/*     <IconStarFilled className="text-gold" /> */}
                {/*     <IconStarFilled className="text-gold" /> */}
                {/*   </div> */}
                {/*   <span className="text-primary-400 font-semibold">{'(120 valoraciones)'}</span> */}
                {/* </div> */}
                {/* <div className="flex items-center gap-x-1 text-primary-500"> */}
                {/*   <span className="text-primary-400"> */}
                {/*     2.5 horas */}
                {/*   </span> */}
                {/*   &bull; */}
                {/*   <span className="text-primary-400"> */}
                {/*     1 clase */}
                {/*   </span> */}
                {/* </div> */}
                <div className="flex items-center gap-x-1">
                  <span className="font-bold text-primary-500 text-2xl">
                    {formatCurrency(course?.price ?? 0)}
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
                  Pre-inscripción
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
