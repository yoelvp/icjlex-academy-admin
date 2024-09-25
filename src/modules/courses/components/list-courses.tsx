import { FC } from 'react'

import { Course } from '../types/Course'
import { IconDelete, IconEdit } from '@/assets/icons'
import { Badge } from '@/@common/components/badge'

interface CourseTableList {
  courses: Course[]
  toggleModal: () => void
}

export const ListCourses: FC<CourseTableList> = ({ courses, toggleModal }) => {
  return (
    <div className="rounded-xs overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-primary-100">
          <tr>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              N°
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Nombre
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Descripción
            </th>
            <th className="py-3 px-6 text-left font-bold text-primary-500">
              Estado
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
              <td className="py-3 px-6">{course.name}</td>
              <td className="py-3 px-6">{course.description}</td>
              <td className="py-3 px-6">
                <Badge status={course.isActive}></Badge>
              </td>
              <td className="py-3 px-6 ">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-6"
                  onClick={toggleModal}
                >
                  <IconEdit size={24} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <IconDelete size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
