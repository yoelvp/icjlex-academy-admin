import { toast } from "sonner"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { useTeacherStore } from "../store/teachers.store"
import { HttpStatusCode, isAxiosError } from "axios"
import { createTeacherService } from "@/_services/teachers.service"
import { TeacherFormValues } from "@/_models/Teacher"

export const useCreateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()
  const teachers = useTeacherStore((state) => state.teachers)
  const setTeachers = useTeacherStore((state) => state.setTeachers)

  const createTeacher = async (docent: TeacherFormValues) => {
    try {
      loading()
      const { data: { data: newTeacher }, status } = await createTeacherService(docent)
      let oldTeachers = teachers

      if (status !== HttpStatusCode.Ok) return

      if (teachers.length == 10) {
        oldTeachers = teachers.slice(0, -1)
      }

      setTeachers([newTeacher, ...oldTeachers])
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
