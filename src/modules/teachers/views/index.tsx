import { lazy } from 'react'
import Button from '@/@common/components/button'
import { IconAdd, IconSearch } from '@/assets/icons'
import Form from '@/@common/components/form'
import { ListDocents } from '../components/list-docents'
import { useShow } from '@/@common/hooks/use-show'

const ModalDocent = lazy(() => import('../components/modal-docent'))

const CoursesPage = () => {
  const { show, open, close } = useShow()

  return (
    <div className="flex flex-col gap-y-8">
      <header className="section-panel header-height flex-between">
        <h2 className="header-title">Docentes</h2>

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
        <ListDocents toggleModal={open} />
      </div>

      <ModalDocent isOpen={show} onClose={close} />
    </div>
  )
}

export default CoursesPage
