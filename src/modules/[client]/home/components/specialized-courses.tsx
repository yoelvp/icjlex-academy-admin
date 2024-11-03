import { useEffect, type FC } from 'react'

import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { CourseCard } from '@/@common/components/course-card'
import { Spinner } from 'flowbite-react'
import { useCourses } from '../../hooks/use-courses'

export const SpecializedCourses: FC = () => {
  const { courses, isLoadingCourses, getAllCourses } = useCourses()
  const specialicedCourse = courses?.slice(10, 13)

  useEffect(() => {
    getAllCourses()
  }, [])

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
        {isLoadingCourses && (
          <Spinner />
        )}
        {!isLoadingCourses && specialicedCourse?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </Content>
  )
}
