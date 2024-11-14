import type { ResponsePaginated } from '@/@common/types/ResponseData'
import type { Course, CourseDetails } from '@/_models/Course.model'

import { axios } from '@/lib'

export const getCourseDetailsService = (courseId: string) => {
  return axios.get<CourseDetails>(`/courses/${courseId}/details`)
}

export const getAllUpcomingCoursesService = (params?: object) => {
  return axios.get<ResponsePaginated<Course>>('/c/courses', {
    params
  })
}
