import { useEffect } from 'react'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersOnlyNamesService } from '@/_services/admin/teachers.service'
import { useTeachersOnlyNamesStore } from '../store/teachers-only-name.store'

export const useGetAllTeachersOnlyNames = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeachersOnlyNamesStore((state) => state.setTeachers)

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    loading()
    try {
      const { data: { data } } = await getAllTeachersOnlyNamesService()
      setTeachers(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading
  }
}
