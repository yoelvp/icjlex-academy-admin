import type { AdminCourse, Course } from '@/_models/Course.model'

import { axios } from '@/lib'
import { API_URL } from '@/@common/env'
import { IdAndNameFields } from '@/@common/types/IdAndName'
import { Response } from '@/@common/types/Response'
import { CourseFormData } from '@/modules/courses/types/CourseFormFields'

export const createCourseService = (course: CourseFormData) => {
  const formData = new FormData()
  formData.append('name', course.name)
  formData.append('teacherId', course.teacherId)
  formData.append('objective', course.objective)
  formData.append('description', course.description)
  formData.append('isScheduled', `${course.isScheduled}`)
  formData.append('isFree', `${course.isFree}`)
  formData.append('price', `${course.price}`)
  formData.append('publicationDate', `${course.publicationDate?.toISOString().slice(0, 19).replace('T', ' ') ?? null}`)
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

  return axios.post<AdminCourse>('/admin/courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getCourseByIdService = (courseId: string) => {
  return axios.get<Course>(`/admin/courses/${courseId}`)
}

// Not used
export const getAllCoursesOnlyNameService = () => {
  return axios.get<IdAndNameFields[]>('/courses/only-name')
}

export const publishCourseService = (courseId: string) => {
  return axios.patch<Response<boolean>>(`/admin/courses/publish/${courseId}`)
}

export const getAllCoursesService = (params?: object) => {
  return axios.get<Response<AdminCourse[]>>('/admin/courses', {
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

export const deleteCourseService = async (courseId: string) => {
  return await axios.delete<Response<{ courseId: string }>>(`/admin/courses/${courseId}`)
}
