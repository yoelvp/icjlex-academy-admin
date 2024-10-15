import type { Student, StudentPreRegistration } from '../types/Student'

import { create } from 'zustand'

interface UseStudentStore {
  activeStudents: Student[]
  preRegisteredStudents: StudentPreRegistration[]
  setActiveStudents: (students: Student[]) => void
  setPreRegisteredStudents: (students: StudentPreRegistration[]) => void
}

export const useStudentsStore = create<UseStudentStore>()((set) => ({
  activeStudents: [],
  preRegisteredStudents: [],
  setActiveStudents: (newStudents: Student[]) => set({ activeStudents: newStudents }),
  setPreRegisteredStudents: (newStudents: StudentPreRegistration[]) => set({ preRegisteredStudents: newStudents })
}))
