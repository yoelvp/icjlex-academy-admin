import { create } from 'zustand'
import { CourseResult } from '../types/Course'

interface UseCourseStore {
  course: CourseResult | null
  courseId: string | null
  setCourse: (course: CourseResult) => void
  setCourseId: (id: string | null) => void
}

export const useCourseStore = create<UseCourseStore>((set) => ({
  course: null,
  courseId: null,
  setCourse: (course: CourseResult) => set({ course }),
  setCourseId: (courseId: string | null) => set({ courseId })
}))
