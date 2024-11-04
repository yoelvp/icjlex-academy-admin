import { TeacherBasicData } from './Teacher.model'

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
  videoUrl: string | null
}

export interface Course {
  id: string
  name: string
  imageUrl: string | null
  price: number
  teacher: TeacherBasicData
  valoration: CourseValoration
  numClasses: number
  totalClassTime: string
}

export interface CourseDetails extends Course {
  objective: string
  numStudents: number
  includes: string[]
  youWillLearn: string[]
  content: CourseContent[]
  description: string
}

export interface CourseContents {
  sectionName: string
  classes: CourseVideo[]
}
