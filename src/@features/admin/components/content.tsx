import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Content: FC<Props> = ({
  children
}) => {
  return (
    <div className="px-4 py-8">
      {children}
    </div>
  )
}

export default Content
