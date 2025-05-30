import { useEffect, useState } from "react"
import { HttpStatusCode, isAxiosError } from "axios"
import { toast } from "sonner"
import { DEFAULT_PAGINATION } from "@/@common/constants/default-pagination"
import { useLoading, usePagination } from "@/@common/hooks"
import getError from "@/@common/utils/get-errors"
import { getAllStudentsService } from "@/services/students.service"
import { Pagination, Student } from "@/types"

export const useGetAllStudents = () => {
  const [students, setStudents] = useState<Student[] | null>(null)
  const [pagination, setPagination] = useState<Pagination | undefined>(DEFAULT_PAGINATION)
  const { isLoading, loading, loaded } = useLoading()
  const p = usePagination(pagination)

  useEffect(() => {
    getAll()
  }, [p.page, p.perPage])

  const getAll = async () => {
    loading()
    try {
      const { data: { data, pagination: paginationStudents }, status } = await getAllStudentsService()

      if (status === HttpStatusCode.Ok) {
        setStudents(data)
        setPagination(paginationStudents!)
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
    students,
    pagination: p
  }
}
