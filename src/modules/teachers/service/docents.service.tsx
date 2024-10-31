import { axios } from '@/lib'
import { Docent, DocentResult } from '../types/Docent'
import { ResponseData } from '@/@common/types/ResponseData'
import { Teacher } from '@/_models/Teacher.model'

export const addDocentService = (docent: Omit<Docent, 'id'>) => {
  const formData = new FormData()
  formData.append('firstName', docent.firstName)
  formData.append('lastName', docent.lastName)
  formData.append('specialties', JSON.stringify(docent.specialties))
  formData.append('profession', docent.profession)
  formData.append('about', docent.about)
  formData.append('socialMedia[linkedin]', docent.socialMedia?.linkedin || '')
  formData.append('socialMedia[youtube]', docent.socialMedia?.youtube || '')
  formData.append('socialMedia[facebook]', docent.socialMedia?.facebook || '')
  formData.append('socialMedia[x]', docent.socialMedia?.x || '')
  formData.append('socialMedia[instagram]', docent.socialMedia?.instagram || '')
  formData.append('socialMedia[whatsapp]', docent.socialMedia?.whatsapp || '')
  formData.append('image', docent.image[0])

  return axios.post<DocentResult>('/docents', formData, {
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
