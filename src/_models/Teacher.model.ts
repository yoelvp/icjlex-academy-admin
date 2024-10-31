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
  profession: string
  about: string
  imageUrl: string | null
  specialties: string[]
  socialMedia: {
    linkedin: string | null
    youtube: string | null
    facebook: string | null
    x: string | null
    instagram: string | null
    whatsapp: string | null
  }
}
