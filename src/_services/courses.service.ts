import { IdAndNameFields } from '@/@common/types/IdAndName'
import { ResponseData } from '@/@common/types/ResponseData'
import { Course } from '@/_models/Course.model'
import { axios } from '@/lib'

export const getAllCoursesOnlyNameService = () => {
  return axios.get<IdAndNameFields[]>('/courses/only-name')
}

/** Course for final user/client */
export const getCoursesService = () => {
  return axios.get<ResponseData<Course>>('/courses/details', {
    params: {
      page: 1,
      size: 3
    }
  })
}
