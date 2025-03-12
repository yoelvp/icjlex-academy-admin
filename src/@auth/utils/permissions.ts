export const PERMISSIONS = {
  LIST_COURSES: "list_courses"
} as const

export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
