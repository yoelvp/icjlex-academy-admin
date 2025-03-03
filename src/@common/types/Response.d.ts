import type { Pagination } from '@/@common/types/Pagination'

interface ResponseBasicBody {
  success: boolean
  status: number
  message: string
}

export interface Response<T> {
  success: boolean
  status: number
  message: string
  pagination: Pagination | null
  data: T
}

export interface ResponsePaginated<T> extends ResponseBasicBody {
  pagination: Pagination
  data: T[]
}
