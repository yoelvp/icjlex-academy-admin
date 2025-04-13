import { badgeVariants } from "@/@common/constants/badge-variants"

interface Props {
  status: boolean
}

export const Badge = ({ status }: Props) => {
  return (
    <span className={badgeVariants({ variant: status })}>
      {status === true ? "Activo" : "Inactivo"}
    </span>
  )
}
