import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { ClientLayout } from '@/layouts/client'
import { AdminLayout } from '@/layouts/admin'

import HomePage from '@/modules/[client]/home/views'
import TeachersPage from '@/modules/[client]/teachers/views'
import TeacherDetailsPage from '@/modules/[client]/teachers/views/(slug)'
import UsPage from '@/modules/[client]/us/views'
import ChangePasswordPage from '@/modules/[auth]/change-password/views'
import ForgotPasswordPage from '@/modules/[auth]/forgot-password/views'
import RecoveryConfirmationPage from '@/modules/[auth]/forgot-password/views/recovery-confirmation'
import LoginPage from '@/modules/[auth]/login/views'
import CoursesPage from '@/modules/[client]/courses/views'
import CourseDetailsPage from '@/modules/[client]/courses/views/(slug)'
import { CheckAuth } from '@/@auth/components/check-auth'

import {
  CoursesAdminPage,
  DashboardPage,
  TeachersAdminPage,
  StudentsPage
} from './admin.routes'
import CollaboratorDetailsPage from '@/modules/[client]/us/views/(slug)'
import UpdateDataPage from '@/modules/[user]/update-data/views'

const routes = createBrowserRouter([
  // Client pages
  {
    element: <ClientLayout />,
    errorElement: <div>error</div>,
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
        path: '/us/:slug',
        element: <CollaboratorDetailsPage />
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
        path: '/courses/:id',
        element: <CourseDetailsPage />
      }
    ]
  },
  // User routes
  {
    path: '/user',
    element: <ClientLayout />,
    children: [
      {
        path: 'update-data',
        element: <UpdateDataPage />
      },
      {
        path: 'courses',
        element: <UpdateDataPage />
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
        element: <DashboardPage />
      },
      {
        path: 'courses',
        element: <CoursesAdminPage />
      },
      {
        path: 'teachers',
        element: <TeachersAdminPage />
      },
      {
        path: 'students',
        element: <StudentsPage />
      }
    ]
  }
])

export default routes
