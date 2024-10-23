import { axios } from '@/lib'
import { UpdateStudent } from '@/modules/[user]/update-data/types/UpdateStudent'

export const validateDataUpdateService = (id: string) => {
  return axios.get<{ isUpdated: boolean }>('/students/validate-data-update', {
    params: {
      id
    }
  })
}

export const updateMainDataService = (userId: string, data: UpdateStudent) => {
  const formData = new FormData()
  formData.append('firstName', data.firstName)
  formData.append('lastName', data.lastName)
  formData.append('password', data.password)
  formData.append('confirmPassword', data.confirmPassword)
  formData.append('image', data.image!)

  return axios.patch(`/students/me/${userId}`, formData, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data'
    }
  })
}
