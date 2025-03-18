import type { InferType } from "yup"
import type { TeacherBasicData } from "./Teacher"
import { PricingType as PricingTypeEnum } from "@/modules/courses/enums/pricing-type"
import { courseSchema } from "@/_schemas/course.schema"

export type PricingTypeType = keyof typeof PricingTypeEnum

// Unused
interface CourseValoration {
  value: string
  quantity: number
}

interface CourseVideo {
  id: number
  name: string
  duration: string
  url: string | null
}

export interface CourseContent {
  sectionName: string
  classes: CourseVideo[]
}

export interface Course {
  id: string
  name: string
  slug: string
  imageUrl: string | null
  price: number
  isScheduled: boolean | null
  pricingType: PricingTypeType
  publicationDate: Date | null
  teachers: TeacherBasicData[]
  valoration?: CourseValoration
  numClasses?: number
  totalClassTime?: string
}

export interface CourseDetails {
  id: string
  name: string
  slug: string
  objective: string
  description: string
  imageUrl: string
  price: number | null
  youWillLearn: string[]
  includes: string[]
  publicationDate: Date
  isScheduled: boolean
  pricingType: PricingTypeType
  teachers: TeacherBasicData[]
  resources: CourseContent[]
  createdAt: string
}

export interface AdminCourse {
  id: string
  name: string
  slug: string
  imageUrl: string | null
  price: number | null
  publicationDate: Date
  isScheduled: boolean
  pricingType: PricingTypeType
  courseName: string
  courseDuration: string
  courseUrl: string
  teachers: TeacherBasicData[]
  createdAt: Date
}

export type CourseFormFields = InferType<typeof courseSchema>

export interface CourseFormData extends Omit<
  CourseFormFields,
  "includes"
  | "youWillLearn"
  | "image"
> {
  id?: string
  includes: string[]
  youWillLearn: string[]
  image?: File
}

export type CourseFormUpdateData = Omit<CourseFormFields, "image">
