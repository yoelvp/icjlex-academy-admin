import { useEffect } from 'react'
import { useDocentStore } from '../store/docents.store'

export const useDocents = () => {
  const {
    docents,
    currentPage,
    totalPages,
    size,
    perPage,
    isLoading,
    error,
    fetchDocents,
    setCurrentPage,
    setSize,
    setPerPage
  } = useDocentStore()

  useEffect(() => {
    fetchDocents(currentPage) // Llama a la API al cargar el componente
  }, [currentPage, size, perPage]) // Ejecuta el fetch si cambian estos valores

  return {
    docents,
    currentPage,
    totalPages,
    size,
    perPage,
    isLoading,
    error,
    setCurrentPage,
    setSize,
    setPerPage
  }
}
