import { lazy, Suspense } from 'react'
import { Spinner, Tabs } from 'flowbite-react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { useShow } from '@/@common/hooks/use-show'
import { useStudentsStore } from '../store/use-students.store'
import { StudentTab } from '../enums/student-tab'
import { TableLoading } from '@/@common/components/table-loading'
import { useStudentsUI } from '../hooks'
import { useGetActiveStudents, useGetPreRegisteredStudents } from '../hooks'
import { TableEmpty } from '@/@common/components/table-empty'

const RegisterStudentModal = lazy(() => import('../components/register-student-modal'))

const StudentsPage = () => {
  const { show, open, close } = useShow()
  const activeStudents = useStudentsStore((state) => state.activeStudents)
  const preRegisteredStudents = useStudentsStore((state) => state.preRegisteredStudents)
  const { tab, handleTabIndex } = useStudentsUI()
  const { isLoading: isLoadingActive } = useGetActiveStudents({ page: 1, size: 10 })
  const { isLoading } = useGetPreRegisteredStudents({ page: 1, size: 10 })

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
                <RegisterStudentModal isOpen={show} onClose={close} />
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
                {!isLoadingActive && activeStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <img src="https://r2.yoelvalverde.dev/masthead.webp" alt="Image" className="w-8 h-8 rounded-full border border-primary-200 text-xs" />
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
                      ...
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
                <TableLoading numCols={3} isLoading={isLoading} />
                <TableEmpty
                  isLoading={isLoading}
                  show={preRegisteredStudents.length < 1}
                  numCols={3}
                />

                {!isLoading && preRegisteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      {student.email}
                    </td>
                    <td>
                      {student.phone}
                    </td>
                    <td className="text-right">
                      menu
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tabs.Item>
        </Tabs>
      </section>
    </div>
  )
}

export default StudentsPage
