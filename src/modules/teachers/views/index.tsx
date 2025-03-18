import { lazy, Suspense, useState } from "react"
import Form from "@/@common/components/form"
import Link from "@/@common/components/link"
import { useShow } from "@/@common/hooks/use-show"
import { LoadingModal, Menu, Pagination, Tooltip } from "@/@common/components"
import { TableLoading } from "@/@common/components/table-loading"
import { TableEmpty } from "@/@common/components/table-empty"
import { useTeacherStore } from "../store/teachers.store"
import { useGetAllTeachers } from "../hooks/use-get-all-teachers"
import { useDeleteTeacher } from "../hooks/use-delete-teacher"
import { useGetTeacherById } from "../hooks/use-get-teacher-by-id"
import { getFullName } from "@/@common/utils/get-full-names"
import { useNavigate } from "react-router"
import { useConfirmModalStore } from "@/store/use-confirm-modal.store"
import {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEyeOutline,
  IconImageUp,
  IconLink,
  IconOptions,
  IconSearch
} from "@/assets/icons"

const TeacherDetailsDrawer = lazy(() => import("../components/teacher-details-drawer"))
const UpdateImageModal = lazy(() => import("../components/update-image-modal"))

const CoursesPage = () => {
  const [teacherImageProfile, setTeacherImageProfile] = useState<string | null>(null)
  const [teacherUpdateImageId, setTeacherUpdateImageId] = useState<string | null>(null)
  const navigate = useNavigate()
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  const { show: showUpdateImageModal, open: openUpdateImageModal, close: closeUpdateImageModal } = useShow()
  const { isLoading, pagination, search } = useGetAllTeachers()
  const { isLoading: isLoadingById, getTeacherById } = useGetTeacherById()
  const { isLoading: isLoadingDelete, deleteTeacher } = useDeleteTeacher()
  const teachers = useTeacherStore((state) => state.teachers)
  const openConfirmModal = useConfirmModalStore((state) => state.open)
  const closeConfirmModal = useConfirmModalStore((state) => state.close)

  const handleUpdateImageModal = (teacherId: string, imageUrl: string) => {
    setTeacherImageProfile(imageUrl)
    setTeacherUpdateImageId(teacherId)
    openUpdateImageModal()
  }

  return (
    <div className="flex flex-col gap-y-4">
      <header className="section-panel header-height flex-between">
        <h2 className="header-title">Docentes</h2>

        <div className="flex items-center gap-x-2">
          <Form.Input
            placeholder="Busca lo que quieras..."
            size="sm"
            withIcon
            icon={IconSearch}
            onChange={(e) => search(e.target.value)}
          />
          <Link href="/admin/teachers/create" size="sm">
            <IconAdd size={24} />
            Crear
          </Link>
        </div>
      </header>

      <div className="py-4 space-y-4">
        <table className="custom-table table-fixed">
          <thead>
            <tr>
              <th className="w-20">ID</th>
              <th>Nombres</th>
              <th>Especialidades</th>
              <th>Profesion</th>
              <th>Redes sociales</th>
              <th className="w-14 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <TableEmpty numCols={6} isLoading={isLoading} show={(teachers?.length ?? 0) < 1} />
            <TableLoading numCols={6} isLoading={isLoading} />

            {!isLoading && teachers?.map((teacher) => (
              <tr key={teacher?.id} className="border-b border-gray-200">
                <td>
                  {teacher?.id.slice(0, 8)}
                </td>
                <td>
                  <div className="flex items-center justify-start gap-x-2">
                    <div className="relative w-10 min-w-10 h-10 overflow-hidden group/image flex justify-start items-center gap-x-2">
                      <img
                        src={teacher.imageUrl ?? "/placeholder-image.png"}
                        alt="profile teacher"
                        className="w-full h-full object-cover object-center overflow-hidden rounded-full border border-primary-500/25"
                      />
                      <button
                        onClick={() => handleUpdateImageModal(teacher?.id ?? "", teacher?.imageUrl ?? "")}
                        className="hidden absolute top-1/2 left-1/2 -translate-1/2 text-primary-500 justify-center items-center group-hover/image:flex w-6 h-6 rounded-full bg-white/80"
                      >
                        <IconEdit size="16" />
                      </button>
                    </div>

                    <span className="w-full text-nowrap text-ellipsis">
                      {getFullName(teacher)}
                    </span>
                  </div>
                </td>
                <td>
                  {!teacher?.specialties && !(teacher?.specialties?.length ?? 0) && "-"}
                  {Array.isArray(teacher?.specialties) ? teacher?.specialties?.join(", ") : teacher?.specialties}
                </td>
                <td>{teacher?.profession}</td>
                <td>
                  <div className="flex items-center gap-x-2">
                    {Array.isArray(teacher?.socialMedia) && teacher?.socialMedia?.map((social, index) => (
                      <Tooltip
                        key={social + index}
                        position="top"
                        trigger="hover"
                        content={social}
                      >
                        <a
                          href={social}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconLink size="18" />
                        </a>
                      </Tooltip>
                    ))}
                  </div>
                </td>
                <td>
                  <Menu
                    variant="primary.outline"
                    activator={<IconOptions />}
                    size="sm"
                    options={[
                      {
                        label: "Ver detalles",
                        icon: IconEyeOutline,
                        onClick: () => {
                          getTeacherById(teacher?.id ?? "").then(() => {
                            openDetailsDrawer()
                          })
                        }
                      },
                      {
                        label: "Editar",
                        icon: IconEdit,
                        isLoading: isLoadingById,
                        onClick: () => {
                          getTeacherById(teacher?.id ?? "").then(() => {
                            navigate(`/admin/teachers/update/${teacher?.slug}/${teacher?.id}`)
                          })
                        }
                      },
                      {
                        label: "Actualizar imagen",
                        icon: IconImageUp,
                        onClick: () => handleUpdateImageModal(teacher?.id ?? "", teacher?.imageUrl ?? "")
                      },
                      {
                        label: "Eliminar",
                        icon: IconDelete,
                        onClick: () => {
                          openConfirmModal({
                            title: `¿Está seguro que quiere eliminar a ${teacher?.firstName} ${teacher?.lastName}?`,
                            subTitle: "El docente se eliminará de manera permanente. Esta acción no se puede deshacer.",
                            options: {
                              content: "Sí",
                              isLoading: isLoadingDelete,
                              onClick: () => {
                                deleteTeacher(teacher.id ?? "").then(() => {
                                  closeConfirmModal()
                                })
                              }
                            }
                          })
                        },
                        isDelete: true,
                        dividerTop: true
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

      {showDetailsDrawer && (
        <Suspense fallback={<div children="Cargando" />}>
          <TeacherDetailsDrawer
            show={showDetailsDrawer}
            close={closeDetailsDrawer}
          />
        </Suspense>
      )}
      {showUpdateImageModal && (
        <Suspense fallback={<LoadingModal />}>
          <UpdateImageModal
            show={showUpdateImageModal}
            close={() => {
              closeUpdateImageModal()
              setTeacherImageProfile(null)
            }}
            teacherId={teacherUpdateImageId ?? ""}
            defaultImage={teacherImageProfile ?? ""}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
