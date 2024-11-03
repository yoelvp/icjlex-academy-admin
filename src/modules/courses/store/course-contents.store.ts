import { CourseContents } from '@/_models/Course.model'
import { create } from 'zustand'

interface UseCourseContentsStore {
  contents: CourseContents[] | null
  setContents: (contents: CourseContents[] | null) => void
}

export const useCourseContentsStore = create<UseCourseContentsStore>()((set) => ({
  contents: null,
  setContents: (contents: CourseContents[] | null) => set({ contents })
}))
