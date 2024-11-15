import { useEffect } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useTeacherStore } from '../store/teachers.store'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/teachers.service'
import { usePagination } from '@/@common/hooks/use-pagination'
import { responseMapper } from '@/@common/utils/response-mapper'
import getError from '@/@common/utils/get-errors'

export const useDocents = (page: number, size: number) => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeacherStore((state) => state.setTeachers)
  const setPagination = useTeacherStore((state) => state.setPagination)
  const pagination = useTeacherStore((state) => state.pagination)
  const paging = usePagination(pagination)

  useEffect(() => {
    getAllTeachers()
  }, [page, size])

  const getAllTeachers = async () => {
    loading()
    try {
      const { data: resData, status } = await getAllTeachersService(page, size)

      if (status === HttpStatusCode.Ok) {
        const data = responseMapper(resData)
        setTeachers(data.results)

        setPagination(data)
      }
    } catch (error) {
      loaded()
      if (isAxiosError(error)) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    pagination: paging
  }
}
