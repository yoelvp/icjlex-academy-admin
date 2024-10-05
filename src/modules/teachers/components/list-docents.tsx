import { FC } from 'react'
import {
  IconDelete,
  IconEdit,
  IconEyeOutline,
  IconFacebook,
  IconLinkedin,
  IconOptions,
  IconWhatsapp,
  IconX,
  IconYoutube
} from '@/assets/icons'
import classNames from 'classnames'
import { useDocents } from '../hooks/use-docents'
import { TableLoading } from '@/@common/components/table-loading'
import { useDocentStore } from '../store/teachers.store'
import { usePagination } from '@/@common/hooks/use-pagination'
import { Menu } from '@/@common/components/menu'
import { ButtonAction } from '@/@common/components/button-action'

interface CourseTableList {
  toggleModal: () => void
}

export const ListDocents: FC<CourseTableList> = ({ toggleModal }) => {
  const teachers = useDocentStore((state) => state.teachers)
  const pagination = useDocentStore((state) => state.pagination)
  const { page, perPage, nextPage, prevPage } = usePagination()
  const { isLoading } = useDocents(page, perPage)

  return (
    <div className="rounded-xs overflow-x-auto">
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
                  {docent.docentToSpecialty
                    ?.map((specialty) => specialty.specialtyName)
                    .join(', ')}
                </td>
                <td>{docent.profession}</td>
                <td className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {docent.aboutMe}
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
                  <Menu variant={'white'} activator={<IconOptions />} size="xs">
                    <div className="flex-col-start px-4 py-2| w-auto gap-2">
                      <ButtonAction
                        onClick={() => console.log('Ver detalles')}
                        icon={IconEyeOutline}
                        text="Ver detalles"
                        disabled={false}
                      />
                      <ButtonAction
                        onClick={toggleModal}
                        icon={IconEdit}
                        text="Actualizar"
                        disabled={false}
                      />
                      <ButtonAction
                        onClick={() => console.log('Eliminar')}
                        icon={IconDelete}
                        text="Eliminar"
                        disabled={false}
                      />
                    </div>
                  </Menu>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={pagination.currentPage === 1}
          className={classNames(
            'py-2 px-4 rounded',
            { 'bg-gray-300': pagination.currentPage === 1 },
            { 'bg-primary-500 text-white': pagination.currentPage !== 1 }
          )}
        >
          Previous
        </button>
        <span>
          Page {page} of {pagination.totalPages} of {pagination.count} elements
        </span>
        <button
          onClick={nextPage}
          disabled={pagination.currentPage === pagination.totalPages}
          className={classNames(
            'py-2 px-4 rounded',
            { 'bg-gray-300': pagination.currentPage === pagination.totalPages },
            {
              'bg-primary-500 text-white':
                pagination.currentPage !== pagination.totalPages
            }
          )}
        >
          Next
        </button>
      </div>
    </div>
  )
}
