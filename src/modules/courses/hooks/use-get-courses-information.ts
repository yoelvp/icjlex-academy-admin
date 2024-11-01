import { useLoading } from '@/@common/hooks/use-loading'
import { getCoursesInformation } from '../service/course.service'
import getError from '@/@common/utils/get-errors'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { CourseInfomation } from '../types/Course'

export const useCoursesInformation = (page: number, size: number) => {
  const [courses, setCourses] = useState<CourseInfomation[] | null>(null)
  const { isLoading, loaded, loading } = useLoading()

  useEffect(() => {
    const getAllCoursesInformation = async () => {
      try {
        loading()
        const { data } = await getCoursesInformation(page, size)
        setCourses(data.results)
      } catch (error) {
        loaded()
        const { message } = getError(error)
        toast.error(message)
      } finally {
        loaded()
      }
    }
    getAllCoursesInformation()
  }, [page, size])

  return { courses, isLoading }
}
