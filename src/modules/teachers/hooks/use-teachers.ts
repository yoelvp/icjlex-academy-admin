import { toast } from "sonner"
import { HttpStatusCode, isAxiosError } from "axios"
import { useLoading } from "@/@common/hooks/use-loading"
import getError from "@/@common/utils/get-errors"
import { updateImageTeacherService } from "@/_services/teachers.service"
import { useTeachersStore } from "../store/teachers.store"

export const useTeachers = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeachersStore((state) => state.setTeachers)
  const teachers = useTeachersStore((state) => state.teachers)

  const updateImage = async (teacherId: string, file?: File | null) => {
    try {
      loading()
      const { data, status } = await updateImageTeacherService(teacherId, file)

      if (status === HttpStatusCode.Ok) {
        const updatedTeachers = teachers.map((teacher) => teacher.id === data.teacherId ? { ...teacher, imageUrl: data.imageUrl ?? "" } : teacher)
        setTeachers(updatedTeachers)
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
    updateImage
  }
}
