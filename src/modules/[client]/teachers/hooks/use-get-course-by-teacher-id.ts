import type { Course } from '@/_models/Course.model'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getCoursesService } from '@/_services/courses.service'
import { useLoading } from '@/@common/hooks/use-loading'
import { usePagination } from '@/@common/hooks/use-pagination'
import { Pagination } from '@/@common/types/Pagination'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'
import { responseMapper } from '@/@common/utils/response-mapper'
import getError from '@/@common/utils/get-errors'
import { HttpStatusCode, isAxiosError } from 'axios'

export const useGetCoursesByTeacherId = () => {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [paginationState, setPaginationState] = useState<Pagination>(DEFAULT_PAGINATION)
  const pagination = usePagination(paginationState)
  const { isLoading, loading, loaded } = useLoading()

  useEffect(() => {
    getAllCourses()
  }, [pagination.page, pagination.size])

  const getAllCourses = async () => {
    try {
      loading()
      const { data: resData, status } = await getCoursesService()

      if (status === HttpStatusCode.Ok) {
        const data = responseMapper(resData)
        setCourses(data.results)
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
    courses,
    pagination
  }
}
