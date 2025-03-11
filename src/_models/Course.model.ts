import { TeacherBasicData } from './Teacher'

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
  isFree: boolean
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
  isFree: boolean
  createdAt: string
  teachers: TeacherBasicData[]
  resources: CourseContent[]
}

export interface AdminCourse {
  id: string
  name: string
  slug: string
  imageUrl: string | null
  price: number | null
  publicationDate: Date
  isScheduled: boolean
  isFree: boolean | null
  courseName: string
  courseDuration: string
  courseUrl: string
  teachers: TeacherBasicData[]
  createdAt: Date
}
