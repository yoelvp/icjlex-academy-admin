import axios from 'axios'
import { Course, CourseResult } from '../types/Course'
import { API_URL } from '@/@common/env'
import { ResponseData } from '@/@common/types/ResponseData'

export const addCourseService = async (course: Course) => {
  const formData = new FormData()
  formData.append('name', course.name)
  formData.append('objetive', course.objetive)
  formData.append('docentId', course.docentId)
  formData.append('content', JSON.stringify(course.content))
  formData.append('image', course.image[0])

  return await axios.post<CourseResult>(`${API_URL}/courses`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getAllCoursesService = async (page: number, size: number) => {
  return await axios.get<ResponseData<CourseResult>>(`${API_URL}/courses`, {
    params: {
      page,
      size
    }
  })
}
