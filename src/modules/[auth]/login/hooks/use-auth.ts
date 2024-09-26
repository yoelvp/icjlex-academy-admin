import type { LoginFormSchema } from '../types/Login'

import { useNavigate } from 'react-router-dom'
import { jwtVerify } from 'jose'
import { getUserById, loginService } from '../services/login'
import { useTokenStore } from '@/@auth/store/use-token.store'
import { useUserStore } from '@/@auth/store/use-user.store'
import { JWT_SECRET_KEY } from '@/@common/env'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'

export const useAuth = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()
  const setToken = useTokenStore((state) => state.setToken)
  const setUser = useUserStore((state) => state.setUser)

  const login = async (data: LoginFormSchema) => {
    try {
      loading()
      const { data: loginData } = await loginService(data)
      const accessToken = loginData.access.token

      if (!accessToken) return logout()

      setToken(accessToken)

      const { payload: { sub: userId } } = await jwtVerify(loginData.access.token, new TextEncoder().encode(JWT_SECRET_KEY))
      const { data: userData } = await getUserById(userId ?? '')

      setUser(userData)
      navigate('/admin')
    } catch (error: any) {
      const { message } = getError(error)
      console.error(error)
      console.warn(message)
    } finally {
      loaded()
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
    navigate('/')
  }

  return {
    isLoading,
    login,
    logout
  }
}
