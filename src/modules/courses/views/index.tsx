import { lazy } from 'react'
import { IconAdd, IconSearch } from '@/assets/icons'
import Form from '@/@common/components/form'
import Button from '@/@common/components/button'
import { useShow } from '@/@common/hooks/use-show'
import { ListCourses } from '../components/list-courses'

const RegisterCourseForm = lazy(() => import('../components/register-course-form'))

const CoursesPage = () => {
  const { show, open, close } = useShow()

  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex-between">
        <h2 className="header-title">Cursos</h2>

        <div className="flex items-center gap-x-2">
          <Form.Input
            placeholder="Busca lo que quieras..."
            size="sm"
            withIcon
            icon={IconSearch}
          />
          <Button onClick={open} size="sm">
            <IconAdd size={24} />
            Agregar
          </Button>
        </div>
      </header>

      <div className="section-panel py-4">
        <ListCourses toggleModal={open} />
      </div>

      <RegisterCourseForm isOpen={show} onClose={close} />
    </div>
  )
}

export default CoursesPage
