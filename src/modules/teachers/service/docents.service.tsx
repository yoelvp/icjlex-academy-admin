import { axios } from "@/lib"
import { Teacher, DocentResult } from "../types/Docent"
import { ResponseData } from "@/@common/types/ResponseData"

export const addDocentService = (docent: Omit<Teacher, "id">) => {
  const formData = new FormData()
  formData.append("firstName", docent.firstName)
  formData.append("lastName", docent.lastName)
  formData.append("specialties", JSON.stringify(docent.specialties))
  formData.append("profession", docent.profession)
  formData.append("about", docent.about)
  formData.append("socialMedia[]", "https://github.com")

  formData.append("image", docent.image[0])

  return axios.post<DocentResult>("/docents", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getAllTeachersService = (page: number, size: number) => {
  return axios.get<ResponseData<Teacher>>("/docents", {
    params: {
      page,
      size
    }
  })
}

export const getTeacherByIdService = (id: string) => {
  return axios.get(`/docents/${id}`)
}
