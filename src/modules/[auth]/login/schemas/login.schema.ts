import { object, string } from 'yup'

export const loginFormSchema = object({
  email: string().required('El campo es requerido').email('Ingrese un email válido').trim(),
  password: string().required('La contraseña es requerida').trim()
})
