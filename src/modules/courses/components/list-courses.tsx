import { FC } from 'react'

interface Props {
  toggleModal: () => void
}

export const ListCourses: FC<Props> = ({ toggleModal }) => {
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
          <tr className="border-b border-gray-200">
            <td className="py-3 px-6">Course 1</td>
            <td className="py-3 px-6">
              <img
                src={'/placeholder-image.png'}
                alt=""
                className="w-16 h-16 object-cover rounded-full"
              />
            </td>
            <td className="py-3 px-6">Poo</td>
            <td className="py-3 px-6">Programacion Orienetada a Objetos</td>
            <td className="py-3 px-6 ">
              <button onClick={toggleModal}>Editar</button>
            </td>
          </tr>
          {/* {courses.map((course) => (
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
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  )
}
