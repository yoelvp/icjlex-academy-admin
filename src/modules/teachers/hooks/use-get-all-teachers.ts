import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useTeacherStore } from '../store/teachers.store'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/teachers.service'
import { AxiosError } from 'axios'
import { useDebounce, usePagination } from '@/@common/hooks'

export const useGetAllTeachers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeacherStore((state) => state.setTeachers)
  const teacherPagination = useTeacherStore((state) => state.pagination)
  const setPagination = useTeacherStore((state) => state.setPagination)
  const paginationManager = usePagination(teacherPagination)
  const debounceValue = useDebounce({ value: searchQuery })

  useEffect(() => {
    fetchTeachers()
  }, [debounceValue, paginationManager.page, paginationManager.perPage])

  const fetchTeachers = async () => {
    loading()
    try {
      const { data: { data, pagination } } = await getAllTeachersService({
        page: paginationManager.page,
        perPage: paginationManager.perPage,
        q: searchQuery
      })
      setTeachers(data)
      if (data.length > 0) {
        setPagination(pagination)
      } else {
        setPagination({
          ...pagination,
          page: 1
        })
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value)
  }

  return {
    isLoading,
    pagination: paginationManager,
    search: updateSearchQuery
  }
}
