import type { Response } from '@/@common/types/ResponseData'
import type { ValidateStudentHasPaidCourse } from '@/_models/Student.model'

import { axios } from '@/lib'

export const validateStudentHasPaidCourseService = (courseId: string) => {
  return axios.get<Response<ValidateStudentHasPaidCourse>>(`/students/has-paid-course/${courseId}`)
}
