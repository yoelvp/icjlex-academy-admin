import type { Student, StudentPreRegistration } from "../types/Student"

import { create } from "zustand"

interface UseStudentStore {
  activeStudents: Student[]
  activeStudent: Student | null
  preRegisteredStudents: StudentPreRegistration[]
  preRegistered: StudentPreRegistration | null
  studentId: string | null
  setActiveStudents: (students: Student[]) => void
  setActiveStudent: (students: Student | null) => void
  setPreRegisteredStudents: (students: StudentPreRegistration[]) => void
  setStudentId: (id: string | null) => void
  setPreRegistered: (student: StudentPreRegistration | null) => void
}

export const useStudentsStore = create<UseStudentStore>()((set) => ({
  activeStudents: [],
  activeStudent: null,
  preRegisteredStudents: [],
  studentId: null,
  preRegistered: null,
  setActiveStudents: (newStudents: Student[]) => set({ activeStudents: newStudents }),
  setActiveStudent: (newStudent: Student | null) => set({ activeStudent: newStudent }),
  setPreRegisteredStudents: (newStudents: StudentPreRegistration[]) => set({ preRegisteredStudents: newStudents }),
  setStudentId: (id: string | null) => set({ studentId: id }),
  setPreRegistered: (student: StudentPreRegistration | null) => set({ preRegistered: student })
}))
