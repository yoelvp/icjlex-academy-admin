import type { PermissionName } from '@/@auth/utils/permissions'
import type { RolName } from '@/@auth/utils/roles'

export interface Rol {
  id: string
  roles: string[] | null
}

export interface UserResponse {
  id: string
}

export interface RolesAndPermissionsResponse {
  roles: RolName[]
  permissions: PermissionName[]
}

export interface LoginResponse {
  userId: string
  token: string
}

export interface LoginData {
  email: string
  password: string
}
