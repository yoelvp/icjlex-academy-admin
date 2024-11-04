import type { Pagination, ResPagination } from '@/@common/types/Pagination'

export interface ResponseData<T> extends ResPagination {
  results: T[]
}

export interface ResWithPagination<T> extends ResPagination {
  results: T[]
}

export interface Response<T> {
  success: boolean
  status: number
  pagination: Pagination
  data?: T
  results?: T[]
}
