import { toast } from 'sonner'
import getError from '@/@common/utils/get-errors'
import { useLoading } from '@/@common/hooks/use-loading'
import { StudentType } from '../types/Student'
import { useStudentsStore } from '../store/use-students.store'
import {
  assignCourseToStudentService,
  deleteStudentService
} from '@/_services/students.service'

export const useStudents = () => {
  const { isLoading, loading, loaded } = useLoading()
  const activeStudents = useStudentsStore((state) => state.activeStudents)
  const setActiveStudents = useStudentsStore((state) => state.setActiveStudents)
  const registeredStudents = useStudentsStore((state) => state.preRegisteredStudents)
  const setPreRegisteredStudents = useStudentsStore((state) => state.setPreRegisteredStudents)

  const assignCourseToStudent = async (studentId: string, courseId: string) => {
    try {
      loading()
      const { status } = await assignCourseToStudentService(studentId, courseId)

      if (status === 200) {
        setActiveStudents(activeStudents.filter((student) => student.id !== studentId))
      }
    } catch (error) {
      loaded()
      const { message } = getError(error)
      toast.success(message)
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
    assignCourseToStudent,
    deleteStudent
  }
}
