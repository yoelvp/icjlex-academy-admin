import type { Student, StudentPreRegistration } from '../types/Student'

import { create } from 'zustand'

interface UseStudentStore {
  activeStudents: Student[]
  preRegisteredStudents: StudentPreRegistration[]
  preRegistered: StudentPreRegistration | null
  studentId: string | null
  setActiveStudents: (students: Student[]) => void
  setPreRegisteredStudents: (students: StudentPreRegistration[]) => void
  setStudentId: (id: string | null) => void
  setPreRegistered: (student: StudentPreRegistration | null) => void
}

export const useStudentsStore = create<UseStudentStore>()((set) => ({
  activeStudents: [],
  preRegisteredStudents: [],
  studentId: null,
  preRegistered: null,
  setActiveStudents: (newStudents: Student[]) => set({ activeStudents: newStudents }),
  setPreRegisteredStudents: (newStudents: StudentPreRegistration[]) => set({ preRegisteredStudents: newStudents }),
  setStudentId: (id: string | null) => set({ studentId: id }),
  setPreRegistered: (student: StudentPreRegistration | null) => set({ preRegistered: student })
}))
