import { array, object, string } from 'yup'

export const resourceCourseSchema = object().shape({
  content: object().shape({
    title: string()
      .required('El título es requerido')
      .min(3, 'El título debe tener al menos 3 caracteres'),
    details: array()
      .of(
        object().shape({
          titleClass: string()
            .required('El título de la clase es requerido')
            .min(3, 'El título de la clase debe tener al menos 3 caracteres'),
          duration: string()
            .required('La duración es requerida')
            .matches(
              /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/,
              'La duración debe estar en el formato HH:mm:ss'
            ),
          url: string()
            .required('La URL es requerida')
            .url('La URL debe ser válida')
        })
      )
      .min(1, 'Se debe proporcionar al menos un detalle')
  })
})
