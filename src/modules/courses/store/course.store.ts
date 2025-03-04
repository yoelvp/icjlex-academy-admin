import { create } from 'zustand'
import { CourseResult } from '../types/Course'
import { Pagination } from '@/@common/types/Pagination'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'

interface UseCourseStore {
  course: CourseResult | null
  pagination: Pagination
  courseId: string | null
  setCourses: (course: CourseResult[]) => void
  setPagination: (pagination: Pagination) => void
  setCourseId: (id: string | null) => void
}

export const UseCourseStore = create<UseCourseStore>((set) => ({
  courses: null,
  pagination: DEFAULT_PAGINATION,
  courseId: null,
  setCourses: (courses: CourseResult[]) => set({ courses }),
  setPagination: (pagination: Pagination) =>
    set((state) => ({ ...state, pagination })),
  setCourseId: (id: string | null) => set({ courseId: id })
}))
