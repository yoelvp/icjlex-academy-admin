import type { IdAndNameFields } from '@/@common/types/IdAndName'
import { create } from 'zustand'

interface UseCourseMainDataStore {
  courses: IdAndNameFields[]
  setCourses: (course: IdAndNameFields[]) => void
}

export const useCourseMainDataStore = create<UseCourseMainDataStore>((set) => ({
  courses: [],
  setCourses: (courses: IdAndNameFields[]) => set({ courses })
}))
