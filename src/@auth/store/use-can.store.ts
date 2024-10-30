import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PermissionName } from '../utils/permissions'

interface UseCanStore {
  isAdmin: boolean
  role: string | null
  roles: string[] | null
  permission: PermissionName | null
  permissions: PermissionName[] | null
  setInitialCan: (payload: {
    isAdmin: boolean
    role: string | null
    roles: string[] | null
    permission: PermissionName | null
    permissions: PermissionName[] | null
  }) => void
}

export const useCanStore = create<UseCanStore>()(persist(
  (set) => ({
    isAdmin: false,
    role: null,
    roles: null,
    permission: null,
    permissions: null,
    setInitialCan: ({ isAdmin, role, roles, permission, permissions }) => set({
      isAdmin,
      role,
      roles,
      permission,
      permissions
    })
  }),
  {
    name: 'can'
  }
))
