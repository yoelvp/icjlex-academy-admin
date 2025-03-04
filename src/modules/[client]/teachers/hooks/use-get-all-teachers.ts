import type { Teacher } from '@/_models/Teacher'
import type { Pagination } from '@/@common/types/Pagination'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/client/teachers-client.service'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'
import { usePagination } from '@/@common/hooks/use-pagination'
import getError from '@/@common/utils/get-errors'

export const useGetAllTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[] | null>(null)
  const [paginationState, setPaginationState] = useState<Pagination>(DEFAULT_PAGINATION)
  const { isLoading, loaded, loading } = useLoading()
  const pagination = usePagination(paginationState)

  useEffect(() => {
    getAll()
  }, [pagination.page, pagination.perPage])

  const getAll = async () => {
    try {
      loading()
      const { data: { data, pagination }, status } = await getAllTeachersService({
        page: 1,
        size: 9
      })

      if (status === HttpStatusCode.Ok) {
        setTeachers(data)
        setPaginationState(pagination)
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
