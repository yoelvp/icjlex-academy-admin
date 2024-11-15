import type { UpdateStudent } from '../types/UpdateStudent'

import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { updateMainDataService } from '@/_services/students.service'
import { useAuth } from '@/@auth/hooks/use-auth'
import { HttpStatusCode, isAxiosError } from 'axios'

export const useUpdateData = () => {
  const { login } = useAuth()
  const { isLoading, loading, loaded } = useLoading()

  const updateMainData = async (userId: string, dataToUpdate: UpdateStudent) => {
    try {
      loading()
      const { data, status } = await updateMainDataService(userId, dataToUpdate)
      console.log(data)

      if (status === HttpStatusCode.Ok) {
        toast.success('Los datos principales de su cuenta fueron actualizados con éxito')
        await login({ email: data.user.email, password: dataToUpdate.password })
      }
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
    updateMainData
  }
}
