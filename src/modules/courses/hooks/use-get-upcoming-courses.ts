import { useEffect } from 'react'
import { toast } from 'sonner'
import { useUpcomingCoursesStore } from '../store/upcoming-courses.store'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllUpcomingCoursesService } from '@/_services/courses.service'
import getError from '@/@common/utils/get-errors'

export const useGetUpcomingCourses = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setUpcomingCourses = useUpcomingCoursesStore((state) => state.setCourses)

  useEffect(() => {
    getAllUpcomingCourses()
  }, [])

  const getAllUpcomingCourses = async () => {
    loading()
    try {
      const { data } = await getAllUpcomingCoursesService()
      console.log({ upcomingCourses: data })
      setUpcomingCourses(data.results)
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading
  }
}
