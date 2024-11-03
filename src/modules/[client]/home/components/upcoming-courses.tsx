import { useEffect, type FC } from 'react'

import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { CourseCard } from '@/@common/components/course-card'
import { Spinner } from 'flowbite-react'
import { useCourses } from '../../hooks/use-courses'

export const UpcomingCourses: FC = () => {
  const { courses, isLoadingCourses, getAllCourses } = useCourses()
  const upComingCourses = courses?.slice(6, 9)
  useEffect(() => {
    getAllCourses()
  }, [])

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
        {isLoadingCourses && <Spinner />}
        {!isLoadingCourses &&
          upComingCourses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </Content>
  )
}
