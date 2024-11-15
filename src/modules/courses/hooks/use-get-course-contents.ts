import { useEffect } from 'react'
import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { getAllCoursesContentsService } from '@/_services/courses.service'
import { useCourseContentsStore } from '../store/course-contents.store'

export const useGetCourseContents = (courseId: string) => {
  const { isLoading, loading, loaded } = useLoading()
  const setCourseContents = useCourseContentsStore((state) => state.setContents)

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    loading()
    try {
      const { data, status } = await getAllCoursesContentsService(courseId)

      if (status === HttpStatusCode.Ok) {
        setCourseContents(data.results)
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
    isLoading
  }
}
