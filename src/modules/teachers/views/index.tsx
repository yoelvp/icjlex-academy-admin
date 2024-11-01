import { lazy, Suspense } from 'react'
import Button from '@/@common/components/button'
import Form from '@/@common/components/form'
import { useShow } from '@/@common/hooks/use-show'
import { LoadingModal, Menu } from '@/@common/components'
import { TableLoading } from '@/@common/components/table-loading'
import { useTeacherStore } from '../store/teachers.store'
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
import { getFullName } from '@/@common/utils/get-full-names'

const RegisterTeacherModal = lazy(() => import('../components/register-teacher-modal'))
const TeacherDetailsDrawer = lazy(() => import('../components/teacher-details-drawer'))
const UpdateImageModal = lazy(() => import('../components/update-image-modal'))

const CoursesPage = () => {
  const { show, open, close } = useShow()
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  const { show: showUpdateImageModal, open: openUpdateImageModal, close: closeUpdateImageModal } = useShow()
  const teachers = useTeacherStore((state) => state.teachers)
  const { isLoading } = useDocents(1, 1000)
  const setTeacher = useTeacherStore((state) => state.setTeacher)

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
              <th>N°</th>
              <th>Nombres</th>
              <th>Especialidades</th>
              <th>Profesion</th>
              <th>Redes sociales</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TableLoading numCols={6} isLoading={isLoading} />
            {!isLoading && teachers?.map((teacher, index) => (
              <tr key={teacher.id} className="border-b border-gray-200">
                <td>
                  {index + 1}
                </td>
                <td className="max-w-[320px] overflow-hidden">
                  <div className="w-full h-full relative group/image flex justify-start items-center gap-x-4">
                    <img
                      src={teacher.imageUrl || '/placeholder-image.png'}
                      alt={`${teacher.firstName} ${teacher.lastName}`}
                      className="w-10 h-10 object-cover object-center rounded-full border border-primary-500/25"
                    />
                    <span className="w-full text-nowrap text-ellipsis">
                      {getFullName(teacher)}
                    </span>
                    <button
                      onClick={() => {
                        setTeacher(teacher)
                        openUpdateImageModal()
                      }}
                      className="hidden absolute top-2 left-0 border border-primary-500/25 bg-zinc-800/80 text-white rounded-sm px-1 group-hover/image:block"
                    >
                      <IconEdit size="22" />
                    </button>
                  </div>
                </td>
                <td className="max-w-md">
                  {teacher.specialties ? teacher.specialties.join(', ') : '-'}
                </td>
                <td>{teacher.profession}</td>
                <td>
                  {teacher.socialMedia ? (
                    <div className="flex space-x-2">
                      {teacher.socialMedia.whatsapp && (
                        <a
                          href={teacher.socialMedia.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconWhatsapp
                            size={18}
                            className="text-green-600"
                          />
                        </a>
                      )}
                      {teacher.socialMedia.x && (
                        <a
                          href={teacher.socialMedia.x}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconX size={18} />
                        </a>
                      )}
                      {teacher.socialMedia.facebook && (
                        <a
                          href={teacher.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconFacebook size={18} className="text-blue-600" />
                        </a>
                      )}
                      {teacher.socialMedia.linkedin && (
                        <a
                          href={teacher.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconLinkedin size={18} className="text-blue-800" />
                        </a>
                      )}
                      {teacher.socialMedia.youtube && (
                        <a
                          href={teacher.socialMedia.youtube}
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
                  <Menu
                    variant={'white'}
                    activator={<IconOptions />}
                    size="xs"
                    options={[
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
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {show && (
        <Suspense fallback={<LoadingModal />}>
          <RegisterTeacherModal isOpen={show} onClose={close} />
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
      {showUpdateImageModal && (
        <Suspense fallback={<LoadingModal />}>
          <UpdateImageModal
            show={showUpdateImageModal}
            close={() => {
              closeUpdateImageModal()
              setTeacher(null)
            }}
          />
        </Suspense>
      )}
    </div>
  )
}

export default CoursesPage
