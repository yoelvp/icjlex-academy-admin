import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { studentPreRegisteredService } from '../services/student.service'
import { StudentPreRegistrationData } from '../types/Student'
import { useLoading } from '@/@common/hooks/use-loading'
import { useStudentsStore } from '../store/use-students.store'
import { isAxiosError } from 'axios'

export const usePreRegisterStudent = () => {
  const { isLoading, loading, loaded } = useLoading()
  const registeredStudents = useStudentsStore((state) => state.preRegisteredStudents)
  const setRegisteredStudents = useStudentsStore((state) => state.setPreRegisteredStudents)

  const preRegistration = async (student: StudentPreRegistrationData) => {
    loading()
    try {
      const { data, status } = await studentPreRegisteredService(student)

      if (status === 200) {
        setRegisteredStudents([data, ...registeredStudents])
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
    preRegistration
  }
}
