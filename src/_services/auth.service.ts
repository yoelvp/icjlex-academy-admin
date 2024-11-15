import type { LoginResponse, RolesAndPermissionsResponse } from '@/_models/Auth.model'
import type { Response } from '@/@common/types/ResponseData'

import { axios } from '@/lib'
import { LoginFormSchema } from '@/@auth/types/Login'

export const loginService = (data: LoginFormSchema) => {
  return axios.post<Response<LoginResponse>>('/auth/login', data)
}

export const logoutService = () => {
  return axios.post<Response<boolean>>('/auth/logout')
}

export const getUserByIdService = (userId: string) => {
  return axios.get(`/users/${userId}`)
}

export const getRolesAndPermissionsByUserIdService = (userId: string) => {
  return axios.get<Response<RolesAndPermissionsResponse>>(`/users/roles-and-permissions/${userId}`)
}
