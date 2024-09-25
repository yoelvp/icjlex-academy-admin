import type { FC } from 'react'

import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { CourseCard } from '@/@common/components/course-card'

export const UpcomingCourses: FC = () => {
  return (
    <Content className="flex flex-col gap-y-8">
      <SectionHeader
        title="Nuestros próximos cursos"
        description="No te pierdas la oportunidad de formarte con expertos del sector. Inscríbete en nuestros próximos cursos y lleva tu carrera al siguiente nivel."
        withButton
        buttonLabel="Ver todos los próximos cursos"
        buttonHref="/course"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </Content>
  )
}
