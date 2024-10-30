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
  // setRole: (rol: string) => void
  // setRoles: (rol: string[]) => void
  // setPermission: (permission: PermissionName) => void
  // setPermissions: (permissions: PermissionName[]) => void
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
    // setRole: (role: string | null) => set({ role, isAdmin: true }),
    // setRoles: (roles: string[] | null) => set({ roles, isAdmin: true }),
    // setPermission: (permission: PermissionName | null) => set({ permission, isAdmin: true }),
    // setPermissions: (permissions: PermissionName[] | null) => set({ permissions, isAdmin: true })
  }),
  {
    name: 'can'
  }
))
