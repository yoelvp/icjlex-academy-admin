import { boolean, object, string } from 'yup'

export const courseSchema = object({
  id: string().optional(),
  name: string().required('Este es un campo requerido'),
  description: string().required('Este es un campo requerido'),
  isActive: boolean().required('Este es un campo rquerido')
})
