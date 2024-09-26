import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseTokenStore {
  token: string
  setToken: (token: string) => void
}

export const useTokenStore = create<UseTokenStore>()(persist(
  (set) => ({
    token: '',
    setToken: (token: string) => set({ token })
  }),
  {
    name: 'token'
  }
))
