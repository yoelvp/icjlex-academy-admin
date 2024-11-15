import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { UseCourseStore } from '../store/course.store'
import { addCourseService } from '../service/course.service'
import { CourseFormData } from '../types/CourseFormFields'
import { HttpStatusCode, isAxiosError } from 'axios'

export const useCreateCourse = () => {
  const { isLoading, loading, loaded } = useLoading()
  const courses = UseCourseStore((state) => state.courses)
  const setCourses = UseCourseStore((state) => state.setCourses)
  const setCourseId = UseCourseStore((state) => state.setCourseId)

  const createCourse = async (course: CourseFormData) => {
    loading()
    try {
      let oldCourses = courses
      const response = await addCourseService(course)

      if (response?.status === HttpStatusCode.Ok) {
        if (courses.length == 10) {
          oldCourses = courses.slice(0, -1)
        }
        setCourses([response.data, ...oldCourses])

        setCourseId(response?.data.id ?? '')
        toast.success('Se creó un nuevo curso')

        return response?.data.id
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
