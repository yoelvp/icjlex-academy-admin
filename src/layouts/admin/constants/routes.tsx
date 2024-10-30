import type { Options } from '../types/AdminRoutes'

import {
  IconCategory,
  IconCourse,
  IconHome,
  IconMailbox,
  IconPerson,
  IconStudent,
  IconTag,
  IconTeacher
} from '@/assets/icons'

export const ADMIN_ROUTES: Options[] = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: IconHome,
    disabled: true
  },
  {
    name: 'Cursos',
    path: '/admin/courses',
    icon: IconCourse
  },
  {
    name: 'Docentes',
    path: '/admin/teachers',
    icon: IconTeacher
  },
  {
    name: 'Estudiantes',
    path: '/admin/students',
    icon: IconStudent
  },
  {
    name: 'Contacto',
    path: '/admin/contact',
    icon: IconMailbox,
    disabled: true
  },
  {
    name: 'Categorias',
    path: '/admin/categories',
    icon: IconCategory,
    disabled: true
  },
  {
    name: 'Tags',
    path: '/admin/tags',
    icon: IconTag,
    disabled: true
  },
  {
    name: 'Administración',
    icon: IconPerson,
    disabled: true,
    subOptions: [
      {
        name: 'Usuarios',
        path: '/admin/users'
      }
    ]
  }
] as const
