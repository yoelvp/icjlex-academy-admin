export interface Pagination {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}

export interface Response<T> {
  success: boolean
  status: number
  message: string
  pagination?: Pagination | null
  data: T
}

export type PathParams = {
  id?: string
  slug?: string
}
