import { createBrowserRouter } from 'react-router-dom'

import { ClientLayout } from '@/layouts/client'
import { AdminLayout } from '@/layouts/admin'

import ChangePasswordPage from '@/modules/[auth]/change-password/views'
import ForgotPasswordPage from '@/modules/[auth]/forgot-password/views'
import RecoveryConfirmationPage from '@/modules/[auth]/forgot-password/views/recovery-confirmation'
import LoginPage from '@/modules/[auth]/login/views'
import CoursesPage from '@/modules/[client]/courses/views'
import CourseDetailsPage from '@/modules/[client]/courses/views/(slug)'
import HomePage from '@/modules/[client]/home/views'
import TeachersPage from '@/modules/[client]/teachers/views'
import TeacherDetailsPage from '@/modules/[client]/teachers/views/(slug)'
import UsPage from '@/modules/[client]/us/views'

import DashboardPage from '@/modules/dashboard/views'
import CoursesAdminPage from '@/modules/courses/views'

const routes = createBrowserRouter([
  // Client pages
  {
    element: <ClientLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/us',
        element: <UsPage />
      },
      {
        path: '/teachers',
        element: <TeachersPage />
      },
      {
        path: '/teachers/:slug',
        element: <TeacherDetailsPage />
      },
      {
        path: '/courses',
        element: <CoursesPage />
      },
      {
        path: '/courses/:slug',
        element: <CourseDetailsPage />
      }
    ]
  },
  // Authentication pages
  {
    path: '/auth',
    element: <ClientLayout />,
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
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'courses',
        element: <CoursesAdminPage />
      }
    ]
  }
])

export default routes
