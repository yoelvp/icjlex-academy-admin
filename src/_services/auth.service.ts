import type { LoginResponse, RolesAndPermissionsResponse } from '@/_models/Auth.model'
import type { Response } from '@/@common/types/ResponseData'

import { axios } from '@/lib'
import { LoginFormSchema } from '@/@auth/types/Login'

export const loginService = (data: LoginFormSchema) => {
  return axios.post<Response<LoginResponse>>('/admin/auth/login', data)
}

export const logoutService = () => {
  return axios.post<Response<boolean>>('/admin/auth/logout')
}

export const getUserByIdService = (userId: string) => {
  return axios.get(`/admin/users/${userId}`)
}

export const getRolesAndPermissionsByUserIdService = (userId: string) => {
  return axios.get<Response<RolesAndPermissionsResponse>>(`/admin/users/roles-and-permissions/${userId}`)
}
