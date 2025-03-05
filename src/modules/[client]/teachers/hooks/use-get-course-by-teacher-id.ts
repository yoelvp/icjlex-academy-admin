import type { Course } from '@/_models/Course.model'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import { usePagination } from '@/@common/hooks/use-pagination'
import { Pagination } from '@/@common/types/Pagination'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'
import getError from '@/@common/utils/get-errors'
import { HttpStatusCode, isAxiosError } from 'axios'
import { getAllCoursesService } from '@/_services/admin/courses.service'

export const useGetCoursesByTeacherId = () => {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const [paginationState, setPaginationState] = useState<Pagination>(DEFAULT_PAGINATION)
  const pagination = usePagination(paginationState)
  const { isLoading, loading, loaded } = useLoading()

  useEffect(() => {
    getAllCourses()
  }, [])

  const getAllCourses = async () => {
    try {
      loading()
      const { data: resData, status } = await getAllCoursesService()

      if (status === HttpStatusCode.Ok) {
        // setCourses(data.results)
        // setPaginationState(data)
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
