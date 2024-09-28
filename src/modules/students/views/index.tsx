import Button from '@/@common/components/button'
import Form from '@/@common/components/form'

const StudentsPage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex justify-between items-center">
        <h3 className="text-2xl font-bold">
          Estudiantes
        </h3>

        <div className="flex gap-x-2">
          <Form.Input type="search" size="md" placeholder="Buscar estudiante..." />
          <Button size="sm">
            Crear
          </Button>
        </div>
      </header>

      <section className="section-panel">
        Buenas noches
      </section>
    </div>
  )
}

export default StudentsPage
