import type { Course } from '@/_models/Course.model'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { HttpStatus } from '@/_utils/http-status.enum'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllUpcomingCoursesService } from '@/_services/courses-client.service'

export const useGetAllCourses = (params?: object) => {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const { isLoading, loading, loaded } = useLoading()

  useEffect(() => {
    getAllCourses()
  }, [])

  const getAllCourses = async () => {
    try {
      loading()
      const { data: { data }, status } = await getAllUpcomingCoursesService(params)

      if (status === HttpStatus.OK) {
        setCourses(data)
      }
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
    courses
  }
}
