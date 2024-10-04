import { API_URL } from '@/@common/env'
import axios from 'axios'
import { Docent, DocentResult } from '../types/Docent'
import { ResponseData } from '@/@common/types/ResponseData'

export const addDocentService = async (
  docent: Omit<Docent, 'id'>
) => {
  const formData = new FormData()

  // manejo de specialties como array
  const specialtiesString = docent.specialties
    .split(',')
    .map((s) => s.trim())
    .join(',') // Unir en un string

  formData.append('firstName', docent.firstName)
  formData.append('lastName', docent.lastName)
  formData.append('specialties', specialtiesString)
  formData.append('profession', docent.profession)
  formData.append('aboutMe', docent.aboutMe)
  formData.append('image', docent.image[0])

  // Manejo de socialMedia como objeto
  formData.append('socialMedia[whatsapp]', docent.socialMedia?.whatsapp || '')
  formData.append('socialMedia[x]', docent.socialMedia?.x || '')
  formData.append('socialMedia[facebook]', docent.socialMedia?.facebook || '')
  formData.append('socialMedia[linkedin]', docent.socialMedia?.linkedin || '')
  formData.append('socialMedia[youtube]', docent.socialMedia?.youtube || '')

  return await axios.post<DocentResult>(
    `${API_URL}/docents`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export const getAllTeachersService = async (
  page: number,
  size: number,
  perPage: number
) => {
  return await axios.get<ResponseData<DocentResult>>(`${API_URL}/docents`, {
    params: {
      page,
      size,
      perPage
    }
  })
}
