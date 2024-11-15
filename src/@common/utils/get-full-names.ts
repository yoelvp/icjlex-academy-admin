import { Teacher } from '@/_models/Teacher.model'
import { User } from '@/_models/User'

export const getFullName = (payload: User | Teacher | null) => {
  return `${payload?.firstName} ${payload?.lastName}`
}
