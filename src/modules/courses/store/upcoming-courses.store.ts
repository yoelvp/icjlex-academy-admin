import type { UpcomingCourse } from '../types/Course'

import { create } from 'zustand'

interface UseUpcomingCoursesStore {
  courses: UpcomingCourse[] | null
  setCourses: (courses: UpcomingCourse[] | null) => void
}

export const useUpcomingCoursesStore = create<UseUpcomingCoursesStore>()((set) => ({
  courses: null,
  setCourses: (courses: UpcomingCourse[] | null) => set({ courses })
}))
