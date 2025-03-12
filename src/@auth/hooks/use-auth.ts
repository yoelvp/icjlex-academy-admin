import { useNavigate } from "react-router"
import { toast } from "sonner"
import { AxiosError, HttpStatusCode } from "axios"
import { useTokenStore } from "@/@auth/store/use-token.store"
import { useUserStore } from "@/@auth/store/use-user.store"
import { useLoading } from "@/@common/hooks/use-loading"
import getError from "@/@common/utils/get-errors"
import { useCanStore } from "@/@auth/store/use-can.store"
import { LoginFormSchema } from "@/_models/Auth.model"
import {
  loginService,
  logoutService
} from "@/_services/auth.service"
import { getUserByIdService, getRolesAndPermissionsByUserIdService } from "@/_services/users.service"

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

      console.log({ userId, token })

      if (!token) return logout()

      setToken(token)

      const { data: { data: userData }, status } = await getUserByIdService(userId ?? "")
      const { data: { data: { roles, permissions } }, status: roleStatus } = await getRolesAndPermissionsByUserIdService(userId ?? "")

      if (status === HttpStatusCode.Ok && roleStatus === HttpStatusCode.Ok) {
        setUser(userData)
        setInitialCan({
          isAdmin: true,
          roles: roles,
          permissions: permissions
        })
        navigate("/admin")
      }
    } catch (error) {
      loaded()
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  const logout = async () => {
    loading()
    try {
      const { data: { data, message }, status } = await logoutService()

      if (data && status === HttpStatusCode.Ok) {
        setToken(null)
        setRefreshToken(null)
        setUser(null)
        setInitialCan({
          isAdmin: false,
          permissions: null,
          roles: null
        })

        toast.error(message)
        navigate("/auth/login")
      }
    } catch (error) {
      loaded()
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
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
