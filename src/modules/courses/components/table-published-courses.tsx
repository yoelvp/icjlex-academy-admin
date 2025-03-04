import { TableEmpty } from '@/@common/components/table-empty'
import { TableLoading } from '@/@common/components/table-loading'
import { useGetCourses } from '../hooks/use-get-courses'
import { useCoursesStore } from '../store/courses.store'
import {
  IconDelete,
  IconDockRight,
  IconEdit,
  IconEye,
  IconImageOn,
  IconOptions
} from '@/assets/icons'
import { Menu, Pagination } from '@/@common/components'
import { formatCurrency, getFullName } from '@/@common/utils'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format-date'
import { useDeleteCourse } from '../hooks/use-delete-course'

export const TablePublishedCourses = () => {
  const { isLoadingPublished: isLoading, publishedPagination: pagination } = useGetCourses()
  const { isLoading: isLoadingDeleteCourse, deletePublishedCourse } = useDeleteCourse()
  const courses = useCoursesStore((state) => state.published.courses)

  return (
    <div>
      <table className="custom-table mb-6 table-fixed">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del curso</th>
            <th>Docentes</th>
            <th>Precio</th>
            <th>Fecha publicación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableLoading numCols={5} isLoading={isLoading} />
          <TableEmpty
            show={(courses?.length ?? 0) < 1}
            numCols={5}
            isLoading={isLoading}
          />
          {!isLoading && courses?.map((course) => (
            <tr key={course.id} className="group">
              <td className="">{course.id.slice(0, 8)}</td>
              <td>
                <div className="relative flex items-center gap-x-4">
                  <img
                    src={course.imageUrl || '/image-placeholder.png'}
                    alt={`Thumbnail ${course.name}`}
                    className="w-12 min-w-12 h-6 object-cover object-center rounded-xs border border-primary-500/20 overflow-hidden"
                  />
                  <span>
                    {course.name}
                  </span>
                  <button
                    onClick={() => console.log('open')}
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
              <td>{formatCurrency(course.price ?? 0)}</td>
              <td>{formatDate(course.createdAt)}</td>
              <td className="w-auto">
                <div className="flex justify-end">
                  <Menu
                    variant="white"
                    activator={<IconOptions />}
                    size="sm"
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
                        isLoading: isLoadingDeleteCourse,
                        onClick: () => deletePublishedCourse(course.id)
                      }
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination {...pagination} />
    </div>
  )
}
