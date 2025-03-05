import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { CourseFormData } from '../types/CourseFormFields'
import { HttpStatusCode, isAxiosError } from 'axios'
import { createCourseService } from '@/_services/admin/courses.service'
import { useNavigate } from 'react-router-dom'

export const useCreateCourse = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()

  const createCourse = async (course: CourseFormData, isScheduled?: boolean) => {
    loading()
    try {
      const response = await createCourseService(course)

      if (response?.status === HttpStatusCode.Ok) {
        if (isScheduled) {
          navigate('/admin/courses/?tab=scheduled')
        } else {
          navigate('/admin/courses')
        }

        toast.success('Se creó un nuevo curso')
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
    createCourse,
    isLoading
  }
}
