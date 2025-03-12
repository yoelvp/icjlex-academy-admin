import { ResWithPagination } from "../types/ResponseData"

export const responseMapper = <T>(data: ResWithPagination<T>) => {
  return {
    page: data.currentPage,
    totalPages: data.totalPages,
    totalItems: data.count,
    results: data.results
  }
}
