import type { Response } from "@/@common/types/Response"

import { axios } from "@/lib"
import { HttpStatusCode, isAxiosError } from "axios"
import { AssignCourse, CourseOption } from "@/types"

export const getAllCourseOptionsService = async (params?: { page: number, perPage: number }) => {
  try {
    const response = await axios.get<Response<CourseOption[]>>("/admin/courses/options", {
      params
    })

    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "Error desconocido"
      const status = error.response?.status || HttpStatusCode.InternalServerError

      throw new Error(`[${status}] ${message}`)
    }
  }
}

export const getCourseOptionsService = () => {
  return axios.get<Response<CourseOption[]>>("/admin/courses/options")
}

export const assignCourseToStudentService = (data: AssignCourse) => {
  return axios.post("/admin/students/assign-course", data)
}
