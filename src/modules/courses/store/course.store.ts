import { create } from 'zustand'
import { CourseResult } from '../types/Course'

interface UseCourseData {
  courses: CourseResult[]
  setCourses: (course: CourseResult[]) => void
}

export const UseCourseStore = create<UseCourseData>((set) => ({
  courses: [],
  setCourses: (courses: CourseResult[]) => set({ courses })
}))
