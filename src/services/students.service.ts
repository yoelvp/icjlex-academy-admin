import type{ Pagination, Response, Student, StudentForm, StudentNamesOption } from "@/types"
import { axios } from "@/lib"

export const getAllStudentsService = async (params?: Pagination) => {
  return await axios.get<Response<Student[]>>("/admin/students", {
    params
  })
}

export const getAllStudentOptionsService = () => {
  return axios.get<Response<StudentNamesOption[]>>("/admin/students/options")
}

export const getStudentByIdService = (studentId: string) => {
  return axios.get<Student>(`/admin/students/${studentId}`)
}

export const createStudentService = (data: StudentForm) => {
  return axios.post("/admin/students", data)
}
