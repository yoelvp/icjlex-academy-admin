import type { FC, ReactNode } from 'react'

import {  Navigate } from 'react-router-dom'
import { useUserStore } from '../store/use-user.store'
import { useTokenStore } from '../store/use-token.store'

interface Props {
  children: ReactNode
}

export const CheckAuth: FC<Props> = ({
  children
}) => {
  const user = useUserStore((state) => state.user)
  const token = useTokenStore((state) => state.token)

  if (!user || !token) return <Navigate to="/auth/login" replace />

  return children
}
