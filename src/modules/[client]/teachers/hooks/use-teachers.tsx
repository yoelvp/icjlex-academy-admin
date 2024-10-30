import { getAllTeachersService } from '@/modules/teachers/service/docents.service'
import { DocentResult } from '@/modules/teachers/types/Docent'
import { useEffect, useState } from 'react'
import { useLoading } from '@/@common/hooks/use-loading'
import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'

export const useTeachers = (page: number, size: number) => {
  const [teachers, setTeachers] = useState<DocentResult[] | null>(null)
  const { isLoading, loaded, loading } = useLoading()

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        loading()
        const { data } = await getAllTeachersService(page, size)
        setTeachers(data.results)
      } catch (error) {
        loaded()
        const { message } = getError(error)
        toast.error(message)
      } finally {
        loaded()
      }
    }

    fetchTeachers()
  }, [page, size])

  return { teachers, isLoading }
}
