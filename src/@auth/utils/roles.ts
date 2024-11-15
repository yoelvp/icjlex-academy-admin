export const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student'
} as const

export type RolName = (typeof ROLES)[keyof typeof ROLES];
