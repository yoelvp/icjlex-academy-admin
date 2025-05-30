import { lazy, Suspense, useState } from "react"
import { Spinner } from "flowbite-react"
import { useSearchParams } from "react-router"
import Button from "@/@common/components/button"
import Form from "@/@common/components/form"
import { useShow } from "@/@common/hooks/use-show"
import { TableLoading } from "@/@common/components/table-loading"
import { TableEmpty } from "@/@common/components/table-empty"
import { LoadingModal, Menu, Pagination } from "@/@common/components"
import { IconBookmarkAdd, IconDelete, IconEdit, IconEye } from "@/assets/icons"
import { Student } from "@/types"
import { useGetAllStudents } from "../hooks/use-get-all-students"
import { getFullName } from "@/@common/utils"

const StudentFormModal = lazy(() => import("../components/student-form-modal"))
const AssignCourseToStudentModal = lazy(() => import("../components/assign-course-to-student-modal"))
const StudentDetailsModal = lazy(() => import("../components/student-details-drawer"))

const StudentsPage = () => {
  const [student, setStudent] = useState<Student | null>(null)
  const { show, open, close } = useShow()
  const { show: showAssignModal, open: openAssignModal, close: closeAssignModal } = useShow()
  const { show: showDetailsModal, open: openDetailsModal, close: closeDetailsModal } = useShow()
  const { isLoading, students, pagination } = useGetAllStudents()
  const [params, setParams] = useSearchParams()
  const STUDENT_ID_PARAM = params.get("id")

  const handleShowAssignCourseModal = (student: Student) => {
    setStudent(student)
    openAssignModal()
  }

  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex justify-between items-center">
        <h3 className="header-title">
          Estudiantes
        </h3>

        <div className="flex gap-x-2">
          <Form.Input type="search" size="sm" placeholder="Buscar estudiante..." />
          <Button
            size="sm"
            onClick={open}
          >
            Crear
            {show && (
              <Suspense fallback={<Spinner size="sm" />}>
                <StudentFormModal open={show} onClose={close} />
              </Suspense>
            )}
          </Button>
        </div>
      </header>

      <section className="section-panel space-y-4">
        <table className="custom-table">
          <thead>
            <tr>
              <th className="w-24">ID</th>
              <th>Nombres</th>
              <th>Email</th>
              <th>N° teléfono</th>
              <th>Cursos</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <TableLoading numCols={6} isLoading={isLoading} />
            <TableEmpty
              show={(students?.length ?? 0) < 1}
              numCols={6}
              isLoading={isLoading}
              message="No hay alumnos registrados"
            />
            {!isLoading && students?.map((student) => (
              <tr key={student.id}>
                <td>
                  {student?.id?.slice(0, 8)}
                </td>
                <td>
                  {getFullName(student)}
                </td>
                <td>
                  {student?.email}
                </td>
                <td>
                  {student?.phone}
                </td>
                <td>
                  <span className="text-sm bg-zinc-200 rounded-sm px-2 py-1">
                    Próximo
                  </span>
                </td>
                <td>
                  <Menu
                    variant="primary.outline"
                    options={[
                      {
                        label: "Ver detalles",
                        icon: IconEye,
                        onClick: () => {
                          setStudent(student)
                          setParams({ id: student?.id })
                          openDetailsModal()
                        }
                      },
                      {
                        label: "Inscribir a curso",
                        icon: IconBookmarkAdd,
                        onClick: () => handleShowAssignCourseModal(student)
                      },
                      {
                        label: "Editar",
                        icon: IconEdit,
                        onClick: () => console.log("Editar")
                      },
                      {
                        label: "Eliminar",
                        icon: IconDelete,
                        isDelete: true,
                        dividerTop: true,
                        onClick: () => {
                          console.error("Buenas")
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
      </section>

      {showAssignModal && (
        <Suspense fallback={<LoadingModal size="md" />}>
          <AssignCourseToStudentModal
            student={student}
            isOpen={showAssignModal}
            onClose={closeAssignModal}
          />
        </Suspense>
      )}

      {showDetailsModal && (
        <Suspense fallback={<LoadingModal size="sm" />}>
          <StudentDetailsModal
            studentId={student?.id ?? ""}
            show={STUDENT_ID_PARAM === student?.id && showDetailsModal}
            close={() => {
              closeDetailsModal()
              setParams({})
            }}
          />
        </Suspense>
      )}
    </div>
  )
}

export default StudentsPage
