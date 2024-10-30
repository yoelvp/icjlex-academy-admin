import { lazy, Suspense, useState } from 'react'
import {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEye,
  IconSearch
} from '@/assets/icons'
import Form from '@/@common/components/form'
import Button from '@/@common/components/button'
import { useShow } from '@/@common/hooks/use-show'
import { Tabs } from 'flowbite-react'
import { CourseTab } from '../enums/course-tab'
import { useCourseUI } from '../hooks/use-courses-ui'
import { TableLoading } from '@/@common/components/table-loading'
import { useCourses } from '../hooks/use-course'
import { UseCourseStore } from '../store/course.store'
import { LoadingModal, Menu } from '@/@common/components'

const RegisterCourseForm = lazy(() => import('../components/register-course-form'))
const ResourcesFromCourse = lazy(() => import('../components/resources-from-course'))

const CoursesPage = () => {
  /* const [loading, setLoading] = useState(false) */
  /* const [isResourcesOpen, setIsResourcesOpen] = useState(false) */
  const [courseCreatedId, setCourseCreatedId] = useState<string | null>(null)
  const { show, open, close } = useShow()
  const { show: showResourcesModal, open: openResourcesModal, close: closeResourcesModal } = useShow()
  const { tab, handleTabIndex } = useCourseUI()
  const { isLoading } = useCourses(1, 10)
  const courses = UseCourseStore((state) => state.courses)

  // const courseId = UseCourseStore((state) => state.courseId)

  /* const { createCourse } = useCreateCourse() */

  const handleRegisterCourseClose = () => {
    close() // Cierra el modal de registro de curso
  }

  /* const handleSubmit = async (data) => { */
  /*   createCourse(data) */
  /*   console.log(data) */
  /*   setLoading(true) // Muestra el loader */
  /**/
  /*   await new Promise((resolve) => setTimeout(resolve, 500)) */
  /**/
  /*   setLoading(false) // Oculta el spinner */
  /*   setIsResourcesOpen(true) // Abre el modal de recursos */
  /* } */

  /* const handleResourcesClose = () => { */
  /*   setIsResourcesOpen(false) */
  /* } */

  const handleCreatedCourseId = (id: string) => {
    setCourseCreatedId(id)
  }

  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex-between">
        <h2 className="header-title">Cursos</h2>
        <div className="flex items-center gap-x-2">
          <Form.Input
            placeholder="Busca lo que quieras..."
            size="sm"
            withIcon
            icon={IconSearch}
          />
          <Button type="button" onClick={open} size="sm">
            <IconAdd size={24} />
            Agregar
          </Button>
        </div>
      </header>
      <section className="section-panel p-4">
        <Tabs
          aria-label="Tabs de estudiantes"
          variant="underline"
          onActiveTabChange={handleTabIndex}
        >
          <Tabs.Item
            title="Activos"
            active={tab === CourseTab.ACTIVE || tab === ''}
          >
            <table className="custom-table mb-6">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Imagen</th>
                  <th>Nombre del curso</th>
                  <th>Precio</th>
                  <th>Docente</th>
                  <th>Duración</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={6} isLoading={isLoading} />

                {!isLoading &&
                  courses?.map((course) => (
                    <tr key={course.id} className="border-b border-gray-200">
                      <td>{course.id}</td>
                      <td className="w-auto">
                        <div className="w-64">
                          <img
                            src={course.imageUrl || '/placeholder-image.png'}
                            alt={`${course.name}`}
                            className="w-full h-20 object-cover rounded-xs object-center"
                          />
                        </div>
                      </td>
                      <td className="max-w-sm">{course.name}</td>
                      <td className="w-[15%]">S/. {course.price}</td>
                      <td>Docent</td>
                      <td>S/. {course.price}</td>
                      <td>
                        <div className="border-l border-l-gray-300 flex justify-center">
                          <Menu
                            variant="white"
                            options={[
                              {
                                label: 'Detalles del curso',
                                icon: IconEye,
                                href: `/admin/courses/${course.id}`
                              },
                              {
                                label: 'Editar',
                                icon: IconEdit,
                                onClick: () => console.log('Editar')
                              },
                              {
                                label: 'Eliminar',
                                icon: IconDelete,
                                isDelete: true,
                                dividerTop: true,
                                onClick: () => console.log('delete course')
                                // deleteStudent(student.id, 'active'),
                                // isLoading: isLoadingDelete
                              }
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tabs.Item>

          <Tabs.Item title="Inactivos" active={tab === CourseTab.INACTIVE}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>N° teléfono</th>
                  <th></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </Tabs.Item>
        </Tabs>
      </section>

      {show && (
        <Suspense fallback={<LoadingModal />}>
          <RegisterCourseForm
            isOpen={show}
            onClose={handleRegisterCourseClose}
            openCreateResourceModal={openResourcesModal}
            updateCourseId={handleCreatedCourseId}
          />
        </Suspense>
      )}

      {showResourcesModal && (
        <Suspense fallback={<LoadingModal />}>
          <ResourcesFromCourse
            isOpen={showResourcesModal}
            onClose={closeResourcesModal}
            courseCreatedId={courseCreatedId ?? ''}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
