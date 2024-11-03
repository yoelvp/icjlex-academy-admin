import type { PublishedCourse, UpcomingCourse } from '@/modules/courses/types/Course'
import type { IdAndNameFields } from '@/@common/types/IdAndName'
import type { ResponseData } from '@/@common/types/ResponseData'
import type { Course } from '@/_models/Course.model'

import { axios } from '@/lib'

export const getAllPublishedCoursesService = () => {
  return axios.get<ResponseData<PublishedCourse>>('/courses')
}

export const getAllUpcomingCoursesService = () => {
  return axios.get<ResponseData<UpcomingCourse>>('/courses/soon')
}

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
