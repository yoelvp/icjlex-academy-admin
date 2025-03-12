import { array, mixed, object, string } from 'yup'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

export const teacherSchema = object({
  firstName: string().required('Campo requerido'),
  lastName: string().required('Campo requerido'),
  specialties: array()
    .of(object({
      label: string().required(),
      value: string().required()
    }))
    .required('Campo requerido')
    .min(1, 'Ingrese al menos un item'),
  profession: string().required('Campo requerido'),
  about: string().required('Campo requerido'),
  image: mixed<File>()
    .required('Campo requerido')
    .test(
      'fileSize',
      'La imagen no debe exceder los 5 MB',
      (value: File | null) => value ? value.size <= MAX_FILE_SIZE : false
    )
    .test(
      'fileType',
      'Debe ingresar una imágen válida',
      (value: File | null) => value ? SUPPORTED_FORMATS.includes(value.type) : false
    ),
  imageUrl: string(),
  socialMedia: array()
    .of(object({
      label: string().required(),
      value: string().required()
    }))
    .required('Campo requerido')
    .min(1, 'Debe agregar al menos un item')
})
