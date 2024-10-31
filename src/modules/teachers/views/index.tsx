import { lazy, Suspense } from 'react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { useShow } from '@/@common/hooks/use-show'
import { LoadingModal, Menu } from '@/@common/components'
import { TableLoading } from '@/@common/components/table-loading'
import { useDocentStore } from '../store/teachers.store'
import { useDocents } from '../hooks/use-docents'
import {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEyeOutline,
  IconFacebook,
  IconLinkedin,
  IconOptions,
  IconSearch,
  IconWhatsapp,
  IconX,
  IconYoutube
} from '@/assets/icons'
import { MenuOptions } from '@/@common/types/Menu'

const RegisterTeacherModal = lazy(() => import('../components/register-teacher-modal'))
const TeacherDetailsDrawer  = lazy(() => import('../components/teacher-details-drawer'))

const CoursesPage = () => {
  const { show, open, close } = useShow()
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  const teachers = useDocentStore((state) => state.teachers)
  const { isLoading } = useDocents(1, 1000)
  const options: MenuOptions[] = [
    {
      label: 'Ver detalles',
      icon: IconEyeOutline,
      onClick: openDetailsDrawer
    },
    {
      label: 'Actualizar',
      icon: IconEdit,
      onClick: () => {
        console.log('Editar')
      }
    },
    {
      label: 'Eliminar',
      icon: IconDelete,
      onClick: () => console.log('Eliminar'),
      isDelete: true,
      dividerTop: true
    }
  ]

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
        <table className="custom-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Especialidades</th>
              <th>Profesion</th>
              <th>Sobre mí</th>
              <th>Redes Sociales</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TableLoading numCols={8} isLoading={isLoading} />
            {!isLoading &&
              teachers?.map((docent) => (
                <tr key={docent.id} className="border-b border-gray-200">
                  <td>
                    <img
                      src={docent.imageUrl || '/placeholder-image.png'}
                      alt={`${docent.firstName} ${docent.lastName}`}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td>{docent.firstName}</td>
                  <td>{docent.lastName}</td>
                  <td className="max-w-md">
                    {docent.specialties ? docent.specialties.join(', ') : '-'}
                  </td>
                  <td>{docent.profession}</td>
                  <td className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {docent.about}
                  </td>
                  <td>
                    {docent.socialMedia ? (
                      <div className="flex space-x-2">
                        {docent.socialMedia.whatsapp && (
                          <a
                            href={docent.socialMedia.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconWhatsapp size={18} className="text-green-600" />
                          </a>
                        )}
                        {docent.socialMedia.x && (
                          <a
                            href={docent.socialMedia.x}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconX size={18} />
                          </a>
                        )}
                        {docent.socialMedia.facebook && (
                          <a
                            href={docent.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconFacebook size={18} className="text-blue-600" />
                          </a>
                        )}
                        {docent.socialMedia.linkedin && (
                          <a
                            href={docent.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconLinkedin size={18} className="text-blue-800" />
                          </a>
                        )}
                        {docent.socialMedia.youtube && (
                          <a
                            href={docent.socialMedia.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconYoutube size={18} className="text-red-600" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <span>No disponible</span>
                    )}
                  </td>
                  <td>
                    <Menu variant={'white'} activator={<IconOptions />} size="xs" options={options} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {show && (
        <Suspense fallback={<LoadingModal />}>
          <RegisterTeacherModal
            isOpen={show}
            onClose={close}
          />
        </Suspense>
      )}

      {showDetailsDrawer && (
        <Suspense fallback={<div children="Cargando" />}>
          <TeacherDetailsDrawer
            show={showDetailsDrawer}
            close={closeDetailsDrawer}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
