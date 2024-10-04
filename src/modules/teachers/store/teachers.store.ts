import { create } from 'zustand'
import { DocentResult } from '../types/Docent'
import { Pagination } from '@/@common/types/Pagination'
import { DEFAULT_PAGINATION } from '@/@common/constants/default-pagination'

interface UseTeacherStore {
  teachers: DocentResult[]
  setTeachers: (teacher: DocentResult[]) => void
  pagination: Pagination
  setPagination: (pagination: Pagination) => void
}

export const useDocentStore = create<UseTeacherStore>()((set) => ({
  teachers: [],
  pagination: DEFAULT_PAGINATION,
  setTeachers: (teachers: DocentResult[]) => set({ teachers }),
  setPagination: (pagination: Pagination) => set((state) => ({ ...state, pagination }))
}))
