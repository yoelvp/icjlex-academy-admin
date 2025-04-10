export interface User {
  id: string
  firstName: string
  lastName: string
  slug: string
  imageUrl: string | null
  phoneNumber: string | null
  email: string
  isActive: boolean | null
  isAdmin: boolean | null
  isStudent: boolean | null
  createdAt: string
}

export interface UserIdAndName {
  id: string
  firstName: string
  lastName: string
}
