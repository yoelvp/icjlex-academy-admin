import { TeacherBasicData } from './Teacher'

interface CourseVideo {
  name: string
  videoLength: string
}

interface CourseContent {
  title: string
  numClasses: string
  totalClassTime: string
  videos: CourseVideo[]
}

interface CourseValoration {
  value: string
  quantity: number
}

interface CourseVideo {
  className: string
  duration: string
  url: string | null
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

export interface CourseDetails extends Course {
  objective: string
  numStudents: number
  includes: string[]
  youWillLearn: string[]
  contents: CourseContent[]
  description: string
}

export interface CourseContents {
  sectionName: string
  classes: CourseVideo[]
}

export interface CourseListAdmin {
  id: string
  name: string
  slug: string
  imageUrl: string
  publicationDate: Date | null
  price: number
  teachers: Array<{
    id: string
    firstName: string
    lastName: string
    slug: string
    profession: string
  }>
  createdAt: Date
}
