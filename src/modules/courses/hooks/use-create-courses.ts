import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { UseCourseStore } from '../store/course.store'
import { RegisterCourseForm } from '../types/Course'
import { addCourseService } from '../service/course.service'

export const useCreateCourse = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setCourse = UseCourseStore((state) => state.setCourses)
  const setCourseId = UseCourseStore((state) => state.setCourseId)

  const createCourse = async (course: RegisterCourseForm) => {
    try {
      loading()

      /* const { data: newCourse, status } = await addCourseService(course) */
      const response = await addCourseService(course)

      if (response?.status === 200) {
        // const oldCourse = courses.slice(1)
        setCourse([response.data])

        //almacenamdo en id del curso creado
        setCourseId(response?.data.id ?? '')
        toast.success('Se creó un nuevo curso')

        return response?.data.id
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
    createCourse,
    isLoading
  }
}
