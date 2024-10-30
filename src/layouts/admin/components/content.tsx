import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Content: FC<Props> = ({
  children
}) => {
  return (
    <div className="h-full px-6 py-8 bg-primary-50/60">
      {children}
    </div>
  )
}

export default Content
