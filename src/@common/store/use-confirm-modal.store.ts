import { ReactNode } from 'react'
import { create } from 'zustand'

interface Option {
  content: ReactNode
  onClick: () => void
  isLoading?: boolean
}

interface ModalOption {
  title: string
  subTitle?: string
  options: Option[] | Option | null
}

interface UseConfirmModalStore {
  show: boolean
  open: (options: ModalOption | null) => void
  close: () => void
  options: ModalOption | null
}

export const useConfirmModalStore = create<UseConfirmModalStore>()((set) => ({
  show: false,
  options: null,
  open: (options: ModalOption | null) => set({ show: true, options }),
  close: () => set({ show: false, options: null })
}))
