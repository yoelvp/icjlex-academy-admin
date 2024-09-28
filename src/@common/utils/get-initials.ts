import type { User } from '@/@auth/models/User'

export const getUserInitials = (user: User) => {
  const initialFirstName = user.firstName.charAt(0)
  const initialLastName = user.lastName.charAt(0)

  return `${initialFirstName}${initialLastName}`
}
