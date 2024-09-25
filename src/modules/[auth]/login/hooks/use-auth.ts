import type { LoginFormSchema } from '../types/Login'

import { loginService } from '../services/login'

export const useAuth = () => {
  const login = async (data: LoginFormSchema) => {
    try {
      const response = await loginService(data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    login
  }
}
