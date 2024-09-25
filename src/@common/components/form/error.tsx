import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  hasError?: string
}

export const Error: FC<Props> = ({
  children,
  hasError
}) => {
  return (
    <span className={`text-error-400 text-xs ${Boolean(hasError) ? 'block' : 'hidden'}`}>
      {children}
    </span>
  )
}
