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
  message = 'Aún no tiene registros'
}: Props) => {
  if (isLoading) return null

  if (show) {
    return (
      <tr>
        <td colSpan={numCols} className="px-4 text-center">
          {message}
        </td>
      </tr>
    )
  }
}
