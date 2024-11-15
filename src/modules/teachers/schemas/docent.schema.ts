import { array, mixed, object, string } from 'yup'

export const docentSchema = object({
  firstName: string().required('El nombre es obligatorio.'),
  lastName: string().required('El apellido es obligatorio.'),
  specialties: array()
    .of(object({
      label: string(),
      value: string()
    }))
    .optional()
    .min(1, 'Ingrese al menos una especialidad'),
  profession: string().required('La profesión es obligatoria.'),
  about: string().required('El campo "Acerca de mí" es obligatorio.'),
  image: mixed().required('Campo requerido'),
  socialMedia: array().of(string().url('Ingrese una URL válida'))
})
