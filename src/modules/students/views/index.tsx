import { lazy, Suspense } from 'react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { useShow } from '@/@common/hooks/use-show'

const d = (promise) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000)
  }).then(() => promise)
}

const RegisterStudentModal = lazy(() => d(import('../components/register-student-modal')))

const StudentsPage = () => {
  const { show, open, close } = useShow()

  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex justify-between items-center">
        <h3 className="header-title">
          Estudiantes
        </h3>

        <div className="flex gap-x-2">
          <Form.Input type="search" size="md" placeholder="Buscar estudiante..." />
          <Button size="sm" onClick={open}>
            Crear
          </Button>
        </div>
      </header>

      <section className="section-panel p-4">
        <table className="custom-table">
          <thead>
            <tr>
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
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Manuel Esquivel
              </td>
              <td>
                manuel@gmail.com
              </td>
              <td>
                966271829
              </td>
              <td>
                menu
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {show && (
        <Suspense fallback={<ModalLoading />}>
          <RegisterStudentModal isOpen={show} onClose={close} />
        </Suspense>
      )}
    </div>
  )
}

const ModalLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-transparent flex-center">
      <div className="bg-white px-4 py-2 rounded-lg">Cargando modal</div>
    </div>
  )
}

export default StudentsPage
