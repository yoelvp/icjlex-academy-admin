import { Response } from '@/@common/types/Response'
import { LoginData, LoginResponse } from '@/_models/Auth.model'
import { axios } from '@/lib'

export const loginService = (data: LoginData) => {
  return axios.post<Response<LoginResponse>>('/auth/admin/login', data)
}

export const logoutService = () => {
  return axios.post('/auth/admin/logout')
}
