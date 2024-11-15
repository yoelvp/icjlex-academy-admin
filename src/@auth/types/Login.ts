import { InferType } from 'yup'
import { loginFormSchema } from '../schemas/login.schema'

export type LoginFormSchema = InferType<typeof loginFormSchema>
