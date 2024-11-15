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
    .test('fileSize', 'La imagen es muy grande.', (value) => {
      return value !== null && value instanceof File && value.size <= 2 * 1024 * 1024
    })
    .test('fileType', 'El formato de archivo no es válido.', (value) => {
      return value !== null && value instanceof File && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
    }),
  price: string()
    .matches(
      /^\d+(\.\d{1,2})?$/,
      'El precio debe ser un número con hasta dos decimales'
    )
    .optional(),
  isScheduled: boolean().default(false).optional().nullable(),
  isFree: boolean().default(false).optional().nullable(),
  publicationDate: mixed()
    .test(
      'isValidDate',
      'La fecha debe estar en formato ISO o vacía',
      (value) =>
        value === '' ||
        value === null ||
        (typeof value === 'string' && !isNaN(Date.parse(value))) ||
        value instanceof Date
    ).nullable()
    .transform((value) => {
      return typeof value === 'string' && value !== '' ? new Date(value) : value
    })
    .when('isScheduled', {
      is: true,
      then: (schema) => schema.required('La fecha de publicación es obligatoria cuando se programa la publicación'),
      otherwise: (schema) => schema.notRequired().nullable().optional()
    }),
  course: object({
    name: string().required('Campo requerido'),
    url: string().url('Debe ser una URL válida').nullable(),
    duration: string().nullable()
  })
})
