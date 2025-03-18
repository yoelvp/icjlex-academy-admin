import { teacherSchema, updateImageSchema } from "@/_schemas/teacher.schema"
import { InferType } from "yup"

export interface TeacherBasicData {
  id?: string
  firstName: string
  lastName: string
  slug: string
  profession: string
  imageUrl?: string | null
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
  createdAt: Date
}

export type TeacherFormSchema = InferType<typeof teacherSchema>

export type UpdateTeacherImageFormSchema = InferType<typeof updateImageSchema>

export interface TeacherFormValues extends Omit<
  TeacherFormSchema,
  "id"
  | "slug"
  | "image"
  | "specialties"
  | "socialMedia"
  > {
  id?: string
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

export type TeacherOnlyNames = Pick<Teacher, "id" | "firstName" | "lastName">
