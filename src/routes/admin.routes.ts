import { lazy } from 'react'

export const DashboardPage = lazy(() => import('@/modules/dashboard/views'))
export const CoursesAdminPage = lazy(() => import('@/modules/courses/views'))
export const StudentsPage = lazy(() => import('@/modules/students/views'))
export const TeachersAdminPage = lazy(() => import('@/modules/teachers/views'))
