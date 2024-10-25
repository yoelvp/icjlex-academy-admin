import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import { getStudentByIdService } from '@/_services/students.service'
import getError from '@/@common/utils/get-errors'
import { useStudentsStore } from '../store/use-students.store'

export const useGetByIdStudent = (userId: string) => {
  const { isLoading, loading, loaded } = useLoading()
  const setStudent = useStudentsStore((state) => state.setActiveStudent)

  const getById = async () => {
    try {
      loading()
      const { data } = await getStudentByIdService(userId)
      setStudent(data)
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    getById
  }
}
