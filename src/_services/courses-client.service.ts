import type { CourseDetails } from '@/_models/Course.model'
import { axios } from '@/lib'

export const getCourseDetailsService = (courseId: string) => {
  return axios.get<CourseDetails>(`/courses/${courseId}/details`)
}
