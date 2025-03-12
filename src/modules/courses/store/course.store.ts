import { create } from "zustand"
import { CourseDetails } from "@/_models/Course.model"

interface UseCourseStore {
  course: CourseDetails | null
  courseId: string | null
  setCourse: (course: CourseDetails) => void
  setCourseId: (id: string | null) => void
}

export const useCourseStore = create<UseCourseStore>()((set) => ({
  course: null,
  courseId: null,
  setCourse: (course: CourseDetails) => set({ course }),
  setCourseId: (courseId: string | null) => set({ courseId })
}))
