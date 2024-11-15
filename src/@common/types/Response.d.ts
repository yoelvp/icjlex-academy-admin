import type { Pagination } from '@/@common/types/Pagination'

interface ResponseBasicBody {
  success: boolean
  status: number
  message: string
}

export interface Response<T> extends ResponseBasicBody {
  data: T
}

export interface ResponsePaginated<T> extends ResponseBasicBody {
  pagination: Pagination
  data: T[]
}
