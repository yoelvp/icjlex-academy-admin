import type { FC } from 'react'

import { Link } from 'react-router-dom'
import classNames from 'classnames'
import {
  IconCategory,
  IconClose,
  IconCourse,
  IconStudent,
  IconTag,
  IconTeacher
} from '@/assets/icons'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={classNames(
        'fixed inset-y-0 left-0 bg-black/30 text-white w-full sm:w-64 sm:relative sm:translate-x-0 transform transition-transform duration-300 ease-in-out',
        {
          '-translate-x-full': !isOpen
        }
      )}
    >
      <nav className="mt-16 w-64 bg-primary-500 h-full">
        <Link
          to="/admin/courses"
          className="flex-start gap-2 py-2.5 px-4 transition duration-200 hover:bg-primary-400 hover:text-primary-50"
        >
          <IconCourse size={24} />
          <span>Cursos</span>
        </Link>
        <Link
          to="#"
          className="flex-start gap-2 py-2.5 px-4 transition duration-200 hover:bg-primary-400 hover:text-primary-50"
        >
          <IconTeacher size={24} />
          <span>Docentes</span>
        </Link>
        <Link
          to="#"
          className="flex-start gap-2 py-2.5 px-4 transition duration-200 hover:bg-primary-400 hover:text-primary-50"
        >
          <IconStudent size={24} />
          <span>Estudiantes</span>
        </Link>
        <Link
          to="#"
          className="flex-start gap-2 py-2.5 px-4 transition duration-200 hover:bg-primary-400 hover:text-primary-50"
        >
          <IconCategory size={24} />
          <span>Categorías</span>
        </Link>
        <Link
          to="#"
          className="flex-start gap-2 py-2.5 px-4 transition duration-200 hover:bg-primary-400 hover:text-primary-50"
        >
          <IconTag size={24} />
          <span>Tags</span>
        </Link>
      </nav>
      <div className="absolute w-64 top-0 left-0 h-16 sm:w-full p-2 bg-primary-700">
        <img
          src="/logo-white.svg"
          alt="Logo"
          className="w-auto object-cover object-center h-full"
        />
        <button
          onClick={toggleSidebar}
          className="sm:hidden absolute rounded-sm top-0 right-0 p-2 h-auto text-white hover:border-primary-400 hover:border"
        >
          <IconClose size={18} className="" />
        </button>
      </div>
    </aside>
  )
}
