import { create } from "zustand"
import { persist } from "zustand/middleware"
import { PermissionName } from "../utils/permissions"

interface UseCanStore {
  isAdmin: boolean
  roles: string[] | null
  permissions: PermissionName[] | null
  setInitialCan: (payload: {
    isAdmin: boolean
    roles: string[] | null
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
    setInitialCan: ({ isAdmin, roles, permissions }) => set({
      isAdmin,
      roles,
      permissions
    })
  }),
  {
    name: "can"
  }
))
