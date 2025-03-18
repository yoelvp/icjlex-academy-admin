import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useTeachersStore } from "../store/teachers.store"
import getError from "@/@common/utils/get-errors"
import { useLoading } from "@/@common/hooks/use-loading"
import { getAllTeachersService } from "@/_services/teachers.service"
import { AxiosError } from "axios"
import { useDebounce, usePagination } from "@/@common/hooks"

export const useGetAllTeachers = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { isLoading, loading, loaded } = useLoading()
  const setTeachers = useTeachersStore((state) => state.setTeachers)
  const teacherPagination = useTeachersStore((state) => state.pagination)
  const setPagination = useTeachersStore((state) => state.setPagination)
  const paginationManager = usePagination(teacherPagination)
  const debounceValue = useDebounce({ value: searchQuery })

  useEffect(() => {
    getAll()
  }, [debounceValue, paginationManager.page, paginationManager.perPage])

  const getAll = async () => {
    loading()
    try {
      const { data: { data, pagination } } = await getAllTeachersService({
        page: paginationManager.page,
        perPage: paginationManager.perPage,
        q: searchQuery
      })
      setTeachers(data)
      setPagination(pagination)
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = getError(error)
        toast.error(message)
      }
    } finally {
      loaded()
    }
  }

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value)
  }

  return {
    isLoading,
    pagination: paginationManager,
    search: updateSearchQuery
  }
}
