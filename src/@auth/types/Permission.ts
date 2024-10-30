import { type PermissionName } from '../utils/permissions'

export interface PermissionsByUserResponse {
  userId: string
  permissions: PermissionName[]
}
