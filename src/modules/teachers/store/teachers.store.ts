import { create } from "zustand"
import { Pagination } from "@/@common/types/Pagination"
import { DEFAULT_PAGINATION } from "@/@common/constants/default-pagination"
import { Teacher } from "@/_models/Teacher.model"

interface UseTeachersStore {
  teachers: Teacher[]
  setTeachers: (teacher: Teacher[]) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}

export const useTeachersStore = create<UseTeachersStore>()((set) => ({
  teachers: [],
  pagination: DEFAULT_PAGINATION,
  setTeachers: (teachers: Teacher[]) => set({ teachers }),
  setPagination: (pagination: Pagination) => set({ pagination })
}))
