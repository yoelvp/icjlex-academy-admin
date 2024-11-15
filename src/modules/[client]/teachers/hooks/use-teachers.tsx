import type { Teacher } from '@/_models/Teacher.model'
import type { Pagination } from '@/@common/types/Pagination'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/teachers-client.service'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'
import { usePagination } from '@/@common/hooks/use-pagination'
import { responseMapper } from '@/@common/utils/response-mapper'
import getError from '@/@common/utils/get-errors'

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[] | null>(null)
  const [paginationState, setPaginationState] = useState<Pagination>(DEFAULT_PAGINATION)
  const pagination = usePagination(paginationState)
  const { isLoading, loaded, loading } = useLoading()

  useEffect(() => {
    getAllTeachers()
  }, [pagination.page, pagination.size])

  const getAllTeachers = async () => {
    try {
      loading()
      const { data: resData, status } = await getAllTeachersService({ ...pagination })

      if (status === HttpStatusCode.Ok) {
        const data = responseMapper(resData)
        setTeachers(data.results)
        setPaginationState(data)
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
    teachers,
    pagination
  }
}
