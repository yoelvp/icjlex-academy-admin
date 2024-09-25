import Button from '@/@common/components/button'
import { ListCourses } from '../components/list-courses'
import { useState } from 'react'
import { Course } from '../types/Course'
import { IconAdd, IconSearch } from '@/assets/icons'
import { Content } from '@/@common/components/content'
import { ModalCourse } from '../components/modal-course'
import Form from '@/@common/components/form'

const CoursesPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [course, _] = useState<Course[]>([
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
  ])

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <Content className="relative py-32 h-full box-border">
      <div className="flex-between mb-6">
        <h1 className="text-3xl font-bold text-primary-500">Cursos</h1>
        <Button.NextLink href="#" onClick={openModal}>
          <IconAdd size={24} />
          Agregar Curso
        </Button.NextLink>
      </div>

      <Form className="flex-between mb-8 gap-8">
        <Form.Input
          placeholder="Busca lo que quieras..."
          size="lg"
          withIcon
          icon={IconSearch}
        />
        <Button.NextLink size="lg" href="" variant="primary.outline">
          Filtrar
        </Button.NextLink>
      </Form>

      <ListCourses courses={course} toggleModal={openModal} />
      <ModalCourse isOpen={isOpenModal} onClose={closeModal} />
    </Content>
  )
}

export default CoursesPage
