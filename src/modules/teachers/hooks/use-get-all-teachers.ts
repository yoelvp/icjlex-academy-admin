import { useEffect } from 'react'
import { toast } from 'sonner'
import { useDocentStore } from '../store/teachers.store'
import { getAllTeachersService } from '../service/docents.service'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'

export const useGetAllTeachers = () => {
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useDocentStore((state) => state.setTeachers)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    loading()
    try {
      const { data } = await getAllTeachersService(1, 9999)
      setTeachers(data.results)
    } catch (error) {
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  return { isLoading }
}
