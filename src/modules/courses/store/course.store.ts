import { create } from 'zustand'
import { CourseResult } from '../types/Course'
import { Pagination } from '@/@common/types/Pagination'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'

interface UseCourseData {
  courses: CourseResult[]
  setCourses: (course: CourseResult[]) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}

export const UseCourseStore = create<UseCourseData>((set) => ({
  courses: [],
  pagination: DEFAULT_PAGINATION,
  setCourses: (courses: CourseResult[]) => set({ courses }),
  setPagination: (pagination: Pagination) => set((state) => ({ ...state, pagination }))
}))
