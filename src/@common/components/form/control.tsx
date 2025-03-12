import type { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export const Control: FC<Props> = ({
  children,
  className = ""
}) => (
  <div className={`w-full flex flex-col gap-y-[2px] ${className}`}>
    {children}
  </div>
)
