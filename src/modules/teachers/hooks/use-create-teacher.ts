import { toast } from "sonner"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { HttpStatusCode, isAxiosError } from "axios"
import { createTeacherService } from "@/_services/teachers.service"
import { TeacherFormValues } from "@/_models/Teacher"

export const useCreateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()

  const createTeacher = async (docent: TeacherFormValues) => {
    try {
      loading()
      const { status } = await createTeacherService(docent)

      if (status !== HttpStatusCode.Ok) return

      toast.success("Registro exitoso", { description: "El profesor fue registrado con éxito" })
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
    createTeacher,
    isLoading
  }
}
