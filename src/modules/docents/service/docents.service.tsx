import { API_URL } from '@/@common/env'
import axios from 'axios'
import { Docent, DocentResult } from '../types/Docent'

export const addDocentService = async (
  docent: Omit<Docent, 'id'>
): Promise<DocentResult> => {
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

  const response = await axios.post<DocentResult>(
    `${API_URL}/docents`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data
}

export const getDocentService = async (): Promise<DocentResult[]> => {
  const response = await axios.get(`${API_URL}/docents`)
  console.log(response)

  return response.data.results
}
