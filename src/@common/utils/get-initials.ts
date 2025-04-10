interface Payload {
  firstName: string
  lastName: string
}

export const getUserInitials = <T extends Payload>(user: T | null) => {
  const initialFirstName = user?.firstName.charAt(0)
  const initialLastName = user?.lastName.charAt(0)

  return `${initialFirstName}${initialLastName}`
}
