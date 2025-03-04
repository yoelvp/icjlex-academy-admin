import type { CourseListAdmin } from '@/_models/Course.model'
import type { Pagination } from '@/@common/types/Pagination'

import { create } from 'zustand'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'

interface UseCoursesStore {
  published: {
    courses: CourseListAdmin[] | null
    pagination: Pagination
  }
  scheduled: {
    courses: CourseListAdmin[] | null
    pagination: Pagination
  }
  setPublishedCourses: (courses: CourseListAdmin[] | null) => void
  setScheduledCourses: (courses: CourseListAdmin[] | null) => void
  setPublishedPagination: (pagination: Pagination) => void
  setScheduluedPagination: (pagination: Pagination) => void
}

export const useCoursesStore = create<UseCoursesStore>()((set) => ({
  published: {
    courses: [],
    pagination: DEFAULT_PAGINATION
  },
  scheduled: {
    courses: [],
    pagination: DEFAULT_PAGINATION
  },
  setPublishedCourses: (courses: CourseListAdmin[] | null) => set((state) => ({
    published: {
      ...state.published,
      courses
    }
  })),
  setScheduledCourses: (courses: CourseListAdmin[] | null) => set((state) => ({
    scheduled: {
      ...state.scheduled,
      courses
    }
  })),
  setPublishedPagination: (pagination: Pagination) => set((state) => ({
    published: {
      ...state.published,
      pagination
    }
  })),
  setScheduluedPagination: (pagination: Pagination) => set((state) => ({
    scheduled: {
      ...state.scheduled,
      pagination
    }
  }))
}))
