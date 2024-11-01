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
  socialMedia:
  object().shape({
    linkedin: string().nullable().optional().default('https://linkedin.com/in/'),
    youtube: string().nullable().optional(),
    facebook: string().nullable().optional(),
    x: string().nullable().optional(),
    instagram: string().nullable().optional(),
    whatsapp: string().nullable().optional()
  })
})
