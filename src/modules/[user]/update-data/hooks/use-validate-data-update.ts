import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { useEffect } from 'react'
import { validateDataUpdateService } from '@/_services/students.service'
import { HttpStatusCode } from 'axios'

export const useValidateDataUpdate = (userId: string | null, _token?: string | null) => {
  const { isLoading, loading, loaded } = useLoading()
  const navigate = useNavigate()

  useEffect(() => {
    validateDataUpdate()
  }, [])

  const validateDataUpdate = async () => {
    try {
      loading()
      const { data, status } = await validateDataUpdateService(userId ?? '')
      console.log(data)
      console.log(status)

      if (status === HttpStatusCode.Ok) {
        if (data.isUpdated) {
          toast.info('Los datos de su cuenta ya fueron actualizados, puede utilizar su cuenta sin problemas.')
          navigate('/auth/login', { replace: true })
        }
      }
    } catch (error) {
      loaded()
      const { message, status: statusCode } = getError(error)
      toast.error(message)
      if (statusCode === HttpStatusCode.NotFound) {
        toast.info('El usuario no fue encontrado')
        navigate('/', { replace: true })
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    validateDataUpdate
  }
}
