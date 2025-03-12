import type { Pagination, ResPagination } from "@/@common/types/Pagination"

export interface ResponseData<T> extends ResPagination {
  results: T[]
}

export interface ResWithPagination<T> extends ResPagination {
  results: T[]
}

export interface Response<T> {
  success: boolean
  status: number
  message: string
  data: T
}

export interface ResponsePaginated<T> {
  success: boolean
  status: number
  message: string
  pagination: Pagination
  data: T[]
}
