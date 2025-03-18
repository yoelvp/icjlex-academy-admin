import type { Response, ResponsePaginated } from "@/@common/types/Response"
import type { Teacher, TeacherFormValues, TeacherOnlyNames } from "@/_models/Teacher.model"

import { axios } from "@/lib"

export const createTeacherService = (teacher: TeacherFormValues) => {
  return axios.post<Response<{ teacherId: string }>>("/admin/teachers", teacher)
}

export const updateTeacherService = (teacherId: string, teacher: TeacherFormValues) => {
  return axios.put<Response<{ teacherId: string }>>(`/admin/teachers/${teacherId}`, teacher)
}

export const getAllTeachersService = (params?: object) => {
  return axios.get<ResponsePaginated<Teacher>>("/admin/teachers", {
    params: params
  })
}

export const getAllTeachersOnlyNamesService = () => {
  return axios.get<Response<TeacherOnlyNames[]>>("/admin/teachers/only-names")
}

export const deleteTeacherService = (teacherId: string) => {
  return axios.delete<Response<{ teacherId: string }>>(`/admin/teachers/${teacherId}`)
}

export const getTeacherByIdService = (id: string) => {
  return axios.get<Response<Teacher>>(`/admin/teachers/${id}`)
}

// Update image of docent
export const updateImageTeacherService = (teacherId: string, file?: File | null) => {
  const formData = new FormData()

  if (file) {
    formData.append("image", file)
  }

  return axios.post<{ teacherId: string, imageUrl?: string }>(`/admin/teachers/update-image/${teacherId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
