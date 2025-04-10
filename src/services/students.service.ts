import { axios } from "@/lib"
import { Response, Student } from "@/types"
import { HttpStatusCode, isAxiosError } from "axios"

export const getAllStudentsService = async () => {
  try {
    const response = await axios.get<Response<Student[]>>("/admin/students")

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "Error desconocido"
      const status = error.response?.status || HttpStatusCode.InternalServerError

      throw new Error(`[${status}] ${message}`)
    }
  }
}
