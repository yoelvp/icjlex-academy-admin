import {
  Course,
  CourseInfomation,
  CourseResult
} from '../types/Course'
import { API_URL } from '@/@common/env'
import { ResponseData } from '@/@common/types/ResponseData'
import { axios } from '@/lib'
import { CourseFormData } from '../types/CourseFormFields'

export const addCourseService = (course: CourseFormData) => {
  const formData = new FormData()
  formData.append('name', course.name)
  formData.append('docentId', course.docentId)
  formData.append('objective', course.objective)
  formData.append('description', course.description)
  formData.append('isScheduled', `${course.isScheduled}`)
  formData.append('isFree', `${course.isFree ?? false}`)
  formData.append('price', course.price?.toString() ?? '')
  formData.append('publicationDate', `${course.publicationDate}`)
  course.includes.forEach((include) => {
    formData.append('includes[]', include)
  })
  course.youWillLearn.forEach((learn) => {
    formData.append('youWillLearn[]', learn)
  })

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

export const getAllCoursesService = (page: number, size: number) => {
  return axios.get<ResponseData<CourseResult>>('/courses', {
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
