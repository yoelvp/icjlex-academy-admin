import { axios } from '@/lib'
import { type PermissionsByUserResponse } from '@/@auth/types/Permission'

export const getPermissionByUserIdService = (roleId: string) => {
  return axios.get<PermissionsByUserResponse>(`/roles/permissions/${roleId}`)
}
