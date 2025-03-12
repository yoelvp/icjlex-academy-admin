import { ReactNode } from "react"

export interface TabProps {
  title: string
  value: string
  onChange?: () => void
  children: ReactNode
}

export const Tab = ({ children }: TabProps) => {
  return children
}
