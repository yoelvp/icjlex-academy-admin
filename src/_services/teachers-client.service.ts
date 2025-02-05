import type { ReqPagination } from '@/@common/types/Pagination'
import type { ResponsePaginated } from '@/@common/types/Response'
import type { Teacher } from '@/_models/Teacher'

import { axios } from '@/lib'

export const getAllTeachersService = ({ page, size }: ReqPagination) => {
  return axios.get<ResponsePaginated<Teacher>>('/c/teachers', {
    params: {
      page,
      size
    }
  })
}
