import type { QueryParams } from '@/@common/types/QueryParams'

import { useEffect } from 'react'
import { getAllPreRegisteredStudentsService } from '../services/student.service'
import getError from '@/@common/utils/get-errors'
import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import { useStudentsStore } from '../store/use-students.store'

export const useGetPreRegisteredStudents = (params: QueryParams) => {
  const { isLoading, loading, loaded } = useLoading()
  const setPreRegisteredStudents = useStudentsStore((state) => state.setPreRegisteredStudents)

  useEffect(() => {
    getAllPreRegisteredStudents()
  }, [params.page, params.size, params.query])

  const getAllPreRegisteredStudents = async () => {
    try {
      loading()
      const { data } = await getAllPreRegisteredStudentsService({ page: 1, size: 10 })
      setPreRegisteredStudents(data.results)
    } catch (error) {
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
