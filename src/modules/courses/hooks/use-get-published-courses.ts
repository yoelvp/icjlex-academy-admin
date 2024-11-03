import { useEffect } from 'react'
import { toast } from 'sonner'
import { usePublishedCoursesStore } from '../store/published-courses.store'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllPublishedCoursesService } from '@/_services/courses.service'
import getError from '@/@common/utils/get-errors'

export const useGetPublishedCourses = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setPublishedCourses = usePublishedCoursesStore((state) => state.setCourses)

  useEffect(() => {
    getAllPublishedCourses()
  }, [])

  const getAllPublishedCourses = async () => {
    loading()
    try {
      const { data } = await getAllPublishedCoursesService()
      console.log({ publishedCourses: data })
      setPublishedCourses(data.results)
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
