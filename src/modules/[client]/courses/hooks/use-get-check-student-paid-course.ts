import type { ValidateStudentHasPaidCourse } from '@/_models/Student.model'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { validateStudentHasPaidCourseService } from '@/_services/students-client.service'
import { useUserStore } from '@/@auth/store/use-user.store'
import { useTokenStore } from '@/@auth/store/use-token.store'
import { useLoading } from '@/@common/hooks/use-loading'
import getError from '@/@common/utils/get-errors'

export const useGetCheckStudentPaidCourse = () => {
  const [paidCourse, setPaidCourse] = useState<ValidateStudentHasPaidCourse | null>(null)
  const { id } = useParams()
  const { isLoading, loading, loaded } = useLoading()
  const user = useUserStore((state) => state.user)
  const token = useTokenStore((state) => state.token)

  useEffect(() => {
    getVerifiedStudentPaidCourse()
  }, [])

  const getVerifiedStudentPaidCourse = async () => {
    loading()
    try {
      if (user && token) {
        const { data: { data } } = await validateStudentHasPaidCourseService(id ?? '')

        if (data) {
          setPaidCourse(data)
        }
      }
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.warning(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    paidCourse
  }
}
