import { lazy, Suspense, useState } from 'react'
import {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEye,
  IconOptions,
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
import { formatCurrency } from '@/@common/utils/currencies'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'
import { MenuOptions } from '@/@common/types/Menu'

const RegisterCourseForm = lazy(
  () => import('../components/register-course-form')
)
const ResourcesFromCourse = lazy(
  () => import('../components/resources-from-course')
)

const CourseDetailsDrawer = lazy(
  () => import('../components/course-details-drawer')
)

const CoursesPage = () => {
  const [courseCreatedId, setCourseCreatedId] = useState<string | null>(null)
  const { show, open, close } = useShow()
  const {
    show: showResourcesModal,
    open: openResourcesModal,
    close: closeResourcesModal
  } = useShow()
  const { tab, handleTabIndex } = useCourseUI()
  const { isLoading } = useCourses(1, 10)
  const courses = UseCourseStore((state) => state.courses)
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const {
    show: showDetailsDrawer,
    open: openDetailsDrawer,
    close: closeDetailsDrawer
  } = useShow()

  const options: MenuOptions[] = [
    {
      label: 'Agregar detalles',
      icon: IconEye,
      href: '/admin/courses/5'
    },
    {
      label: 'Ver detalles',
      icon: IconEye,
      onClick: openDetailsDrawer
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
  ]

  const handleRegisterCourseClose = () => {
    close() // Cierra el modal de registro de curso
  }

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
            title="Publicados"
            active={tab === CourseTab.ACTIVE || tab === ''}
          >
            <table className="custom-table mb-6 table-auto">
              <thead>
                <tr>
                  <th className="w-3">N°</th>
                  <th>Imagen</th>
                  <th>Nombre del curso</th>
                  <th>Docente</th>
                  <th>Precio</th>
                  <th>Duración</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={7} isLoading={isLoading} />

                {!isLoading &&
                  courses?.map((course) => (
                    <tr key={course.id} className="border-b border-gray-200">
                      <td>{course.id}</td>
                      <td className="w-32">
                        <img
                          src={course.imageUrl || '/placeholder-image.png'}
                          alt={`Thumbnail ${course.name}`}
                          className="w-full h-10 object-cover rounded-xs object-center"
                        />
                      </td>
                      <td className="w-xl">{course.name}</td>
                      <td>Docent</td>
                      <td className="w-[15%]">S/. {course.price}</td>
                      <td>S/. {course.price}</td>
                      <td>
                        <div className="border-l border-l-gray-300 flex justify-center">
                          <Menu
                            variant="white"
                            activator={<IconOptions />}
                            size="xs"
                            options={options}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tabs.Item>

          <Tabs.Item title="Próximos" active={tab === CourseTab.INACTIVE}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Docente</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>Image</td>
                  <td>Últimas modificatorias con código procesal penal</td>
                  <td>Sergio Chavez Panduro</td>
                  <td>20 de noviembre, 2024</td>
                  <td>08:00 p.m.</td>
                  <td>{formatCurrency(15)}</td>
                  <td>
                    <div className="border-l border-l-gray-300 flex justify-center">
                      <Menu
                        variant="white"
                        options={[
                          {
                            label: 'Publicar',
                            icon: IconEye,
                            onClick: () => {
                              openConfirmModal({
                                title:
                                  '¿Está seguro que quiere publicar este curso?',
                                subTitle: 'Esta acción no se puede deshacer.',
                                options: {
                                  content: 'Sí',
                                  onClick: () => {
                                    console.log('Curso publicado')
                                  }
                                }
                              })
                            }
                          },
                          {
                            label: 'Ver detalles',
                            icon: IconEdit,
                            onClick: () => console.log('Ver detalles')
                          },
                          {
                            label: 'Eliminar',
                            icon: IconDelete,
                            isDelete: true,
                            dividerTop: true,
                            onClick: () => {
                              openConfirmModal({
                                title:
                                  '¿Está seguro que quiere eliminar este curso?',
                                subTitle: 'Esta acción no se puede deshacer.',
                                options: {
                                  content: 'Sí',
                                  onClick: () => {
                                    console.log('Curso publicado')
                                  }
                                }
                              })
                            }
                          }
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
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

      {showDetailsDrawer && (
        <Suspense fallback={<div children="Cargando..." />}>
          <CourseDetailsDrawer
            show={showDetailsDrawer}
            close={closeDetailsDrawer}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
