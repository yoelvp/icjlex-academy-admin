import { create } from 'zustand'

interface UseTokenStore {
  token: string
  setToken: (token: string) => void
}

export const useTokenStore = create<UseTokenStore>()((set) => ({
  token: '',
  setToken: (token: string) => set({ token })
}))
