import { IconInboxFilled } from "@/assets/icons"

interface Props {
  isLoading: boolean
  show: boolean
  numCols: number
  message?: string
}

export const TableEmpty = ({
  isLoading,
  show,
  numCols,
  message = "Aún no tiene registros"
}: Props) => {
  if (isLoading) return null

  if (show) {
    return (
      <tr>
        <td colSpan={numCols} className="px-4 text-center">
          <div className="flex flex-col justify-center items-center gap-y-1 text-gray-400">
            <IconInboxFilled size="48" className="text-zinc-300/50" />
            {message}
          </div>
        </td>
      </tr>
    )
  }
}
