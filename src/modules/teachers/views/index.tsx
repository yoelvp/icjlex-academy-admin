import { Fragment, lazy, Suspense } from 'react'
import Form from '@/@common/components/form'
import { useShow } from '@/@common/hooks/use-show'
import { LoadingModal, Menu, Pagination } from '@/@common/components'
import { TableLoading } from '@/@common/components/table-loading'
import { useTeacherStore } from '../store/teachers.store'
import { useGetAllTeachers, useGetTeacherById } from '../hooks'
import {
  IconAdd,
  IconDelete,
  IconEdit,
  IconEyeOutline,
  IconFacebook,
  IconLinkedin,
  IconOptions,
  IconSearch,
  IconX,
  IconYoutube
} from '@/assets/icons'
import { getFullName } from '@/@common/utils/get-full-names'
import Link from '@/@common/components/link'
import { useNavigate } from 'react-router-dom'

const TeacherDetailsDrawer = lazy(() => import('../components/teacher-details-drawer'))
const UpdateImageModal = lazy(() => import('../components/update-image-modal'))

const CoursesPage = () => {
  const navigate = useNavigate()
  const { show: showDetailsDrawer, open: openDetailsDrawer, close: closeDetailsDrawer } = useShow()
  const { show: showUpdateImageModal, open: openUpdateImageModal, close: closeUpdateImageModal } = useShow()
  const { isLoading, pagination } = useGetAllTeachers()
  const { isLoading: isLoadingById, getTeacherById } = useGetTeacherById()
  const teachers = useTeacherStore((state) => state.teachers)
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
          <Link href="/admin/teachers/create" size="sm">
            <IconAdd size={24} />
            Crear
          </Link>
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
                      className="w-8 h-8 object-cover object-center overflow-hidden rounded-full border border-primary-500/25"
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
                  {teacher?.specialties ? teacher.specialties.join(', ') : '-'}
                </td>
                <td>{teacher?.profession}</td>
                <td>
                  {!Array.isArray(teacher?.socialMedia) && (
                    <a
                      href={teacher?.socialMedia}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RS
                    </a>
                  )}
                  {Array.isArray(teacher?.socialMedia) && teacher?.socialMedia?.map((social: string) => (
                    <Fragment key={social}>
                      {social.includes('facebook.com') && (
                        <a
                          href={social}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconFacebook size={18} className="text-blue-600" />
                        </a>
                      )}
                      {social.includes('x.com') && (
                        <a
                          href={social}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconX size={18} />
                        </a>
                      )}
                      {social.includes('linkedin.com') && (
                        <a
                          href={social}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconLinkedin size={18} className="text-blue-800" />
                        </a>
                      )}
                      {social.includes('youtube.com') && (
                        <a
                          href={social}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconYoutube size={18} className="text-red-600" />
                        </a>
                      )}
                    </Fragment>
                  ))}
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
                        label: 'Editar',
                        icon: IconEdit,
                        isLoading: isLoadingById,
                        onClick: async () => {
                          await getTeacherById(teacher?.id ?? '').then(() => {
                            navigate(`/admin/teachers/update/${teacher?.slug}/${teacher?.id}`)
                          })
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

        <Pagination {...pagination} />
      </div>

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
