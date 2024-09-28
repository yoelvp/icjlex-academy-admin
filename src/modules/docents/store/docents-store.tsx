import { create } from 'zustand'
import { Docent, DocentResult } from '../types/Docent'
import { addDocentService, getDocentService } from '../service/docents.service'

interface DocentStore {
  docents: DocentResult[]
  setDocents: (docents: DocentResult[]) => void
  addDocents: (docent: Omit<Docent, 'id'>) => Promise<void>
  getDocents: () => Promise<void>
}

export const useDocentStore = create<DocentStore>((set) => ({
  docents: [],
  setDocents: (docents: DocentResult[]) => {
    set({ docents })
  },
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
  getDocents: async () => {
    try {
      const docents = await getDocentService()
      set({ docents })
    } catch (error) {
      console.error(error)
    }
  }
}))
