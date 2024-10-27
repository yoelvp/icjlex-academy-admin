import { InferType } from 'yup'
import { courseSchema } from '../schemas/course.schema'
import { resourceCourseSchema } from '../schemas/resources-from-course.schema'

export type Course = InferType<typeof courseSchema>

export type ContentCourse = InferType<typeof resourceCourseSchema>

export interface CourseResult {
  id?: string
  name?: string
  objetive?: string
  imageUrl?: null | string
  price: number
  features: string
  startDate: string
  isActive?: boolean
}
