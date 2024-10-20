import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Card: FC<Props> = ({ children }) => {
  return (
    <section className="shadow--primary p-1 overflow-hidden rounded">
      <div className="overflow-hidden rounded">
        {children}
      </div>
    </section>
  )
}
