import type { PermissionName } from '@/@auth/utils'

export interface PermissionsByUserResponse {
  userId: string
  permissions: PermissionName[]
}
