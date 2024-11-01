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

export interface Course {
  id: string
  name: string
  imageUrl: string | null
  price: number
  teacher: TeacherBasicData
  valoration: {
    value: string
    quantity: number
  }
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
