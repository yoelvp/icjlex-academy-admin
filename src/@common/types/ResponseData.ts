import type { Pagination } from '@/@common/types/Pagination'

export interface ResponseData<T> extends Pagination {
  results: T[]
}

export interface ResWithPagination<T> extends Pagination {
  results: T[]
}
