import { API_URL } from '@/@common/env'
import { Response } from '@/@common/types/Response'
import { ResponseData } from '@/@common/types/ResponseData'
import { Course, CourseListAdmin } from '@/_models/Course.model'
import { axios } from '@/lib'
import { CourseInfomation, CourseResult } from '@/modules/courses/types/Course'
import { CourseFormData } from '@/modules/courses/types/CourseFormFields'

export const createCourseService = (course: CourseFormData) => {
  const formData = new FormData()
  formData.append('name', course.name)
  formData.append('docentId', course.teacherId)
  formData.append('objective', course.objective)
  formData.append('description', course.description)
  formData.append('isScheduled', `${course.isScheduled}`)
  formData.append('isFree', `${course.isFree}`)
  formData.append('price', `${course.price}`)
  formData.append('publicationDate', `${course.publicationDate}`)
  formData.append('courseName', course.course.name)
  formData.append('courseUrl', `${course.course.url}`)
  formData.append('courseDuration', course.course.duration)
  course.includes.forEach((include) => {
    formData.append('includes[]', include)
  })
  course.youWillLearn.forEach((learn) => {
    formData.append('youWillLearn[]', learn)
  })

  if (course.image) {
    formData.append('image', course.image)
  }

  return axios.post<CourseResult>('/admin/courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Not used
export const getCourseByIdService = (courseId: string) => {
  return axios.get<Course>(`/courses/${courseId}`)
}

export const getAllCoursesService = (params?: object) => {
  return axios.get<Response<CourseListAdmin[]>>('/admin/courses', {
    params
  })
}

// Not used
export const updateCourseService = async (
  courseId: string,
  courseData: Partial<Course>
) => {
  return await axios.patch(`${API_URL}/courses/${courseId}`, courseData)
}

// Not used
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

export const deleteCourseService = async (courseId: string) => {
  return await axios.delete<Response<{ courseId: string }>>(`/admin/courses/${courseId}`)
}
