import { lazy, Suspense } from 'react'
import {
  IconAdd,
  IconDelete,
  IconDockRight,
  IconEdit,
  IconEye,
  IconEyeOutline,
  IconFileUpload,
  IconImageOn,
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
import { LoadingModal, Menu } from '@/@common/components'
import { formatCurrency } from '@/@common/utils/currencies'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'
import { usePublishedCoursesStore } from '../store/published-courses.store'
import { useUpcomingCoursesStore } from '../store/upcoming-courses.store'
import { TableEmpty } from '@/@common/components/table-empty'
import { useGetPublishedCourses, useGetUpcomingCourses } from '../hooks'
import { Pagination } from '@/@common/components'

const RegisterCourseModal = lazy(() => import('../components/register-course-modal'))
const CourseDetailsDrawer = lazy(() => import('../components/course-details-drawer'))

const CoursesPage = () => {
  const { show, open, close } = useShow()
  const { tab, handleTabIndex } = useCourseUI()
  const { isLoading: isLoadingPublished, pagination: publishPagination } = useGetPublishedCourses()
  const { isLoading: isLoadingUpcoming } = useGetUpcomingCourses()
  const publishedCourses = usePublishedCoursesStore((state) => state.courses)
  const upcomingCourses = useUpcomingCoursesStore((state) => state.courses)
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()

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
                  <th>N°</th>
                  <th>Nombre del curso</th>
                  <th>Docente</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={5} isLoading={isLoadingPublished} />
                <TableEmpty
                  show={(publishedCourses?.length ?? 0) < 1}
                  numCols={5}
                  isLoading={isLoadingPublished}
                />
                {!isLoadingPublished && publishedCourses?.map((course) => (
                  <tr key={course.id} className="group">
                    <td>{course.id}</td>
                    <td>
                      <div className="relative flex items-center gap-x-4">
                        <img
                          src={course.imageUrl || '/image-placeholder.png'}
                          alt={`Thumbnail ${course.name}`}
                          className="w-12 h-8 object-cover rounded-xs object-center"
                        />
                        <span>
                          {course.name}
                        </span>
                        <button
                          onClick={openDetailsDrawer}
                          className="hidden absolute left-0 top-1/2 -translate-y-1/2 group-hover:flex gap-x-1 items-center px-1 py-px rounded-xs bg-zinc-900/40 hover:bg-zinc-900/60 text-white text-xs uppercase"
                        >
                          <IconDockRight size="14" />
                          Abrir
                        </button>
                      </div>
                    </td>
                    <td>Docent</td>
                    <td>{formatCurrency(course.price ?? 0)}</td>
                    <td>
                      <div className="flex justify-center">
                        <Menu
                          variant="white"
                          activator={<IconOptions />}
                          size="xs"
                          options={[
                            {
                              label: 'Ver detalles',
                              icon: IconEye,
                              href: `/admin/courses/${course.id}`
                            },
                            {
                              label: 'Actualizar imagen',
                              icon: IconImageOn
                            },
                            {
                              label: 'Editar',
                              icon: IconEdit,
                              onClick: () => console.log('Update')
                            },
                            {
                              label: 'Eliminar',
                              icon: IconDelete,
                              isDelete: true,
                              dividerTop: true,
                              onClick: () => console.log('delete course')
                            }
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination {...publishPagination} />
          </Tabs.Item>

          <Tabs.Item title="Próximos" active={tab === CourseTab.INACTIVE}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Docente</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={7} isLoading={isLoadingUpcoming} />
                <TableEmpty
                  show={(upcomingCourses?.length ?? 0) < 1}
                  numCols={7}
                  isLoading={isLoadingUpcoming}
                />
                {!isLoadingUpcoming && upcomingCourses?.map((course) => (
                  <tr key={course.id} className="group">
                    <td>{course.id}</td>
                    <td>
                      <div className="relative flex items-center gap-x-4">
                        <img
                          src={course.imageUrl || '/image-placeholder.png'}
                          alt={`Thumbnail ${course.name}`}
                          className="w-12 h-8 object-cover rounded-xs object-center"
                        />
                        <span>
                          {course.name}
                        </span>
                        <button
                          onClick={openDetailsDrawer}
                          className="hidden absolute left-0 top-1/2 -translate-y-1/2 group-hover:flex gap-x-1 items-center px-1 py-px rounded-xs bg-zinc-900/40 hover:bg-zinc-900/60 text-white text-xs uppercase"
                        >
                          <IconDockRight size="14" />
                          Abrir
                        </button>
                      </div>
                    </td>
                    <td>Sergio Chavez Panduro</td>
                    <td>20 de noviembre, 2024</td>
                    <td>08:00 p.m.</td>
                    <td>{formatCurrency(course?.price)}</td>
                    <td>
                      <div className="border-l border-l-gray-300 flex justify-center">
                        <Menu
                          variant="white"
                          options={[
                            {
                              label: 'Publicar',
                              icon: IconFileUpload,
                              onClick: () => {
                                openConfirmModal({
                                  title: '¿Está seguro que quiere publicar este curso?',
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
                              icon: IconEyeOutline,
                              href: `/admin/courses/${course.id}`
                            },
                            {
                              label: 'Eliminar',
                              icon: IconDelete,
                              isDelete: true,
                              dividerTop: true,
                              onClick: () => {
                                openConfirmModal({
                                  title: '¿Está seguro que quiere eliminar este curso?',
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
                ))}
              </tbody>
            </table>
          </Tabs.Item>
        </Tabs>
      </section>

      {show && (
        <Suspense fallback={<LoadingModal />}>
          <RegisterCourseModal
            isOpen={show}
            onClose={close}
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
