import type { User } from "@/_models/User"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AuthStorageKeys } from "../enums/storage-keys.enum"

interface UseUserStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UseUserStore>()(persist(
  (set) => ({
    user: null,
    setUser: (user: User | null) => set({ user })
  }),
  {
    name: AuthStorageKeys.USER
  }
))
