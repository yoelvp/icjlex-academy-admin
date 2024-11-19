import { array, mixed, object, string } from 'yup'

export const teacherSchema = object({
  firstName: string().required('El nombre es obligatorio.'),
  lastName: string().required('El apellido es obligatorio.'),
  specialties: array()
    .of(object({
      label: string().required(),
      value: string().required()
    }))
    .required('Campo requerido')
    .min(1, 'Ingrese al menos una especialidad'),
  profession: string().required('La profesión es obligatoria.'),
  about: string().required('El campo "Acerca de mí" es obligatorio.'),
  image: mixed().required('Campo requerido'),
  socialMedia: array()
    .of(object({ url: string().required('Campo requerido') }))
    .required('Campo requerido')
    .min(1, 'Debe registrar al menos una red social del docente')
})
