import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '@/layouts/auth'
import { AdminLayout } from '@/layouts/admin'

import ChangePasswordPage from '@/modules/[auth]/change-password/views'
import ForgotPasswordPage from '@/modules/[auth]/forgot-password/views'
import RecoveryConfirmationPage from '@/modules/[auth]/forgot-password/views/recovery-confirmation'
import LoginPage from '@/modules/[auth]/login/views'
import { CheckAuth } from '@/@auth/components/check-auth'

import {
  CoursesAdminPage,
  CourseDetailsAdminPage,
  DashboardPage,
  TeachersAdminPage,
  StudentsPage,
  CoursesCreatePage,
  CoursesUpdatePage,
  CreateTeachersAdminPage,
  UpdateTeachersAdminPage
} from './admin.routes'

const routes = createBrowserRouter([
  // Authentication pages
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
      },
      {
        path: 'recovery-confirmation',
        element: <RecoveryConfirmationPage />
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />
      }
    ]
  },
  // Admin routes
  {
    path: '/admin',
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <CheckAuth>
          <AdminLayout />
        </CheckAuth>
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <DashboardPage />
        )
      },
      {
        path: 'courses',
        element: <CoursesAdminPage />
      },
      {
        path: 'courses/create',
        element: <CoursesCreatePage />
      },
      {
        path: 'courses/update/:id',
        element: <CoursesUpdatePage />
      },
      {
        path: 'courses/:id',
        element: <CourseDetailsAdminPage />
      },
      {
        path: 'teachers',
        element: (
          <Suspense fallback={<div>Loading page</div>}>
            <TeachersAdminPage />
          </Suspense>
        )
      },
      {
        path: 'teachers/create',
        element: <CreateTeachersAdminPage />
      },
      {
        path: 'teachers/update/:slug/:teacherId',
        element: <UpdateTeachersAdminPage />
      },
      {
        path: 'students',
        element: <StudentsPage />
      }
    ]
  }
])

export default routes
