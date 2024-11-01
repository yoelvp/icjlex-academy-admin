import { User } from '@/@auth/models/User'
import { Teacher } from '@/_models/Teacher.model'

export const getFullName = (payload: User | Teacher | null) => {
  return `${payload?.firstName} ${payload?.lastName}`
}
