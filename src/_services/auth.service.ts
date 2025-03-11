import { Response } from '@/@common/types/Response'
import { LoginData, LoginResponse } from '@/_models/Auth.model'
import { axios } from '@/lib'

export const loginService = (data: LoginData) => {
  return axios.post<Response<LoginResponse>>('/admin/auth/login', data)
}

export const logoutService = () => {
  return axios.post('/admin/auth/logout')
}

export const getRolesAndPermissionsByUserIdService = (userId: string) => {
  return axios.get(`/admin/roles/role-and-permission/${userId}`)
}
