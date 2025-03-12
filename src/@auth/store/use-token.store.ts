import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AuthStorageKeys } from "../enums/storage-keys.enum"

interface UseTokenStore {
  token: string | null
  refreshToken: string | null
  setToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
}

export const useTokenStore = create<UseTokenStore>()(persist(
  (set) => ({
    token: null,
    refreshToken: null,
    setToken: (token: string | null) => set({ token }),
    setRefreshToken: (refreshToken: string | null) => set({ refreshToken })
  }),
  {
    name: AuthStorageKeys.TOKEN
  }
))
