import { UpdateTeacher } from '@/_models/Teacher'
import { create } from 'zustand'

interface UseProps {
  teacher: UpdateTeacher | null
  setTeacher: (teacher: UpdateTeacher | null) => void
}

export const useUpdateTeacherStore = create<UseProps>()((set) => ({
  teacher: null,
  setTeacher: (teacher: UpdateTeacher | null) => set({ teacher })
}))
