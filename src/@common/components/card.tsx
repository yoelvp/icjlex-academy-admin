import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Card = ({ children }: Readonly<Props>) => {
  return (
    <section className="shadow--primary p-1 overflow-hidden rounded">
      <div className="overflow-hidden rounded">
        {children}
      </div>
    </section>
  )
}
