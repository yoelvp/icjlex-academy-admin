import { IdAndNameFields } from '@/@common/types/IdAndName'
import { Course } from '@/_models/Course.model'
import { axios } from '@/lib'

export const getAllCoursesOnlyNameService = () => {
  return axios.get<IdAndNameFields[]>('/courses/only-name')
}

/** Course for final user/client */
export const getCoursesService = () => {
  return axios.get<Course[]>('/courses/client', {
    params: {
      page: 1,
      size: 3
    }
  })
}
