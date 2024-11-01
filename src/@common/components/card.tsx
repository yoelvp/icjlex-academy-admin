import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Card = ({ children }: Props) => {
  return (
    <section className="shadow--primary p-1 rounded">
      <div className="h-full overflow-hidden rounded">
        {children}
      </div>
    </section>
  )
}
