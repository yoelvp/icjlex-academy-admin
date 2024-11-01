import { axios } from '@/lib'

export const getRolesByUserIdService = (userId: string) => {
  return axios.get(`/roles/user/${userId}`)
}
