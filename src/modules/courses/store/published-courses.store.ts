import type { PublishedCourse } from '../types/Course'

import { create } from 'zustand'

interface UsePublishedCoursesStore {
  courses: PublishedCourse[] | null
  setCourses: (courses: PublishedCourse[] | null) => void
}

export const usePublishedCoursesStore = create<UsePublishedCoursesStore>()((set) => ({
  courses: null,
  setCourses: (courses: PublishedCourse[] | null) => set({ courses })
}))
