import type { LoginData, LoginFormSchema } from '../types/Login'

import axios from 'axios'
import { API_URL } from '@/@common/env'

export const loginService = (data: LoginFormSchema) => axios.post<LoginData>(`${API_URL}/auth/login`, data, {
  withCredentials: true
})
export const getUserById = (userId: string) => axios.get(`${API_URL}/users/${userId}`)
