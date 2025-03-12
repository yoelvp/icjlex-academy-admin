import type { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  title: string
}

export const StudentCard: FC<Props> = ({
  title,
  children
}) => {
  return (
    <div className="rounded-sm border border-primary-100 overflow-hidden">
      <div className="bg-primary-50/40 p-2 flex justify-between items-center border-b border-b-primary-100/80">
        <span className="text-primary-500 font-bold">
          {title}
        </span>
      </div>
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}

