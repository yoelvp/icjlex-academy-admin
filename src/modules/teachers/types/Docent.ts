import { InferType } from 'yup'
import { docentSchema } from '../schemas/docent.schema'

export type Docent = InferType<typeof docentSchema>
export type DocentSchema = InferType<typeof docentSchema>

export interface DocentFields extends InferType<typeof docentSchema> {
  id?: string
}

export interface TeacherData extends Omit<InferType<typeof docentSchema>, 'specialties'> {
  id?: string
  specialties: (string | undefined)[]
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
