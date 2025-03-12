import { Skeleton } from "./skeleton"

interface Props {
  numCols: number
  isLoading: boolean
}

export const TableLoading = ({
  numCols,
  isLoading
}: Props) => {
  if (!isLoading) return null

  return (
    <tr>
      {Array.from({ length: numCols }).map((_, index) => (
        <td key={index} className="px-4">
          <Skeleton className="h-6 min-w-24" />
        </td>
      ))}
    </tr>
  )
}
