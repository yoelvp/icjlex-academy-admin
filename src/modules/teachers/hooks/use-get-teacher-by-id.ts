import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { getTeacherByIdService } from '@/_services/teachers.service'
import { useUpdateTeacherStore } from '../store'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'

export const useGetTeacherById = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeacher = useUpdateTeacherStore((state) => state.setTeacher)

  const getTeacherById = async (teacherId: string) => {
    loading()

    try {
      const { data: { data } } = await getTeacherByIdService(teacherId)
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
    getTeacherById
  }
}
