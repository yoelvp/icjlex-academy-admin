import type {
  Student,
  StudentPreRegistration,
  StudentPreRegistrationData
} from "../types/Student"
import type { ResponseData } from "@/@common/types/ResponseData"
import { axios } from "@/lib"

export const getStudentByIdService = (studentId: string) => {
  return axios.get<Student>(`/students/${studentId}`)
}

export const studentPreRegisteredService = (student: StudentPreRegistrationData) => {
  return axios.post<StudentPreRegistration>("/students/pre-register", student)
}

export const getAllActiveStudentsService = ({ page, size }: { page: number, size: number }) => {
  return axios.get<ResponseData<Student>>("/students", {
    params: {
      page,
      size
    }
  })
}

export const getAllPreRegisteredStudentsService = ({ page, size }: { page: number, size: number }) => {
  return axios.get<ResponseData<StudentPreRegistration>>("/students/pre-registered", {
    params: {
      page,
      size
    }
  })
}

export const deleteStudentService = (studentId: string) => {
  return axios.delete(`/students/${studentId}`)
}
