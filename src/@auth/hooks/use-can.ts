import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { getPermissionByRoleIdService } from '@/_services/auth.service'
import { PermissionName } from '../utils/permissions'
import { useCanStore } from '../store/use-can.store'

export const useCan = () => {
  const { isLoading, loading, loaded } = useLoading()
  const isAdmin = useCanStore((state) => state.isAdmin)
  const permissions = useCanStore((state) => state.permissions)

  const canPermission = (key: PermissionName | PermissionName[]) => {
    if(isAdmin) return true

    if(Array.isArray(key))
      return key.some((i) => Boolean(permissions?.[i]))

    return Boolean(permissions?.[key])
  }

  const handleChangeRole = async (roleId: string) => {
    try {
      loading()
      const { data, status } = await getPermissionByRoleIdService(roleId)

      if (status === HttpStatusCode.Ok) {
        console.log(data)
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
    handleChangeRole,
    canPermission,
    permissions
  }
}
