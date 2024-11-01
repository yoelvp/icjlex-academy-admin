import { useEffect } from 'react'
import { toast } from 'sonner'
import { useDocentStore } from '../store/teachers.store'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/teachers.service'

export const useDocents = (page: number, size: number) => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useDocentStore((state) => state.setTeachers)
  const setPagination = useDocentStore((state) => state.setPagination)
  const pagination = useDocentStore((state) => state.pagination)

  useEffect(() => {
    getAllTeachers()
  }, [page, size])

  const getAllTeachers = async () => {
    loading()
    try {
      const { data } = await getAllTeachersService(page, size)
      setTeachers(data.results)
      setPagination({
        count: data.count,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        size: data.size
      })
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    pagination
  }
}
