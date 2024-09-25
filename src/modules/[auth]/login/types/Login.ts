import { z } from 'zod'
import { loginFormSchema } from '../schemas/login.schema'

export type LoginFormSchema = z.infer<typeof loginFormSchema>

export interface LoginData {
  access: {
    token: string
    expires: string
  }
  refresh: {
    token: string
    expire: string
  }
}
