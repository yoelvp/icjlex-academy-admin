import { object, string } from 'yup'

export const loginSchema = object({
  email: string().email().required('Campo requerido'),
  password: string().required('Campo requerido')
})
