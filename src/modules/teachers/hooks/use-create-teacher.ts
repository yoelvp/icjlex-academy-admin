import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { addDocentService } from '../service/docents.service'
import { Docent } from '../types/Docent'
import { useLoading } from '@/@common/hooks/use-loading'
import { useDocentStore } from '../store/teachers.store'

export const useCreateTeacher = () => {
  const { isLoading, loading, loaded } = useLoading()
  const teachers = useDocentStore((state) => state.teachers)
  const setTeachers = useDocentStore((state) => state.setTeachers)

  const createTeacher = async (docent: Docent) => {
    try {
      loading()

      const { data: newTeacher, status } = await addDocentService(docent)

      console.log({ newTeacher })

      if (status === 200) {
        const oldTeachers = teachers.slice(1)
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
