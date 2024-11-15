import { useEffect } from 'react'
import { toast } from 'sonner'
import { useTeacherStore } from '../store/teachers.store'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/teachers.service'
import { AxiosError } from 'axios'
import { usePagination } from '@/@common/hooks'

export const useGetAllTeachers = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeacherStore((state) => state.setTeachers)
  const teacherPagination = useTeacherStore((state) => state.pagination)
  const setPagination = useTeacherStore((state) => state.setPagination)
  const paginationManager = usePagination(teacherPagination)

  useEffect(() => {
    fetchTeachers()
  }, [paginationManager.page, paginationManager.perPage])

  const fetchTeachers = async () => {
    loading()
    try {
      const { data: { data, pagination } } = await getAllTeachersService({
        page: paginationManager.page,
        perPage: paginationManager.perPage
      })
      setTeachers(data)
      setPagination(pagination)
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    pagination: paginationManager
  }
}
