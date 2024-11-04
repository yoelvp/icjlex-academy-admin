import type { ResPagination } from '@/@common/types/Pagination'

export interface ResponseData<T> extends ResPagination {
  results: T[]
}

export interface ResWithPagination<T> extends ResPagination {
  results: T[]
}
