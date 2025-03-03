interface ValueNames {
  firstName: string
  lastName: string
}

export const getFullName = <T extends ValueNames>(payload: T | null) => {
  return `${payload?.firstName} ${payload?.lastName}`
}
