import { useState } from 'react'
import { DEFAULT_PAGINATION } from '../constants/default-pagination'

export const usePagination = () => {
  const [page, setPage] = useState(DEFAULT_PAGINATION.currentPage)
  const [size, setSize] = useState(DEFAULT_PAGINATION.size)

  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)

  return {
    page,
    size,
    prevPage,
    nextPage,
    setSize
  }
}
