import type { FC } from 'react'

import { CardCourseByTeacher } from './card-course-by-teacher'

export const MoreCoursesByTeacher: FC = () => {
  return (
    <div className="grid gap-4">
      <h4 className="text-primary-700 font-bold text-2xl">Más cursos de Nancy Lozano Diaz</h4>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <CardCourseByTeacher />
        <CardCourseByTeacher />
      </div>
    </div>
  )
}
