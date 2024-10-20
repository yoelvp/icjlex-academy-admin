import { CookieKeys } from '@/modules/[auth]/login/utils'
import Cookies from 'js-cookie'
import { create } from 'zustand'

interface UseTokenStore {
  token: string
  setToken: (token: string) => void
}

export const useTokenStore = create<UseTokenStore>()((set) => ({
  token: Cookies.get(CookieKeys.TOKEN) ?? '',
  setToken: (token: string) => set({ token })
}))
