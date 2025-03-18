import { Teacher } from "@/_models/Teacher.model"
import { create } from "zustand"

interface UseProps {
  teacher: Teacher | null
  setTeacher: (teacher: Teacher | null) => void
}

export const useUpdateTeacherStore = create<UseProps>()((set) => ({
  teacher: null,
  setTeacher: (teacher: Teacher | null) => set({ teacher })
}))
