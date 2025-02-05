import { Teacher } from '@/_models/Teacher'
import { User } from '@/_models/User'

export const getFullName = (payload: User | Teacher | null) => {
  return `${payload?.firstName} ${payload?.lastName}`
}
