import type { TeacherData } from '../types/Docent'
import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { useDocentStore } from '../store/teachers.store'
import { HttpStatusCode } from 'axios'
import { createTeacherService } from '@/_services/teachers.service'

export const useCreateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()
  const teachers = useDocentStore((state) => state.teachers)
  const setTeachers = useDocentStore((state) => state.setTeachers)

  const createTeacher = async (docent: TeacherData) => {
    try {
      loading()
      const { data: newTeacher, status } = await createTeacherService(docent)

      if (status === HttpStatusCode.Ok) {
        const oldTeachers = teachers.slice(0, -1)
        setTeachers([newTeacher, ...oldTeachers])
        toast.success('Se creó un nuevo docente')
      }
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    createTeacher,
    isLoading
  }
}
