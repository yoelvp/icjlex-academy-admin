import { useEffect } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { usePublishedCoursesStore } from '../store/published-courses.store'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllPublishedCoursesService } from '@/_services/courses.service'
import { responseMapper } from '@/@common/utils/response-mapper'
import getError from '@/@common/utils/get-errors'
import { usePagination } from '@/@common/hooks/use-pagination'

export const useGetPublishedCourses = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setCourses = usePublishedCoursesStore((state) => state.setCourses)
  const setPagination = usePublishedCoursesStore((state) => state.setPagination)
  const coursesPagination = usePublishedCoursesStore((state) => state.pagination)
  const pagination = usePagination(coursesPagination)

  useEffect(() => {
    getAllPublishedCourses()
  }, [pagination.page, pagination.size])

  const getAllPublishedCourses = async () => {
    loading()
    try {
      const { data: responseData, status } = await getAllPublishedCoursesService({ ...pagination })

      if (status === HttpStatusCode.Ok) {
        const data = responseMapper(responseData)
        setCourses(data.results)
        setPagination({ ...data })
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
    pagination
  }
}
