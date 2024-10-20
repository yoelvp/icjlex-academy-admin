import { useEffect } from 'react'
import { getAllActiveStudentsService, getAllPreRegisteredStudentsService } from '../services/student.service'
import getError from '@/@common/utils/get-errors'
import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import { useStudentsStore } from '../store/use-students.store'
import { QueryParams } from '@/@common/types/QueryParams'

export const useGetAllStudents = (activeParams: QueryParams, preRegisteredParams: QueryParams) => {
  const { isLoading: isLoadingActive, loading: loadingActive, loaded: loadedActive } = useLoading()
  const { isLoading: isLoadingPreRegister, loading: loadingPreRegistered, loaded: loadedPreRegistered } = useLoading()
  const setActiveStudents = useStudentsStore((state) => state.setActiveStudents)
  const setPreRegisteredStudents = useStudentsStore((state) => state.setPreRegisteredStudents)

  useEffect(() => {
    getAllActiveStudents()
  }, [activeParams.page, activeParams.size, activeParams.query])

  useEffect(() => {
    getAllPreRegisteredStudents()
  }, [preRegisteredParams.page, preRegisteredParams.size, preRegisteredParams.query])

  const getAllActiveStudents = async () => {
    try {
      loadingActive()
      const { data } = await getAllActiveStudentsService(activeParams)
      setActiveStudents(data.results)
    } catch (error) {
      loadedActive()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loadedActive()
    }
  }

  const getAllPreRegisteredStudents = async () => {
    try {
      loadingPreRegistered()
      const { data } = await getAllPreRegisteredStudentsService(preRegisteredParams)
      setPreRegisteredStudents(data.results)
    } catch (error) {
      loadedPreRegistered()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loadedPreRegistered()
    }
  }

  return {
    isLoadingActive,
    isLoadingPreRegister
  }
}
