import { useNavigate } from "react-router"
import { toast } from "sonner"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { HttpStatusCode, isAxiosError } from "axios"
import { createCourseService, updateImageCourseService } from "@/_services/courses.service"
import { CourseFormValues } from "@/_models/Course.model"

export const useCreateCourse = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()

  const createCourse = async (course: CourseFormValues, file?: File | null, isScheduled?: boolean) => {
    loading()
    try {
      const { data: { data, message }, status } = await createCourseService(course)
      const { data: { message: updateImageMessage }, status: updateImageStatus } = await updateImageCourseService(data?.courseId ?? "", file)

      if (status !== HttpStatusCode.Ok && updateImageStatus !== HttpStatusCode.Ok) {
        toast.warning(message)
        toast.warning(updateImageMessage)
      } else {
        if (isScheduled) {
          navigate("/admin/courses/?tab=scheduled")
        } else {
          navigate("/admin/courses")
        }

        toast.success("Se creó un nuevo curso")
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
