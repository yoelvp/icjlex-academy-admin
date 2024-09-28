import { mixed, object, string } from 'yup'

export const docentSchema = object({
  firstName: string().required('El nombre es obligatorio.'),
  lastName: string().required('El apellido es obligatorio.'),
  specialties: string()
    .required('Las especialidades son obligatorias.')
    .matches(
      /^[^,]+(,[^,]+)*$/,
      'Formato inválido. Usa comas para separar las especialidades.'
    ),
  profession: string().required('La profesión es obligatoria.'),
  aboutMe: string().required('El campo "Acerca de mí" es obligatorio.'),
  image: mixed()
    .required('La imagen es obligatoria.')
    .test('fileSize', 'La imagen es muy grande.', (value) => {
      // Limitar a 2MB
      return value && value[0]?.size <= 2 * 1024 * 1024
    })
    .test('fileType', 'El formato de archivo no es válido.', (value) => {
      return (
        value &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(value[0]?.type)
      )
    }),
  socialMedia: object()
    .shape({
      youtube: string().url('URL de YouTube inválida.').notRequired(),
      whatsapp: string().url('URL de WhatsApp inválida.').notRequired(),
      facebook: string().url('URL de Facebook inválida.').notRequired(),
      linkedin: string().url('URL de LinkedIn inválida.').notRequired(),
      x: string().url('URL de Twitter inválida.').notRequired()
    })
    .nullable()
})
