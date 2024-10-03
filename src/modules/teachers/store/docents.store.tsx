import { create } from 'zustand'
import { Docent, DocentResult } from '../types/Docent'
import { addDocentService, getDocentService } from '../service/docents.service'

interface DocentStore {
  docents: DocentResult[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  size: number
  perPage: number
  setDocents: (docents: DocentResult[]) => void
  addDocents: (docent: Omit<Docent, 'id'>) => Promise<void>
  fetchDocents: (page: number) => Promise<void>
  setCurrentPage: (page: number) => void
  setSize: (size: number) => void
  setPerPage: (perPage: number) => void
}

export const useDocentStore = create<DocentStore>((set, get) => ({
  docents: [],
  currentPage: 1,
  totalPages: 1,
  size: 10,
  perPage: 1,

  setDocents: (docents: DocentResult[]) => {
    set({ docents })
  },
  isLoading: false,
  error: null,
  addDocents: async (docent: Omit<Docent, 'id'>) => {
    try {
      const newDocent = await addDocentService(docent)
      set((state) => ({
        docents: [...state.docents, newDocent]
      }))
    } catch (error) {
      console.log(error)
    }
  },
  fetchDocents: async (page: number) => {
    /*  try {
      const docents = await getDocentService()
      set({ docents })
    } catch (error) {
      console.error(error)
    } */
    set({ isLoading: true, error: null })
    try {
      const { results, currentPage, totalPages } = await getDocentService(
        page,
        get().size,
        get().perPage
      )
      set({
        docents: results,
        currentPage,
        totalPages,
        isLoading: false
      })
    } catch (error) {
      console.error(error)
      set({
        error: 'Error loading docents',
        isLoading: false
      })
    }
  },
  setCurrentPage: (page: number) => set({ currentPage: page }),

  setSize: (size: number) => set({ size }),

  setPerPage: (perPage: number) => set({ perPage })
}))
