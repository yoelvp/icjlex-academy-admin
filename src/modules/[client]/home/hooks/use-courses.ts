import type { Course } from '@/_models/Course.model'

import { useState } from 'react'
import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { getCoursesService } from '@/_services/courses.service'
import { HttpStatus } from '@/_utils/http-status.enum'
import { useLoading } from '@/@common/hooks/use-loading'

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[] | null>(null)
  const { isLoading: isLoadingCourses, loading: loadingCourses, loaded: loadedCourses } = useLoading()

  const getAllCourses = async () => {
    try {
      loadingCourses()
      const { data, status } = await getCoursesService()

      if (status === HttpStatus.OK) {
        setCourses(data)
      }
    } catch (error) {
      loadedCourses()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loadedCourses()
    }
  }

  return {
    isLoadingCourses,
    courses,
    getAllCourses
  }
}
