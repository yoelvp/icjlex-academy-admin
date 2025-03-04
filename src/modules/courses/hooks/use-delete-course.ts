import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useCoursesStore } from '../store/courses.store'
import { deleteCourseService } from '@/_services/admin/courses.service'

export const useDeleteCourse = () => {
  const { isLoading, loading, loaded } = useLoading()
  const publishedCourses = useCoursesStore((state) => state.published.courses)
  const setPublishedCourses = useCoursesStore((state) => state.setPublishedCourses)

  const deletePublishedCourse = async (courseId: string) => {
    loading()
    try {
      const { status, data: { message } } = await deleteCourseService(courseId)

      if (status === HttpStatusCode.Ok) {
        setPublishedCourses(publishedCourses?.filter((course) => course.id !== courseId) ?? [])

        toast.success(message)
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
    deletePublishedCourse,
    isLoading
  }
}
