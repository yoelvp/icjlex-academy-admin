import type { PublishedCourse, UpcomingCourse } from '@/modules/courses/types/Course'
import type { IdAndNameFields } from '@/@common/types/IdAndName'
import type { ResWithPagination } from '@/@common/types/ResponseData'
import type { Course, CourseContents } from '@/_models/Course.model'
import type { ReqPagination } from '@/@common/types/Pagination'

import { axios } from '@/lib'

export const getAllPublishedCoursesService = ({ page, size }: ReqPagination) => {
  return axios.get<ResWithPagination<PublishedCourse>>('/courses', {
    params: {
      page,
      size
    }
  })
}

export const getAllUpcomingCoursesService = () => {
  return axios.get<ResWithPagination<UpcomingCourse>>('/courses/soon')
}

export const getAllCoursesOnlyNameService = () => {
  return axios.get<IdAndNameFields[]>('/courses/only-name')
}

export const getAllCoursesContentsService = (courseId: string) => {
  return axios.get<ResWithPagination<CourseContents>>(`/courses/${courseId}/contents`)
}

/** Course for final user/client */
export const getCoursesService = () => {
  return axios.get<ResWithPagination<Course>>('/courses/details', {
    params: {
      page: 1,
      size: 99
    }
  })
}
