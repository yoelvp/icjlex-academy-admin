import type { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export const Content: FC<Readonly<Props>> = ({
  children,
  className = ""
}) => {
  return (
    <div className={`width-md mx-auto ${className}`}>
      {children}
    </div>
  )
}
