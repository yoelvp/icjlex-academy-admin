import { lazy, Suspense } from "react"

import { TableEmpty } from "@/@common/components/table-empty"
import { TableLoading } from "@/@common/components/table-loading"
import { useGetCourses } from "../hooks/use-get-courses"
import { useCoursesStore } from "../store/courses.store"
import { Menu, Pagination } from "@/@common/components"
import { formatCurrency, getFullName } from "@/@common/utils"
import { useShow } from "@/@common/hooks"
import { useConfirmModalStore } from "@/store/use-confirm-modal.store"
import {
  IconDelete,
  IconDockRight,
  IconEditNote,
  IconEyeOutline,
  IconFileUpload,
  IconImageUp,
  IconOptions
} from "@/assets/icons"
import { Link } from "react-router"
import { useDeleteCourse } from "../hooks/use-delete-course"
import { formatDate } from "../utils/format-date"
import { usePublishCourse } from "../hooks/use-publish-course"

const CourseDetailsDrawer = lazy(() => import("../components/course-details-drawer"))

interface Props {
  handleCourseId: (teacherId: string) => void
  handleCourseImageUrl: (teacherId: string) => void
  openUpdateImageModal: () => void
}

export const TableScheduledCourses = ({
  handleCourseId,
  handleCourseImageUrl,
  openUpdateImageModal
}: Props) => {
  const { isLoadingPublished, scheduledPagination } = useGetCourses()
  const { isLoading: isLoadingDeleteCourse, deletePublishedCourse } = useDeleteCourse()
  const { isLoading: isLoadingPublishCourse, publishCourse } = usePublishCourse()
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  const courses = useCoursesStore((state) => state.scheduled.courses)
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const closeConfirmModal = useConfirmModalStore((state) => state.close)

  return (
    <div>
      <table className="custom-table table-fixed">
        <thead>
          <tr>
            <th className="w-20">ID</th>
            <th>Nombre</th>
            <th>Docente</th>
            <th className="w-32 !text-right">Precio</th>
            <th className="w-48">Fecha</th>
            <th className="w-24">Hora</th>
            <th className="w-14 !text-right"></th>
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
              <td>{course.id.slice(1, 8)}</td>
              <td>
                <div className="relative flex items-center gap-x-4">
                  <img
                    src={course.imageUrl || "/image-placeholder.png"}
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
                    <span>{index === course.teachers.length - 1 ? "." : ","}</span>
                  </p>
                ))}
              </td>
              <td className="!text-right">
                {formatCurrency(course?.price)}
              </td>
              <td>
                {formatDate(course.publicationDate)}
              </td>
              <td>08:00 p.m.</td>
              <td>
                <Menu
                  variant="primary.outline"
                  activator={<IconOptions />}
                  options={[
                    {
                      label: "Ver detalles",
                      icon: IconEyeOutline,
                      href: `/admin/courses/${course.id}`
                    },
                    {
                      label: "Publicar",
                      icon: IconFileUpload,
                      onClick: () => {
                        openConfirmModal({
                          title: "¿Está seguro que quiere publicar este curso?",
                          options: {
                            content: "Sí",
                            isLoading: isLoadingPublishCourse,
                            onClick: () => {
                              publishCourse(course?.id ?? "").then(closeConfirmModal)
                            }
                          }
                        })
                      }
                    },
                    {
                      label: "Actualizar imagen",
                      icon: IconImageUp,
                      onClick: () => {
                        handleCourseId(course.id)
                        handleCourseImageUrl(course.imageUrl ?? "")
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
                      onClick: () => {
                        openConfirmModal({
                          title: "¿Está seguro que quiere eliminar este curso?",
                          subTitle: "Esta acción no se puede deshacer.",
                          options: {
                            content: "Sí",
                            isLoading: isLoadingDeleteCourse,
                            onClick: () => {
                              deletePublishedCourse(course.id, "scheduled").then(() => closeConfirmModal())
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
