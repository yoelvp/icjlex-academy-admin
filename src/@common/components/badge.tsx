import { FC } from 'react'
import { badgeVariants } from '@/@common/constants/badge-variants'

interface BadgeProps {
  status: true | false
}

export const Badge: FC<BadgeProps> = ({ status }) => {
  return (
    <span className={badgeVariants({ variant: status })}>
      {status === true ? 'Activo' : 'Inactivo'}
    </span>
  )
}
