import { array, mixed, object, string } from 'yup'

export const courseSchema = object().shape({
  name: string().required('El nombre del curso es obligatorio'),
  objetive: string().required('El objetivo es obligatorio'),
  docentId: string().required('Seleccionar un docente es obligatorio'),
  content: array()
    .of(
      object().shape({
        title: string().required('El título es obligatorio'),
        details: array()
          .of(
            object().shape({
              titleClass: string().required(
                'El título de la clase es obligatorio'
              ),
              duration: string()
                .matches(
                  /^\d{2}:\d{2}:\d{2}$/,
                  'La duración debe estar en el formato HH:MM:SS'
                )
                .required('La duración es obligatoria'),
              videoUrl: string()
                .url('La URL del video no es válida')
                .required('La URL del video es obligatoria')
            })
          )
          .required('Los detalles son obligatorios')
      })
    )
    .required('El contenido es obligatorio'),
  image: mixed()
    .required('La imagen es obligatoria.')
    .test('fileSize', 'La imagen es muy grande.', (value) => {
      // Si `value` no está definido, devuelve un error
      if (!value) return false
      // Si `value` es un array, toma el primer elemento
      const file = Array.isArray(value) ? value[0] : value

      return file.size <= 2 * 1024 * 1024 // Limitar a 2MB
    })
    .test('fileType', 'El formato de archivo no es válido.', (value) => {
      if (!value) return false
      const file = Array.isArray(value) ? value[0] : value

      return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
    })
})
