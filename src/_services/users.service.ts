import { axios } from '@/lib'

export const getUserByIdService = (userId: string) => {
  return axios.get(`/admin/users/${userId}`)
}
