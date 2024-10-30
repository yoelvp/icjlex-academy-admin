import { array, boolean, mixed, object, string } from 'yup'

const optionSchema = object().shape({
  label: string().required(),
  value: string().required()
})

export const courseSchema = object().shape({
  name: string().required('El nombre del curso es obligatorio'),
  docentId: string().required('Seleccionar un docente es obligatorio'),
  objective: string().required('El objetivo es obligatorio'),
  youWillLearn: array()
    .of(optionSchema)
    .required('Campo requerido')
    .min(1, 'Debe haber al menos un elemento'),
  includes: array()
    .of(optionSchema)
    .required('Campo requerido')
    .min(1, 'Debe haber al menos un elemento'),
  description: string().required('Campo requerido'),
  image: mixed()
    .nullable()
    .required('La imagen es obligatoria.')
    .test('fileSize', 'La imagen es muy grande.', (value) => {
      return value && value instanceof File && value.size <= 2 * 1024 * 1024
    })
    .test('fileType', 'El formato de archivo no es válido.', (value) => {
      return (
        value &&
        value instanceof File &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
      )
    }),
  price: string()
    .matches(
      /^\d+(\.\d{1,2})?$/,
      'El precio debe ser un número con hasta dos decimales'
    )
    .optional(),
  schedulePublication: boolean().default(false),
  publicationDate: mixed()
    .test(
      'isValidDate',
      'La fecha debe estar en formato ISO o vacía',
      (value) =>
        value === '' ||
        (typeof value === 'string' && !isNaN(Date.parse(value))) ||
        value instanceof Date
    )
    .transform((value) => {
      return typeof value === 'string' && value !== '' ? new Date(value) : value
    })
    .when('schedulePublication', {
      is: true,
      then: (schema) => schema.required('La fecha de publicación es obligatoria cuando se programa la publicación'),
      otherwise: (schema) => schema.notRequired().nullable().optional()
    })
})
