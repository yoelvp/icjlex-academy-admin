import { useState } from 'react'

interface UsePaginationProps {
  page?: number
  totalItems?: number
  totalPages?: number
}

export const usePagination = ({ page, totalItems, totalPages }: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(page ?? 1)
  const [size, setSize] = useState(10)

  const nextPage = () => setCurrentPage((prev) => prev + 1)
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const goToPage = (page: number) => setCurrentPage(page)
  const handleSize = (newSize: number) => setSize(newSize)

  return {
    page: currentPage,
    size,
    prevPage,
    nextPage,
    goToPage,
    handleSize,
    totalItems,
    totalPages
  }
}
