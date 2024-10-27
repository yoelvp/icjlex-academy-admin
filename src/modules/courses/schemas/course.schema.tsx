import { array, boolean, mixed, object, string } from 'yup'

export const courseSchema = object().shape({
  name: string().required('El nombre del curso es obligatorio'),
  docentId: string().required('Seleccionar un docente es obligatorio'),
  features: array()
    .of(
      object().shape({
        name: string()
          .required('El campo name es obligatorio')
          .min(2, 'El name debe tener al menos 2 caracteres'),
        value: string()
          .required('El campo value es obligatorio')
          .min(2, 'El value debe tener al menos 2 caracteres')
      })
    )
    .required('Debes agregar al menos un elemento a Características')
    .min(1, 'Debe haber al menos un elemento en Características'),
  isActive: boolean()
    .required('El campo isActive es obligatorio')
    .oneOf([true, false], 'El campo isActive solo puede ser true o false'),
  objetive: string().required('El objetivo es obligatorio'),
  image: mixed()
    .nullable() // Permitir null
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
  startDate: mixed()
    .test(
      'isValidDate',
      'La fecha debe estar en formato ISO o vacía',
      (value) =>
        value === '' ||
        (typeof value === 'string' && !isNaN(Date.parse(value))) ||
        value instanceof Date
    )
    .transform((value) => {
      // Convierte una cadena ISO en una fecha Date
      return typeof value === 'string' && value !== '' ? new Date(value) : value
    })
})
