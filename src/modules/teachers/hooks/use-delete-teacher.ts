import { useLoading } from "@/@common/hooks"
import { useTeacherStore } from "../store"
import { HttpStatusCode, isAxiosError } from "axios"
import getError from "@/@common/utils/get-errors"
import { toast } from "sonner"
import { deleteTeacherService } from "@/_services/teachers.service"

export const useDeleteTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()
  const teachers = useTeacherStore((state) => state.teachers)
  const setTeachers = useTeacherStore((state) => state.setTeachers)

  const deleteTeacher = async (teacherId: string) => {
    loading()
    try {
      const { data: { data }, status } = await deleteTeacherService(teacherId)
      if (status === HttpStatusCode.Ok) {
        const newTeachers = teachers.filter((teacher) => teacher.id !== data.teacherId)
        setTeachers(newTeachers)
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
    deleteTeacher
  }
}
