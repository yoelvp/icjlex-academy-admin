import axios from 'axios'
import { Course, CourseResult } from '../types/Course'
import { API_URL } from '@/@common/env'
import { ResponseData } from '@/@common/types/ResponseData'

export const addCourseService = async (course: Course) => {
  const formData = new FormData()

  // Convertir 'price' a número decimal
  const priceAsNumber = parseFloat(course.price ?? '0') // Usa '0' si price es undefined
  console.log(priceAsNumber)

  // Modificación de la función formatDate para aceptar null
  const formatDate = (date: Date | ''): string => {
    if (date === '') return '' // Retorna cadena vacía si el valor es ""

    // Formatea la fecha si es de tipo Date
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // Uso del formato con solo Date o cadena vacía
  const formattedStartDate = formatDate(course.startDate as Date | '')

  // Aquí no debería dar error

  formData.append('name', course.name)
  formData.append('docentId', course.docentId)
  formData.append('isActive', course.isActive ? 'true' : 'false')
  formData.append('objetive', course.objetive)
  // formData.append('content', JSON.stringify(course))
  formData.append('price', priceAsNumber.toString())
  course.features.forEach(
    (feature: { name: string; value: string }, index: number) => {
      formData.append(`features[${index}][name]`, feature.name)
      formData.append(`features[${index}][value]`, feature.value)
    }
  )
  formData.append('startDate', formattedStartDate)

  const imageFile = course.image // Cambia esto si `data.image` no es la fuente correcta

  if (imageFile && imageFile instanceof File) {
    formData.append('image', imageFile)
    console.log('Tipo de imagen:', typeof imageFile)
    console.log('Contenido de imagen:', imageFile)
  } else {
    console.error('La imagen no es un archivo válido.')

    return
  }

  return await axios.post<CourseResult>(`${API_URL}/courses`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getCourseByIdService = (courseId: string) => {
  return axios.get<Course>(`/courses/${courseId}`)
}

export const getAllCoursesService = async (page: number, size: number) => {
  return await axios.get<ResponseData<CourseResult>>(`${API_URL}/courses`, {
    params: {
      page,
      size
    }
  })
}

export const updateCourseService = async (
  courseId: string,
  courseData: Partial<Course>
) => {
  return await axios.patch(`${API_URL}/courses/${courseId}`, courseData)
}
