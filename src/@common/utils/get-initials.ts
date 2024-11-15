import type { User } from '@/_models/User'
import type { Student } from '@/modules/students/types/Student'

export const getUserInitials = (user: User | Student | null) => {
  const initialFirstName = user?.firstName.charAt(0)
  const initialLastName = user?.lastName.charAt(0)

  return `${initialFirstName}${initialLastName}`
}
