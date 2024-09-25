import { object, string } from 'yup'

export const changePasswordSchema = object({
  password: string().required('Campo requerido'),
  repeatPassword: string().required('Campo requerido')
})
