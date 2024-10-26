import { IdAndNameFields } from '@/@common/types/IdAndName'
import { axios } from '@/lib'

export const getAllCoursesOnlyNameService = () => {
  return axios.get<IdAndNameFields[]>('/courses/only-name')
}
