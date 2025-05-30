import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router"

import { AuthLayout } from "@/layouts/auth"
import { AdminLayout } from "@/layouts/admin"

import ChangePasswordPage from "@/@auth/views/change-password"
import ForgotPasswordPage from "@/@auth/views/forgot-password"
import RecoveryConfirmationPage from "@/@auth/views/recovery-confirmation"
import LoginPage from "@/@auth/views/login"
import { CheckAuth } from "@/@auth/components/check-auth"

const DashboardPage = lazy(() => import("@/modules/dashboard/views"))

const CoursesAdminPage = lazy(() => import("@/modules/courses/views"))
const CoursesCreatePage = lazy(() => import("@/modules/courses/views/create"))
const CoursesUpdatePage = lazy(() => import("@/modules/courses/views/update"))
const CourseDetailsAdminPage = lazy(() => import("@/modules/courses/views/details"))

const StudentsPage = lazy(() => import("@/modules/students/views"))

const TeachersAdminPage = lazy(() => import("@/modules/teachers/views"))
const CreateTeachersAdminPage = lazy(() => import("@/modules/teachers/views/create"))
const UpdateTeachersAdminPage = lazy(() => import("@/modules/teachers/views/update"))

const PaymentsPage = lazy(() => import("@/modules/payments/views"))

export const routes = createBrowserRouter([
  // Authentication pages
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />
      },
      {
        path: "recovery-confirmation",
        element: <RecoveryConfirmationPage />
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />
      }
    ]
  },
  // Admin routes
  {
    path: "/admin",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <CheckAuth>
          <AdminLayout />
        </CheckAuth>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <DashboardPage />
        )
      },
      {
        path: "courses",
        element: <CoursesAdminPage />
      },
      {
        path: "courses/create",
        element: <CoursesCreatePage />
      },
      {
        path: "courses/update/:id",
        element: <CoursesUpdatePage />
      },
      {
        path: "courses/:id",
        element: <CourseDetailsAdminPage />
      },
      {
        path: "teachers",
        element: (
          <Suspense fallback={<div>Loading page</div>}>
            <TeachersAdminPage />
          </Suspense>
        )
      },
      {
        path: "teachers/create",
        element: <CreateTeachersAdminPage />
      },
      {
        path: "teachers/update/:slug/:teacherId",
        element: <UpdateTeachersAdminPage />
      },
      {
        path: "students",
        element: <StudentsPage />
      },
      {
        path: "payments",
        element: <PaymentsPage />
      }
    ]
  }
])
