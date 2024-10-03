import Button from '@/@common/components/button'
import { Content } from '@/@common/components/content'
import { lazy, useState } from 'react'
import { IconAdd, IconSearch } from '@/assets/icons'
import Form from '@/@common/components/form'
import { ListDocents } from '../components/list-docents'
import { useDocents } from '../hooks/use-docents'

const ModalDocent = lazy(() => import('../components/modal-docent'))

const CoursesPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { docents } = useDocents()

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <Content className="relative py-32 h-full box-border">
      <div className="flex-between mb-6">
        <h1 className="text-3xl font-bold text-primary-500">Docentes</h1>
        <Button.NextLink href="#" onClick={openModal}>
          <IconAdd size={24} />
          Agregar Docente
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

      <ListDocents docents={docents} toggleModal={openModal} />
      <ModalDocent isOpen={isOpenModal} onClose={closeModal} />
    </Content>
  )
}

export default CoursesPage
