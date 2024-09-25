import { object, string } from 'yup'

export const recoverPasswordSchema = object({
  email: string().email().typeError('Email incorrecto').required('Campo requerido')
})
