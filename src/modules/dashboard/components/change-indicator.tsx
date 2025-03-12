import type { FC } from "react"

interface ChangeIndicatorProps {
  change: number
}

export const ChangeIndicator: FC<ChangeIndicatorProps> = ({ change }) => {
  const isPositive = change >= 0
  const changeClass = isPositive ? "text-success-500" : "text-error-500"
  const changeIcon = isPositive ? "▲" : "▼"

  return (
    <div className={`flex items-center ${changeClass}`}>
      <span className="text-lg mr-1">{changeIcon}</span>
      <span className="text-sm font-medium">{Math.abs(change)}%</span>
    </div>
  )
}
