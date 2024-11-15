import type { UpdateTeacher } from '@/_models/Teacher'
import type { UpdateTeacherFormFields } from '@/_types/TeacherField'

const parseSocialMedia = (data?: string[] | string): Array<{ url: string }> => {
  if (typeof data === 'string') {
    return [{ url: data }]
  }

  if (Array.isArray(data)) {
    return data?.map((value) => ({ url: value }))
  }

  throw new Error('')
}

const parseSpecialties = (data?: (string | undefined)[] | string): Array<{ label: string, value: string }> => {
  if (typeof data === 'string') {
    return [{ label: data, value: data }]
  }

  if (Array.isArray(data)) {
    return data?.map((value) => ({ label: value ?? '', value: value ?? '' }))
  }

  throw new Error('')
}

export const defaultValue = (condition: boolean, data: UpdateTeacher | null): Partial<UpdateTeacherFormFields> | undefined => {
  if (condition) {
    return {
      ...data,
      socialMedia: parseSocialMedia(data?.socialMedia),
      specialties: parseSpecialties(data?.specialties)
    }
  }

  if (!condition) {
    return {
      socialMedia: [
        { url: 'https://' }
      ]
    }
  }
}
