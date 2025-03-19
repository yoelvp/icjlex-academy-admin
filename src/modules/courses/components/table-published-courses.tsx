import { Link, useNavigate } from "react-router"
import { TableEmpty } from "@/@common/components/table-empty"
import { TableLoading } from "@/@common/components/table-loading"
import { useGetCourses } from "../hooks/use-get-courses"
import { useCoursesStore } from "../store/courses.store"
import { Menu, Pagination } from "@/@common/components"
import { formatCurrency, getFullName } from "@/@common/utils"
import { formatDate } from "../utils/format-date"
import { useDeleteCourse } from "../hooks/use-delete-course"
import { useConfirmModalStore } from "@/store/use-confirm-modal.store"
import { useGetCourseById } from "../hooks/use-get-course-by-id"
import {
  IconDelete,
  IconEditNote,
  IconEyeOutline,
  IconImageUp,
  IconOptions
} from "@/assets/icons"

interface Props {
  handleCourseId: (teacherId: string) => void
  handleCourseImageUrl: (teacherId: string) => void
  openUpdateImageModal: () => void
}

export const TablePublishedCourses = ({
  handleCourseId,
  handleCourseImageUrl,
  openUpdateImageModal
}: Props) => {
  const navigate = useNavigate()
  const { isLoadingPublished: isLoading, publishedPagination: pagination } = useGetCourses()
  const { isLoading: isLoadingDeleteCourse, deletePublishedCourse } = useDeleteCourse()
  const { isLoading: isLoadingGetCourseById, getCourseById } = useGetCourseById()
  const courses = useCoursesStore((state) => state.published.courses)
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const closeConfirmModal = useConfirmModalStore((state) => state.close)

  return (
    <div>
      <table className="custom-table mb-6 table-fixed">
        <thead>
          <tr>
            <th className="w-20">ID</th>
            <th>Nombre del curso</th>
            <th>Docentes</th>
            <th className="w-32 !text-right">Precio</th>
            <th className="w-48">Fecha publicación</th>
            <th className="w-14 text-right"></th>
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
              <td>{course.id.slice(0, 8)}</td>
              <td>
                <div className="relative flex items-center gap-x-4">
                  <img
                    src={course.imageUrl || "/image-placeholder.png"}
                    alt={`Thumbnail ${course.name}`}
                    className="w-12 min-w-12 h-6 object-cover object-center rounded-xs border border-primary-500/20 overflow-hidden"
                  />
                  <span>
                    {course.name}
                  </span>
                </div>
              </td>
              <td>
                {course.teachers.map((teacher, index) => (
                  <p key={teacher.id}>
                    <Link to={`/admin/teachers/${teacher.slug}?s=show`}>
                      {getFullName(teacher)}
                    </Link>
                    <span>{index === course.teachers.length - 1 ? "." : ","}</span>
                  </p>
                ))}
              </td>
              <td>
                <div className="flex items-center justify-end gap-x-2">
                  {course?.price === 0 && (
                    <span className="bg-green-600 text-white rounded-full px-2">
                      Gratis
                    </span>
                  )}
                  {formatCurrency(course.price ?? 0)}
                </div>
              </td>
              <td>{formatDate(course.createdAt)}</td>
              <td className="text-right">
                <Menu
                  variant="primary.outline"
                  activator={<IconOptions />}
                  size="sm"
                  options={[
                    {
                      label: "Ver detalles",
                      icon: IconEyeOutline,
                      isLoading: isLoadingGetCourseById,
                      onClick: () => {
                        getCourseById(course?.id ?? "").then(() => navigate(`/admin/courses/${course.id}`))
                      }
                    },
                    {
                      label: "Actualizar imagen",
                      icon: IconImageUp,
                      onClick: () => {
                        handleCourseId(course?.id ?? "")
                        handleCourseImageUrl(course?.imageUrl ?? "")
                        openUpdateImageModal()
                      }
                    },
                    {
                      label: "Editar",
                      icon: IconEditNote,
                      href: `/admin/courses/update/${course.id}`
                    },
                    {
                      label: "Eliminar",
                      icon: IconDelete,
                      isDelete: true,
                      dividerTop: true,
                      isLoading: isLoadingDeleteCourse,
                      onClick: () => {
                        openConfirmModal({
                          title: "¿Está seguro que quiere eliminar este curso?",
                          subTitle: "Esta acción no se puede deshacer.",
                          options: {
                            content: "Sí",
                            isLoading: isLoadingDeleteCourse,
                            onClick: () => {
                              deletePublishedCourse(course.id).then(() => closeConfirmModal())
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
      <Pagination {...pagination} />
    </div>
  )
}
