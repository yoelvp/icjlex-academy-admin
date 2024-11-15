import { useEffect } from 'react'
import { toast } from 'sonner'
import { useTeacherStore } from '../store/teachers.store'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { getAllTeachersService } from '@/_services/teachers.service'
import { AxiosError } from 'axios'

export const useGetAllTeachers = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeacherStore((state) => state.setTeachers)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    loading()
    try {
      const { data } = await getAllTeachersService(1, 9999)
      setTeachers(data.results)
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  return { isLoading }
}
