import type { LoginData } from '@/modules/[auth]/login/models/LoginData'
import type { LoginFormSchema } from '@/modules/[auth]/login/types/Login'

import { axios } from '@/lib'

export const loginService = (data: LoginFormSchema) => {
  return axios.post<LoginData>('/auth/login', data)
}

export const getUserByIdService = (userId: string) => {
  return axios.get(`/users/${userId}`)
}

export const getRolesByUserIdService = (userId: string) => {
  return axios.get(`/roles/user/${userId}`)
}

export const getPermissionByRoleIdService = (roleId: string) => {
  return axios.get(`/roles/permissions/${roleId}`)
}
