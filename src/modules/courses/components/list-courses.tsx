import { FC } from 'react'

import { ButtonAction } from '@/@common/components/button-action'
import { Menu } from '@/@common/components/menu'
import {
  IconDelete,
  IconEdit,
  IconEyeOutline,
  IconOptions
} from '@/assets/icons'
import { UseCourseStore } from '../store/course.store'
import { useCourses } from '../hooks/use-course'
import { usePagination } from '@/@common/hooks/use-pagination'
import { Badge } from '@/@common/components/badge'
import { TableLoading } from '@/@common/components/table-loading'
import { Pagination } from '@/@common/components/pagination'

interface Props {
  toggleModal: () => void
}

export const ListCourses: FC<Props> = ({ toggleModal }) => {
  const courses = UseCourseStore((state) => state.courses)
  const { page, nextPage, size, prevPage } = usePagination()
  const { isLoading } = useCourses(page, size)
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

  const totalItems = 100

  return (
    <div className="rounded-xs overflow-x-auto">
      <table className="custom-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Imagen</th>
            <th>Nombre del curso</th>
            <th>Docente</th>
            <th>Duración</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TableLoading numCols={6} isLoading={isLoading} />

          {!isLoading &&
            courses?.map((course) => (
              <tr key={course.id} className="border-b border-gray-200">
                <td>{course.id}</td>
                <td
                  className="
                w-auto"
                >
                  <div className="w-64">
                    <img
                      src={course.imageUrl || '/placeholder-image.png'}
                      alt={`${course.name}`}
                      className="w-full h-20 object-cover rounded-xs object-center"
                    />
                  </div>
                </td>
                <td className="max-w-sm">{course.name}</td>
                <td className="w-[15%]">Midu dev</td>
                <td>
                  <Badge status={course.isActive ?? false}></Badge>
                </td>
                <td>
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
      <Pagination
        containerClassName="py-8"
        page={page}
        size={size}
        totalItems={totalItems}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  )
}
