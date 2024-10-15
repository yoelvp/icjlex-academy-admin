import { API_URL } from '@/@common/env'
import axios from 'axios'
import { Student, StudentPreRegistration, StudentPreRegistrationData } from '../types/Student'
import { ResponseData } from '@/@common/types/ResponseData'

export const studentPreRegisteredService = (student: StudentPreRegistrationData) => {
  return axios.post<StudentPreRegistration>(`${API_URL}/auth/pre-register`, student)
}

export const getAllActiveStudentsService = ({ page, size }: { page: number, size: number }) => {
  return axios.get<ResponseData<Student>>(`${API_URL}/students`, {
    params: {
      page,
      size
    }
  })
}

export const getAllPreRegisteredStudentsService = ({ page, size }: { page: number, size: number }) => {
  return axios.get<ResponseData<StudentPreRegistration>>(`${API_URL}/students/pre-registered`, {
    params: {
      page,
      size
    }
  })
}
