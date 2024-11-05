import type { FC, ReactNode } from 'react'

import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/use-user.store'
import { useTokenStore } from '../store/use-token.store'
import { useCanStore } from '../store/use-can.store'

interface Props {
  children: ReactNode
}

export const CheckAuth: FC<Props> = ({
  children
}) => {
  const user = useUserStore((state) => state.user)
  const token = useTokenStore((state) => state.token)
  const isAdmin = useCanStore((state) => state.isAdmin)
  const role = useCanStore((state) => state.role)
  const permission = useCanStore((state) => state.permission)

  if (!user && !token) return <Navigate to="/auth/login" replace />
  if (
    !isAdmin
    || !role
    || !permission
  ) return <Navigate to="/" replace />

  return children
}
