import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { getTeacherByIdService } from '@/modules/teachers/service/docents.service'
import { DocentResult } from '@/modules/teachers/types/Docent'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export const useTeachersById = (id: string | undefined) => {
  const [teachers, setTeachers] = useState<DocentResult | null>(null)
  const { isLoading, loaded, loading } = useLoading()

  useEffect(() => {
    if (!id) return

    const fetchTeachers = async () => {
      try {
        loading()
        const { data } = await getTeacherByIdService(id)
        setTeachers(data)
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

    fetchTeachers()
  }, [id])

  return { teachers, isLoading }
}
