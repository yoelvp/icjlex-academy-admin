import { ButtonAction } from '@/@common/components/button-action'
import { Menu } from '@/@common/components/menu'
import { FC, useState } from 'react'
import {
  IconDelete,
  IconEdit,
  IconEyeOutline,
  IconOptions
} from '@/assets/icons'

interface Props {
  toggleModal: () => void
}

export const ListCourses: FC<Props> = ({ toggleModal }) => {
  const options = [
    {
      label: 'Ver detalles',
      icon: IconEyeOutline,
      onClick: () => console.log('Ver detalles')
    },
    {
      label: 'Actualizar',
      icon: IconEdit,
      onClick: toggleModal
    },
    {
      label: 'Eliminar',
      icon: IconDelete,
      onClick: () => console.log('Eliminar'),
      className: 'text-red-500 hover:bg-red-600'
    }
  ]
  const [courses] = useState([
    {
      id: '1',
      name: 'Introducción a React',
      objetive: 'Ana García',
      image: ''
    },
    {
      id: '2',
      name: 'Diseño UX Avanzado',
      objetive: 'Carlos Pérez',
      image: ''
    },
    {
      id: '3',
      name: 'JavaScript Moderno',
      objetive: 'Laura Martínez',
      image: ''
    },
    {
      id: '4',
      name: 'JavaScript Moderno',
      objetive: 'Laura Martínez',
      image: ''
    },
    {
      id: '5',
      name: 'JavaScript Moderno',
      objetive: 'Laura Martínez',
      image: ''
    },
    {
      id: '6',
      name: 'JavaScript Moderno',
      objetive: 'Laura Martínez',
      image: ''
    }
  ])

  return (
    <div className="rounded-xs overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-primary-100">
          <tr>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              N°
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Imagen
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Nombre
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Objetivo
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-gray-200">
              <td className="py-3 px-6">{course.id}</td>
              <td className="py-3 px-6">
                <img
                  src={course.image || '/placeholder-image.png'}
                  alt={`${course.name}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
              <td className="py-3 px-6">{course.name}</td>
              <td className="py-3 px-6">{course.objetive}</td>
              <td className="py-3 px-6 ">
                <Menu variant={'white'} activator={<IconOptions />} size="xs">
                  <div className="flex-col-start px-4 py-2| w-auto gap-2">
                    {options.map(
                      ({ label, icon, onClick, className }, index) => (
                        <ButtonAction
                          key={index}
                          label={label}
                          icon={icon}
                          onClick={onClick}
                          className={className}
                        />
                      )
                    )}
                  </div>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
