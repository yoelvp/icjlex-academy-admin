import { useEffect } from 'react'
import { getAllActiveStudentsService } from '../services/student.service'
import getError from '@/@common/utils/get-errors'
import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import { useStudentsStore } from '../store/use-students.store'
import { QueryParams } from '@/@common/types/QueryParams'

export const useGetActiveStudents = (params: QueryParams) => {
  const { isLoading, loading, loaded } = useLoading()
  const setActiveStudents = useStudentsStore((state) => state.setActiveStudents)

  useEffect(() => {
    getAllActiveStudents()
  }, [params.page, params.size, params.query])

  const getAllActiveStudents = async () => {
    try {
      loading()
      const { data } = await getAllActiveStudentsService({ page: 1, size: 10 })
      setActiveStudents(data.results)
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading
  }
}
