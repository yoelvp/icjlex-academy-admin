import { useEffect, useRef, useState } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  initialSize?: number
  onPageChange?: (page: number, size: number) => void
}

export const usePagination = ({
  initialPage = 1,
  initialSize = 10,
  onPageChange
}: UsePaginationOptions = {}) => {
  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)

  useEffect(() => {
    if (
      onPageChange &&
      (prevPageRef.current !== page || prevSizeRef.current !== size)
    ) {
      onPageChange(page, size)
    }

    // Actualiza las referencias previas
    prevPageRef.current = page
    prevSizeRef.current = size
  }, [page, size, onPageChange])

  const nextPage = () => setPage((prev) => prev + 1)
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1))

  return {
    page,
    size,
    setSize,
    prevPage,
    nextPage
  }
}
