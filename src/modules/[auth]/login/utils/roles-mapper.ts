import { Rol } from '@/_models/Auth.model'

export const mapperRoles = (r: { id: string, userToRoles: string[] | null }): Rol => {
  return {
    id: r?.id,
    roles: r?.userToRoles
  }
}
