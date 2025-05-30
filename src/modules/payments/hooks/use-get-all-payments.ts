import type { Pagination, PaymentItem } from "@/types"
import { useEffect, useState } from "react"
import { HttpStatusCode, isAxiosError } from "axios"
import { toast } from "sonner"
import { useDebounce, useLoading, usePagination } from "@/@common/hooks"
import getError from "@/@common/utils/get-errors"
import { getAllPaymentsService } from "@/services/payments.service"
import { DEFAULT_PAGINATION } from "@/@common/constants/default-pagination"

export const useGetAllPayments = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([])
  const [pagination, setPagination] = useState<Pagination | undefined>(DEFAULT_PAGINATION)
  const [queryText, setQueryText] = useState<string>("")
  const { isLoading, loaded, loading } = useLoading()
  const paged = usePagination(pagination)
  const debounceQuery = useDebounce({ value: queryText })
  const MAX_ITEMS_PER_PAGE = DEFAULT_PAGINATION.perPage

  useEffect(() => {
    getAll()
  }, [paged.page, paged.perPage, debounceQuery])

  const getAll = async () => {
    loading()

    try {
      const { data: { data, pagination: paginationPayments }, status } = await getAllPaymentsService({
        page: paged.page,
        perPage: paged.perPage,
        q: queryText
      })

      if (status === HttpStatusCode.Ok) {
        setPayments(data)
        if (paginationPayments) setPagination(paginationPayments)
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

  const addNewPayment = (newPayment: PaymentItem) => {
    setPayments((prevState) => {
      const updated = [newPayment, ...prevState]

      return updated.length > MAX_ITEMS_PER_PAGE
        ? updated.slice(0, MAX_ITEMS_PER_PAGE)
        : updated
    })
  }

  const handleSearch = (value: string) => {
    setQueryText(value)
  }

  return {
    isLoading,
    payments,
    pagination: paged,
    addNewPayment,
    handleSearch
  }
}
