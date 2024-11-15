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
      const { data: { data: { token, userId } } } = await loginService(data)

      if (!token && !userId) {
        toast.info('No se pudo autenticar, recargue la paǵina e intente nuevamente')

        return
      }

      setToken(token)

      const { data: { data: userData, success }, status } = await getUserByIdService(userId ?? '')
      const {
        data: {
          data: {
            roles,
            permissions
          },
          success: roleSuccess
        },
        status: rolStatus
      } = await getRolesAndPermissionsByUserIdService(userId ?? '')

      if (status === HttpStatusCode.Ok && success) {
        setUser(userData)
      }
      console.log(roles, permissions)

      if (rolStatus === HttpStatusCode.Ok && roleSuccess) {
        if (roles?.length > 0 && roles?.includes(ROLES.ADMIN)) {
          navigate('/admin/courses')
        } else {
          navigate('/')
        }

        setInitialCan({
          isAdmin: !roles?.includes(ROLES.STUDENT) ? true : false,
          roles: roles,
          permissions: permissions
        })
      }
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

        toast.info(message)
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
