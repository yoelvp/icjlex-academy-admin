import { object, string } from 'yup'

export const contactSchema = object({
  name: string().required('Campo requerido'),
  email: string().required('Campo requerido').email(),
  cellphone: string().required('Campo requerido').matches(/^\d{9}$/, 'Debe tener 9 dígitos'),
  message: string().required('Campo requerido')
})
