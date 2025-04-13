import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { useLoading } from "@/@common/hooks/use-loading"
import { getStudentByIdService } from "@/services/students.service"
import getError from "@/@common/utils/get-errors"
import { Student } from "@/types"

export const useGetStudentById = (studentId: string) => {
  const [student, setStudent] = useState<Student | null>(null)
  const { isLoading, loading, loaded } = useLoading()

  useEffect(() => {
    getById()
  }, [])

  const getById = async () => {
    try {
      loading()
      const { data } = await getStudentByIdService(studentId)
      setStudent(data)
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
    student
  }
}
