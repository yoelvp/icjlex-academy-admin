import { object, ref, string } from 'yup'

export const updateDataSchema = object({
  firstName: string().required('Campo requerido'),
  lastName: string().required('Campo requerido'),
  password: string().required('Campo requerido').min(8, 'Su contraseña debe tener al menos 6 dígitos'),
  confirmPassword: string()
    .required('Campo requerido')
    .min(8, 'Su contraseña debe tener al menos 6 dígitos')
    .oneOf([ref('password')], 'Debe ingresar la misma contraseña')
})
