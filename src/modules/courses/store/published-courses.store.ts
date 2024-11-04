import type { PublishedCourse } from '../types/Course'
import type { Pagination } from '@/@common/types/Pagination'

import { create } from 'zustand'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'

interface UsePublishedCoursesStore {
  courses: PublishedCourse[] | null
  pagination: Pagination
  setCourses: (courses: PublishedCourse[] | null) => void
  setPagination: (courses: Pagination) => void
}

export const usePublishedCoursesStore = create<UsePublishedCoursesStore>()((set) => ({
  courses: null,
  pagination: DEFAULT_PAGINATION,
  setCourses: (courses: PublishedCourse[] | null) => set({ courses }),
  setPagination: (pagination: Pagination) => set({ pagination })
}))
