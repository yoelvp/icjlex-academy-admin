import { RenderHTML } from '@/@common/components'
import { CourseDetails } from '@/_models/Course.model'

interface Props {
  course: CourseDetails | null
}

export const ContentDescription = ({ course }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-primary-700 font-semibold text-2xl">Descripción</h4>
      {course?.description ? (
        <RenderHTML content={course?.description} />
      ) : (
        <p className="text-primary-700">
          No se ha proporcionado una descripción para este curso.
        </p>
      )}
    </div>
  )
}
