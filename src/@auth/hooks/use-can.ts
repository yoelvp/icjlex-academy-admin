import { HttpStatusCode, isAxiosError } from "axios"
import { toast } from "sonner"
import { useLoading } from "@/@common/hooks/use-loading"
import getError from "@/@common/utils/get-errors"
import { PermissionName } from "../utils/permissions"
import { useCanStore } from "../store/use-can.store"
import { getPermissionByUserIdService } from "@/_services/permissions.service"
import { PermissionsByUserResponse } from "../types/Permission"

export const useCan = () => {
  const { isLoading, loading, loaded } = useLoading()
  const isAdmin = useCanStore((state) => state.isAdmin)
  const permissions = useCanStore((state) => state.permissions)

  const canPermission = (key: PermissionName | PermissionName[]) => {
    if (isAdmin) return true

    if (Array.isArray(key))
      return key.some((i) => Boolean(permissions?.[i]))

    return Boolean(permissions?.[key])
  }

  const handleChangeRole = async (roleId: string): Promise<PermissionsByUserResponse | undefined> => {
    try {
      loading()
      const { data, status } = await getPermissionByUserIdService(roleId)

      if (status === HttpStatusCode.Ok) {
        return data
      }
    } catch (error) {
      loaded()
      if (isAxiosError(error)) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    handleChangeRole,
    canPermission,
    permissions
  }
}
