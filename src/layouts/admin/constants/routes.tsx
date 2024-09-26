import type { Options } from '../types/AdminRoutes'

import {
  IconCategory,
  IconCourse,
  IconHome,
  IconStudent,
  IconTag,
  IconTeacher
} from '@/assets/icons'

export const ADMIN_ROUTES: Options[] = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: IconHome
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
    name: 'Categorias',
    path: '/admin/categories',
    icon: IconCategory
  },
  {
    name: 'Tags',
    path: '/admin/tags',
    icon: IconTag
  },
  {
    name: 'Opciones',
    icon: IconTag,
    subOptions: [
      {
        name: 'Opcion 01',
        path: '/admin/options/1'
      },
      {
        name: 'Opcion 02',
        path: '/admin/options/2'
      }
    ]
  }
] as const
