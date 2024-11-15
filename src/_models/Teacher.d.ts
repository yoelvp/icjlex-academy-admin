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
  specialties: (string | undefined)[]
  socialMedia: string[]
}

export type UpdateTeacher = Teacher
