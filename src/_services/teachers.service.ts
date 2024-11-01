import { axios } from '@/lib'
import { ResponseData } from '@/@common/types/ResponseData'
import { Teacher } from '@/_models/Teacher.model'
import { TeacherData } from '@/modules/teachers/types/Docent'

export const createTeacherService = (teacher: Omit<TeacherData, 'id'>) => {
  const formData = new FormData()
  formData.append('firstName', teacher.firstName)
  formData.append('lastName', teacher.lastName)
  teacher.specialties?.forEach((specialty) => {
    formData.append('specialties[]', specialty ?? '')
  })
  formData.append('profession', teacher.profession)
  formData.append('about', teacher.about)
  formData.append('socialMedia[linkedin]', teacher.socialMedia?.linkedin || '')
  formData.append('socialMedia[youtube]', teacher.socialMedia?.youtube || '')
  formData.append('socialMedia[facebook]', teacher.socialMedia?.facebook || '')
  formData.append('socialMedia[x]', teacher.socialMedia?.x || '')
  formData.append('socialMedia[instagram]', teacher.socialMedia?.instagram || '')
  formData.append('socialMedia[whatsapp]', teacher.socialMedia?.whatsapp || '')

  if (teacher.image instanceof File) {
    formData.append('image', teacher.image)
  }

  console.log(formData)

  return axios.post<Teacher>('/docents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getAllTeachersService = (page: number, size: number) => {
  return axios.get<ResponseData<Teacher>>('/docents', {
    params: {
      page,
      size
    }
  })
}

export const getTeacherByIdService = (id: string) => {
  return axios.get(`/docents/${id}`)
}
