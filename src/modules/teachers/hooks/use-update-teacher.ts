import type { UpdateTeacherData } from '@/_types/TeacherField'

import { toast } from 'sonner'
import { HttpStatusCode, isAxiosError } from 'axios'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { useTeacherStore } from '../store/teachers.store'
import { updateTeacherService } from '@/_services/teachers.service'

export const useUpdateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()
  const teachers = useTeacherStore((state) => state.teachers)
  const setTeachers = useTeacherStore((state) => state.setTeachers)

  const updateTeacher = async (teacher: UpdateTeacherData) => {
    try {
      loading()
      const { data: { data: newTeacher, success, message }, status } = await updateTeacherService(teacher)
      let oldTeachers = teachers

      if (!success) toast.warning(message)
      if (status !== HttpStatusCode.Ok) return

      if (teachers.length == 10) {
        oldTeachers = teachers.slice(0, -1)
      }

      setTeachers([newTeacher, ...oldTeachers])
      toast.success('Registro actualizado', { description: 'Loda datos del docente se actualizaron con éxito' })
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
