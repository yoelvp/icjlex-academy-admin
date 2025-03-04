import { teacherSchema } from '@/_schemas/teacher.schema'
import { InferType } from 'yup'

export interface TeacherBasicData {
  firstName: string
  lastName: string
  profession: string
  imageUrl: string | null
}

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  slug: string
  profession: string
  about: string
  imageUrl: string | null
  specialties: string | string[]
  socialMedia: string | string[]
}

// TODO: Make types for form
export type TeacherFormSchema = InferType<typeof teacherSchema>

// TODO: New types for teachers
export interface TeacherFormValues extends Omit<
  Teacher,
  'id'
  | 'slug'
  | 'image'
  | 'specialties'
  | 'socialMedia'
> {
  id?: string
  image?: File | null
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

export type TeacherOnlyNames = Pick<Teacher, 'id' | 'firstName' | 'lastName'>
