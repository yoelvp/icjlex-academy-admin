import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { getCourseByIdService } from '@/_services/admin/courses.service'
import { useCourseStore } from '../store/course.store'

export const useGetCourseById = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setCourse = useCourseStore((state) => state.setCourse)

  const getCourseById = async (courseId: string) => {
    loading()
    try {
      const { data: { data }, status } = await getCourseByIdService(courseId)

      if (status === HttpStatusCode.Ok) {
        setCourse(data)
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
    getCourseById
  }
}
