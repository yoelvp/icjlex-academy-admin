import { create } from "zustand"
import { TeacherOnlyNames } from "@/_models/Teacher"

interface UseTeachersOnlyNamesStore {
  teachers: TeacherOnlyNames[]
  setTeachers: (teacher: TeacherOnlyNames[]) => void
}

export const useTeachersOnlyNamesStore = create<UseTeachersOnlyNamesStore>()((set) => ({
  teachers: [],
  setTeachers: (teachers: TeacherOnlyNames[]) => set({ teachers })
}))
