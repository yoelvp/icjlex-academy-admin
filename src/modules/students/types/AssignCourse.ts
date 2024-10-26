import { InferType } from 'yup'
import { assignCourseToStudentSchema } from '../schemas/assign-course.schema'

export type AssignCourse = InferType<typeof assignCourseToStudentSchema>
