import { create } from "zustand";

interface UseSearchCourseStore {
  query: string
  scheduledQuery: string
  setQuery: (query: string) => void
  setScheduledQuery: (query: string) => void
}

export const useSearchCourseStore = create<UseSearchCourseStore>()((set) => ({
  query: "",
  scheduledQuery: "",
  setQuery: (query: string) => set({ query }),
  setScheduledQuery: (query: string) => set({ scheduledQuery: query })
}))
