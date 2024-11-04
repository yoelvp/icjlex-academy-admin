export interface Pagination {
  page?: number
  totalItems?: number
  totalPages?: number
}

export interface ResPagination {
  currentPage?: number
  count?: number
  totalPages?: number
}

export interface ReqPagination {
  page?: number
  size?: number
}
