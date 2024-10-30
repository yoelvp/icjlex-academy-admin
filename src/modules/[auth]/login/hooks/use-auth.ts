import type { LoginFormSchema } from '../types/Login'

import { useNavigate } from 'react-router-dom'
import { jwtVerify } from 'jose'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { HttpStatusCode } from 'axios'
import { useTokenStore } from '@/@auth/store/use-token.store'
import { useUserStore } from '@/@auth/store/use-user.store'
import { JWT_SECRET_KEY } from '@/@common/env'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { CookieKeys } from '../utils'
import { getRolesByUserIdService, getUserByIdService, loginService } from '@/_services/auth.service'
import { mapperRoles } from '../utils/roles-mapper'
import { useCan } from '@/@auth/hooks/use-can'
import { useCanStore } from '@/@auth/store/use-can.store'

export const useAuth = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()
  const { handleChangeRole } = useCan()
  const setToken = useTokenStore((state) => state.setToken)
  const setUser = useUserStore((state) => state.setUser)
  const setInitialCan = useCanStore((state) => state.setInitialCan)

  const login = async (data: LoginFormSchema) => {
    try {
      loading()
      const { data: loginData } = await loginService(data)
      const accessToken = loginData.access
      const refreshToken = loginData.refresh

      if (!accessToken.token) return logout()

      setToken(accessToken.token)
      Cookies.set(CookieKeys.TOKEN, accessToken.token, { expires: new Date(accessToken.expires), secure: true })
      Cookies.set(CookieKeys.REFRESH_TOKEN, refreshToken.token, { expires: new Date(refreshToken.expires) })

      const { payload: { sub: userId } } = await jwtVerify(accessToken.token, new TextEncoder().encode(JWT_SECRET_KEY))
      const { data: userData, status } = await getUserByIdService(userId ?? '')
      const { data: rolesData, status: rolStatus } = await getRolesByUserIdService(userId ?? '')
      const roles = mapperRoles(rolesData)
      await handleChangeRole(roles.id)

      if (status === HttpStatusCode.Ok) {
        setUser(userData)
        navigate('/admin')
      }

      if (rolStatus === HttpStatusCode.Ok) {
        // if (roles.roles.length) {
        //   navigate('/admin/courses')
        // } else {
        //   navigate('/')
        // }
      }

      setInitialCan({
        isAdmin: true,
        permission: null,
        permissions: ['list_courses'],
        role: 'student',
        roles: null
      })
    } catch (error) {
      const { message } = getError(error)
      toast.error(message)
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
