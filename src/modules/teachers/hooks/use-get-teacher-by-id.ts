import { useState } from "react"
import { toast } from "sonner"
import { HttpStatusCode, isAxiosError } from "axios"
import { useLoading } from "@/@common/hooks"
import getError from "@/@common/utils/get-errors"
import { Teacher } from "@/_models/Teacher.model"
import { getTeacherByIdService } from "@/_services/teachers.service"

export const useGetTeacherById = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const { isLoading, loading, loaded } = useLoading()

  const getById = async (teacherId: string) => {
    loading()
    try {

      const { data: { data, message }, status } = await getTeacherByIdService(teacherId)

      if (status !== HttpStatusCode.Ok) {
        toast.warning(message)
      }

      setTeacher(data)
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
    teacher,
    getById
  }
}
