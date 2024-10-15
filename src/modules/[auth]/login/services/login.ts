import type { LoginFormSchema } from '../types/Login'

import { axios } from '@/lib'
import { LoginData } from '../models/LoginData'

export const loginService = (data: LoginFormSchema) => axios.post<LoginData>('/auth/login', data)

export const getUserById = (userId: string) => axios.get(`/users/${userId}`)
