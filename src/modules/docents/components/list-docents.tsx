import { FC } from 'react'

import {
  IconDelete,
  IconEdit,
  IconFacebook,
  IconLinkedin,
  IconWhatsapp,
  IconX,
  IconYoutube
} from '@/assets/icons'
import { DocentResult } from '../types/Docent'

interface CourseTableList {
  docents: DocentResult[]
  toggleModal: () => void
}

export const ListDocents: FC<CourseTableList> = ({ docents, toggleModal }) => {
  return (
    <div className="rounded-xs overflow-x-auto">
      <table className="table-auto bg-white ">
        <thead className="bg-primary-100">
          <tr>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Imagen
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Nombre
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Apellido
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Especialidades
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Profesion
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Sobre mí
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Redes Sociales
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {docents.map((docent) => (
            <tr key={docent.id} className="border-b border-gray-200">
              <td className="py-3 px-6">
                <img
                  src={docent.imageUrl || '/placeholder-image.png'}
                  alt={`${docent.firstName} ${docent.lastName}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
              <td className="py-3 px-6">{docent.firstName}</td>
              <td className="py-3 px-6">{docent.lastName}</td>
              <td className="py-3 px-6 flex flex-wrap gap-2 max-w-md">
                {docent.docentToSpecialty.map((specialty, index) => (
                  <span
                    className="py-1 px-2 bg-primary-100 rounded-xs"
                    key={index}
                  >
                    {specialty.specialtyName}
                  </span>
                ))}
              </td>
              <td className="py-3 px-6">{docent.profession}</td>
              <td className="py-3 px-6 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                {docent.aboutMe}
              </td>

              <td className="py-3 px-6">
                {typeof docent.socialMedia === 'object' &&
                docent.socialMedia !== null ? (
                    <div className="flex space-x-2">
                      {docent.socialMedia.whatsapp &&
                      docent.socialMedia.whatsapp.startsWith('http') && (
                        <a
                          href={docent.socialMedia.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconWhatsapp size={18} className="text-green-600" />
                        </a>
                      )}
                      {docent.socialMedia.x &&
                      docent.socialMedia.x.startsWith('http') && (
                        <a
                          href={docent.socialMedia.x}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconX size={18} />
                        </a>
                      )}
                      {docent.socialMedia.facebook &&
                      docent.socialMedia.facebook.startsWith('http') && (
                        <a
                          href={docent.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconFacebook size={18} className="text-blue-600" />
                        </a>
                      )}
                      {docent.socialMedia.linkedin &&
                      docent.socialMedia.linkedin.startsWith('http') && (
                        <a
                          href={docent.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconLinkedin size={18} className="text-blue-800" />
                        </a>
                      )}
                      {docent.socialMedia.youtube &&
                      docent.socialMedia.youtube.startsWith('http') && (
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

              <td className="py-3 px-6">
                <div className=" flex-between">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-6"
                    onClick={toggleModal}
                  >
                    <IconEdit size={24} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <IconDelete size={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
