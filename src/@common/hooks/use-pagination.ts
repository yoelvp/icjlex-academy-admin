import { useState } from 'react'
import { DEFAULT_PAGINATION } from '../constants/default-pagination'

export const usePagination = () => {
  const [page, setPage] = useState(DEFAULT_PAGINATION.currentPage)
  const [perPage, setPerPage] = useState(DEFAULT_PAGINATION.perPage)

  const nextPage = () => setPage(page + 1)
  const prevPage = () => setPage(page - 1)

  return {
    page,
    perPage,
    prevPage,
    nextPage,
    setPerPage
  }
}

