import { Course, CourseResult, RegisterCourseForm } from '../types/Course'
import { API_URL } from '@/@common/env'
import { ResponseData } from '@/@common/types/ResponseData'
import { axios } from '@/lib'

export const addCourseService = (course: RegisterCourseForm) => {
  const formData = new FormData()

  const priceAsNumber = parseFloat(course.price ?? '0')

  // TODO: Pasar la función a una util
  const formatDate = (date: Date | ''): string => {
    if (date === '') return ''

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  // Uso del formato con solo Date o cadena vacía
  const formattedStartDate = formatDate(course.publicationDate as Date | '')

  // Aquí no debería dar error

  formData.append('name', course.name)
  formData.append('docentId', course.docentId)
  formData.append('objective', course.objective)
  formData.append('price', priceAsNumber.toString())
  formData.append('includes', JSON.stringify(course.includes))
  formData.append('includes', JSON.stringify(course.youWillLearn))
  formData.append('publicationDate', formattedStartDate)

  const imageFile = course.image // Cambia esto si `data.image` no es la fuente correcta

  if (imageFile && imageFile instanceof File) {
    formData.append('image', imageFile)
  } else {
    console.error('La imagen no es un archivo válido.')

    return
  }

  return axios.post<CourseResult>(`${API_URL}/courses`, formData, {
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
