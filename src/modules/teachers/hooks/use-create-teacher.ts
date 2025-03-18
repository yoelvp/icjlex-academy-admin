import { toast } from "sonner"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { HttpStatusCode, isAxiosError } from "axios"
import { createTeacherService, updateImageTeacherService } from "@/_services/teachers.service"
import { TeacherFormValues } from "@/_models/Teacher.model"

export const useCreateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()

  const createTeacher = async (teacher: TeacherFormValues, image?: File | null) => {
    try {
      loading()
      const { data, status } = await createTeacherService(teacher)
      const { status: updateImageTeacherStatus } = await updateImageTeacherService(data.data.teacherId ?? "", image)

      if (status !== HttpStatusCode.Ok && updateImageTeacherStatus !== HttpStatusCode.Ok) return

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
