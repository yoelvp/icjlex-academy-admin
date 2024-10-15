import { InferType } from 'yup'
import { courseSchema } from '../schemas/course.schema'

export type Course = InferType<typeof courseSchema>

export interface CourseResult {
  id?: string
  name?: string
  objetive?: string
  imageUrl?: null | string
  isActive?: boolean
}
