import Link from './link'
import { Card } from './card'
import { IconWhatsapp } from '@/assets/icons'
import { Course } from '@/_models/Course.model'
import { formatCurrency } from '../utils/currencies'
import { whatsappMessage } from '../utils/whatsapp'
import { WHATSAPP_ADMIN_NUMBER_PHONE } from '../env'
import { Popover } from 'flowbite-react'

interface Props {
  course: Course | null
}

export const CourseCard = ({ course }: Props) => {
  return (
    <Card>
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
      </div>
      <div className="py-4 px-2 grid grid-rows-[1fr_auto] gap-y-8 pb-4">
        <article className="overflow-hidden h-full flex flex-col gap-y-2">
          <div>
            <Popover
              trigger="hover"
              content={course?.name}
              placement="bottom-start"
              className="px-4 py-2 bg-white rounded outline-none border border-primary-500/15"
            >
              <h4 className="w-full overflow-hidden text-primary-700 font-bold text-ellipsis text-nowrap">
                {course?.name}
              </h4>
            </Popover>
            {/* <p className="text-sm text-primary-500">
              {course?.teacher ? (
                <>
                  <span className="text-primary-400">
                    {course?.teacher?.firstName} {course?.teacher?.lastName}
                  </span>{' '}
                  &bull;{' '}
                  <span className="text-primary-300">
                    {course?.teacher?.profession}
                  </span>
                </>
              ) : (
                <span className="text-primary-400">
                  ICJ LEX &amp; CARRANZA CONSULTORES
                </span>
              )}
            </p> */}
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
            href={`/courses/${course?.id}`}
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
            Inscribirme
            <IconWhatsapp size="18" />
          </Link>
        </div>
      </div>
    </Card>
  )
}
