import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const SectionHeading: FC<Props> = ({ children }) => {
  return (
    <h2 className="text-primary-700 text-2xl font-bold">
      {children}
    </h2>
  )
}
