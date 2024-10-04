import type { Pagination } from '@/@common/types/Pagination'

export interface ResponseData<T> extends Pagination {
  results: T[]
}
