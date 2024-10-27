import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { UseCourseStore } from '../store/course.store'
import { Course } from '../types/Course'
import { addCourseService } from '../service/course.service'

export const useCreateCourse = () => {
  const { isLoading, loading, loaded } = useLoading()
  // const courses = UseCourseStore((state) => state.courses)
  const setCourse = UseCourseStore((state) => state.setCourses)
  const setCourseId = UseCourseStore((state) => state.setCourseId)

  const createCourse = async (course: Course) => {
    try {
      loading()

      const { data: newCourse, status } = await addCourseService(course)

      console.log({ newCourse })

      if (status === 200) {
        // const oldCourse = courses.slice(1)
        setCourse([newCourse])

        //almacenamdo en id del curso creado
        setCourseId(newCourse.id)
        toast.success('Se creó un nuevo curso')

        return newCourse.id
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
