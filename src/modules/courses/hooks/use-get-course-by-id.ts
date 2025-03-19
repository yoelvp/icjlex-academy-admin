import { toast } from "sonner"
import { HttpStatusCode, isAxiosError } from "axios"
import { useLoading } from "@/@common/hooks/use-loading"
import getError from "@/@common/utils/get-errors"
import { getCourseByIdService } from "@/_services/courses.service"
import { useState } from "react"
import { CourseDetails } from "@/_models/Course.model"

export const useGetCourseById = () => {
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const { isLoading, loading, loaded } = useLoading()

  const getCourseById = async (courseId: string) => {
    loading()
    try {
      const { data: { data }, status } = await getCourseByIdService(courseId)

      if (status === HttpStatusCode.Ok) {
        setCourse(data)
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
    course,
    getCourseById
  }
}
