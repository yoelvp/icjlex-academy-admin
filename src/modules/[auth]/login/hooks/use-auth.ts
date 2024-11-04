import type { LoginFormSchema } from '../types/Login'

import { useNavigate } from 'react-router-dom'
import { jwtVerify } from 'jose'
import { toast } from 'sonner'
import { HttpStatusCode } from 'axios'
import { useTokenStore } from '@/@auth/store/use-token.store'
import { useUserStore } from '@/@auth/store/use-user.store'
import { JWT_SECRET_KEY } from '@/@common/env'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { getRolesByUserIdService, getUserByIdService, loginService } from '@/_services/auth.service'
import { mapperRoles } from '../utils/roles-mapper'
import { useCan } from '@/@auth/hooks/use-can'
import { useCanStore } from '@/@auth/store/use-can.store'

export const useAuth = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()
  const { handleChangeRole } = useCan()
  const setToken = useTokenStore((state) => state.setToken)
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken)
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
      setRefreshToken(refreshToken.token)

      const { payload: { sub: userId } } = await jwtVerify(accessToken.token, new TextEncoder().encode(JWT_SECRET_KEY))
      const { data: userData, status } = await getUserByIdService(userId ?? '')
      const { data: rolesData, status: rolStatus } = await getRolesByUserIdService(userId ?? '')
      const permissions = await handleChangeRole(userId ?? '')
      const roles = mapperRoles(rolesData)

      console.log({ permissions, roles })

      if (status === HttpStatusCode.Ok) {
        setUser(userData)
        navigate('/admin')
      }

      if (rolStatus === HttpStatusCode.Ok) {
        if (roles?.roles?.length &&
          (roles?.roles?.includes('ADMIN') ||
          roles?.roles?.includes('SUBMANAGER'))
        ) {
          navigate('/admin/courses')
        } else {
          navigate('/')
        }
      }

      const userPermission = (permissions?.permissions.length ?? 0) === 1 ? permissions?.permissions[0] : null
      const userPermissions = (permissions?.permissions.length ?? 0) > 1 ? permissions?.permissions : null
      const userRole= (roles?.roles?.length ?? 0) === 1 ? roles?.roles?.[0] : null
      const userRoles = (roles?.roles?.length ?? 0) > 1 ? roles?.roles : null

      setInitialCan({
        isAdmin: (roles.roles?.includes('ADMIN') || roles.roles?.includes('SUBMANAGER')) ? true : false,
        permission: userPermission!,
        permissions: userPermissions!,
        role: userRole!,
        roles: userRoles!
      })
    } catch (error) {
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  const logout = () => {
    setToken(null)
    setRefreshToken(null)
    setUser(null)
    setInitialCan({
      isAdmin: false,
      permission: null,
      permissions: null,
      role: null,
      roles: null
    })
    navigate('/')
  }

  return {
    isLoading,
    login,
    logout
  }
}
