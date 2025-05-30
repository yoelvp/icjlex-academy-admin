import { useLoading } from "@/@common/hooks"
import { getFullName } from "@/@common/utils"
import getError from "@/@common/utils/get-errors"
import { getAllStudentOptionsService } from "@/services/students.service"
import { SelectOption } from "@/types"
import { HttpStatusCode, isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const useGetAllStudentOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([])
  const { isLoading, loaded, loading } = useLoading()

  useEffect(() => {
    getAllOptions()
  }, [])

  const getAllOptions = async () => {
    loading()

    try {
      const { data: { data }, status } = await getAllStudentOptionsService()

      if (status === HttpStatusCode.Ok) {
        setOptions(data?.map((student) => ({
          label: getFullName(student),
          value: student.id
        })) ?? [])
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
    options
  }
}
