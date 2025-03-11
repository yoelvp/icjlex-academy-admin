import { HttpStatusCode, isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useLoading } from '@/@common/hooks'
import getError from '@/@common/utils/get-errors'
import { publishCourseService } from '@/_services/admin/courses.service'

export const usePublishCourse = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()

  const publishCourse = async (courseId: string) => {
    loading()
    try {
      const { status } = await publishCourseService(courseId)

      if (status === HttpStatusCode.Ok) {
        navigate('/admin/courses/')
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
    publishCourse
  }
}
