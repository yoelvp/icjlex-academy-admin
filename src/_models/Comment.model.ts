import { StudentCompleteName } from './Student.model'

export interface Comment {
  student: StudentCompleteName
  commentDate: Date
  comment: string
}
