import { lazy, Suspense } from 'react'
import { Spinner, Tabs } from 'flowbite-react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { useShow } from '@/@common/hooks/use-show'
import { useStudentsStore } from '../store/use-students.store'
import { StudentTab } from '../enums/student-tab'
import { TableLoading } from '@/@common/components/table-loading'
import { useGetAllStudents, useStudentsUI } from '../hooks'
import { TableEmpty } from '@/@common/components/table-empty'
import { Menu } from '@/@common/components'
import { IconBookmarkAdd, IconDelete, IconEdit, IconEye, IconWhatsapp } from '@/assets/icons'
import StudentDetailsDrawer from '../components/student-details-drawer'
import { StudentPreRegistrationData } from '../types/Student'
import { whatsappMessage } from '@/@common/utils/whatsapp'
import { APP_NAME_WITHOUT_AMP } from '@/@common/env'
import { useStudents } from '../hooks/use-students'
import { getUserInitials } from '@/@common/utils/get-initials'

const RegisterStudentModal = lazy(() => import('../components/register-student-modal'))
const AssignCourseToStudentModal = lazy(() => import('../components/assign-course-to-student-modal'))

const StudentsPage = () => {
  const { show, open, close } = useShow()
  const { show: showAssignModal, open: openAssignModal, close: closeAssignModal } = useShow()
  const setStudentId = useStudentsStore((state) => state.setStudentId)
  const activeStudents = useStudentsStore((state) => state.activeStudents)
  const preRegisteredStudents = useStudentsStore((state) => state.preRegisteredStudents)
  const setPreRegisteredStudent = useStudentsStore((state) => state.setPreRegistered)
  const { isLoadingActive, isLoadingPreRegister } = useGetAllStudents({ page: 1, size: 100 }, { page: 1, size: 100 })
  const { isLoading: isLoadingDelete, deleteStudent } = useStudents()
  const {
    tab,
    handleTabIndex,
    showActiveStudentDrawer,
    openActiveStudentDrawer,
    closeActiveStudentDrawer
  } = useStudentsUI()
  const studentId = useStudentsStore((state) => state.studentId)

  const handleEditStudent = (student: StudentPreRegistrationData) => {
    setPreRegisteredStudent(student)
    open()
  }

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
          <Form.Input type="search" size="md" placeholder="Buscar estudiante..." />
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
        <Tabs aria-label="Tabs de estudiantes" variant="underline" onActiveTabChange={handleTabIndex}>
          <Tabs.Item
            title="Activos"
            className="!rounded py-2"
            active={tab === StudentTab.ACTIVE || tab === ''}
          >
            <table className="custom-table">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    Nombres
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    N° teléfono
                  </th>
                  <th>
                    Cursos
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={6} isLoading={isLoadingActive} />
                <TableEmpty
                  show={activeStudents.length < 1}
                  numCols={6}
                  isLoading={isLoadingActive}
                  message="No hay alumnos registrados"
                />
                {!isLoadingActive && activeStudents.map((student) => (
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
                      {'3'}
                    </td>
                    <td>
                      <div className="border-l border-l-gray-300 flex justify-center">
                        <Menu
                          variant="white"
                          options={[
                            {
                              label: 'Ver detalles',
                              icon: IconEye,
                              onClick: () => {
                                if (student.id !== studentId) {
                                  setStudentId(student.id)
                                }

                                openActiveStudentDrawer()
                              }
                            },
                            {
                              label: 'Inscribir a curso',
                              icon: IconBookmarkAdd,
                              onClick: () => handleShowAssignCourseModal(student.id)
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
                              onClick: () => deleteStudent(student.id, 'active'),
                              isLoading: isLoadingDelete
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
          <Tabs.Item
            title="Registrados"
            active={tab === StudentTab.REGISTERED}
          >
            <table className="custom-table">
              <thead>
                <tr>
                  <th>
                    Email
                  </th>
                  <th>
                    N° teléfono
                  </th>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableLoading numCols={3} isLoading={isLoadingPreRegister} />
                <TableEmpty
                  isLoading={isLoadingPreRegister}
                  show={preRegisteredStudents.length < 1}
                  numCols={3}
                />

                {!isLoadingPreRegister && preRegisteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      {student.email}
                    </td>
                    <td>
                      {student.phone}
                    </td>
                    <td>
                      <div className="border-l border-l-gray-300 flex justify-center">
                        <Menu
                          variant="white"
                          options={[
                            {
                              label: 'Confirmar cuenta',
                              icon: IconWhatsapp,
                              href: whatsappMessage({
                                message: `Tu correo electrónico fue registrado en ${APP_NAME_WITHOUT_AMP}, puedes actualizar tus datos en https://icjlec.acacemy/user/update?id=ID&t=TOKEN y empezar a aprender.\nEl limite está en ti`,
                                phoneNumber: student.phone
                              }),
                              rel: 'noopener noreferrer',
                              target: '_blank'
                            },
                            {
                              label: 'Editar',
                              icon: IconEdit,
                              onClick: () => handleEditStudent(student)
                            },
                            {
                              label: 'Eliminar',
                              icon: IconDelete,
                              isDelete: true,
                              dividerTop: true,
                              onClick: () => deleteStudent(student.id ?? '', 'registered'),
                              isLoading: isLoadingDelete
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

      {showActiveStudentDrawer && (
        <StudentDetailsDrawer
          show={showActiveStudentDrawer}
          close={closeActiveStudentDrawer}
        />
      )}

      {showAssignModal && (
        <Suspense fallback={<Spinner size="sm" />}>
          <AssignCourseToStudentModal
            isOpen={showAssignModal}
            onClose={closeAssignModal}
          />
        </Suspense>
      )}
    </div>
  )
}

export default StudentsPage
