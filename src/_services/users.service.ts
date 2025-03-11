import { Response } from '@/@common/types/Response'
import { RolesAndPermissionsResponse } from '@/_models/Auth.model'
import { axios } from '@/lib'

export const getUserByIdService = (userId: string) => {
  return axios.get(`/admin/users/${userId}`)
}

export const getRolesAndPermissionsByUserIdService = (userId: string) => {
  return axios.get<Response<RolesAndPermissionsResponse>>(`/admin/users/roles-and-permissions/${userId}`)
}
