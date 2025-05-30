import type { SelectOption } from "@/types"
import { useEffect, useState } from "react"
import { HttpStatusCode, isAxiosError } from "axios"
import { toast } from "sonner"
import { useLoading } from "@/@common/hooks"
import getError from "@/@common/utils/get-errors"
import { getCourseOptionsService } from "@/services/courses.service"

export const useGetAllCourseOptions = () => {
  const [options, setOptions] = useState<SelectOption[]>([])
  const { isLoading, loaded, loading } = useLoading()

  useEffect(() => {
    getAllOptions()
  }, [])

  const getAllOptions = async () => {
    loading()

    try {
      const { data: { data }, status } = await getCourseOptionsService()

      if (status === HttpStatusCode.Ok) {
        setOptions(data?.map((course) => ({
          label: course.name,
          value: course.id
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
