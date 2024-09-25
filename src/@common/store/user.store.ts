import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/User'

interface UserState {
  user: User | null,
  setUser: (user: User | null) => void
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user })
    }),
    {
      name: 'user'
    }
  )
)
