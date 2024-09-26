import type { User } from '../models/User'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
    name: 'user'
  }
))
