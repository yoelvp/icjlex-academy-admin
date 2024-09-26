import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UseSidebarStore {
  show: boolean
  toggle: () => void
}

export const useSidebar = create<UseSidebarStore>()(
  persist(
    (set) => ({
      show: false,
      toggle: () => set((state) => ({ show: !state.show }))
    }),
    { name: 'sidebar-state' }
  ))
