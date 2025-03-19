import { useNavigate } from "react-router"
import { toast } from "sonner"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { HttpStatusCode, isAxiosError } from "axios"
import { updateCourseService, updateImageCourseService } from "@/_services/courses.service"
import { CourseFormValues } from "@/_models/Course.model"

export const useUpdateCourse = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()

  const updateCourse = async (course: CourseFormValues, courseId: string, file?: File | null, isScheduled?: boolean) => {
    loading()

    try {
      const { data: { data, message }, status } = await updateCourseService(course, courseId)
      const { data: { message: updateImageMessage }, status: updateImageStatus } = await updateImageCourseService(data?.courseId ?? courseId, file)

      if (status !== HttpStatusCode.Ok && updateImageStatus !== HttpStatusCode.Ok) {
        toast.warning(message)
        toast.warning(updateImageMessage)
      } else {
        if (isScheduled) {
          navigate("/admin/courses/?tab=scheduled")
        } else {
          navigate("/admin/courses")
        }

        toast.success("Se actualizó el curso")
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

  const updateImageCourse = async (courseId: string, file?: File | null) => {
    loading()

    try {
      const { data: { message }, status } = await updateImageCourseService(courseId, file)

      if (status !== HttpStatusCode.Ok) {
        toast.warning(message)
      } else {
        toast.success("Se actualizó la imagen del curso", { description: "Recargue para ver los cambio" })
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
    updateCourse,
    updateImageCourse,
    isLoading
  }
}
