import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { IdParams } from '@/@common/types'
import { getCourseDetailsService } from '@/_services/courses-client.service'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'
import { CourseDetails } from '@/_models/Course.model'
import { isAxiosError } from 'axios'

export const useGetCourseDetails = () => {
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const { isLoading, loading, loaded } = useLoading()
  const params = useParams<IdParams>()

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    loading()
    try {
      const { data } = await getCourseDetailsService(params.id ?? '')
      setCourse(data)
    } catch (error) {
      loaded()
      if (isAxiosError(error)) {
        const { message } = getError(error)
        toast.warning(message)
      }
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    course
  }
}
