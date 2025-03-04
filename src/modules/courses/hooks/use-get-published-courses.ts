import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { usePublishedCoursesStore } from '../store/published-courses.store'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { usePagination } from '@/@common/hooks/use-pagination'
import { getAllCoursesService } from '@/_services/admin/courses.service'
import { useDebounce } from '@/@common/hooks'

export const useGetPublishedCourses = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { isLoading, loading, loaded } = useLoading()
  const setCourses = usePublishedCoursesStore((state) => state.setPublishedCourses)
  const coursesPagination = usePublishedCoursesStore((state) => state.published.pagination)
  const setPagination = usePublishedCoursesStore((state) => state.setPublishedPagination)
  const paginationManager = usePagination(coursesPagination)
  const debounceValue = useDebounce({ value: searchQuery })

  useEffect(() => {
    getAllPublishedCourses()
  }, [debounceValue, paginationManager.page, paginationManager.perPage])

  const getAllPublishedCourses = async () => {
    loading()
    try {
      const { data: { data, pagination }, status } = await getAllCoursesService({
        page: paginationManager.page,
        perPage: paginationManager.perPage,
        q: searchQuery,
        status: 'published'
      })

      if (status === HttpStatusCode.Ok) {
        setCourses(data)
        setPagination(pagination!)
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

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value)
  }

  return {
    isLoading,
    pagination: paginationManager,
    search: updateSearchQuery
  }
}
