import { InferType } from 'yup'
import { docentSchema } from '../schemas/docent.schema'

export type Docent = InferType<typeof docentSchema>

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
