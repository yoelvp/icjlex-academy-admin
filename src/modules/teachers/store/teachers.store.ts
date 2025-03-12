import { create } from "zustand"
import { Pagination } from "@/@common/types/Pagination"
import { DEFAULT_PAGINATION } from "@/@common/constants/default-pagination"
import { Teacher } from "@/_models/Teacher"

interface UseTeacherStore {
  teacher: Teacher | null
  teachers: Teacher[]
  setTeacher: (teacher: Teacher | null) => void
  setTeachers: (teacher: Teacher[]) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}

export const useTeacherStore = create<UseTeacherStore>()((set) => ({
  teacher: null,
  teachers: [],
  pagination: DEFAULT_PAGINATION,
  setTeacher: (teacher: Teacher | null) => set({ teacher }),
  setTeachers: (teachers: Teacher[]) => set({ teachers }),
  setPagination: (pagination: Pagination) => set({ pagination })
}))
