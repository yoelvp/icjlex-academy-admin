import { InferType } from "yup"
import { teacherSchema } from "@/_schemas/teacher.schema"

export type TeacherFieldsSchema = InferType<typeof teacherSchema>

export interface TeacherFormFields extends TeacherFieldsSchema {
  id?: string
}

export interface UpdateTeacherFormFields extends TeacherFieldsSchema {
  id?: string
  image?: File | null
}

export interface TeacherData extends Omit<TeacherFieldsSchema, "specialties" | "socialMedia"> {
  specialties: (string | undefined)[]
  socialMedia: string[]
}

export interface UpdateTeacherData extends TeacherData {
  id: string
  imageUrl: string | null
}

export interface CreateTeacherResponse extends TeacherData {
  id: string
  imageUrl: string | null
}

export type DocentResult = {
  id: string
  firstName: string
  lastName: string
  profession: string
  aboutMe: string
  valorations: number
  imageUrl: null | string
  socialMedia: SocialMediaClass | null
  docentToSpecialty: string[]
}

export interface DocentToSpecialty {
  specialtyName: string
}

export interface SocialMediaClass {
  whatsapp: string
  x: string
  facebook: string
  linkedin: string
  youtube: string
}
