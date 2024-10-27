import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { UseCourseStore } from '../../store/course.store'
import { ContentCourse } from '../../types/Course'
import { addContentFromService } from '../../service/content-from-course.service'

export const useCreateContentFromCourse = () => {
  const { isLoading, loading, loaded } = useLoading()
  const courseId = UseCourseStore((state) => state.courseId) // Obtén el courseId del store

  const addContent = async (content: ContentCourse) => {
    if (!courseId) {
      toast.error('No se ha creado un curso para crear el contenido!')

      return // Sal de la función si no hay courseId
    }

    try {
      loading() // Comienza el loading
      const { status } = await addContentFromService(courseId, content) // Usa courseId

      if (status === 200) {
        toast.success('Contenido agregado exitosamente!')
      }
    } catch (error) {
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded() // Termina el loading
    }
  }

  return {
    addContent,
    isLoading
  }
}
