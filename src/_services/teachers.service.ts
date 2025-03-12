import type { UpdateTeacherImage } from "@/modules/teachers/types/TeacherFormFields"
import type { Response, ResponsePaginated } from "@/@common/types/Response"
import type { Teacher, TeacherFormValues, TeacherOnlyNames } from "@/_models/Teacher"

import { axios } from "@/lib"

export const createTeacherService = (teacher: TeacherFormValues) => {
  const formData = new FormData()
  formData.append("firstName", teacher.firstName)
  formData.append("lastName", teacher.lastName)
  teacher.specialties?.forEach((specialty) => {
    formData.append("specialties[]", specialty ?? "")
  })
  teacher.socialMedia?.forEach((social) => {
    formData.append("socialMedia[]", social ?? "")
  })
  formData.append("profession", teacher.profession)
  formData.append("about", teacher.about)

  if (teacher.image instanceof File) {
    formData.append("image", teacher.image)
  }

  return axios.post<Response<Teacher>>("/admin/teachers", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const updateTeacherService = (teacher: TeacherFormValues) => {
  const formData = new FormData()
  formData.append("firstName", teacher.firstName)
  formData.append("lastName", teacher.lastName)
  teacher.specialties?.forEach((specialty) => {
    formData.append("specialties[]", specialty ?? "")
  })
  teacher.socialMedia?.forEach((social) => {
    formData.append("socialMedia[]", social ?? "")
  })
  formData.append("profession", teacher.profession)
  formData.append("about", teacher.about)
  formData.append("imageUrl", teacher.imageUrl ?? "")

  if (teacher.image instanceof File) {
    formData.append("image", teacher.image)
  }

  return axios.post<Response<Teacher>>("/teachers", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getAllTeachersService = (params?: object) => {
  return axios.get<ResponsePaginated<Teacher>>("/teachers", {
    params: params
  })
}

export const getAllTeachersOnlyNamesService = () => {
  return axios.get<Response<TeacherOnlyNames[]>>("/admin/teachers/only-names")
}

export const deleteTeacherService = (teacherId: string) => {
  return axios.delete<Response<{ teacherId: string }>>(`/teachers/${teacherId}`)
}

export const getTeacherByIdService = (id: string) => {
  return axios.get<Response<Teacher>>(`/teachers/${id}`)
}

// Update image of docent
export const updateImageTeacherService = (teacherId: string, data?: UpdateTeacherImage) => {
  const formData = new FormData()

  if (data?.image) {
    formData.append("image", data.image)
  }

  return axios.patch<{ teacherId: string, imageUrl?: string }>(`/docents/update-image/${teacherId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
