import { teacherSchema } from '@/_schemas/teacher.schema'
import { InferType } from 'yup'

export interface TeacherBasicData {
  firstName: string
  lastName: string
  profession: string
  imageUrl: string | null
}

export interface Teacher {
  id?: string
  firstName: string
  lastName: string
  slug: string
  profession: string
  about: string
  imageUrl: string | null
  specialties: string | string[] | null
  socialMedia: string | string[]
}

export type UpdateTeacher = Teacher

// TODO: New types for teachers
export type TeacherSchema = InferType<typeof teacherSchema>

export interface TeacherFormValues {
  id?: string
  firstName: string
  lastName: string
  slug: string
  profession: string
  about: string
  imageUrl: string | null
  image: File | null
  specialties: string[]
  socialMedia: string[]
}

export interface TeacherResponse {
  id: string
  firstName: string
  lastName: string
  slug: string
  profession: string
  about: string
  imageUrl: string | null
  specialties: string | string[] | null
  socialMedia: string | string[]
}
