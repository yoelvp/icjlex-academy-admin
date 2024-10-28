export const ROLES = {
  ADMIN: 'ADMIN',
  SUPPORT_COURSES: 'SUPPORT_COURSES',
  SUPPORT_USERS: 'SUPPORT_USERS'
} as const

export type RolName = (typeof ROLES)[keyof typeof ROLES];
