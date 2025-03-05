import { InferType } from 'yup'
import { courseSchema } from '../schemas/course.schema'

export type Course = InferType<typeof courseSchema>
export type RegisterCourse = InferType<typeof courseSchema>

export interface RegisterCourseForm
  extends Omit<RegisterCourse, 'youWillLearn' | 'includes'> {
  youWillLearn: string[]
  includes: string[]
}

export interface CourseResult {
  id?: string
  name?: string
  objective?: string
  imageUrl?: string
  price?: number
  youWillLearn?: string
  includes?: string
  description?: string
  startDate?: Date
  isActive?: boolean
  contents?: Content[]
  docentToCourse?: DocentToCourse[]
}

interface Content {
  title: string
  details: Detail[]
}

interface Detail {
  titleClass: string
  duration: string
  url: string
}

interface DocentToCourse {
  id: string
  docentId: string
  courseId: string
  docent: Docent
}

interface Docent {
  id: string
  firstName: string
  lastName: string
  profession: string
  aboutMe: string
  valorations: number
  imageUrl: null
  socialMedia: null
}

/* interface for courseInfomation */
export interface CourseInfomation {
  id: string
  name: string
  imageUrl: string
  price: number
  objective: null
  description: null
  youWillLearn: null
  includes: string | null
  contents: Content[]
  teacher: Teacher
  valoration: Valoration
  numClasses: number
  totalClassTime: string
}

interface Content {
  title: string
  numClasses: string
  totalClassTime: string
  videos: Video[]
}

interface Video {
  name: string
  duration: string
}

interface Teacher {
  firstName: string
  lastName: string
  imageUrl: string
  profession: string
}

interface Valoration {
  value: string
  quantity: number
}

export interface PublishedCourse {
  id: string
  imageUrl: string | null
  name: string
  teacher: Teacher
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface UpcomingCourse extends PublishedCourse {
  publicationDate: Date | null
}
