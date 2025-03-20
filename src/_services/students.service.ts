import { Response } from "@/@common/types/Response"
import { Student } from "@/_models/Student.model"
import { axios } from "@/lib"

export const getAllStudentsService = (params?: object) => {
  return axios.get<Response<Student[]>>("/admin/students", {
    params
  })
}

export const getStudentByIdService = (studentId: string) => {
  return axios.get<Student>(`/admin/students/${studentId}`)
}

export const assignCourseToStudentService = (studentId: string, courseId: string) => {
  return axios.post(`/admin/students/assign-course/${studentId}/${courseId}`)
}

export const deleteStudentService = (studentId: string) => {
  return axios.delete(`/admin/students/${studentId}`)
}
