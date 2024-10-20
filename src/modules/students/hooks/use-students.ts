import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { deleteStudentService, getStudentByIdService } from '../services/student.service'
import { useLoading } from '@/@common/hooks/use-loading'
import { StudentType } from '../types/Student'
import { useStudentsStore } from '../store/use-students.store'

export const useStudents = () => {
  const { isLoading, loading, loaded } = useLoading()
  const activeStudents = useStudentsStore((state) => state.activeStudents)
  const setActiveStudents = useStudentsStore((state) => state.setActiveStudents)
  const registeredStudents = useStudentsStore((state) => state.preRegisteredStudents)
  const setPreRegisteredStudents = useStudentsStore((state) => state.setPreRegisteredStudents)

  const getStudentById = async (studentId: string) => {
    try {
      loading()
      const { data, status, statusText } = await getStudentByIdService(studentId)

      if (status === 200) {
        console.log(data)
      }

      if (status !== 200) {
        toast.warning(statusText)
      }
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.error(message)
    } finally {
      loaded()
    }
  }

  const deleteStudent = async (studentId: string, studentType: StudentType) => {
    try {
      loading()
      const { status } = await deleteStudentService(studentId)

      if (status === 200) {
        if (studentType === 'active') {
          setActiveStudents(activeStudents.filter((student) => student.id !== studentId))
        }

        if (studentType === 'registered') {
          setPreRegisteredStudents(registeredStudents.filter((student) => student.id !== studentId))
        }
      }
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.success(message)
    } finally {
      loaded()
    }
  }

  return {
    isLoading,
    getStudentById,
    deleteStudent
  }
}
