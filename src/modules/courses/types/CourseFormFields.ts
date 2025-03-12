import { InferType } from "yup"
import { courseSchema } from "../schemas/course.schema"

export type CourseFields = InferType<typeof courseSchema>

export interface CourseFormData extends Omit<
  InferType<typeof courseSchema>,
  "includes"
  | "youWillLearn"
  | "image"
> {
  includes: string[]
  youWillLearn: string[]
  image: File | null
}
