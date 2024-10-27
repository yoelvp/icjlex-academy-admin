import { ResponseData } from '@/@common/types/ResponseData'
import { axios } from '@/lib'
import { UpdateStudent } from '@/modules/[user]/update-data/types/UpdateStudent'
import { Student, StudentPreRegistration, StudentPreRegistrationData } from '@/modules/students/types/Student'

export const validateDataUpdateService = (id: string) => {
  return axios.get<{ isUpdated: boolean }>('/students/validate-data-update', {
    params: {
      id
    }
  })
}

export const updateMainDataService = (userId: string, data: UpdateStudent) => {
  const formData = new FormData()
  formData.append('firstName', data.firstName)
  formData.append('lastName', data.lastName)
  formData.append('password', data.password)
  formData.append('confirmPassword', data.confirmPassword)
  formData.append('image', data.image!)

  return axios.patch(`/students/me/${userId}`, formData, {
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const assignCourseToStudentService = (studentId: string, courseId: string) => {
  return axios.post(`/students/${studentId}/courses`, { courseId, isPaid: true })
}

export const getStudentByIdService = (studentId: string) => {
  return axios.get<Student>(`/students/${studentId}/with-courses`)
}

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

export const deleteStudentService = (studentId: string) => {
  return axios.delete(`/students/${studentId}`)
}
