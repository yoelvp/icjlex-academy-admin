import { ReqPagination } from '@/@common/types/Pagination'
import type { ResWithPagination } from '@/@common/types/ResponseData'
import type { Teacher } from '@/_models/Teacher.model'

import { axios } from '@/lib'

export const getAllTeachersService = ({ page, size }: ReqPagination) => {
  return axios.get<ResWithPagination<Teacher>>('/docents', {
    params: {
      page,
      size
    }
  })
}
