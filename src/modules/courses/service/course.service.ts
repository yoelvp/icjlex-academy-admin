import {
  Course,
  CourseInfomation,
  CourseResult,
  RegisterCourseForm
} from '../types/Course'
import { API_URL } from '@/@common/env'
import { ResponseData } from '@/@common/types/ResponseData'
import { axios } from '@/lib'
import { formatDate } from '../utils/format-date'

export const addCourseService = (course: RegisterCourseForm) => {
  const formData = new FormData()

  const priceAsNumber = parseFloat(course.price ?? '0')

  // Uso del formato con solo Date o cadena vacía
  const formattedStartDate = formatDate(course.publicationDate as Date | null)

  formData.append('name', course.name)
  formData.append('docentId', course.docentId)
  formData.append('objective', course.objective)
  formData.append('price', priceAsNumber.toString())
  formData.append('includes', JSON.stringify(course.includes))
  formData.append('youWillLearn', JSON.stringify(course.youWillLearn))
  // Solo añade publicationDate si formattedStartDate no es null
  if (formattedStartDate !== null) {
    formData.append('publicationDate', formattedStartDate)
  } else {
    formData.append('publicationDate', '') // O, puedes omitir este campo por completo
  }

  const imageFile = course.image

  if (imageFile && imageFile instanceof File) {
    formData.append('image', imageFile)
  } else {
    console.error('La imagen no es un archivo válido.')

    return
  }

  return axios.post<CourseResult>('/courses', formData, {
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

export const getCoursesInformation = async (page: number, size: number) => {
  return await axios.get<ResponseData<CourseInfomation>>(
    `${API_URL}/courses/details`,
    {
      params: {
        page,
        size
      }
    }
  )
}
