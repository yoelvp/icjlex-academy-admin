import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { Pagination } from '@/@common/components/pagination'
import { TeacherCard } from '../components/teacher-card'

const TeachersPage = () => {
  return (
    <Content className="mt-16 mb-24">
      <SectionHeader
        title="Nuestros docentes"
        description="Conoce a nuestros docentes altamente calificados, listos para potenciar tu aprendizaje y crecimiento profesional."
        containerClassName="mb-8"
      />

      <div className="flex-col-center gap-y-12">
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
          <TeacherCard />
        </section>

        <Pagination
          page={1}
          totalItems={12}
          size={100}
          nextPage={() => console.log('Next Page')}
          prevPage={() => console.log('Prev. page')}
          goToPage={() => console.log('Go to page')}
        />
      </div>
    </Content>
  )
}

export default TeachersPage
