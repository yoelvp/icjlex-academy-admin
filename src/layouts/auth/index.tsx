import { Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <div className="h-screen w-full grid place-content-center px-4">
      <Outlet />
    </div>
  )
}
