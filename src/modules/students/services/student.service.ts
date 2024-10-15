import { axios } from '@/lib'
import { Student, StudentPreRegistration, StudentPreRegistrationData } from '../types/Student'
import { ResponseData } from '@/@common/types/ResponseData'

export const studentPreRegisteredService = (student: StudentPreRegistrationData) => {
  return axios.post<StudentPreRegistration>('/students/pre-register', student)
}

export const getAllActiveStudentsService = ({ page, size }: { page: number, size: number }) => {
  return axios.get<ResponseData<Student>>('/students', {
    params: {
      page,
      size
    }
  })
}

export const getAllPreRegisteredStudentsService = ({ page, size }: { page: number, size: number }) => {
  return axios.get<ResponseData<StudentPreRegistration>>('/students/pre-registered', {
    params: {
      page,
      size
    }
  })
}
