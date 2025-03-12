import type { FC } from "react"

interface Props {
  hasError?: string
}

export const Error: FC<Props> = ({
  hasError
}) => {
  return (
    <span className={`text-red-400 pl-2 text-sm ${hasError ? "block" : "hidden"}`}>
      {hasError}
    </span>
  )
}
