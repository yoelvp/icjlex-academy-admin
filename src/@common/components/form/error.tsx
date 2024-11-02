import type { FC } from 'react'

interface Props {
  hasError?: string
}

export const Error: FC<Props> = ({
  hasError
}) => {
  return (
    <span className={`text-error-400 pl-2 text-xs ${hasError ? 'block' : 'hidden'}`}>
      {hasError}
    </span>
  )
}
