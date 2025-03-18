import { toast } from "sonner"
import { HttpStatusCode, isAxiosError } from "axios"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { updateImageTeacherService, updateTeacherService } from "@/_services/teachers.service"
import { TeacherFormValues } from "@/_models/Teacher.model"

export const useUpdateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()

  const updateTeacher = async (teacherId: string, teacher: TeacherFormValues, file?: File | null) => {
    try {
      loading()
      const { data: { data, success, message }, status } = await updateTeacherService(teacherId, teacher)
      const { status: updateImageStatus } = await updateImageTeacherService(data.teacherId ?? "", file)

      if (!success) toast.warning(message)

      if (status !== HttpStatusCode.Ok && updateImageStatus !== HttpStatusCode.Ok) return

      toast.success("Registro actualizado", { description: "Loda datos del docente se actualizaron con éxito" })
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
    updateTeacher,
    isLoading
  }
}
