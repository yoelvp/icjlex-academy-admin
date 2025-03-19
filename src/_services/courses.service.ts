import type { AdminCourse, CourseDetails, CourseFormValues } from "@/_models/Course.model"
import type { Response } from "@/@common/types/Response"
import type { IdAndNameFields } from "@/@common/types/IdAndName"

import { axios } from "@/lib"

export const createCourseService = (course: CourseFormValues) => {
  return axios.post<Response<{ courseId: string }>>("/admin/courses", course)
}

export const updateCourseService = (course: CourseFormValues, courseId: string) => {
  return axios.put<Response<{ courseId: string, imageUrl: string }>>(`/admin/courses/${courseId}`, course)
}

export const updateImageCourseService = (courseId: string, file?: File | null) => {
  const formData = new FormData()

  if (file) {
    formData.append("image", file)
  }

  return axios.post<Response<{ courseId: string, imageUrl: string }>>(`/admin/courses/update-image/${courseId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getCourseByIdService = (courseId: string) => {
  return axios.get<Response<CourseDetails>>(`/admin/courses/${courseId}`)
}

// Not used
export const getAllCoursesOnlyNameService = () => {
  return axios.get<IdAndNameFields[]>("/courses/only-name")
}

export const publishCourseService = (courseId: string) => {
  return axios.patch<Response<boolean>>(`/admin/courses/publish/${courseId}`)
}

export const getAllCoursesService = (params?: object) => {
  return axios.get<Response<AdminCourse[]>>("/admin/courses", {
    params
  })
}

export const deleteCourseService = async (courseId: string) => {
  return await axios.delete<Response<{ courseId: string }>>(`/admin/courses/${courseId}`)
}
