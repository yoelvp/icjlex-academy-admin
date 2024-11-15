import type { Response } from '@/@common/types/Response'
import type { User } from '@/_models/User'

import { axios } from '@/lib'

export const getUserByIdService = (userId: string) => {
  return axios.get<Response<User>>(`/users/${userId}`)
}
