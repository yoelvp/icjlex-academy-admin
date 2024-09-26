import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const SectionTitle: FC<Props> = ({ children }) => {
  return (
    <h6 className="font-semibold text-primary-200 uppercase">
      {children}
    </h6>
  )
}
