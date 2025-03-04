import { lazy, Suspense } from 'react'

import { TableEmpty } from '@/@common/components/table-empty'
import { TableLoading } from '@/@common/components/table-loading'
import { useGetCourses } from '../hooks/use-get-courses'
import { useCoursesStore } from '../store/courses.store'
import { Menu, Pagination } from '@/@common/components'
import { formatCurrency, formatDateTime, getFullName } from '@/@common/utils'
import { useShow } from '@/@common/hooks'
import { useConfirmModalStore } from '@/store/use-confirm-modal.store'
import {
  IconDelete,
  IconDockRight,
  IconEyeOutline,
  IconFileUpload
} from '@/assets/icons'
import { Link } from 'react-router-dom'

const CourseDetailsDrawer = lazy(() => import('../components/course-details-drawer'))

export const TableScheduledCourses = () => {
  const { isLoadingPublished, scheduledPagination } = useGetCourses()
  const courses = useCoursesStore((state) => state.scheduled.courses)
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  console.log(courses)

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Docente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableLoading numCols={7} isLoading={isLoadingPublished} />
          <TableEmpty
            show={(courses?.length ?? 0) < 1}
            numCols={7}
            isLoading={isLoadingPublished}
          />
          {!isLoadingPublished && courses?.map((course) => (
            <tr key={course.id} className="group">
              <td className="w-12">{course.id.slice(1, 8)}</td>
              <td>
                <div className="relative flex items-center gap-x-4">
                  <img
                    src={course.imageUrl || '/image-placeholder.png'}
                    alt={`Thumbnail ${course.name}`}
                    className="w-12 max-w-12 h-6 object-cover object-center rounded-xs border border-primary-500/20 overflow-hidden"
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
              <td>
                {course.teachers.map((teacher, index) => (
                  <p key={teacher.id}>
                    <Link to={`/admin/teachers/${teacher.slug}?s=show`}>
                      {getFullName(teacher)}
                    </Link>
                    <span>{index === course.teachers.length - 1 ? '.' : ','}</span>
                  </p>
                ))}
              </td>
              <td>
                {formatDateTime(course.publicationDate)}
              </td>
              <td>08:00 p.m.</td>
              <td>
                <div className="flex gap-x-2">
                  {formatCurrency(course?.price)}
                  {course.price == 0.00 && (
                    <span className="bg-primary-500 text-white rounded-xs px-1">Gratis</span>
                  )}
                </div>
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination {...scheduledPagination} />

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
