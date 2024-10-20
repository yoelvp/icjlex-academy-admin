import { object, string } from 'yup'

export const studentPreRegistrationSchema = object({
  email: string()
    .required('Campo requerido')
    .email('Ingrese un correo electrónico válido'),
  phone: string()
    .required('Campo requerido')
    .min(6, 'Debe tener al menos 6 carácteres')
})
