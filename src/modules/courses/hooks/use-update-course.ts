import { useNavigate } from "react-router"
import { toast } from "sonner"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { HttpStatusCode, isAxiosError } from "axios"
import { updateCourseService } from "@/_services/courses.service"
import { CourseFormData } from "@/_models/Course.model"

export const useUpdateCourse = () => {
  const navigate = useNavigate()
  const { isLoading, loading, loaded } = useLoading()

  const updateCourse = async (course: CourseFormData, courseId: string, isScheduled?: boolean) => {
    loading()
    try {
      const response = await updateCourseService(course, courseId)

      if (response?.status === HttpStatusCode.Ok) {
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

  return {
    updateCourse,
    isLoading
  }
}
