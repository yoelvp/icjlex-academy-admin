import { useEffect, type FC } from 'react'

import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { CourseCard } from '@/@common/components/course-card'
import { useCourses } from '../hooks/use-courses'
import { Spinner } from 'flowbite-react'

export const SpecializedCourses: FC = () => {
  const { courses, isLoadingCourses, getAllCourses } = useCourses()

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
        buttonHref="/course?t=s"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoadingCourses && (
          <Spinner />
        )}
        {!isLoadingCourses && courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </Content>
  )
}
