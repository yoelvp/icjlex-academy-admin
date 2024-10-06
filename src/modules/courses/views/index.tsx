import { lazy } from 'react'
import { IconAdd, IconSearch } from '@/assets/icons'
import Form from '@/@common/components/form'
import Button from '@/@common/components/button'
import { useShow } from '@/@common/hooks/use-show'
import { ListCourses } from '../components/list-courses'

const ModalCourse = lazy(() => import('../components/modal-course'))

const CoursesPage = () => {
  const { show, open, close } = useShow()
  /*const [course, setCourse] = useState([
    {
      id: '1',
      name: 'Introducción a React',
      description: 'Ana García',
      isActive: true
    },
    {
      id: '2',
      name: 'Diseño UX Avanzado',
      description: 'Carlos Pérez',
      isActive: false
    },
    {
      id: '3',
      name: 'JavaScript Moderno',
      description: 'Laura Martínez',
      isActive: true
    },
    {
      id: '4',
      name: 'JavaScript Moderno',
      description: 'Laura Martínez',
      isActive: true
    },
    {
      id: '5',
      name: 'JavaScript Moderno',
      description: 'Laura Martínez',
      isActive: false
    },
    {
      id: '6',
      name: 'JavaScript Moderno',
      description: 'Laura Martínez',
      isActive: true
    }
  ]) */

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
        <ListCourses courses={course} toggleModal={open} />
      </div>

      <ModalCourse isOpen={show} onClose={close} />
    </div>
  )
}

export default CoursesPage
