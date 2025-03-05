import type { AdminCourse } from '@/_models/Course.model'
import type { Pagination } from '@/@common/types/Pagination'

import { create } from 'zustand'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'

interface UseCoursesStore {
  published: {
    courses: AdminCourse[] | null
    pagination: Pagination
  }
  scheduled: {
    courses: AdminCourse[] | null
    pagination: Pagination
  }
  setPublishedCourses: (courses: AdminCourse[] | null) => void
  setScheduledCourses: (courses: AdminCourse[] | null) => void
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
  setPublishedCourses: (courses: AdminCourse[] | null) => set((state) => ({
    published: {
      ...state.published,
      courses
    }
  })),
  setScheduledCourses: (courses: AdminCourse[] | null) => set((state) => ({
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
