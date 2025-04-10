import { lazy, Suspense } from "react"
import { Spinner } from "flowbite-react"
import Button from "@/@common/components/button"
import Form from "@/@common/components/form"
import { useShow } from "@/@common/hooks/use-show"
import { useStudentsStore } from "../store/use-students.store"
import { TableLoading } from "@/@common/components/table-loading"
import { useStudentsUI } from "../hooks/use-students-ui"
import { TableEmpty } from "@/@common/components/table-empty"
import { Menu } from "@/@common/components"
import { IconBookmarkAdd, IconDelete, IconEdit, IconEye } from "@/assets/icons"
import { useStudents } from "../hooks/use-students"
import { getUserInitials } from "@/@common/utils/get-initials"
import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/@common/utils"
import { getAllStudentsService } from "@/_services/students.service"

const RegisterStudentModal = lazy(() => import("../components/register-student-modal"))
/* const AssignCourseToStudentModal = lazy(() => import("../components/assign-course-to-student-modal")) */

const StudentsPage = () => {
  const { show, open, close } = useShow()
  const { show: showAssignModal, open: openAssignModal, close: closeAssignModal } = useShow()
  const setStudentId = useStudentsStore((state) => state.setStudentId)
  const activeStudents = useStudentsStore((state) => state.activeStudents)
  const setPreRegisteredStudent = useStudentsStore((state) => state.setPreRegistered)
  const { isLoading: isLoadingDelete, deleteStudent } = useStudents()
  const {
    openActiveStudentDrawer
  } = useStudentsUI()
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.STUDENTS],
    queryFn: async () => getAllStudentsService({
      page: 1,
      perPage: 10,
      searchQuery: null
    }),
    select: (res) => res?.data
  })

  console.log(data)

  const studentId = useStudentsStore((state) => state.studentId)

  const handleClosePreRegisteredModal = () => {
    setPreRegisteredStudent(null)
    close()
  }

  const handleShowAssignCourseModal = (studentId: string) => {
    setStudentId(studentId)
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
          <Button size="sm" onClick={open}>
            {show && (
              <Suspense fallback={<Spinner size="sm" />}>
                <RegisterStudentModal isOpen={show} onClose={handleClosePreRegisteredModal} />
              </Suspense>
            )}
            Crear
          </Button>
        </div>
      </header>

      <section className="section-panel p-4">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
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
              show={(data?.data?.length ?? 0) < 1}
              numCols={6}
              isLoading={isLoading}
              message="No hay alumnos registrados"
            />
            {!isLoading && data?.data?.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.imageUrl ? (
                    <img
                      src={student.imageUrl}
                      alt="Image"
                      className="w-8 h-8 rounded-full border border-primary-200 text-xs"
                    />
                  ) : (
                    <div className="w-8 h-8 flex-center text-xs font-bold rounded-full border border-primary-200">
                      {getUserInitials(student)}
                    </div>
                  )}
                </td>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>
                  {student.email}
                </td>
                <td>
                  {student.phone}
                </td>
                <td>
                  {"3"}
                </td>
                <td>
                  <Menu
                    variant="white"
                    options={[
                      {
                        label: "Ver detalles",
                        icon: IconEye,
                        onClick: () => {
                          if (student.id !== studentId) {
                            setStudentId(student.id)
                          }

                          openActiveStudentDrawer()
                        }
                      },
                      {
                        label: "Inscribir a curso",
                        icon: IconBookmarkAdd,
                        onClick: () => handleShowAssignCourseModal(student.id)
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
                        onClick: () => deleteStudent(student.id, "active"),
                        isLoading: isLoadingDelete
                      }
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* {showActiveStudentDrawer && ( */}
      {/*   <StudentDetailsDrawer */}
      {/*     show={showActiveStudentDrawer} */}
      {/*     close={closeActiveStudentDrawer} */}
      {/*   /> */}
      {/* )} */}
      {/**/}
      {/* {showAssignModal && ( */}
      {/*   <Suspense fallback={<Spinner size="sm" />}> */}
      {/*     <AssignCourseToStudentModal */}
      {/*       isOpen={showAssignModal} */}
      {/*       onClose={closeAssignModal} */}
      {/*     /> */}
      {/*   </Suspense> */}
      {/* )} */}
    </div>
  )
}

export default StudentsPage
