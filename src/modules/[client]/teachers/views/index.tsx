import { Content } from '@/@common/components/content'
import { SectionHeader } from '@/@common/components/section-header'
import { Pagination } from '@/@common/components/pagination'
import { TeacherCard } from '../components/teacher-card'
import { useTeachers } from '../hooks/use-teachers'

const TeachersPage = () => {
  const { isLoading, teachers } = useTeachers(1, 999)

  return (
    <Content className="mt-16 mb-24">
      <SectionHeader
        title="Nuestros docentes"
        description="Conoce a nuestros docentes altamente calificados, listos para potenciar tu aprendizaje y crecimiento profesional."
        containerClassName="mb-8"
      />

      <div className="flex-col-center gap-y-12">
        {isLoading ? (
          <div className="w-full flex-center min-h-[20vh]">
            <p className="text-primary-300">Cargando docentes...</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teachers?.map((item) => (
              <TeacherCard key={item.id} teacher={item} />
            ))}
          </section>
        )}

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
