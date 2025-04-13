import { axios } from "@/lib"
import { Pagination, Response, Student, StudentForm } from "@/types"

export const getAllStudentsService = async (params?: Pagination) => {
  return await axios.get<Response<Student[]>>("/admin/students", {
    params
  })
}

export const getStudentByIdService = (studentId: string) => {
  return axios.get<Student>(`/admin/students/${studentId}`)
}

export const createStudentService = (data: StudentForm) => {
  return axios.post("/admin/students", data)
}
