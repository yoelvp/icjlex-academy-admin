import type { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Content: FC<Props> = ({
  children
}) => {
  return (
    <div className="max-h-full overflow-auto h-full px-4 py-8 bg-white">
      {children}
    </div>
  )
}

export default Content
