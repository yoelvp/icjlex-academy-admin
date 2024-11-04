import { IconRadioButtonOff } from '@/assets/icons'
import { PriceAndPurchaseButton } from './price-and-purchase-button'
import { CourseDetails } from '@/_models/Course.model'

interface Props {
  course: CourseDetails | null
}

export const DetailsCourseByPurchased = ({ course }: Props) => {
  return (
    <section className="w-full h-auto py-8 px-4 rounded border border-primary-400 flex flex-col gap-8 md:border-none lg:shadow--primary lg:max-w-[300px] xl:min-w-[360px]">
      <div className="hidden lg:block">
        <PriceAndPurchaseButton price={course?.price} name={course?.name} />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <span className="text-primary-700 font-semibold">
          El curso incluye:{' '}
        </span>
        {course?.includes ? (
          <div className="flex flex-col gap-2">
            {Array.isArray(course.includes) && course.includes.map((item, index) => (
              <span
                className="text-primary-500 flex gap-4 items-center"
                key={index}
              >
                <IconRadioButtonOff size={16} className="text-primary-400" />
                <p className="text-primary-500">{item}</p>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-primary-500 flex gap-4 items-center">
            <IconRadioButtonOff size={16} className="text-primary-400" />
            <p className="text-primary-500">No hay recursos incluidos</p>
          </span>
        )}
      </div>
    </section>
  )
}
