import { mixed, object, string } from 'yup'

export const courseSchema = object({
  id: string().optional(),
  name: string().required('Este es un campo requerido'),
  objetive: string().required('Este es un campo requerido'),
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
    })
})
