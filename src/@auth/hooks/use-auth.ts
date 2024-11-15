import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { HttpStatusCode } from 'axios'
import { useTokenStore } from '@/@auth/store/use-token.store'
import { useUserStore } from '@/@auth/store/use-user.store'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { useCanStore } from '@/@auth/store/use-can.store'
import { ROLES } from '@/@auth/utils/roles'
import { LoginFormSchema } from '../types/Login'
import {
  getRolesAndPermissionsByUserIdService,
  loginService,
  logoutService
} from '@/_services/auth.service'
import { getUserByIdService } from '@/_services/users-client.service'

export const useAuth = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()
  const setToken = useTokenStore((state) => state.setToken)
  const setRefreshToken = useTokenStore((state) => state.setRefreshToken)
  const setUser = useUserStore((state) => state.setUser)
  const setInitialCan = useCanStore((state) => state.setInitialCan)

  const login = async (data: LoginFormSchema) => {
    try {
      loading()
      const { data: loginData } = await loginService(data)
      const { data: { userId, token } } = loginData

      if (!token) return logout()

      setToken(token)

      const { data: userData, status } = await getUserByIdService(userId ?? '')
      const { data: { data: { roles, permissions } }, status: rolStatus } = await getRolesAndPermissionsByUserIdService(userId ?? '')

      if (status === HttpStatusCode.Ok) {
        setUser(userData)
        navigate('/admin')
      }

      if (rolStatus === HttpStatusCode.Ok) {
        if (roles?.length && roles?.includes(ROLES.ADMIN)) {
          navigate('/admin/courses')
        } else {
          navigate('/')
        }
      }

      setInitialCan({
        isAdmin: !roles?.includes(ROLES.STUDENT) ? true : false,
        roles: roles,
        permissions: permissions
      })
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  const logout = async () => {
    loading()
    try {
      const { data: { data, message } } = await logoutService()

      if (data) {
        setToken(null)
        setRefreshToken(null)
        setUser(null)
        setInitialCan({
          isAdmin: false,
          permissions: null,
          roles: null
        })

        toast.error(message)
        navigate('/')
      }
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    login,
    logout
  }
}
